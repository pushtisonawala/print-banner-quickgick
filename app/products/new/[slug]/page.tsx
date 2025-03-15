import { ProductDetails } from "@/components/ProductDetails"
import { notFound } from "next/navigation"

const newProducts = {
  "eco-friendly-cards": {
    id: 101,
    name: "Eco-Friendly Business Cards",
    price: "29.99",
    image: "https://i.etsystatic.com/21873794/r/il/ccb163/3669153358/il_570xN.3669153358_mb84.jpg",
    rating: 5.0,
    reviews: 12,
    description: "Sustainable business cards made from 100% recycled materials. Make a great impression while being environmentally conscious.",
    features: [
      "100% recycled materials",
      "Biodegradable",
      "Premium finish",
      "Multiple paper options",
      "Eco-friendly inks"
    ]
  },
  "window-decals": {
    id: 102,
    name: "Window Decals",
    price: "19.99",
    image: "https://cdn.squaresigns.com/images/products/slider/restaurant-clear-window-decal.jpg",
    rating: 4.8,
    reviews: 8,
    description: "High-quality window decals perfect for storefronts and office windows. Easy to apply and remove.",
    features: [
      "Crystal clear vinyl",
      "Weather resistant",
      "Easy application",
      "Custom sizes",
      "Removable adhesive"
    ]
  },
  "floor-graphics": {
    id: 103,
    name: "Floor Graphics",
    price: "24.99",
    image: "https://pacificsigns.net/wp-content/uploads/2022/12/floor-graphics-prod.jpg",
    rating: 4.9,
    reviews: 15,
    description: "Durable floor graphics for indoor and outdoor use. Perfect for directional signage and promotional messaging.",
    features: [
      "Anti-slip coating",
      "Heavy-duty material",
      "Indoor/outdoor use",
      "Easy installation",
      "Scuff resistant"
    ]
  },
  "3d-signs": {
    id: 104,
    name: "3D Store Signs",
    price: "399.99",
    image: "https://xindadisplay.com/wp-content/uploads/2019/09/3d-rendering-computer-retail-store-interior-design-059-5.jpg",
    rating: 5.0,
    reviews: 6,
    description: "Eye-catching 3D signage that makes your business stand out. Premium materials and professional installation available.",
    features: [
      "3D construction",
      "LED backlight option",
      "Weather resistant",
      "Custom designs",
      "Professional mounting"
    ]
  }
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = newProducts[params.slug as keyof typeof newProducts]
  
  if (!product) {
    notFound()
  }

  return <ProductDetails product={product} />
}
