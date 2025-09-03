import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ArrowLeft, Phone, Mail, MessageCircle } from "lucide-react"
import Link from "next/link"

const faqCategories = [
  {
    category: "General Questions",
    questions: [
      {
        question: "What is MAEGA?",
        answer:
          "MAEGA is an on-demand home and appliance service platform that connects you with verified, professional technicians for repair, installation, and maintenance services. We specialize in AC services, refrigerators, freezers, water coolers, and other home appliances.",
      },
      {
        question: "Which areas do you serve?",
        answer:
          "We currently serve major cities and their surrounding areas. During booking, you can check if service is available in your location by entering your pincode. We're constantly expanding our service areas.",
      },
      {
        question: "How do I book a service?",
        answer:
          "You can book a service through our website by selecting your appliance type, choosing the specific service needed, and following our 5-step booking wizard. You can also call us directly or use our WhatsApp booking service.",
      },
      {
        question: "Are your technicians verified?",
        answer:
          "Yes, all our technicians are thoroughly background-checked, trained, and verified professionals. They carry proper identification and are insured for your peace of mind.",
      },
    ],
  },
  {
    category: "Pricing & Payment",
    questions: [
      {
        question: "How much do your services cost?",
        answer:
          "Our pricing is transparent and competitive. We charge a nominal inspection fee for diagnosis, and the actual service cost depends on the work required. You'll receive a detailed quote before any work begins, with no hidden charges.",
      },
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept cash, UPI, credit/debit cards, and digital wallets. Payment is due after the service is completed to your satisfaction.",
      },
      {
        question: "Do you charge for inspection if no repair is needed?",
        answer:
          "Yes, we charge a minimal inspection fee for our technician's time and expertise in diagnosing the issue. This fee is clearly mentioned in our pricing section and during booking.",
      },
      {
        question: "Are there any hidden charges?",
        answer:
          "No, we believe in complete transparency. All charges including inspection fees, service costs, and any parts required are clearly communicated upfront.",
      },
    ],
  },
  {
    category: "Service & Support",
    questions: [
      {
        question: "How quickly can you provide service?",
        answer:
          "We offer same-day service in most cases. Depending on your location and technician availability, we can typically schedule a visit within 2-4 hours of booking.",
      },
      {
        question: "What if I'm not satisfied with the service?",
        answer:
          "Customer satisfaction is our priority. If you're not satisfied with our service, please contact our support team immediately. We offer service guarantees and will work to resolve any issues.",
      },
      {
        question: "Do you provide warranty on repairs?",
        answer:
          "Yes, we provide warranty on our repair work and any parts replaced. The warranty period varies depending on the type of service and parts used, which will be clearly explained during service.",
      },
      {
        question: "Can I reschedule my appointment?",
        answer:
          "Yes, you can reschedule your appointment through your dashboard or by contacting our support team. We recommend giving at least 2 hours notice for rescheduling.",
      },
    ],
  },
  {
    category: "Technical Questions",
    questions: [
      {
        question: "What types of appliances do you service?",
        answer:
          "We service air conditioners (window & split), refrigerators, deep freezers, bottle coolers, visi coolers, FOW (Freezer on Wheels), water coolers, water dispensers, refrigerator vans, and cold rooms.",
      },
      {
        question: "Do you provide installation services?",
        answer:
          "Yes, we provide professional installation services for most appliances including ACs, water coolers, and other equipment. Our technicians ensure proper installation following manufacturer guidelines.",
      },
      {
        question: "What if you don't have the required spare parts?",
        answer:
          "We maintain a good inventory of common spare parts. If a specific part is not available, we'll source it quickly and keep you informed about the timeline. We only use genuine or high-quality compatible parts.",
      },
      {
        question: "Do you service commercial appliances?",
        answer:
          "Yes, we service both residential and commercial appliances including restaurant equipment, office cooling systems, and commercial refrigeration units.",
      },
    ],
  },
]

export default function FAQPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Breadcrumb */}
      <div className="container mx-auto px-4 py-4">
        <Link href="/" className="inline-flex items-center text-muted-foreground hover:text-primary transition-colors">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Home
        </Link>
      </div>

      {/* Hero Section */}
      <section className="py-16 bg-gradient-to-br from-background to-card">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="secondary" className="mb-4">
            Help Center
          </Badge>
          <h1 className="font-heading font-bold text-4xl lg:text-5xl text-foreground mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Find answers to common questions about MAEGA's services, pricing, and support. Can't find what you're
            looking for? Contact our support team.
          </p>
        </div>
      </section>

      {/* FAQ Content */}
      <section className="py-16">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="space-y-12">
            {faqCategories.map((category, categoryIndex) => (
              <div key={categoryIndex}>
                <h2 className="font-heading font-bold text-2xl text-foreground mb-6 pb-2 border-b border-border">
                  {category.category}
                </h2>

                <Accordion type="single" collapsible className="space-y-4">
                  {category.questions.map((faq, questionIndex) => (
                    <AccordionItem
                      key={questionIndex}
                      value={`${categoryIndex}-${questionIndex}`}
                      className="border border-border rounded-lg px-6"
                    >
                      <AccordionTrigger className="text-left font-medium text-foreground hover:text-primary">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Support Section */}
      <section className="py-16 bg-card">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="font-heading font-bold text-3xl text-foreground mb-4">Still Have Questions?</h2>
            <p className="text-lg text-muted-foreground">Our support team is here to help you 24/7</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Phone className="h-8 w-8 text-primary" />
                </div>
                <CardTitle className="font-heading text-xl">Call Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Speak directly with our support team</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="tel:+911234567890">+91 12345 67890</a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="h-8 w-8 text-accent" />
                </div>
                <CardTitle className="font-heading text-xl">WhatsApp</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Quick support via WhatsApp chat</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <a href="https://wa.me/911234567890" target="_blank" rel="noopener noreferrer">
                    Chat Now
                  </a>
                </Button>
              </CardContent>
            </Card>

            <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
              <CardHeader className="pb-4">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Mail className="h-8 w-8 text-secondary" />
                </div>
                <CardTitle className="font-heading text-xl">Email Us</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4">Send us your questions via email</p>
                <Button variant="outline" className="w-full bg-transparent" asChild>
                  <Link href="/contact">Contact Form</Link>
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
                  <a href="https://wa.me/1234567890" className="hover:opacity-100 transition-opacity">
                    +91 12345 67890
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
    </div>
  )
}
