import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
  try {
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

    const body = await req.json()

    // Validate required fields
    if (!body.full_name || !body.email || !body.phone || !body.service_type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Insert application into database
    const { data, error } = await supabase
      .from("applications")
      .insert([
        {
          full_name: body.full_name,
          email: body.email,
          phone: body.phone,
          company_name: body.company_name,
          service_type: body.service_type,
          project_description: body.project_description,
          budget: body.budget,
          timeline: body.timeline,
          requirements: body.requirements,
        },
      ])
      .select()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ error: "Failed to save application" }, { status: 500 })
    }

    return NextResponse.json({ success: true, data }, { status: 201 })
  } catch (err) {
    console.error("API error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
