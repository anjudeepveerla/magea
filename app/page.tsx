import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Star, Clock, Shield, Headphones, CheckCircle, ArrowRight } from "lucide-react"
import Link from "next/link"
import TestimonialsCarousel from "@/components/testimonials-carousel"

const services = [
  {
    id: "ac-services",
    title: "AC Services",
    description: "Complete AC repair, installation & maintenance",
    image: "/air-conditioner-repair.png",
    href: "/services/ac-services",
  },
  {
    id: "refrigerators",
    title: "Refrigerators",
    description: "Expert refrigerator repair & servicing",
    image: "/refrigerator-repair.png",
    href: "/services/refrigerators",
  },
  {
    id: "deep-freezers",
    title: "Deep Freezers",
    description: "Professional deep freezer maintenance",
    image: "/deep-freezer-repair.png",
    href: "/services/deep-freezers",
  },
  {
    id: "bottle-coolers",
    title: "Bottle Coolers",
    description: "Bottle cooler repair & servicing",
    image: "/bottle-cooler-maintenance.png",
    href: "/services/bottle-coolers",
  },
  {
    id: "visi-coolers",
    title: "Visi Coolers",
    description: "Visi cooler repair & maintenance",
    image: "/visi-cooler-repair.png",
    href: "/services/visi-coolers",
  },
  {
    id: "fow",
    title: "FOW (Freezer on Wheels)",
    description: "Mobile freezer unit servicing",
    image: "/placeholder-e2kxc.png",
    href: "/services/fow",
  },
  {
    id: "water-coolers",
    title: "Water Coolers",
    description: "Water cooler repair & maintenance",
    image: "/water-cooler-repair.png",
    href: "/services/water-coolers",
  },
  {
    id: "water-dispensers",
    title: "Water Dispensers",
    description: "Water dispenser servicing & repair",
    image: "/placeholder-stqsp.png",
    href: "/services/water-dispensers",
  },
  {
    id: "refrigerator-vans",
    title: "Refrigerator Vans",
    description: "Commercial refrigerator van services",
    image: "/refrigerator-van-repair.png",
    href: "/services/refrigerator-vans",
  },
  {
    id: "cold-rooms",
    title: "Cold Rooms",
    description: "Cold room installation & maintenance",
    image: "/placeholder-h7r34.png",
    href: "/services/cold-rooms",
  },
]

const testimonials = [
  {
    name: "Rajesh Kumar",
    rating: 5,
    comment: "Excellent service! Fixed my AC in just 2 hours. Very professional technician.",
    service: "AC Repair",
  },
  {
    name: "Priya Sharma",
    rating: 5,
    comment: "Quick response and fair pricing. My refrigerator is working perfectly now.",
    service: "Refrigerator Service",
  },
  {
    name: "Mohammed Ali",
    rating: 5,
    comment: "Reliable service for our restaurant's deep freezer. Highly recommended!",
    service: "Deep Freezer Maintenance",
  },
  {
    name: "Sanjana Reddy",
    rating: 5,
    comment: "Booking was smooth and the technician arrived on time. Great experience overall.",
    service: "Water Cooler Service",
  },
  {
    name: "Anil Verma",
    rating: 5,
    comment: "Diagnosed the issue quickly and explained the fix clearly. Very transparent.",
    service: "AC Installation",
  },
  {
    name: "Farha Khan",
    rating: 5,
    comment: "Our visi cooler is back to peak performance. Superb workmanship!",
    service: "Visi Cooler Repair",
  },
  {
    name: "Ravi Teja",
    rating: 5,
    comment: "Professional team and fair pricing. Will definitely call them again.",
    service: "Refrigerator Repair",
  },
  {
    name: "Meena Iyer",
    rating: 5,
    comment: "Same-day service saved our event. Thank you for the quick turnaround!",
    service: "Deep Freezer Emergency Service",
  },
]

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-card py-20 lg:py-32 pt-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge variant="secondary" className="w-fit">
                  Trusted by 10,000+ Customers
                </Badge>
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                  Expert Home & Appliance Services at Your Doorstep
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Reliable, affordable, and on-demand appliance repair & servicing with MAEGA professionals. Get your
                  appliances fixed by verified technicians in hours, not days.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" asChild>
                  <Link href="#services">
                    Book a Service Now
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/track">Track My Booking</Link>
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-4">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Same Day Service</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Verified Technicians</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-accent" />
                  <span className="text-sm text-muted-foreground">Fair Pricing</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/air-conditioner-repair.png"
                alt="Professional technician repairing air conditioner"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Star className="h-6 w-6 text-accent-foreground fill-current" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">4.9/5 Rating</p>
                    <p className="text-sm text-muted-foreground">From 2,500+ reviews</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why MAEGA Section */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Why MAEGA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're revolutionizing home appliance services with our on-demand platform
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">Fast Service</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Get your appliances fixed within hours, not days. Our technicians are always ready to help.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Badge className="h-8 w-8 text-accent bg-transparent border-0 p-0">₹</Badge>
                </div>
                <CardTitle className="font-heading text-xl">Affordable Pricing</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Transparent, pay-as-needed pricing with no hidden charges. Only pay for what you need.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="font-heading text-xl">Trusted Professionals</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  All our technicians are verified, trained, and insured for your peace of mind.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section id="services" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Our Services</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Professional repair and maintenance services for all your home and commercial appliances
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
            {services.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-2">
                  <CardTitle className="font-heading text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="pt-0">
                  <Button className="w-full bg-transparent" variant="outline" asChild>
                    <Link href={service.href}>
                      View More
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">What Our Customers Say</h2>
            <p className="text-lg text-muted-foreground">
              Don't just take our word for it - hear from our satisfied customers
            </p>
          </div>

          <TestimonialsCarousel items={testimonials} />
        </div>
      </section>

      {/* Trust Badges */}
      <section className="py-16 bg-background border-t border-border">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Verified Technicians</h3>
              <p className="text-sm text-muted-foreground">Background checked & trained professionals</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-accent" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">Secure Payments</h3>
              <p className="text-sm text-muted-foreground">Safe & secure payment processing</p>
            </div>

            <div className="flex flex-col items-center space-y-3">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center">
                <Headphones className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="font-heading font-semibold text-foreground">24x7 Support</h3>
              <p className="text-sm text-muted-foreground">Round the clock customer support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">MAEGA</h3>
                  <p className="text-xs opacity-80">On-Demand Services</p>
                </div>
              </div>
              <p className="text-sm opacity-80">
                Professional home and appliance services at your doorstep. Reliable, affordable, and on-demand.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/services/ac-services" className="hover:opacity-100 transition-opacity">
                    AC Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/refrigerators" className="hover:opacity-100 transition-opacity">
                    Refrigerators
                  </Link>
                </li>
                <li>
                  <Link href="/services/deep-freezers" className="hover:opacity-100 transition-opacity">
                    Deep Freezers
                  </Link>
                </li>
                <li>
                  <Link href="/services/water-coolers" className="hover:opacity-100 transition-opacity">
                    Water Coolers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/about" className="hover:opacity-100 transition-opacity">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:opacity-100 transition-opacity">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:opacity-100 transition-opacity">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-sm opacity-80">© 2024 MAEGA. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>

      {/* WhatsApp Chat Button */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full w-14 h-14 bg-accent hover:bg-accent/90 shadow-lg" asChild>
          <a href="https://wa.me/1234567890" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </a>
        </Button>
      </div>
    </div>
  )
}
