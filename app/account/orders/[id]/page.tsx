"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Download } from "lucide-react"

// Mock order data (in a real app, this would come from your backend)
const orderDetails = {
  id: "ORD-2024-001",
  date: "2024-01-15",
  total: 149.99,
  status: "Delivered",
  shipping: {
    method: "Standard Shipping",
    address: "123 Business St, Los Angeles, CA 90001",
    tracking: "1Z999AA1234567890",
  },
  items: [
    {
      name: "Business Cards",
      quantity: 500,
      price: 49.99,
      options: {
        size: '3.5" x 2"',
        paper: "Premium 16pt",
        finish: "Matte",
      },
    },
    {
      name: "Flyers",
      quantity: 1000,
      price: 99.99,
      options: {
        size: '5" x 7"',
        paper: "100lb Gloss",
        finish: "UV Coating",
      },
    },
  ],
}

export default function OrderDetailsPage() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-6">
        <Button variant="ghost" asChild className="mb-4">
          <Link href="/account/orders">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Link>
        </Button>
      </div>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Details - {orderDetails.id}</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Order Information</h3>
                <p>Date: {new Date(orderDetails.date).toLocaleDateString()}</p>
                <p>
                  Status: <Badge>{orderDetails.status}</Badge>
                </p>
                <p>Total: ${orderDetails.total.toFixed(2)}</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Shipping Information</h3>
                <p>Method: {orderDetails.shipping.method}</p>
                <p>Address: {orderDetails.shipping.address}</p>
                <p>Tracking: {orderDetails.shipping.tracking}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Items</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Product</TableHead>
                  <TableHead>Options</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {orderDetails.items.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{item.name}</TableCell>
                    <TableCell>
                      {Object.entries(item.options).map(([key, value]) => (
                        <div key={key}>
                          <span className="font-medium">{key}:</span> {value}
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>${item.price.toFixed(2)}</TableCell>
                    <TableCell>
                      <Button size="sm" variant="outline">
                        <Download className="mr-2 h-4 w-4" />
                        Download Files
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Order Actions</CardTitle>
          </CardHeader>
          <CardContent className="flex gap-4">
            <Button>Reorder</Button>
            <Button variant="outline">
              <Download className="mr-2 h-4 w-4" />
              Download Invoice
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

