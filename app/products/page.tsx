import { Suspense } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

// Mock function to fetch product data
async function getProductsByCategory(category: string) {
  // In a real app, this would be an API call
  const products = {
    "business-cards": [
      {
        id: 1,
        name: "Standard Business Cards",
        price: "19.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 356,
      },
      {
        id: 2,
        name: "Premium Business Cards",
        price: "29.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 124,
      },
      {
        id: 3,
        name: "Square Business Cards",
        price: "24.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 89,
      },
      {
        id: 4,
        name: "Rounded Corner Cards",
        price: "24.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 67,
      },
      {
        id: 5,
        name: "Folded Business Cards",
        price: "34.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 45,
      },
      {
        id: 6,
        name: "Luxury Business Cards",
        price: "39.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 34,
      },
    ],
    "flyers-brochures": [
      {
        id: 1,
        name: "Standard Flyers",
        price: "29.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 245,
      },
      {
        id: 2,
        name: "Tri-Fold Brochures",
        price: "39.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 178,
      },
      {
        id: 3,
        name: "Bi-Fold Brochures",
        price: "34.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 112,
      },
      {
        id: 4,
        name: "Booklets",
        price: "49.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 89,
      },
      {
        id: 5,
        name: "Door Hangers",
        price: "24.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 67,
      },
      {
        id: 6,
        name: "Postcards",
        price: "19.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
      },
    ],
    "stickers-labels": [
      {
        id: 1,
        name: "Roll Stickers",
        price: "9.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 512,
      },
      {
        id: 2,
        name: "Cut-to-Size Stickers",
        price: "7.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 324,
      },
      {
        id: 3,
        name: "Circle Stickers",
        price: "8.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 156,
      },
      {
        id: 4,
        name: "Oval Stickers",
        price: "8.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 98,
      },
      {
        id: 5,
        name: "Square Stickers",
        price: "8.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 87,
      },
      {
        id: 6,
        name: "Custom Shape Stickers",
        price: "12.99",
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 65,
      },
    ],
  }
  return products[category as keyof typeof products] || []
}

export async function generateStaticParams() {
  // In a real app, you would fetch all categories from your API
  return [
    { category: "business-cards" },
    { category: "flyers-brochures" },
    { category: "banners-signs" },
    { category: "packaging" },
    { category: "stickers-labels" },
  ]
}

export const revalidate = 3600 // Revalidate every hour

export default async function ProductCategory({ params }: { params: { category: string } }) {
  const products = await getProductsByCategory(params.category)

  if (products.length === 0) {
    notFound()
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">
        {params.category
          .replace("-", " ")
          .split(" ")
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(" ")}
      </h1>
      <p className="text-gray-600 mb-6">Explore our range of high-quality print products.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Card key={product.id} className="overflow-hidden">
            <Suspense fallback={<div className="aspect-square bg-gray-200 animate-pulse"></div>}>
              <div className="aspect-square relative">
                <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
              </div>
            </Suspense>
            <CardContent className="p-4">
              <h3 className="font-medium text-lg mb-1">{product.name}</h3>
              <div className="flex items-center mb-2">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current fill-none"}`}
                    />
                  ))}
                </div>
                <span className="text-sm text-gray-600">
                  {product.rating} ({product.reviews})
                </span>
              </div>
              <div className="flex justify-between items-center">
                <p className="font-bold text-gray-900">Starting at ${product.price}</p>
                <Button size="sm" asChild>
                  <Link href={`/products/${params.category}/${product.id}`}>View</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

