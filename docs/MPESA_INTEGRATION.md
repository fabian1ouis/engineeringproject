# M-Pesa Integration Guide

## Overview

M-Pesa Daraja API enables payment processing through Safaricom's M-Pesa network.

## Setup Instructions

### 1. Register on Safaricom Developer Portal

1. Visit [https://developer.safaricom.co.ke/](https://developer.safaricom.co.ke/)
2. Create developer account
3. Verify email

### 2. Create an App

1. Log in to developer portal
2. Go to "My Apps"
3. Click "Create New App"
4. Fill in app details:
   - App name: "Kenyan Engineers"
   - Select APIs: M-Pesa Daraja

### 3. Get Credentials

Navigate to your app and copy:
- **Consumer Key** - OAuth consumer key
- **Consumer Secret** - OAuth consumer secret
- **Business Shortcode** - M-Pesa business code (6 digits)
- **Pass Key** - For STK push (64 characters)

### 4. Configure Environment Variables

Add to `.env.local`:

\`\`\`env
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_pass_key
MPESA_ENVIRONMENT=sandbox
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/callback
\`\`\`

For production:
\`\`\`env
MPESA_ENVIRONMENT=production
\`\`\`

## API Endpoints

### Initiate Payment

**Endpoint:** `POST /api/payments/initiate`

**Request:**
\`\`\`json
{
  "phone_number": "+254712345678",
  "amount": 1000,
  "service_type": "consultation",
  "description": "Engineering consultation"
}
\`\`\`

**Response (Success):**
\`\`\`json
{
  "success": true,
  "checkout_request_id": "ws_CO_12122024120000",
  "response_code": "0",
  "message": "Success. Request accepted for processing"
}
\`\`\`

**Response (Error):**
\`\`\`json
{
  "success": false,
  "error": "Invalid phone number"
}
\`\`\`

### Payment Callback

**URL:** `/api/payments/callback`

**Data Received:**
\`\`\`json
{
  "Body": {
    "stkCallback": {
      "MerchantRequestID": "1234-567890-1",
      "CheckoutRequestID": "ws_CO_12122024",
      "ResultCode": 0,
      "ResultDesc": "The service request has been accepted successfully",
      "CallbackMetadata": {
        "Item": [
          {
            "Name": "Amount",
            "Value": 1000
          },
          {
            "Name": "MpesaReceiptNumber",
            "Value": "LHG31AA5TX"
          },
          {
            "Name": "PhoneNumber",
            "Value": "254712345678"
          }
        ]
      }
    }
  }
}
\`\`\`

## Testing in Sandbox

### Test Credentials

- **Environment:** Sandbox
- **Test Phone:** 254708374149
- **Test Amount:** Any amount (minimum KES 10)

### Testing Flow

1. Go to `/payments` page
2. Enter test phone number: `254708374149`
3. Enter amount: `100` KES
4. Select service type
5. Click "Pay with M-Pesa"
6. Receive STK prompt
7. Check admin dashboard for transaction

## Production Setup

### 1. Get Live Credentials

1. On developer portal, request production access
2. Provide business details
3. Receive live credentials

### 2. Update Environment Variables

Replace sandbox credentials with live ones:

\`\`\`env
MPESA_CONSUMER_KEY=live_consumer_key
MPESA_CONSUMER_SECRET=live_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_live_shortcode
MPESA_PASSKEY=your_live_pass_key
MPESA_ENVIRONMENT=production
MPESA_CALLBACK_URL=https://engineerskenya.co.ke/api/payments/callback
\`\`\`

### 3. Deploy to Vercel

1. Update Vercel environment variables
2. Redeploy application
3. Test with real M-Pesa account

## Transaction Status Codes

| Code | Meaning |
|------|---------|
| 0 | Success |
| 1 | Insufficient Funds |
| 2 | Less Than Minimum Transaction Value |
| 3 | More Than Maximum Transaction Value |
| 4 | Would Exceed Daily Limit |
| 5 | Would Exceed Minimum Balance |
| 6 | Unresolved Primary Account |
| 7 | Unresolved Receiving Primary Account |
| 8 | Would Exceed Payee Daily Limit |
| 9 | Payee Prohibits This Transation Type On Primary Account |
| 11 | Payee Account Locked |
| 12 | Payee Prohibits This Transation Type On Primary Account |
| 13 | Transation Type Not Supported |
| 14 | Payee Exceeds Maximum Amount |
| 15 | Payer does not have repeater bit |
| 17 | Cannot complete transation, Transation timeout in the switch |
| 20 | Transation Reversed |
| 21 | Transation Aborted |
| 22 | Bad Request |
| 23 | Bad Gateway |
| 24 | Service Unavailable |
| 25 | Unresolved Receiving Primary Account |
| 26 | User Cancelled Transaction |

## Troubleshooting

### Payment Not Going Through

- Verify phone number format (+254 or 254)
- Check amount is minimum KES 10
- Ensure M-Pesa account has sufficient balance
- Verify API credentials are correct

### Callback Not Received

- Check callback URL is publicly accessible
- Verify MPESA_CALLBACK_URL environment variable
- Check firewall/security settings
- Review application logs

### Credentials Not Working

- Verify credentials are correct
- Check API is enabled for your app
- Ensure app is active (not paused)
- Contact Safaricom support

## Support

- [Safaricom Developer Docs](https://developer.safaricom.co.ke/apis)
- [M-Pesa Daraja API Documentation](https://developer.safaricom.co.ke/documentation)
- Email: support@engineerskenya.co.ke
