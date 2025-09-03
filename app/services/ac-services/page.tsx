import { ServicePageTemplate } from "@/components/service-page-template"

const acServicesData = {
  serviceName: "AC Services",
  serviceDescription:
    "Complete air conditioning repair, installation, and maintenance services by certified technicians. From emergency repairs to routine maintenance, we keep your AC running efficiently year-round.",
  heroImage: "/air-conditioner-repair.png",
  categories: [
    {
      title: "AC Repairs",
      services: [
        {
          id: "electrical-repair",
          name: "Electrical Repair",
          description: "Fix electrical issues, faulty wiring, and power problems in your AC unit",
          image: "/air-conditioner-repair.png",
          issues: [
            "AC not turning on",
            "Frequent tripping of circuit breaker",
            "Electrical burning smell",
            "Control panel not responding",
            "Power fluctuation issues",
          ],
        },
        {
          id: "compressor-repair",
          name: "Compressor Repair",
          description: "Professional compressor diagnosis and repair for optimal cooling performance",
          image: "/air-conditioner-repair.png",
          issues: [
            "AC not cooling properly",
            "Strange noises from outdoor unit",
            "Compressor overheating",
            "High electricity bills",
            "Frequent on/off cycling",
          ],
        },
        {
          id: "gas-problem",
          name: "Gas Problem",
          description: "Refrigerant leak detection, gas refilling, and pressure optimization",
          image: "/air-conditioner-repair.png",
          issues: [
            "Insufficient cooling",
            "Ice formation on coils",
            "Hissing sounds from unit",
            "Higher energy consumption",
            "Warm air from vents",
          ],
        },
        {
          id: "pcb-repair",
          name: "PCB Repair",
          description: "Circuit board diagnosis and repair for electronic control issues",
          image: "/air-conditioner-repair.png",
          issues: [
            "Remote control not working",
            "Display showing error codes",
            "Temperature control issues",
            "Timer function not working",
            "Automatic mode malfunction",
          ],
        },
        {
          id: "wiring-problem",
          name: "Wiring Problem",
          description: "Complete wiring inspection and repair for safe AC operation",
          image: "/air-conditioner-repair.png",
          issues: [
            "Loose connections",
            "Burnt wires",
            "Short circuit problems",
            "Voltage fluctuation damage",
            "Safety switch tripping",
          ],
        },
        {
          id: "leakages-problem",
          name: "Leakages Problem",
          description: "Water leak detection and repair to prevent damage and improve efficiency",
          image: "/air-conditioner-repair.png",
          issues: [
            "Water dripping from indoor unit",
            "Drain pipe blockage",
            "Condensate overflow",
            "Wall dampness",
            "Musty odors",
          ],
        },
      ],
    },
    {
      title: "AC Installations",
      services: [
        {
          id: "window-ac-installation",
          name: "Window AC Installation",
          description: "Professional window AC installation with proper mounting and electrical setup",
          image: "/air-conditioner-repair.png",
          issues: [
            "New AC installation needed",
            "Replacement of old unit",
            "Proper wall mounting required",
            "Electrical connection setup",
            "Optimal positioning for cooling",
          ],
        },
        {
          id: "split-ac-installation",
          name: "Split AC Installation",
          description: "Complete split AC installation including indoor and outdoor unit setup",
          image: "/air-conditioner-repair.png",
          issues: [
            "Indoor unit mounting",
            "Outdoor unit placement",
            "Copper pipe connection",
            "Electrical wiring setup",
            "Gas charging and testing",
          ],
        },
        {
          id: "multi-floor-installation",
          name: "Multi-floor Installation",
          description: "Specialized installation for ground, 1st, 2nd, 3rd, and 4th floor setups",
          image: "/air-conditioner-repair.png",
          issues: [
            "Height-specific installation",
            "Extended pipe routing",
            "Safety equipment needed",
            "Structural considerations",
            "Access challenges",
          ],
        },
        {
          id: "dismantling-acs",
          name: "Dismantling of ACs",
          description: "Safe removal and dismantling of existing AC units for relocation or disposal",
          image: "/air-conditioner-repair.png",
          issues: [
            "AC relocation needed",
            "Old unit removal",
            "Gas recovery required",
            "Wall restoration needed",
            "Safe disposal required",
          ],
        },
        {
          id: "extension-pipes",
          name: "Extension of Pipes",
          description: "Copper pipe extension for increased distance between indoor and outdoor units",
          image: "/air-conditioner-repair.png",
          issues: [
            "Insufficient pipe length",
            "Unit relocation needed",
            "Distance optimization",
            "Proper insulation required",
            "Gas pressure adjustment",
          ],
        },
        {
          id: "core-cutting",
          name: "Core Cutting",
          description: "Professional wall drilling and core cutting for pipe routing",
          image: "/air-conditioner-repair.png",
          issues: [
            "Wall drilling needed",
            "Pipe routing through walls",
            "Minimal dust cutting",
            "Structural safety",
            "Clean finishing required",
          ],
        },
      ],
    },
    {
      title: "AC Maintenance",
      services: [
        {
          id: "blower-services",
          name: "Blower Services",
          description: "Blower cleaning, repair, and maintenance for optimal air circulation",
          image: "/air-conditioner-repair.png",
          issues: [
            "Reduced air flow",
            "Noisy blower operation",
            "Dust accumulation",
            "Motor bearing issues",
            "Uneven cooling",
          ],
        },
        {
          id: "water-services",
          name: "Water Services",
          description: "Drainage system cleaning and water-related issue resolution",
          image: "/air-conditioner-repair.png",
          issues: [
            "Drain pipe blockage",
            "Water overflow",
            "Poor drainage",
            "Algae formation",
            "Drain pan cleaning needed",
          ],
        },
        {
          id: "chemical-cleaning",
          name: "Chemical Cleaning",
          description: "Deep chemical cleaning of coils and internal components for maximum efficiency",
          image: "/air-conditioner-repair.png",
          issues: [
            "Dirty evaporator coils",
            "Reduced cooling efficiency",
            "Bad odors from AC",
            "Bacterial growth",
            "High energy consumption",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Rajesh Kumar",
      rating: 5,
      comment: "Excellent AC repair service! Fixed my compressor issue in just 2 hours. Very professional technician.",
      service: "Compressor Repair",
    },
    {
      name: "Priya Sharma",
      rating: 5,
      comment: "Quick response for gas refilling. My AC is cooling perfectly now. Fair pricing too!",
      service: "Gas Problem",
    },
    {
      name: "Mohammed Ali",
      rating: 5,
      comment: "Professional split AC installation. Clean work and proper testing. Highly recommended!",
      service: "Split AC Installation",
    },
  ],
}

export default function ACServicesPage() {
  return <ServicePageTemplate {...acServicesData} />
}
