import { CategoryPage } from "@/components/CategoryPage"

const newProducts = [
  {
    id: 101,
    name: "Eco-Friendly Business Cards",
    price: "24.99",
    image: "/placeholder.svg",
    rating: 5.0,
    reviews: 12,
    slug: "eco-friendly-cards",
    isNew: true
  },
  // Add more new products...
]

export default function NewProductsPage() {
  return (
    <CategoryPage
      title="New Arrivals"
      description="Check out our latest products and innovations in printing technology."
      products={newProducts}
      category="new"
    />
  )
}
