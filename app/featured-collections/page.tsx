import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Eco-Friendly Collection",
    price: "29.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    slug: "eco-friendly-collection",
  },
  {
    id: 2,
    name: "Luxury Print Collection",
    price: "59.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 178,
    slug: "luxury-print-collection",
  },
  {
    id: 3,
    name: "Small Business Starter Kit",
    price: "99.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    slug: "small-business-starter-kit",
  },
  {
    id: 4,
    name: "Event Essentials Bundle",
    price: "149.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 98,
    slug: "event-essentials-bundle",
  },
  {
    id: 5,
    name: "Seasonal Promotion Set",
    price: "79.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 87,
    slug: "seasonal-promotion-set",
  },
]

export default function FeaturedCollectionsPage() {
  return (
    <CategoryPage
      title="Featured Collections"
      description="Explore our curated collections of print products. From eco-friendly options to luxury prints, find the perfect set for your needs."
      products={products}
      category="featured"  // Add this line
    />
  )
}

