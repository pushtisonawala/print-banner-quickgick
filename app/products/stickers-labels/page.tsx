import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Custom Stickers",
    price: "9.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 512,
    slug: "custom-stickers"
  },
  {
    id: 2,
    name: "Product Labels",
    price: "14.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 324,
    slug: "product-labels"
  },
  {
    id: 3,
    name: "Roll Labels",
    price: "19.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 156,
    slug: "roll-labels"
  },
  {
    id: 4,
    name: "Cut-to-Size Labels",
    price: "12.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 98,
    slug: "cut-to-size-labels"
  },
  {
    id: 5,
    name: "Warning Labels",
    price: "11.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 76,
    slug: "warning-labels"
  },
]

export default function StickersLabelsPage() {
  return (
    <CategoryPage
      title="Stickers & Labels"
      description="Enhance your products with our custom stickers and labels. Perfect for branding, packaging, or promotional use."
      products={products}
      category="stickers-labels"
    />
  )
}

