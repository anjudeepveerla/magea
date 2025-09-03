"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Phone, Mail, RefreshCw, CheckCircle } from "lucide-react"

interface OTPVerificationProps {
  mobile: string
  email: string
  onVerify: (otp: string) => void
  onBack: () => void
  isLoading?: boolean
}

export default function OTPVerification({ mobile, email, onVerify, onBack, isLoading }: OTPVerificationProps) {
  const [otp, setOtp] = useState(["", "", "", "", "", ""])
  const [error, setError] = useState("")
  const [resendTimer, setResendTimer] = useState(30)
  const [canResend, setCanResend] = useState(false)
  const [isResending, setIsResending] = useState(false)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timer)
    } else {
      setCanResend(true)
    }
  }, [resendTimer])

  const handleOtpChange = (index: number, value: string) => {
    if (value.length > 1) return

    const newOtp = [...otp]
    newOtp[index] = value
    setOtp(newOtp)
    setError("")

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus()
    }

    // Auto-submit when all fields are filled
    if (newOtp.every((digit) => digit !== "") && newOtp.join("").length === 6) {
      handleVerify(newOtp.join(""))
    }
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleVerify = (otpCode?: string) => {
    const otpToVerify = otpCode || otp.join("")

    if (otpToVerify.length !== 6) {
      setError("Please enter complete 6-digit OTP")
      return
    }

    // Demo: Accept any 6-digit OTP for testing
    if (otpToVerify === "123456" || otpToVerify.length === 6) {
      onVerify(otpToVerify)
    } else {
      setError("Invalid OTP. Please try again.")
    }
  }

  const handleResendOTP = async () => {
    setIsResending(true)
    setError("")

    // Simulate API call
    setTimeout(() => {
      setIsResending(false)
      setResendTimer(30)
      setCanResend(false)
      setOtp(["", "", "", "", "", ""])
      console.log("[v0] OTP resent to:", mobile, email)
    }, 1000)
  }

  const maskMobile = (mobile: string) => {
    return mobile.replace(/(\d{2})\d{6}(\d{2})/, "$1******$2")
  }

  const maskEmail = (email: string) => {
    const [username, domain] = email.split("@")
    if (username.length <= 2) {
      return `${username.charAt(0)}*@${domain}`
    }
    const maskedUsername = username.charAt(0) + "*".repeat(username.length - 2) + username.charAt(username.length - 1)
    return `${maskedUsername}@${domain}`
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          <Shield className="h-6 w-6 text-primary" />
          Verify OTP
        </CardTitle>
        <CardDescription>
          We've sent a 6-digit verification code to your registered mobile number and email address
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Contact Info Display */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Phone className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Mobile</p>
              <p className="text-sm text-muted-foreground">+91 {maskMobile(mobile)}</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
            <Mail className="h-4 w-4 text-primary" />
            <div>
              <p className="text-sm font-medium">Email</p>
              <p className="text-sm text-muted-foreground">{maskEmail(email)}</p>
            </div>
          </div>
        </div>

        {/* OTP Input */}
        <div className="space-y-4">
          <div className="flex justify-center gap-2">
            {otp.map((digit, index) => (
              <Input
                key={index}
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value.replace(/\D/g, ""))}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-lg font-semibold"
                disabled={isLoading}
              />
            ))}
          </div>

          {error && (
            <div className="text-center">
              <p className="text-sm text-red-500">{error}</p>
            </div>
          )}

          {/* Demo Instructions */}
          <div className="text-center p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-700">
              <CheckCircle className="h-4 w-4 inline mr-1" />
              Demo Mode: Use <strong>123456</strong> or any 6-digit code
            </p>
          </div>
        </div>

        {/* Resend OTP */}
        <div className="text-center">
          {canResend ? (
            <Button
              variant="ghost"
              onClick={handleResendOTP}
              disabled={isResending}
              className="text-primary hover:text-primary/80"
            >
              {isResending ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Resending...
                </>
              ) : (
                <>
                  <RefreshCw className="h-4 w-4 mr-2" />
                  Resend OTP
                </>
              )}
            </Button>
          ) : (
            <p className="text-sm text-muted-foreground">
              Resend OTP in <span className="font-medium text-primary">{resendTimer}s</span>
            </p>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Back
          </Button>
          <Button
            onClick={() => handleVerify()}
            disabled={isLoading || otp.some((digit) => digit === "")}
            className="flex-1"
          >
            {isLoading ? "Verifying..." : "Verify & Continue"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
