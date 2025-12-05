# Technical Architecture Document
## Kenyan Engineers Website

---

## 1. SYSTEM ARCHITECTURE

### 1.1 Architecture Diagram

\`\`\`
┌─────────────────────────────────────────────────────────┐
│                    USER BROWSER                         │
│  ┌──────────────────────────────────────────────────┐  │
│  │    React 19 / Next.js 15 Frontend Application   │  │
│  │  ┌────────────────────────────────────────────┐ │  │
│  │  │  Pages & Sections                          │ │  │
│  │  │  - Hero, Services, About, Testimonials    │ │  │
│  │  │  - Forms, FAQ, Contact, Footer            │ │  │
│  │  ├────────────────────────────────────────────┤ │  │
│  │  │  Components (UI)                           │ │  │
│  │  │  - Buttons, Cards, Forms, Modals          │ │  │
│  │  │  - Navigation, Animations                 │ │  │
│  │  ├────────────────────────────────────────────┤ │  │
│  │  │  Styling                                   │ │  │
│  │  │  - Tailwind CSS + Custom Animations       │ │  │
│  │  │  - Dark/Light Mode Support                │ │  │
│  │  └────────────────────────────────────────────┘ │  │
│  └──────────────────────────────────────────────────┘  │
└─────────────────────────────────────────────────────────┘
          │                              │
          │ HTTPS                        │ Form Data
          │                              │
          ▼                              ▼
┌──────────────────────────────────────────────────────────┐
│              VERCEL EDGE NETWORK                        │
│              (Content Delivery)                         │
└──────────────────────────────────────────────────────────┘
          │                              │
          │ API Calls                    │
          │                              │
          ▼                              ▼
┌──────────────────────────────────────────────────────────┐
│         NEXT.JS API ROUTES (Serverless Functions)       │
│   ┌────────────────────┐      ┌────────────────────┐  │
│   │ /api/applications  │      │ /api/payments/...  │  │
│   │ /api/contact       │      │ /api/newsletter    │  │
│   │ /api/emails        │      │ /api/admin/...     │  │
│   └────────────────────┘      └────────────────────┘  │
└──────────────────────────────────────────────────────────┘
     │         │              │              │
     │         │              │              │
     ▼         ▼              ▼              ▼
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│ Supabase │ │ M-Pesa   │ │ Resend   │ │ External │
│PostgreSQL│ │ Daraja   │ │ Email    │ │ Services │
│ Database │ │ API      │ │ Service  │ │          │
└──────────┘ └──────────┘ └──────────┘ └──────────┘
\`\`\`

---

## 2. DATA FLOW

### 2.1 Application Form Submission Flow

\`\`\`
1. User fills form in browser
   ↓
2. Client-side validation (Zod)
   ├─ Valid ✓ → Continue to step 3
   └─ Invalid ✗ → Display error message
   ↓
3. Submit to /api/forms endpoint
   ↓
4. Server-side validation
   ├─ Valid ✓ → Continue to step 5
   └─ Invalid ✗ → Return error response
   ↓
5. Store in Supabase "applications" table
   ├─ Success ✓ → Continue to step 6
   └─ Error ✗ → Log error, return to user
   ↓
6. Send confirmation email (Phase 2)
   ↓
7. Return success response to client
   ↓
8. Show success toast notification
\`\`\`

### 2.2 State Management Flow

\`\`\`
Page Component
├─ useScrollAnimation() → Manages entrance animations
├─ useActiveSection() → Tracks current section
├─ useTheme() → Manages light/dark mode
├─ useMediaQuery() → Detects mobile/desktop
└─ useRef() → Element references for scroll detection
\`\`\`

---

## 3. COMPONENT ARCHITECTURE

### 3.1 Component Hierarchy

\`\`\`
App (Root Layout)
├── ThemeProvider
│   └── Main Page
│       ├── Navigation (Sticky)
│       │   └── ThemeToggle
│       ├── HeroSection
│       ├── AboutSection
│       ├── ServicesSection
│       ├── ApplicationForm
│       ├── TestimonialsSection
│       ├── FAQSection
│       ├── ContactSection
│       └── Footer
\`\`\`

### 3.2 Component Responsibilities

| Component | Responsibility | State | Props |
|-----------|-----------------|-------|-------|
| Navigation | Display navigation, handle scroll tracking | theme, activeSection | - |
| HeroSection | Show hero content with animations | isVisible | - |
| Services | Display service cards | isVisible | - |
| ApplicationForm | Handle form submission | formState, step | - |
| Testimonials | Display rotating testimonials | currentIndex | - |
| Footer | Display footer content | - | - |

---

## 4. STYLING ARCHITECTURE

### 4.1 CSS Variable System

\`\`\`css
/* Light Mode */
:root {
  --primary: oklch(0.28 0.08 250);           /* Navy Blue */
  --primary-foreground: oklch(0.99 0 0);     /* White */
  --secondary: oklch(0.95 0.01 250);         /* Light Gray */
  --accent: oklch(0.65 0.15 220);            /* Bright Cyan */
  --background: oklch(0.99 0 0);             /* White */
  --foreground: oklch(0.25 0.02 250);        /* Dark Blue */
}

/* Dark Mode */
.dark {
  --primary: oklch(0.65 0.15 220);           /* Bright Cyan */
  --background: oklch(0.15 0.02 250);        /* Dark Blue */
  --foreground: oklch(0.98 0 0);             /* White */
}
\`\`\`

### 4.2 Animation System

\`\`\`css
/* Entrance Animations */
@keyframes fadeInUp { ... }     /* Fade + slide up */
@keyframes slideInLeft { ... }  /* Slide from left */
@keyframes slideInRight { ... } /* Slide from right */
@keyframes scaleIn { ... }      /* Zoom in effect */

/* Applied on scroll */
.animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
\`\`\`

---

## 5. DATABASE SCHEMA

### 5.1 Applications Table

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'reviewed', 'approved', 'rejected', 'completed'))
);

CREATE INDEX idx_applications_status ON applications(status);
CREATE INDEX idx_applications_email ON applications(email);
CREATE INDEX idx_applications_created_at ON applications(created_at);
\`\`\`

### 5.2 Contact Inquiries Table

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('new', 'read', 'responded', 'closed'))
);

CREATE INDEX idx_contact_inquiries_status ON contact_inquiries(status);
CREATE INDEX idx_contact_inquiries_email ON contact_inquiries(email);
\`\`\`

### 5.3 Newsletter Subscribers Table

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

CREATE INDEX idx_newsletter_subscribers_email ON newsletter_subscribers(email);
CREATE INDEX idx_newsletter_subscribers_active ON newsletter_subscribers(is_active);
\`\`\`

### 5.4 Payments Table

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
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  CONSTRAINT valid_status CHECK (status IN ('pending', 'success', 'failed', 'cancelled'))
);

CREATE INDEX idx_payments_phone ON payments(phone_number);
CREATE INDEX idx_payments_status ON payments(status);
CREATE INDEX idx_payments_created_at ON payments(created_at);
\`\`\`

### 5.5 Row-Level Security (RLS)

All tables have RLS enabled with policies:
- **INSERT**: Public (anyone can submit)
- **SELECT**: Authenticated admins only
- **UPDATE**: Authenticated admins only
- **DELETE**: Authenticated admins only

---

## 6. API ENDPOINTS

### 6.1 Applications API

\`\`\`
POST /api/applications
├─ Body:
│  ├─ full_name: string (required)
│  ├─ email: string (required, valid email)
│  ├─ phone: string (required)
│  ├─ company_name: string
│  ├─ service_type: enum (structural, electrical, mechanical, construction)
│  ├─ project_description: string
│  ├─ budget: string
│  ├─ timeline: string
│  └─ requirements: string
└─ Response: { success: true, data: { id, status, created_at } }
\`\`\`

### 6.2 Contact Inquiries API

\`\`\`
POST /api/contact
├─ Body:
│  ├─ name: string (required)
│  ├─ email: string (required, valid email)
│  ├─ phone: string
│  ├─ subject: string (required)
│  └─ message: string (required)
└─ Response: { success: true, data: { id, status: 'new' } }
\`\`\`

### 6.3 Newsletter API

\`\`\`
POST /api/newsletter
├─ Body:
│  └─ email: string (required, unique)
└─ Response: { success: true, data: { email, is_active: true } }
\`\`\`

### 6.4 Payments APIs

\`\`\`
POST /api/payments/initiate
├─ Body:
│  ├─ phone_number: string (required, Kenyan format)
│  ├─ amount: number (required, minimum 10)
│  ├─ service_type: string
│  └─ description: string
└─ Response: { success: true, checkout_request_id, merchant_request_id }

POST /api/payments/callback (M-Pesa Webhook)
├─ Body: M-Pesa STK push callback
└─ Response: { ResultCode: 0, ResultDesc: "Accepted" }
\`\`\`

### 6.5 Admin APIs

\`\`\`
GET /api/admin/stats
└─ Response: { totalApplications, pendingApplications, totalInquiries, totalPayments, revenueTotal }

GET /api/admin/auth/login
└─ Admin authentication for dashboard access
\`\`\`

---

## 7. SECURITY ARCHITECTURE

### 7.1 Frontend Security
- ✅ Environment variables for sensitive data
- ✅ Client-side validation before API calls
- ✅ No credential storage in localStorage
- ✅ HTTPS enforcement via Vercel

### 7.2 Backend Security (To Implement)
- Rate limiting on API endpoints
- Input sanitization and validation
- CORS configuration
- SQL injection prevention (via Supabase)
- Authentication middleware
- Role-based access control

---

## 8. PERFORMANCE OPTIMIZATION

### 8.1 Frontend Optimizations
- Next.js Image Optimization
- Code Splitting (automatic with Next.js)
- Lazy Loading components
- CSS Minification (automatic)
- Caching strategies

### 8.2 Backend Optimizations
- Database indexing on frequently queried fields
- Connection pooling via Supabase
- Query optimization
- Response compression

---

## 9. MONITORING & LOGGING

### 9.1 Frontend Monitoring
- Vercel Analytics (automatic)
- Web Vitals tracking
- Error boundary logging
- User interaction tracking

### 9.2 Backend Monitoring (To Implement)
- API endpoint performance metrics
- Database query performance
- Error logging and alerting
- Uptime monitoring

---

## 10. M-PESA INTEGRATION

### 10.1 Flow Diagram

\`\`\`
User Payment Form
    ↓
POST /api/payments/initiate
    ↓
Get M-Pesa Access Token
    ↓
Send STK Push Request
    ↓
Create Payment Record (pending)
    ↓
M-Pesa Prompt on User Phone
    ↓
User Enters PIN
    ↓
M-Pesa Sends Callback
    ↓
POST /api/payments/callback
    ↓
Update Payment Record (success/failed)
    ↓
Send Receipt Email
    ↓
Admin Views in Dashboard
\`\`\`

### 10.2 Environment Variables Required

\`\`\`env
MPESA_ENVIRONMENT=sandbox|production
MPESA_CONSUMER_KEY=your_consumer_key
MPESA_CONSUMER_SECRET=your_consumer_secret
MPESA_BUSINESS_SHORTCODE=your_shortcode
MPESA_PASSKEY=your_passkey
MPESA_CALLBACK_URL=https://yourdomain.com/api/payments/callback
\`\`\`

---

**Document Version:** 2.0  
**Last Updated:** December 2025
