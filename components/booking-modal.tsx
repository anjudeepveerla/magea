"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar } from "@/components/ui/calendar";
import { X, Check, Clock, CreditCard, CheckCircle, LogIn, UserPlus } from "lucide-react";
import { useAuth } from "@/components/auth/AuthProvider";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  serviceName: string;
  preSelectedService?: string;
}

interface ServiceData {
  [key: string]: {
    name: string;
    subServices: { name: string }[];
  };
}

const serviceData: ServiceData = {
  "ac-services": {
    name: "AC Services",
    subServices: [
      { name: "AC Repairs" },
      { name: "AC Installations" },
      { name: "Blower Services" },
      { name: "Electrical Repair" },
      { name: "Window Installations" },
      { name: "Water Services" },
      { name: "Compressor Repair" },
      { name: "Split AC Installations" },
      { name: "Chemical Services" },
      { name: "Gas Problem" },
      { name: "PCB Repair" },
      { name: "Wiring Problem" },
      { name: "Leakages Problem" },
      { name: "Dismantling of ACs" },
      { name: "Extension of Pipes" },
      { name: "Core Cutting" },
    ],
  },
  refrigerators: {
    name: "Refrigerators",
    subServices: [
      { name: "General Servicing" },
      { name: "Electrical Problem" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "PCB Problem" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Evaporator Problem" },
      { name: "Electronic Set (Timer, Biometal, Fuse, Heating Coil)" },
      { name: "Fan Motor Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Bulb Problem" },
      { name: "Door Switch Problem" },
    ],
  },
  "deep-freezer": {
    name: "Deep Freezer",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Door Hinges & Clamp Problem" },
    ],
  },
  "bottle-cooler": {
    name: "Bottle Cooler",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Door Hinges & Clamp Problem" },
    ],
  },
  "visi-coolers": {
    name: "Visi Coolers",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Tube Light Problem" },
      { name: "Door Beeding Problem" },
      { name: "Front Glass Problem" },
    ],
  },
  fow: {
    name: "FOW (Freezer on Wheels)",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Door Hinges & Clamp Problem" },
    ],
  },
  "water-cooler": {
    name: "Water Cooler",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Tap Problem" },
      { name: "Door Beeding Problem" },
    ],
  },
  "water-dispenser": {
    name: "Water Dispenser",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Heater Problem" },
      { name: "Electronic Thermometer" },
      { name: "Tap Problem" },
      { name: "Water Bottle Holder Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
    ],
  },
  "refrigerator-vans": {
    name: "Freezers/Refrigerator Vans",
    subServices: [{ name: "General Servicing" }, { name: "Repairs" }, { name: "Inspection Charges" }],
  },
  "cold-rooms": {
    name: "Cold Rooms",
    subServices: [
      { name: "Complete Servicing" },
      { name: "Electrical Problem" },
      { name: "Relay" },
      { name: "Capacitors" },
      { name: "Thermostat" },
      { name: "Gas Problem" },
      { name: "Compressor Problem" },
      { name: "Condenser Fan Motor" },
      { name: "Body Repair" },
      { name: "Accessories" },
      { name: "Condenser Fan Blade Problem" },
      { name: "Electronic Thermometer" },
      { name: "Fan Motor Base Problem" },
      { name: "Door Closing Problem" },
      { name: "Water Leakage Problem" },
      { name: "Electrical Wire Problem" },
      { name: "Indoor Problem" },
      { name: "Duct Problem" },
    ],
  },
};

const allServices = [
  { id: "ac-services", name: "AC Services" },
  { id: "refrigerators", name: "Refrigerators" },
  { id: "deep-freezer", name: "Deep Freezer" },
  { id: "bottle-cooler", name: "Bottle Cooler" },
  { id: "visi-coolers", name: "Visi Coolers" },
  { id: "fow", name: "FOW (Freezer on Wheels)" },
  { id: "water-cooler", name: "Water Cooler" },
  { id: "water-dispenser", name: "Water Dispenser" },
  { id: "refrigerator-vans", name: "Freezers/Refrigerator Vans" },
  { id: "cold-rooms", name: "Cold Rooms" },
];

const timeSlots = [
  "9:00 AM - 10:00 AM",
  "10:00 AM - 11:00 AM",
  "11:00 AM - 12:00 PM",
  "12:00 PM - 1:00 PM",
  "2:00 PM - 3:00 PM",
  "3:00 PM - 4:00 PM",
  "4:00 PM - 5:00 PM",
  "5:00 PM - 6:00 PM",
];

