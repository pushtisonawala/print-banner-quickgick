"use client"

import * as React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/CartContext"

// Mock product data (in a real app, this would come from an API or database)
const productData = {
  1: {
    name: "Business Card",
    basePrice: 19.99,
    options: {
      paperType: ["Standard", "Premium", "Recycled"],
      finish: ["Matte", "Glossy"],
      shape: ["Rectangle", "Square", "Rounded Corners"],
    },
  },
  // Add more products as needed
}

interface CustomizationOptions extends Record<string, string> {
  paperType: string;
  finish: string;
  shape: string;
  quantity: string;  // Changed from number to string
  text: string;
  textColor: string;
  backgroundColor: string;
}

export default function CustomizePage({ params }: { params: { category: string; slug: string } }) {
  const router = useRouter()
  const { addToCart } = useCart()
  const { toast } = useToast()
  const [product, setProduct] = useState<any>(null)
  const [customizations, setCustomizations] = useState<CustomizationOptions>({
    paperType: "",
    finish: "",
    shape: "",
    quantity: "100",  // Changed from number to string
    text: "",
    textColor: "#000000",
    backgroundColor: "#ffffff",
  })
  const [price, setPrice] = useState(0)
  useEffect(() => {
    const productId = Number(params.slug) as keyof typeof productData
    const productInfo = productData[productId]
    if (productInfo) {
      setProduct(productInfo)
      setCustomizations((prev) => ({
        ...prev,
        paperType: productInfo.options.paperType[0],
        finish: productInfo.options.finish[0],
        shape: productInfo.options.shape[0],
      }))
    }
  }, [params.slug])

  useEffect(() => {
    if (product) {
      let newPrice = product.basePrice
      // Add price adjustments based on customizations
      if (customizations.paperType === "Premium") newPrice += 5
      if (customizations.finish === "Glossy") newPrice += 2
      if (customizations.shape === "Rounded Corners") newPrice += 3
      newPrice *= Number(customizations.quantity) / 100
      setPrice(newPrice)
    }
  }, [product, customizations])

  const handleCustomizationChange = (key: keyof CustomizationOptions, value: string | number) => {
    setCustomizations((prev) => ({
      ...prev,
      [key]: value.toString(), // Convert all values to string
    }))
  }

  const handleAddToCart = () => {
    if (!product) return
    const productId = Number(params.slug)
    
    addToCart({
      id: productId,
      name: product.name,
      price: price,
      quantity: 1,
      image: "/placeholder.svg?height=300&width=300",
      options: customizations,  // Now type-safe since quantity is string
    })
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    })
    router.push("/cart")
  }

  if (!product) return <div>Loading...</div>

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Customize Your {product.name}</h1>
      <div className="grid md:grid-cols-2 gap-8">
        <div>
          <div className="aspect-square relative mb-4 border rounded-lg overflow-hidden">
            <Image src="/placeholder.svg?height=600&width=600" alt={product.name} fill className="object-cover" />
            <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80">
              <div
                className="w-3/4 h-1/2 flex items-center justify-center rounded-lg shadow-lg"
                style={{
                  backgroundColor: customizations.backgroundColor,
                  color: customizations.textColor,
                }}
              >
                <p className="text-center font-bold">{customizations.text || "Your Text Here"}</p>
              </div>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <Label htmlFor="text">Custom Text</Label>
              <Input
                id="text"
                value={customizations.text}
                onChange={(e) => handleCustomizationChange("text", e.target.value)}
                placeholder="Enter your custom text"
              />
            </div>
            <div>
              <Label htmlFor="textColor">Text Color</Label>
              <Input
                id="textColor"
                type="color"
                value={customizations.textColor}
                onChange={(e) => handleCustomizationChange("textColor", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="backgroundColor">Background Color</Label>
              <Input
                id="backgroundColor"
                type="color"
                value={customizations.backgroundColor}
                onChange={(e) => handleCustomizationChange("backgroundColor", e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="space-y-6">
          {Object.entries(product.options).map(([option, values]) => (
            <div key={option}>
              <Label htmlFor={option}>{option}</Label>
              <Select
                value={customizations[option as keyof typeof customizations]}
                onValueChange={(value) => handleCustomizationChange(option, value)}
              >
                <SelectTrigger id={option}>
                  <SelectValue placeholder={`Select ${option}`} />
                </SelectTrigger>
                <SelectContent>
                  {(values as string[]).map((value) => (
                    <SelectItem key={value} value={value}>
                      {value}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          ))}
          <div>
            <Label htmlFor="quantity">Quantity</Label>
            <Slider
              id="quantity"
              min={100}
              max={1000}
              step={100}
              value={[Number(customizations.quantity)]}
              onValueChange={(value) => handleCustomizationChange("quantity", value[0].toString())}
            />
            <div className="mt-2 text-sm text-gray-600">{customizations.quantity} pcs</div>
          </div>
          <div className="text-2xl font-bold">Total Price: ${price.toFixed(2)}</div>
          <Button onClick={handleAddToCart} className="w-full">
            Add to Cart
          </Button>
        </div>
      </div>
    </div>
  )
}