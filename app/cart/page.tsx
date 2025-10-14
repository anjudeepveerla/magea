"use client"
export const dynamic = "force-dynamic"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Minus, Plus, Trash2 } from "lucide-react"
import { useCart } from "@/contexts/cart-context"

type CartItem = { id: string; name: string; price: number; quantity: number; inspectionCharge?: number }

export default function CartPage() {
  const { cart, updateQuantity, removeFromCart, getTotalPrice, getInspectionTotal, getGrandTotal } = useCart()

  const increment = (id: string) => {
    const item = cart.find(ci => ci.id === id)
    if (item) {
      updateQuantity(id, item.quantity + 1)
    }
  }
  
  const decrement = (id: string) => {
    const item = cart.find(ci => ci.id === id)
    if (item) {
      updateQuantity(id, Math.max(1, item.quantity - 1))
    }
  }
  
  const removeItem = (id: string) => removeFromCart(id)

  const subtotal = getTotalPrice()
  const inspectionTotal = getInspectionTotal()
  const total = getGrandTotal()
  const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-2 space-y-4">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Your Cart</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {cart.length === 0 ? (
                  <div className="text-center text-muted-foreground py-10">Your cart is empty</div>
                ) : (
                  cart.map((ci) => (
                    <div key={ci.id} className="flex items-center justify-between border rounded-lg p-3">
                      <div>
                        <div className="font-medium">{ci.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {currency(ci.price)}
                          {ci.inspectionCharge && ` + ${currency(ci.inspectionCharge)} (Inspection)`}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button size="icon" variant="outline" className="bg-transparent" onClick={() => decrement(ci.id)}>
                          <Minus className="h-4 w-4" />
                        </Button>
                        <span className="w-6 text-center font-medium">{ci.quantity}</span>
                        <Button size="icon" onClick={() => increment(ci.id)}>
                          <Plus className="h-4 w-4" />
                        </Button>
                        <Button size="icon" variant="outline" className="bg-transparent" onClick={() => removeItem(ci.id)}>
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>{currency(subtotal)}</span>
                </div>
                {inspectionTotal > 0 && (
                  <div className="flex justify-between">
                    <span>Inspection Charges</span>
                    <span>{currency(inspectionTotal)}</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{currency(total)}</span>
                </div>
                <Button className="w-full mt-2" asChild>
                  <a href="/checkout">Proceed to Checkout</a>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


