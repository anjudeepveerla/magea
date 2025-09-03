import { ServicePageTemplate } from "@/components/service-page-template"

const plumbingData = {
  serviceName: "Plumbing Services",
  serviceDescription:
    "Professional plumbing repair and installation services for homes and offices. From pipe leakages to bathroom fittings, our expert plumbers provide reliable and efficient solutions.",
  heroImage: "/plumber-working.png",
  categories: [
    {
      title: "Plumbing Repairs & Services",
      services: [
        {
          id: "pipe-repair",
          name: "Pipe Repair",
          description: "Water pipe, drainage pipe, and pipe leakage repairs",
          image: "/plumber-working.png",
          issues: ["Pipe leakage", "Burst pipes", "Pipe blockage", "Pipe replacement", "Joint repairs"],
        },
        {
          id: "tap-repair",
          name: "Tap & Faucet Repair",
          description: "Tap installation, repair, and faucet replacement",
          image: "/plumber-working.png",
          issues: ["Tap not working", "Dripping taps", "Tap replacement", "Mixer installation", "Water flow issues"],
        },
        {
          id: "toilet-repair",
          name: "Toilet Repair",
          description: "Toilet installation, flush repair, and commode issues",
          image: "/plumber-working.png",
          issues: [
            "Toilet flush problems",
            "Commode installation",
            "Seat replacement",
            "Water tank issues",
            "Toilet blockage",
          ],
        },
        {
          id: "bathroom-fitting",
          name: "Bathroom Fitting",
          description: "Complete bathroom fittings and fixture installation",
          image: "/plumber-working.png",
          issues: [
            "Shower installation",
            "Basin fitting",
            "Bathroom accessories",
            "Tile work support",
            "Drainage system",
          ],
        },
        {
          id: "drainage-cleaning",
          name: "Drainage Cleaning",
          description: "Drain cleaning, blockage removal, and sewage issues",
          image: "/plumber-working.png",
          issues: [
            "Drain blockage",
            "Sewage problems",
            "Kitchen sink blockage",
            "Floor drain cleaning",
            "Manhole cleaning",
          ],
        },
        {
          id: "water-tank",
          name: "Water Tank Services",
          description: "Water tank installation, cleaning, and maintenance",
          image: "/plumber-working.png",
          issues: [
            "Tank installation",
            "Tank cleaning",
            "Tank leakage repair",
            "Overflow problems",
            "Tank connection issues",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Manoj Kumar",
      rating: 5,
      comment: "Pipe leakage fixed quickly. No more water wastage in the house!",
      service: "Pipe Repair",
    },
    {
      name: "Sita Devi",
      rating: 5,
      comment: "Toilet flush repair done professionally. Working perfectly now!",
      service: "Toilet Repair",
    },
    {
      name: "Vinod Sharma",
      rating: 5,
      comment: "Drainage cleaning completed efficiently. No more blockage issues.",
      service: "Drainage Cleaning",
    },
  ],
}

export default function PlumbingPage() {
  return <ServicePageTemplate {...plumbingData} />
}
