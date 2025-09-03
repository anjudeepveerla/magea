"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, CalendarIcon, Clock, User } from "lucide-react"
import { format } from "date-fns"

interface BookingWizardProps {
  isOpen: boolean
  onClose: () => void
  preselectedService?: string
}

const services = [
  "AC Services",
  "Refrigerators",
  "Deep Freezers",
  "Bottle Coolers",
  "Visi Coolers",
  "FOW (Freezer on Wheels)",
  "Water Coolers",
  "Water Dispensers",
  "Refrigerator Vans",
  "Cold Rooms",
]

const subServices: Record<string, string[]> = {
  "AC Services": [
    "Electrical Repair",
    "Compressor Repair",
    "Gas Problem",
    "PCB Repair",
    "Wiring Problem",
    "Leakages Problem",
    "Window AC Installation",
    "Split AC Installation",
    "Multi-floor Installation",
    "Dismantling of ACs",
    "Extension of Pipes",
    "Core Cutting",
    "Blower Services",
    "Water Services",
    "Chemical Cleaning",
  ],
  Refrigerators: [
    "General Servicing",
    "Electrical Problem",
    "Gas Problem",
    "Compressor Problem",
    "PCB Problem",
    "Body Repair",
    "Accessories",
    "Evaporator Problem",
    "Electronic Set Issues",
    "Fan Motor Problem",
    "Door Closing Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Bulb Problem",
    "Door Switch Problem",
    "Appliance Demo",
  ],
  "Deep Freezers": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem (Relay, Capacitors, Thermostat)",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Condenser Fan Blade Problem",
    "Electronic Thermometer",
    "Fan Motor Base Problem",
    "Door Closing Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Door Hinges & Clamp Problem",
  ],
  "Bottle Coolers": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem (Relay, Capacitors, Thermostat)",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Condenser Fan Blade Problem",
    "Electronic Thermometer",
    "Fan Motor Base Problem",
    "Door Closing Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Door Hinges & Clamp Problem",
  ],
  "Visi Coolers": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem",
    "Relay Problem",
    "Capacitors Problem",
    "Thermostat Problem",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Heater Problem",
    "Electronic Thermometer",
    "Tap Problem",
    "Water Bottle Holder Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Tube Light Problem",
    "Door Beeding Problem",
    "Front Glass Problem",
  ],
  "FOW (Freezer on Wheels)": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem",
    "Relay Problem",
    "Capacitors Problem",
    "Thermostat Problem",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Condenser Fan Blade Problem",
    "Electronic Thermometer",
    "Fan Motor Base Problem",
    "Door Closing Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Door Hinges & Clamp Problem",
  ],
  "Water Coolers": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem",
    "Relay Problem",
    "Capacitors Problem",
    "Thermostat Problem",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Heater Problem",
    "Electronic Thermometer",
    "Tap Problem",
    "Door Beeding Problem",
  ],
  "Water Dispensers": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem",
    "Relay Problem",
    "Capacitors Problem",
    "Thermostat Problem",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Heater Problem",
    "Electronic Thermometer",
    "Tap Problem",
    "Water Bottle Holder Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
  ],
  "Refrigerator Vans": [
    "General Servicing",
    "Electrical Problem",
    "Gas Problem",
    "Compressor Problem",
    "Accessories",
    "Door & Motor Issues",
    "Inspection Charges",
  ],
  "Cold Rooms": [
    "Complete Servicing",
    "Demo",
    "Electrical Problem (Relay, Capacitors, Thermostat)",
    "Gas Problem",
    "Compressor Problem",
    "Condenser Fan Motor",
    "Body Repair",
    "Accessories",
    "Condenser Fan Blade Problem",
    "Electronic Thermometer",
    "Fan Motor Base Problem",
    "Door Closing Problem",
    "Water Leakage Problem",
    "Electrical Wire Problem",
    "Indoor Problem",
    "Duct Problem",
  ],
}

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "1:00 PM - 2:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
]

