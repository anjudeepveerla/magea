"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  IndianRupee,
  MessageSquare,
  Download,
  Share2,
  Home,
  User,
  Wrench,
  CreditCard,
} from "lucide-react"

interface BookingConfirmationProps {
  bookingData: {
    customer: any
    service: any
    payment: any
  }
  onNewBooking: () => void
}

export default function BookingConfirmation({ bookingData, onNewBooking }: BookingConfirmationProps) {
  const [notificationsSent, setNotificationsSent] = useState(false)
  const [bookingId] = useState(`MAEGA${Date.now().toString().slice(-6)}`)

  useEffect(() => {
    // Simulate sending notifications
    const timer = setTimeout(() => {
      setNotificationsSent(true)
      console.log("[v0] SMS sent to:", bookingData.customer?.mobile)
      console.log("[v0] Email sent to:", bookingData.customer?.email)
      console.log("[v0] Booking confirmed with ID:", bookingId)
    }, 2000)

    return () => clearTimeout(timer)
  }, [bookingData, bookingId])

  const estimatedArrival = new Date()
  estimatedArrival.setHours(estimatedArrival.getHours() + 2)

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-IN", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-IN", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })
  }

  return (
    <div className="w-full max-w-4xl mx-auto space-y-6">
      {/* Success Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-green-800 mb-2">Booking Confirmed!</h1>
              <p className="text-green-700">
                Your service request has been successfully submitted and payment received.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-6">
        {/* Service Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-primary" />
              Service Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Service:</span>
                <span className="font-medium">{bookingData.service?.serviceName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Type:</span>
                <span>{bookingData.service?.subServiceName}</span>
              </div>
              {bookingData.service?.capacity && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Capacity:</span>
                  <span>{bookingData.service?.capacity}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Duration:</span>
                <span className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  {bookingData.service?.estimatedTime}
                </span>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Estimated Arrival:</span>
                <div className="text-right">
                  <div className="font-medium">{formatDate(estimatedArrival)}</div>
                  <div className="text-sm text-muted-foreground">{formatTime(estimatedArrival)}</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Payment Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-primary" />
              Payment Details
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {bookingData.payment ? (
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Payment ID:</span>
                  <span className="font-mono text-sm">{bookingData.payment.paymentId}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Method:</span>
                  <span>{bookingData.payment.paymentMethod}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Status:</span>
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    Paid
                  </Badge>
                </div>
                <div className="flex justify-between font-semibold">
                  <span>Amount Paid:</span>
                  <span className="text-primary">
                    <IndianRupee className="h-4 w-4 inline" />
                    {bookingData.payment.amount}
                  </span>
                </div>
              </div>
            ) : (
              <div className="text-center py-4">
                <Badge variant="secondary" className="bg-blue-100 text-blue-800">
                  No Payment Required
                </Badge>
                <p className="text-sm text-muted-foreground mt-2">Payment will be collected after service completion</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Customer & Address Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Customer & Service Address
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <h4 className="font-medium">Contact Information</h4>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingData.customer?.fullName}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span>+91 {bookingData.customer?.mobile}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span>{bookingData.customer?.email}</span>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <h4 className="font-medium">Service Address</h4>
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div>
                  <p>{bookingData.customer?.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {bookingData.customer?.city}, {bookingData.customer?.pincode}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Notifications Status */}
      <Card className="border-blue-200 bg-blue-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-3">
            <MessageSquare className="h-5 w-5 text-blue-600" />
            <div>
              <h4 className="font-medium text-blue-800">Confirmation Sent</h4>
              <p className="text-sm text-blue-700">
                {notificationsSent
                  ? "SMS and email confirmations have been sent to your registered contact details."
                  : "Sending SMS and email confirmations..."}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Next Steps */}
      <Card>
        <CardHeader>
          <CardTitle>What's Next?</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  Technician Assignment
                </h4>
                <p className="text-sm text-muted-foreground">
                  Our nearest technician will be assigned and will contact you within 30 minutes.
                </p>
              </div>
              <div className="space-y-2">
                <h4 className="font-medium flex items-center gap-2">
                  <Clock className="h-4 w-4 text-primary" />
                  Service Window
                </h4>
                <p className="text-sm text-muted-foreground">
                  Expected arrival: {formatTime(estimatedArrival)} today. You'll receive updates via SMS.
                </p>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-medium">Important Notes:</h4>
              <ul className="text-sm text-muted-foreground space-y-1 ml-4">
                <li>• Please ensure someone is available at the service address</li>
                <li>• Keep your appliance accessible for the technician</li>
                <li>• For any queries, call our support: +91 12345 67890</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="h-4 w-4 mr-2" />
          Download Receipt
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share2 className="h-4 w-4 mr-2" />
          Share Booking
        </Button>
        <Button onClick={onNewBooking} className="flex-1">
          <Home className="h-4 w-4 mr-2" />
          Book Another Service
        </Button>
      </div>
    </div>
  )
}
