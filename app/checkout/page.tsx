"use client"
export const dynamic = "force-dynamic"

import { useMemo, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { AlertCircle, CheckCircle, CreditCard, Smartphone, Wallet, Calendar as CalendarIcon } from "lucide-react"
import { useCart } from "@/contexts/cart-context"
import { useBooking } from "@/contexts/booking-context"
import { useTechnician } from "@/contexts/technician-context"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { format } from "date-fns"

const currency = (n: number) => `₹${n.toLocaleString("en-IN")}`

// Individual time slots from 9 AM to 6 PM
const TIME_SLOTS = [
  "9 AM", "10 AM", "11 AM", "12 PM", 
  "1 PM", "2 PM", "3 PM", "4 PM", "5 PM", "6 PM"
]

function isValidSlot(dateStr: string, slot: string) {
  if (!dateStr || !slot) return { valid: false, reason: "Please select date and time" }
  const [startLabel] = slot.split(" ")
  const [start, end] = startLabel.split("-")
  const parse = (t: string) => {
    const [h, m] = t.split(":").length === 2 ? t.split(":") : [t, "00"]
    return { h: parseInt(h, 10), m: parseInt(m, 10) || 0 }
  }
  const mapTo24 = (token: string) => {
    const ampm = slot.includes("PM") && token !== "12" ? parseInt(token, 10) + 12 : parseInt(token, 10) % 24
    return ampm
  }
  // Construct selected start datetime
  const day = new Date(dateStr)
  const startH = mapTo24(start)
  const selected = new Date(day.getFullYear(), day.getMonth(), day.getDate(), startH, 0, 0)

  const now = new Date()
  const min = new Date(now.getTime() + 6 * 60 * 60 * 1000) // +6 hours

  const businessStart = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 9, 0, 0)
  const businessEnd = new Date(day.getFullYear(), day.getMonth(), day.getDate(), 18, 0, 0)

  if (selected < min) return { valid: false, reason: "Booking must be at least 6 hours in advance." }
  if (selected < businessStart || selected > businessEnd) return { valid: false, reason: "Service hours are 9 AM to 6 PM only." }
  return { valid: true }
}

