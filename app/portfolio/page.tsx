"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Award, Users, Clock } from "lucide-react"
import Link from "next/link"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import BrandsMarquee from "@/components/brands-marquee"

const portfolioImages = [
  {
    id: 1,
    title: "Award Felicitation",
    category: "Event",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/1-u2rwkYKUA00qgyXYhB9NBBapDF7gPd.png",
  },
  {
    id: 2,
    title: "Lamp Lighting",
    category: "Inauguration",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/2-iVVtqBgib5QE5a1XE7hNZhB3hkfhXw.png",
  },
  {
    id: 3,
    title: "Ceremonial Lighting",
    category: "Inauguration",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-OaANCW4elKmJsIU52ShT6bpENSeWWh.png",
  },
  {
    id: 4,
    title: "Recognition on Stage",
    category: "Event",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/4-fGFT94pBnl0DArC8BHP1i5faIx4TPv.png",
  },
  {
    id: 5,
    title: "Distinguished Gathering",
    category: "Conference",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/5-aofZlYumHMbHZ85tP1BKksziRycJkb.png",
  },
  {
    id: 6,
    title: "Panel Session",
    category: "Conference",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/6-IRiHjUHjgu1n8iV5106GpWndFMDd4B.png",
  },
  {
    id: 7,
    title: "Summit Welcome",
    category: "Expo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/7-nfUTF4OS0ttVFqjqVQAzhedtcunogM.png",
  },
  {
    id: 8,
    title: "Leaders in Discussion",
    category: "Meeting",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/8-GQ2sxFsmcWQ1BeKWkKZSgBd1CnXLrz.png",
  },
  {
    id: 9,
    title: "Panel With Guests",
    category: "Conference",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/9-A3zBNUL9mLi2MqI3WBjiSTb6Yv5nlB.png",
  },
  {
    id: 10,
    title: "Inauguration Moment",
    category: "Inauguration",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/10-hH2MNksi5k6PVhdvgE2tBradApmKX7.png",
  },
  {
    id: 11,
    title: "Lighting the Lamp",
    category: "Inauguration",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/11-OsVkle3wkMye2t7P21Oan0meH9VWKd.png",
  },
  {
    id: 12,
    title: "On‑stage Greeting",
    category: "Event",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/12-Ber6AfZWCkjISNeXXnNL2JrGmO8nS9.png",
  },
  {
    id: 13,
    title: "R&AC Lab Training",
    category: "Training",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/13-76egxeNu4rhKvZrhSnPemXFkUB3CAf.png",
  },
  {
    id: 14,
    title: "Airport Felicitation",
    category: "Recognition",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/14-eROjNsFtfqhVl0lo91vF0tMrstXPv6.png",
  },
  {
    id: 15,
    title: "Night Event Entrance",
    category: "Event",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/15-BUReHroSjiK5d9MaUdqW2ZHOVknoAi.png",
  },
  {
    id: 16,
    title: "Skills Jury at Venue",
    category: "Competition",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/16-Bzfoyj4WFw87bOUcVh0fkp8K5hWY3R.png",
  },
  {
    id: 17,
    title: "IndiaSkills North 2018",
    category: "Competition",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/17-WGnLWs5IiC9B8xr8ivI9sfjaZwLET1.png",
  },
  {
    id: 18,
    title: "Visit to NSTI Hyderabad",
    category: "Visit",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/18-NtYd5YvvGhZSw4XSgFeeD4s61PwyAR.png",
  },
  {
    id: 19,
    title: "ICE Cold Chain Expo",
    category: "Expo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/19-ev12ikl5egL0AN4Emr5Y5T9IKxceNQ.png",
  },
  {
    id: 20,
    title: "International Delegation",
    category: "Meeting",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/20-Qfb1BPCKfwrDvoawnY8gUxI0I9uzAR.png",
  },
  {
    id: 21,
    title: "Hotel Lobby Delegation",
    category: "Meeting",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/21-SJZsgnaEgsqJiD5yTG9Tno0B4z7Gjn.png",
  },
  {
    id: 22,
    title: "Expo Stall Seating",
    category: "Expo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/22-QiAdKkKDSGUq9CiFOZ5I1RZEkbmoFg.png",
  },
  {
    id: 23,
    title: "NSTI Booth Discussion",
    category: "Expo",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/23-7PgHXwSYhFnuO0GbF6ZekotosQGiUz.png",
  },
]

const stats = [
  { icon: Users, value: "10,000+", label: "Happy Customers" },
  { icon: Award, value: "5,000+", label: "Projects Completed" },
  { icon: Star, value: "4.9/5", label: "Average Rating" },
  { icon: Clock, value: "24/7", label: "Support Available" },
]

export default function PortfolioPage() {
  const [active, setActive] = useState<number | null>(null)

  return (
    <div className="min-h-screen bg-background pt-24">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-8 max-w-4xl mx-auto">
            <Badge variant="secondary" className="w-fit mx-auto">
              Our Excellence Portfolio
            </Badge>
            <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
              MAEGA&apos;s Excellence in Action
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
              Discover our track record of delivering exceptional services across prestigious events and collaborations.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 pt-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                  <div className="font-heading font-bold text-2xl text-foreground">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Gallery */}
      <section className="py-20 bg-background" id="gallery">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Our Work Gallery</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              A curated set of moments from national innovation summits, inaugurations, and leadership interactions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {portfolioImages.map((item, idx) => (
              <Dialog key={item.id} open={active === idx} onOpenChange={(o) => setActive(o ? idx : null)}>
                <DialogTrigger asChild>
                  <Card className="group cursor-zoom-in overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300">
                    <div className="aspect-[3/2] overflow-hidden bg-muted">
                      <img
                        src={item.image || "/placeholder.svg"}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-[1.02] transition-transform duration-300"
                        loading="lazy"
                      />
                    </div>
                    <CardContent className="p-4">
                      <Badge variant="secondary" className="text-xs mb-2">
                        {item.category}
                      </Badge>
                      <h3 className="font-heading font-semibold text-sm text-foreground">{item.title}</h3>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent className="max-w-5xl w-[95vw] p-2 sm:p-4">
                  <div className="w-full">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.title}
                      className="mx-auto h-auto max-h-[80vh] w-auto object-contain rounded-md"
                    />
                  </div>
                </DialogContent>
              </Dialog>
            ))}
          </div>
        </div>
      </section>

      {/* Associated with Leading Institutions… */}
      <section className="py-16 bg-card/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto space-y-4 text-center">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground text-balance">
              Associated with Leading Institutions, Global Brands and Systems
            </h2>
            <p className="text-muted-foreground leading-relaxed">
              MAEGA Services has been associated with several prominent Institutions and brands such as APSRTC, HMT,
              ALLWYN, VOLTAS, MIDANI, Hindustan Uniliver (Kwality Walls Ice Cream Freezers), Western Refrigeration,
              Scoops, Heritage, and Cadbury Chocolate Freezers among many others. MAEGA has successfully partnered with
              these brands in undertaking numerous critical projects.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              In addition to this, MAEGA Services has also been involved in the training and professional development
              programs in the R&amp;AC sector. Over the last 30 years, MAEGA&apos;s decorated training faculty has
              trained over 25,000 Refrigerators and Air Conditioner technicians.
            </p>
          </div>
          <div className="mt-10">
            <BrandsMarquee />
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl">Ready to Experience MAEGA Excellence?</h2>
            <p className="text-lg opacity-90">
              Join thousands of satisfied customers who trust MAEGA for their service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/services">Book a Service</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Get Quote</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
