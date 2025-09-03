"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, ArrowRight, Users, Shield, Star } from "lucide-react"
import Link from "next/link"

export default function JoinPage() {
  const scrollToForm = () => {
    document.getElementById("registration-form")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-background to-card py-20 lg:py-32 pt-32">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="font-heading font-bold text-4xl lg:text-6xl text-foreground leading-tight">
                  Join the MAEGA Network – Empower Your Skills, Expand Your Reach
                </h1>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Become a certified partner/technician and grow with us. Join thousands of professionals who are
                  building successful careers with MAEGA's trusted platform.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" className="text-lg px-8" onClick={scrollToForm}>
                  Join Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button variant="outline" size="lg" className="text-lg px-8 bg-transparent" asChild>
                  <Link href="/contact">Learn More</Link>
                </Button>
              </div>

              <div className="grid grid-cols-3 gap-6 pt-4">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">5000+</p>
                  <p className="text-xs text-muted-foreground">Active Technicians</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Shield className="h-6 w-6 text-accent" />
                  </div>
                  <p className="text-sm font-medium text-foreground">100%</p>
                  <p className="text-xs text-muted-foreground">Verified Partners</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                    <Star className="h-6 w-6 text-secondary" />
                  </div>
                  <p className="text-sm font-medium text-foreground">4.9/5</p>
                  <p className="text-xs text-muted-foreground">Partner Rating</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/professional-technician-hero.png"
                alt="Professional technician with toolkit"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-background p-4 rounded-xl shadow-lg border border-border">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Verified Partner</p>
                    <p className="text-sm text-muted-foreground">Trusted & Certified</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Registration Form Section */}
      <section id="registration-form" className="py-20 bg-card">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center space-y-4 mb-12">
            <h2 className="font-heading font-bold text-3xl lg:text-4xl text-foreground">
              MAEGA App Partner/Technician Profile
            </h2>
            <p className="text-lg text-muted-foreground">
              Please fill all details carefully. All fields marked with * are required.
            </p>
          </div>

          <Card className="border-0 shadow-xl">
            <CardContent className="p-6 md:p-8">
              <form className="space-y-10">
                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 1: Personal Details
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="id-number" className="text-sm font-medium">
                        Identity Card Number *
                      </Label>
                      <Input id="id-number" placeholder="Enter ID card number" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="photo" className="text-sm font-medium">
                        Upload Photo *
                      </Label>
                      <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer bg-muted/30">
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload photo</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="full-name" className="text-sm font-medium">
                        Name *
                      </Label>
                      <Input id="full-name" placeholder="Enter your full name" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="dob" className="text-sm font-medium">
                        Date of Birth *
                      </Label>
                      <Input id="dob" type="date" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="aadhaar" className="text-sm font-medium">
                        Aadhar Number *
                      </Label>
                      <Input id="aadhaar" placeholder="Enter Aadhar number" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="mobile1" className="text-sm font-medium">
                        Mobile No.1 *
                      </Label>
                      <Input id="mobile1" type="tel" placeholder="Enter primary mobile number" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="mobile2" className="text-sm font-medium">
                        Mobile No.2
                      </Label>
                      <Input id="mobile2" type="tel" placeholder="Enter secondary mobile number" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="pan" className="text-sm font-medium">
                        PAN Card Number *
                      </Label>
                      <Input id="pan" placeholder="Enter PAN number" className="h-11" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 2: Bank Details
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="bank-name" className="text-sm font-medium">
                        Bank Name *
                      </Label>
                      <Input id="bank-name" placeholder="Enter bank name" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="branch" className="text-sm font-medium">
                        Branch *
                      </Label>
                      <Input id="branch" placeholder="Enter branch name" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="ifsc" className="text-sm font-medium">
                        IFSC Code *
                      </Label>
                      <Input id="ifsc" placeholder="Enter IFSC code" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-type" className="text-sm font-medium">
                        Account Type *
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select account type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="savings">Savings</SelectItem>
                          <SelectItem value="current">Current</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="account-number" className="text-sm font-medium">
                        Account Number *
                      </Label>
                      <Input id="account-number" type="number" placeholder="Enter account number" className="h-11" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 3: Shop Details
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="shop-name" className="text-sm font-medium">
                      Shop Name *
                    </Label>
                    <Input id="shop-name" placeholder="Enter shop name" className="h-11" />
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="shop-door" className="text-sm font-medium">
                        Door Number *
                      </Label>
                      <Input id="shop-door" placeholder="Enter door number" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shop-street" className="text-sm font-medium">
                        Street *
                      </Label>
                      <Input id="shop-street" placeholder="Enter street name" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="shop-area" className="text-sm font-medium">
                        Village/Area *
                      </Label>
                      <Input id="shop-area" placeholder="Enter village or area name" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="shop-location" className="text-sm font-medium">
                        Town/Mandal, District, State *
                      </Label>
                      <Input id="shop-location" placeholder="Enter town/mandal, district, state" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="shop-pin" className="text-sm font-medium">
                      PIN Code *
                    </Label>
                    <Input id="shop-pin" type="number" placeholder="Enter PIN code" className="h-11 max-w-xs" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 4: House Details
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="father-name" className="text-sm font-medium">
                        Father Name & Contact Number *
                      </Label>
                      <Input id="father-name" placeholder="Enter father's name and contact" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="marital-status" className="text-sm font-medium">
                        Marital Status *
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select marital status" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="single">Single</SelectItem>
                          <SelectItem value="married">Married</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="spouse-name" className="text-sm font-medium">
                        Name of the Spouse
                      </Label>
                      <Input id="spouse-name" placeholder="Enter spouse name (if married)" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="spouse-mobile" className="text-sm font-medium">
                        Spouse Mobile Number
                      </Label>
                      <Input id="spouse-mobile" type="tel" placeholder="Enter spouse mobile number" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="house-door" className="text-sm font-medium">
                        Door Number *
                      </Label>
                      <Input id="house-door" placeholder="Enter door number" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="house-street" className="text-sm font-medium">
                        Street *
                      </Label>
                      <Input id="house-street" placeholder="Enter street name" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="house-area" className="text-sm font-medium">
                        Village/Area *
                      </Label>
                      <Input id="house-area" placeholder="Enter village or area name" className="h-11" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="house-location" className="text-sm font-medium">
                        Town/Mandal, District, State *
                      </Label>
                      <Input id="house-location" placeholder="Enter town/mandal, district, state" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="house-pin" className="text-sm font-medium">
                      PIN Code *
                    </Label>
                    <Input id="house-pin" type="number" placeholder="Enter PIN code" className="h-11 max-w-xs" />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 5: Additional Details
                  </h3>
                  <div className="space-y-2">
                    <Label htmlFor="technicians-count" className="text-sm font-medium">
                      Number of Technicians Available *
                    </Label>
                    <Input
                      id="technicians-count"
                      type="number"
                      placeholder="Enter number of technicians"
                      className="h-11 max-w-xs"
                    />
                  </div>
                  <div className="space-y-4">
                    <Label className="text-sm font-medium">Appliances Can Handle *</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 p-4 border border-border rounded-lg bg-muted/30">
                      {[
                        "AC",
                        "Refrigerator",
                        "WC (Water Cooler)",
                        "BC (Bottle Cooler)",
                        "WD (Water Dispenser)",
                        "DF (Deep Freezer)",
                        "Package AC",
                        "Cold rooms",
                        "FOW",
                      ].map((appliance) => (
                        <div key={appliance} className="flex items-center space-x-3">
                          <Checkbox id={appliance.toLowerCase().replace(/[^a-z0-9]/g, "-")} />
                          <Label
                            htmlFor={appliance.toLowerCase().replace(/[^a-z0-9]/g, "-")}
                            className="text-sm font-medium"
                          >
                            {appliance}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 6: Qualifications
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="academic-qualification" className="text-sm font-medium">
                        Academic Qualification *
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select academic qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="10th">10th Standard</SelectItem>
                          <SelectItem value="12th">12th Standard</SelectItem>
                          <SelectItem value="diploma">Diploma</SelectItem>
                          <SelectItem value="graduate">Graduate</SelectItem>
                          <SelectItem value="postgraduate">Post Graduate</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="technical-qualification" className="text-sm font-medium">
                        Technical Qualification *
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select technical qualification" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="iti">ITI</SelectItem>
                          <SelectItem value="diploma">Technical Diploma</SelectItem>
                          <SelectItem value="certificate">Certificate Course</SelectItem>
                          <SelectItem value="experience">Experience Based</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Section 7: Emergency & Other Details
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="blood-group" className="text-sm font-medium">
                        Blood Group *
                      </Label>
                      <Select>
                        <SelectTrigger className="h-11">
                          <SelectValue placeholder="Select blood group" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="a+">A+</SelectItem>
                          <SelectItem value="a-">A-</SelectItem>
                          <SelectItem value="b+">B+</SelectItem>
                          <SelectItem value="b-">B-</SelectItem>
                          <SelectItem value="o+">O+</SelectItem>
                          <SelectItem value="o-">O-</SelectItem>
                          <SelectItem value="ab+">AB+</SelectItem>
                          <SelectItem value="ab-">AB-</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="old-id" className="text-sm font-medium">
                        Old ID Number
                      </Label>
                      <Input id="old-id" placeholder="Enter old ID number (if rejoining)" className="h-11" />
                    </div>
                  </div>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="emergency-contact" className="text-sm font-medium">
                        Emergency Contact Number *
                      </Label>
                      <Input
                        id="emergency-contact"
                        type="tel"
                        placeholder="Enter emergency contact number"
                        className="h-11"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="emergency-relation" className="text-sm font-medium">
                        Emergency Contact Person Relation *
                      </Label>
                      <Input
                        id="emergency-relation"
                        placeholder="Enter relation (e.g., Father, Brother)"
                        className="h-11"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="experience" className="text-sm font-medium">
                      Experience *
                    </Label>
                    <Textarea
                      id="experience"
                      placeholder="Describe your work experience in detail"
                      rows={4}
                      className="resize-none"
                    />
                  </div>
                </div>

                <div className="space-y-6">
                  <h3 className="font-heading font-semibold text-xl text-foreground border-b border-border pb-3">
                    Document Uploads
                  </h3>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Upload ID Proof *</Label>
                      <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer bg-muted/30">
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload ID proof</span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label className="text-sm font-medium">Upload Certificates</Label>
                      <div className="flex items-center justify-center p-4 border-2 border-dashed border-border rounded-lg hover:border-primary transition-colors cursor-pointer bg-muted/30">
                        <div className="text-center">
                          <Upload className="h-6 w-6 text-muted-foreground mx-auto mb-2" />
                          <span className="text-sm text-muted-foreground">Click to upload certificates</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="text-center pt-8">
                  <Button size="lg" className="text-lg px-12 py-4 h-auto">
                    Submit Application
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-background rounded-lg flex items-center justify-center">
                  <span className="text-foreground font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="font-heading font-bold text-xl">MAEGA</h3>
                  <p className="text-xs opacity-80">On-Demand Services</p>
                </div>
              </div>
              <p className="text-sm opacity-80">
                Professional home and appliance services at your doorstep. Reliable, affordable, and on-demand.
              </p>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Services</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/services/ac-services" className="hover:opacity-100 transition-opacity">
                    AC Services
                  </Link>
                </li>
                <li>
                  <Link href="/services/refrigerators" className="hover:opacity-100 transition-opacity">
                    Refrigerators
                  </Link>
                </li>
                <li>
                  <Link href="/services/deep-freezers" className="hover:opacity-100 transition-opacity">
                    Deep Freezers
                  </Link>
                </li>
                <li>
                  <Link href="/services/water-coolers" className="hover:opacity-100 transition-opacity">
                    Water Coolers
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/about" className="hover:opacity-100 transition-opacity">
                    About Us
                  </Link>
                </li>
                <li>
                  <Link href="/contact" className="hover:opacity-100 transition-opacity">
                    Contact
                  </Link>
                </li>
                <li>
                  <Link href="/pricing" className="hover:opacity-100 transition-opacity">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="hover:opacity-100 transition-opacity">
                    FAQs
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="font-heading font-semibold mb-4">Partners</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li>
                  <Link href="/join" className="hover:opacity-100 transition-opacity">
                    Join as Technician
                  </Link>
                </li>
                <li>
                  <Link href="/partner-benefits" className="hover:opacity-100 transition-opacity">
                    Partner Benefits
                  </Link>
                </li>
                <li>
                  <Link href="/training" className="hover:opacity-100 transition-opacity">
                    Training Programs
                  </Link>
                </li>
                <li>
                  <Link href="/support" className="hover:opacity-100 transition-opacity">
                    Partner Support
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-background/20 mt-12 pt-8 text-center">
            <p className="text-sm opacity-80">© 2024 MAEGA. All rights reserved. | Privacy Policy | Terms of Service</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
