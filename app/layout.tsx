// app/layout.tsx
import type React from "react";
import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/navigation";
import { AuthProvider } from "@/components/auth/AuthProvider";
import { getServerSession } from "@/lib/session";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "MAEGA - On-Demand Home & Appliance Services",
  description:
    "Reliable, affordable, and on-demand appliance repair & servicing with MAEGA professionals.",
  generator: "v0.app",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // SSR: read session from the HttpOnly cookie and pass to the client AuthProvider
  const session = await getServerSession();
  const initialUser = session
    ? {
        id: Number(session.sub),
        email: session.email,
        firstName: session.firstName ?? null,
        lastName: session.lastName ?? null,
      }
    : null;

  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-body">
        <AuthProvider initialUser={initialUser}>
          <Navigation />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
