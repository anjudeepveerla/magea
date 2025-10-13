"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/components/auth/AuthProvider";
import { LogOut, User } from "lucide-react";

export default function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user, logout, status } = useAuth();

  const toggleMobileMenu = () => setIsMobileMenuOpen((p) => !p);

  const handleLogout = async () => {
    await logout();
  };

  const isAuthenticated = status === "authenticated" && !!user;

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
          <Link href="/services" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Services
          </Link>
          <Link href="/about" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            About
          </Link>
          <Link href="/portfolio" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Portfolio
          </Link>
          <Link href="/contact" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Contact
          </Link>
          <Link href="/join" className="text-foreground hover:text-blue-600 transition-colors font-medium">
            Join Now
          </Link>

          {!isAuthenticated ? (
            <Button size="sm" className="bg-blue-600 hover:bg-blue-700 text-white" asChild>
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <div className="flex items-center space-x-3">
              <Link
                href="/dashboard"
                className="flex items-center space-x-2 text-foreground hover:text-blue-600 transition-colors"
              >
                <User className="w-5 h-5" />
                <span className="font-medium hidden md:inline">
                  {user.firstName || user.email}
                </span>
              </Link>
              <Button
                size="icon"
                variant="ghost"
                onClick={handleLogout}
                className="text-gray-600 hover:text-red-600 transition-colors"
                aria-label="Logout"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          )}
        </nav>

        {/* Mobile section */}
        <div className="lg:hidden flex items-center space-x-2">
          {!isAuthenticated ? (
            <Button
              variant="outline"
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white border-blue-600"
              asChild
            >
              <Link href="/login">Login</Link>
            </Button>
          ) : (
            <>
              <Link
                href="/dashboard"
                className="p-2 text-blue-600 hover:text-blue-700"
                aria-label="Profile"
              >
                <User className="w-5 h-5" />
              </Link>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleLogout}
                aria-label="Logout"
                className="p-2 text-gray-600 hover:text-red-600"
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Hamburger menu toggle */}
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
              {[
                { href: "/services", label: "Services" },
                { href: "/about", label: "About" },
                { href: "/portfolio", label: "Portfolio" },
                { href: "/contact", label: "Contact" },
                { href: "/join", label: "Join Now" },
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-gray-800 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium py-3 px-4 rounded-xl border-l-4 border-transparent hover:border-blue-600"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}

              {isAuthenticated ? (
                <div className="flex items-center justify-between py-3 px-4 mt-2 border-t border-gray-100">
                  <Link href="/dashboard" className="flex items-center space-x-2 text-gray-800">
                    <User className="w-4 h-4 text-blue-600" />
                    <span className="font-medium">{user.firstName || user.email}</span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="flex items-center text-red-600 hover:underline text-sm font-medium"
                  >
                    <LogOut className="w-4 h-4 mr-1" />
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/login"
                  className="text-blue-600 font-semibold text-center py-3 px-4 rounded-xl bg-blue-50 hover:bg-blue-100 mt-4"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
