import { ServicePageTemplate } from "@/components/service-page-template"

const microwaveData = {
  serviceName: "Microwave Services",
  serviceDescription:
    "Expert microwave oven repair and maintenance services for all brands. From heating issues to magnetron problems, our certified technicians restore your microwave's performance.",
  heroImage: "/microwave-oven.png",
  categories: [
    {
      title: "Microwave Repairs",
      services: [
        {
          id: "heating-issues",
          name: "Heating Issues",
          description: "Fix heating problems and temperature control issues",
          image: "/microwave-oven.png",
          issues: [
            "Not heating food",
            "Uneven heating",
            "Overheating problems",
            "Temperature control issues",
            "Heating element failure",
          ],
        },
        {
          id: "magnetron-repair",
          name: "Magnetron Repair",
          description: "Magnetron replacement and microwave generation issues",
          image: "/microwave-oven.png",
          issues: [
            "Magnetron not working",
            "No microwave generation",
            "Magnetron burning smell",
            "High voltage issues",
            "Magnetron replacement needed",
          ],
        },
        {
          id: "control-panel",
          name: "Control Panel Issues",
          description: "Digital display, buttons, and timer repairs",
          image: "/microwave-oven.png",
          issues: [
            "Display not working",
            "Buttons not responding",
            "Timer malfunction",
            "Program settings issues",
            "Touch panel problems",
          ],
        },
        {
          id: "door-problems",
          name: "Door Problems",
          description: "Door latch, seal, and safety switch repairs",
          image: "/microwave-oven.png",
          issues: [
            "Door not closing properly",
            "Door latch broken",
            "Door seal damaged",
            "Safety switch issues",
            "Handle problems",
          ],
        },
        {
          id: "turntable-issues",
          name: "Turntable Issues",
          description: "Turntable motor and rotation mechanism repairs",
          image: "/microwave-oven.png",
          issues: [
            "Turntable not rotating",
            "Motor not working",
            "Turntable making noise",
            "Glass plate broken",
            "Support ring issues",
          ],
        },
        {
          id: "electrical-problems",
          name: "Electrical Problems",
          description: "Power supply and electrical component repairs",
          image: "/microwave-oven.png",
          issues: [
            "Not turning on",
            "Power supply issues",
            "Electrical short circuits",
            "Fuse problems",
            "Wiring issues",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Ravi Kumar",
      rating: 5,
      comment: "Magnetron replacement done professionally. Microwave heating perfectly now!",
      service: "Magnetron Repair",
    },
    {
      name: "Sunita Devi",
      rating: 5,
      comment: "Fixed heating issue quickly. Great service and reasonable pricing.",
      service: "Heating Issues",
    },
    {
      name: "Arjun Mehta",
      rating: 5,
      comment: "Door latch problem resolved efficiently. Highly recommend their service!",
      service: "Door Problems",
    },
  ],
}

export default function MicrowavePage() {
  return <ServicePageTemplate {...microwaveData} />
}
