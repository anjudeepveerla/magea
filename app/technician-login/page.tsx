"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useTechnician } from "@/contexts/technician-context"

export default function TechnicianLoginPage() {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [error, setError] = useState("")
	const router = useRouter()
	const { loginTechnician } = useTechnician()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		const ok = loginTechnician(email, password)
		if (ok) {
			router.push("/technician-dashboard")
			return
		}
		setError("Invalid credentials. Use tech@maega.com / demo123")
	}

	return (
		<div className="min-h-screen bg-background pt-24">
			<div className="container mx-auto px-4">
				<Card className="max-w-md mx-auto border-0 shadow-md">
					<CardHeader>
						<CardTitle>Technician Login</CardTitle>
						<CardDescription>Demo Login: tech@maega.com / demo123</CardDescription>
					</CardHeader>
					<CardContent>
						<form onSubmit={handleSubmit} className="space-y-4">
							<div className="space-y-2">
								<Label>Email</Label>
								<Input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="tech@maega.com" />
							</div>
							<div className="space-y-2">
								<Label>Password</Label>
								<Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="demo123" />
							</div>
							{error && <p className="text-sm text-red-600">{error}</p>}
							<Button type="submit" className="w-full">Login</Button>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	)
}
