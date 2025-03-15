"use client"

import * as React from "react"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Star, ThumbsUp, ThumbsDown, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"
import { useWishlist } from "@/contexts/WishlistContext"
import { Textarea } from "@/components/ui/textarea"
import { StructuredData } from "@/components/StructuredData"
import { SocialShare } from "@/components/SocialShare"

// Add type for product details
type ProductDetails = {
  id: number
  name: string
  description: string
  price: string
  images: string[]
  rating: number
  reviews: Array<{
    id: number
    user: string
    rating: number
    comment: string
  }>
  options: {
    paperType: string[]
    size: string[]
    finish: string[]
    quantity: string[]
  }
  features: string[]
}

type ProductDetailsMap = {
  [key: string]: {
    [key: number]: ProductDetails
  }
}

const productDetails: ProductDetailsMap = {
  "business-cards": {
    1: {
      id: 1,
      name: "Standard Business Cards",
      description:
        "Make a lasting impression with our standard business cards. Printed on high-quality paper stock with sharp, vivid colors.",
      price: "19.99",
      images: [
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
        "/placeholder.svg?height=600&width=600",
      ],
      rating: 4.8,
      reviews: [
        { id: 1, user: "John D.", rating: 5, comment: "Great quality cards, very impressed!" },
        { id: 2, user: "Sarah M.", rating: 4, comment: "Good value for money, will order again." },
      ],
      options: {
        paperType: ["Standard 14pt", "Premium 16pt Matte", "Recycled Matte", "Linen Texture"],
        size: ['2" x 3.5" (Standard)', '2" x 3.5" Square', '2.5" x 2.5" Circle'],
        finish: ["Matte", "Glossy", "Silk", "Spot UV"],
        quantity: ["50", "100", "250", "500", "1000", "2500"],
      },
      features: [
        "Full-color printing on both sides",
        'Available in standard size (3.5" x 2")',
        "Choose from various paper stocks",
        "Matte or glossy finish options",
        "Fast turnaround times available",
      ],
    },
  },
}

