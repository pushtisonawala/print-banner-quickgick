"use client"

import { useState } from "react"
import { CreditCard, ChevronsRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useCart } from "@/contexts/CartContext"

export default function CheckoutPage() {
  const { cart, totalPrice } = useCart()
  const [checkoutStep, setCheckoutStep] = useState('details')
  const [sameAsBilling, setSameAsBilling] = useState(true)
  const [paymentMethod, setPaymentMethod] = useState('credit-card')

  const subtotal = totalPrice
  const discount = 0 // Apply any discount logic here
  const shipping = subtotal > 75 ? 0 : 7.99
  const tax = subtotal * 0.0875 // Example tax rate of 8.75%
  const total = subtotal + shipping + tax - discount

  const goToShipping = () => {
    setCheckoutStep('shipping')
  }

  const goToPayment = () => {
    setCheckoutStep('payment')
  }

  const goToReview = () => {
    setCheckoutStep('review')
  }

  const placeOrder = () => {
    // Submit order logic would go here
    console.log('Order placed')
    window.location.href = '/checkout/confirmation'
  }

  return (
    <div className="container-custom py-8">
      <h1 className="text-3xl font-bold mb-2">Checkout</h1>
      <p className="text-gray-600 mb-6">Complete your order by providing your details below.</p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2">
          <Tabs value={checkoutStep} className="w-full">
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="details" className="data-[state=active]:bg-brand data-[state=active]:text-white">
                1. Details
              </TabsTrigger>
              <TabsTrigger value="shipping" className="data-[state=active]:bg-brand data-[state=active]:text-white">
                2. Shipping
              </TabsTrigger>
              <TabsTrigger value="payment" className="data-[state=active]:bg-brand data-[state=active]:text-white">
                3. Payment
              </TabsTrigger>
              <TabsTrigger value="review" className="data-[state=active]:bg-brand data-[state=active]:text-white">
                4. Review
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="details" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    <CreditCard className="inline-block mr-2 h-5 w-5" />
                    Your Details
                  </h2>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input id="email" type="email" placeholder="your@email.com" />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" placeholder="(555) 555-5555" />
                    </div>
                  </div>
                  
                  <h3 className="font-medium mb-4">Billing Address</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="company">Company (Optional)</Label>
                      <Input id="company" placeholder="Company Name" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address1">Address Line 1</Label>
                      <Input id="address1" placeholder="123 Main St" />
                    </div>
                    <div className="md:col-span-2">
                      <Label htmlFor="address2">Address Line 2 (Optional)</Label>
                      <Input id="address2" placeholder="Apt, Suite, etc." />
                    </div>
                    <div>
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="City" />
                    </div>
                    <div>
                      <Label htmlFor="state">State/Province</Label>
                      <Select>
                        <SelectTrigger id="state">
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ca">California</SelectItem>
                          <SelectItem value="ny">New York</SelectItem>
                          <SelectItem value="tx">Texas</SelectItem>
                          {/* Add more states here */}
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="zipCode">Zip/Postal Code</Label>
                      <Input id="zipCode" placeholder="12345" />
                    </div>
                    <div>
                      <Label htmlFor="country">Country</Label>
                      <Select defaultValue="us">
                        <SelectTrigger id="country">
                          <SelectValue placeholder="Select Country" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="us">United States</SelectItem>
                          <SelectItem value="ca">Canada</SelectItem>
                          <SelectItem value="mx">Mexico</SelectItem>
                          {/* Add more countries here */}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button onClick={goToShipping} className="flex items-center">
                      Continue to Shipping
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="shipping" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Shipping Information</h2>
                  
                  <div className="mb-4">
                    <Label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={sameAsBilling}
                        onChange={() => setSameAsBilling(!sameAsBilling)}
                        className="mr-2"
                      />
                      Same as billing address
                    </Label>
                  </div>
                  
                  {!sameAsBilling && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                      {/* Add shipping address fields here, similar to billing address */}
                    </div>
                  )}
                  
                  <h3 className="font-medium mb-4">Shipping Method</h3>
                  <div className="space-y-2 mb-6">
                    <Label className="flex items-center">
                      <input type="radio" name="shipping-method" value="standard" defaultChecked className="mr-2" />
                      Standard Shipping (3-5 business days) - Free
                    </Label>
                    <Label className="flex items-center">
                      <input type="radio" name="shipping-method" value="express" className="mr-2" />
                      Express Shipping (1-2 business days) - $15.00
                    </Label>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button onClick={() => setCheckoutStep('details')} variant="outline">
                      Back to Details
                    </Button>
                    <Button onClick={goToPayment} className="flex items-center">
                      Continue to Payment
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="payment" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Information</h2>
                  
                  <div className="space-y-4 mb-6">
                    <Label className="flex items-center">
                      <input
                        type="radio"
                        name="payment-method"
                        value="credit-card"
                        checked={paymentMethod === 'credit-card'}
                        onChange={() => setPaymentMethod('credit-card')}
                        className="mr-2"
                      />
                      Credit Card
                    </Label>
                    {paymentMethod === 'credit-card' && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ml-6">
                        <div className="md:col-span-2">
                          <Label htmlFor="card-number">Card Number</Label>
                          <Input id="card-number" placeholder="1234 5678 9012 3456" />
                        </div>
                        <div>
                          <Label htmlFor="expiry-date">Expiry Date</Label>
                          <Input id="expiry-date" placeholder="MM/YY" />
                        </div>
                        <div>
                          <Label htmlFor="cvv">CVV</Label>
                          <Input id="cvv" placeholder="123" />
                        </div>
                      </div>
                    )}
                    <Label className="flex items-center">
                      <input
                        type="radio"
                        name="payment-method"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={() => setPaymentMethod('paypal')}
                        className="mr-2"
                      />
                      PayPal
                    </Label>
                  </div>
                  
                  <div className="flex justify-between">
                    <Button onClick={() => setCheckoutStep('shipping')} variant="outline">
                      Back to Shipping
                    </Button>
                    <Button onClick={goToReview} className="flex items-center">
                      Review Order
                      <ChevronsRight className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="review" className="pt-6">
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
                  
                  <div className="space-y-4 mb-6">
                    <div>
                      <h3 className="font-medium">Billing Address</h3>
                      <p>John Doe</p>
                      <p>123 Main St</p>
                      <p>Anytown, CA 12345</p>
                    </div>
                    <div>
                      <h3 className="font-medium">Shipping Address</h3>
                      <p>John Doe</p>
                      <p>123 Main St</p>
                      <p>Anytown, CA 12345</p>
                    </div>
                  </div>
                  <div className="flex justify-between mt-6">
                    <Button onClick={() => setCheckoutStep('payment')} variant="outline">
                      Back to Payment
                    </Button>
                    <Button onClick={placeOrder}>Place Order</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      
      <div className="md:col-span-1">
        <Card>
          <CardHeader>
            <CardTitle>Order Summary</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-green-600">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

