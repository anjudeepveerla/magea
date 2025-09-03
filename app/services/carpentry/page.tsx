import { ServicePageTemplate } from "@/components/service-page-template"

const carpentryData = {
  serviceName: "Carpentry Services",
  serviceDescription:
    "Professional carpentry and woodwork services for homes and offices. From furniture repair to custom woodwork, our skilled carpenters deliver quality craftsmanship and reliable solutions.",
  heroImage: "/carpenter-working.png",
  categories: [
    {
      title: "Carpentry & Woodwork Services",
      services: [
        {
          id: "furniture-repair",
          name: "Furniture Repair",
          description: "Furniture restoration, repair, and maintenance services",
          image: "/carpenter-working.png",
          issues: ["Broken furniture", "Chair repair", "Table restoration", "Cabinet door issues", "Drawer problems"],
        },
        {
          id: "door-window",
          name: "Door & Window Repair",
          description: "Door installation, window repair, and frame adjustments",
          image: "/carpenter-working.png",
          issues: [
            "Door not closing properly",
            "Window frame issues",
            "Lock installation",
            "Handle replacement",
            "Frame alignment",
          ],
        },
        {
          id: "custom-furniture",
          name: "Custom Furniture",
          description: "Custom furniture design and manufacturing",
          image: "/carpenter-working.png",
          issues: ["Custom wardrobe", "Kitchen cabinets", "Study table", "Bookshelf design", "Storage solutions"],
        },
        {
          id: "bed-repair",
          name: "Bed Repair",
          description: "Bed frame repair, cot restoration, and mattress support",
          image: "/carpenter-working.png",
          issues: ["Bed frame broken", "Cot repair", "Mattress support", "Headboard issues", "Joint loosening"],
        },
        {
          id: "cabinet-work",
          name: "Cabinet Work",
          description: "Kitchen cabinets, wardrobes, and storage cabinet services",
          image: "/carpenter-working.png",
          issues: [
            "Cabinet door repair",
            "Shelf installation",
            "Wardrobe maintenance",
            "Hinge replacement",
            "Cabinet modification",
          ],
        },
        {
          id: "wood-polishing",
          name: "Wood Polishing",
          description: "Wood polishing, varnishing, and finishing services",
          image: "/carpenter-working.png",
          issues: [
            "Wood polishing",
            "Varnish application",
            "Surface restoration",
            "Color matching",
            "Protective coating",
          ],
        },
      ],
    },
  ],
  testimonials: [
    {
      name: "Ramesh Patel",
      rating: 5,
      comment: "Furniture repair done excellently. Chair is as good as new now!",
      service: "Furniture Repair",
    },
    {
      name: "Geeta Sharma",
      rating: 5,
      comment: "Custom wardrobe made perfectly. Great craftsmanship and finishing!",
      service: "Custom Furniture",
    },
    {
      name: "Anil Kumar",
      rating: 5,
      comment: "Door repair completed professionally. No more alignment issues!",
      service: "Door & Window Repair",
    },
  ],
}

export default function CarpentryPage() {
  return <ServicePageTemplate {...carpentryData} />
}
