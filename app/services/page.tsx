"use client"
export const dynamic = "force-dynamic"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { CheckCircle, ShoppingCart, Plus, Minus, Trash2, Clock, Shield, Star, Search, Calendar as CalendarIcon } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"
import { useToast } from "@/hooks/use-toast"

type ServiceItem = {
  id: string
  name: string
  price: number
  unit?: string
  note?: string
  inspectionCharge?: number
}

type ServiceCategory = {
  id: string
  title: string
  sections: { title: string; items: ServiceItem[] }[]
}

type CartItem = {
  id: string
  name: string
  price: number
  quantity: number
  inspectionCharge?: number
}

const categories: ServiceCategory[] = [
  {
    id: "ac",
    title: "AC Services",
    sections: [
      {
        title: "Regular Services",
        items: [
          { id: "ac-blower", name: "Blower Services", price: 600, inspectionCharge: 450 },
          { id: "ac-water", name: "Water Services", price: 800 },
          { id: "ac-chemical", name: "Chemical Services", price: 1200 },
        ],
      },
      {
        title: "Installations",
        items: [
          { id: "ac-window-install", name: "Window AC Installation", price: 2500 },
          { id: "ac-split-gf", name: "Split AC Installation – Ground Floor", price: 2500 },
          { id: "ac-split-1f", name: "Split AC Installation – 1st Floor", price: 3000 },
          { id: "ac-split-2f", name: "Split AC Installation – 2nd Floor", price: 4000 },
          { id: "ac-split-3f", name: "Split AC Installation – 3rd Floor", price: 4500 },
          { id: "ac-split-4f", name: "Split AC Installation – 4th Floor", price: 6000 },
          { id: "ac-dismantle", name: "AC Dismantling", price: 1800 },
          { id: "ac-pipe-ext", name: "Pipe Extension", price: 1200, unit: "/ meter" },
          { id: "ac-core-cut", name: "Core Cutting", price: 1200 },
        ],
      },
    ],
  },
  {
    id: "ref",
    title: "Refrigerator Services",
    sections: [
      {
        title: "Domestic",
        items: [
          { id: "ref-dom-200", name: "100–200 Ltr", price: 400 },
          { id: "ref-dom-400", name: "200–400 Ltr", price: 500 },
          { id: "ref-dom-400p", name: "Above 400 Ltr", price: 600 },
        ],
      },
      {
        title: "Commercial",
        items: [
          { id: "ref-bottle", name: "Bottle Coolers", price: 500 },
          { id: "ref-deep", name: "Deep Freezers", price: 550 },
          { id: "ref-water-cooler", name: "Water Coolers", price: 500 },
          { id: "ref-water-disp", name: "Water Dispensers", price: 350 },
          { id: "ref-visi", name: "Visi Coolers", price: 450 },
        ],
      },
      {
        title: "Mobile Refrigerators",
        items: [
          { id: "ref-mobile-tri", name: "Tricycles", price: 500 },
          { id: "ref-mobile-van", name: "Vans", price: 750 },
          { id: "ref-mobile-rvan", name: "Refrigerator Vans", price: 750 },
        ],
      },
    ],
  },
]

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`

export default function ServicesPage() {
  const [expanded, setExpanded] = useState<Record<string, boolean>>({ ac: true, ref: true })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [successOpen, setSuccessOpen] = useState(false)
  const [query, setQuery] = useState("")
  
  const { cart, addToCart, updateQuantity, removeFromCart, getTotalPrice, getInspectionTotal, getGrandTotal } = useCart()
  const { toast } = useToast()

  const handleAddToCart = (item: ServiceItem) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      inspectionCharge: item.inspectionCharge
    })
    toast({ title: "Added to cart", description: `${item.name} added successfully.` })
  }

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
  const tax = 0 // Extend if taxes apply
  const total = getGrandTotal()

  // Checkout state
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1)
  const [contact, setContact] = useState({ name: "", phone: "", email: "" })
  const [address, setAddress] = useState({ line1: "", city: "", pincode: "" })
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [slot, setSlot] = useState("")
  const canProceed1 = contact.name && contact.phone && contact.email
  const canProceed2 = address.line1 && address.city && address.pincode
  const canProceed3 = selectedDate && slot

  const resetCheckout = () => {
    setStep(1)
    setContact({ name: "", phone: "", email: "" })
    setAddress({ line1: "", city: "", pincode: "" })
    setSelectedDate(undefined)
    setSlot("")
  }

  const handlePlaceOrder = () => {
    setCheckoutOpen(false)
    setSuccessOpen(true)
    resetCheckout()
    // Cart will be cleared by the success handler
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <section className="container mx-auto px-4">
        <div className="text-center space-y-3 mb-10">
          <Badge variant="secondary" className="mx-auto w-fit">Maega App Services</Badge>
          <h1 className="font-heading font-bold text-3xl lg:text-5xl text-foreground">Professional AC & Refrigeration Services</h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transparent pricing. Verified technicians. Urban Company-like smooth booking experience.
          </p>
          <div className="flex items-center justify-center gap-6 pt-2 text-sm">
            <span className="inline-flex items-center gap-2"><Clock className="h-4 w-4" /> Same-day slots</span>
            <span className="inline-flex items-center gap-2"><Shield className="h-4 w-4" /> Service guarantee</span>
            <span className="inline-flex items-center gap-2"><Star className="h-4 w-4" /> 4.9/5 rated</span>
                </div>
                </div>

        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search services or categories..." className="pl-10" />
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                </div>
                </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {categories
            .filter((cat) =>
              [cat.title, ...cat.sections.flatMap((s) => s.items.map((i) => i.name))]
                .join(" ")
                .toLowerCase()
                .includes(query.toLowerCase()),
            )
            .map((cat) => (
            <Card key={cat.id} className="border-0 shadow-md">
              <CardHeader onClick={() => setExpanded((e) => ({ ...e, [cat.id]: !e[cat.id] }))} className="cursor-pointer">
                <CardTitle className="font-heading text-2xl">{cat.title}</CardTitle>
                <CardDescription>Tap to {expanded[cat.id] ? "collapse" : "expand"}</CardDescription>
              </CardHeader>
              {expanded[cat.id] && (
                <CardContent className="space-y-8">
                  {cat.sections.map((section, si) => (
                    <div key={si} className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="font-heading font-semibold text-lg">{section.title}</h3>
                        <Separator className="w-2/3" />
                </div>
                      <div className="space-y-3">
                        {section.items.map((item) => (
                          <div key={item.id} className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/30">
                            <div className="space-y-1">
                              <div className="font-medium text-foreground">{item.name}</div>
                              <div className="text-sm text-muted-foreground">
                                {currency(item.price)}{item.unit ? ` ${item.unit}` : ""}
                                {item.inspectionCharge && ` + Inspection: ${currency(item.inspectionCharge)}`}
                              </div>
                            </div>
                            {(() => {
                              const found = cart.find((ci) => ci.id === item.id)
                              if (!found) {
                                return (
                                  <Button size="sm" onClick={() => { handleAddToCart(item) }}>
                                    <ShoppingCart className="h-4 w-4 mr-2" /> Add to Cart
                                  </Button>
                                )
                              }
                              return (
                                <div className="flex items-center gap-2">
                                  <Button size="icon" variant="outline" className="bg-transparent" onClick={() => decrement(item.id)}>
                                    <Minus className="h-4 w-4" />
                                  </Button>
                                  <span className="w-6 text-center font-medium">{found.quantity}</span>
                                  <Button size="icon" onClick={() => increment(item.id)}>
                                    <Plus className="h-4 w-4" />
                                  </Button>
          </div>
                              )
                            })()}
                </div>
                        ))}
                </div>
                </div>
                  ))}
                  <p className="text-xs text-muted-foreground">Note: Spare parts will be quoted separately after inspection.</p>
              </CardContent>
              )}
            </Card>
          ))}
        </div>
      </section>

      {/* Floating cart */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button size="lg" className="rounded-full shadow-lg" onClick={() => setCartOpen(true)}>
          <ShoppingCart className="h-5 w-5 mr-2" /> Cart {cart.length > 0 && <Badge className="ml-2">{cart.reduce((n, i) => n + i.quantity, 0)}</Badge>}
        </Button>
          </div>

      {/* Cart Dialog */}
      <Dialog open={cartOpen} onOpenChange={setCartOpen}>
        <DialogContent className="sm:max-w-xl p-0 overflow-hidden">
          <DialogHeader className="px-6 pt-6">
            <DialogTitle>Your Cart</DialogTitle>
          </DialogHeader>
          <div className="px-6 pb-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center text-muted-foreground py-10">Your cart is empty</div>
            ) : (
              <>
                <div className="space-y-3 max-h-72 overflow-auto pr-1">
                  {cart.map((ci) => (
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
                    ))}
                  </div>
                <div className="space-y-1 text-sm">
                  <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
                  {inspectionTotal > 0 && <div className="flex justify-between"><span>Inspection Charges</span><span>{currency(inspectionTotal)}</span></div>}
                  {tax > 0 && <div className="flex justify-between"><span>Taxes & Charges</span><span>{currency(tax)}</span></div>}
                  <div className="flex justify-between font-semibold text-foreground border-t pt-2"><span>Total</span><span>{currency(total)}</span></div>
                </div>
                <div className="pt-2">
                  <Button className="w-full" onClick={() => { setCartOpen(false); setCheckoutOpen(true) }} disabled={cart.length === 0}>
                    Proceed to Checkout
                  </Button>
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Checkout Dialog */}
      <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}>
        <DialogContent className="sm:max-w-2xl p-0 overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-6 space-y-5">
              <div className="flex items-center gap-2 text-sm">
                {["Contact", "Address", "Schedule", "Payment"].map((label, idx) => (
                  <div key={label} className="flex items-center">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold ${idx + 1 <= step ? "bg-blue-600 text-white" : "bg-muted text-muted-foreground"}`}>{idx + 1}</div>
                    {idx < 3 && <div className={`w-8 h-0.5 mx-2 ${idx + 1 < step ? "bg-blue-600" : "bg-muted"}`} />}
                  </div>
                ))}
              </div>

              {step === 1 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" placeholder="Your name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" placeholder="+91 12345 67890" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} />
                  </div>
                  <div className="space-y-1">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="your@email.com" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} />
                  </div>
                  <div className="flex justify-end pt-2">
                    <Button onClick={() => setStep(2)} disabled={!canProceed1}>Next</Button>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="space-y-4">
                  <div className="space-y-1">
                    <Label htmlFor="line1">Address</Label>
                    <Input id="line1" placeholder="House/Street/Area" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="Hyderabad" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    </div>
                    <div className="space-y-1">
                      <Label htmlFor="pin">PIN Code</Label>
                      <Input id="pin" placeholder="500027" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" className="bg-transparent" onClick={() => setStep(1)}>Back</Button>
                    <Button onClick={() => setStep(3)} disabled={!canProceed2}>Next</Button>
          </div>
        </div>
              )}

              {step === 3 && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Select Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {selectedDate ? format(selectedDate, "PPP") : "Pick a date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={selectedDate}
                          onSelect={setSelectedDate}
                          disabled={(date) => {
                            const today = new Date()
                            today.setHours(0, 0, 0, 0)
                            return date < today
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  
                  <div className="space-y-2">
                    <Label>Select Time</Label>
                    <div className="grid grid-cols-2 gap-2">
                      {["9 AM", "10 AM", "11 AM", "12 PM", "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"].map((timeSlot) => (
                        <Button
                          key={timeSlot}
                          variant={slot === timeSlot ? "default" : "outline"}
                          className="justify-center text-sm"
                          onClick={() => setSlot(timeSlot)}
                        >
                          {timeSlot}
                        </Button>
                      ))}
                    </div>
                  </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" className="bg-transparent" onClick={() => setStep(2)}>Back</Button>
                    <Button onClick={() => setStep(4)} disabled={!canProceed3}>Next</Button>
          </div>
        </div>
              )}

              {step === 4 && (
            <div className="space-y-4">
                  <div className="space-y-1">
                    <Label>Payment Method</Label>
                    <Select defaultValue="cod">
                      <SelectTrigger>
                        <SelectValue placeholder="Choose" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cod">Pay After Service</SelectItem>
                        <SelectItem value="upi">UPI</SelectItem>
                        <SelectItem value="card">Card</SelectItem>
                      </SelectContent>
                    </Select>
                </div>
                  <div className="flex justify-between pt-2">
                    <Button variant="outline" className="bg-transparent" onClick={() => setStep(3)}>Back</Button>
                    <Button onClick={handlePlaceOrder}>Confirm Booking</Button>
                </div>
              </div>
              )}
            </div>

            {/* Order summary */}
            <div className="bg-muted/40 p-6 space-y-4 border-l">
              <h3 className="font-heading font-semibold">Order Summary</h3>
              <div className="space-y-2 max-h-64 overflow-auto pr-1">
                {cart.length === 0 ? (
                  <div className="text-sm text-muted-foreground">No items selected</div>
                ) : (
                  cart.map((ci) => (
                    <div key={ci.id} className="flex items-center justify-between">
                      <div className="text-sm">{ci.name} × {ci.quantity}</div>
                      <div className="text-sm font-medium">
                        {currency((ci.price + (ci.inspectionCharge || 0)) * ci.quantity)}
                      </div>
                    </div>
                  ))
                )}
              </div>
              <Separator />
              <div className="space-y-1 text-sm">
                <div className="flex justify-between"><span>Subtotal</span><span>{currency(subtotal)}</span></div>
                {inspectionTotal > 0 && <div className="flex justify-between"><span>Inspection Charges</span><span>{currency(inspectionTotal)}</span></div>}
                {tax > 0 && <div className="flex justify-between"><span>Taxes & Charges</span><span>{currency(tax)}</span></div>}
                <div className="flex justify-between font-semibold text-foreground border-t pt-2"><span>Total</span><span>{currency(total)}</span></div>
            </div>
              <p className="text-xs text-muted-foreground">Spare parts, if required, will be quoted after inspection.</p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={successOpen} onOpenChange={setSuccessOpen}>
        <DialogContent className="sm:max-w-md">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto animate-in zoom-in-95">
              <CheckCircle className="h-8 w-8" />
            </div>
            <h3 className="font-heading font-bold text-2xl">Booking Confirmed</h3>
            <p className="text-muted-foreground">Thank you for choosing Maega App Services.</p>
            <Button asChild onClick={() => setSuccessOpen(false)}>
              <a href="/dashboard">Back to Dashboard</a>
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  )
}