export function BookingWizard({ isOpen, onClose, preselectedService }: BookingWizardProps) {
  const [currentStep, setCurrentStep] = useState(1)
  const [formData, setFormData] = useState({
    service: preselectedService || "",
    subService: "",
    name: "",
    phone: "",
    email: "",
    address: "",
    date: undefined as Date | undefined,
    timeSlot: "",
    notes: "",
  })
  const [bookingId, setBookingId] = useState("")

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Generate booking ID
    const id = `MAEGA${Date.now().toString().slice(-6)}`
    setBookingId(id)
    setCurrentStep(5)
  }

  const resetWizard = () => {
    setCurrentStep(1)
    setFormData({
      service: preselectedService || "",
      subService: "",
      name: "",
      phone: "",
      email: "",
      address: "",
      date: undefined,
      timeSlot: "",
      notes: "",
    })
    setBookingId("")
  }

  const handleClose = () => {
    resetWizard()
    onClose()
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.service !== ""
      case 2:
        return formData.subService !== ""
      case 3:
        return formData.name !== "" && formData.phone !== "" && formData.email !== "" && formData.address !== ""
      case 4:
        return formData.date !== undefined && formData.timeSlot !== ""
      default:
        return true
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-heading text-2xl">Book Your Service</DialogTitle>
        </DialogHeader>

        {/* Progress Steps */}
        <div className="flex items-center justify-between mb-8">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                  step <= currentStep ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                }`}
              >
                {step < currentStep || (step === 5 && bookingId) ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              {step < 5 && <div className={`w-12 h-0.5 mx-2 ${step < currentStep ? "bg-primary" : "bg-muted"}`} />}
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div className="space-y-6">
          {currentStep === 1 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">1</span>
                  </div>
                  Select Service
                </CardTitle>
                <CardDescription>Choose the main service category</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  {services.map((service) => (
                    <Button
                      key={service}
                      variant={formData.service === service ? "default" : "outline"}
                      className="h-auto p-4 text-left justify-start"
                      onClick={() => setFormData({ ...formData, service, subService: "" })}
                    >
                      {service}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 2 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <span className="text-primary font-semibold">2</span>
                  </div>
                  Select Sub-Service
                </CardTitle>
                <CardDescription>Choose the specific service you need</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Badge variant="secondary">{formData.service}</Badge>
                <div className="grid grid-cols-1 gap-2 max-h-60 overflow-y-auto">
                  {(subServices[formData.service] || []).map((subService) => (
                    <Button
                      key={subService}
                      variant={formData.subService === subService ? "default" : "outline"}
                      className="h-auto p-3 text-left justify-start"
                      onClick={() => setFormData({ ...formData, subService })}
                    >
                      {subService}
                    </Button>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 3 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                  Customer Details
                </CardTitle>
                <CardDescription>Provide your contact information</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name *</Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number *</Label>
                    <Input
                      id="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 12345 67890"
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="your.email@example.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="address">Full Address *</Label>
                  <Textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    placeholder="Enter your complete address including landmark"
                    rows={3}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Additional Notes (Optional)</Label>
                  <Textarea
                    id="notes"
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    placeholder="Any specific requirements or issues to mention"
                    rows={2}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 4 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <CalendarIcon className="h-4 w-4 text-primary" />
                  </div>
                  Date & Time
                </CardTitle>
                <CardDescription>Select your preferred date and time slot</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <Label className="text-base font-semibold">Select Date</Label>
                  <div className="mt-2">
                    <Calendar
                      mode="single"
                      selected={formData.date}
                      onSelect={(date) => setFormData({ ...formData, date })}
                      disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
                      className="rounded-md border"
                    />
                  </div>
                </div>
                <div>
                  <Label className="text-base font-semibold">Select Time Slot</Label>
                  <div className="grid grid-cols-1 gap-2 mt-2">
                    {timeSlots.map((slot) => (
                      <Button
                        key={slot}
                        variant={formData.timeSlot === slot ? "default" : "outline"}
                        className="justify-start"
                        onClick={() => setFormData({ ...formData, timeSlot: slot })}
                      >
                        <Clock className="h-4 w-4 mr-2" />
                        {slot}
                      </Button>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {currentStep === 5 && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="h-8 w-8 text-accent" />
                  Booking Confirmed!
                </CardTitle>
                <CardDescription>Your service has been successfully booked</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="bg-accent/10 p-4 rounded-lg">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-muted-foreground">Your Booking ID</p>
                    <p className="text-2xl font-bold text-accent">{bookingId}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="font-semibold">Booking Summary:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Service:</span>
                      <span>{formData.service}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sub-Service:</span>
                      <span>{formData.subService}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>{formData.date ? format(formData.date, "PPP") : ""}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Time:</span>
                      <span>{formData.timeSlot}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Customer:</span>
                      <span>{formData.name}</span>
                    </div>
                  </div>
                </div>

                <div className="bg-card p-4 rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    <strong>What's Next?</strong>
                    <br />• Our technician will call you 30 minutes before arrival
                    <br />• Inspection charges will be discussed during the visit
                    <br />• You can track your booking status anytime
                  </p>
                </div>

                <div className="flex gap-3">
                  <Button className="flex-1" asChild>
                    <a href={`/track?id=${bookingId}`}>Track Booking</a>
                  </Button>
                  <Button variant="outline" className="flex-1 bg-transparent" onClick={handleClose}>
                    Close
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Navigation Buttons */}
        {currentStep < 5 && (
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={handlePrevious} disabled={currentStep === 1}>
              Previous
            </Button>
            <Button onClick={currentStep === 4 ? handleSubmit : handleNext} disabled={!isStepValid()}>
              {currentStep === 4 ? "Confirm Booking" : "Next"}
            </Button>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
