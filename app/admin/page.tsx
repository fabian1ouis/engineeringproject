"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, FileText, CreditCard, Mail } from "lucide-react"

interface DashboardStats {
  totalApplications: number
  pendingApplications: number
  totalInquiries: number
  totalPayments: number
  totalSubscribers: number
  revenueTotal: number
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    totalApplications: 0,
    pendingApplications: 0,
    totalInquiries: 0,
    totalPayments: 0,
    totalSubscribers: 0,
    revenueTotal: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("/api/admin/stats")
        if (response.ok) {
          const data = await response.json()
          setStats(data)
        }
      } catch (err) {
        console.error("Failed to fetch stats:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchStats()
  }, [])

  const statCards = [
    {
      icon: FileText,
      label: "Total Applications",
      value: stats.totalApplications,
      color: "bg-blue-100 dark:bg-blue-950 text-blue-600",
    },
    {
      icon: FileText,
      label: "Pending Applications",
      value: stats.pendingApplications,
      color: "bg-yellow-100 dark:bg-yellow-950 text-yellow-600",
    },
    {
      icon: Mail,
      label: "Contact Inquiries",
      value: stats.totalInquiries,
      color: "bg-purple-100 dark:bg-purple-950 text-purple-600",
    },
    {
      icon: CreditCard,
      label: "Total Payments",
      value: `KES ${stats.revenueTotal.toLocaleString()}`,
      color: "bg-green-100 dark:bg-green-950 text-green-600",
    },
    {
      icon: Users,
      label: "Newsletter Subscribers",
      value: stats.totalSubscribers,
      color: "bg-pink-100 dark:bg-pink-950 text-pink-600",
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Dashboard Overview</h2>
        <p className="text-muted-foreground mt-2">Welcome back! Here's what's happening with your business.</p>
      </div>

      {loading ? (
        <div className="text-center py-12">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-muted-foreground">Loading statistics...</p>
        </div>
      ) : (
        <>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {statCards.map((stat, index) => {
              const Icon = stat.icon
              return (
                <Card key={index}>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
                        <p className="text-3xl font-bold">{stat.value}</p>
                      </div>
                      <div className={`p-3 rounded-lg ${stat.color}`}>
                        <Icon size={24} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Navigate to view detailed information</CardDescription>
            </CardHeader>
            <CardContent className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              <a
                href="/admin/applications"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <p className="font-semibold">Manage Applications</p>
                <p className="text-sm text-muted-foreground">View and manage client applications</p>
              </a>
              <a
                href="/admin/inquiries"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <p className="font-semibold">Contact Inquiries</p>
                <p className="text-sm text-muted-foreground">Respond to client messages</p>
              </a>
              <a
                href="/admin/payments"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <p className="font-semibold">Payment Transactions</p>
                <p className="text-sm text-muted-foreground">Track M-Pesa payments</p>
              </a>
              <a
                href="/admin/subscribers"
                className="p-4 border border-border rounded-lg hover:bg-muted transition-colors"
              >
                <p className="font-semibold">Newsletter</p>
                <p className="text-sm text-muted-foreground">Manage subscribers</p>
              </a>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
