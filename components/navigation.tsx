"use client";

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useState } from "react"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import { useTechnician } from "@/contexts/technician-context"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { cart } = useCart()
  const cartItemCount = cart.reduce((sum, item) => sum + item.quantity, 0)
  const { isAuthenticated, user, logout } = useAuth()
  const { isTechAuthenticated, logoutTechnician } = useTechnician()

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 hover:opacity-80 transition-opacity">
          <img
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hzPhiTcquwE6NDH7GuUV1CBffal9ao.png"
            alt="MAEGA logo"
            className="h-11 md:h-12 w-auto"
          />
        </Link>

        {/* Desktop navigation */}
        <nav className="hidden lg:flex items-center space-x-6">
          <Link href="/" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Home
          </Link>
          <Link href="/services" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Services
          </Link>
          <Link href="/about" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link href="/portfolio" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Portfolio
          </Link>
          {!isTechAuthenticated && (
            <Link href="/join" className="text-foreground hover:text-blue-600 transition-colors font-medium">
              Partner With Maega
            </Link>
          )}
          <Link href="/contact" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Contact
          </Link>
          {!isTechAuthenticated && (
            <Link href="/cart" className="relative text-foreground hover:text-blue-600 transition-colors font-medium">
              <span className="inline-flex items-center">Cart</span>
              {cartItemCount > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {cartItemCount}
                </Badge>
              )}
            </Link>
          )}
          {isTechAuthenticated ? (
            <Button size="sm" variant="outline" className="border-blue-600 text-blue-600" asChild>
              <Link href="/technician-dashboard">My Dashboard</Link>
            </Button>
          ) : !isAuthenticated ? (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button size="sm" variant="outline" className="border-blue-600 text-blue-600">
                  My Account
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">Dashboard</Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard">My Bookings</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={logout} variant="destructive">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </nav>

        {/* Mobile section */}
        <div className="lg:hidden flex items-center space-x-2">
          {isTechAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600"
              asChild
            >
              <Link href="/technician-dashboard">My Dashboard</Link>
            </Button>
          ) : !isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              className="border-blue-600 text-blue-600"
              asChild
            >
              <Link href="/dashboard">My Account</Link>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMobileMenu}
            className="p-3 hover:bg-blue-50 border border-blue-200 rounded-lg transition-all duration-300 ease-in-out"
            aria-label="Toggle menu"
          >
            <div className="relative w-6 h-6 flex items-center justify-center">
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "rotate-45" : "rotate-0"
                }`}
              >
                <div
                  className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "-rotate-45" : "rotate-0"
                }`}
              >
                <div
                  className={`w-6 h-0.5 bg-blue-600 transition-all duration-300 ${
                    isMobileMenuOpen ? "opacity-100" : "opacity-0"
                  }`}
                ></div>
              </div>
              <div
                className={`absolute transition-all duration-300 ease-in-out ${
                  isMobileMenuOpen ? "opacity-0 scale-0" : "opacity-100 scale-100"
                }`}
              >
                <div className="flex flex-col space-y-1">
                  <div className="w-6 h-0.5 bg-blue-600"></div>
                  <div className="w-6 h-0.5 bg-blue-600"></div>
                  <div className="w-6 h-0.5 bg-blue-600"></div>
                </div>
              </div>
            </div>
          </Button>
        </div>
      </div>

      {/* Mobile dropdown menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-white border-b border-gray-200 shadow-xl animate-in slide-in-from-top-4 duration-300 ease-out">
          <nav className="container mx-auto px-4 py-6">
            <div className="flex flex-col space-y-1">
              <Link
                href="/"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/services"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/about"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/portfolio"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Portfolio
              </Link>
              <Link
                href="/contact"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Contact
              </Link>
              <Link
                href="/join"
                className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Partner With Maega
              </Link>
              <Link
                href="/cart"
                className="relative text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Cart
                {cartItemCount > 0 && (
                  <Badge className="absolute top-2 right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {cartItemCount}
                  </Badge>
                )}
              </Link>
              {isAuthenticated ? (
                <Link
                  href="/dashboard"
                  className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl touch-manipulation border-l-4 border-transparent hover:border-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  My Account
                </Link>
              ) : null}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
