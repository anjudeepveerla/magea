import { ServicePageTemplate } from "@/components/service-page-template"

const roWaterPurifierData = {
  serviceName: "RO/Water Purifier Services",
  serviceDescription:
    "Professional RO and water purifier repair and maintenance services. From filter replacement to pump issues, our certified technicians ensure clean and safe drinking water.",
  heroImage: "/ro-water-purifier.png",
  categories: [
    {
      title: "RO/Water Purifier Repairs",
      services: [
        {
          id: "filter-replacement",
          name: "Filter Replacement",
          description: "All types of filter replacement and maintenance",
          image: "/ro-water-purifier.png",
          issues: [
            "Pre-filter replacement",
            "RO membrane change",
            "Post-carbon filter",
            "Sediment filter change",
            "UV lamp replacement",
          ],
        },
        {
          id: "pump-repair",
          name: "Pump Repair",
          description: "Water pump and pressure pump issues",
          image: "/ro-water-purifier.png",
          issues: [
            "Pump not working",
            "Low water pressure",
            "Pump making noise",
            "Pressure switch issues",
            "Motor problems",
          ],
        },
        {
          id: "water-leakage",
          name: "Water Leakage",
          description: "Pipe connections and tank leakage repairs",
          image: "/ro-water-purifier.png",
          issues: [
            "Pipe connection leaks",
            "Storage tank leakage",
            "Valve leakage",
            "Fitting problems",
            "Seal replacement",
          ],
        },
        {
          id: "electrical-issues",
          name: "Electrical Issues",
          description: "Power supply and electrical component repairs",
          image: "/ro-water-purifier.png",
          issues: [
            "Not turning on",
            "Power supply problems",
            "Control panel issues",
            "Indicator light problems",
            "Electrical connections",
          ],
        },
        {
          id: "water-quality",
          name: "Water Quality Issues",
          description: "TDS control and water taste problems",
          image: "/ro-water-purifier.png",
          issues: ["High TDS levels", "Bad taste in water", "Cloudy water", "Slow water flow", "Water quality testing"],
        },
        {
          id: "installation-service",
          name: "Installation Service",
          description: "New RO installation and relocation services",
          image: "/ro-water-purifier.png",
          issues: ["New RO installation", "Wall mounting", "Pipe connections", "Electrical setup", "System testing"],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Amit Patel",
      rating: 5,
      comment: "Filter replacement done on time. Water quality improved significantly!",
      service: "Filter Replacement",
    },
    {
      name: "Priya Joshi",
      rating: 5,
      comment: "Pump repair completed quickly. Water pressure is perfect now.",
      service: "Pump Repair",
    },
    {
      name: "Rohit Kumar",
      rating: 5,
      comment: "Fixed water leakage issue professionally. No more water wastage!",
      service: "Water Leakage",
    },
  ],
}

export default function ROWaterPurifierPage() {
  return <ServicePageTemplate {...roWaterPurifierData} />
}
