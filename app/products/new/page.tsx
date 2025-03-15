import { CategoryPage } from "@/components/CategoryPage"

const newProducts = [
  {
    id: 101,
    name: "Eco-Friendly Business Cards",
    price: "29.99",
    image: "https://i.etsystatic.com/21873794/r/il/ccb163/3669153358/il_570xN.3669153358_mb84.jpg",
    rating: 5.0,
    reviews: 12,
    slug: "eco-friendly-cards",
    isNew: true
  },
  {
    id: 102,
    name: "Window Decals",
    price: "19.99",
    image: "https://cdn.squaresigns.com/images/products/slider/restaurant-clear-window-decal.jpg",
    rating: 4.8,
    reviews: 8,
    slug: "window-decals",
    isNew: true
  },
  {
    id: 103,
    name: "Floor Graphics",
    price: "24.99",
    image: "https://pacificsigns.net/wp-content/uploads/2022/12/floor-graphics-prod.jpg",
    rating: 4.9,
    reviews: 15,
    slug: "floor-graphics",
    isNew: true
  },
  {
    id: 104,
    name: "3D Store Signs",
    price: "399.99",
    image: "https://xindadisplay.com/wp-content/uploads/2019/09/3d-rendering-computer-retail-store-interior-design-059-5.jpg",
    rating: 5.0,
    reviews: 6,
    slug: "3d-signs",
    isNew: true
  }
]

export default function NewProductsPage() {
  return (
    <CategoryPage
      title="New Arrivals"
      description="Check out our latest products and innovations in printing technology."
      products={newProducts}
      category="new"
    />
  )
}
