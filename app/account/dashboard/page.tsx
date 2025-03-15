import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import Link from "next/link"

export default function AccountDashboard() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Account Dashboard</h1>
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Personal Information</CardTitle>
            <CardDescription>Manage your account details</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-2">
              <strong>Name:</strong> John Doe
            </p>
            <p className="mb-2">
              <strong>Email:</strong> john.doe@example.com
            </p>
            <p className="mb-4">
              <strong>Phone:</strong> (555) 123-4567
            </p>
            <Button asChild>
              <Link href="/account/edit-profile">Edit Profile</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Order History</CardTitle>
            <CardDescription>View and manage your orders</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 3 recent orders.</p>
            <Button asChild>
              <Link href="/account/orders">View All Orders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Saved Designs</CardTitle>
            <CardDescription>Access your saved design templates</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 2 saved designs.</p>
            <Button asChild>
              <Link href="/account/saved-designs">View Saved Designs</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Payment Methods</CardTitle>
            <CardDescription>Manage your payment options</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">You have 1 saved payment method.</p>
            <Button asChild>
              <Link href="/account/payment-methods">Manage Payment Methods</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

