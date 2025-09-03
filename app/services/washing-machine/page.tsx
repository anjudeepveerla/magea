import { ServicePageTemplate } from "@/components/service-page-template"

const washingMachineData = {
  serviceName: "Washing Machine Services",
  serviceDescription:
    "Professional washing machine repair and maintenance services for all brands. From drum issues to water problems, our expert technicians ensure your washing machine runs efficiently.",
  heroImage: "/modern-washing-machine.png",
  categories: [
    {
      title: "Washing Machine Repairs",
      services: [
        {
          id: "drum-repair",
          name: "Drum Repair",
          description: "Fix drum alignment, bearing issues, and rotation problems",
          image: "/modern-washing-machine.png",
          issues: [
            "Drum not spinning",
            "Loud noises during wash",
            "Drum wobbling excessively",
            "Bearing replacement needed",
            "Drum alignment issues",
          ],
        },
        {
          id: "water-problems",
          name: "Water Problems",
          description: "Resolve water inlet, drainage, and pressure issues",
          image: "/modern-washing-machine.png",
          issues: [
            "Water not filling",
            "Water not draining",
            "Low water pressure",
            "Water overflow issues",
            "Inlet valve problems",
          ],
        },
        {
          id: "motor-repair",
          name: "Motor Repair",
          description: "Motor replacement and electrical motor issues",
          image: "/modern-washing-machine.png",
          issues: [
            "Motor not starting",
            "Motor overheating",
            "Electrical motor failure",
            "Speed control issues",
            "Motor burning smell",
          ],
        },
        {
          id: "control-panel",
          name: "Control Panel Issues",
          description: "Digital display and control button repairs",
          image: "/modern-washing-machine.png",
          issues: [
            "Display not working",
            "Buttons not responding",
            "Program selection issues",
            "Timer malfunction",
            "Electronic control failure",
          ],
        },
        {
          id: "door-lock",
          name: "Door Lock Problems",
          description: "Door locking mechanism and seal repairs",
          image: "/modern-washing-machine.png",
          issues: [
            "Door not locking",
            "Door seal leakage",
            "Handle broken",
            "Lock mechanism stuck",
            "Safety lock issues",
          ],
        },
        {
          id: "pump-repair",
          name: "Pump Repair",
          description: "Water pump and drainage pump repairs",
          image: "/modern-washing-machine.png",
          issues: [
            "Pump not working",
            "Drainage issues",
            "Pump making noise",
            "Water circulation problems",
            "Pump motor failure",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Anita Sharma",
      rating: 5,
      comment: "Fixed my washing machine drum issue quickly. Professional service and fair pricing!",
      service: "Drum Repair",
    },
    {
      name: "Vikram Singh",
      rating: 5,
      comment: "Water drainage problem resolved in one visit. Excellent technician knowledge.",
      service: "Water Problems",
    },
    {
      name: "Meera Patel",
      rating: 5,
      comment: "Motor replacement done perfectly. Machine working like new now!",
      service: "Motor Repair",
    },
  ],
}

export default function WashingMachinePage() {
  return <ServicePageTemplate {...washingMachineData} />
}
