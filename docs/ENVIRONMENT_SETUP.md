# Environment Variables Setup Guide

## Supabase Configuration

These environment variables are automatically provided by Vercel when you connect Supabase:

\`\`\`
SUPABASE_URL=your_supabase_project_url
SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
\`\`\`

## M-Pesa Daraja API Configuration

To integrate M-Pesa payments, obtain these credentials from [Safaricom Developer Portal](https://developer.safaricom.co.ke/):

\`\`\`
# M-Pesa API Credentials
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_pass_key
MPESA_ENVIRONMENT=sandbox  # or production

# M-Pesa URLs (Callback URLs)
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/callback
\`\`\`

## Email Service Configuration

For sending emails, use either Resend or SendGrid:

### Resend (Recommended)
\`\`\`
RESEND_API_KEY=your_resend_api_key
RESEND_FROM_EMAIL=noreply@yourdomain.com
\`\`\`

### SendGrid Alternative
\`\`\`
SENDGRID_API_KEY=your_sendgrid_api_key
SENDGRID_FROM_EMAIL=noreply@yourdomain.com
\`\`\`

## Admin Authentication

For admin dashboard protection:

\`\`\`
ADMIN_SECRET=your_secure_admin_secret
NEXT_PUBLIC_ADMIN_PATH=/admin
\`\`\`

## Setup Instructions

1. **Supabase**: Connect via Vercel Marketplace or add manually
2. **M-Pesa**: 
   - Register on [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
   - Create an app and get credentials
   - Add environment variables to Vercel project
3. **Email Service**:
   - Choose Resend or SendGrid
   - Create account and get API key
   - Add to environment variables
4. **Admin Secret**:
   - Generate a strong random string
   - Add to environment variables for admin protection

## Local Development

Create a \`.env.local\` file in the project root:

\`\`\`bash
SUPABASE_URL=...
SUPABASE_ANON_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
MPESA_CONSUMER_KEY=...
MPESA_CONSUMER_SECRET=...
MPESA_BUSINESS_SHORTCODE=...
MPESA_PASSKEY=...
RESEND_API_KEY=...
ADMIN_SECRET=...
\`\`\`

Then run:
\`\`\`bash
npm run dev
\`\`\`

## Vercel Deployment

1. Go to Vercel Project Settings → Environment Variables
2. Add all required variables
3. Redeploy the application
4. Test payment flow in M-Pesa sandbox environment
\`\`\`
