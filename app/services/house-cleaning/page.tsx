import { ServicePageTemplate } from "@/components/service-page-template"

const houseCleaningData = {
  serviceName: "House Cleaning Services",
  serviceDescription:
    "Professional house cleaning and maintenance services for homes and offices. From deep cleaning to regular maintenance, our trained staff ensures a spotless and hygienic environment.",
  heroImage: "/house-cleaning-service.png",
  categories: [
    {
      title: "House Cleaning Services",
      services: [
        {
          id: "deep-cleaning",
          name: "Deep Cleaning",
          description: "Comprehensive deep cleaning for entire house",
          image: "/house-cleaning-service.png",
          issues: [
            "Complete house cleaning",
            "Kitchen deep cleaning",
            "Bathroom sanitization",
            "Floor scrubbing",
            "Window cleaning",
          ],
        },
        {
          id: "regular-cleaning",
          name: "Regular Cleaning",
          description: "Daily, weekly, or monthly cleaning services",
          image: "/house-cleaning-service.png",
          issues: ["Daily cleaning", "Weekly maintenance", "Monthly cleaning", "Dusting and mopping", "Trash removal"],
        },
        {
          id: "kitchen-cleaning",
          name: "Kitchen Cleaning",
          description: "Specialized kitchen cleaning and sanitization",
          image: "/house-cleaning-service.png",
          issues: [
            "Chimney cleaning",
            "Gas stove cleaning",
            "Sink sanitization",
            "Cabinet cleaning",
            "Appliance cleaning",
          ],
        },
        {
          id: "bathroom-cleaning",
          name: "Bathroom Cleaning",
          description: "Complete bathroom cleaning and sanitization",
          image: "/house-cleaning-service.png",
          issues: ["Toilet cleaning", "Tile scrubbing", "Drain cleaning", "Mirror cleaning", "Sanitization"],
        },
        {
          id: "sofa-cleaning",
          name: "Sofa & Carpet Cleaning",
          description: "Upholstery and carpet deep cleaning services",
          image: "/house-cleaning-service.png",
          issues: ["Sofa deep cleaning", "Carpet cleaning", "Stain removal", "Fabric protection", "Odor elimination"],
        },
        {
          id: "office-cleaning",
          name: "Office Cleaning",
          description: "Commercial office cleaning and maintenance",
          image: "/house-cleaning-service.png",
          issues: [
            "Office deep cleaning",
            "Desk sanitization",
            "Floor maintenance",
            "Washroom cleaning",
            "Waste management",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Sunita Gupta",
      rating: 5,
      comment: "Deep cleaning service was excellent. House looks spotless now!",
      service: "Deep Cleaning",
    },
    {
      name: "Rajesh Mehta",
      rating: 5,
      comment: "Regular cleaning staff is very professional. Highly satisfied!",
      service: "Regular Cleaning",
    },
    {
      name: "Kavita Singh",
      rating: 5,
      comment: "Sofa cleaning done perfectly. Stains completely removed!",
      service: "Sofa & Carpet Cleaning",
    },
  ],
}

export default function HouseCleaningPage() {
  return <ServicePageTemplate {...houseCleaningData} />
}
