"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { ChevronLeft, ChevronRight } from "lucide-react"

type Advisor = {
  name: string
  title: string
  bio: string
  imageSrc?: string
}

const advisors: Advisor[] = [
  {
    name: "Mr. Mihil Kumar Parial",
    title:
      "Director in Directorate General of Training, Ministry of Skill Development & Entrepreneurship, Govt. of India",
    bio: "An astute business leader with vast experience in training, skill development, and policy making. Over the last several decades, Mr. Mihil Kumar Parial has headed several public and private sector organizations, steering them through several milestones.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mihil_kumar.jpg-tinCfmfml0v6pQHLKNQq0ASZzsO1vI.jpeg",
  },
  {
    name: "Col Hitesh Bhatnagar",
    title: "Army Veteran",
    bio: "Robust leadership experience of 35+ years as a direct entry Commissioned Officer in the Indian Army, serving in varied executive and administrative appointments.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/col_hitesh_photo-0tDSNnHa8SnYdrr1cNy3krLuXIKvES.png",
  },
  {
    name: "G. Sathyanandan",
    title: "Ex. Vice President – Godrej",
    bio: "A seasoned sales and business leader with close to four decades of experience driving sales and fostering organizational growth.",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/satya-H0hmRKPiEulJwg2oZLlx3eRZG3tdpI.png",
  },
  {
    name: "Canute Desai",
    title: "Head – Sales & Marketing, Multinational Security",
    bio: "Mr. Desai has been an integral part of the world’s biggest security MNC – Group 4. Based in the Gulf region for nearly 3 decades, he has successfully led major initiatives in sales and marketing.",
    imageSrc: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Desai-rKNTHKib7Yzgqz96fNqUnHGTUx9ERz.png",
  },
  {
    name: "Prof. S. Pardhasaradhi",
    title: "Professor",
    bio: "An eminent scholar, educationist, and industry veteran with around 4 decades of rich industry and academic experience. Prof. Pardhasaradhi brings extensive expertise in business consulting and management.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Pardhasaradhi.jpg-2tZ63hftBKwO2a5UbDIEBlFnPRzR1g.jpeg",
  },
  {
    name: "Dr. S. K. Mathur",
    title: "Professor & Fellow, IIM – Bangalore",
    bio: "An illustrious academician and experienced management leader with over 35 years of diverse experience in innovation management, global business management, product development, and more.",
    imageSrc:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/mkMathur.jpg-ePG5c3u95B6yXZvpgY3qyNw7oYLBbN.jpeg",
  },
]

export function AdvisorsCarousel({
  className,
  heading = "Our Advisors",
}: {
  className?: string
  heading?: string
}) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [perView, setPerView] = React.useState(1)
  const [itemWidth, setItemWidth] = React.useState(0)
  const [index, setIndex] = React.useState(0)
  const [animating, setAnimating] = React.useState(true)

  const computePerView = React.useCallback(() => {
    const w = typeof window !== "undefined" ? window.innerWidth : 0
    if (w >= 1024) return 3
    if (w >= 768) return 2
    return 1
  }, [])

  const measure = React.useCallback(() => {
    const pv = computePerView()
    setPerView(pv)
    const width = containerRef.current?.clientWidth || 0
    setItemWidth(width / (pv || 1))
  }, [computePerView])

  React.useEffect(() => {
    measure()
    window.addEventListener("resize", measure)
    return () => window.removeEventListener("resize", measure)
  }, [measure])

  const slides = React.useMemo(() => {
    if (!advisors.length) return []
    const head = advisors.slice(0, perView)
    const tail = advisors.slice(-perView)
    return [...tail, ...advisors, ...head]
  }, [perView])

  React.useEffect(() => {
    setAnimating(false)
    setIndex(perView)
    const id = requestAnimationFrame(() => setAnimating(true))
    return () => cancelAnimationFrame(id)
  }, [perView])

  const go = (dir: "left" | "right") => {
    setAnimating(true)
    setIndex((prev) => prev + (dir === "left" ? -1 : 1))
  }

  const onTransitionEnd = () => {
    const total = advisors.length
    const lastIndex = total + perView - 1
    if (index <= perView - 1) {
      setAnimating(false)
      setIndex(total + (index - perView))
    } else if (index >= total + perView) {
      setAnimating(false)
      setIndex(perView + (index - (total + perView)))
    }
  }

  React.useEffect(() => {
    if (!animating) {
      const id = requestAnimationFrame(() => setAnimating(true))
      return () => cancelAnimationFrame(id)
    }
  }, [animating])

  return (
    <section className={cn("w-full", className)}>
      <div className="mx-auto max-w-6xl px-4">
        <div className="mb-8 text-center">
          <h2 className="text-pretty text-2xl font-semibold tracking-tight">{heading}</h2>
        </div>

        <div ref={containerRef} className="relative overflow-hidden rounded-lg">
          <div
            className={cn("flex", animating && "transition-transform duration-500 ease-out")}
            style={{ transform: `translateX(-${index * itemWidth}px)` }}
            onTransitionEnd={onTransitionEnd}
          >
            {slides.map((a, i) => (
              <div key={i} className="flex-none" style={{ width: `${itemWidth}px` }}>
                <article className="mx-4 rounded-3xl border bg-accent/10 p-6 shadow-sm">
                  <div className="mx-auto -mt-10 mb-4 w-36 rounded-md border bg-background p-2 shadow">
                    <img
                      src={
                        a.imageSrc ||
                        "/placeholder.svg?height=200&width=200&query=advisor%20portrait" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg" ||
                        "/placeholder.svg"
                      }
                      alt={`${a.name} portrait`}
                      className="h-36 w-36 rounded-sm object-cover"
                    />
                  </div>
                  <h3 className="text-center text-xl font-semibold leading-snug text-foreground">{a.name}</h3>
                  <p className="mt-1 text-center text-sm italic text-muted-foreground">{a.title}</p>
                  <p className="mt-4 text-center text-sm leading-relaxed text-foreground/90">{a.bio}</p>
                </article>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous advisors"
            onClick={() => go("left")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-muted"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="Next advisors"
            onClick={() => go("right")}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background hover:bg-muted"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default AdvisorsCarousel
