import type React from "react"
import type { Metadata } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import { CartProvider } from "@/contexts/cart-context"
import { BookingProvider } from "@/contexts/booking-context"
import { AuthProvider } from "@/contexts/auth-context"
import { Toaster } from "@/components/ui/toaster"
import { TechnicianProvider } from "@/contexts/technician-context"
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "MAEGA - On-Demand Home & Appliance Services",
  description: "Reliable, affordable, and on-demand appliance repair & servicing with MAEGA professionals.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable} antialiased`}>
      <body className="font-body">
        <AuthProvider>
          <TechnicianProvider>
            <CartProvider>
              <BookingProvider>
                <Navigation />
                {children}
                <Toaster />
              </BookingProvider>
            </CartProvider>
          </TechnicianProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

