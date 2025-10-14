"use client"
export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import {
  Calendar,
  Clock,
  MapPin,
  Phone,
  Mail,
  User,
  Settings,
  LogOut,
  CheckCircle,
  AlertCircle,
  Wrench,
  Star,
  Plus,
  Search,
  Filter,
  Download,
  MessageCircle,
  Truck,
  Home,
  Bell,
  Shield,
  CreditCard,
} from "lucide-react"
import { useBooking } from "@/contexts/booking-context"

type Booking = {
  id: string
  service: string
  subService: string
  date: string
  time: string
  status: "completed" | "in-progress" | "scheduled" | "cancelled"
  technician: string
  rating?: number
  amount: number
  address: string
  phone: string
}

export default function DashboardPage() {
  const { bookings, user, cancelBooking, rescheduleBooking } = useBooking()

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800 border-green-200"
      case "in-progress":
        return "bg-blue-100 text-blue-800 border-blue-200"
      case "scheduled":
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
      case "cancelled":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-gray-100 text-gray-800 border-gray-200"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />
      case "in-progress":
        return <Wrench className="w-4 h-4" />
      case "scheduled":
        return <Clock className="w-4 h-4" />
      case "cancelled":
        return <AlertCircle className="w-4 h-4" />
      default:
        return <AlertCircle className="w-4 h-4" />
    }
  }

  const formatCurrency = (amount: number) => `₹${amount.toLocaleString("en-IN")}`

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground mt-2">Manage your bookings and account settings</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Bookings</p>
                  <p className="text-3xl font-bold text-foreground">{bookings.length}</p>
                </div>
                <Calendar className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-3xl font-bold text-green-600">
                    {bookings.filter((b) => b.status === "completed").length}
                  </p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Upcoming</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {bookings.filter((b) => b.status === "scheduled").length}
                  </p>
                </div>
                <Clock className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-0 shadow-md">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Spent</p>
                  <p className="text-3xl font-bold text-foreground">
                    {formatCurrency(bookings.reduce((sum, b) => sum + b.amount, 0))}
                  </p>
                </div>
                <CreditCard className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="bookings" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 lg:w-96">
            <TabsTrigger value="bookings">My Bookings</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          <TabsContent value="bookings" className="space-y-6">
            {/* Quick Actions */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button className="bg-primary hover:bg-primary/90" asChild>
                <Link href="/services">
                  <Plus className="w-4 h-4 mr-2" />
                  Book New Service
                </Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/cart">
                  <Truck className="w-4 h-4 mr-2" />
                  View Cart
                </Link>
              </Button>
            </div>

            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                <Input placeholder="Search bookings..." className="pl-10" />
              </div>
              <Button variant="outline">
                <Filter className="w-4 h-4 mr-2" />
                Filter
              </Button>
            </div>

            {/* Bookings List */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">Recent Bookings</h2>
              {bookings.map((booking) => (
                <Card key={booking.id} className="border-0 shadow-md">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h3 className="text-lg font-semibold text-foreground">{booking.service}</h3>
                          <Badge className={`${getStatusColor(booking.status)} border`}>
                            {getStatusIcon(booking.status)}
                            <span className="ml-1 capitalize">{booking.status.replace("-", " ")}</span>
                          </Badge>
                        </div>

                        <p className="text-muted-foreground mb-3">{booking.subService}</p>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm text-muted-foreground mb-4">
                          <div className="flex items-center">
                            <Calendar className="w-4 h-4 mr-2" />
                            {new Date(booking.date).toLocaleDateString("en-IN", {
                              day: "numeric",
                              month: "short",
                              year: "numeric",
                            })}
                          </div>
                          <div className="flex items-center">
                            <Clock className="w-4 h-4 mr-2" />
                            {booking.time}
                          </div>
                          <div className="flex items-center">
                            <User className="w-4 h-4 mr-2" />
                            {booking.technician}
                          </div>
                          <div className="flex items-center">
                            <MapPin className="w-4 h-4 mr-2" />
                            {booking.address}
                          </div>
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-4">
                            <span className="text-lg font-semibold text-foreground">
                              {formatCurrency(booking.amount)}
                            </span>
                            {booking.rating && (
                              <div className="flex items-center">
                                <span className="text-sm text-muted-foreground mr-2">Your Rating:</span>
                                <div className="flex">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      className={`w-4 h-4 ${
                                        i < booking.rating! ? "text-yellow-400 fill-current" : "text-gray-300"
                                      }`}
                                    />
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="text-right ml-6">
                        <p className="text-sm font-medium text-foreground mb-2">Booking ID: {booking.id}</p>
                        <div className="flex flex-col space-y-2">
                          {booking.status === "scheduled" && (
                            <>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => {
                                  // In a real app, this would open a reschedule modal
                                  const newDate = prompt("Enter new date (YYYY-MM-DD):")
                                  const newTime = prompt("Enter new time (e.g., 2:00 PM):")
                                  if (newDate && newTime) {
                                    rescheduleBooking(booking.id, newDate, newTime)
                                  }
                                }}
                              >
                                Reschedule
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline" 
                                className="text-red-600 hover:text-red-700"
                                onClick={() => {
                                  if (confirm("Are you sure you want to cancel this booking?")) {
                                    cancelBooking(booking.id)
                                  }
                                }}
                              >
                                Cancel
                              </Button>
                            </>
                          )}
                          {booking.status === "in-progress" && (
                            <Button size="sm" variant="outline">
                              <MessageCircle className="w-4 h-4 mr-2" />
                              Contact Technician
                            </Button>
                          )}
                          {booking.status === "completed" && (
                            <Button size="sm" variant="outline">
                              <Download className="w-4 h-4 mr-2" />
                              Download Receipt
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Update your personal information and contact details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <User className="w-5 h-5 text-muted-foreground mr-3" />
                      <span className="text-foreground">{user.name}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Mail className="w-5 h-5 text-muted-foreground mr-3" />
                      <span className="text-foreground">{user.email}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone</Label>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <Phone className="w-5 h-5 text-muted-foreground mr-3" />
                      <span className="text-foreground">{user.phone}</span>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <div className="flex items-center p-3 bg-muted/50 rounded-lg">
                      <MapPin className="w-5 h-5 text-muted-foreground mr-3" />
                      <span className="text-foreground">{user.address}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium text-foreground">Member Since</h4>
                    <p className="text-sm text-muted-foreground">{user.joinDate}</p>
                  </div>
                  <Button className="bg-primary hover:bg-primary/90">Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>Manage how you receive updates about your bookings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Bell className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Email Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive booking updates via email</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <MessageCircle className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">SMS Notifications</h4>
                        <p className="text-sm text-muted-foreground">Receive booking updates via SMS</p>
                      </div>
                    </div>
                    <input type="checkbox" defaultChecked className="toggle" />
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Home className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Marketing Communications</h4>
                        <p className="text-sm text-muted-foreground">Receive promotional offers and updates</p>
                      </div>
                    </div>
                    <input type="checkbox" className="toggle" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card className="border-0 shadow-md">
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>Manage your account preferences and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Shield className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Two-Factor Authentication</h4>
                        <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Enable</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Settings className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Change Password</h4>
                        <p className="text-sm text-muted-foreground">Update your account password</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Change</Button>
                  </div>

                  <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <Download className="w-5 h-5 text-primary" />
                      <div>
                        <h4 className="font-medium text-foreground">Download Data</h4>
                        <p className="text-sm text-muted-foreground">Download a copy of your account data</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                </div>

                <Separator />

                <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
                  <h4 className="font-medium text-red-800 mb-2">Danger Zone</h4>
                  <p className="text-sm text-red-600 mb-4">
                    Once you delete your account, there is no going back. Please be certain.
                  </p>
                  <Button variant="destructive" size="sm">Delete Account</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}