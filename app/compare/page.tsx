"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"

// Mock product data (in a real app, this would come from an API or database)
const productData = {
  1: {
    id: 1,
    name: "Standard Business Cards",
    price: 19.99,
    image: "/placeholder.svg?height=300&width=300",
    features: ["14pt Cardstock", "Full Color Both Sides", "Glossy or Matte Finish", '3.5" x 2"'],
  },
  2: {
    id: 2,
    name: "Premium Business Cards",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "16pt Cardstock",
      "Full Color Both Sides",
      "Glossy, Matte, or Spot UV Finish",
      '3.5" x 2"',
      "Rounded Corners Option",
    ],
  },
  3: {
    id: 3,
    name: "Luxury Business Cards",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    features: [
      "32pt Cardstock",
      "Full Color Both Sides",
      "Soft Touch Laminate",
      '3.5" x 2"',
      "Gold Foil Option",
      "Embossing Option",
    ],
  },
}

export default function ComparePage() {
  const [selectedProducts, setSelectedProducts] = useState<number[]>([])
  const { addToCart } = useCart()

  const handleProductSelect = (index: number, productId: string) => {
    setSelectedProducts((prev) => {
      const newSelected = [...prev]
      newSelected[index] = Number(productId)
      return newSelected
    })
  }

  const handleAddToCart = (product: any) => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
      options: {},
    })
    alert(`${product.name} has been added to your cart.`)
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Compare Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {[0, 1, 2].map((index) => (
          <div key={index}>
            <Select onValueChange={(value) => handleProductSelect(index, value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a product" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(productData).map(([id, product]) => (
                  <SelectItem key={id} value={id}>
                    {product.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {selectedProducts.map((productId, index) => {
          const product = productData[productId as keyof typeof productData]
          return product ? (
            <Card key={index}>
              <CardContent className="p-6">
                <div className="aspect-square relative mb-4">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover rounded-lg"
                  />
                </div>
                <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                <p className="text-lg font-bold mb-4">${product.price.toFixed(2)}</p>
                <ul className="list-disc pl-5 mb-4">
                  {product.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
                <Button onClick={() => handleAddToCart(product)} className="w-full">
                  Add to Cart
                </Button>
              </CardContent>
            </Card>
          ) : (
            <div key={index} className="h-full flex items-center justify-center border-2 border-dashed rounded-lg">
              <p className="text-gray-400">Select a product to compare</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

