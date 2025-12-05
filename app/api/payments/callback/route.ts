import { createServerClient } from "@supabase/ssr"
import { cookies } from "next/headers"
import { type NextRequest, NextResponse } from "next/server"

export async function POST(req: NextRequest) {
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

    const body = await req.json()

    // Extract callback data
    const stkCallback = body.Body?.stkCallback
    if (!stkCallback) {
      return NextResponse.json({ error: "Invalid callback format" }, { status: 400 })
    }

    const checkoutRequestId = stkCallback.CheckoutRequestID
    const resultCode = stkCallback.ResultCode
    const resultDesc = stkCallback.ResultDesc

    let phoneNumber = ""
    let amount = 0
    let mpesaReceiptNumber = ""
    let transactionDate = null

    // Extract metadata if successful
    if (resultCode === 0 && stkCallback.CallbackMetadata?.Item) {
      stkCallback.CallbackMetadata.Item.forEach((item: any) => {
        if (item.Name === "Amount") amount = item.Value
        if (item.Name === "MpesaReceiptNumber") mpesaReceiptNumber = item.Value
        if (item.Name === "PhoneNumber") phoneNumber = item.Value
        if (item.Name === "TransactionDate") transactionDate = item.Value
      })
    }

    // Update payment record in database
    const { error } = await supabase
      .from("payments")
      .update({
        status: resultCode === 0 ? "success" : "failed",
        result_code: resultCode.toString(),
        result_desc: resultDesc,
        mpesa_receipt_number: mpesaReceiptNumber || null,
        transaction_date: transactionDate || new Date().toISOString(),
      })
      .eq("checkout_request_id", checkoutRequestId)

    if (error) {
      console.error("Database error:", error)
    }

    // Return success response to M-Pesa
    return NextResponse.json({ ResultCode: 0, ResultDesc: "Accepted" }, { status: 200 })
  } catch (err) {
    console.error("Callback error:", err)
    return NextResponse.json({ ResultCode: 1, ResultDesc: "Error" }, { status: 500 })
  }
}
