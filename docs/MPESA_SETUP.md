# M-Pesa Integration Setup Guide

This guide provides step-by-step instructions for setting up M-Pesa payment processing.

## Prerequisites

- Safaricom Business Account
- M-Pesa Daraja API access
- Valid business shortcode
- SSL certificate for callback URL

## Setup Steps

### 1. Get Daraja API Credentials

1. Visit [Safaricom Daraja Portal](https://developer.safaricom.co.ke)
2. Create an account and log in
3. Navigate to "My Apps"
4. Click "Create New App"
5. Fill in app details and select "M-Pesa API"
6. Save and obtain:
   - Consumer Key
   - Consumer Secret
   - Business Shortcode
   - Passkey (for STK Push)

### 2. Environment Variables

Add to your `.env.local` or Vercel project variables:

\`\`\`env
MPESA_ENVIRONMENT=sandbox
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=123456
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourapp.vercel.app/api/payments/callback
\`\`\`

### 3. Test Credentials (Sandbox)

For testing M-Pesa in sandbox mode, use:
- Business Shortcode: 174379
- Passkey: bfb279f9aa9bdbcf158e97dd1a503b6e (for sandbox)
- Test Phone: 254700000000

### 4. Callback URL Configuration

1. Log in to Daraja portal
2. Go to your app settings
3. Set Callback URL to: `https://yourapp.vercel.app/api/payments/callback`
4. Ensure URL is HTTPS and publicly accessible

### 5. Testing the Flow

\`\`\`bash
# Test payment initiation
curl -X POST http://localhost:3000/api/payments/initiate \
  -H "Content-Type: application/json" \
  -d '{
    "phone_number": "+254700000000",
    "amount": 100,
    "service_type": "test",
    "description": "Test payment"
  }'
\`\`\`

Expected response:
\`\`\`json
{
  "success": true,
  "checkout_request_id": "abc123xyz",
  "merchant_request_id": "def456uvw",
  "response_code": "0",
  "response_description": "Success"
}
\`\`\`

### 6. Production Deployment

When moving to production:

1. Update environment variables:
   \`\`\`env
   MPESA_ENVIRONMENT=production
   MPESA_CONSUMER_KEY=production_key
   MPESA_CONSUMER_SECRET=production_secret
   MPESA_BUSINESS_SHORTCODE=your_business_code
   MPESA_PASSKEY=production_passkey
   \`\`\`

2. Update callback URL to production domain

3. Test full payment flow with small amount

4. Monitor transaction logs in admin dashboard

## Troubleshooting

### "Failed to authenticate with M-Pesa"
- Check consumer key and secret
- Verify API is enabled in Daraja portal
- Check internet connectivity

### "Invalid phone number format"
- Phone must start with 254 (Kenyan country code)
- Remove any spaces or special characters
- Format: 254712345678 or +254712345678

### Callback not received
- Verify callback URL is HTTPS
- Check URL is publicly accessible
- Verify firewall rules
- Check M-Pesa logs in Daraja portal

### Payment stuck in "pending" status
- Check M-Pesa transaction logs
- Verify database update occurred
- Check server logs for errors

---

**Last Updated**: December 2025
