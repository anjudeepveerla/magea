"use client"

import { createContext, useContext, useMemo, useState, ReactNode } from "react"

export type Technician = {
	name: string
	email: string
	role: "technician"
}

type TechBookingStatus = "pending" | "accepted" | "in-progress" | "completed" | "cancelled"

type TechBooking = {
	id: string
	customer: string
	serviceType: string
	subService?: string
	date: string
	time: string
	status: TechBookingStatus
	amount: number
}

type TechnicianContextType = {
	isTechAuthenticated: boolean
	technician: Technician | null
	techBookings: TechBooking[]
	monthlyEarnings: number
	completedCount: number
	activeCount: number
	loginTechnician: (email: string, password: string) => boolean
	logoutTechnician: () => void
	assignBooking: (booking: Omit<TechBooking, "status"> & { status?: TechBookingStatus }) => void
	updateBookingStatus: (id: string, status: TechBookingStatus) => void
}

const TechnicianContext = createContext<TechnicianContextType | undefined>(undefined)

export function TechnicianProvider({ children }: { children: ReactNode }) {
	const [technician, setTechnician] = useState<Technician | null>(null)
	const [techBookings, setTechBookings] = useState<TechBooking[]>([])

	const loginTechnician = (email: string, password: string) => {
		// Demo creds
		if (email === "tech@maega.com" && password === "demo123") {
			const t: Technician = { name: "Ravi Kumar", email, role: "technician" }
			setTechnician(t)
			if (typeof window !== "undefined") {
				localStorage.setItem("technicianData", JSON.stringify(t))
			}
			return true
		}
		return false
	}

	const logoutTechnician = () => {
		setTechnician(null)
		if (typeof window !== "undefined") {
			localStorage.removeItem("technicianData")
		}
	}

	const assignBooking = (booking: Omit<TechBooking, "status"> & { status?: TechBookingStatus }) => {
		setTechBookings(prev => [{ ...booking, status: booking.status ?? "pending" }, ...prev])
	}

	const updateBookingStatus = (id: string, status: TechBookingStatus) => {
		setTechBookings(prev => prev.map(b => (b.id === id ? { ...b, status } : b)))
	}

	const monthlyEarnings = useMemo(() => techBookings.filter(b => b.status === "completed").reduce((s, b) => s + b.amount, 0), [techBookings])
	const completedCount = useMemo(() => techBookings.filter(b => b.status === "completed").length, [techBookings])
	const activeCount = useMemo(() => techBookings.filter(b => b.status === "accepted" || b.status === "in-progress" || b.status === "pending").length, [techBookings])

	const value = useMemo<TechnicianContextType>(() => ({
		isTechAuthenticated: !!technician,
		technician,
		techBookings,
		monthlyEarnings,
		completedCount,
		activeCount,
		loginTechnician,
		logoutTechnician,
		assignBooking,
		updateBookingStatus,
	}), [technician, techBookings, monthlyEarnings, completedCount, activeCount])

	return <TechnicianContext.Provider value={value}>{children}</TechnicianContext.Provider>
}

export function useTechnician() {
	const ctx = useContext(TechnicianContext)
	if (!ctx) throw new Error("useTechnician must be used within a TechnicianProvider")
	return ctx
}
