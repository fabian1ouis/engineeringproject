"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Download } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase-client"

interface Payment {
  id: string
  phone_number: string
  amount: number
  service_type: string
  status: string
  mpesa_receipt_number?: string
  transaction_date?: string
  created_at: string
}

export default function PaymentsPage() {
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchPayments = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from("payments").select("*")

        if (filter !== "all") {
          query = query.eq("status", filter)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setPayments(data || [])
      } catch (err) {
        console.error("Failed to fetch payments:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchPayments()
  }, [filter])

  const filteredPayments = payments.filter(
    (payment) =>
      payment.phone_number.includes(search) || payment.service_type.toLowerCase().includes(search.toLowerCase()),
  )

  const totalRevenue = payments.filter((p) => p.status === "success").reduce((sum, p) => sum + p.amount, 0)

  const handleExport = () => {
    const csv = [
      ["Phone", "Amount", "Service", "Status", "Receipt", "Date"],
      ...payments.map((p) => [
        p.phone_number,
        p.amount,
        p.service_type,
        p.status,
        p.mpesa_receipt_number || "N/A",
        new Date(p.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `payments-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Payment Transactions</h2>
          <p className="text-muted-foreground mt-1">Track M-Pesa payments ({filteredPayments.length})</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download size={18} />
          Export CSV
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Total Revenue</p>
              <p className="text-3xl font-bold">KES {totalRevenue.toLocaleString()}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Successful Payments</p>
              <p className="text-3xl font-bold">{payments.filter((p) => p.status === "success").length}</p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div>
              <p className="text-sm text-muted-foreground">Pending Payments</p>
              <p className="text-3xl font-bold">{payments.filter((p) => p.status === "pending").length}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium">Search</label>
              <Input
                placeholder="Search by phone or service..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div>
              <label className="text-sm font-medium">Status</label>
              <Select value={filter} onValueChange={setFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="success">Success</SelectItem>
                  <SelectItem value="failed">Failed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading payments...</p>
        </div>
      ) : filteredPayments.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No payments found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-semibold">Phone</th>
                <th className="text-left py-2 px-4 font-semibold">Amount</th>
                <th className="text-left py-2 px-4 font-semibold">Service</th>
                <th className="text-left py-2 px-4 font-semibold">Status</th>
                <th className="text-left py-2 px-4 font-semibold">Receipt</th>
                <th className="text-left py-2 px-4 font-semibold">Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredPayments.map((payment) => (
                <tr key={payment.id} className="border-b hover:bg-muted">
                  <td className="py-2 px-4">{payment.phone_number}</td>
                  <td className="py-2 px-4">KES {payment.amount.toLocaleString()}</td>
                  <td className="py-2 px-4">{payment.service_type}</td>
                  <td className="py-2 px-4">
                    <span
                      className={`text-xs px-2 py-1 rounded ${
                        payment.status === "success"
                          ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                          : payment.status === "pending"
                            ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100"
                            : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100"
                      }`}
                    >
                      {payment.status}
                    </span>
                  </td>
                  <td className="py-2 px-4">{payment.mpesa_receipt_number || "N/A"}</td>
                  <td className="py-2 px-4">{new Date(payment.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
