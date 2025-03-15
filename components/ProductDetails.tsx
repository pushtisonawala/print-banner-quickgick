import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Product {
  id: number
  name: string
  price: string
  image: string
  rating: number
  reviews: number
  description: string
  features: string[]
}

interface ProductDetailsProps {
  product: Product
}

export function ProductDetails({ product }: ProductDetailsProps) {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Product Image */}
        <div className="relative aspect-square rounded-lg overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          
          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="text-yellow-400 text-xl">
                  {i < Math.floor(product.rating) ? "★" : "☆"}
                </span>
              ))}
            </div>
            <span className="ml-2 text-gray-600">
              ({product.reviews} reviews)
            </span>
          </div>

          {/* Price */}
          <div className="text-2xl font-bold text-brand mb-6">
            ${product.price}
          </div>

          {/* Description */}
          <p className="text-gray-600 mb-6">
            {product.description}
          </p>

          {/* Features */}
          <div className="mb-8">
            <h2 className="text-xl font-bold mb-4">Features</h2>
            <ul className="list-disc pl-5 space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="text-gray-600">{feature}</li>
              ))}
            </ul>
          </div>

          {/* Add to Cart Button */}
          <Button className="w-full md:w-auto" size="lg">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}
