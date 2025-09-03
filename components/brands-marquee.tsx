"use client"

type Logo = { src: string; alt: string }

const LOGOS: Logo[] = [
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-DJvAjHZMMdqj0X04KIuxRE4AWK7rne.png",
    alt: "Kwality Wall's",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-aqcTShjQmtbwGjztA26kLkee2DPr57.png",
    alt: "HMT Watches",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-ZxZ3mOq7GBfAyw9lolqBOiqNO7tF4Q.png",
    alt: "Cadbury",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-KgsqIQCpb1jYgfvba7aKZNXvcvRCz0.png",
    alt: "MIDANI",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-vGtYq1Y2oPNbrjpwhuK1pWJ4dB5Q1g.png",
    alt: "Western Refrigeration",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-eJDwKZKP6Fu0s8OM31feM01FezxicA.png",
    alt: "Hindustan Unilever",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-D2cjBOiCeggHKXk1EjIwmE4KqeCUPS.png",
    alt: "ALLWYN",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-lTjRDOPZmPVTlnMGa1N3v8jR3T7Nze.png",
    alt: "VOLTAS",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-kbiCzyucXPLxVGZJNt35osQ7zJqfjZ.png",
    alt: "APSRTC",
  },
  {
    src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-4xiJ2tg8IA6lKhwRhztUHp9Od8l4tW.png",
    alt: "Scoops Ice Cream",
  },
]

function Track({ items }: { items: Logo[] }) {
  return (
    <div className="flex shrink-0 items-center gap-10 px-6">
      {items.map((logo, idx) => (
        <div key={`${logo.alt}-${idx}`} className="flex h-16 w-[140px] items-center justify-center transition">
          <img
            src={logo.src || "/placeholder.svg"}
            alt={logo.alt}
            className="h-12 w-auto object-contain"
            loading="lazy"
          />
        </div>
      ))}
    </div>
  )
}

export default function BrandsMarquee() {
  return (
    <div className="relative w-full overflow-hidden">
      {/* gradient masks for edges */}
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-12 bg-gradient-to-r from-background to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-12 bg-gradient-to-l from-background to-transparent"
        aria-hidden
      />

      {/* wrapper animates left; contains two identical tracks for seamless loop */}
      <div className="flex w-max marquee">
        <Track items={LOGOS} />
        <Track items={LOGOS} />
      </div>

      <style jsx>{`
        @keyframes brands-marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .marquee {
          animation: brands-marquee 28s linear infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .marquee {
            animation: none !important;
          }
        }
      `}</style>
    </div>
  )
}
