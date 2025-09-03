import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Mail, Clock, MessageCircle, Send } from "lucide-react"
import Link from "next/link"

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-card py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-left space-y-8">
            <div className="space-y-4">
              <Badge variant="secondary" className="w-fit mx-0">
                Contact Us
              </Badge>
              <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                Get in Touch with MAEGA
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl mx-0">
                Have questions about our services? Need immediate assistance? We're here to help you 24/7 with all your
                appliance service needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Information & Form */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-3xl text-foreground">Contact Information</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Reach out to us through any of these channels. Our customer support team is available 24/7 to assist
                  you with bookings, inquiries, and emergency services.
                </p>
              </div>

              <div className="space-y-6">
                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Phone className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-foreground">Phone Support</h3>
                        <p className="text-muted-foreground text-sm">Call us for immediate assistance</p>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">+91 80965 57573</p>
                          <p className="font-medium text-foreground">+91 9849203750</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MessageCircle className="h-6 w-6 text-accent" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-foreground">WhatsApp Support</h3>
                        <p className="text-muted-foreground text-sm">Quick chat support and booking</p>
                        <a
                          href="https://wa.me/918096557573"
                          className="font-medium text-accent hover:underline inline-block"
                        >
                          +91 80965 57573
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Mail className="h-6 w-6 text-secondary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-foreground">Email Support</h3>
                        <p className="text-muted-foreground text-sm">Send us your queries and feedback</p>
                        <div className="space-y-1">
                          <p className="font-medium text-foreground">support@maega.in</p>
                          <p className="font-medium text-foreground">info@maega.in</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-foreground">Office Address</h3>
                        <p className="text-muted-foreground text-sm">Visit our main office</p>
                        <div className="text-foreground">
                          <p>Maega services pvt.ltd.</p>
                          <p>3-3-780/b, Kuthbiguda</p>
                          <p>Koti, Hyderabad 500027</p>
                          <p>India</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Clock className="h-6 w-6 text-accent" />
                      </div>
                      <div className="space-y-1">
                        <h3 className="font-heading font-semibold text-foreground">Business Hours</h3>
                        <p className="text-muted-foreground text-sm">We're available when you need us</p>
                        <div className="text-foreground space-y-1">
                          <p>
                            <strong>Services:</strong> 24/7 Available
                          </p>
                          <p>
                            <strong>Support:</strong> 9 AM - 7 PM
                          </p>
                          <p>
                            <strong>Office:</strong> 9:30 AM - 6:30 PM
                          </p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-heading font-bold text-3xl text-foreground">Send us a Message</h2>
                <p className="text-muted-foreground leading-relaxed">
                  Fill out the form below and we'll get back to you as soon as possible. For urgent service requests,
                  please call us directly.
                </p>
              </div>

              <Card className="border-0 shadow-lg">
                <CardHeader className="text-left">
                  <CardTitle className="font-heading text-xl">Contact Form</CardTitle>
                  <CardDescription>We typically respond within 2 hours during business hours</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name *</Label>
                      <Input id="firstName" placeholder="Enter your first name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name *</Label>
                      <Input id="lastName" placeholder="Enter your last name" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <Input id="email" type="email" placeholder="your.email@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input id="phone" placeholder="+91 80965 57573" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject *</Label>
                    <Input id="subject" placeholder="What is this regarding?" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message *</Label>
                    <Textarea
                      id="message"
                      placeholder="Please describe your inquiry or service request in detail..."
                      rows={5}
                    />
                  </div>

                  <div className="space-y-4">
                    <div className="bg-card p-4 rounded-lg text-left">
                      <p className="text-sm text-muted-foreground">
                        <strong>For Emergency Services:</strong> Please call us directly at +91 80965 57573 for
                        immediate assistance.
                      </p>
                    </div>

                    <Button className="w-full" size="lg">
                      <Send className="mr-2 h-5 w-5" />
                      Send Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <h2 className="font-heading font-bold text-3xl text-foreground">Quick Actions</h2>
            <p className="text-lg text-muted-foreground">
              Need immediate help? Use these quick options to get the assistance you need
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">Emergency Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Need immediate appliance repair? Call us now for emergency service.
                </p>
                <Button className="w-full" asChild>
                  <a href="tel:+918096557573">Call Now: +91 80965 57573</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-heading text-xl">WhatsApp Chat</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">
                  Quick questions or want to book a service? Chat with us on WhatsApp.
                </p>
                <Button variant="secondary" className="w-full" asChild>
                  <a href="https://wa.me/918096557573" target="_blank" rel="noopener noreferrer">
                    Start WhatsApp Chat
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Send className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="font-heading text-xl">Book Online</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">Schedule your service appointment online at your convenience.</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/">Book Service Online</Link>
                </Button>
              </CardContent>
            </Card>
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
