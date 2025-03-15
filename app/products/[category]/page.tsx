import { CategoryPage } from "@/components/CategoryPage"

const products = {
  "marketing-materials": [
    {
      id: 1,
      name: "Business Cards",
      price: "19.99",
      image: "/placeholder.svg?height=300&width=300",
      rating: 4.8,
      reviews: 356,
      slug: "business-cards"
    },
    // ...more products
  ],
  "signs-banners": [
    // ...products
  ],
  // ...other categories
}

export default function CategoryPage({ params }: { params: { category: string } }) {
  const categoryProducts = products[params.category as keyof typeof products] || []
  
  return (
    <CategoryPage
      title={params.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
      description="Browse our high-quality print products."
      products={categoryProducts}
      category={params.category}
    />
  )
}
