import { ServicePageTemplate } from "@/components/service-page-template"

const bottleCoolersData = {
  serviceName: "Bottle Cooler Services",
  serviceDescription:
    "Expert bottle cooler repair and maintenance services for commercial establishments. Professional solutions for all bottle cooler brands with quick response times.",
  heroImage: "/bottle-cooler-maintenance.png",
  categories: [
    {
      title: "Bottle Cooler Repairs & Servicing",
      services: [
        {
          id: "complete-servicing",
          name: "Complete Servicing",
          description: "Comprehensive bottle cooler maintenance and optimization",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Regular maintenance needed",
            "Performance optimization",
            "Energy efficiency check",
            "Cooling system health",
            "Preventive care",
          ],
        },
        {
          id: "demo",
          name: "Demo",
          description: "Professional setup and demonstration of new bottle coolers",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "New appliance setup",
            "Temperature settings",
            "Feature explanation",
            "Usage guidelines",
            "Maintenance tips",
          ],
        },
        {
          id: "electrical-problem",
          name: "Electrical Problem",
          description: "Relay, capacitors, and thermostat electrical repairs",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Cooler not starting",
            "Relay malfunction",
            "Capacitor failure",
            "Thermostat issues",
            "Power supply problems",
          ],
        },
        {
          id: "gas-problem",
          name: "Gas Problem",
          description: "Refrigerant system repair and gas refilling",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Insufficient cooling",
            "Gas leakage",
            "Pressure problems",
            "Temperature inconsistency",
            "High energy bills",
          ],
        },
        {
          id: "compressor-problem",
          name: "Compressor Problem",
          description: "Professional compressor repair and replacement",
          image: "/bottle-cooler-maintenance.png",
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
          description: "Fan motor repair for optimal heat dissipation",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Fan not working",
            "Noisy fan operation",
            "Motor overheating",
            "Poor ventilation",
            "Reduced cooling efficiency",
          ],
        },
        {
          id: "body-repair",
          name: "Body Repair",
          description: "Physical damage repair and body restoration",
          image: "/bottle-cooler-maintenance.png",
          issues: ["Dents and scratches", "Door problems", "Handle issues", "Rust and corrosion", "Physical wear"],
        },
        {
          id: "accessories",
          name: "Accessories",
          description: "Replacement of shelves, racks, and internal components",
          image: "/bottle-cooler-maintenance.png",
          issues: ["Broken shelves", "Damaged racks", "Door seals", "Internal lighting", "Temperature controls"],
        },
        {
          id: "condenser-fan-blade",
          name: "Condenser Fan Blade Problem",
          description: "Fan blade repair and replacement services",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Broken fan blades",
            "Bent or damaged blades",
            "Imbalanced rotation",
            "Excessive noise",
            "Reduced airflow",
          ],
        },
        {
          id: "electronic-thermometer",
          name: "Electronic Thermometer",
          description: "Digital temperature display repair and calibration",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Inaccurate temperature readings",
            "Display malfunction",
            "Sensor problems",
            "Calibration issues",
            "Electronic failure",
          ],
        },
        {
          id: "fan-motor-base",
          name: "Fan Motor Base Problem",
          description: "Motor mounting and base stabilization",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Loose motor mounting",
            "Vibration problems",
            "Base damage",
            "Alignment issues",
            "Noise from motor base",
          ],
        },
        {
          id: "door-closing",
          name: "Door Closing Problem",
          description: "Door mechanism and seal repair",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Door not closing properly",
            "Loose door seals",
            "Hinge problems",
            "Latch malfunction",
            "Air leakage issues",
          ],
        },
        {
          id: "water-leakage",
          name: "Water Leakage Problem",
          description: "Water leak detection and drainage system repair",
          image: "/bottle-cooler-maintenance.png",
          issues: ["Water accumulation", "Drain blockage", "Condensation issues", "Pipe leakage", "Defrost problems"],
        },
        {
          id: "electrical-wire",
          name: "Electrical Wire Problem",
          description: "Wiring inspection and electrical safety repairs",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Loose electrical connections",
            "Damaged wiring",
            "Short circuit risks",
            "Power fluctuation damage",
            "Electrical safety concerns",
          ],
        },
        {
          id: "door-hinges-clamp",
          name: "Door Hinges & Clamp Problem",
          description: "Door hardware repair and adjustment",
          image: "/bottle-cooler-maintenance.png",
          issues: [
            "Broken door hinges",
            "Loose clamps",
            "Door alignment issues",
            "Hardware wear and tear",
            "Door sagging problems",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Suresh Patel",
      rating: 5,
      comment: "Great service for our shop's bottle cooler. Quick and professional repair.",
      service: "Bottle Cooler Repair",
    },
    {
      name: "Meera Joshi",
      rating: 5,
      comment: "Fixed the cooling issue perfectly. Very satisfied with the service quality.",
      service: "Gas Problem",
    },
    {
      name: "Rakesh Sharma",
      rating: 5,
      comment: "Professional technician and reasonable pricing. Highly recommended!",
      service: "Compressor Problem",
    },
  ],
}

export default function BottleCoolersPage() {
  return <ServicePageTemplate {...bottleCoolersData} />
}
