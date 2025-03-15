"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"

// Mock order data (in a real app, this would come from your backend)
const orders = [
  {
    id: "ORD-2024-001",
    date: "2024-01-15",
    total: 149.99,
    status: "Delivered",
    items: [
      {
        name: "Business Cards",
        quantity: 500,
        price: 49.99,
      },
      {
        name: "Flyers",
        quantity: 1000,
        price: 99.99,
      },
    ],
  },
  {
    id: "ORD-2024-002",
    date: "2024-01-10",
    total: 299.99,
    status: "Processing",
    items: [
      {
        name: "Vinyl Banner",
        quantity: 2,
        price: 149.99,
      },
    ],
  },
  {
    id: "ORD-2024-003",
    date: "2024-01-05",
    total: 79.99,
    status: "Shipped",
    items: [
      {
        name: "Sticker Labels",
        quantity: 250,
        price: 79.99,
      },
    ],
  },
]

const getStatusColor = (status: string) => {
  switch (status.toLowerCase()) {
    case "delivered":
      return "bg-green-500"
    case "processing":
      return "bg-blue-500"
    case "shipped":
      return "bg-yellow-500"
    default:
      return "bg-gray-500"
  }
}

export default function OrdersPage() {
  return (
    <div className="container mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Order History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Order ID</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Total</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="font-medium">{order.id}</TableCell>
                  <TableCell>{new Date(order.date).toLocaleDateString()}</TableCell>
                  <TableCell>${order.total.toFixed(2)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(order.status)}>{order.status}</Badge>
                  </TableCell>
                  <TableCell>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/account/orders/${order.id}`}>View Details</Link>
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}

