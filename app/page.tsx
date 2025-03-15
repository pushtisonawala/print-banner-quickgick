import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { FileCheck, Printer, Shield, ChevronRight } from "lucide-react"

const topSellers = [
  {
    id: 1,
    category: "marketing-materials",
    name: "Premium Business Cards",
    image: "https://files.printo.in/site/20230523_151919983434_436701_premium-laminated-business-card.jpg",
    price: "From $24.99",
  },
  {
    id: 2,
    name: "Glossy Flyers",
    image: "https://d1oqgwa6zn8vib.cloudfront.net/images/product/100lb_flyer_gloss.jpg",
    price: "From $29.99",
  },
  {
    id: 3,
    name: "Vinyl Banners",
    image: "https://i.etsystatic.com/30569612/r/il/14e40f/3743298026/il_fullxfull.3743298026_mt60.jpg",
    price: "From $49.99",
  },
  {
    id: 4,
    name: "Custom Stickers",
    image: "https://cdn.makestickers.com/image/makestickers/products/custom-stickers.jpg",
    price: "From $9.99",
  },
].map((product) => (
  <Card key={product.id} className="group overflow-hidden">
    <Link href={`/products/${product.id}`}>
      <div className="aspect-square relative overflow-hidden">
        <Image
          src={product.image || "/placeholder.svg"}
          alt={product.name}
          fill
          className="object-cover transition-transform group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="secondary">View Product</Button>
        </div>
      </div>
      <CardContent className="p-4">
        <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-brand font-medium">{product.price}</p>
      </CardContent>
    </Link>
  </Card>
))

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[600px] flex items-center justify-center text-white">
        <div className="absolute inset-0">
          <Image
            src="https://solutionprint.com/wp-content/uploads/2024/08/printingservices-largeformatprinting.jpg"
            alt="Professional printing services"
            fill
            className="object-cover"
            priority
          />
          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container-custom relative z-10 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 text-sky-100">Professional Printing Solutions</h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
            High-quality, custom printing for businesses of all sizes. Fast turnaround and exceptional service
            guaranteed.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="text-lg bg-white text-brand hover:bg-gray-100">
              <Link href="/products">Explore Products</Link>
            </Button>
            <Button size="lg" variant="outline" className="text-lg border-white text-gray-800 hover:bg-white/10">
              <Link href="/custom-quote" className="text-gray-800 hover:text-gray-900">
                Get Custom Quote
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Categories Section with Sidebar */}
      <section className="container-fluid px-0 py-12">
        <div className="grid grid-cols-12 gap-0">
          {/* Simplified Sidebar */}
          <div className="col-span-2 min-w-[250px] border-r border-gray-200 bg-gray-50">
            <div className="p-6">
              {/* Categories */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-800 mb-4">Shop by Category</h2>
                <nav className="space-y-2">
                  {[
                    { name: "All Products", icon: "🛍️" },
                    { name: "Business Cards", icon: "💼" },
                    { name: "Banners & Signs", icon: "🎯" },
                    { name: "Marketing Materials", icon: "📊" },
                    { name: "Labels & Stickers", icon: "🏷️" },
                    { name: "Packaging", icon: "📦" },
                    { name: "Office Supplies", icon: "📝" },
                    { name: "Large Format", icon: "🖼️" },
                  ].map((category) => (
                    <Link
                      key={category.name}
                      href={`/products/${category.name.toLowerCase().replace(/ & /g, '-').replace(/ /g, '-')}`}
                      className="flex items-center gap-3 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                    >
                      <span className="text-lg">{category.icon}</span>
                      <span>{category.name}</span>
                    </Link>
                  ))}
                </nav>
              </div>

              {/* Quick Actions */}
              <div className="mb-8 border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Quick Actions</h3>
                <nav className="space-y-1">
                  <Link
                    href="/custom-builder"
                    className="flex items-center gap-2 px-3 py-2 text-blue-600 font-medium hover:bg-white rounded-md transition-colors"
                  >
                    ✨ Custom Builder
                  </Link>
                  <Link
                    href="/templates"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                  >
                    📑 Templates
                  </Link>
                  <Link
                    href="/samples"
                    className="flex items-center gap-2 px-3 py-2 text-gray-600 hover:text-gray-900 hover:bg-white rounded-md transition-colors"
                  >
                    🎨 Sample Packs
                  </Link>
                </nav>
              </div>

              {/* Support Box */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-sm font-medium text-gray-500 mb-3">Need Help?</h3>
                <Button 
                  variant="outline"
                  className="w-full justify-start text-gray-600 hover:text-gray-900 hover:bg-white"
                >
                  <span className="mr-2">💬</span>
                  Contact Support
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="col-span-10 pl-8">
            {/* Top Sellers Section */}
            <section className="py-16 bg-white">
              <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">Top Sellers</h2>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="text-brand hover:text-brand-dark">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {topSellers}
                </div>
              </div>
            </section>

            {/* Featured Products Section */}
            <section className="py-16 bg-gray-50">
              <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">Featured Products</h2>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="text-brand hover:text-brand-dark">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: 201,
                      name: "Premium Metal Business Cards",
                      image: "https://i.etsystatic.com/35065106/r/il/788e1c/4854300468/il_570xN.4854300468_xgz2.jpg",
                      price: "From $89.99",
                      slug: "metal-cards"
                    },
                    {
                      id: 202,
                      name: "Custom Vehicle Wraps",
                      image: "https://hazken.com/assets/images/bg/Rollup-banner-small-base.jpg",
                      price: "From $499.99",
                      slug: "vehicle-wraps"
                    },
                    {
                      id: 203,
                      name: "Large Format Banners",
                      image: "https://dldzmxx3p7w78.cloudfront.net/hotcardsv10/images/opt/products_gallery_images/Custom-Printed-Campaign-Tri-Fold-Brochures-1_08164914202409.jpg.webp?v=5854",
                      price: "From $129.99",
                      slug: "large-banners"
                    },
                    {
                      id: 204,
                      name: "Illuminated Signs",
                      image: "https://res.cloudinary.com/dxivtqnri/image/upload/c_fill,f_auto,g_auto,h_480,w_720/v1704436060/2024/Labels/Product-page/Packaging-labels.jpg",
                      price: "From $299.99",
                      slug: "illuminated-signs"
                    },
                  ].map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <Link href={`/products/featured/${product.slug}`}>
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary">View Product</Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-brand font-medium">{product.price}</p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Quality Precision Experience Section */}
            <section className="py-24 bg-gradient-to-b from-gray-900 to-gray-800 text-white relative overflow-hidden">
              <div className="absolute inset-0">
                <Image
                  src="https://images.unsplash.com/photo-1597575732103-9f6d068cfa9f?q=80&w=2074&auto=format&fit=crop"
                  alt="Printing machinery background"
                  fill
                  className="object-cover opacity-10"
                />
              </div>
              <div className="container-custom relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                  <h2 className="text-4xl md:text-5xl font-light mb-6">
                    <span className="text-blue-400">Quality</span> • 
                    <span className="text-white"> Precision</span> •
                    <span className="text-blue-300"> Experience</span>
                  </h2>
                  <p className="text-lg text-gray-300 mb-8">
                    Discover how we maintain exceptional standards across every print project
                  </p>
                </div>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {/* Quality Card */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-blue-400 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Quality Control</h3>
                    <p className="text-gray-300 mb-4">33-point inspection process ensuring perfection in every print</p>
                    <Button variant="outline" className="group-hover:bg-blue-500 group-hover:text-white border-blue-400 text-blue-400">
                      Learn More
                    </Button>
                  </div>

                  {/* Precision Card */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-blue-300 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Precision Technology</h3>
                    <p className="text-gray-300 mb-4">State-of-the-art printing equipment for superior results</p>
                    <Button variant="outline" className="group-hover:bg-blue-500 group-hover:text-white border-blue-300 text-blue-300">
                      Learn More
                    </Button>
                  </div>

                  {/* Experience Card */}
                  <div className="bg-white/10 backdrop-blur-sm p-6 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                    <div className="text-blue-200 mb-4">
                      <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">Years of Experience</h3>
                    <p className="text-gray-300 mb-4">Over 15 years of expertise in professional printing</p>
                    <Button variant="outline" className="group-hover:bg-blue-500 group-hover:text-white border-blue-200 text-blue-200">
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </section>

            {/* New & Updated Products Section */}
            <section className="py-16 bg-white">
              <div className="container-custom">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-2xl md:text-3xl font-bold">New & Updated Products</h2>
                  <div className="flex gap-4">
                    <Button variant="ghost" className="text-brand hover:text-brand-dark">
                      View All
                    </Button>
                  </div>
                </div>
                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[
                    {
                      id: 101,
                      name: "Eco-Friendly Cards",
                      image: "https://i.etsystatic.com/21873794/r/il/ccb163/3669153358/il_570xN.3669153358_mb84.jpg",
                      price: "From $29.99",
                      slug: "eco-friendly-cards"
                    },
                    {
                      id: 102,
                      name: "Window Decals",
                      image: "https://cdn.squaresigns.com/images/products/slider/restaurant-clear-window-decal.jpg",
                      price: "From $19.99",
                      slug: "window-decals"
                    },
                    {
                      id: 103,
                      name: "Floor Graphics",
                      image: "https://pacificsigns.net/wp-content/uploads/2022/12/floor-graphics-prod.jpg",
                      price: "From $24.99",
                      slug: "floor-graphics"
                    },
                    {
                      id: 104,
                      name: "3D Store Signs",
                      image: "https://xindadisplay.com/wp-content/uploads/2019/09/3d-rendering-computer-retail-store-interior-design-059-5.jpg",
                      price: "From $399.99",
                      slug: "3d-signs"
                    },
                  ].map((product) => (
                    <Card key={product.id} className="group overflow-hidden">
                      <Link href={`/products/new/${product.slug}`}>
                        <div className="aspect-square relative overflow-hidden">
                          <Image
                            src={product.image || "/placeholder.svg"}
                            alt={product.name}
                            fill
                            className="object-cover transition-transform group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <Button variant="secondary">View Product</Button>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-semibold text-lg mb-2">{product.name}</h3>
                          <p className="text-brand font-medium">{product.price}</p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </section>

            {/* Features Section */}
            <section className="py-24 bg-gray-50">
              <div className="container-custom">
                <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">Quality custom printing. Guaranteed.</h2>
                <p className="text-xl text-center text-gray-600 mb-16 max-w-3xl mx-auto">
                  From business cards to large format printing, Print Banner delivers exceptional quality and service for all
                  your printing needs.
                </p>
                <div className="grid md:grid-cols-3 gap-8">
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 mx-auto mb-6 text-brand">
                        <FileCheck className="w-full h-full" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Free artwork check</h3>
                      <p className="text-gray-600">
                        Our experts review your files for printing errors at no extra cost, ensuring flawless results.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 mx-auto mb-6 text-brand">
                        <Printer className="w-full h-full" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">Extensive options</h3>
                      <p className="text-gray-600">
                        Choose from over 150 print products and 1000+ customization options to perfectly match your vision.
                      </p>
                    </CardContent>
                  </Card>
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="pt-8">
                      <div className="w-16 h-16 mx-auto mb-6 text-brand">
                        <Shield className="w-full h-full" />
                      </div>
                      <h3 className="text-xl font-bold mb-4">100% satisfaction</h3>
                      <p className="text-gray-600">
                        We guarantee the quality of our products and services. Your satisfaction is our top priority.
                      </p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-24 bg-brand text-white">
              <div className="container-custom text-center">
                <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to bring your designs to life?</h2>
                <p className="text-xl mb-8 max-w-2xl mx-auto">
                  Experience the Print Banner difference today. High-quality printing, fast turnaround, and exceptional
                  customer service await you.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" className="text-lg bg-white text-brand hover:bg-gray-100">
                    <Link href="/products">Start Your Project</Link>
                  </Button>
                  <Button size="lg" variant="outline" className="text-lg border-white text-white hover:bg-white/10">
                    <Link href="/contact" className="text-gray-800 hover:text-gray-900">
                      Get Expert Advice
                    </Link>
                  </Button>
                </div>
              </div>
            </section>
          </div>
        </div>
      </section>
    </div>
  )
}

