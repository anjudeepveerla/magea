// lib/otp.ts
import crypto from "crypto";
import nodemailer from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";
import { Twilio } from "twilio";

type Channel = "email" | "phone";

const EMAIL_TTL_SECONDS = 10 * 60; // 10 minutes
const VERIFY_TTL_SECONDS = 15 * 60; // 15 minutes for "verified" flags
const RATE_LIMIT_WINDOW_SECONDS = 60; // per minute
const RATE_LIMIT_MAX_PER_WINDOW = 5;

// In-memory stores (for production, swap to Redis/DB)
const emailOtpStore = new Map<
  string,
  { codeHash: string; expiresAt: number; attempts: number }
>();
const verifiedStore = new Map<string, { channel: Channel; expiresAt: number }>();
const rateLimitStore = new Map<string, { windowStart: number; count: number }>();

function nowSec() {
  return Math.floor(Date.now() / 1000);
}

function sha256(input: string) {
  return crypto.createHash("sha256").update(input).digest("hex");
}

function randomOtp() {
  // 6-digit numeric OTP
  return String(Math.floor(100000 + Math.random() * 900000));
}

function rateLimitKey(identifier: string, channel: Channel) {
  return `${channel}:${identifier}`;
}

export function rateLimit(identifier: string, channel: Channel) {
  const key = rateLimitKey(identifier, channel);
  const entry = rateLimitStore.get(key);
  const t = nowSec();
  if (!entry || t - entry.windowStart >= RATE_LIMIT_WINDOW_SECONDS) {
    rateLimitStore.set(key, { windowStart: t, count: 1 });
    return;
  }
  entry.count += 1;
  if (entry.count > RATE_LIMIT_MAX_PER_WINDOW) {
    const retryIn = RATE_LIMIT_WINDOW_SECONDS - (t - entry.windowStart);
    const err: any = new Error("Too many OTP requests. Please wait a bit.");
    err.retryIn = retryIn;
    throw err;
  }
}

/** ===== Email OTP ===== */

function getEmailTransport(): nodemailer.Transporter<SMTPTransport.SentMessageInfo> {
  const host = process.env.SMTP_HOST;
  const port = process.env.SMTP_PORT ? Number(process.env.SMTP_PORT) : 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) {
    throw new Error("SMTP_HOST/SMTP_USER/SMTP_PASS are required");
  }
  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
  });
}

export async function sendEmailOtp(email: string) {
  rateLimit(email, "email");
  const code = randomOtp();
  const codeHash = sha256(code);
  const expiresAt = nowSec() + EMAIL_TTL_SECONDS;

  emailOtpStore.set(email, { codeHash, expiresAt, attempts: 0 });

  const from = process.env.SMTP_FROM || process.env.SMTP_USER!;
  const appName = process.env.NEXT_PUBLIC_APP_NAME || "MAEGA";

  const transporter = getEmailTransport();
  await transporter.sendMail({
    from,
    to: email,
    subject: `Your ${appName} verification code`,
    text: `Your one-time verification code is ${code}. It will expire in 10 minutes.`,
    html: `
      <div style="font-family: system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial;">
        <h2>${appName} Verification Code</h2>
        <p>Your one-time verification code is:</p>
        <div style="font-size:22px;font-weight:700;letter-spacing:2px;padding:10px 16px;border:1px solid #e5e7eb;border-radius:8px;display:inline-block;">
          ${code}
        </div>
        <p style="color:#6b7280;margin-top:12px;">This code expires in 10 minutes. If you didn't request it, feel free to ignore this email.</p>
      </div>
    `,
  });

  return { sent: true, ttl: EMAIL_TTL_SECONDS };
}

export function verifyEmailOtp(email: string, code: string) {
  const entry = emailOtpStore.get(email);
  if (!entry) return { ok: false, message: "OTP not found. Please request a new code." };

  const t = nowSec();
  if (t > entry.expiresAt) {
    emailOtpStore.delete(email);
    return { ok: false, message: "OTP expired. Please request a new code." };
    }

  if (!/^\d{6}$/.test(code)) {
    return { ok: false, message: "Invalid code format." };
  }

  entry.attempts += 1;
  if (entry.attempts > 5) {
    emailOtpStore.delete(email);
    return { ok: false, message: "Too many attempts. Please request a new code." };
  }

  if (sha256(code) !== entry.codeHash) {
    return { ok: false, message: "Incorrect code. Try again." };
  }

  // success:
  emailOtpStore.delete(email);
  verifiedStore.set(`email:${email}`, { channel: "email", expiresAt: nowSec() + VERIFY_TTL_SECONDS });
  return { ok: true };
}

/** ===== SMS OTP via Twilio Verify ===== */

function getTwilioClient() {
  const sid = process.env.TWILIO_ACCOUNT_SID;
  const token = process.env.TWILIO_AUTH_TOKEN;
  if (!sid || !token) {
    throw new Error("TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN are required for SMS OTP");
  }
  return new Twilio(sid, token);
}

function getVerifyServiceSid() {
  const v = process.env.TWILIO_VERIFY_SERVICE_SID;
  if (!v) throw new Error("TWILIO_VERIFY_SERVICE_SID is required for SMS OTP");
  return v;
}

export async function sendSmsOtp(phone: string) {
  // Expect E.164 like +91XXXXXXXXXX
  if (!/^\+?[1-9]\d{7,14}$/.test(phone)) {
    throw new Error("Invalid phone number format. Use country code, e.g., +91XXXXXXXXXX");
  }
  rateLimit(phone, "phone");
  const client = getTwilioClient();
  const serviceSid = getVerifyServiceSid();
  await client.verify.v2.services(serviceSid).verifications.create({
    channel: "sms",
    to: phone,
  });
  return { sent: true, ttl: 600 }; // Verify default TTL ~10min
}

export async function verifySmsOtp(phone: string, code: string) {
  if (!/^\d{4,8}$/.test(code)) return { ok: false, message: "Invalid code format." };
  const client = getTwilioClient();
  const serviceSid = getVerifyServiceSid();
  const check = await client.verify.v2.services(serviceSid).verificationChecks.create({
    to: phone,
    code,
  });
  if (check.status === "approved") {
    verifiedStore.set(`phone:${phone}`, { channel: "phone", expiresAt: nowSec() + VERIFY_TTL_SECONDS });
    return { ok: true };
  }
  return { ok: false, message: "Incorrect or expired code." };
}

/** ===== Helpers for signup route to assert server-side verified ===== */

export function assertVerifiedEmail(email: string) {
  const v = verifiedStore.get(`email:${email}`);
  if (!v || v.expiresAt < nowSec()) return false;
  return true;
}

export function assertVerifiedPhone(phone: string) {
  const v = verifiedStore.get(`phone:${phone}`);
  if (!v || v.expiresAt < nowSec()) return false;
  return true;
}