export default function BookingModal({ isOpen, onClose, serviceName, preSelectedService }: BookingModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedService, setSelectedService] = useState(preSelectedService || "");
  const [selectedSubService, setSelectedSubService] = useState("");
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTimeSlot, setSelectedTimeSlot] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [bookingId, setBookingId] = useState("");

  const pathname = usePathname();
  const searchParams = useSearchParams();
  const { user, status } = useAuth();

  const [customerDetails, setCustomerDetails] = useState({
    name: "",
    phone: "",
    email: "",
    address: "",
    notes: "",
  });

  useEffect(() => {
    if (status === "authenticated" && user) {
      setCustomerDetails((d) => ({
        ...d,
        name: `${user.firstName ?? ""} ${user.lastName ?? ""}`.trim() || user.email,
        email: user.email,
      }));
    }
  }, [status, user]);

  const nextUrl = useMemo(() => {
    const qs = searchParams?.toString();
    return `${pathname}${qs ? `?${qs}` : ""}`;
  }, [pathname, searchParams]);

  const handleNext = () => setCurrentStep((s) => Math.min(s + 1, 5));
  const handlePrevious = () => setCurrentStep((s) => Math.max(s - 1, 1));
  const handleServiceSelect = (id: string) => {
    setSelectedService(id);
    setSelectedSubService("");
  };
  const handleSubServiceSelect = (sub: string) => setSelectedSubService(sub);
  const handleDateSelect = (date: Date | undefined) => setSelectedDate(date);
  const handleTimeSlotSelect = (slot: string) => setSelectedTimeSlot(slot);

  const handlePayment = () => {
    // Generate booking ID
    const id = "MAEGA" + Math.floor(Math.random() * 1_000_000);
    setBookingId(id);
    setBookingConfirmed(true);
  };

  const handleClose = () => {
    setCurrentStep(1);
    setSelectedService(preSelectedService || "");
    setSelectedSubService("");
    setSelectedDate(undefined);
    setSelectedTimeSlot("");
    setCustomerDetails({ name: "", phone: "", email: "", address: "", notes: "" });
    setPaymentMethod("");
    setBookingConfirmed(false);
    setBookingId("");
    onClose();
  };

  const getSelectedServiceData = () => serviceData[selectedService] || { name: selectedService, subServices: [] };

  if (bookingConfirmed) {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="w-[95vw] max-w-md mx-auto p-0">
          <div className="text-center space-y-4 p-4 sm:p-6">
            <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
            </div>

            <div className="space-y-2">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Booking Confirmed</h2>
              <p className="text-sm sm:text-base text-gray-600">Your service has been successfully booked</p>
            </div>

            <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
              <p className="text-xs sm:text-sm text-gray-600 mb-1">Booking ID</p>
              <p className="text-lg sm:text-xl font-bold text-gray-900 break-all">{bookingId}</p>
            </div>

            <div className="bg-white border rounded-lg p-3 sm:p-4 text-left space-y-3">
              <h3 className="font-semibold text-gray-900 text-sm sm:text-base">Booking Details</h3>
              <div className="space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-600 flex-shrink-0">Service:</span>
                  <span className="font-medium text-right">{getSelectedServiceData().name}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-600 flex-shrink-0">Sub-Service:</span>
                  <span className="font-medium text-right">{selectedSubService}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-600 flex-shrink-0">Date:</span>
                  <span className="font-medium text-right">{selectedDate?.toLocaleDateString()}</span>
                </div>
                <div className="flex justify-between items-start gap-2">
                  <span className="text-gray-600 flex-shrink-0">Time:</span>
                  <span className="font-medium text-right">{selectedTimeSlot}</span>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-3 sm:p-4 rounded-lg">
              <h4 className="font-semibold text-blue-900 mb-2 text-sm sm:text-base">What's Next?</h4>
              <ul className="text-xs sm:text-sm text-blue-800 space-y-1 text-left">
                <li>• Our technician will call you 30 minutes before arrival</li>
                <li>• Service charges will be discussed during the visit</li>
                <li>• You can track your booking status anytime</li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <Button className="flex-1 text-sm" asChild>
                <a href="/track">Track Booking</a>
              </Button>
              <Button variant="outline" onClick={handleClose} className="text-sm bg-transparent">
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="w-[95vw] max-w-2xl max-h-[95vh] overflow-hidden p-0">
        <DialogHeader className="border-b pb-3 px-4 pt-4 sm:px-6 sm:pt-6">
          <DialogTitle className="flex items-center justify-between text-lg sm:text-xl font-semibold">
            Book Your Service
            <Button variant="ghost" size="sm" onClick={handleClose} className="h-8 w-8 p-0">
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>

        {/* Steps indicator */}
        <div className="flex items-center justify-between px-3 py-3 sm:px-6 sm:py-4 overflow-x-auto">
          <div className="flex items-center gap-1 sm:gap-2 min-w-max">
            {[1, 2, 3, 4, 5].map((step, index) => (
              <div key={step} className="flex items-center">
                <div
                  className={`w-6 h-6 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium ${
                    step <= currentStep ? "bg-blue-600 text-white" : "bg-gray-200 text-gray-500"
                  }`}
                >
                  {step < currentStep ? <Check className="h-3 w-3 sm:h-4 sm:w-4" /> : step}
                </div>
                {index < 4 && (
                  <div className={`w-6 sm:w-12 h-0.5 mx-1 sm:mx-2 ${step < currentStep ? "bg-blue-600" : "bg-gray-200"}`} />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="overflow-y-auto flex-1 px-4 pb-4 sm:px-6 sm:pb-6" style={{ maxHeight: "calc(95vh - 140px)" }}>
          {/* Step 1: Select Service */}
          {currentStep === 1 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Select Service</h3>
                <p className="text-sm sm:text-base text-gray-600">Choose the main service category</p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {allServices.map((service) => (
                  <button
                    key={service.id}
                    className={`p-3 sm:p-4 text-left border-2 rounded-lg transition-colors ${
                      selectedService === service.id ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleServiceSelect(service.id)}
                  >
                    <div className="font-medium text-sm sm:text-base">{service.name}</div>
                  </button>
                ))}
              </div>

              <div className="flex justify-end pt-4">
                <Button onClick={handleNext} disabled={!selectedService} className="px-6 text-sm sm:text-base">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 2: Select Sub-Service */}
          {currentStep === 2 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Select Sub-Service</h3>
                <p className="text-sm sm:text-base text-gray-600">Choose the specific service you need</p>
              </div>

              <div className="text-center">
                <span className="inline-block px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs sm:text-sm font-medium">
                  {getSelectedServiceData().name}
                </span>
              </div>

              <div className="space-y-2 max-h-60 sm:max-h-64 overflow-y-auto">
                {getSelectedServiceData().subServices.map((subService, index) => (
                  <button
                    key={index}
                    className={`w-full p-3 text-left border rounded-lg transition-colors ${
                      selectedSubService === subService.name ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => handleSubServiceSelect(subService.name)}
                  >
                    <div className="flex justify-between items-center gap-2">
                      <span className="font-medium text-sm sm:text-base flex-1 text-left">{subService.name}</span>
                      {selectedSubService === subService.name && <Check className="h-4 w-4 text-blue-600 flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex justify-between pt-4 gap-3">
                <Button variant="outline" onClick={handlePrevious} className="text-sm sm:text-base bg-transparent">
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!selectedSubService} className="text-sm sm:text-base">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 3: Date & Time */}
          {currentStep === 3 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Select Date & Time</h3>
                <p className="text-sm sm:text-base text-gray-600">Choose your preferred schedule</p>
              </div>

              <div className="space-y-6 lg:space-y-0 lg:grid lg:grid-cols-2 lg:gap-6">
                <div className="space-y-3">
                  <Label className="font-medium text-sm sm:text-base">Select Date</Label>
                  <div className="flex justify-center">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={handleDateSelect}
                      disabled={(date) => date < new Date(new Date().setHours(0, 0, 0, 0))}
                      className="rounded-lg border w-fit text-sm"
                    />
                  </div>
                </div>

                {selectedDate && (
                  <div className="space-y-3">
                    <Label className="font-medium text-sm sm:text-base">Select Time</Label>
                    <div className="space-y-2 max-h-60 sm:max-h-64 overflow-y-auto">
                      {timeSlots.map((slot) => (
                        <button
                          key={slot}
                          className={`w-full p-3 text-left border rounded-lg transition-colors ${
                            selectedTimeSlot === slot ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                          }`}
                          onClick={() => handleTimeSlotSelect(slot)}
                        >
                          <div className="flex items-center gap-2">
                            <Clock className="h-4 w-4 flex-shrink-0" />
                            <span className="text-sm sm:text-base font-medium">{slot}</span>
                          </div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-between pt-4 gap-3">
                <Button variant="outline" onClick={handlePrevious} className="text-sm sm:text-base bg-transparent">
                  Previous
                </Button>
                <Button onClick={handleNext} disabled={!selectedDate || !selectedTimeSlot} className="text-sm sm:text-base">
                  Next
                </Button>
              </div>
            </div>
          )}

          {/* Step 4: Auth-aware Details Gate */}
          {currentStep === 4 && (
            <div className="space-y-4 sm:space-y-6">
              {status !== "authenticated" ? (
                // Not logged in -> Prompt to sign in/up (no OTP, no details here)
                <div className="space-y-6">
                  <div className="text-center space-y-2">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Sign in to Continue</h3>
                    <p className="text-sm sm:text-base text-gray-600">
                      Please log in or create an account to complete your booking.
                    </p>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-3">
                    <Button
                      className="w-full text-sm sm:text-base"
                      onClick={() => (window.location.href = `/login?next=${encodeURIComponent(nextUrl)}`)}
                    >
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full text-sm sm:text-base bg-transparent"
                      onClick={() => (window.location.href = `/signup?next=${encodeURIComponent(nextUrl)}`)}
                    >
                      <UserPlus className="h-4 w-4 mr-2" />
                      Sign Up
                    </Button>
                  </div>

                  <div className="rounded-lg border bg-blue-50 p-3 sm:p-4">
                    <p className="text-xs sm:text-sm text-blue-900">
                      You’ll be redirected back here to finish your booking after signing in.
                    </p>
                  </div>

                  <div className="flex justify-between pt-2 gap-3">
                    <Button variant="outline" onClick={handlePrevious} className="text-sm sm:text-base bg-transparent">
                      Previous
                    </Button>
                  </div>
                </div>
              ) : (
                // Logged in -> show details (read-only for name/email), no OTP
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center">
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900">Your Details</h3>
                    <p className="text-sm sm:text-base text-gray-600">We’ll use these to coordinate your service</p>
                  </div>

                  <div className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="name" className="text-sm sm:text-base">Full Name</Label>
                        <Input id="name" value={customerDetails.name} readOnly className="text-sm sm:text-base bg-gray-50" />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-sm sm:text-base">Email Address</Label>
                        <Input id="email" value={customerDetails.email} readOnly className="text-sm sm:text-base bg-gray-50" />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="phone" className="text-sm sm:text-base">Phone Number *</Label>
                        <Input
                          id="phone"
                          placeholder="+91 12345 67890"
                          value={customerDetails.phone}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, phone: e.target.value })}
                          className="text-sm sm:text-base"
                        />
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="address" className="text-sm sm:text-base">Address *</Label>
                        <Textarea
                          id="address"
                          placeholder="Enter your complete address"
                          value={customerDetails.address}
                          onChange={(e) => setCustomerDetails({ ...customerDetails, address: e.target.value })}
                          className="min-h-[80px] text-sm sm:text-base resize-none"
                        />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <Label htmlFor="notes" className="text-sm sm:text-base">Additional Notes (Optional)</Label>
                      <Textarea
                        id="notes"
                        placeholder="Any specific requirements"
                        value={customerDetails.notes}
                        onChange={(e) => setCustomerDetails({ ...customerDetails, notes: e.target.value })}
                        className="min-h-[60px] text-sm sm:text-base resize-none"
                      />
                    </div>
                  </div>

                  <div className="flex justify-between pt-4 gap-3">
                    <Button variant="outline" onClick={handlePrevious} className="text-sm sm:text-base bg-transparent">
                      Previous
                    </Button>
                    <Button
                      onClick={handleNext}
                      disabled={!customerDetails.phone || !customerDetails.address}
                      className="text-sm sm:text-base"
                    >
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Payment */}
          {currentStep === 5 && (
            <div className="space-y-4 sm:space-y-6">
              <div className="text-center">
                <h3 className="text-base sm:text-lg font-semibold text-gray-900">Payment</h3>
                <p className="text-sm sm:text-base text-gray-600">Choose your payment method</p>
              </div>

              <div className="bg-gray-50 p-3 sm:p-4 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3 text-sm sm:text-base">Booking Summary</h4>
                <div className="space-y-2 text-xs sm:text-sm">
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">Service:</span>
                    <span className="font-medium text-right">{getSelectedServiceData().name}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">Sub-Service:</span>
                    <span className="font-medium text-right">{selectedSubService}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">Date:</span>
                    <span className="font-medium text-right">{selectedDate?.toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">Time:</span>
                    <span className="font-medium text-right">{selectedTimeSlot}</span>
                  </div>
                  <div className="flex justify-between items-start gap-2">
                    <span className="text-gray-600 flex-shrink-0">Service Charge:</span>
                    <span className="font-medium text-right">To be discussed on-site</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <Label className="font-medium text-sm sm:text-base">Payment Method</Label>
                <div className="space-y-2">
                  {["UPI", "Credit/Debit Card", "Net Banking", "Wallet"].map((method) => (
                    <button
                      key={method}
                      className={`w-full p-3 text-left border rounded-lg transition-colors ${
                        paymentMethod === method ? "border-blue-600 bg-blue-50" : "border-gray-200 hover:border-gray-300"
                      }`}
                      onClick={() => setPaymentMethod(method)}
                    >
                      <div className="flex items-center gap-2">
                        <CreditCard className="h-4 w-4 flex-shrink-0" />
                        <span className="font-medium text-sm sm:text-base">{method}</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex justify-between pt-4 gap-3">
                <Button variant="outline" onClick={handlePrevious} className="text-sm sm:text-base bg-transparent">
                  Previous
                </Button>
                <Button onClick={handlePayment} disabled={!paymentMethod} className="text-sm sm:text-base">
                  Confirm Booking
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
