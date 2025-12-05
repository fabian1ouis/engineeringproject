import { type NextRequest, NextResponse } from "next/server"
import crypto from "crypto"

// In production, use proper password hashing and authentication
export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ error: "Email and password required" }, { status: 400 })
    }

    // For demo purposes - in production, verify against database
    // This is a placeholder - implement proper authentication
    if (email === "admin@engineerskenya.co.ke" && password === process.env.ADMIN_SECRET) {
      const token = crypto.randomBytes(32).toString("hex")

      return NextResponse.json(
        {
          token,
          user: {
            email,
            name: "Admin",
            role: "admin",
          },
        },
        { status: 200 },
      )
    }

    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
  } catch (err) {
    console.error("Auth error:", err)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
