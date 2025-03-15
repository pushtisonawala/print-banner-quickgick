import { CategoryPage } from "@/components/CategoryPage"

const featuredProducts = [
  {
    id: 201,
    name: "Premium Metal Business Cards",
    price: "89.99",
    image: "/placeholder.svg",
    rating: 4.9,
    reviews: 45,
    slug: "metal-cards",
    isFeatured: true
  },
  // Add more featured products...
]

export default function FeaturedProductsPage() {
  return (
    <CategoryPage
      title="Featured Products"
      description="Our most popular and innovative printing solutions."
      products={featuredProducts}
      category="featured"
    />
  )
}
