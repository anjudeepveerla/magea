// app/signup/page.jsx
"use client"
export const dynamic = "force-dynamic"

import type React from "react"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Eye, EyeOff, ArrowLeft, Check, X, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

export default function SignupPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [currentStep, setCurrentStep] = useState(1) // 1: Form, 2: Email OTP, 3: Phone OTP, 4: Complete
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  })

  const [verification, setVerification] = useState({
    emailOtp: "",
    phoneOtp: "",
    emailVerified: false,
    phoneVerified: false,
    emailSent: false,
    phoneSent: false
  })

  const [otpCountdown, setOtpCountdown] = useState({
    email: 0,
    phone: 0
  })

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 5000)
  }

  const validateForm = () => {
    if (!formData.firstName.trim()) {
      showMessage('error', 'First name is required')
      return false
    }
    if (!formData.lastName.trim()) {
      showMessage('error', 'Last name is required')
      return false
    }
    if (!formData.email.trim()) {
      showMessage('error', 'Email is required')
      return false
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      showMessage('error', 'Please enter a valid email address')
      return false
    }
    if (!formData.phone.trim()) {
      showMessage('error', 'Phone number is required')
      return false
    }
    if (formData.password.length < 6) {
      showMessage('error', 'Password must be at least 6 characters long')
      return false
    }
    if (formData.password !== formData.confirmPassword) {
      showMessage('error', 'Passwords do not match')
      return false
    }
    return true
  }

  const sendOTP = async (type) => {
    const identifier = type === 'email' ? formData.email : formData.phone
    setLoading(true)

    try {
      const response = await fetch('/api/auth/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, type }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerification(prev => ({
          ...prev,
          [type === 'email' ? 'emailSent' : 'phoneSent']: true
        }))
        showMessage('success', `OTP sent to your ${type}`)
        
        // Start countdown
        setOtpCountdown(prev => ({ ...prev, [type]: 60 }))
        const timer = setInterval(() => {
          setOtpCountdown(prev => {
            const newCount = prev[type] - 1
            if (newCount <= 0) {
              clearInterval(timer)
              return { ...prev, [type]: 0 }
            }
            return { ...prev, [type]: newCount }
          })
        }, 1000)
        
      } else {
        showMessage('error', data.message || `Failed to send ${type} OTP`)
      }
    } catch (error) {
      showMessage('error', `Error sending ${type} OTP`)
    } finally {
      setLoading(false)
    }
  }

  const verifyOTP = async (type) => {
    const identifier = type === 'email' ? formData.email : formData.phone
    const otpCode = type === 'email' ? verification.emailOtp : verification.phoneOtp
    
    if (!otpCode || otpCode.length !== 6) {
      showMessage('error', 'Please enter a valid 6-digit OTP')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/auth/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ identifier, otpCode, type }),
      })

      const data = await response.json()

      if (response.ok) {
        setVerification(prev => ({
          ...prev,
          [type === 'email' ? 'emailVerified' : 'phoneVerified']: true
        }))
        showMessage('success', `${type.charAt(0).toUpperCase() + type.slice(1)} verified successfully`)
        
        // Move to next step or final signup
        if (type === 'email' && !verification.phoneVerified) {
          setCurrentStep(3) // Move to phone verification
        } else if (verification.emailVerified && verification.phoneVerified) {
          handleFinalSignup()
        }
      } else {
        showMessage('error', data.message || `${type} verification failed`)
      }
    } catch (error) {
      showMessage('error', `Error verifying ${type} OTP`)
    } finally {
      setLoading(false)
    }
  }

  const handleInitialSubmit = (e) => {
    e.preventDefault()
    if (validateForm()) {
      setCurrentStep(2)
      sendOTP('email')
    }
  }

  const handleFinalSignup = async () => {
    setLoading(true)

    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          emailVerified: verification.emailVerified,
          phoneVerified: verification.phoneVerified
        }),
      })

      const data = await response.json()

      if (response.ok) {
        setCurrentStep(4)
        showMessage('success', 'Account created successfully!')
      } else {
        showMessage('error', data.message || 'Signup failed')
      }
    } catch (error) {
      showMessage('error', 'Error creating account')
    } finally {
      setLoading(false)
    }
  }

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <form onSubmit={handleInitialSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  required
                  className="h-12"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email Address</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">Phone Number</Label>
              <Input
                id="phone"
                type="tel"
                placeholder="Enter your phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                required
                className="h-12"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Create a password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  required
                  className="h-12 pr-12"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                >
                  {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex items-start space-x-2">
              <input type="checkbox" id="terms" className="mt-1" required />
              <label htmlFor="terms" className="text-sm text-gray-600">
                I agree to the{" "}
                <Link href="/terms" className="text-blue-600 hover:text-blue-700">
                  Terms of Service
                </Link>{" "}
                and{" "}
                <Link href="/privacy" className="text-blue-600 hover:text-blue-700">
                  Privacy Policy
                </Link>
              </label>
            </div>

            <Button type="submit" className="w-full h-12 bg-blue-600 hover:bg-blue-700" disabled={loading}>
              {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
              Continue to Verification
            </Button>
          </form>
        )

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <h3 className="text-lg font-semibold mb-2">Verify Email Address</h3>
              <p className="text-gray-600">We've sent a verification code to:</p>
              <p className="font-semibold text-blue-600">{formData.email}</p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="emailOtp">Enter 6-digit code</Label>
                <Input
                  id="emailOtp"
                  placeholder="000000"
                  value={verification.emailOtp}
                  onChange={(e) => setVerification({ ...verification, emailOtp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                  className="h-12 text-center text-2xl tracking-widest"
                  maxLength={6}
                />
              </div>

              <Button 
                onClick={() => verifyOTP('email')} 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={loading || verification.emailOtp.length !== 6}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                Verify Email
              </Button>

              <div className="text-center">
                <Button
                  variant="ghost"
                  onClick={() => sendOTP('email')}
                  disabled={otpCountdown.email > 0 || loading}
                >
                  {otpCountdown.email > 0 ? `Resend in ${otpCountdown.email}s` : 'Resend Code'}
                </Button>
              </div>
            </div>
          </div>
        )

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center">
              <div className="flex items-center justify-center mb-4">
                <Check className="w-6 h-6 text-green-600 mr-2" />
                <span className="text-green-600 font-semibold">Email Verified</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Verify Phone Number</h3>
              <p className="text-gray-600">We'll send a verification code to:</p>
              <p className="font-semibold text-blue-600">{formData.phone}</p>
            </div>

            <div className="space-y-4">
              <Button 
                onClick={() => sendOTP('phone')} 
                className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                disabled={loading || verification.phoneSent}
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                {verification.phoneSent ? 'Code Sent' : 'Send SMS Code'}
              </Button>

              {verification.phoneSent && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="phoneOtp">Enter 6-digit code</Label>
                    <Input
                      id="phoneOtp"
                      placeholder="000000"
                      value={verification.phoneOtp}
                      onChange={(e) => setVerification({ ...verification, phoneOtp: e.target.value.replace(/\D/g, '').slice(0, 6) })}
                      className="h-12 text-center text-2xl tracking-widest"
                      maxLength={6}
                    />
                  </div>

                  <Button 
                    onClick={() => verifyOTP('phone')} 
                    className="w-full h-12 bg-blue-600 hover:bg-blue-700"
                    disabled={loading || verification.phoneOtp.length !== 6}
                  >
                    {loading ? <Loader2 className="w-5 h-5 animate-spin mr-2" /> : null}
                    Verify Phone
                  </Button>

                  <div className="text-center">
                    <Button
                      variant="ghost"
                      onClick={() => sendOTP('phone')}
                      disabled={otpCountdown.phone > 0 || loading}
                    >
                      {otpCountdown.phone > 0 ? `Resend in ${otpCountdown.phone}s` : 'Resend Code'}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        )

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <Check className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Account Created Successfully!</h3>
              <p className="text-gray-600">Welcome to MAEGA, {formData.firstName}!</p>
            </div>
            <Button asChild className="w-full h-12 bg-blue-600 hover:bg-blue-700">
              <Link href="/login">Continue to Login</Link>
            </Button>
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="mb-6">
          <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-700 transition-colors">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </Link>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-xl">M</span>
              </div>
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {currentStep === 4 ? 'Welcome!' : 'Create Account'}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {currentStep === 1 && 'Join MAEGA for reliable home services'}
              {currentStep === 2 && 'Step 1 of 2: Email Verification'}
              {currentStep === 3 && 'Step 2 of 2: Phone Verification'}
              {currentStep === 4 && 'Your account has been created successfully'}
            </CardDescription>
            
            {/* Progress indicator */}
            {currentStep < 4 && (
              <div className="flex justify-center mt-4">
                <div className="flex space-x-2">
                  <div className={`w-3 h-3 rounded-full ${currentStep >= 1 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${currentStep >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                  <div className={`w-3 h-3 rounded-full ${currentStep >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`} />
                </div>
              </div>
            )}
          </CardHeader>

          <CardContent>
            {message.text && (
              <Alert className={`mb-4 ${message.type === 'error' ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
                <AlertDescription className={message.type === 'error' ? 'text-red-700' : 'text-green-700'}>
                  {message.text}
                </AlertDescription>
              </Alert>
            )}

            {renderStepContent()}

            {currentStep === 1 && (
              <div className="mt-6 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link href="/login" className="text-blue-600 hover:text-blue-700 font-medium">
                    Sign in
                  </Link>
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}