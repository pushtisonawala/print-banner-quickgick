"use client"

import * as React from "react"
import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Box, Truck, Check, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { notFound } from "next/navigation"
import { useCart } from "@/contexts/CartContext"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Define types for product options and features
type ProductOption = string;
type ProductFeature = string;

interface MaterialFeature {
  name: string;
  features: string[];
}

interface ProductOptions {
  size: ProductOption[];
  material: MaterialFeature[];
  quantity?: ProductOption[];
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
      material: [
        {
          name: "Standard White",
          features: ["14pt Card Stock", "Bright White", "Cost-effective"]
        },
        {
          name: "Premium White",
          features: ["16pt Card Stock", "Extra Smooth", "Superior Feel"]
        },
        {
          name: "Kraft Brown",
          features: ["18pt Stock", "Eco-friendly", "Natural Look"]
        }
      ],
      quantity: ["50", "100", "250", "500", "1000"],
      finish: ["Matte", "Glossy", "Soft Touch", "Spot UV"]
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
      material: [
        {
          name: "Premium PET",
          features: ["High durability", "Premium finish", "Weather resistant"]
        },
        {
          name: "Standard PVC",
          features: ["Cost effective", "Durable", "Indoor use"]
        },
        {
          name: "Fabric",
          features: ["Elegant look", "Wrinkle resistant", "Lightweight"]
        }
      ],
      quantity: ["1", "2", "3", "5", "10"],
      finish: ["Standard", "Premium", "Deluxe"],
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
      material: [
        {
          name: "Glossy Vinyl",
          features: ["Shiny finish", "Vibrant colors", "Weather resistant"]
        },
        {
          name: "Matte Vinyl",
          features: ["Non-reflective", "Professional look", "Durable"]
        },
        {
          name: "Clear Vinyl",
          features: ["Transparent", "Premium look", "Versatile"]
        },
        {
          name: "Holographic",
          features: ["Eye-catching", "Rainbow effect", "Premium finish"]
        }
      ],
      quantity: ["50", "100", "250", "500"],
      finish: ["Glossy", "Matte"],
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
      material: [
        {
          name: "Premium Cardstock",
          features: ["Heavy duty", "Premium finish", "Elegant look"]
        },
        {
          name: "Kraft",
          features: ["Eco-friendly", "Natural look", "Durable"]
        },
        {
          name: "Rigid Board",
          features: ["Extra sturdy", "Premium quality", "Long-lasting"]
        },
        {
          name: "Recycled",
          features: ["Eco-friendly", "Sustainable", "Quality finish"]
        }
      ],
      quantity: ["25", "50", "100", "250"],
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

// Add new mock reviews data after the products const
const productReviews = [
  {
    id: 1,
    name: "John Smith",
    rating: 5,
    date: "2024-01-15",
    comment: "Exceptional quality! The colors are vibrant and the paper stock feels premium.",
    verified: true
  },
  {
    id: 2,
    name: "Sarah Johnson",
    rating: 4,
    date: "2024-01-10",
    comment: "Great business cards, just what I needed for my new startup.",
    verified: true
  },
  // Add more reviews as needed
];

const faqItems = [
  {
    question: "What's the standard turnaround time?",
    answer: "Standard production takes 2-3 business days. Rush options available for faster delivery."
  },
  {
    question: "Do you offer custom sizes?",
    answer: "Yes, we can accommodate custom sizes. Please contact our support team for specific requirements."
  },
  {
    question: "What file formats do you accept?",
    answer: "We accept PDF, AI, PSD, and EPS files. All files should be in CMYK color mode at 300 DPI."
  },
  {
    question: "Can I get a sample before ordering in bulk?",
    answer: "Yes, we offer sample packs that include different paper stocks and finishes."
  }
];

// Update option colors with proper typing
type OptionColor = {
  [K in keyof ProductOptions]?: string;
};

const optionColors: OptionColor = {
  size: "bg-blue-50/50 hover:bg-blue-100/50 border-blue-100",
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
  const [quantity, setQuantity] = useState("100")

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

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        {/* Main Product Image */}
        <div className="aspect-square relative rounded-xl overflow-hidden bg-white shadow-sm border border-gray-100">
          <Image 
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover"
          />
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

          {/* Options Selection */}
          <div className="space-y-6">
            {/* Size Selection */}
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Select Size</h3>
              <div className="grid grid-cols-3 gap-4">
                {product.options?.size?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, size }))}
                    className={`p-4 border rounded-lg text-center ${
                      selectedOptions.size === size ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Material Selection */}
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Select Material</h3>
              <div className="grid gap-4">
                {product.options?.material?.map((material) => (
                  <button
                    key={material.name}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, material: material.name }))}
                    className={`p-4 border rounded-lg flex justify-between items-start ${
                      selectedOptions.material === material.name ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    <div>
                      <h4 className="font-medium">{material.name}</h4>
                      <ul className="mt-2 space-y-1">
                        {material.features.map((feature) => (
                          <li key={feature} className="flex items-center text-sm text-gray-600">
                            <Check className="h-4 w-4 mr-2 text-green-500" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selection */}
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Select Quantity</h3>
              <div className="grid grid-cols-5 gap-4">
                {product.options?.quantity?.map((qty) => (
                  <button
                    key={qty}
                    onClick={() => setQuantity(qty)}
                    className={`p-4 border rounded-lg text-center ${
                      quantity === qty ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {qty}
                  </button>
                ))}
              </div>
            </div>

            {/* Finish Selection */}
            <div className="border rounded-lg p-6">
              <h3 className="font-medium mb-4">Select Finish</h3>
              <div className="grid grid-cols-2 gap-4">
                {product.options?.finish?.map((finish) => (
                  <button
                    key={finish}
                    onClick={() => setSelectedOptions(prev => ({ ...prev, finish }))}
                    className={`p-4 border rounded-lg text-center ${
                      selectedOptions.finish === finish ? 'border-blue-600 bg-blue-50' : 'border-gray-200'
                    }`}
                  >
                    {finish}
                  </button>
                ))}
              </div>
            </div>

            {/* Price and Add to Cart */}
            <div className="flex items-center justify-between p-6 border rounded-lg bg-gray-50">
              <div>
                <p className="text-sm text-gray-600">Price per unit</p>
                <p className="text-2xl font-bold text-blue-600">${product.price}</p>
              </div>
              <Button onClick={handleAddToCart} size="lg" className="bg-blue-600">
                Add to Cart
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Product Information */}
      <div className="mt-16">
        <Tabs defaultValue="overview" className="w-full">
          <div className="border-b border-gray-200">
            <TabsList className="w-full h-auto p-0 bg-transparent">
              {["Overview", "Material & Specs", "Reviews", "FAQ"].map((tab) => (
                <TabsTrigger
                  key={tab}
                  value={tab.toLowerCase().replace(/ & /g, '-')}
                  className="relative px-8 py-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none rounded-none border-b-2 border-transparent data-[state=active]:border-blue-600 data-[state=active]:text-blue-600 text-base font-medium"
                >
                  {tab}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {/* Rest of the tabs content */}
          <div className="py-8">
            <TabsContent value="overview">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold mb-6">Create a memorable unboxing experience</h3>
                <p className="text-gray-600 mb-8 text-lg leading-relaxed">
                  Make a lasting impression with our premium business cards. Printed on high-quality paper stock with sharp, vivid colors.
                </p>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                  <div className="bg-gray-50 p-6 rounded-lg border">
                    <h4 className="text-xl font-semibold mb-4">Features</h4>
                    <ul className="space-y-3">
                      {[
                        "300 GSM premium paper",
                        "Full color printing on both sides",
                        "Matte or glossy finish options",
                        'Standard size: 3.5" x 2"',
                        "Rounded corners available"
                      ].map((feature, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <Check className="h-5 w-5 text-green-500 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-blue-50 p-6 rounded-lg border border-blue-100">
                    <h4 className="text-xl font-semibold mb-4">Why Choose Us</h4>
                    <ul className="space-y-4">
                      {[
                        { title: "Premium Quality", desc: "Industry-leading paper stocks and finishes" },
                        { title: "Fast Turnaround", desc: "Quick production and shipping times" },
                        { title: "Expert Support", desc: "Professional design assistance available" }
                      ].map((item, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
                            <Check className="h-4 w-4 text-blue-600" />
                          </div>
                          <div>
                            <h5 className="font-medium">{item.title}</h5>
                            <p className="text-gray-600">{item.desc}</p>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <h4 className="text-xl font-semibold mb-6">Related Products</h4>
                <div className="grid grid-cols-4 gap-6">
                  {[
                    {
                      name: "Luxury Business Cards",
                      price: 29.99,
                      image: "https://i.etsystatic.com/35065106/r/il/a2400e/3828433899/il_fullxfull.3828433899_erbb.jpg",
                      features: "32pt Ultra-Thick Stock"
                    },
                    {
                      name: "Square Business Cards",
                      price: 24.99,
                      image: "https://weprint.ie/wp-content/uploads/Square-Business-Card.jpg",
                      features: "Modern Square Design"
                    },
                    {
                      name: "Metal Business Cards",
                      price: 49.99,
                      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCG3DLZYqXFcJD8j1iz-jscTOYsbhaah5t7g&s",
                      features: "Premium Metal Finish"
                    },
                    {
                      name: "Letterhead Design",
                      price: 34.99,
                      image: "https://outweave.com/wp-content/uploads/2021/04/DLHP7.jpg",
                      features: "Complete Branding Set"
                    }
                  ].map((product, index) => (
                    <div key={index} className="group cursor-pointer">
                      <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-100 mb-3">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform"
                        />
                      </div>
                      <h5 className="font-medium text-gray-900 group-hover:text-blue-600">{product.name}</h5>
                      <p className="text-sm text-gray-500 mb-1">{product.features}</p>
                      <p className="text-sm font-medium text-blue-600">From ${product.price}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="material-specs">
              <div className="max-w-4xl space-y-8">
                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">Material Options</h3>
                  <div className="grid gap-6">
                    {product.options?.material?.map((material) => (
                      <div key={material.name} className="border-b pb-4 last:border-0">
                        <h4 className="font-medium mb-2">{material.name}</h4>
                        <ul className="space-y-2">
                          {material.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-gray-600">
                              <Check className="h-4 w-4 text-green-500" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg border">
                  <h3 className="text-xl font-semibold mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Print Specifications</h4>
                      <dl className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <dt>Resolution:</dt>
                          <dd>300 DPI</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Color Mode:</dt>
                          <dd>CMYK</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Bleed:</dt>
                          <dd>0.125"</dd>
                        </div>
                      </dl>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Size Information</h4>
                      <dl className="space-y-2 text-gray-600">
                        <div className="flex justify-between">
                          <dt>Standard Size:</dt>
                          <dd>3.5" x 2"</dd>
                        </div>
                        <div className="flex justify-between">
                          <dt>Paper Weight:</dt>
                          <dd>300 GSM</dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="max-w-4xl">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold">Customer Reviews</h3>
                    <div className="flex items-center gap-2 mt-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current"}`} />
                        ))}
                      </div>
                      <span className="text-lg text-gray-600">
                        {product.rating} out of 5 ({product.reviews} reviews)
                      </span>
                    </div>
                  </div>
                  <Button>Write a Review</Button>
                </div>

                <div className="space-y-6">
                  {productReviews.map((review) => (
                    <div key={review.id} className="border rounded-lg p-6">
                      <div className="flex justify-between mb-4">
                        <div>
                          <h4 className="font-medium">{review.name}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex text-yellow-400">
                              {[...Array(5)].map((_, i) => (
                                <Star key={i} className={`h-4 w-4 ${i < review.rating ? "fill-current" : "stroke-current"}`} />
                              ))}
                            </div>
                            {review.verified && (
                              <span className="text-xs text-green-600 font-medium">Verified Purchase</span>
                            )}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="faq">
              <div className="max-w-4xl">
                <h3 className="text-2xl font-bold mb-8">Frequently Asked Questions</h3>
                <div className="space-y-6">
                  {faqItems.map((item, index) => (
                    <div key={index} className="border rounded-lg p-6">
                      <h4 className="font-medium text-lg mb-2">{item.question}</h4>
                      <p className="text-gray-600">{item.answer}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </div>
  )
}
