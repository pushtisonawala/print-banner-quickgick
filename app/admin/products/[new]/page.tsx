"use client"

import { TableCell } from "@/components/ui/table"

import { TableBody } from "@/components/ui/table"

import { TableHead } from "@/components/ui/table"

import { TableRow } from "@/components/ui/table"

import { TableHeader } from "@/components/ui/table"

import { Table } from "@/components/ui/table"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus, Minus, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductVariant {
  id: number
  size?: string
  color?: string
  material?: string
  price: string
  stock: string
}

interface ProductOption {
  name: string
  values: string[]
}

export default function AddProduct() {
  const router = useRouter()
  const [product, setProduct] = useState({
    name: "",
    category: "",
    description: "",
    shortDescription: "",
    sku: "",
    basePrice: "",
    salePrice: "",
    cost: "",
    weight: "",
    dimensions: {
      length: "",
      width: "",
      height: "",
    },
    hasVariants: false,
    options: [] as ProductOption[],
    variants: [] as ProductVariant[],
    seo: {
      title: "",
      description: "",
      keywords: "",
    },
    discount: {
      enabled: false,
      type: "percentage",
      value: "",
      startDate: "",
      endDate: "",
    },
    inventory: {
      sku: "",
      barcode: "",
      stockLevel: "",
      lowStockAlert: "",
    },
    shipping: {
      requiresShipping: true,
      freeShipping: false,
      shippingWeight: "",
    },
  })

  const handleBasicInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleAddOption = () => {
    setProduct((prev) => ({
      ...prev,
      options: [...prev.options, { name: "", values: [] }],
    }))
  }

  const handleRemoveOption = (index: number) => {
    setProduct((prev) => ({
      ...prev,
      options: prev.options.filter((_, i) => i !== index),
    }))
  }

  const handleAddVariant = () => {
    setProduct((prev) => ({
      ...prev,
      variants: [...prev.variants, { id: Date.now(), price: "", stock: "" }],
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("New product:", product)
    router.push("/admin/products")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Product</h1>
        <Button variant="outline" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>

      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic" className="space-y-4">
          <TabsList>
            <TabsTrigger value="basic">Basic Information</TabsTrigger>
            <TabsTrigger value="variants">Variants & Options</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="seo">SEO</TabsTrigger>
          </TabsList>

          <TabsContent value="basic">
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Enter the basic details of your product.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Product Name</Label>
                    <Input id="name" name="name" value={product.name} onChange={handleBasicInfoChange} required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="category">Category</Label>
                    <Select
                      value={product.category}
                      onValueChange={(value) => setProduct((prev) => ({ ...prev, category: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="marketing-materials">Marketing Materials</SelectItem>
                        <SelectItem value="signs-banners">Signs & Banners</SelectItem>
                        <SelectItem value="stickers-labels">Stickers & Labels</SelectItem>
                        <SelectItem value="packaging">Packaging</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="shortDescription">Short Description</Label>
                  <Textarea
                    id="shortDescription"
                    name="shortDescription"
                    value={product.shortDescription}
                    onChange={handleBasicInfoChange}
                    rows={2}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Full Description</Label>
                  <Textarea
                    id="description"
                    name="description"
                    value={product.description}
                    onChange={handleBasicInfoChange}
                    rows={4}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Product Images</Label>
                  <div className="border-2 border-dashed rounded-lg p-8 text-center">
                    <Upload className="mx-auto h-12 w-12 text-gray-400" />
                    <div className="mt-4">
                      <Button type="button" variant="outline">
                        Upload Images
                      </Button>
                    </div>
                    <p className="mt-2 text-sm text-gray-500">or drag and drop</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="variants">
            <Card>
              <CardHeader>
                <CardTitle>Variants & Options</CardTitle>
                <CardDescription>Configure product variants and options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={product.hasVariants}
                    onCheckedChange={(checked) => setProduct((prev) => ({ ...prev, hasVariants: checked }))}
                  />
                  <Label>This product has multiple variants</Label>
                </div>

                {product.hasVariants && (
                  <>
                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Options</h3>
                        <Button type="button" onClick={handleAddOption} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Option
                        </Button>
                      </div>
                      {product.options.map((option, index) => (
                        <div key={index} className="flex gap-4 items-start">
                          <div className="flex-1 space-y-2">
                            <Label>Option Name</Label>
                            <Input
                              value={option.name}
                              onChange={(e) => {
                                const newOptions = [...product.options]
                                newOptions[index].name = e.target.value
                                setProduct((prev) => ({ ...prev, options: newOptions }))
                              }}
                              placeholder="e.g., Size, Color, Material"
                            />
                          </div>
                          <div className="flex-1 space-y-2">
                            <Label>Values (comma-separated)</Label>
                            <Input
                              value={option.values.join(", ")}
                              onChange={(e) => {
                                const newOptions = [...product.options]
                                newOptions[index].values = e.target.value.split(",").map((v) => v.trim())
                                setProduct((prev) => ({ ...prev, options: newOptions }))
                              }}
                              placeholder="e.g., Small, Medium, Large"
                            />
                          </div>
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="mt-8"
                            onClick={() => handleRemoveOption(index)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center">
                        <h3 className="text-lg font-medium">Variants</h3>
                        <Button type="button" onClick={handleAddVariant} variant="outline" size="sm">
                          <Plus className="h-4 w-4 mr-2" />
                          Add Variant
                        </Button>
                      </div>
                      <div className="border rounded-lg">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              {product.options.map((option) => (
                                <TableHead key={option.name}>{option.name}</TableHead>
                              ))}
                              <TableHead>Price</TableHead>
                              <TableHead>Stock</TableHead>
                              <TableHead></TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {product.variants.map((variant, index) => (
                              <TableRow key={variant.id}>
                                {product.options.map((option) => (
                                  <TableCell key={option.name}>
                                    <Select>
                                      <SelectTrigger>
                                        <SelectValue placeholder={`Select ${option.name}`} />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {option.values.map((value) => (
                                          <SelectItem key={value} value={value}>
                                            {value}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </TableCell>
                                ))}
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={variant.price}
                                    onChange={(e) => {
                                      const newVariants = [...product.variants]
                                      newVariants[index].price = e.target.value
                                      setProduct((prev) => ({ ...prev, variants: newVariants }))
                                    }}
                                    placeholder="0.00"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Input
                                    type="number"
                                    value={variant.stock}
                                    onChange={(e) => {
                                      const newVariants = [...product.variants]
                                      newVariants[index].stock = e.target.value
                                      setProduct((prev) => ({ ...prev, variants: newVariants }))
                                    }}
                                    placeholder="0"
                                  />
                                </TableCell>
                                <TableCell>
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => {
                                      setProduct((prev) => ({
                                        ...prev,
                                        variants: prev.variants.filter((v) => v.id !== variant.id),
                                      }))
                                    }}
                                  >
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pricing">
            <Card>
              <CardHeader>
                <CardTitle>Pricing & Inventory</CardTitle>
                <CardDescription>Set up pricing and inventory management.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="basePrice">Base Price</Label>
                    <Input
                      id="basePrice"
                      name="basePrice"
                      type="number"
                      value={product.basePrice}
                      onChange={handleBasicInfoChange}
                      placeholder="0.00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cost">Cost per item</Label>
                    <Input
                      id="cost"
                      name="cost"
                      type="number"
                      value={product.cost}
                      onChange={handleBasicInfoChange}
                      placeholder="0.00"
                    />
                  </div>
                </div>

                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Discount</CardTitle>
                      <Switch
                        checked={product.discount.enabled}
                        onCheckedChange={(checked) =>
                          setProduct((prev) => ({
                            ...prev,
                            discount: { ...prev.discount, enabled: checked },
                          }))
                        }
                      />
                    </div>
                  </CardHeader>
                  {product.discount.enabled && (
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Discount Type</Label>
                          <Select
                            value={product.discount.type}
                            onValueChange={(value) =>
                              setProduct((prev) => ({
                                ...prev,
                                discount: { ...prev.discount, type: value },
                              }))
                            }
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="percentage">Percentage</SelectItem>
                              <SelectItem value="fixed">Fixed Amount</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="space-y-2">
                          <Label>Discount Value</Label>
                          <Input
                            type="number"
                            value={product.discount.value}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                discount: { ...prev.discount, value: e.target.value },
                              }))
                            }
                            placeholder={product.discount.type === "percentage" ? "10" : "5.99"}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Input
                            type="date"
                            value={product.discount.startDate}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                discount: { ...prev.discount, startDate: e.target.value },
                              }))
                            }
                          />
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Input
                            type="date"
                            value={product.discount.endDate}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                discount: { ...prev.discount, endDate: e.target.value },
                              }))
                            }
                          />
                        </div>
                      </div>
                    </CardContent>
                  )}
                </Card>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="sku">SKU</Label>
                    <Input
                      id="sku"
                      value={product.inventory.sku}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          inventory: { ...prev.inventory, sku: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="barcode">Barcode</Label>
                    <Input
                      id="barcode"
                      value={product.inventory.barcode}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          inventory: { ...prev.inventory, barcode: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stockLevel">Stock Level</Label>
                    <Input
                      id="stockLevel"
                      type="number"
                      value={product.inventory.stockLevel}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          inventory: { ...prev.inventory, stockLevel: e.target.value },
                        }))
                      }
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lowStockAlert">Low Stock Alert</Label>
                    <Input
                      id="lowStockAlert"
                      type="number"
                      value={product.inventory.lowStockAlert}
                      onChange={(e) =>
                        setProduct((prev) => ({
                          ...prev,
                          inventory: { ...prev.inventory, lowStockAlert: e.target.value },
                        }))
                      }
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="shipping">
            <Card>
              <CardHeader>
                <CardTitle>Shipping</CardTitle>
                <CardDescription>Configure shipping options.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center space-x-2">
                  <Switch
                    checked={product.shipping.requiresShipping}
                    onCheckedChange={(checked) =>
                      setProduct((prev) => ({
                        ...prev,
                        shipping: { ...prev.shipping, requiresShipping: checked },
                      }))
                    }
                  />
                  <Label>This is a physical product</Label>
                </div>

                {product.shipping.requiresShipping && (
                  <>
                    <div className="flex items-center space-x-2">
                      <Switch
                        checked={product.shipping.freeShipping}
                        onCheckedChange={(checked) =>
                          setProduct((prev) => ({
                            ...prev,
                            shipping: { ...prev.shipping, freeShipping: checked },
                          }))
                        }
                      />
                      <Label>Free shipping</Label>
                    </div>

                    <div className="grid grid-cols-3 gap-4">
                      <div className="space-y-2">
                        <Label>Weight (lbs)</Label>
                        <Input
                          type="number"
                          value={product.shipping.shippingWeight}
                          onChange={(e) =>
                            setProduct((prev) => ({
                              ...prev,
                              shipping: { ...prev.shipping, shippingWeight: e.target.value },
                            }))
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Dimensions (inches)</Label>
                        <div className="grid grid-cols-3 gap-2">
                          <Input
                            type="number"
                            value={product.dimensions.length}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                dimensions: { ...prev.dimensions, length: e.target.value },
                              }))
                            }
                            placeholder="L"
                          />
                          <Input
                            type="number"
                            value={product.dimensions.width}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                dimensions: { ...prev.dimensions, width: e.target.value },
                              }))
                            }
                            placeholder="W"
                          />
                          <Input
                            type="number"
                            value={product.dimensions.height}
                            onChange={(e) =>
                              setProduct((prev) => ({
                                ...prev,
                                dimensions: { ...prev.dimensions, height: e.target.value },
                              }))
                            }
                            placeholder="H"
                          />
                        </div>
                      </div>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="seo">
            <Card>
              <CardHeader>
                <CardTitle>SEO Settings</CardTitle>
                <CardDescription>Optimize your product for search engines.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="seoTitle">SEO Title</Label>
                  <Input
                    id="seoTitle"
                    value={product.seo.title}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, title: e.target.value },
                      }))
                    }
                    placeholder="SEO optimized title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoDescription">Meta Description</Label>
                  <Textarea
                    id="seoDescription"
                    value={product.seo.description}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, description: e.target.value },
                      }))
                    }
                    placeholder="Brief description for search engines"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="seoKeywords">Keywords</Label>
                  <Input
                    id="seoKeywords"
                    value={product.seo.keywords}
                    onChange={(e) =>
                      setProduct((prev) => ({
                        ...prev,
                        seo: { ...prev.seo, keywords: e.target.value },
                      }))
                    }
                    placeholder="Comma-separated keywords"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end space-x-4 mt-6">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button type="submit">Create Product</Button>
        </div>
      </form>
    </div>
  )
}

