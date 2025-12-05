"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Mail } from "lucide-react"
import { createClient } from "@/lib/supabase-client"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

interface Inquiry {
  id: string
  full_name: string
  email: string
  phone: string
  subject: string
  message: string
  status: string
  response?: string
  created_at: string
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null)
  const [response, setResponse] = useState("")
  const [responding, setResponding] = useState(false)

  useEffect(() => {
    const fetchInquiries = async () => {
      try {
        const supabase = createClient()
        let query = supabase.from("contact_inquiries").select("*")

        if (filter !== "all") {
          query = query.eq("status", filter)
        }

        const { data, error } = await query.order("created_at", { ascending: false })

        if (error) throw error
        setInquiries(data || [])
      } catch (err) {
        console.error("Failed to fetch inquiries:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchInquiries()
  }, [filter])

  const filteredInquiries = inquiries.filter(
    (inquiry) =>
      inquiry.full_name.toLowerCase().includes(search.toLowerCase()) ||
      inquiry.email.toLowerCase().includes(search.toLowerCase()),
  )

  const handleRespond = async () => {
    if (!selectedInquiry || !response.trim()) return

    setResponding(true)
    try {
      const supabase = createClient()
      const { error } = await supabase
        .from("contact_inquiries")
        .update({
          status: "responded",
          response,
          responded_at: new Date().toISOString(),
        })
        .eq("id", selectedInquiry.id)

      if (error) throw error

      setInquiries(
        inquiries.map((inq) => (inq.id === selectedInquiry.id ? { ...inq, status: "responded", response } : inq)),
      )
      setSelectedInquiry(null)
      setResponse("")
    } catch (err) {
      console.error("Failed to save response:", err)
    } finally {
      setResponding(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold">Contact Inquiries</h2>
        <p className="text-muted-foreground mt-1">
          Manage and respond to client inquiries ({filteredInquiries.length})
        </p>
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
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="read">Read</SelectItem>
                  <SelectItem value="responded">Responded</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading ? (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading inquiries...</p>
        </div>
      ) : filteredInquiries.length === 0 ? (
        <Card>
          <CardContent className="text-center py-12">
            <p className="text-muted-foreground">No inquiries found</p>
          </CardContent>
        </Card>
      ) : (
        <div className="grid gap-4">
          {filteredInquiries.map((inquiry) => (
            <Card key={inquiry.id}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-lg">{inquiry.full_name}</h3>
                    <p className="text-sm text-muted-foreground">{inquiry.email}</p>
                    <p className="text-sm font-medium mt-2">{inquiry.subject}</p>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">{inquiry.message}</p>
                    <div className="flex flex-wrap gap-2 mt-2">
                      <span
                        className={`text-xs px-2 py-1 rounded ${
                          inquiry.status === "new"
                            ? "bg-blue-100 dark:bg-blue-950 text-blue-900 dark:text-blue-100"
                            : inquiry.status === "responded"
                              ? "bg-green-100 dark:bg-green-950 text-green-900 dark:text-green-100"
                              : "bg-gray-100 dark:bg-gray-950 text-gray-900 dark:text-gray-100"
                        }`}
                      >
                        {inquiry.status}
                      </span>
                    </div>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <p className="text-xs text-muted-foreground">{new Date(inquiry.created_at).toLocaleDateString()}</p>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          size="sm"
                          variant="outline"
                          className="mt-2 gap-2 bg-transparent"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          <Mail size={16} />
                          Respond
                        </Button>
                      </DialogTrigger>
                      {selectedInquiry?.id === inquiry.id && (
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Respond to Inquiry</DialogTitle>
                            <DialogDescription>
                              From: {selectedInquiry.full_name} ({selectedInquiry.email})
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium">Original Message:</label>
                              <p className="text-sm text-muted-foreground mt-1 p-2 bg-muted rounded">
                                {selectedInquiry.message}
                              </p>
                            </div>
                            <div>
                              <label className="text-sm font-medium">Your Response:</label>
                              <Textarea
                                placeholder="Type your response..."
                                value={response}
                                onChange={(e) => setResponse(e.target.value)}
                                rows={5}
                              />
                            </div>
                            <div className="flex gap-2 justify-end">
                              <Button
                                variant="outline"
                                onClick={() => {
                                  setSelectedInquiry(null)
                                  setResponse("")
                                }}
                              >
                                Cancel
                              </Button>
                              <Button onClick={handleRespond} disabled={responding || !response.trim()}>
                                {responding ? "Sending..." : "Send Response"}
                              </Button>
                            </div>
                          </div>
                        </DialogContent>
                      )}
                    </Dialog>
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
