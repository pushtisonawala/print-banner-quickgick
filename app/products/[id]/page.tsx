"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Box, Truck } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { notFound } from "next/navigation"
import { useCart } from "@/contexts/CartContext"

// Define types for product options and features
type ProductOption = string;
type ProductFeature = string;

interface ProductOptions {
  size?: ProductOption[];
  paper?: ProductOption[];
  material?: ProductOption[];
  finish?: ProductOption[];
  stand?: ProductOption[];
  shape?: ProductOption[];
}

interface Product {
  id: number;
  name: string;
  description: string;
  category: string;
  price: number;
  images: string[];
  rating: number;
  reviews: number;
  options: ProductOptions;
  features: ProductFeature[];
}

type Products = {
  [key: string]: Product;
}

// Update product data with proper typing
const products: Products = {
  "1": {
    id: 1,
    name: "Standard Business Cards",
    description: "Make a lasting impression with our premium business cards. Featuring crisp text, vibrant colors, and premium paper stock that feels as good as it looks.",
    category: "marketing-materials",
    price: 19.99,
    images: [
      "https://files.printo.in/site/20230523_151919983434_436701_premium-laminated-business-card.jpg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    rating: 4.8,
    reviews: 156,
    options: {
      size: ["3.5\" x 2\" (Standard)", "2\" x 2\" (Square)", "2.5\" x 2.5\" (Mini)"],
      paper: ["Premium 16pt Matte", "Standard 14pt", "Recycled Matte", "Linen"],
      finish: ["Matte", "Glossy", "Spot UV", "Soft Touch"]
    },
    features: [
      "Full color printing on both sides",
      "Premium paper stocks",
      "Multiple finish options",
      "Fast turnaround time",
      "Free artwork check"
    ]
  },
  "2": {
    id: 2,
    name: "Premium Roll-Up Banners",
    description: "Professional roll-up banners perfect for trade shows, exhibitions, and retail displays. Includes premium stand and carrying case.",
    category: "signs-banners",
    price: 79.99,
    images: [
      "https://hazken.com/assets/images/bg/Rollup-banner-small-base.jpg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    rating: 4.9,
    reviews: 89,
    options: {
      size: ["33\" x 81\"", "36\" x 92\"", "48\" x 92\""],
      material: ["Premium PET", "Standard PVC", "Fabric"],
      stand: ["Deluxe", "Standard", "Economy"]
    },
    features: [
      "High-resolution printing",
      "Durable retractable mechanism",
      "Lightweight aluminum stand",
      "Padded carrying case included",
      "Easy setup and takedown"
    ]
  },
  "3": {
    id: 3,
    name: "Custom Vinyl Stickers",
    description: "High-quality vinyl stickers with weather-resistant finish. Perfect for indoor or outdoor use, with exceptional durability.",
    category: "stickers-labels",
    price: 24.99,
    images: [
      "https://cdn.makestickers.com/image/makestickers/products/custom-stickers.jpg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    rating: 4.7,
    reviews: 234,
    options: {
      size: ["2\" x 2\"", "3\" x 3\"", "4\" x 4\"", "Custom Size"],
      material: ["Glossy Vinyl", "Matte Vinyl", "Clear Vinyl", "Holographic"],
      shape: ["Circle", "Square", "Rectangle", "Custom Shape"]
    },
    features: [
      "Weatherproof and UV resistant",
      "Indoor/outdoor use",
      "Custom die-cutting available",
      "Premium adhesive backing",
      "Scratch-resistant coating"
    ]
  },
  "4": {
    id: 4,
    name: "Premium Gift Boxes",
    description: "Elegant custom gift boxes with premium finish options. Perfect for retail packaging, special occasions, and corporate gifts.",
    category: "boxes-packaging",
    price: 34.99,
    images: [
      "https://i.etsystatic.com/21873794/r/il/ccb163/3669153358/il_570xN.3669153358_mb84.jpg",
      "/placeholder.svg",
      "/placeholder.svg"
    ],
    rating: 4.8,
    reviews: 167,
    options: {
      size: ["Small (4\"x4\"x2\")", "Medium (6\"x6\"x4\")", "Large (8\"x8\"x4\")", "Custom"],
      material: ["Premium Cardstock", "Kraft", "Rigid Board", "Recycled"],
      finish: ["Matte Lamination", "Gloss Lamination", "Soft Touch", "Foil Stamping"]
    },
    features: [
      "Sturdy construction",
      "Premium printing quality",
      "Custom sizes available",
      "Eco-friendly options",
      "Bulk ordering discounts"
    ]
  }
} as const;

// Update option colors with proper typing
type OptionColor = {
  [K in keyof ProductOptions]?: string;
};

const optionColors: OptionColor = {
  size: "bg-blue-50/50 hover:bg-blue-100/50 border-blue-100",
  paper: "bg-emerald-50/50 hover:bg-emerald-100/50 border-emerald-100",
  material: "bg-violet-50/50 hover:bg-violet-100/50 border-violet-100",
  finish: "bg-sky-50/50 hover:bg-sky-100/50 border-sky-100",
  stand: "bg-indigo-50/50 hover:bg-indigo-100/50 border-indigo-100",
  shape: "bg-cyan-50/50 hover:bg-cyan-100/50 border-cyan-100"
} as const;

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = React.use(params)
  const { addToCart } = useCart()
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({
    size: "Standard",
    paper: "Premium",
    finish: "Matte"
  })

  const product = products[resolvedParams.id]

  if (!product) {
    return notFound()
  }

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.images[0],
      options: selectedOptions
    })
  }

  return (
    <div className="container mx-auto px-4 py-8 bg-white">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
        <Link href="/" className="hover:text-blue-600">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-blue-600">Products</Link>
        <span>/</span>
        <span className="text-gray-700 font-medium">{product.name}</span>
      </div>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Main Product Image */}
        <div>
          <div className="aspect-square relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
            <Image 
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold mb-2 text-gray-800">{product.name}</h1>
            <p className="text-gray-600 leading-relaxed">{product.description}</p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current"}`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews} reviews)
            </span>
          </div>

          <div className="text-2xl font-bold text-blue-600">${product.price}</div>

          {/* Product Options with distinct colors */}
          <div className="space-y-8 pt-6 border-t">
            {Object.entries(product.options).map(([option, values]: [string, string[]], index: number) => (
              <div key={option} className="relative">
                <label className="text-sm font-medium text-gray-700 capitalize block mb-2">
                  {option}
                </label>
                <Select
                  value={selectedOptions[option]}
                  onValueChange={(value) => 
                    setSelectedOptions(prev => ({ ...prev, [option]: value }))
                  }
                >
                  <SelectTrigger className={`w-full ${optionColors[option as keyof ProductOptions] || 'bg-gray-50 border-gray-200'}`}>
                    <SelectValue placeholder={`Select ${option}`} />
                  </SelectTrigger>
                  <SelectContent 
                    position="popper" 
                    className={`w-[var(--radix-select-trigger-width)] z-[100] ${optionColors[option as keyof ProductOptions] || 'bg-gray-50'}`}
                    style={{ marginTop: '4px' }}
                  >
                    {values.map((value: string) => (
                      <SelectItem 
                        key={value} 
                        value={value}
                        className={`hover:${optionColors[option as keyof ProductOptions]?.replace('bg-', 'bg-opacity-75 bg-')} transition-colors`}
                      >
                        {value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            ))}
          </div>

          {/* Additional Details */}
          <div className="space-y-6 pt-6 border-t border-gray-100">
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Product Specifications</h3>
              <dl className="grid grid-cols-2 gap-4">
                <div>
                  <dt className="text-sm text-gray-600">Production Time</dt>
                  <dd className="text-sm font-medium">2-3 Business Days</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Minimum Order</dt>
                  <dd className="text-sm font-medium">50 pieces</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">Print Type</dt>
                  <dd className="text-sm font-medium">Full Color (CMYK)</dd>
                </div>
                <div>
                  <dt className="text-sm text-gray-600">File Format</dt>
                  <dd className="text-sm font-medium">AI, PDF, PSD, EPS</dd>
                </div>
              </dl>
            </div>

            {/* Shipping Information */}
            <div className="bg-blue-50/50 rounded-lg p-6 border border-blue-100">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Shipping & Delivery</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Free shipping on orders over $75</span>
                </div>
                <div className="flex items-center gap-3">
                  <Box className="h-5 w-5 text-blue-600" />
                  <span className="text-gray-600">Arrives in 5-7 business days</span>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="bg-gray-50/50 rounded-lg p-6 border border-gray-100">
              <h3 className="text-lg font-medium mb-4 text-gray-800">Key Features</h3>
              <ul className="space-y-3">
                {product.features.map((feature: ProductFeature, index: number) => (
                  <li key={index} className="flex items-start gap-3">
                    <div className="w-2 h-2 rounded-full bg-blue-600 mt-2" />
                    <span className="text-gray-600">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Add to Cart Section */}
          <div className="pt-6 border-t border-gray-100">
            <Button onClick={handleAddToCart} size="lg" className="w-full bg-blue-600 hover:bg-blue-700 text-white">
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
