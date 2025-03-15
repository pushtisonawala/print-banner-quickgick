import { CategoryPage } from "@/components/CategoryPage"

const featuredProducts = [
  {
    id: 201,
    name: "Premium Metal Business Cards",
    price: "89.99",
    image: "https://i.etsystatic.com/35065106/r/il/788e1c/4854300468/il_570xN.4854300468_xgz2.jpg",
    rating: 4.9,
    reviews: 45,
    slug: "metal-cards",
    isFeatured: true
  },
  {
    id: 202,
    name: "Custom Vehicle Wraps",
    price: "499.99",
    image: "https://hazken.com/assets/images/bg/Rollup-banner-small-base.jpg",
    rating: 4.8,
    reviews: 32,
    slug: "vehicle-wraps",
    isFeatured: true
  },
  {
    id: 203,
    name: "Large Format Banners",
    price: "129.99",
    image: "https://dldzmxx3p7w78.cloudfront.net/hotcardsv10/images/opt/products_gallery_images/Custom-Printed-Campaign-Tri-Fold-Brochures-1_08164914202409.jpg.webp?v=5854",
    rating: 4.7,
    reviews: 28,
    slug: "large-banners",
    isFeatured: true
  },
  {
    id: 204,
    name: "Illuminated Signs",
    price: "299.99",
    image: "https://res.cloudinary.com/dxivtqnri/image/upload/c_fill,f_auto,g_auto,h_480,w_720/v1704436060/2024/Labels/Product-page/Packaging-labels.jpg",
    rating: 4.9,
    reviews: 37,
    slug: "illuminated-signs",
    isFeatured: true
  }
]

export default function FeaturedProductsPage() {
  return (
    <CategoryPage
      title="Featured Products"
      description="Our most popular and innovative printing solutions."
      products={featuredProducts}
      category="featured"
    />
  )
}
