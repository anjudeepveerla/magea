"use client"

import type React from "react"
import { usePathname } from "next/navigation"
import Navigation from "@/components/navigation"
import { useEffect, useState } from "react"

export default function NavigationGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [mounted, setMounted] = useState(false)
  
  useEffect(() => {
    setMounted(true)
  }, [])
  
  if (!mounted) {
    return <>{children}</>
  }
  
  const hideNavigation = pathname?.startsWith("/technician-dashboard")
  return (
    <>
      {!hideNavigation && <Navigation />}
      {children}
    </>
  )
}


