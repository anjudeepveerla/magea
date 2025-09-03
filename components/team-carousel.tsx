"use client"

import * as React from "react"

type Member = {
  name: string
  title: string
  bio: string
  imageUrl: string
}

const TEAM: Member[] = [
  {
    name: "Talla Veerender Nath",
    title: "Founder & MD – Maega Services",
    bio: "A serial entrepreneur, angel investor, mentor to start-ups, and pioneer in the field of R&AC. He is the MD and Chairman of Maega Services. Over the last two and a half decades, he has worked with thousands of young minds, imparting professionalism, skills, and know-how in the R&AC world.",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/veerendra-pic-b4ZBUHkIeVWZFTcDr0SzLT8GJczIHl.png",
  },
  {
    name: "Devika Ramgirwar",
    title: "HR & Operations Head",
    bio: "With an in-depth hold on accounting and financial management, she brings a wealth of experience and an expert perspective, thus adding great depth to the team.",
    imageUrl:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/devika_sign.jpg-RLab8lEBeSAK1G7HLn20uGjXdaDsxt.jpeg",
  },
  {
    name: "Krishna Kumar",
    title: "Chief Technical Officer",
    bio: "16+ years of experience in Product Life Cycle Management across business, technology, analysis, and architecture; expertise in OOP, SOA, and multi-tier web/cloud/ERP applications.",
    imageUrl: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/kumar.jpg-sAja8zSauaU8mtI3UTUqSmxhCCf6SH.jpeg",
  },
]

function Card({ m }: { m: Member }) {
  return (
    <article className="mx-3 rounded-2xl bg-muted/30 p-6 text-center shadow-sm ring-1 ring-border">
      <div className="mx-auto -mt-16 mb-4 h-32 w-32 overflow-hidden rounded-lg border bg-background ring-1 ring-border">
        <img src={m.imageUrl || "/placeholder.svg"} alt={`${m.name} portrait`} className="h-full w-full object-cover" />
      </div>
      <h3 className="text-lg font-semibold text-pretty">{m.name}</h3>
      <p className="mt-1 text-sm italic text-muted-foreground">{m.title}</p>
      <p className="mt-3 text-sm leading-relaxed text-pretty">{m.bio}</p>
    </article>
  )
}

export default function TeamCarousel() {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const [perView, setPerView] = React.useState(1)
  const [slideWidth, setSlideWidth] = React.useState(0)
  const [index, setIndex] = React.useState(0)
  const [isTransitioning, setIsTransitioning] = React.useState(false)

  React.useEffect(() => {
    const calc = () => {
      const w = typeof window !== "undefined" ? window.innerWidth : 0
      if (w >= 1024) setPerView(3)
      else if (w >= 768) setPerView(2)
      else setPerView(1)
    }
    calc()
    window.addEventListener("resize", calc)
    return () => window.removeEventListener("resize", calc)
  }, [])

  React.useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(() => setSlideWidth(el.clientWidth / perView))
    ro.observe(el)
    return () => ro.disconnect()
  }, [perView])

  const slides = React.useMemo(() => {
    const head = TEAM.slice(0, perView)
    const tail = TEAM.slice(-perView)
    return [...tail, ...TEAM, ...head]
  }, [perView])

  React.useEffect(() => {
    setIndex(perView)
  }, [perView])

  const total = TEAM.length
  const goTo = (i: number) => {
    if (isTransitioning || slideWidth === 0) return
    setIsTransitioning(true)
    setIndex(i)
  }
  const next = () => goTo(index + 1)
  const prev = () => goTo(index - 1)

  const onEnd = () => {
    setIsTransitioning(false)
    if (index <= perView - 1) setIndex(total + (index - perView))
    else if (index >= total + perView) setIndex(perView + (index - (total + perView)))
  }

  return (
    <section className="w-full py-16 bg-background" aria-labelledby="leadership-team">
      <div className="mx-auto max-w-6xl px-4">
        <h2 id="leadership-team" className="mb-8 text-center text-2xl font-semibold tracking-tight">
          Leadership Team
        </h2>
        <div ref={containerRef} className="relative overflow-hidden rounded-lg">
          <div
            className={`flex ${isTransitioning ? "transition-transform duration-500 ease-out" : ""}`}
            style={{ transform: `translateX(-${index * slideWidth}px)` }}
            onTransitionEnd={onEnd}
          >
            {slides.map((m, i) => (
              <div key={`${m.name}-${i}`} className="flex-none py-16" style={{ width: slideWidth }}>
                <Card m={m} />
              </div>
            ))}
          </div>
        </div>
        <div className="mt-6 flex items-center justify-center gap-3">
          <button
            type="button"
            aria-label="Previous team members"
            onClick={prev}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-foreground shadow-sm hover:bg-muted"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M12.5 4l-5 6 5 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
          <button
            type="button"
            aria-label="Next team members"
            onClick={next}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border bg-background text-foreground shadow-sm hover:bg-muted"
          >
            <svg width="20" height="20" viewBox="0 0 20 20" aria-hidden="true">
              <path
                d="M7.5 4l5 6-5 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  )
}
