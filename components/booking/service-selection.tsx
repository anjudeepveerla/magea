"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import {
  Wind,
  Snowflake,
  Baseline as Washing,
  Microwave,
  Tv,
  AlertCircle,
  IndianRupee,
  Clock,
  Wrench,
} from "lucide-react"

interface ServiceSelectionProps {
  serviceId: string
  onSubmit: (data: ServiceSelectionData) => void
  onBack: () => void
  isLoading?: boolean
}

export interface ServiceSelectionData {
  serviceId: string
  serviceName: string
  subService: string
  subServiceName: string
  capacity?: string
  amount: number
  visitingCharges: number
  totalAmount: number
  hasCharges: boolean
  estimatedTime: string
  description?: string
}

const serviceData = {
  "ac-services": {
    name: "AC Repair & Service",
    icon: <Wind className="h-6 w-6" />,
    subServices: [
      {
        id: "regular-service",
        name: "Regular Service",
        description: "Blower cleaning, water service, chemical service",
        basePrice: 499,
        visitingCharges: 0,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
      },
      {
        id: "installation",
        name: "AC Installation",
        description: "Professional AC installation with warranty",
        basePrice: 1500,
        visitingCharges: 0,
        estimatedTime: "2-3 hours",
        capacityOptions: [
          { id: "1-ton", name: "1 Ton", price: 1500 },
          { id: "1.5-ton", name: "1.5 Ton", price: 1800 },
          { id: "2-ton", name: "2 Ton", price: 2200 },
        ],
      },
      {
        id: "not-cooling",
        name: "Not Cooling Complaint",
        description: "Diagnosis and repair for cooling issues",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
    ],
  },
  refrigerators: {
    name: "Refrigerator Repair & Service",
    icon: <Snowflake className="h-6 w-6" />,
    subServices: [
      {
        id: "cooling-issues",
        name: "Cooling Problems",
        description: "Temperature control and cooling system repair",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "compressor-repair",
        name: "Compressor Repair",
        description: "Compressor replacement and repair services",
        basePrice: 2500,
        visitingCharges: 299,
        estimatedTime: "2-3 hours",
        capacityOptions: [],
      },
      {
        id: "door-seal",
        name: "Door Seal Replacement",
        description: "Replace damaged door seals and gaskets",
        basePrice: 800,
        visitingCharges: 0,
        estimatedTime: "30-45 minutes",
        capacityOptions: [],
      },
    ],
  },
  "washing-machine": {
    name: "Washing Machine Repair",
    icon: <Washing className="h-6 w-6" />,
    subServices: [
      {
        id: "drum-issues",
        name: "Drum Problems",
        description: "Drum repair, bearing replacement",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "water-problems",
        name: "Water Issues",
        description: "Drainage, inlet, and water level problems",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "motor-repair",
        name: "Motor Repair",
        description: "Motor replacement and repair services",
        basePrice: 1800,
        visitingCharges: 299,
        estimatedTime: "2-3 hours",
        capacityOptions: [],
      },
    ],
  },
  microwave: {
    name: "Microwave Repair",
    icon: <Microwave className="h-6 w-6" />,
    subServices: [
      {
        id: "heating-issues",
        name: "Heating Problems",
        description: "Magnetron and heating element repair",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "control-panel",
        name: "Control Panel Issues",
        description: "Button and display panel repair",
        basePrice: 1200,
        visitingCharges: 0,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
      },
    ],
  },
  "tv-repair": {
    name: "TV Repair",
    icon: <Tv className="h-6 w-6" />,
    subServices: [
      {
        id: "screen-issues",
        name: "Screen Problems",
        description: "Display and screen repair services",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "sound-problems",
        name: "Sound Issues",
        description: "Audio and speaker repair",
        basePrice: 800,
        visitingCharges: 0,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
      },
    ],
  },
  geyser: {
    name: "Geyser Repair & Service",
    icon: <Tv className="h-6 w-6" />,
    subServices: [
      {
        id: "heating-issues",
        name: "Heating Problems",
        description: "Thermostat and heating element repair",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "installation",
        name: "Geyser Installation",
        description: "Professional geyser installation with warranty",
        basePrice: 1200,
        visitingCharges: 0,
        estimatedTime: "2-3 hours",
        capacityOptions: [],
      },
    ],
  },
  "ro-water-purifier": {
    name: "RO/Water Purifier Service",
    icon: <Snowflake className="h-6 w-6" />,
    subServices: [
      {
        id: "filter-replacement",
        name: "Filter Replacement",
        description: "Replace RO filters and membranes",
        basePrice: 800,
        visitingCharges: 0,
        estimatedTime: "30-45 minutes",
        capacityOptions: [],
      },
      {
        id: "water-quality",
        name: "Water Quality Issues",
        description: "Diagnosis and repair for water quality problems",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
    ],
  },
  electrical: {
    name: "Electrical Services",
    icon: <Tv className="h-6 w-6" />,
    subServices: [
      {
        id: "wiring-issues",
        name: "Wiring Problems",
        description: "Electrical wiring repair and installation",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-3 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "switch-repair",
        name: "Switch & Socket Repair",
        description: "Replace and repair switches and sockets",
        basePrice: 150,
        visitingCharges: 0,
        estimatedTime: "30-60 minutes",
        capacityOptions: [],
      },
    ],
  },
  plumbing: {
    name: "Plumbing Services",
    icon: <Snowflake className="h-6 w-6" />,
    subServices: [
      {
        id: "pipe-leakage",
        name: "Pipe Leakage",
        description: "Fix pipe leaks and water damage",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "tap-repair",
        name: "Tap & Faucet Repair",
        description: "Repair and replace taps and faucets",
        basePrice: 200,
        visitingCharges: 0,
        estimatedTime: "30-60 minutes",
        capacityOptions: [],
      },
    ],
  },
  carpentry: {
    name: "Carpentry Services",
    icon: <Wrench className="h-6 w-6" />,
    subServices: [
      {
        id: "furniture-repair",
        name: "Furniture Repair",
        description: "Repair and restoration of wooden furniture",
        basePrice: 0,
        visitingCharges: 299,
        estimatedTime: "1-3 hours",
        capacityOptions: [],
        hasVisitingCharges: true,
      },
      {
        id: "door-repair",
        name: "Door & Window Repair",
        description: "Fix doors, windows, and hinges",
        basePrice: 300,
        visitingCharges: 0,
        estimatedTime: "1-2 hours",
        capacityOptions: [],
      },
    ],
  },
  "house-cleaning": {
    name: "House Cleaning Services",
    icon: <Wrench className="h-6 w-6" />,
    subServices: [
      {
        id: "deep-cleaning",
        name: "Deep Cleaning",
        description: "Complete house deep cleaning service",
        basePrice: 1500,
        visitingCharges: 0,
        estimatedTime: "4-6 hours",
        capacityOptions: [],
      },
      {
        id: "regular-cleaning",
        name: "Regular Cleaning",
        description: "Weekly/monthly house cleaning service",
        basePrice: 800,
        visitingCharges: 0,
        estimatedTime: "2-3 hours",
        capacityOptions: [],
      },
    ],
  },
}

export default function ServiceSelection({ serviceId, onSubmit, onBack, isLoading }: ServiceSelectionProps) {
  const [selectedSubService, setSelectedSubService] = useState("")
  const [selectedCapacity, setSelectedCapacity] = useState("")
  const [description, setDescription] = useState("")
  const [error, setError] = useState("")

  const service = serviceData[serviceId as keyof typeof serviceData]

  if (!service) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="text-center py-8">
          <p className="text-muted-foreground">Service not found</p>
          <Button onClick={onBack} className="mt-4">
            Back
          </Button>
        </CardContent>
      </Card>
    )
  }

  const selectedSubServiceData = service.subServices.find((s) => s.id === selectedSubService)
  const selectedCapacityData = selectedSubServiceData?.capacityOptions.find((c) => c.id === selectedCapacity)

  const calculateTotal = () => {
    if (!selectedSubServiceData) return { amount: 0, visitingCharges: 0, total: 0 }

    const baseAmount = selectedCapacityData?.price || selectedSubServiceData.basePrice
    const visitingCharges = selectedSubServiceData.visitingCharges
    const total = baseAmount + visitingCharges

    return {
      amount: baseAmount,
      visitingCharges,
      total,
    }
  }

  const { amount, visitingCharges, total } = calculateTotal()

  const handleSubmit = () => {
    if (!selectedSubService) {
      setError("Please select a service option")
      return
    }

    if (selectedSubServiceData?.capacityOptions.length && !selectedCapacity) {
      setError("Please select capacity/size")
      return
    }

    const submissionData: ServiceSelectionData = {
      serviceId,
      serviceName: service.name,
      subService: selectedSubService,
      subServiceName: selectedSubServiceData!.name,
      capacity: selectedCapacityData?.name,
      amount,
      visitingCharges,
      totalAmount: total,
      hasCharges: total > 0,
      estimatedTime: selectedSubServiceData!.estimatedTime,
      description,
    }

    onSubmit(submissionData)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-2 text-2xl">
          {service.icon}
          {service.name}
        </CardTitle>
        <CardDescription>Select the specific service you need</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Sub-service Selection */}
        <div className="space-y-4">
          <Label className="text-base font-medium">Choose Service Type</Label>
          <RadioGroup value={selectedSubService} onValueChange={setSelectedSubService}>
            {service.subServices.map((subService) => (
              <div key={subService.id} className="space-y-2">
                <div className="flex items-center space-x-2 p-4 border rounded-lg hover:bg-muted/50 transition-colors">
                  <RadioGroupItem value={subService.id} id={subService.id} />
                  <div className="flex-1">
                    <Label htmlFor={subService.id} className="cursor-pointer">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-medium">{subService.name}</p>
                          <p className="text-sm text-muted-foreground">{subService.description}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              <Clock className="h-3 w-3 mr-1" />
                              {subService.estimatedTime}
                            </Badge>
                          </div>
                        </div>
                        <div className="text-right">
                          {subService.basePrice > 0 && (
                            <p className="font-semibold text-primary">
                              <IndianRupee className="h-4 w-4 inline" />
                              {subService.basePrice}
                            </p>
                          )}
                          {subService.visitingCharges > 0 && (
                            <p className="text-sm text-muted-foreground">
                              + <IndianRupee className="h-3 w-3 inline" />
                              {subService.visitingCharges} visiting
                            </p>
                          )}
                          {subService.hasVisitingCharges && subService.basePrice === 0 && (
                            <Badge variant="secondary" className="text-xs">
                              Visiting charges apply
                            </Badge>
                          )}
                        </div>
                      </div>
                    </Label>
                  </div>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>

        {/* Capacity Selection for AC Installation */}
        {selectedSubServiceData?.capacityOptions.length > 0 && (
          <div className="space-y-4">
            <Label className="text-base font-medium">Select Capacity</Label>
            <RadioGroup value={selectedCapacity} onValueChange={setSelectedCapacity}>
              {selectedSubServiceData.capacityOptions.map((capacity) => (
                <div
                  key={capacity.id}
                  className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <RadioGroupItem value={capacity.id} id={capacity.id} />
                  <Label htmlFor={capacity.id} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{capacity.name}</span>
                      <span className="font-semibold text-primary">
                        <IndianRupee className="h-4 w-4 inline" />
                        {capacity.price}
                      </span>
                    </div>
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>
        )}

        {/* Visiting Charges Warning */}
        {selectedSubServiceData?.hasVisitingCharges && (
          <div className="p-4 bg-orange-50 border border-orange-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-orange-600 mt-0.5" />
              <div>
                <p className="font-medium text-orange-800">Visiting Charges Apply</p>
                <p className="text-sm text-orange-700">
                  Our technician will visit your location to diagnose the issue. Visiting charges of{" "}
                  <IndianRupee className="h-3 w-3 inline" />
                  {visitingCharges} will be applicable.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Additional Description */}
        <div className="space-y-2">
          <Label htmlFor="description">Additional Details (Optional)</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Describe the issue or any specific requirements..."
            rows={3}
          />
        </div>

        {/* Price Summary */}
        {selectedSubService && (
          <div className="p-4 bg-muted/50 rounded-lg space-y-2">
            <h4 className="font-medium flex items-center gap-2">
              <Wrench className="h-4 w-4" />
              Service Summary
            </h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span>Service: {selectedSubServiceData?.name}</span>
                {selectedCapacityData && <span>({selectedCapacityData.name})</span>}
              </div>
              {amount > 0 && (
                <div className="flex justify-between">
                  <span>Service Charges:</span>
                  <span>
                    <IndianRupee className="h-3 w-3 inline" />
                    {amount}
                  </span>
                </div>
              )}
              {visitingCharges > 0 && (
                <div className="flex justify-between">
                  <span>Visiting Charges:</span>
                  <span>
                    <IndianRupee className="h-3 w-3 inline" />
                    {visitingCharges}
                  </span>
                </div>
              )}
              <div className="flex justify-between font-semibold text-base border-t pt-2">
                <span>Total Amount:</span>
                <span className="text-primary">
                  <IndianRupee className="h-4 w-4 inline" />
                  {total}
                </span>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex gap-4 pt-4">
          <Button type="button" variant="outline" onClick={onBack} className="flex-1 bg-transparent">
            Back
          </Button>
          <Button onClick={handleSubmit} disabled={isLoading || !selectedSubService} className="flex-1">
            {isLoading ? "Processing..." : total > 0 ? "Proceed to Payment" : "Confirm Booking"}
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
