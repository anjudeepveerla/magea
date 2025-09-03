"use client"

import { useEffect, useMemo, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star } from "lucide-react"

type Testimonial = {
  name: string
  rating: number
  comment: string
  service: string
}

interface Props {
  items: Testimonial[]
  intervalMs?: number
}

export default function TestimonialsCarousel({ items, intervalMs = 3500 }: Props) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [perView, setPerView] = useState(1)
  const [index, setIndex] = useState(0)
  const [isAnimating, setIsAnimating] = useState(true)

  // responsive items per view
  useEffect(() => {
    const update = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 0
      if (w >= 1024) setPerView(3)
      else if (w >= 768) setPerView(2)
      else setPerView(1)
    }
    update()
    window.addEventListener("resize", update)
    return () => window.removeEventListener("resize", update)
  }, [])

  const trackItems = useMemo(() => {
    // duplicate head for seamless looping
    return [...items, ...items.slice(0, perView)]
  }, [items, perView])

  // auto-advance
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    const id = setInterval(() => setIndex((i) => i + 1), intervalMs)
    return () => clearInterval(id)
  }, [intervalMs])

  // reset to start when reaching duplicated tail
  useEffect(() => {
    if (index < items.length) return
    // jump back without animation so it's seamless
    const timeout = setTimeout(() => {
      setIsAnimating(false)
      setIndex(0)
      // next frame turn animation back on
      requestAnimationFrame(() => setIsAnimating(true))
    }, 20)
    return () => clearTimeout(timeout)
  }, [index, items.length])

  const slideWidthPct = 100 / perView
  const translatePct = -(index * slideWidthPct)

  return (
    <div
      ref={containerRef}
      className="relative w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-live="polite"
    >
      <div
        className={`flex`}
        style={{
          width: `${trackItems.length * slideWidthPct}%`,
          transform: `translateX(${translatePct}%)`,
          transition: isAnimating ? "transform 600ms ease" : "none",
        }}
      >
        {trackItems.map((t, i) => (
          <div key={i} style={{ width: `${slideWidthPct}%`, flex: "0 0 auto" }} className="px-2 md:px-3">
            <Card className="border-0 shadow-lg h-full">
              <CardHeader>
                <div className="flex items-center space-x-1 mb-2">
                  {Array.from({ length: t.rating }).map((_, s) => (
                    <Star key={s} className="h-4 w-4 text-accent fill-current" />
                  ))}
                </div>
                <CardTitle className="font-heading text-lg">{t.name}</CardTitle>
                <Badge variant="secondary" className="w-fit text-xs">
                  {t.service}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground italic">"{t.comment}"</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
