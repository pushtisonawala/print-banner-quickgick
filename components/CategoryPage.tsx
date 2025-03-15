import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import ErrorBoundary from "@/components/ErrorBoundary"

interface Product {
  id: number
  name: string
  price: string
  image?: string
  rating: number
  reviews: number
  slug: string
}

interface CategoryPageProps {
  title: string
  description: string
  products: Product[]
  category: string  // Add category prop
}

export function CategoryPage({ title, description, products, category }: CategoryPageProps) {
  if (!products || products.length === 0) {
    return <div>No products found.</div>
  }

  return (
    <ErrorBoundary>
      <div className="container-custom py-8">
        <h1 className="text-3xl font-bold mb-2">{title}</h1>
        <p className="text-gray-600 mb-6">{description}</p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card key={product.id} className="overflow-hidden">
              <div className="aspect-square relative">
                <Image src={product.image || "/images/placeholders/product.jpg"} alt={product.name} fill className="object-cover" />
              </div>
              <CardContent className="p-4">
                <h3 className="font-medium text-lg mb-1">{product.name}</h3>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating) ? "fill-current" : "stroke-current fill-none"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {product.rating.toFixed(1)} ({product.reviews})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900">Starting at ${product.price}</p>
                  <Button size="sm" asChild>
                    <Link href={`/products/${product.id}`}>View</Link> {/* Updated to use ID-based routing */}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </ErrorBoundary>
  )
}

