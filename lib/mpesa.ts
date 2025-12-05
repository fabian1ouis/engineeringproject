const MPESA_API_URL =
  process.env.MPESA_ENVIRONMENT === "production" ? "https://api.safaricom.co.ke" : "https://sandbox.safaricom.co.ke"

interface PaymentData {
  phone_number: string
  amount: number
  service_type: string
  description: string
}

interface PaymentResponse {
  success?: boolean
  error?: string
  checkout_request_id?: string
  merchant_request_id?: string
  response_code?: string
  response_description?: string
}

export async function getMpesaAccessToken(): Promise<string | null> {
  try {
    const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString(
      "base64",
    )

    const response = await fetch(`${MPESA_API_URL}/oauth/v1/generate?grant_type=client_credentials`, {
      method: "GET",
      headers: {
        Authorization: `Basic ${auth}`,
      },
    })

    const data = await response.json()
    return data.access_token || null
  } catch (err) {
    console.error("Failed to get M-Pesa access token:", err)
    return null
  }
}

export async function initiatePayment(accessToken: string, paymentData: PaymentData): Promise<PaymentResponse> {
  try {
    // Format phone number
    let phoneNumber = paymentData.phone_number.replace(/\D/g, "")
    if (phoneNumber.startsWith("0")) {
      phoneNumber = "254" + phoneNumber.slice(1)
    }
    if (!phoneNumber.startsWith("254")) {
      phoneNumber = "254" + phoneNumber
    }

    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14)

    const password = Buffer.from(
      `${process.env.MPESA_BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`,
    ).toString("base64")

    const requestBody = {
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: Math.floor(paymentData.amount),
      PartyA: phoneNumber,
      PartyB: process.env.MPESA_BUSINESS_SHORTCODE,
      PhoneNumber: phoneNumber,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: `${paymentData.service_type}-${Date.now()}`,
      TransactionDesc: paymentData.description,
    }

    const response = await fetch(`${MPESA_API_URL}/mpesa/stkpush/v1/processrequest`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    const data = await response.json()

    if (data.ResponseCode === "0") {
      // Store transaction in database
      const checkoutRequestId = data.CheckoutRequestID

      // Validate response
      return {
        success: true,
        checkout_request_id: checkoutRequestId,
        merchant_request_id: data.MerchantRequestID,
        response_code: data.ResponseCode,
        response_description: data.ResponseDescription,
      }
    } else {
      return {
        error: data.errorMessage || "Failed to initiate payment",
      }
    }
  } catch (err) {
    console.error("Payment initiation error:", err)
    return {
      error: "Failed to process payment request",
    }
  }
}

export async function checkTransactionStatus(accessToken: string, checkoutRequestId: string): Promise<any> {
  try {
    const timestamp = new Date()
      .toISOString()
      .replace(/[^0-9]/g, "")
      .slice(0, 14)

    const password = Buffer.from(
      `${process.env.MPESA_BUSINESS_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`,
    ).toString("base64")

    const requestBody = {
      BusinessShortCode: process.env.MPESA_BUSINESS_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      CheckoutRequestID: checkoutRequestId,
    }

    const response = await fetch(`${MPESA_API_URL}/mpesa/stkpushquery/v1/query`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })

    return await response.json()
  } catch (err) {
    console.error("Status check error:", err)
    return null
  }
}