export default function CheckoutPage() {
  const [contact, setContact] = useState({ name: "", phone: "", email: "" })
  const [address, setAddress] = useState({ line1: "", city: "", pincode: "" })
  const [selectedDate, setSelectedDate] = useState<Date>()
  const [slot, setSlot] = useState("")
  const [paymentMethod, setPaymentMethod] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const { cart, getTotalPrice, getInspectionTotal, getGrandTotal, clearCart } = useCart()
  const { addBooking } = useBooking()
  const { assignBooking } = useTechnician()
  
  const subtotal = getTotalPrice()
  const inspectionTotal = getInspectionTotal()
  const total = getGrandTotal()

  const isSameDay = (a: Date, b: Date) =>
    a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()

  const slotToDate = (date: Date, slot: string) => {
    const [hStr, period] = slot.split(" ") // e.g., "9" and "AM"
    const h = parseInt(hStr, 10)
    const hour24 = h === 12 ? (period === "AM" ? 0 : 12) : h + (period === "PM" ? 12 : 0)
    const d = new Date(date)
    d.setHours(hour24, 0, 0, 0)
    return d
  }

  const isSlotDisabled = (slot: string) => {
    if (!selectedDate) return true
    const now = new Date()
    const min = new Date(now.getTime() + 3 * 60 * 60 * 1000) // +3 hours
    if (isSameDay(selectedDate, now)) {
      const slotDate = slotToDate(selectedDate, slot)
      return slotDate < min
    }
    return false
  }

  const handleSubmit = () => {
    if (!selectedDate) {
      setError("Please select a date")
      return
    }
    if (!slot) {
      setError("Please select a time slot")
      return
    }
    if (!paymentMethod) {
      setError("Please select a payment method")
      return
    }
    
    // Check if the selected date and time is valid (at least 3 hours in advance for today)
    const now = new Date()
    const selectedDateTime = new Date(selectedDate)
    const [hour] = slot.split(" ")
    const hour24 = hour === "12" ? 12 : parseInt(hour) + (slot.includes("PM") && hour !== "12" ? 12 : 0)
    selectedDateTime.setHours(hour24, 0, 0, 0)
    
    const minDateTime = new Date(now.getTime() + 3 * 60 * 60 * 1000) // 3 hours from now
    
    if (selectedDateTime < minDateTime) {
      setError("Earliest available time is 3 hours from now for today")
      return
    }
    
    // Add each cart item as a separate booking
    cart.forEach(cartItem => {
      addBooking({
        service: cartItem.name.includes("AC") ? "AC Services" : "Refrigerator Services",
        subService: cartItem.name,
        date: selectedDate.toISOString().split('T')[0],
        time: slot,
        status: "scheduled",
        technician: "To be assigned",
        amount: cartItem.price + (cartItem.inspectionCharge || 0),
        address: `${address.line1}, ${address.city}, ${address.pincode}`,
        phone: contact.phone,
        inspectionCharge: cartItem.inspectionCharge,
      })

      // Assign to technician module (mock)
      assignBooking({
        id: `MAEGA-${Date.now().toString().slice(-6)}`,
        customer: contact.name || "Customer",
        serviceType: cartItem.name,
        date: selectedDate.toISOString().split('T')[0],
        time: slot,
        amount: cartItem.price + (cartItem.inspectionCharge || 0),
        status: "pending",
      })
    })
    
    setError("")
    setSuccess(true)
    clearCart()
  }

  if (success) {
    return (
      <div className="min-h-screen bg-background pt-24">
        <div className="container mx-auto px-4">
          <Card className="max-w-xl mx-auto border-0 shadow-md text-center">
            <CardContent className="py-12 space-y-4">
              <div className="w-16 h-16 rounded-full bg-green-100 text-green-700 flex items-center justify-center mx-auto animate-in zoom-in-95">
                <CheckCircle className="h-8 w-8" />
              </div>
              <h2 className="font-heading font-bold text-2xl">Booking Confirmed</h2>
              <p className="text-muted-foreground">Thank you for choosing Maega App Services.</p>
              <Button asChild>
                <a href="/dashboard">Back to Dashboard</a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background pt-24">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Customer Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input id="name" value={contact.name} onChange={(e) => setContact({ ...contact, name: e.target.value })} placeholder="Your name" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <Input id="phone" value={contact.phone} onChange={(e) => setContact({ ...contact, phone: e.target.value })} placeholder="+91 12345 67890" />
                  </div>
                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" value={contact.email} onChange={(e) => setContact({ ...contact, email: e.target.value })} placeholder="your@email.com" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="addr">Address</Label>
                  <Input id="addr" value={address.line1} onChange={(e) => setAddress({ ...address, line1: e.target.value })} placeholder="House/Street/Area" />
                  <div className="grid grid-cols-2 gap-3">
                    <Input placeholder="City" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
                    <Input placeholder="PIN Code" value={address.pincode} onChange={(e) => setAddress({ ...address, pincode: e.target.value })} />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Schedule Service</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
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
                    {TIME_SLOTS.map((timeSlot) => {
                      const disabled = isSlotDisabled(timeSlot)
                      return (
                        <Button
                          key={timeSlot}
                          variant={slot === timeSlot ? "default" : "outline"}
                          className="justify-center"
                          onClick={() => !disabled && setSlot(timeSlot)}
                          disabled={disabled}
                        >
                          {timeSlot}
                        </Button>
                      )
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'cod' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('cod')}
                  >
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Cash on Service</div>
                        <div className="text-xs text-muted-foreground">Pay after service</div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'card' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('card')}
                  >
                    <div className="flex items-center space-x-3">
                      <CreditCard className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Card</div>
                        <div className="text-xs text-muted-foreground">Credit/Debit card</div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'upi' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('upi')}
                  >
                    <div className="flex items-center space-x-3">
                      <Smartphone className="h-5 w-5" />
                      <div>
                        <div className="font-medium">UPI</div>
                        <div className="text-xs text-muted-foreground">PhonePe, GPay, etc.</div>
                      </div>
                    </div>
                  </div>
                  <div 
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      paymentMethod === 'wallet' ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/50'
                    }`}
                    onClick={() => setPaymentMethod('wallet')}
                  >
                    <div className="flex items-center space-x-3">
                      <Wallet className="h-5 w-5" />
                      <div>
                        <div className="font-medium">Wallets</div>
                        <div className="text-xs text-muted-foreground">Paytm, etc.</div>
                      </div>
                    </div>
                  </div>
                </div>

                {error && (
                  <div className="flex items-center gap-2 text-sm text-red-600">
                    <AlertCircle className="h-4 w-4" />
                    <span>{error}</span>
                  </div>
                )}

                <Button 
                  className="w-full" 
                  onClick={handleSubmit} 
                  disabled={!contact.name || !contact.phone || !contact.email || !address.line1 || !address.city || !address.pincode || !selectedDate || !slot || !paymentMethod}
                >
                  Book Now
                </Button>
              </CardContent>
            </Card>
          </div>

          <div>
            <Card className="border-0 shadow-md sticky top-24">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between items-start">
                      <div>
                        <div className="font-medium">{item.name} × {item.quantity}</div>
                        <div className="text-sm text-muted-foreground">
                          {currency(item.price)}
                          {item.inspectionCharge && ` + ${currency(item.inspectionCharge)} (Inspection)`}
                        </div>
                      </div>
                      <div className="text-sm font-medium">
                        {currency((item.price + (item.inspectionCharge || 0)) * item.quantity)}
                      </div>
                    </div>
                  ))}
                </div>
                <Separator />
                <div className="space-y-2 text-sm">
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
                  <div className="flex justify-between font-semibold text-lg">
                    <span>Total</span>
                    <span>{currency(total)}</span>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Spare parts, if required, will be quoted after inspection.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}


