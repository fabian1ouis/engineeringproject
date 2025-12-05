# Implementation Guide - Kenyan Engineers Website

This document provides detailed implementation information for all features of the Kenyan Engineers website.

## Table of Contents

1. [Database Setup](#database-setup)
2. [API Implementation](#api-implementation)
3. [Admin Dashboard](#admin-dashboard)
4. [M-Pesa Integration](#mpesa-integration)
5. [Email Notifications](#email-notifications)
6. [Frontend Features](#frontend-features)

---

## Database Setup

### Tables Created

#### 1. Applications Table
Stores service application submissions from clients.

\`\`\`sql
CREATE TABLE applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  company_name VARCHAR(255),
  service_type VARCHAR(50) NOT NULL,
  project_description TEXT,
  budget VARCHAR(100),
  timeline VARCHAR(100),
  requirements TEXT,
  status VARCHAR(50) DEFAULT 'pending',
  notes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**Fields**:
- `service_type`: structural, electrical, mechanical, construction
- `status`: pending, reviewed, approved, rejected, completed

#### 2. Contact Inquiries Table
Stores general contact form submissions.

\`\`\`sql
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  subject VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  status VARCHAR(50) DEFAULT 'new',
  response TEXT,
  responded_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**Status Values**: new, read, responded, closed

#### 3. Newsletter Subscribers Table
Manages email subscriptions.

\`\`\`sql
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  source VARCHAR(100),
  subscribed_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  unsubscribed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

#### 4. Payments Table
Tracks M-Pesa payment transactions.

\`\`\`sql
CREATE TABLE payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  phone_number VARCHAR(20) NOT NULL,
  amount DECIMAL(10, 2) NOT NULL,
  service_type VARCHAR(100),
  description VARCHAR(255),
  checkout_request_id VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending',
  result_code VARCHAR(10),
  result_desc VARCHAR(255),
  mpesa_receipt_number VARCHAR(100),
  transaction_date TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
\`\`\`

**Status Values**: pending, success, failed, cancelled

### Row Level Security (RLS)

All tables have RLS enabled for security:
- Public users can INSERT applications, inquiries, and newsletter subscriptions
- Public users can INSERT payment records
- Only authenticated admins (with service role) can SELECT, UPDATE, DELETE

---

## API Implementation

### API Endpoints

#### Applications
- **POST /api/applications** - Submit new application
- **GET /api/admin/applications** - (Admin) Retrieve all applications

#### Contact
- **POST /api/contact** - Submit contact inquiry
- **GET /api/admin/inquiries** - (Admin) Retrieve all inquiries
- **PUT /api/admin/inquiries/:id** - (Admin) Update inquiry/respond

#### Newsletter
- **POST /api/newsletter** - Subscribe to newsletter
- **DELETE /api/newsletter** - Unsubscribe from newsletter

#### Payments
- **POST /api/payments/initiate** - Initiate M-Pesa STK push
- **POST /api/payments/callback** - Handle M-Pesa callback
- **GET /api/admin/payments** - (Admin) View payment history

#### Admin
- **POST /api/admin/auth/login** - Admin login
- **GET /api/admin/stats** - Dashboard statistics

### Request/Response Examples

#### Submit Application
\`\`\`bash
curl -X POST http://localhost:3000/api/applications \
  -H "Content-Type: application/json" \
  -d '{
    "full_name": "John Doe",
    "email": "john@example.com",
    "phone": "+254712345678",
    "company_name": "Acme Corp",
    "service_type": "structural",
    "project_description": "Building structural assessment",
    "budget": "KES 500,000 - 1M",
    "timeline": "3 months",
    "requirements": "Licensed engineers required"
  }'
\`\`\`

Response:
\`\`\`json
{
  "success": true,
  "data": {
    "id": "uuid-123",
    "full_name": "John Doe",
    "status": "pending",
    "created_at": "2025-12-05T10:30:00Z"
  }
}
\`\`\`

---

## Admin Dashboard

### Dashboard Pages

#### 1. Main Dashboard (`/admin`)
Overview of key metrics:
- Total applications (with pending count)
- Contact inquiries
- Newsletter subscribers
- Payment statistics
- Revenue tracking

#### 2. Applications Management (`/admin/applications`)
Features:
- View all applications
- Filter by status (pending, approved, rejected)
- Search by name/email
- Export to CSV
- View application details

#### 3. Inquiries Management (`/admin/inquiries`)
Features:
- View contact inquiries
- Filter by status (new, read, responded)
- Search functionality
- Respond to inquiries via modal
- Track response status

#### 4. Payments Management (`/admin/payments`)
Features:
- View all M-Pesa transactions
- Filter by status (pending, success, failed)
- Total revenue calculation
- M-Pesa receipt tracking
- Export transaction history to CSV
- Transaction date tracking

#### 5. Subscribers Management (`/admin/subscribers`)
Features:
- View active newsletter subscribers
- Search by email
- Subscription date tracking
- Export subscriber list to CSV
- Subscriber count analytics

### Authentication

Admin access requires:
1. Login at `/admin/login`
2. Credentials: email (admin@engineerskenya.co.ke) and password (from env)
3. Token generation for session management

---

## M-Pesa Integration

### Setup

Required environment variables:
\`\`\`env
MPESA_ENVIRONMENT=sandbox  # or production
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=123456
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/callback
\`\`\`

### Implementation Flow

\`\`\`
1. User fills payment form (/payments)
2. Submit to /api/payments/initiate
3. Backend:
   - Gets M-Pesa access token
   - Creates payment record in DB (status: pending)
   - Initiates STK push
4. M-Pesa sends prompt to user's phone
5. User enters PIN
6. M-Pesa sends callback to /api/payments/callback
7. Backend updates payment record (status: success/failed)
8. Admin can track in /admin/payments
\`\`\`

### Key Functions

**getMpesaAccessToken()** - Authenticates with M-Pesa API
**initiatePayment()** - Sends STK push request
**checkTransactionStatus()** - Queries payment status

### Callback Handling

The callback endpoint:
1. Validates M-Pesa callback format
2. Extracts payment details
3. Updates payment record in database
4. Returns success response to M-Pesa

---

## Email Notifications

### Email Service

Uses Resend API for sending emails.

Required environment variable:
\`\`\`env
RESEND_API_KEY=your_resend_key
RESEND_FROM_EMAIL=noreply@engineerskenya.co.ke
\`\`\`

### Email Templates

#### 1. Application Confirmation
Sent when user submits application form
- Confirms receipt
- Provides next steps
- Contact information

#### 2. Contact Inquiry Confirmation
Sent when user submits contact form
- Confirms message received
- Expected response time
- Support contact info

#### 3. Payment Receipt
Sent after successful M-Pesa payment
- Payment details
- Receipt number
- Service information

### Implementation

Email function signature:
\`\`\`typescript
export async function sendEmail(data: EmailData): Promise<boolean>

interface EmailData {
  to: string
  subject: string
  htmlBody: string
}
\`\`\`

Template functions:
\`\`\`typescript
getApplicationConfirmationEmail(name, email)
getContactConfirmationEmail(name, email)
getPaymentReceiptEmail(phoneNumber, amount, receipt, email)
\`\`\`

---

## Frontend Features

### Components

#### Hero Section
- Background image with overlay
- Engaging headline
- Call-to-action buttons
- Smooth scroll animations

#### Services Section
- Service cards with icons
- Description for each service
- Alternating left/right animations
- Service inquiry buttons

#### About Section
- Company information
- Team/company background
- Professional imagery
- Split layout with animations

#### Application Form
- Service type selection
- Company details
- Budget and timeline
- Project description
- Form validation
- Success notification

#### Contact Section
- Contact form
- Contact information cards
- Location map
- Newsletter subscription

#### Testimonials
- Client testimonial cards
- Client images
- Auto-rotating carousel
- Professional styling

#### FAQ Section
- Accordion-style questions
- Expandable answers
- Service-specific FAQs

#### Footer
- Company info
- Quick links
- Social media
- Newsletter signup

### Navigation Bar

Dynamic features:
- Sticky positioning
- Dark/light mode toggle
- Active section highlighting
- Smooth color transitions
- Mobile menu with animations
- Dynamic text color based on section background

### Animations

- Entrance animations on scroll
- Smooth transitions
- Staggered element animations
- Hover effects
- Button state animations

---

## Testing

### Manual Testing Checklist

- [ ] Application form submission
- [ ] Contact form submission
- [ ] Newsletter subscription
- [ ] Payment flow (M-Pesa)
- [ ] Admin login
- [ ] Dashboard stats loading
- [ ] Application filtering/search
- [ ] Inquiry response
- [ ] Payment export
- [ ] Email notifications
- [ ] Dark mode toggle
- [ ] Mobile responsiveness

### API Testing

Use curl or Postman with examples from API_SPECIFICATIONS.md

---

## Troubleshooting

### Database Issues
- Check Supabase connection credentials
- Verify RLS policies are set correctly
- Ensure tables exist (run migration script)

### M-Pesa Issues
- Verify consumer key and secret
- Check business shortcode
- Validate phone number format
- Confirm callback URL is accessible

### Email Issues
- Check Resend API key
- Verify from email is approved
- Check spam folder
- Review email templates for errors

### Admin Dashboard Issues
- Clear browser cache
- Check authentication token
- Verify admin credentials
- Check API route permissions

---

**Last Updated**: December 2025
**Version**: 1.0
