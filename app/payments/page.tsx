"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function PaymentsPage() {
  const [loading, setLoading] = useState(false)
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const [error, setError] = useState("")
  const [formData, setFormData] = useState({
    phoneNumber: "+254",
    amount: "",
    serviceType: "",
    description: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setLoading(true)
    setPaymentStatus("processing")

    try {
      const response = await fetch("/api/payments/initiate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          phone_number: formData.phoneNumber,
          amount: Number.parseFloat(formData.amount),
          service_type: formData.serviceType,
          description: formData.description,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || "Failed to initiate payment")
      }

      setPaymentStatus("success")
      toast.success("Payment initiated! Enter your M-Pesa PIN on your phone to complete the transaction.")

      // Reset form
      setFormData({
        phoneNumber: "+254",
        amount: "",
        serviceType: "",
        description: "",
      })

      // Reset status after 5 seconds
      setTimeout(() => setPaymentStatus("idle"), 5000)
    } catch (err) {
      setPaymentStatus("error")
      const message = err instanceof Error ? err.message : "An error occurred"
      setError(message)
      toast.error(message)
    } finally {
      setLoading(false)
    }
  }

  if (paymentStatus === "success") {
    return (
      <main className="min-h-screen bg-background py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-md mx-auto text-center">
            <CardContent className="pt-12 pb-12">
              <div className="w-20 h-20 bg-green-100 dark:bg-green-950 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="text-green-600" size={48} />
              </div>
              <h2 className="text-2xl font-bold mb-4">Payment Initiated</h2>
              <p className="text-muted-foreground mb-6">
                Check your phone and enter your M-Pesa PIN to complete the payment.
              </p>
              <Button onClick={() => setPaymentStatus("idle")}>Make Another Payment</Button>
            </CardContent>
          </Card>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">M-Pesa Payment</h1>
            <p className="text-lg text-muted-foreground">Pay for our engineering services securely using M-Pesa</p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Enter Payment Details</CardTitle>
              <CardDescription>You'll receive an M-Pesa prompt on your registered phone number</CardDescription>
            </CardHeader>
            <CardContent>
              {error && (
                <div className="mb-4 p-4 bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-800 rounded-lg flex items-start gap-3">
                  <AlertCircle className="text-red-600 mt-1 flex-shrink-0" size={20} />
                  <p className="text-red-800 dark:text-red-200">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="+254712345678"
                    value={formData.phoneNumber}
                    onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">Must start with +254 or 254 (Kenyan phone number)</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="amount">Amount (KES) *</Label>
                  <Input
                    id="amount"
                    type="number"
                    placeholder="1000"
                    min="10"
                    step="10"
                    value={formData.amount}
                    onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                    required
                    disabled={loading}
                  />
                  <p className="text-xs text-muted-foreground">Minimum amount: KES 10</p>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Service Type *</Label>
                  <Select
                    value={formData.serviceType}
                    onValueChange={(value) => setFormData({ ...formData, serviceType: value })}
                    disabled={loading}
                  >
                    <SelectTrigger id="service">
                      <SelectValue placeholder="Select service" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="consultation">Consultation Fee</SelectItem>
                      <SelectItem value="design">Design Services</SelectItem>
                      <SelectItem value="survey">Survey Services</SelectItem>
                      <SelectItem value="inspection">Inspection Services</SelectItem>
                      <SelectItem value="other">Other Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe the payment purpose..."
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    disabled={loading}
                    rows={4}
                  />
                </div>

                <Button type="submit" size="lg" className="w-full" disabled={loading}>
                  {loading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Processing Payment...
                    </>
                  ) : (
                    "Pay with M-Pesa"
                  )}
                </Button>
              </form>

              <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-900 dark:text-blue-200">
                  <strong>Sandbox Mode:</strong> Use test credentials for testing. Switch to production credentials for
                  live payments.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}
