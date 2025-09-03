import { ServicePageTemplate } from "@/components/service-page-template"

const deepFreezersData = {
  serviceName: "Deep Freezer Services",
  serviceDescription:
    "Professional deep freezer repair and maintenance services for commercial and residential units. Expert solutions for all freezer brands with same-day service availability.",
  heroImage: "/deep-freezer-repair.png",
  categories: [
    {
      title: "Deep Freezer Repairs & Servicing",
      services: [
        {
          id: "complete-servicing",
          name: "Complete Servicing",
          description: "Comprehensive deep freezer maintenance and performance optimization",
          image: "/deep-freezer-repair.png",
          issues: [
            "Regular maintenance needed",
            "Performance optimization",
            "Energy efficiency check",
            "Preventive care",
            "Overall system health",
          ],
        },
        {
          id: "demo",
          name: "Demo",
          description: "Professional setup and demonstration of new deep freezer units",
          image: "/deep-freezer-repair.png",
          issues: [
            "New appliance setup",
            "Feature explanation",
            "Optimal temperature settings",
            "Usage guidelines",
            "Maintenance instructions",
          ],
        },
        {
          id: "electrical-problem",
          name: "Electrical Problem",
          description: "Relay, capacitors, and thermostat electrical repairs",
          image: "/deep-freezer-repair.png",
          issues: [
            "Freezer not starting",
            "Relay malfunction",
            "Capacitor failure",
            "Thermostat issues",
            "Power supply problems",
          ],
        },
        {
          id: "gas-problem",
          name: "Gas Problem",
          description: "Refrigerant leak detection and gas refilling services",
          image: "/deep-freezer-repair.png",
          issues: [
            "Insufficient freezing",
            "Gas leakage",
            "Pressure imbalance",
            "Temperature fluctuation",
            "High energy consumption",
          ],
        },
        {
          id: "compressor-problem",
          name: "Compressor Problem",
          description: "Professional compressor diagnosis and repair services",
          image: "/deep-freezer-repair.png",
          issues: [
            "Compressor not working",
            "Strange noises",
            "Overheating",
            "Frequent cycling",
            "Poor freezing performance",
          ],
        },
        {
          id: "condenser-fan-motor",
          name: "Condenser Fan Motor",
          description: "Fan motor repair and replacement for optimal cooling",
          image: "/deep-freezer-repair.png",
          issues: [
            "Fan not working",
            "Noisy operation",
            "Motor overheating",
            "Poor air circulation",
            "Irregular cooling",
          ],
        },
        {
          id: "body-repair",
          name: "Body Repair",
          description: "Physical damage repair and body restoration",
          image: "/deep-freezer-repair.png",
          issues: ["Dents and scratches", "Door alignment", "Handle problems", "Rust treatment", "Physical damage"],
        },
        {
          id: "accessories",
          name: "Accessories",
          description: "Replacement of baskets, shelves, and other accessories",
          image: "/deep-freezer-repair.png",
          issues: ["Broken baskets", "Damaged shelves", "Door seals", "Temperature indicators", "Internal components"],
        },
        {
          id: "condenser-fan-blade",
          name: "Condenser Fan Blade Problem",
          description: "Fan blade repair and replacement services",
          image: "/deep-freezer-repair.png",
          issues: ["Broken fan blades", "Bent blades", "Imbalanced rotation", "Noise issues", "Reduced efficiency"],
        },
        {
          id: "electronic-thermometer",
          name: "Electronic Thermometer",
          description: "Digital thermometer repair and calibration",
          image: "/deep-freezer-repair.png",
          issues: [
            "Inaccurate readings",
            "Display not working",
            "Sensor problems",
            "Calibration needed",
            "Electronic malfunction",
          ],
        },
        {
          id: "fan-motor-base",
          name: "Fan Motor Base Problem",
          description: "Motor mounting and base repair services",
          image: "/deep-freezer-repair.png",
          issues: ["Loose motor mounting", "Vibration issues", "Base damage", "Alignment problems", "Noise from base"],
        },
        {
          id: "door-closing",
          name: "Door Closing Problem",
          description: "Door mechanism and seal repair services",
          image: "/deep-freezer-repair.png",
          issues: ["Door not closing", "Loose seals", "Hinge problems", "Latch issues", "Air leakage"],
        },
        {
          id: "water-leakage",
          name: "Water Leakage Problem",
          description: "Water leak detection and drainage repair",
          image: "/deep-freezer-repair.png",
          issues: ["Water pooling", "Drain blockage", "Defrost issues", "Pipe leakage", "Condensation problems"],
        },
        {
          id: "electrical-wire",
          name: "Electrical Wire Problem",
          description: "Wiring inspection and electrical safety repairs",
          image: "/deep-freezer-repair.png",
          issues: ["Loose connections", "Damaged wiring", "Short circuit risks", "Power issues", "Safety concerns"],
        },
        {
          id: "door-hinges-clamp",
          name: "Door Hinges & Clamp Problem",
          description: "Door hardware repair and replacement",
          image: "/deep-freezer-repair.png",
          issues: ["Broken hinges", "Loose clamps", "Door sagging", "Hardware wear", "Alignment issues"],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Mohammed Ali",
      rating: 5,
      comment: "Reliable service for our restaurant's deep freezer. Highly recommended!",
      service: "Deep Freezer Maintenance",
    },
    {
      name: "Kavita Singh",
      rating: 5,
      comment: "Quick compressor repair. Professional technician and fair pricing.",
      service: "Compressor Problem",
    },
    {
      name: "Ravi Kumar",
      rating: 5,
      comment: "Excellent service for gas refilling. Freezer working perfectly now.",
      service: "Gas Problem",
    },
  ],
}

export default function DeepFreezersPage() {
  return <ServicePageTemplate {...deepFreezersData} />
}
