import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Custom Boxes",
    price: "24.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 203,
    slug: "custom-boxes"
  },
  {
    id: 2,
    name: "Mailer Boxes",
    price: "19.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 178,
    slug: "mailer-boxes"
  },
  {
    id: 3,
    name: "Product Boxes",
    price: "29.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    slug: "product-boxes"
  },
  {
    id: 4,
    name: "Gift Boxes",
    price: "34.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 98,
    slug: "gift-boxes"
  },
  {
    id: 5,
    name: "Food Packaging",
    price: "39.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 87,
    slug: "food-packaging"
  },
]

export default function BoxesPackagingPage() {
  return (
    <CategoryPage
      title="Boxes & Packaging"
      description="Elevate your product presentation with our custom boxes and packaging solutions. From shipping boxes to gift packaging, we've got you covered."
      products={products}
      category="boxes-packaging"
    />
  )
}

