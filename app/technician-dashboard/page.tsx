"use client"
export const dynamic = "force-dynamic"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { useTechnician } from "@/contexts/technician-context"
import { Calendar, CheckCircle, CircleDollarSign, LogOut, User } from "lucide-react"
import { useRouter } from "next/navigation"

export default function TechnicianDashboardPage() {
	const { technician, techBookings, updateBookingStatus, monthlyEarnings, completedCount, activeCount, logoutTechnician } = useTechnician()
	const [tab, setTab] = useState<"dashboard" | "bookings" | "earnings" | "profile">("dashboard")
	const router = useRouter()

	const handleLogout = () => {
		logoutTechnician()
		router.push("/")
	}

	const tag = (status: string) => {
		switch (status) {
			case "completed":
				return <Badge className="bg-green-100 text-green-800 border-green-200">Completed</Badge>
			case "accepted":
				return <Badge className="bg-blue-100 text-blue-800 border-blue-200">Accepted</Badge>
			case "in-progress":
				return <Badge className="bg-amber-100 text-amber-800 border-amber-200">In Progress</Badge>
			case "cancelled":
				return <Badge className="bg-red-100 text-red-800 border-red-200">Cancelled</Badge>
			default:
				return <Badge className="bg-gray-100 text-gray-800 border-gray-200">Pending</Badge>
		}
	}

  return (
    <div className="min-h-screen bg-background">
      {/* Custom header for technician dashboard */}
      <header className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/technician-dashboard" className="flex items-center space-x-3">
            <img
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-hzPhiTcquwE6NDH7GuUV1CBffal9ao.png"
              alt="MAEGA logo"
              className="h-11 md:h-12 w-auto"
            />
          </Link>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-muted-foreground">Welcome, {technician?.name || "Technician"}</span>
             <Button variant="outline" size="sm" onClick={handleLogout}>
               <LogOut className="w-4 h-4 mr-2" />
               Logout
             </Button>
          </div>
        </div>
      </header>
      
      <div className="pt-8">
            <div className="container mx-auto px-4">
                {/* Use 1 column on mobile, 4 cols on md+ for better alignment */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
					{/* Sidebar */}
					<div className="md:col-span-1 space-y-2">
						<Card className="border-0 shadow-md">
							<CardHeader>
								<CardTitle>Pro Panel</CardTitle>
							</CardHeader>
							<CardContent className="space-y-2">
								<Button variant={tab === "dashboard" ? "default" : "outline"} className="w-full justify-start" onClick={() => setTab("dashboard")}>Dashboard</Button>
								<Button variant={tab === "bookings" ? "default" : "outline"} className="w-full justify-start" onClick={() => setTab("bookings")}>My Bookings</Button>
								<Button variant={tab === "earnings" ? "default" : "outline"} className="w-full justify-start" onClick={() => setTab("earnings")}>Earnings</Button>
								<Button variant={tab === "profile" ? "default" : "outline"} className="w-full justify-start" onClick={() => setTab("profile")}>Profile</Button>
								<Button variant="outline" className="w-full justify-start" onClick={handleLogout}><LogOut className="h-4 w-4 mr-2"/>Logout</Button>
							</CardContent>
						</Card>
					</div>

					{/* Main */}
                    <div className="md:col-span-3 space-y-6">
						{tab === "dashboard" && (
							<>
								<h2 className="text-2xl font-heading font-bold">Hi, {technician?.name || "Technician"} 👋</h2>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
									<Card className="border-0 shadow-md">
										<CardContent className="p-6 flex items-center justify-between">
											<div>
												<div className="text-sm text-muted-foreground">Active Jobs</div>
												<div className="text-3xl font-bold">{activeCount}</div>
											</div>
											<Calendar className="h-6 w-6 text-primary"/>
										</CardContent>
									</Card>
									<Card className="border-0 shadow-md">
										<CardContent className="p-6 flex items-center justify-between">
											<div>
												<div className="text-sm text-muted-foreground">Completed</div>
												<div className="text-3xl font-bold">{completedCount}</div>
											</div>
											<CheckCircle className="h-6 w-6 text-green-600"/>
										</CardContent>
									</Card>
									<Card className="border-0 shadow-md">
										<CardContent className="p-6 flex items-center justify-between">
											<div>
												<div className="text-sm text-muted-foreground">Monthly Earnings</div>
												<div className="text-3xl font-bold">₹{monthlyEarnings.toLocaleString("en-IN")}</div>
											</div>
											<CircleDollarSign className="h-6 w-6 text-emerald-600"/>
										</CardContent>
									</Card>
								</div>
							</>
						)}

						{tab === "bookings" && (
							<Card className="border-0 shadow-md">
								<CardHeader>
									<CardTitle>My Bookings</CardTitle>
								</CardHeader>
                                <CardContent>
                                    <div className="overflow-x-auto">
                                        <table className="w-full text-sm min-w-[600px]">
											<thead>
												<tr className="text-left text-muted-foreground">
													<th className="py-2">Booking ID</th>
													<th className="py-2">Customer</th>
													<th className="py-2">Service Type</th>
													<th className="py-2">Date</th>
													<th className="py-2">Status</th>
													<th className="py-2">Action</th>
												</tr>
											</thead>
											<tbody>
												{techBookings.map((b) => (
													<tr key={b.id} className="border-t">
														<td className="py-2">{b.id}</td>
														<td className="py-2">{b.customer}</td>
														<td className="py-2">{b.serviceType}</td>
														<td className="py-2">{b.date} {b.time}</td>
														<td className="py-2">{tag(b.status)}</td>
														<td className="py-2 space-x-2">
															<Button size="sm" variant="outline" onClick={() => updateBookingStatus(b.id, "accepted")}>Accept</Button>
															<Button size="sm" variant="outline" onClick={() => updateBookingStatus(b.id, "in-progress")}>Start</Button>
															<Button size="sm" variant="outline" onClick={() => updateBookingStatus(b.id, "completed")}>Complete</Button>
															<Button size="sm" variant="outline" className="text-red-600" onClick={() => updateBookingStatus(b.id, "cancelled")}>Cancel</Button>
														</td>
													</tr>
												))}
											</tbody>
										</table>
									</div>
								</CardContent>
							</Card>
						)}

						{tab === "earnings" && (
							<Card className="border-0 shadow-md">
								<CardHeader>
									<CardTitle>Earnings</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="text-lg">Total Completed: <strong>{completedCount}</strong></div>
									<div className="text-lg">This Month: <strong>₹{monthlyEarnings.toLocaleString("en-IN")}</strong></div>
									<Separator />
									<div className="text-sm text-muted-foreground">Detailed payouts integration can be added here.</div>
								</CardContent>
							</Card>
						)}

						{tab === "profile" && (
							<Card className="border-0 shadow-md">
								<CardHeader>
									<CardTitle>Profile</CardTitle>
								</CardHeader>
								<CardContent className="space-y-4">
									<div className="grid sm:grid-cols-2 gap-3">
										<div>
											<label className="text-sm">Name</label>
											<InputLike value={technician?.name || ""} />
										</div>
										<div>
											<label className="text-sm">Email</label>
											<InputLike value={technician?.email || ""} />
										</div>
									</div>
									<div className="text-sm text-muted-foreground">Service categories, city and payout details can be editable here.</div>
								</CardContent>
							</Card>
						)}
					</div>
        </div>
      </div>
      </div>
    </div>
  )
}

function InputLike({ value }: { value: string }) {
	return (
		<div className="p-2 rounded-md border bg-muted/50 text-sm">{value}</div>
	)
}
