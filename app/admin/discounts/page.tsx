"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"

// Mock data
const discounts = [
  {
    id: 1,
    code: "SUMMER2024",
    type: "percentage",
    value: 20,
    startDate: "2024-06-01",
    endDate: "2024-08-31",
    status: "Scheduled",
    usageLimit: 1000,
    usageCount: 0,
  },
  {
    id: 2,
    code: "WELCOME10",
    type: "percentage",
    value: 10,
    startDate: "2024-01-01",
    endDate: "2024-12-31",
    status: "Active",
    usageLimit: 500,
    usageCount: 123,
  },
]

export default function DiscountsPage() {
  const [searchTerm, setSearchTerm] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const router = useRouter()

  const filteredDiscounts = discounts.filter((discount) => {
    const matchesSearch = discount.code.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesStatus = statusFilter === "all" || discount.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Discounts & Offers</h1>
        <Button onClick={() => router.push("/admin/discounts/new")}>
          <Plus className="mr-2 h-4 w-4" />
          Create Discount
        </Button>
      </div>

      <div className="flex gap-4 mb-6">
        <Input
          placeholder="Search discounts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="Active">Active</SelectItem>
            <SelectItem value="Scheduled">Scheduled</SelectItem>
            <SelectItem value="Expired">Expired</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="border rounded-lg">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Code</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Value</TableHead>
              <TableHead>Period</TableHead>
              <TableHead>Usage</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredDiscounts.map((discount) => (
              <TableRow key={discount.id}>
                <TableCell className="font-medium">{discount.code}</TableCell>
                <TableCell className="capitalize">{discount.type}</TableCell>
                <TableCell>{discount.type === "percentage" ? `${discount.value}%` : `$${discount.value}`}</TableCell>
                <TableCell>
                  {new Date(discount.startDate).toLocaleDateString()} -{" "}
                  {new Date(discount.endDate).toLocaleDateString()}
                </TableCell>
                <TableCell>
                  {discount.usageCount} / {discount.usageLimit}
                </TableCell>
                <TableCell>
                  <Badge
                    variant={
                      discount.status === "Active"
                        ? "default"
                        : discount.status === "Scheduled"
                          ? "secondary"
                          : "outline"
                    }
                  >
                    {discount.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="space-x-2">
                    <Button variant="outline" onClick={() => router.push(`/admin/discounts/${discount.id}`)}>
                      Edit
                    </Button>
                    <Button
                      variant="destructive"
                      onClick={() => {
                        // Add delete confirmation dialog
                        alert("Delete discount: " + discount.code)
                      }}
                    >
                      Delete
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

