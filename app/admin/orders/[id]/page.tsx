"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Download, Send } from "lucide-react"

// Mock order data (in a real app, this would come from your API)
const getOrderDetails = (id: string) => ({
  id,
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "(555) 123-4567",
    address: "123 Main St, Anytown, USA 12345",
  },
  date: "2024-02-28",
  status: "Processing",
  paymentStatus: "Paid",
  paymentMethod: "Credit Card",
  items: [
    {
      id: 1,
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
      id: 2,
      name: "Flyers",
      quantity: 1000,
      price: 249.99,
      options: {
        size: '5" x 7"',
        paper: "100lb Gloss",
        finish: "UV Coating",
      },
    },
  ],
  subtotal: 299.98,
  shipping: 9.99,
  tax: 24.99,
  total: 334.96,
})

export default function OrderDetails({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [status, setStatus] = useState("Processing")
  const order = getOrderDetails(params.id)

  const handleStatusChange = (newStatus: string) => {
    setStatus(newStatus)
    // In a real app, you would update the status in your backend
    console.log(`Updating order ${params.id} status to ${newStatus}`)
  }

  const handleSendInvoice = () => {
    // In a real app, you would trigger an email with the invoice
    console.log(`Sending invoice for order ${params.id}`)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={() => router.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Orders
          </Button>
          <h1 className="text-3xl font-bold">Order {params.id}</h1>
        </div>
        <div className="flex space-x-4">
          <Button variant="outline" onClick={handleSendInvoice}>
            <Send className="mr-2 h-4 w-4" />
            Send Invoice
          </Button>
          <Button>
            <Download className="mr-2 h-4 w-4" />
            Download Invoice
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Order Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium">Status</span>
                <Select value={status} onValueChange={handleStatusChange}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Processing">Processing</SelectItem>
                    <SelectItem value="Confirmed">Confirmed</SelectItem>
                    <SelectItem value="Shipped">Shipped</SelectItem>
                    <SelectItem value="Delivered">Delivered</SelectItem>
                    <SelectItem value="Cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Order Date</span>
                <span>{order.date}</span>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Status</span>
                <Badge variant={order.paymentStatus === "Paid" ? "default" : "destructive"}>
                  {order.paymentStatus}
                </Badge>
              </div>
              <div className="flex justify-between">
                <span className="font-medium">Payment Method</span>
                <span>{order.paymentMethod}</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Customer Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <span className="font-medium">Name:</span> {order.customer.name}
              </div>
              <div>
                <span className="font-medium">Email:</span> {order.customer.email}
              </div>
              <div>
                <span className="font-medium">Phone:</span> {order.customer.phone}
              </div>
              <div>
                <span className="font-medium">Shipping Address:</span>
                <p className="mt-1">{order.customer.address}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
                <TableHead className="text-right">Quantity</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.items.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="font-medium">{item.name}</TableCell>
                  <TableCell>
                    {Object.entries(item.options).map(([key, value]) => (
                      <div key={key}>
                        <span className="font-medium">{key}:</span> {value}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right">{item.quantity}</TableCell>
                  <TableCell className="text-right">${item.price.toFixed(2)}</TableCell>
                  <TableCell className="text-right">${(item.quantity * item.price).toFixed(2)}</TableCell>
                </TableRow>
              ))}
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Subtotal
                </TableCell>
                <TableCell className="text-right">${order.subtotal.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Shipping
                </TableCell>
                <TableCell className="text-right">${order.shipping.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Tax
                </TableCell>
                <TableCell className="text-right">${order.tax.toFixed(2)}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={4} className="text-right font-medium">
                  Total
                </TableCell>
                <TableCell className="text-right font-bold">${order.total.toFixed(2)}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

