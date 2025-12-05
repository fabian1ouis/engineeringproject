"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Eye, Download } from "lucide-react"
import { createClient } from "@/lib/supabase-client"

interface Application {
  id: string
  full_name: string
  email: string
  phone: string
  company_name: string
  service_type: string
  status: string
  created_at: string
}

export default function ApplicationsPage() {
  const [applications, setApplications] = useState<Application[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from("applications").select("*")

        if (filter !== "all") {
          query = query.eq("status", filter)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setApplications(data || [])
      } catch (err) {
        console.error("Failed to fetch applications:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchApplications()
  }, [filter])

  const filteredApplications = applications.filter(
    (app) =>
      app.full_name.toLowerCase().includes(search.toLowerCase()) ||
      app.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleExport = () => {
    const csv = [
      ["Name", "Email", "Phone", "Company", "Service", "Status", "Date"],
      ...applications.map((app) => [
        app.full_name,
        app.email,
        app.phone,
        app.company_name,
        app.service_type,
        app.status,
        new Date(app.created_at).toLocaleDateString(),
      ]),
    ]
      .map((row) => row.map((cell) => `"${cell}"`).join(","))
      .join("\n")

    const blob = new Blob([csv], { type: "text/csv" })
    const url = window.URL.createObjectURL(blob)
    const a = document.createElement("a")
    a.href = url
    a.download = `applications-${Date.now()}.csv`
    a.click()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Applications</h2>
          <p className="text-muted-foreground mt-1">Manage client applications ({filteredApplications.length})</p>
        </div>
        <Button onClick={handleExport} className="gap-2">
          <Download size={18} />
          Export CSV
        </Button>
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
                placeholder="Search by name or email..."
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
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading applications...</p>
        </div>
      ) : filteredApplications.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No applications found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredApplications.map((app) => (
            <Card key={app.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{app.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{app.email}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span className="text-xs bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100 px-2 py-1 rounded">
                        {app.service_type}
                      </span>
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          app.status === "pending"
                            ? "bg-yellow-100 dark:bg-yellow-950 text-yellow-900 dark:text-yellow-100"
                            : app.status === "approved"
                              ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                              : "bg-red-100 dark:bg-red-950 text-red-900 dark:text-red-100"
                        }`}
                      >
                        {app.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{new Date(app.created_at).toLocaleDateString()}</p>
                    <Button size="sm" variant="outline" className="mt-2 gap-2 bg-transparent">
                      <Eye size={16} />
                      View
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
