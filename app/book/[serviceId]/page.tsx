"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import CustomerDetailsForm, { type CustomerFormData } from "@/components/booking/customer-details-form"
import OTPVerification from "@/components/booking/otp-verification"
import ServiceSelection from "@/components/booking/service-selection"
import PaymentGateway from "@/components/booking/payment-gateway"
import BookingConfirmation from "@/components/booking/booking-confirmation"

type BookingStep = "customer-details" | "otp-verification" | "service-selection" | "payment" | "confirmation"

interface BookingData {
  customer: CustomerFormData | null
  service: any | null
  payment: any | null
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const serviceId = params.serviceId as string

  const [currentStep, setCurrentStep] = useState<BookingStep>("customer-details")
  const [bookingData, setBookingData] = useState<BookingData>({
    customer: null,
    service: null,
    payment: null,
  })

  const handleCustomerDetailsSubmit = async (customerData: CustomerFormData) => {
    setBookingData((prev) => ({ ...prev, customer: customerData }))

    // Simulate OTP sending
    console.log("[v0] Sending OTP to:", customerData.mobile, customerData.email)

    setCurrentStep("otp-verification")
  }

  const handleOTPVerification = async (otp: string) => {
    // Simulate OTP verification
    console.log("[v0] Verifying OTP:", otp)

    // Mock verification success
    setTimeout(() => {
      setCurrentStep("service-selection")
    }, 1000)
  }

  const handleServiceSelection = (serviceData: any) => {
    setBookingData((prev) => ({ ...prev, service: serviceData }))

    if (serviceData.hasCharges) {
      setCurrentStep("payment")
    } else {
      // Free service, skip payment
      setCurrentStep("confirmation")
    }
  }

  const handlePaymentSuccess = (paymentData: any) => {
    setBookingData((prev) => ({ ...prev, payment: paymentData }))
    setCurrentStep("confirmation")
  }

  const handleBackToServices = () => {
    router.push("/services")
  }

  return (
    <div className="min-h-screen bg-background pt-20 pb-10">
      <div className="container mx-auto px-4">
        {/* Progress Indicator */}
        <div className="max-w-4xl mx-auto mb-8">
          <div className="flex items-center justify-between">
            {["Details", "Verify", "Service", "Payment", "Confirm"].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    index <=
                    ["customer-details", "otp-verification", "service-selection", "payment", "confirmation"].indexOf(
                      currentStep,
                    )
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted text-muted-foreground"
                  }`}
                >
                  {index + 1}
                </div>
                <span className="ml-2 text-sm font-medium hidden sm:block">{step}</span>
                {index < 4 && <div className="w-8 h-0.5 bg-muted mx-4 hidden sm:block" />}
              </div>
            ))}
          </div>
        </div>

        {/* Step Content */}
        <div className="max-w-4xl mx-auto">
          {currentStep === "customer-details" && (
            <CustomerDetailsForm onSubmit={handleCustomerDetailsSubmit} onBack={handleBackToServices} />
          )}

          {currentStep === "otp-verification" && bookingData.customer && (
            <OTPVerification
              mobile={bookingData.customer.mobile}
              email={bookingData.customer.email}
              onVerify={handleOTPVerification}
              onBack={() => setCurrentStep("customer-details")}
            />
          )}

          {currentStep === "service-selection" && (
            <ServiceSelection
              serviceId={serviceId}
              onSubmit={handleServiceSelection}
              onBack={() => setCurrentStep("otp-verification")}
            />
          )}

          {currentStep === "payment" && bookingData.service && (
            <PaymentGateway
              amount={bookingData.service.amount}
              serviceDetails={bookingData.service}
              customerDetails={bookingData.customer}
              onSuccess={handlePaymentSuccess}
              onBack={() => setCurrentStep("service-selection")}
            />
          )}

          {currentStep === "confirmation" && (
            <BookingConfirmation bookingData={bookingData} onNewBooking={handleBackToServices} />
          )}
        </div>
      </div>
    </div>
  )
}
