import { ServicePageTemplate } from "@/components/service-page-template"

const coldRoomsData = {
  serviceName: "Cold Room Services",
  serviceDescription:
    "Professional cold room installation, repair, and maintenance services for commercial and industrial applications. Expert solutions for walk-in coolers and freezer rooms.",
  heroImage: "/placeholder.svg?height=400&width=600",
  categories: [
    {
      title: "Cold Room Repairs & Servicing",
      services: [
        {
          id: "complete-servicing",
          name: "Complete Servicing",
          description: "Comprehensive cold room maintenance and system optimization",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Regular maintenance needed",
            "Performance optimization",
            "Energy efficiency check",
            "System health assessment",
            "Preventive care",
          ],
        },
        {
          id: "demo",
          name: "Demo",
          description: "Professional setup and demonstration of new cold rooms",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "New installation setup",
            "System commissioning",
            "Temperature calibration",
            "Feature explanation",
            "Operation training",
          ],
        },
        {
          id: "electrical-problem",
          name: "Electrical Problem",
          description: "Relay, capacitors, and thermostat electrical repairs",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Power system failure",
            "Relay malfunction",
            "Capacitor failure",
            "Thermostat issues",
            "Control panel problems",
          ],
        },
        {
          id: "gas-problem",
          name: "Gas Problem",
          description: "Industrial refrigerant system repair and gas refilling",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Insufficient cooling",
            "Gas leakage",
            "Pressure imbalance",
            "Temperature fluctuation",
            "High energy consumption",
          ],
        },
        {
          id: "compressor-problem",
          name: "Compressor Problem",
          description: "Industrial compressor repair and replacement services",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Compressor failure",
            "Strange noises",
            "Overheating issues",
            "Frequent cycling",
            "Poor cooling performance",
          ],
        },
        {
          id: "condenser-fan-motor",
          name: "Condenser Fan Motor",
          description: "Industrial fan motor repair for optimal heat dissipation",
          image: "/placeholder.svg?height=300&width=400",
          issues: ["Fan not working", "Noisy operation", "Motor overheating", "Poor ventilation", "Reduced efficiency"],
        },
        {
          id: "body-repair",
          name: "Body Repair",
          description: "Cold room structure and insulation repair",
          image: "/placeholder.svg?height=300&width=400",
          issues: ["Insulation damage", "Panel problems", "Door issues", "Structural damage", "Seal deterioration"],
        },
        {
          id: "accessories",
          name: "Accessories",
          description: "Cold room accessories and component replacement",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Broken accessories",
            "Shelving systems",
            "Door hardware",
            "Internal components",
            "Temperature controls",
          ],
        },
        {
          id: "condenser-fan-blade",
          name: "Condenser Fan Blade Problem",
          description: "Industrial fan blade repair and replacement",
          image: "/placeholder.svg?height=300&width=400",
          issues: ["Broken fan blades", "Bent blades", "Imbalanced rotation", "Noise issues", "Reduced airflow"],
        },
        {
          id: "electronic-thermometer",
          name: "Electronic Thermometer",
          description: "Temperature monitoring system repair and calibration",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Inaccurate readings",
            "Display malfunction",
            "Sensor problems",
            "Calibration needed",
            "Electronic failure",
          ],
        },
        {
          id: "fan-motor-base",
          name: "Fan Motor Base Problem",
          description: "Motor mounting and base stabilization for industrial units",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Loose motor mounting",
            "Vibration problems",
            "Base damage",
            "Alignment issues",
            "Structural stability",
          ],
        },
        {
          id: "door-closing",
          name: "Door Closing Problem",
          description: "Cold room door mechanism and seal repair",
          image: "/placeholder.svg?height=300&width=400",
          issues: ["Door not closing", "Loose seals", "Hinge problems", "Latch issues", "Air leakage"],
        },
        {
          id: "water-leakage",
          name: "Water Leakage Problem",
          description: "Water leak detection and drainage system repair",
          image: "/placeholder.svg?height=300&width=400",
          issues: ["Water accumulation", "Drain blockage", "Condensation issues", "Pipe leakage", "Defrost problems"],
        },
        {
          id: "electrical-wire",
          name: "Electrical Wire Problem",
          description: "Industrial wiring inspection and electrical safety",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Loose connections",
            "Damaged wiring",
            "Short circuit risks",
            "Power distribution issues",
            "Safety concerns",
          ],
        },
        {
          id: "indoor-problem",
          name: "Indoor Problem",
          description: "Internal cold room issues and environment control",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Internal temperature issues",
            "Air circulation problems",
            "Humidity control",
            "Internal component failure",
            "Environment optimization",
          ],
        },
        {
          id: "duct-problem",
          name: "Duct Problem",
          description: "Air duct system repair and maintenance",
          image: "/placeholder.svg?height=300&width=400",
          issues: [
            "Blocked air ducts",
            "Duct damage",
            "Poor air distribution",
            "Insulation problems",
            "Airflow issues",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Suresh Reddy",
      rating: 5,
      comment: "Excellent cold room service for our warehouse. Professional installation and maintenance.",
      service: "Cold Room Service",
    },
    {
      name: "Anita Gupta",
      rating: 5,
      comment: "Quick compressor repair for our restaurant's cold room. Highly recommended!",
      service: "Compressor Problem",
    },
    {
      name: "Manoj Singh",
      rating: 5,
      comment: "Professional duct cleaning service. Air circulation is perfect now.",
      service: "Duct Problem",
    },
  ],
}

export default function ColdRoomsPage() {
  return <ServicePageTemplate {...coldRoomsData} />
}
