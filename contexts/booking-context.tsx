"use client"

import { createContext, useContext, useState, ReactNode } from "react"

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
  inspectionCharge?: number
  createdAt: string
}

type User = {
  name: string
  email: string
  phone: string
  address: string
  joinDate: string
}

type BookingContextType = {
  bookings: Booking[]
  user: User
  addBooking: (booking: Omit<Booking, 'id' | 'createdAt'>) => void
  updateBookingStatus: (id: string, status: Booking['status']) => void
  rateBooking: (id: string, rating: number) => void
  cancelBooking: (id: string) => void
  rescheduleBooking: (id: string, newDate: string, newTime: string) => void
  getBookingById: (id: string) => Booking | undefined
  getUpcomingBookings: () => Booking[]
  getCompletedBookings: () => Booking[]
}

const BookingContext = createContext<BookingContextType | undefined>(undefined)

export function BookingProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+91 98765 43210",
    address: "123 Main Street, Hyderabad, Telangana 500001",
    joinDate: "January 2024",
  })

  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "MAEGA-001234",
      service: "AC Services",
      subService: "Blower Services",
      date: "2024-01-15",
      time: "10:00 AM",
      status: "completed",
      technician: "Mike Johnson",
      rating: 5,
      amount: 1050,
      address: "123 Main Street, Hyderabad",
      phone: "+91 98765 43210",
      inspectionCharge: 450,
      createdAt: "2024-01-10T10:00:00Z",
    },
    {
      id: "MAEGA-001235",
      service: "Refrigerator Services",
      subService: "Deep Freezer Repair",
      date: "2024-01-20",
      time: "2:00 PM",
      status: "in-progress",
      technician: "Sarah Wilson",
      amount: 550,
      address: "123 Main Street, Hyderabad",
      phone: "+91 98765 43210",
      createdAt: "2024-01-15T14:00:00Z",
    },
    {
      id: "MAEGA-001236",
      service: "AC Services",
      subService: "Window AC Installation",
      date: "2024-01-25",
      time: "11:00 AM",
      status: "scheduled",
      technician: "David Brown",
      amount: 2500,
      address: "123 Main Street, Hyderabad",
      phone: "+91 98765 43210",
      createdAt: "2024-01-20T11:00:00Z",
    },
  ])

  const addBooking = (bookingData: Omit<Booking, 'id' | 'createdAt'>) => {
    const newBooking: Booking = {
      ...bookingData,
      id: `MAEGA-${Date.now().toString().slice(-6)}`,
      createdAt: new Date().toISOString(),
    }
    setBookings(prev => [newBooking, ...prev])
  }

  const updateBookingStatus = (id: string, status: Booking['status']) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    )
  }

  const rateBooking = (id: string, rating: number) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, rating } : booking
      )
    )
  }

  const cancelBooking = (id: string) => {
    updateBookingStatus(id, "cancelled")
  }

  const rescheduleBooking = (id: string, newDate: string, newTime: string) => {
    setBookings(prev => 
      prev.map(booking => 
        booking.id === id ? { ...booking, date: newDate, time: newTime } : booking
      )
    )
  }

  const getBookingById = (id: string) => {
    return bookings.find(booking => booking.id === id)
  }

  const getUpcomingBookings = () => {
    return bookings.filter(booking => 
      booking.status === "scheduled" || booking.status === "in-progress"
    )
  }

  const getCompletedBookings = () => {
    return bookings.filter(booking => booking.status === "completed")
  }

  return (
    <BookingContext.Provider
      value={{
        bookings,
        user,
        addBooking,
        updateBookingStatus,
        rateBooking,
        cancelBooking,
        rescheduleBooking,
        getBookingById,
        getUpcomingBookings,
        getCompletedBookings,
      }}
    >
      {children}
    </BookingContext.Provider>
  )
}

export function useBooking() {
  const context = useContext(BookingContext)
  if (context === undefined) {
    throw new Error("useBooking must be used within a BookingProvider")
  }
  return context
}
