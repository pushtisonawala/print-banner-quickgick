import { ProductDetails } from "@/components/ProductDetails"
import { notFound } from "next/navigation"

const featuredProducts = {
  "metal-cards": {
    id: 201,
    name: "Premium Metal Business Cards",
    price: "89.99",
    image: "https://i.etsystatic.com/35065106/r/il/788e1c/4854300468/il_570xN.4854300468_xgz2.jpg",
    rating: 4.9,
    reviews: 45,
    description: "Make a lasting impression with our premium metal business cards. These cards are made from high-quality stainless steel with precision laser etching.",
    features: [
      "Stainless steel construction",
      "Laser etched details",
      "Custom finishes available",
      "Thickness: 0.5mm",
      "Standard size: 3.5\" x 2\""
    ]
  },
  "vehicle-wraps": {
    id: 202,
    name: "Custom Vehicle Wraps",
    price: "499.99",
    image: "https://hazken.com/assets/images/bg/Rollup-banner-small-base.jpg",
    rating: 4.8,
    reviews: 32,
    description: "Transform your vehicle into a moving billboard with our premium vehicle wraps. High-quality vinyl with professional installation.",
    features: [
      "Premium vinyl material",
      "UV resistant",
      "Professional installation",
      "Custom design service",
      "3-5 year durability"
    ]
  },
  "large-banners": {
    id: 203,
    name: "Large Format Banners",
    price: "129.99",
    image: "https://dldzmxx3p7w78.cloudfront.net/hotcardsv10/images/opt/products_gallery_images/Custom-Printed-Campaign-Tri-Fold-Brochures-1_08164914202409.jpg.webp?v=5854",
    rating: 4.7,
    reviews: 28,
    description: "High-impact large format banners perfect for events, promotions, and outdoor advertising. Weather-resistant materials.",
    features: [
      "Heavy-duty vinyl",
      "Weatherproof",
      "Reinforced edges",
      "Multiple size options",
      "Indoor/outdoor use"
    ]
  },
  "illuminated-signs": {
    id: 204,
    name: "Illuminated Signs",
    price: "299.99",
    image: "https://res.cloudinary.com/dxivtqnri/image/upload/c_fill,f_auto,g_auto,h_480,w_720/v1704436060/2024/Labels/Product-page/Packaging-labels.jpg",
    rating: 4.9,
    reviews: 37,
    description: "Eye-catching illuminated signs for businesses. Energy-efficient LED lighting with custom designs.",
    features: [
      "LED lighting",
      "Energy efficient",
      "Weather resistant",
      "Custom sizes",
      "Professional installation"
    ]
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = featuredProducts[params.slug as keyof typeof featuredProducts]
  
  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}
