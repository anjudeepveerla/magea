"use client"

import { createContext, useContext, useMemo, useState, ReactNode } from "react"

export type AuthUser = {
	name: string
	email: string
}

type AuthContextType = {
	isAuthenticated: boolean
	user: AuthUser | null
	login: (user: AuthUser) => void
	logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
	const [user, setUser] = useState<AuthUser | null>(null)

	const login = (u: AuthUser) => setUser(u)
	const logout = () => setUser(null)

	const value = useMemo<AuthContextType>(() => ({
		isAuthenticated: !!user,
		user,
		login,
		logout,
	}), [user])

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
	const ctx = useContext(AuthContext)
	if (!ctx) throw new Error("useAuth must be used within an AuthProvider")
	return ctx
}
