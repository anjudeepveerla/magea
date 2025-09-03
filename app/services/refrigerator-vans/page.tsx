import { ServicePageTemplate } from "@/components/service-page-template"

const refrigeratorVansData = {
  serviceName: "Refrigerator Van Services",
  serviceDescription:
    "Specialized repair and maintenance services for commercial refrigerator vans and mobile cold storage vehicles. Expert solutions for transportation refrigeration systems.",
  heroImage: "/refrigerator-van-repair.png",
  categories: [
    {
      title: "Refrigerator Van Repairs & Servicing",
      services: [
        {
          id: "general-servicing",
          name: "General Servicing",
          description: "Comprehensive refrigerator van maintenance and system check",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Regular maintenance needed",
            "Performance optimization",
            "Mobile refrigeration check",
            "Energy efficiency review",
            "Preventive care",
          ],
        },
        {
          id: "electrical-problem",
          name: "Electrical Problem",
          description: "Mobile electrical system repair and troubleshooting",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Power system failure",
            "Battery issues",
            "Electrical connections",
            "Control panel problems",
            "Wiring malfunction",
          ],
        },
        {
          id: "gas-problem",
          name: "Gas Problem",
          description: "Mobile refrigerant system repair and gas refilling",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Insufficient cooling",
            "Gas leakage",
            "Pressure problems",
            "Temperature inconsistency",
            "High fuel consumption",
          ],
        },
        {
          id: "compressor-problem",
          name: "Compressor Problem",
          description: "Mobile compressor repair and replacement services",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Compressor failure",
            "Strange noises",
            "Overheating issues",
            "Frequent cycling",
            "Poor cooling performance",
          ],
        },
        {
          id: "accessories",
          name: "Accessories",
          description: "Van refrigeration accessories and component replacement",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Broken accessories",
            "Mobile components",
            "Door seals",
            "Internal fittings",
            "Temperature controls",
          ],
        },
        {
          id: "door-motor-issues",
          name: "Door & Motor Issues",
          description: "Van door mechanism and motor repair services",
          image: "/refrigerator-van-repair.png",
          issues: [
            "Door not opening/closing",
            "Motor malfunction",
            "Hydraulic problems",
            "Door seal issues",
            "Access problems",
          ],
        },
        {
          id: "inspection-charges",
          name: "Inspection Charges",
          description: "Professional inspection and diagnostic services",
          image: "/refrigerator-van-repair.png",
          issues: [
            "System diagnosis needed",
            "Performance evaluation",
            "Problem identification",
            "Maintenance assessment",
            "Repair estimation",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Vikram Singh",
      rating: 5,
      comment: "Excellent service for our delivery van's refrigeration system. Professional work!",
      service: "Refrigerator Van Repair",
    },
    {
      name: "Arjun Patel",
      rating: 5,
      comment: "Quick compressor repair for our food truck. Back on the road in no time.",
      service: "Compressor Problem",
    },
    {
      name: "Deepika Sharma",
      rating: 5,
      comment: "Professional gas refilling service. Temperature control is perfect now.",
      service: "Gas Problem",
    },
  ],
}

export default function RefrigeratorVansPage() {
  return <ServicePageTemplate {...refrigeratorVansData} />
}
