import { ServicePageTemplate } from "@/components/service-page-template"

const electricalData = {
  serviceName: "Electrical Services",
  serviceDescription:
    "Professional electrical repair and installation services for homes and offices. From wiring issues to electrical appliance repairs, our certified electricians ensure safe and reliable electrical solutions.",
  heroImage: "/electrician-working.png",
  categories: [
    {
      title: "Electrical Repairs & Services",
      services: [
        {
          id: "wiring-repair",
          name: "Wiring Repair",
          description: "House wiring, rewiring, and electrical connection repairs",
          image: "/electrician-working.png",
          issues: [
            "Faulty wiring",
            "Short circuit problems",
            "Loose connections",
            "Old wiring replacement",
            "Circuit breaker issues",
          ],
        },
        {
          id: "switch-socket",
          name: "Switch & Socket Repair",
          description: "Switch, socket, and electrical outlet installations",
          image: "/electrician-working.png",
          issues: [
            "Switch not working",
            "Socket replacement",
            "New outlet installation",
            "USB socket installation",
            "Dimmer switch setup",
          ],
        },
        {
          id: "fan-repair",
          name: "Fan Repair",
          description: "Ceiling fan, exhaust fan, and table fan repairs",
          image: "/electrician-working.png",
          issues: [
            "Fan not working",
            "Fan making noise",
            "Speed control issues",
            "Fan installation",
            "Regulator problems",
          ],
        },
        {
          id: "light-fitting",
          name: "Light Fitting",
          description: "LED lights, tube lights, and decorative lighting installation",
          image: "/electrician-working.png",
          issues: [
            "Light not working",
            "LED installation",
            "Tube light repair",
            "Chandelier installation",
            "Emergency lighting",
          ],
        },
        {
          id: "mcb-repair",
          name: "MCB & DB Repair",
          description: "Main switch, MCB, and distribution board repairs",
          image: "/electrician-working.png",
          issues: [
            "MCB tripping",
            "Main switch problems",
            "DB box installation",
            "Circuit protection",
            "Electrical safety",
          ],
        },
        {
          id: "appliance-repair",
          name: "Appliance Electrical Repair",
          description: "Electrical repairs for home appliances",
          image: "/electrician-working.png",
          issues: [
            "Appliance not starting",
            "Power supply issues",
            "Motor problems",
            "Control panel repair",
            "Electrical component replacement",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Suresh Sharma",
      rating: 5,
      comment: "House rewiring done professionally. All electrical issues resolved!",
      service: "Wiring Repair",
    },
    {
      name: "Neha Gupta",
      rating: 5,
      comment: "Fan installation completed quickly. Working perfectly now!",
      service: "Fan Repair",
    },
    {
      name: "Rakesh Singh",
      rating: 5,
      comment: "MCB problem fixed efficiently. No more power tripping issues.",
      service: "MCB & DB Repair",
    },
  ],
}

export default function ElectricalPage() {
  return <ServicePageTemplate {...electricalData} />
}
