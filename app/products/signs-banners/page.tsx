import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Vinyl Banners",
    price: "49.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 156,
    slug: "vinyl-banners"
  },
  {
    id: 2,
    name: "Roll-Up Banners",
    price: "79.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 98,
    slug: "roll-up-banners"
  },
  {
    id: 3,
    name: "Outdoor Signs",
    price: "89.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 112,
    slug: "outdoor-signs"
  },
  {
    id: 4,
    name: "Window Graphics",
    price: "39.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 76,
    slug: "window-graphics"
  },
  {
    id: 5,
    name: "Trade Show Displays",
    price: "199.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 65,
    slug: "trade-show-displays"
  },
]

export default function SignsBannersPage() {
  return (
    <CategoryPage
      title="Signs & Banners"
      description="Make a big impact with our high-quality signs and banners. Perfect for events, promotions, and business advertising."
      products={products}
      category="signs-banners"
    />
  )
}

