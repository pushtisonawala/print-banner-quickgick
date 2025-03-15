"use client"

import Link from "next/link"
import { ChevronDown, ShoppingCart } from "lucide-react"
import { useAuth } from "@/contexts/AuthContext"
import { SearchBar } from "@/components/SearchBar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"

const categories = [
  {
    name: "Marketing Materials",
    subcategories: ["Business Cards", "Flyers", "Brochures", "Postcards", "Presentation Folders"],
  },
  {
    name: "Stickers & Labels",
    subcategories: ["Custom Stickers", "Product Labels", "Roll Labels", "Cut-to-Size Labels", "Warning Labels"],
  },
  {
    name: "Boxes & Packaging",
    subcategories: ["Custom Boxes", "Mailer Boxes", "Product Boxes", "Gift Boxes", "Food Packaging"],
  },
  {
    name: "Signs & Banners",
    subcategories: ["Vinyl Banners", "Roll-Up Banners", "Outdoor Signs", "Window Graphics", "Trade Show Displays"],
  },
  {
    name: "Apparel & Promo",
    subcategories: ["Custom T-Shirts", "Business Apparel", "Promotional Items", "Embroidered Apparel", "Team Uniforms"],
  },
]

export function Header() {
  const { user } = useAuth()
  const { totalItems } = useCart()

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-[#0a192f] via-[#1e4756] to-[#1b4332] text-white">
        <div className="container mx-auto py-2 text-center text-sm font-medium">
          High Quality | On Time Delivery | Everyday Fair Prices
        </div>
      </div>

      {/* Main Header */}
      <div className="border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
        <div className="container mx-auto py-4">
          <div className="flex items-center justify-between gap-4">
            {/* Logo and Contact */}
            <div className="flex items-center gap-6">
              <Link href="/" className="text-2xl font-bold text-brand hover:text-brand-dark transition-colors">
                Print Banner
              </Link>
              <Link href="tel:888.888.4211" className="hidden lg:block">
                <div className="text-blue-600 font-bold hover:text-blue-700 transition-colors">888.888.4211</div>
                <div className="text-sm text-gray-600">Quality Customer Service</div>
              </Link>
            </div>

            {/* Search Bar */}
            <div className="flex-1 max-w-xl">
              <SearchBar />
            </div>

            {/* Account and Cart */}
            <div className="flex items-center gap-4">
              <div className="text-right">
                <div className="text-sm font-medium">
                  {user ? (
                    <Link href="/account" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Hi, {user.email.split("@")[0]}!
                    </Link>
                  ) : (
                    <Link href="/login" className="text-blue-600 hover:text-blue-700 transition-colors">
                      Hi, Log In!
                    </Link>
                  )}
                </div>
                <Link href={user ? "/account" : "/login"} className="text-sm text-gray-600 hover:text-gray-800 transition-colors">
                  Your Account
                </Link>
              </div>
              <Link href="/cart" className="relative">
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {totalItems > 0 && (
                    <span className="absolute -top-1 -right-1 bg-brand text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {totalItems}
                    </span>
                  )}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation with updated dropdown styles */}
      <nav className="border-b bg-gray-50">
        <div className="container mx-auto">
          <ul className="flex items-center gap-2 py-1">
            <li>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 px-5 py-3 text-gray-700 hover:text-blue-600 hover:bg-blue-50/50"
                  >
                    View All Products
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gradient-to-b from-blue-50 to-white border-blue-100">
                  {categories.map((category) => (
                    <DropdownMenu key={category.name}>
                      <DropdownMenuTrigger className="w-full px-4 py-2 text-sm hover:bg-blue-50/80 flex items-center justify-between">
                        {category.name}
                        <ChevronDown className="h-4 w-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent side="right" className="w-56 bg-gradient-to-b from-blue-50 to-white border-blue-100">
                        {category.subcategories.map((subcategory) => (
                          <DropdownMenuItem key={subcategory} asChild>
                            <Link
                              href={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}/${subcategory.toLowerCase().replace(/\s+/g, "-")}`}
                              className="w-full hover:bg-blue-50/80"
                            >
                              {subcategory}
                            </Link>
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </li>
            {/* Main navigation links */}
            {categories.map((category) => (
              <li key={category.name}>
                <Link
                  href={`/products/${category.name.toLowerCase().replace(/\s+/g, "-")}`}
                  className="block px-5 py-3 text-gray-700 hover:text-blue-600 hover:bg-white/80 transition-colors font-medium"
                >
                  {category.name}
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/featured-collections"
                className="block px-5 py-3 text-gray-700 hover:text-blue-600 hover:bg-white/80 transition-colors font-medium"
              >
                Featured Collections
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

