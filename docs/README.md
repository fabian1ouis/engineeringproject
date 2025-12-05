# Kenyan Engineers - Project Documentation

Welcome to the comprehensive documentation for the Kenyan Engineers company website and backend system.

## Quick Navigation

- **[Product Requirements Document](./PRD.md)** - Project vision, features, and requirements
- **[Technical Architecture](./ARCHITECTURE.md)** - System design and components
- **[API Specifications](./API_SPECIFICATIONS.md)** - All endpoints and data models
- **[Implementation Guide](./IMPLEMENTATION.md)** - Detailed feature implementation
- **[M-Pesa Setup](./MPESA_SETUP.md)** - Payment gateway configuration
- **[Deployment Guide](./DEPLOYMENT_GUIDE.md)** - Vercel deployment instructions
- **[Environment Setup](./ENVIRONMENT_SETUP.md)** - Environment variables configuration

## Project Overview

**Kenyan Engineers** is a professional engineering services company website built with Next.js, featuring:

- Modern, responsive website with animations and dark mode
- Client application management system
- Contact inquiry handling
- Newsletter subscriptions
- M-Pesa payment integration
- Admin dashboard for data management
- Email notifications
- Database management via Supabase

## Tech Stack

### Frontend
- **Next.js 15.2.6** - React framework
- **React 19** - UI library
- **TypeScript** - Type safety
- **Tailwind CSS v4** - Styling
- **Shadcn/ui** - Component library
- **Framer Motion** - Animations
- **Radix UI** - Accessible components

### Backend
- **Next.js API Routes** - Serverless functions
- **Supabase** - PostgreSQL database
- **M-Pesa Daraja API** - Payment processing
- **Resend** - Email notifications

### Deployment
- **Vercel** - Hosting and CI/CD
- **GitHub** - Version control

## Features

### Public Website
- Hero section with CTAs
- Services showcase
- About company
- Team testimonials
- FAQ section
- Contact form
- Newsletter subscription
- M-Pesa payment page
- Responsive design
- Dark mode toggle
- Dynamic navigation highlighting

### Admin Dashboard
- Applications management
- Contact inquiries tracking
- Payment history
- Newsletter subscribers list
- Dashboard statistics
- Admin authentication

### Backend Systems
- Form submissions handling
- Data validation
- Email notifications
- M-Pesa payment processing
- Transaction management
- Row-level security

## Completed Features

### Backend Systems (Phase 1 - Complete)
- Database schema with 4 tables (applications, contact_inquiries, newsletter_subscribers, payments)
- M-Pesa payment integration with STK push
- API routes for forms, payments, and admin functions
- Email notifications via Resend API
- Row-level security (RLS) for data protection
- Admin dashboard with full CRUD operations

## Getting Started

### Development
\`\`\`bash
npm install
npm run dev
# Visit http://localhost:3000
\`\`\`

### Deployment
\`\`\`bash
git push origin main
# Vercel auto-deploys on GitHub push
\`\`\`

See [SETUP_GUIDE.md](../SETUP_GUIDE.md) for complete setup instructions.

## Project Structure

\`\`\`
kenyan-engineers/
├── app/
│   ├── api/              # API routes
│   ├── admin/            # Admin dashboard
│   ├── payments/         # Payment page
│   ├── layout.tsx        # Root layout
│   └── page.tsx          # Home page
├── components/
│   ├── ui/               # Shadcn UI components
│   ├── admin/            # Admin components
│   └── *.tsx             # Page sections
├── hooks/                # Custom hooks
├── lib/                  # Utilities
├── public/               # Static assets
├── scripts/              # Database scripts
└── docs/                 # Documentation
\`\`\`

## Key Documentation Files

### For Developers
- [SETUP_GUIDE.md](../SETUP_GUIDE.md) - Local development setup
- [ARCHITECTURE.md](./ARCHITECTURE.md) - System architecture
- [DATABASE_SCHEMA.md](./DATABASE_SCHEMA.md) - Database structure
- [ENVIRONMENT_SETUP.md](./ENVIRONMENT_SETUP.md) - Environment variables

### For API Consumers
- [API_SPECIFICATIONS.md](./API_SPECIFICATIONS.md) - All endpoints
- [MPESA_SETUP.md](./MPESA_SETUP.md) - Payment gateway configuration

### For Administrators
- [ADMIN_GUIDE.md](./ADMIN_GUIDE.md) - Dashboard usage
- [DEPLOYMENT_GUIDE.md](./DEPLOYMENT_GUIDE.md) - Production deployment

## Support & Contribution

- See [CONTRIBUTING.md](../CONTRIBUTING.md) for contribution guidelines
- For bugs or issues, open a GitHub issue
- Contact: support@engineerskenya.co.ke

## License

This project is proprietary software for Kenyan Engineers Ltd.
