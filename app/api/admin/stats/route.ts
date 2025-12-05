import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
  try {
    const cookieStore = await cookies()
    const supabase = createServerClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
          } catch {
            // Handle cookie setting errors
          }
        },
      },
    })

    // Fetch all statistics
    const [applicationCount, pendingCount, inquiriesCount, subscribersCount, paymentsData] = await Promise.all([
      supabase.from("applications").select("id", { count: "exact" }),
      supabase.from("applications").select("id", { count: "exact" }).eq("status", "pending"),
      supabase.from("contact_inquiries").select("id", { count: "exact" }),
      supabase.from("newsletter_subscribers").select("id", { count: "exact" }),
      supabase.from("payments").select("amount").eq("status", "success"),
    ])

    const totalRevenue = paymentsData.data?.reduce((sum: number, p: any) => sum + (p.amount || 0), 0) || 0

    return NextResponse.json(
      {
        totalApplications: applicationCount.count || 0,
        pendingApplications: pendingCount.count || 0,
        totalInquiries: inquiriesCount.count || 0,
        totalSubscribers: subscribersCount.count || 0,
        totalPayments: paymentsData.data?.length || 0,
        revenueTotal: totalRevenue,
      },
      { status: 200 },
    )
  } catch (err) {
    console.error("Stats error:", err)
    return NextResponse.json({ error: "Failed to fetch statistics" }, { status: 500 })
  }
}
