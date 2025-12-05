import { type NextRequest, NextResponse } from "next/server"
import { getMpesaAccessToken, initiatePayment } from "@/lib/mpesa"
import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()

    // Validate required fields
    if (!body.phone_number || !body.amount) {
      return NextResponse.json({ error: "Phone number and amount are required" }, { status: 400 })
    }

    const cookieStore = await cookies()
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
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
      },
    )

    // Get M-Pesa access token
    const accessToken = await getMpesaAccessToken()

    if (!accessToken) {
      return NextResponse.json({ error: "Failed to authenticate with M-Pesa" }, { status: 500 })
    }

    // Initiate STK push
    const result = await initiatePayment(accessToken, {
      phone_number: body.phone_number,
      amount: body.amount,
      service_type: body.service_type || "service",
      description: body.description || "Engineering Services",
    })

    if (result.error) {
      return NextResponse.json({ error: result.error }, { status: 400 })
    }

    const { data: paymentRecord, error: dbError } = await supabase
      .from("payments")
      .insert([
        {
          phone_number: body.phone_number,
          amount: body.amount,
          service_type: body.service_type || "service",
          description: body.description || "Engineering Services",
          checkout_request_id: result.checkout_request_id,
          status: "pending",
        },
      ])
      .select()

    if (dbError) {
      console.error("Database error:", dbError)
      // Still return success to M-Pesa, but log the DB error
    }

    return NextResponse.json(result, { status: 200 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
