import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Custom T-Shirts",
    price: "14.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 412,
    slug: "custom-t-shirts"
  },
  {
    id: 2,
    name: "Business Apparel",
    price: "39.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    slug: "business-apparel"
  },
  {
    id: 3,
    name: "Promotional Items",
    price: "9.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 298,
    slug: "promotional-items"
  },
  {
    id: 4,
    name: "Embroidered Apparel",
    price: "29.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 87,
    slug: "embroidered-apparel"
  },
  {
    id: 5,
    name: "Team Uniforms",
    price: "49.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 65,
    slug: "team-uniforms"
  },
]

export default function ApparelPromoPage() {
  return (
    <CategoryPage
      title="Apparel & Promotional Items"
      description="Custom apparel and promotional items for your brand."
      products={products}
      category="apparel-promo"
    />
  )
}

