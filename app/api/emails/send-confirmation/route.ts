import { type NextRequest, NextResponse } from "next/server"
import { sendEmail, getApplicationConfirmationEmail, getContactConfirmationEmail } from "@/lib/email"

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, type } = body

    if (!name || !email || !type) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    let emailData

    if (type === "application") {
      emailData = getApplicationConfirmationEmail(name, email)
    } else if (type === "contact") {
      emailData = getContactConfirmationEmail(name, email)
    } else {
      return NextResponse.json({ error: "Invalid email type" }, { status: 400 })
    }

    const success = await sendEmail(emailData)

    if (!success) {
      console.warn(`Email not sent for ${type}`)
    }

    return NextResponse.json({ success: true, message: "Email sent" }, { status: 200 })
  } catch (err) {
    console.error("Email API error:", err)
    return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
  }
}
