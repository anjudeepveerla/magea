import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Wrench,
  Snowflake,
  Baseline as Washing,
  Microwave,
  Wind,
  Tv,
  Settings,
  ArrowRight,
  Phone,
  Zap,
  Droplets,
} from "lucide-react"
import Link from "next/link"
import Image from "next/image"

const allServices = [
  {
    id: "ac-services",
    title: "AC Repair & Service",
    description: "Complete air conditioning repair, installation, maintenance & gas refilling services",
    icon: <Wind className="h-6 w-6" />,
    href: "/services/ac-services",
    image: "/air-conditioner-repair.png",
    features: ["Installation", "Repair", "Maintenance", "Gas Refilling"],
  },
  {
    id: "refrigerators",
    title: "Refrigerator Repair & Service",
    description: "Expert refrigerator repair, compressor replacement & cooling issues solutions",
    icon: <Snowflake className="h-6 w-6" />,
    href: "/services/refrigerators",
    image: "/refrigerator-repair.png",
    features: ["Cooling Issues", "Compressor Repair", "Door Seal", "Thermostat"],
  },
  {
    id: "washing-machine",
    title: "Washing Machine Repair",
    description: "Washing machine repair, drum replacement & water drainage issues solutions",
    icon: <Washing className="h-6 w-6" />,
    href: "/services/washing-machine",
    image: "/modern-washing-machine.png",
    features: ["Drum Issues", "Water Problems", "Motor Repair", "Control Panel"],
  },
  {
    id: "microwave",
    title: "Microwave Repair",
    description: "Microwave oven repair, magnetron replacement & heating issues solutions",
    icon: <Microwave className="h-6 w-6" />,
    href: "/services/microwave",
    image: "/microwave-oven.png",
    features: ["Heating Issues", "Magnetron", "Control Panel", "Door Problems"],
  },
  {
    id: "chimney",
    title: "Chimney Repair & Service",
    description: "Kitchen chimney repair, motor replacement & suction problems solutions",
    icon: <Wind className="h-6 w-6" />,
    href: "/services/chimney",
    image: "/modern-kitchen-chimney.png",
    features: ["Motor Repair", "Filter Cleaning", "Suction Issues", "Installation"],
  },
  {
    id: "tv-repair",
    title: "TV Repair & Service",
    description: "LED/LCD TV repair, screen replacement & display issues solutions",
    icon: <Tv className="h-6 w-6" />,
    href: "/services/tv-repair",
    image: "/led-tv.png",
    features: ["Screen Issues", "Sound Problems", "Power Issues", "Remote Problems"],
  },
  {
    id: "water-coolers",
    title: "Water Cooler Service",
    description: "Water cooler repair, cooling issues & maintenance services",
    icon: <Droplets className="h-6 w-6" />,
    href: "/services/water-coolers",
    image: "/water-cooler-repair.png",
    features: ["Cooling Problems", "Filter Change", "Leak Repair", "Maintenance"],
  },
  {
    id: "deep-freezer",
    title: "Deep Freezer Repair",
    description: "Deep freezer repair, temperature control & compressor issues solutions",
    icon: <Snowflake className="h-6 w-6" />,
    href: "/services/deep-freezer",
    image: "/deep-freezer-repair.png",
    features: ["Temperature Issues", "Compressor Repair", "Defrosting", "Seal Problems"],
  },
  {
    id: "geyser",
    title: "Geyser Repair & Service",
    description: "Water heater repair, heating element replacement & thermostat issues",
    icon: <Zap className="h-6 w-6" />,
    href: "/services/geyser",
    image: "/water-heater-geyser-repair.png",
    features: ["Heating Issues", "Element Replacement", "Thermostat", "Leak Repair"],
  },
  {
    id: "installation",
    title: "Installation & Uninstallation",
    description: "Professional appliance installation and uninstallation services",
    icon: <Settings className="h-6 w-6" />,
    href: "/services/installation",
    image: "/appliance-installation-service.png",
    features: ["AC Installation", "Appliance Setup", "Uninstallation", "Relocation"],
  },
]

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-primary/10 py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                  Our Services
                </h1>
                <p className="text-xl lg:text-2xl text-primary font-semibold">Quality you can trust</p>
                <p className="text-lg text-muted-foreground max-w-xl">
                  Professional repair, maintenance, and installation services for all your home appliances. Expert
                  technicians, genuine parts, and guaranteed satisfaction.
                </p>
              </div>

              <div className="space-y-4">
                <label className="text-sm font-medium text-foreground">Quick Service Selection:</label>
                <Select>
                  <SelectTrigger className="w-full max-w-md">
                    <SelectValue placeholder="Choose a service category" />
                  </SelectTrigger>
                  <SelectContent>
                    {allServices.map((service) => (
                      <SelectItem key={service.id} value={service.id}>
                        <Link href={service.href} className="flex items-center space-x-2">
                          {service.icon}
                          <span>{service.title}</span>
                        </Link>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="px-8">
                  <Phone className="mr-2 h-5 w-5" />
                  Call Now: +91 12345 67890
                </Button>
                <Button size="lg" variant="outline" className="px-8 bg-transparent">
                  Chat on WhatsApp
                </Button>
              </div>
            </div>

            <div className="relative">
              <Image
                src="/professional-appliance-repair-technician-with-tool.png"
                alt="Professional Appliance Repair Services"
                width={600}
                height={500}
                className="rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Repair Services Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4 mb-16">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Wrench className="h-6 w-6 text-primary" />
              <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">All Service Categories</h2>
            </div>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore our comprehensive range of appliance repair and maintenance services
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {allServices.map((service) => (
              <Card
                key={service.id}
                className="group hover:shadow-xl transition-all duration-300 border-0 shadow-md overflow-hidden"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={service.image || "/placeholder.svg"}
                    alt={service.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <CardHeader className="pb-4">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-3">
                    {service.icon}
                  </div>
                  <CardTitle className="font-heading text-lg">{service.title}</CardTitle>
                  <CardDescription className="text-sm">{service.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex flex-wrap gap-1">
                    {service.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                  <Button className="w-full" asChild>
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

      {/* CTA Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-heading font-bold text-3xl mb-4">Need Help Choosing?</h2>
          <p className="text-lg opacity-90 mb-8 max-w-2xl mx-auto">
            Our experts are here to help you find the right service for your appliance needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="px-8">
              <Phone className="mr-2 h-5 w-5" />
              Call Expert: +91 12345 67890
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="px-8 bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary"
            >
              Chat on WhatsApp
            </Button>
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
              <h4 className="font-heading font-semibold mb-4">Repair Services</h4>
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
                  <Link href="/services/washing-machine" className="hover:opacity-100 transition-opacity">
                    Washing Machine
                  </Link>
                </li>
                <li>
                  <Link href="/services/microwave" className="hover:opacity-100 transition-opacity">
                    Microwave
                  </Link>
                </li>
                <li>
                  <Link href="/services/chimney" className="hover:opacity-100 transition-opacity">
                    Chimney
                  </Link>
                </li>
                <li>
                  <Link href="/services/tv-repair" className="hover:opacity-100 transition-opacity">
                    TV Repair
                  </Link>
                </li>
                <li>
                  <Link href="/services/water-coolers" className="hover:opacity-100 transition-opacity">
                    Water Coolers
                  </Link>
                </li>
                <li>
                  <Link href="/services/deep-freezer" className="hover:opacity-100 transition-opacity">
                    Deep Freezer
                  </Link>
                </li>
                <li>
                  <Link href="/services/geyser" className="hover:opacity-100 transition-opacity">
                    Geyser
                  </Link>
                </li>
                <li>
                  <Link href="/services/installation" className="hover:opacity-100 transition-opacity">
                    Installation & Uninstallation
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/help" className="hover:opacity-100 transition-opacity">
                    Help Center
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Contact Us
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
