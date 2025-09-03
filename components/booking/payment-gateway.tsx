"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Separator } from "@/components/ui/separator"
import {
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  Shield,
  IndianRupee,
  Clock,
  CheckCircle,
  AlertCircle,
  Loader2,
} from "lucide-react"

interface PaymentGatewayProps {
  amount: number
  serviceDetails: any
  customerDetails: any
  onSuccess: (paymentData: PaymentData) => void
  onBack: () => void
  isLoading?: boolean
}

export interface PaymentData {
  paymentId: string
  amount: number
  paymentMethod: string
  status: "success" | "failed"
  timestamp: string
}

type PaymentMethod = "upi" | "card" | "netbanking" | "wallet"

export default function PaymentGateway({
  amount,
  serviceDetails,
  customerDetails,
  onSuccess,
  onBack,
  isLoading,
}: PaymentGatewayProps) {
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("upi")
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState("")

  // Form states for different payment methods
  const [upiId, setUpiId] = useState("")
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [cardName, setCardName] = useState("")

  const paymentMethods = [
    {
      id: "upi" as PaymentMethod,
      name: "UPI",
      icon: <Smartphone className="h-5 w-5" />,
      description: "Pay using UPI ID or QR code",
      popular: true,
    },
    {
      id: "card" as PaymentMethod,
      name: "Credit/Debit Card",
      icon: <CreditCard className="h-5 w-5" />,
      description: "Visa, Mastercard, RuPay",
      popular: false,
    },
    {
      id: "netbanking" as PaymentMethod,
      name: "Net Banking",
      icon: <Building2 className="h-5 w-5" />,
      description: "All major banks supported",
      popular: false,
    },
    {
      id: "wallet" as PaymentMethod,
      name: "Digital Wallet",
      icon: <Wallet className="h-5 w-5" />,
      description: "Paytm, PhonePe, Google Pay",
      popular: false,
    },
  ]

  const validatePayment = () => {
    setError("")

    switch (paymentMethod) {
      case "upi":
        if (!upiId.trim()) {
          setError("Please enter UPI ID")
          return false
        }
        if (!upiId.includes("@")) {
          setError("Please enter a valid UPI ID")
          return false
        }
        break
      case "card":
        if (!cardNumber.trim() || cardNumber.length < 16) {
          setError("Please enter valid card number")
          return false
        }
        if (!expiryDate.trim() || !cvv.trim() || !cardName.trim()) {
          setError("Please fill all card details")
          return false
        }
        break
      case "netbanking":
        // For demo, no validation needed
        break
      case "wallet":
        // For demo, no validation needed
        break
    }

    return true
  }

  const handlePayment = async () => {
    if (!validatePayment()) return

    setIsProcessing(true)
    setError("")

    // Simulate payment processing
    setTimeout(() => {
      // Demo: 90% success rate
      const isSuccess = Math.random() > 0.1

      if (isSuccess) {
        const paymentData: PaymentData = {
          paymentId: `PAY_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          amount,
          paymentMethod: paymentMethods.find((m) => m.id === paymentMethod)?.name || paymentMethod,
          status: "success",
          timestamp: new Date().toISOString(),
        }

        console.log("[v0] Payment successful:", paymentData)
        onSuccess(paymentData)
      } else {
        setError("Payment failed. Please try again.")
        setIsProcessing(false)
      }
    }, 3000) // 3 second processing time
  }

  const formatCardNumber = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    const matches = v.match(/\d{4,16}/g)
    const match = (matches && matches[0]) || ""
    const parts = []

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4))
    }

    if (parts.length) {
      return parts.join(" ")
    } else {
      return v
    }
  }

  const formatExpiryDate = (value: string) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "")
    if (v.length >= 2) {
      return `${v.substring(0, 2)}/${v.substring(2, 4)}`
    }
    return v
  }

  return (
    <div className="w-full max-w-4xl mx-auto">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Payment Methods & Form */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-green-600" />
                Secure Payment
              </CardTitle>
              <CardDescription>Your payment information is encrypted and secure</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Payment Method Selection */}
              <div className="space-y-4">
                <Label className="text-base font-medium">Choose Payment Method</Label>
                <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                  {paymentMethods.map((method) => (
                    <div
                      key={method.id}
                      className="flex items-center space-x-3 p-4 border rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <RadioGroupItem value={method.id} id={method.id} />
                      <div className="flex items-center gap-3 flex-1">
                        {method.icon}
                        <div>
                          <Label htmlFor={method.id} className="cursor-pointer font-medium">
                            {method.name}
                            {method.popular && (
                              <span className="ml-2 text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full">
                                Popular
                              </span>
                            )}
                          </Label>
                          <p className="text-sm text-muted-foreground">{method.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>

              <Separator />

              {/* Payment Forms */}
              <div className="space-y-4">
                {paymentMethod === "upi" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="upiId">UPI ID</Label>
                      <Input
                        id="upiId"
                        value={upiId}
                        onChange={(e) => setUpiId(e.target.value)}
                        placeholder="yourname@paytm"
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Demo Mode: Use any UPI ID format (e.g., demo@paytm)
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "card" && (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          value={expiryDate}
                          onChange={(e) => setExpiryDate(formatExpiryDate(e.target.value))}
                          placeholder="MM/YY"
                          maxLength={5}
                          disabled={isProcessing}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          value={cvv}
                          onChange={(e) => setCvv(e.target.value.replace(/\D/g, ""))}
                          placeholder="123"
                          maxLength={4}
                          disabled={isProcessing}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cardName">Cardholder Name</Label>
                      <Input
                        id="cardName"
                        value={cardName}
                        onChange={(e) => setCardName(e.target.value)}
                        placeholder="Name as on card"
                        disabled={isProcessing}
                      />
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Demo Mode: Use any card details (e.g., 4111 1111 1111 1111)
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "netbanking" && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Building2 className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">Select Your Bank</p>
                      <p className="text-sm text-muted-foreground">You will be redirected to your bank's website</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Demo Mode: Payment will be processed automatically
                      </p>
                    </div>
                  </div>
                )}

                {paymentMethod === "wallet" && (
                  <div className="space-y-4">
                    <div className="p-4 border rounded-lg text-center">
                      <Wallet className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
                      <p className="font-medium">Choose Wallet</p>
                      <p className="text-sm text-muted-foreground">Select your preferred digital wallet</p>
                    </div>
                    <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
                      <p className="text-sm text-blue-700">
                        <CheckCircle className="h-4 w-4 inline mr-1" />
                        Demo Mode: Payment will be processed automatically
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-red-600" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Action Buttons */}
              <div className="flex gap-4 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onBack}
                  disabled={isProcessing}
                  className="flex-1 bg-transparent"
                >
                  Back
                </Button>
                <Button onClick={handlePayment} disabled={isProcessing} className="flex-1">
                  {isProcessing ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    <>
                      Pay <IndianRupee className="h-4 w-4 ml-1" />
                      {amount}
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle className="text-lg">Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Service:</span>
                  <span className="font-medium">{serviceDetails.serviceName}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Type:</span>
                  <span>{serviceDetails.subServiceName}</span>
                </div>
                {serviceDetails.capacity && (
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Capacity:</span>
                    <span>{serviceDetails.capacity}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Duration:</span>
                  <span className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {serviceDetails.estimatedTime}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                {serviceDetails.amount > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Service Charges:</span>
                    <span>
                      <IndianRupee className="h-3 w-3 inline" />
                      {serviceDetails.amount}
                    </span>
                  </div>
                )}
                {serviceDetails.visitingCharges > 0 && (
                  <div className="flex justify-between text-sm">
                    <span>Visiting Charges:</span>
                    <span>
                      <IndianRupee className="h-3 w-3 inline" />
                      {serviceDetails.visitingCharges}
                    </span>
                  </div>
                )}
                <div className="flex justify-between font-semibold text-base border-t pt-2">
                  <span>Total Amount:</span>
                  <span className="text-primary">
                    <IndianRupee className="h-4 w-4 inline" />
                    {amount}
                  </span>
                </div>
              </div>

              <Separator />

              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-center gap-2">
                  <Shield className="h-3 w-3 text-green-600" />
                  <span>100% Secure Payment</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="h-3 w-3 text-green-600" />
                  <span>Instant Booking Confirmation</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