export default function ProductPage({ params }: { params: Promise<{ category: string; slug: string }> }) {
  const resolvedParams = React.use(params)
  const { addToCart } = useCart()
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const [mainImage, setMainImage] = useState("")
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const [calculatedPrice, setCalculatedPrice] = useState(0)
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" })

  useEffect(() => {
    const product = productDetails[resolvedParams.category]?.[resolvedParams.slug]
    if (!product) {
      notFound()
      return
    }
    setMainImage(product.images[0])
    setCalculatedPrice(Number(product.price))

    // Initialize selectedOptions with default values
    const initialOptions: Record<string, string> = {}
    Object.entries(product.options).forEach(([key, values]) => {
      initialOptions[key] = (values as string[])[0]
    })
    setSelectedOptions(initialOptions)
  }, [resolvedParams.category, resolvedParams.slug])

  useEffect(() => {
    // Update price based on options (simplified - in real app would have more complex logic)
    const product = productDetails[resolvedParams.category]?.[resolvedParams.slug]
    if (!product) return
    let newPrice = Number(product.price)

    // Example price adjustments based on options
    Object.entries(selectedOptions).forEach(([option, value]) => {
      if (option === "paperType" && value.includes("Premium")) {
        newPrice += 5
      }
      if (option === "finish" && value === "Spot UV") {
        newPrice += 8
      }
      if (option === "size" && value.includes("Custom")) {
        newPrice += 10
      }
    })
    setCalculatedPrice(newPrice)
  }, [selectedOptions, resolvedParams.category, resolvedParams.slug])

  const handleOptionChange = (option: string, value: string) => {
    setSelectedOptions((prev) => ({
      ...prev,
      [option]: value,
    }))
  }

  const handleAddToCart = () => {
    const product = productDetails[resolvedParams.category]?.[resolvedParams.slug]
    if (!product) return

    addToCart({
      id: product.id,
      name: product.name,
      price: calculatedPrice,
      quantity: quantity,
      image: product.images[0],
      options: selectedOptions,
    })
    alert(`${quantity} x ${product.name} has been added to your cart.`)
  }

  const toggleWishlist = () => {
    const product = productDetails[resolvedParams.category]?.[resolvedParams.slug]
    if (!product) return

    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id)
      alert("Item removed from wishlist")
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: calculatedPrice,
        image: product.images[0],
      })
      alert("Item added to wishlist")
    }
  }

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real app, you would send this to your backend
    console.log("New review:", newReview)
    alert("Thank you for your feedback!")
    setNewReview({ rating: 5, comment: "" })
  }

  const product = productDetails[resolvedParams.category]?.[resolvedParams.slug]

  if (!product) {
    return notFound()
  }

  const structuredData = {
    "@context": "https://schema.org/",
    "@type": "Product",
    name: product.name,
    image: product.images[0],
    description: product.description,
    sku: `PROD-${product.id}`,
    mpn: `MPN-${product.id}`,
    brand: {
      "@type": "Brand",
      name: "Print Banner",
    },
    offers: {
      "@type": "Offer",
      url: `https://www.printbanner.com/products/${resolvedParams.category}/${resolvedParams.slug}`,
      priceCurrency: "USD",
      price: calculatedPrice,
      priceValidUntil: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0],
      availability: "https://schema.org/InStock",
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: product.rating,
      reviewCount: product.reviews.length,
    },
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <StructuredData data={structuredData} />
      
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-8">
        <Link href="/" className="hover:text-brand">Home</Link>
        <span>/</span>
        <Link href="/products" className="hover:text-brand">Products</Link>
        <span>/</span>
        <Link href={`/products/${resolvedParams.category}`} className="hover:text-brand">
          {resolvedParams.category.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </Link>
        <span>/</span>
        <span className="text-gray-900">{product.name}</span>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 py-6">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="aspect-square relative rounded-lg overflow-hidden">
            <Image src={mainImage || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
          </div>
          <div className="flex space-x-4">
            {product.images.map((image: string, index: number) => (
              <button
                key={index}
                onClick={() => setMainImage(image)}
                className={`aspect-square relative w-1/4 rounded-lg overflow-hidden ${
                  mainImage === image ? "ring-2 ring-brand" : ""
                }`}
              >
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${product.name} view ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{product.name}</h1>

          <div className="flex items-center mb-4">
            <div className="flex text-yellow-400 mr-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${i < Math.floor(product.rating) ? "fill-current" : "stroke-current fill-none"}`}
                />
              ))}
            </div>
            <span className="text-gray-600">
              {product.rating} ({product.reviews.length} reviews)
            </span>
          </div>

          <p className="text-2xl font-bold text-gray-900 mb-4">${calculatedPrice.toFixed(2)}</p>

          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="space-y-6 mb-6">
            {Object.entries(product.options).map(([optionName, values]) => (
              <div key={optionName}>
                <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">{optionName}</label>
                <Select
                  value={selectedOptions[optionName]}
                  onValueChange={(value) => handleOptionChange(optionName, value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder={`Select ${optionName}`} />
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
          </div>

          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
            <div className="flex items-center border rounded-md w-32">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 py-2 text-gray-600 hover:text-brand"
              >
                -
              </button>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value) || 1)}
                className="w-full text-center border-none focus:ring-0"
              />
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 py-2 text-gray-600 hover:text-brand"
              >
                +
              </button>
            </div>
          </div>

          <div className="flex items-center space-x-4 mb-6">
            <Button size="lg" className="w-full md:w-auto" onClick={handleAddToCart}>
              Add to Cart
            </Button>
            <Button size="lg" variant="outline" className="w-full md:w-auto" onClick={toggleWishlist}>
              <Heart className={`mr-2 h-4 w-4 ${isInWishlist(product.id) ? "fill-current" : ""}`} />
              {isInWishlist(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}
            </Button>
          </div>

          <Link href={`/products/customize/${product.slug}`} className="text-brand hover:underline">
            Customize this product
          </Link>

          <h2 className="text-xl font-semibold mt-8 mb-2">Features:</h2>
          <ul className="list-disc pl-5 mb-6">
            {product.features.map((feature: string, index: number) => (
              <li key={index} className="text-gray-700">
                {feature}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Share this product</h2>
        <SocialShare
          url={`https://www.printbanner.com/products/${resolvedParams.category}/${resolvedParams.slug}`}
          title={`Check out ${product.name} on Print Banner`}
        />
      </div>

      <div className="mt-12">
        <Tabs defaultValue="reviews">
          <TabsList className="w-full border-b justify-start">
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="specifications">Specifications</TabsTrigger>
          </TabsList>
          <TabsContent value="reviews" className="py-6">
            <div className="space-y-6">
              {product.reviews.map((review: { id: number, user: string, rating: number, comment: string }) => (
                <Card key={review.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold">{review.user}</h4>
                        <div className="flex text-yellow-400 mb-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${i < review.rating ? "fill-current" : "stroke-current fill-none"}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          <ThumbsUp className="h-4 w-4 mr-1" /> Helpful
                        </Button>
                        <Button variant="outline" size="sm">
                          <ThumbsDown className="h-4 w-4 mr-1" /> Not Helpful
                        </Button>
                      </div>
                    </div>
                    <p>{review.comment}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <form onSubmit={handleReviewSubmit} className="mt-8">
              <h3 className="text-xl font-bold mb-4">Write a Review</h3>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                <Select
                  value={newReview.rating.toString()}
                  onValueChange={(value) => setNewReview({ ...newReview, rating: Number(value) })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select a rating" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((rating) => (
                      <SelectItem key={rating} value={rating.toString()}>
                        {rating} Star{rating !== 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
                  Your Review
                </label>
                <Textarea
                  id="comment"
                  value={newReview.comment}
                  onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                  rows={4}
                  placeholder="Write your review here..."
                />
              </div>
              <Button type="submit">Submit Review</Button>
            </form>
          </TabsContent>
          <TabsContent value="specifications" className="py-6">
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold mb-4">Technical Specifications</h3>
                <div className="border rounded-lg overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <tbody className="divide-y divide-gray-200">
                      {Object.entries(product.options).map(([key, values]) => (
                        <tr key={key}>
                          <td className="px-6 py-4 whitespace-nowrap bg-gray-50 text-sm font-medium text-gray-900 capitalize">
                            {key}
                          </td>
                          <td className="px-6 py-4 whitespace-pre-wrap text-sm text-gray-700">
                            {(values as string[]).join(", ")}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Product suggestions */}
      <div className="mt-16">
        <h2 className="section-heading">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
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
          ].map((relatedProduct) => (
            <Card key={relatedProduct.id} className="product-card">
              <Link href={`/products/${resolvedParams.category}/${relatedProduct.slug}`}>
                <div className="aspect-square relative">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </Link>
              <CardContent className="p-4">
                <Link href={`/products/${resolvedParams.category}/${relatedProduct.slug}`}>
                  <h3 className="font-medium text-lg mb-1">{relatedProduct.name}</h3>
                </Link>
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-400 mr-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(relatedProduct.rating) ? "fill-current" : "stroke-current fill-none"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">
                    {relatedProduct.rating} ({relatedProduct.reviews})
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <p className="font-bold text-gray-900">Starting at ${relatedProduct.price}</p>
                  <Button size="sm" asChild>
                    <Link href={`/products/${resolvedParams.category}/${relatedProduct.slug}`}>View</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}