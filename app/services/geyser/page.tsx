import { ServicePageTemplate } from "@/components/service-page-template"

const geyserData = {
  serviceName: "Geyser Services",
  serviceDescription:
    "Professional water heater and geyser repair services for all brands. From heating element issues to thermostat problems, our expert technicians ensure reliable hot water supply.",
  heroImage: "/water-heater-geyser-repair.png",
  categories: [
    {
      title: "Geyser Repairs",
      services: [
        {
          id: "heating-element",
          name: "Heating Element Repair",
          description: "Heating element replacement and electrical heating issues",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "Water not heating",
            "Heating element burned out",
            "Slow heating",
            "Element replacement needed",
            "Electrical heating failure",
          ],
        },
        {
          id: "thermostat-issues",
          name: "Thermostat Issues",
          description: "Temperature control and thermostat calibration",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "Temperature not controlling",
            "Overheating problems",
            "Thermostat not working",
            "Temperature fluctuation",
            "Auto cut-off issues",
          ],
        },
        {
          id: "water-leakage",
          name: "Water Leakage",
          description: "Tank leakage and pipe connection repairs",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "Tank leaking water",
            "Pipe connection leaks",
            "Valve leakage",
            "Pressure relief issues",
            "Internal tank damage",
          ],
        },
        {
          id: "electrical-problems",
          name: "Electrical Problems",
          description: "Wiring, power supply, and electrical safety issues",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "Not turning on",
            "Power supply problems",
            "Electrical short circuit",
            "MCB tripping",
            "Wiring issues",
          ],
        },
        {
          id: "pressure-issues",
          name: "Pressure Issues",
          description: "Water pressure and flow rate problems",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "Low water pressure",
            "No hot water flow",
            "Pressure valve problems",
            "Flow rate issues",
            "Pump problems",
          ],
        },
        {
          id: "installation-service",
          name: "Installation Service",
          description: "New geyser installation and replacement services",
          image: "/water-heater-geyser-repair.png",
          issues: [
            "New geyser installation",
            "Old geyser replacement",
            "Wall mounting",
            "Electrical connection",
            "Pipe connection setup",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Rajesh Gupta",
      rating: 5,
      comment: "Heating element replaced quickly. Hot water working perfectly now!",
      service: "Heating Element Repair",
    },
    {
      name: "Kavita Sharma",
      rating: 5,
      comment: "Fixed water leakage issue professionally. No more water wastage!",
      service: "Water Leakage",
    },
    {
      name: "Deepak Singh",
      rating: 5,
      comment: "Thermostat calibration done perfectly. Temperature control is excellent now.",
      service: "Thermostat Issues",
    },
  ],
}

export default function GeyserPage() {
  return <ServicePageTemplate {...geyserData} />
}
