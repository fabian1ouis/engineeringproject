"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Download, Mail } from "lucide-react"
import { createClient } from "@/lib/supabase-client"

interface Subscriber {
  id: string
  email: string
  is_active: boolean
  subscribed_at: string
}

export default function SubscribersPage() {
  const [subscribers, setSubscribers] = useState<Subscriber[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchSubscribers = async () => {
      try {
        const supabase = createClient()
        const { data, error } = await supabase
          .from("newsletter_subscribers")
          .select("*")
          .eq("is_active", true)
          .order("subscribed_at", { ascending: false })

        if (error) throw error
        setSubscribers(data || [])
      } catch (err) {
        console.error("Failed to fetch subscribers:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchSubscribers()
  }, [])

  const filteredSubscribers = subscribers.filter((sub) => sub.email.toLowerCase().includes(search.toLowerCase()))

  const handleExport = () => {
    const csv = [
      ["Email", "Subscribed Date"],
      ...subscribers.map((s) => [s.email, new Date(s.subscribed_at).toLocaleDateString()]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `subscribers-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Newsletter Subscribers</h2>
          <p className="text-muted-foreground mt-1">Manage newsletter subscriptions ({filteredSubscribers.length})</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download size={18} />
          Export CSV
        </Button>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <Mail size={32} className="text-primary" />
            <div>
              <p className="text-sm text-muted-foreground">Total Active Subscribers</p>
              <p className="text-3xl font-bold">{subscribers.length}</p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Search</CardTitle>
        </CardHeader>
        <CardContent>
          <Input placeholder="Search by email..." value={search} onChange={(e) => setSearch(e.target.value)} />
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading subscribers...</p>
        </div>
      ) : filteredSubscribers.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No subscribers found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-2 px-4 font-semibold">Email</th>
                <th className="text-left py-2 px-4 font-semibold">Subscribed Date</th>
                <th className="text-left py-2 px-4 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredSubscribers.map((subscriber) => (
                <tr key={subscriber.id} className="border-b hover:bg-muted">
                  <td className="py-2 px-4">{subscriber.email}</td>
                  <td className="py-2 px-4">{new Date(subscriber.subscribed_at).toLocaleDateString()}</td>
                  <td className="py-2 px-4">
                    <span className="text-xs px-2 py-1 rounded bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100">
                      Active
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
