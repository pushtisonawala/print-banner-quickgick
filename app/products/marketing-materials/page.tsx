import { CategoryPage } from "@/components/CategoryPage"

const products = [
  {
    id: 1,
    name: "Business Cards",
    price: "19.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 356,
    slug: "business-cards"
  },
  {
    id: 2,
    name: "Flyers",
    price: "29.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 245,
    slug: "flyers"
  },
  {
    id: 3,
    name: "Brochures",
    price: "39.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.9,
    reviews: 178,
    slug: "brochures"
  },
  {
    id: 4,
    name: "Postcards",
    price: "14.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 112,
    slug: "postcards"
  },
  {
    id: 5,
    name: "Presentation Folders",
    price: "49.99",
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 89,
    slug: "presentation-folders"
  },
]

export default function MarketingMaterialsPage() {
  return (
    <CategoryPage
      title="Marketing Materials"
      description="Boost your brand with our high-quality marketing materials. From business cards to brochures, we've got everything you need to make a lasting impression."
      products={products}
      category="marketing-materials"
    />
  )
}

