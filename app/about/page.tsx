"use client"
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Users, Award, Clock, Shield, Heart, ArrowRight, ChevronDown } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { AdvisorsCarousel } from "@/components/advisors-carousel"
import TeamCarousel from "@/components/team-carousel"

export default function AboutPage() {
  const [openFAQ, setOpenFAQ] = useState<number | null>(null)

  const toggleFAQ = (index: number) => {
    setOpenFAQ(openFAQ === index ? null : index)
  }

  const faqs = [
    {
      question: "What types of appliances do you service?",
      answer:
        "We service a wide range of appliances including air conditioners, refrigerators, deep freezers, bottle coolers, visi coolers, water coolers, water dispensers, freezer vans, and cold rooms. Our technicians are trained to handle both residential and commercial appliances.",
    },
    {
      question: "How quickly can you respond to service requests?",
      answer:
        "We offer same-day service for most requests. Our typical response time is within 2-4 hours for urgent repairs. You can schedule appointments at your convenience, and we'll arrive within the agreed time slot.",
    },
    {
      question: "Are your technicians certified and insured?",
      answer:
        "Yes, all our technicians are thoroughly vetted, certified, and insured. They undergo regular training to stay updated with the latest appliance technologies and repair techniques.",
    },
    {
      question: "Do you provide warranties on your services?",
      answer:
        "We provide service warranties on all our repair work. The warranty period varies depending on the type of service, but typically ranges from 30 to 90 days.",
    },
    {
      question: "What are your service charges?",
      answer:
        "Our pricing is transparent with no hidden fees. Service charges vary based on the type of appliance and complexity of the repair. We provide upfront estimates before starting any work.",
    },
    {
      question: "Do you provide emergency services?",
      answer:
        "Yes, we offer 24/7 emergency services for critical appliance failures, especially for commercial clients. Emergency service charges may apply for after-hours calls.",
    },
    {
      question: "How can I track my service request?",
      answer:
        "You can easily track your booking status through our website using your booking ID. We also send SMS and email updates at each stage of the service process.",
    },
    {
      question: "What payment methods do you accept?",
      answer:
        "We accept various payment methods including cash, UPI, credit/debit cards, and digital wallets. Payment is typically collected after the service is completed to your satisfaction.",
    },
  ]

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-card py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit mx-auto">
                About MAEGA
              </Badge>
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                Revolutionizing Home Appliance Services
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-auto">
                At MAEGA, we believe that reliable appliance service shouldn't be a luxury. We're transforming the way
                people access professional repair and maintenance services for their home and commercial appliances.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Maega */}
      <section className="py-16 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-start">
            <div>
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground mb-6">About Maega</h2>
              <div className="space-y-5 text-muted-foreground leading-relaxed max-w-4xl">
                <p>Vetted, Certified &amp; Screened Professionals</p>
                <p>
                  Air conditioning, refrigeration and cooling systems are an integral part of our homes, offices and
                  commercial establishments. Their efficient functioning is one of the pre-requisites of our lives today
                  and dictate how our world operates. Ensuring their longevity and efficacy requires a professional
                  touch along with an in-depth know-how of these machines which is quite an arduous task. This is where
                  Maega Services with its decades of expertise comes in. Maega Services is an industry leader in the
                  field of air conditioners, refrigerators and cooling systems providing service, maintenance and repair
                  at the click of a button.
                </p>
                <p>
                  Armed with a state-of the-art workshop and trained professionals to cater to your device’s cooling
                  needs Maega Services over the last many years has developed an eco-system of well trained
                  professionals who not just understand your devices’ but your needs as well.
                </p>
                <p>
                  We are also associated with numerous initiatives of the Government of India in the areas of skill
                  development and training and possess a team of industry experts and subject matter experts to carry
                  out our mission of bringing greater professionalism in the field of A/C and refrigerators repairs and
                  service.
                </p>
                <p>
                  For our expertise in the areas of Refrigerators and AC (R&amp;AC), Maega Services has been selected as
                  the privileged training partner by organizations both nationally and internationally. Over the years,
                  we have imparted the skills and knowledge to countless young professionals fostering their
                  professional growth.
                </p>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nav-logo-left-HhKKJVYy93iF5082JUjZ3rLLJSb4UX.png"
                alt="MAEGA logo"
                className="h-28 w-auto lg:h-36 object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Founder Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Talla Veerender Nath</h2>
              <p className="mt-2 text-sm sm:text-base text-muted-foreground">
                Founder &amp; MD - Maega Services, Serial Entrepreneur, CEO, Founder, Seed &amp; Angel Investor, MD,
                Chairman &amp; Business Partner
              </p>
              <div className="mt-6 space-y-5 text-muted-foreground leading-relaxed">
                <p>
                  A serial entrepreneur, angel Investor, mentor to start-ups and a pioneer in the field of R&amp;AC,
                  Talla Veerender Nath is a man with several hats and the MD and Chairman of Maega Services. Through
                  Maega Services, he has worked with thousands of young minds over the last two half decades imparting
                  the essence of professionalism and the skills and know-how of the R&amp;AC world.
                </p>
                <p>
                  Over the last two and half decades, he has led and executed projects worth millions for Voltas,
                  Allwyn, Hyderabad Telephones &amp; APSRTC among several others big names.
                </p>
                <p>
                  Mr. Veerender Nath is an insightful business leader armed with a strong mission of developing an
                  ecosystem that tends to swift and efficient service delivery of R&amp;AC devices. In order to achieve
                  so, he has spent the last several years creating a robust delivery model to cater to your
                  organizational as well as domestic R&amp;AC needs in a swift and effective manner.
                </p>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/about-hero-cZA4QkKGTS5Yfp6cQFU8mbous31lEO.png"
                alt="Talla Veerender Nath speaking at a podium"
                className="w-full h-auto object-contain drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Advisors Section */}
      <AdvisorsCarousel className="py-16 bg-background" />

      {/* Our Story */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Our Story</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Founded with a simple mission: to make professional appliance services accessible, reliable, and
                  affordable for everyone. We started MAEGA because we experienced firsthand the frustration of waiting
                  days for a technician, dealing with unreliable service providers, and facing unexpected costs.
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  Today, we've built a network of verified, skilled technicians who share our commitment to excellence.
                  From air conditioners to commercial refrigeration systems, we ensure that every service call meets our
                  high standards of quality and professionalism.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" asChild>
                  <Link href="/">
                    Book a Service
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button variant="outline" size="lg" className="bg-transparent" asChild>
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>

            <div className="relative">
              <img
                src="/air-conditioner-repair.png"
                alt="MAEGA technician providing professional service"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-accent rounded-full flex items-center justify-center">
                    <Users className="h-6 w-6 text-accent-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">10,000+</p>
                    <p className="text-sm text-muted-foreground">Happy Customers</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team Section */}
      <TeamCarousel className="py-16 bg-background" />

      {/* Our Values */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Our Values</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              The principles that guide everything we do at MAEGA
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">Trust & Reliability</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Every technician is thoroughly vetted, trained, and insured. We stand behind our work with guarantees
                  and transparent pricing.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Clock className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-heading text-xl">Speed & Efficiency</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We respect your time. Same-day service, punctual arrivals, and efficient repairs that get your
                  appliances running quickly.
                </p>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="font-heading text-xl">Customer First</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Your satisfaction is our priority. We listen, we care, and we go the extra mile to exceed your
                  expectations.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">10,000+</div>
              <p className="text-muted-foreground">Services Completed</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-accent">4.9/5</div>
              <p className="text-muted-foreground">Customer Rating</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-secondary">500+</div>
              <p className="text-muted-foreground">Verified Technicians</p>
            </div>
            <div className="space-y-2">
              <div className="text-4xl font-bold text-primary">24/7</div>
              <p className="text-muted-foreground">Customer Support</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose MAEGA */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Why Choose MAEGA?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              We're not just another service provider - we're your trusted appliance care partner
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                icon: CheckCircle,
                title: "Verified Professionals",
                description: "Background-checked technicians with proven expertise",
              },
              {
                icon: Award,
                title: "Quality Guarantee",
                description: "We stand behind our work with service warranties",
              },
              {
                icon: Clock,
                title: "Same Day Service",
                description: "Quick response times when you need us most",
              },
              {
                icon: Shield,
                title: "Insured & Bonded",
                description: "Complete protection for your peace of mind",
              },
              {
                icon: Users,
                title: "Transparent Pricing",
                description: "No hidden fees, clear upfront pricing",
              },
              {
                icon: Heart,
                title: "Customer Support",
                description: "24/7 support team ready to help you",
              },
            ].map((feature, index) => (
              <div key={index} className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-heading font-semibold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">Frequently Asked Questions</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about our services and policies
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {faqs.map((faq, index) => (
              <Card key={index} className="border border-border hover:shadow-md transition-shadow">
                <CardHeader
                  className="cursor-pointer hover:bg-card/50 transition-colors"
                  onClick={() => toggleFAQ(index)}
                >
                  <div className="flex items-center justify-between">
                    <CardTitle className="font-heading text-lg text-left">{faq.question}</CardTitle>
                    <ChevronDown
                      className={`h-5 w-5 text-muted-foreground transition-transform duration-200 ${
                        openFAQ === index ? "rotate-180" : ""
                      }`}
                    />
                  </div>
                </CardHeader>
                {openFAQ === index && (
                  <CardContent className="pt-0 animate-in slide-in-from-top-2 duration-200">
                    <p className="text-muted-foreground leading-relaxed">{faq.answer}</p>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <p className="text-muted-foreground mb-4">Still have questions?</p>
            <Button asChild>
              <Link href="/contact">Contact Our Support Team</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl">Ready to Experience the MAEGA Difference?</h2>
            <p className="text-lg opacity-90">
              Join thousands of satisfied customers who trust MAEGA for their appliance service needs.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" variant="secondary" className="text-lg px-8" asChild>
                <Link href="/">Book Your Service Now</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="text-lg px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
                asChild
              >
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">MAEGA</h3>
                  <p className="text-xs opacity-80">On-Demand Services</p>
                </div>
              </Link>
              <p className="text-sm opacity-80">Professional home and appliance services at your doorstep.</p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    AC Services
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Refrigerators
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Deep Freezers
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
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
                  <Link href="/faq" className="hover:opacity-100 transition-opacity">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/dashboard" className="hover:opacity-100 transition-opacity">
                    My Account
                  </Link>
                </li>
                <li>
                  <Link href="/help" className="hover:opacity-100 transition-opacity">
                    Help Center
                  </Link>
                </li>
                <li className="flex items-center space-x-2">
                  <span>WhatsApp:</span>
                  <a href="https://wa.me/918096557573" className="hover:opacity-100 transition-opacity">
                    +91 80965 57573
                  </a>
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
          <a href="https://wa.me/918096557573" target="_blank" rel="noopener noreferrer" aria-label="Chat on WhatsApp">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.488" />
            </svg>
          </a>
        </Button>
      </div>
    </div>
  )
}
