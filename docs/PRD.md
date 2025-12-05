# Product Requirements Document (PRD)
## Kenyan Engineers - Professional Engineering Services Website

---

## 1. PROJECT OVERVIEW

**Project Name:** Kenyan Engineers Website  
**Client:** Professional Engineering Services Company (Kenya-based)  
**Project Type:** Full-Stack Web Application  
**Status:** Active Development (Phase 2)  
**Last Updated:** December 2025  

### 1.1 Project Vision
Create a modern, professional, and visually engaging website for a Kenyan engineering services company that showcases their expertise, manages client applications, processes M-Pesa payments, and provides an admin dashboard for business operations.

### 1.2 Key Objectives
- Establish a strong online presence in the Kenyan engineering market
- Showcase engineering expertise and project portfolio
- Generate qualified leads through an application form
- Build trust through client testimonials and case studies
- Provide easy contact and engagement pathways
- Support both desktop and mobile users seamlessly
- Implement premium animations and interactions for engagement
- Manage client applications efficiently
- Process M-Pesa payments securely
- Offer an admin dashboard for business operations

---

## 2. FEATURES & FUNCTIONALITY

### 2.1 Core Features
| Feature | Description | Status |
|---------|-------------|--------|
| Navigation Bar | Sticky navigation with dynamic section highlighting and color matching | ✅ Implemented |
| Hero Section | Eye-catching headline with CTA buttons and background imagery | ✅ Implemented |
| About Section | Company overview and value proposition with smooth animations | ✅ Implemented |
| Services Section | Detailed service offerings (Structural, Electrical, Mechanical, Construction Mgmt) | ✅ Implemented |
| Application Form | 3-step form for service inquiries with validation | ✅ Implemented |
| Testimonials Section | Auto-rotating client testimonials with Kenyan professional faces | ✅ Implemented |
| FAQ Section | Accordion-style frequently asked questions | ✅ Implemented |
| Contact Section | Contact information, inquiry form, and embedded map | ✅ Implemented |
| Footer | Newsletter subscription and company links | ✅ Implemented |
| Dark Mode | Full dark mode support with system detection | ✅ Implemented |
| Mobile Responsive | Optimized layout for all screen sizes | ✅ Implemented |
| M-Pesa Payment | Integration for payment processing through M-Pesa Daraja API | ✅ Implemented |
| Admin Dashboard | Full management capabilities for applications, inquiries, payments, and subscribers | ✅ Implemented |

### 2.2 Animation & UX Features
| Feature | Description | Status |
|---------|-------------|--------|
| Scroll Animations | Entrance animations on scroll with staggered timing | ✅ Implemented |
| Section Entrance | Slides in/out, fade-in-up, and scale animations | ✅ Implemented |
| Navigation Transitions | Smooth transitions between sections | ✅ Implemented |
| Dynamic NavBar Colors | Navbar adapts to section background colors | ✅ Implemented |
| Text Color Contrast | Auto-adjusting text color based on background brightness | ✅ Implemented |
| Theme Toggle | Smooth light/dark mode switching with animations | ✅ Implemented |
| Premium Typography | Playfair Display for headings, Inter for body text | ✅ Implemented |

---

## 3. TECHNOLOGY STACK

### 3.1 Frontend Stack

#### Framework & Core
- **Next.js 15.2.6** - React-based framework with App Router and SSR capabilities
- **React 19** - UI component library
- **TypeScript 5** - Type safety and development experience

#### UI & Styling
- **Tailwind CSS 4.1.9** - Utility-first CSS framework
- **shadcn/ui** - Pre-built, customizable component library
- **Radix UI** - Unstyled, accessible component primitives
- **PostCSS 8.5** - CSS transformation tool

#### State Management & Forms
- **React Hook Form 7.60.0** - Performant form state management
- **Zod 3.25.76** - TypeScript-first schema validation
- **@hookform/resolvers 3.10.0** - Form validation resolution

#### Animations & UX
- **tailwindcss-animate 1.0.7** - CSS animation utilities
- **tw-animate-css 1.3.3** - Extended animation library
- **embla-carousel-react 8.5.1** - Carousel/slider component
- **lucide-react 0.454.0** - Icon library (1,400+ icons)

#### Theme & Dark Mode
- **next-themes 0.4.6** - Theme management with localStorage persistence

#### Utilities
- **class-variance-authority 0.7.1** - CSS class composition utility
- **clsx 2.1.1** - Conditional class name utility
- **tailwind-merge 2.5.5** - Merge Tailwind CSS classes intelligently
- **date-fns 4.1.0** - Date manipulation library
- **sonner 1.7.4** - Toast notification system
- **vaul 0.9.9** - Drawer component
- **cmdk 1.0.4** - Command menu component
- **react-day-picker 9.8.0** - Calendar component
- **input-otp 1.4.1** - OTP input component

#### Analytics
- **@vercel/analytics** - Performance and user analytics

#### Development Tools
- **ESLint** - Code linting
- **Autoprefixer 10.4.20** - CSS vendor prefixing
- **TypeScript** - Static type checking

### 3.2 Backend Stack (Current & Future)

#### Database
- **Supabase PostgreSQL** - PostgreSQL database with real-time capabilities
  - Environment Variables: `SUPABASE_POSTGRES_URL`, `SUPABASE_POSTGRES_HOST`, `SUPABASE_POSTGRES_DATABASE`
  - Connection Pooling: `SUPABASE_POSTGRES_PRISMA_URL`
  - Direct Connection: `SUPABASE_POSTGRES_URL_NON_POOLING`

#### Authentication (Ready for Implementation)
- **Supabase Auth** - JWT-based authentication
  - Service Role Key: `SUPABASE_SUPABASE_SERVICE_ROLE_KEY`
  - Anon Key: `SUPABASE_SUPABASE_ANON_KEY`
  - Public Anon Key: `SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY`

#### API Routes
- **Next.js API Routes** - Serverless functions for backend logic
- RESTful endpoints for form submissions, queries, etc.

---

## 4. ARCHITECTURE OVERVIEW

### 4.1 Frontend Architecture

\`\`\`
app/
├── layout.tsx              # Root layout with theme provider and fonts
├── page.tsx                # Main landing page
├── globals.css             # Global styles, animations, and theme variables
└── ...

components/
├── navigation.tsx          # Header with dynamic color matching
├── hero-section.tsx        # Hero banner with CTA
├── about-section.tsx       # Company overview
├── services-section.tsx    # Service cards with animations
├── application-form.tsx    # 3-step inquiry form
├── testimonials-section.tsx # Client testimonials carousel
├── faq-section.tsx         # FAQ accordion
├── contact-section.tsx     # Contact form and details
├── footer.tsx              # Footer with newsletter signup
├── theme-provider.tsx      # Theme context provider
├── theme-toggle.tsx        # Dark mode toggle button
└── ui/                     # shadcn/ui components

hooks/
├── use-scroll-animation.ts # Scroll-triggered animations
├── use-active-section.ts   # Track active section on scroll
└── use-mobile.ts           # Mobile breakpoint detection

lib/
└── utils.ts                # Utility functions (cn, etc.)

public/
├── hero-bg.jpg             # Hero section background
├── services-bg.jpg         # Services section background
├── about-bg.jpg            # About section background
├── testimonials-bg.jpg     # Testimonials section background
├── testimonial-james.jpg   # Client profile image
├── testimonial-amara.jpg   # Client profile image
└── testimonial-david.jpg   # Client profile image

docs/
├── PRD.md                  # This document
├── ARCHITECTURE.md         # Technical architecture details
└── API_SPECIFICATIONS.md   # Backend API specifications
\`\`\`

### 4.2 Component Structure

Each major section follows this pattern:
\`\`\`tsx
export function SectionName() {
  const ref = useRef<HTMLDivElement>(null)
  const { isVisible, hasAnimated } = useScrollAnimation(ref)
  
  return (
    <section ref={ref} className="...">
      {/* Content with conditional animations based on isVisible */}
    </section>
  )
}
\`\`\`

### 4.3 Styling System

- **Design Tokens** defined in `globals.css`:
  - Colors: Primary (Navy Blue), Secondary, Accent, Neutrals
  - Fonts: Display (Playfair), Sans (Inter)
  - Radius and spacing scales
  
- **Dark Mode** implementation:
  - CSS variables with light/dark variants
  - Automatic system preference detection
  - Manual override capability

---

## 5. BACKEND PLAN

### 5.1 Current Status - Phase 1 Complete
Backend infrastructure is fully implemented with database, API routes, M-Pesa integration, and email system operational.

### 5.2 Implemented: Database & API (Phase 1 - Complete)
**Completion:** December 2025

**Implementation:**
- ✅ Created 4 production tables in Supabase PostgreSQL
- ✅ API routes for all form submissions
- ✅ M-Pesa Daraja API integration
- ✅ Email notifications system
- ✅ Admin dashboard with full management capabilities

**Tables Implemented:**
\`\`\`sql
-- Applications table (for service inquiries)
CREATE TABLE applications (
  id UUID PRIMARY KEY, service_type VARCHAR(50), company_name VARCHAR(255),
  status VARCHAR(50) DEFAULT 'pending', ... created_at TIMESTAMP
);

-- Contact Inquiries table
CREATE TABLE contact_inquiries (
  id UUID PRIMARY KEY, full_name VARCHAR(255), email VARCHAR(255),
  status VARCHAR(50) DEFAULT 'new', response TEXT, ... timestamps
);

-- Newsletter Subscribers table
CREATE TABLE newsletter_subscribers (
  id UUID PRIMARY KEY, email VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT true, ... timestamps
);

-- Payments table (M-Pesa transactions)
CREATE TABLE payments (
  id UUID PRIMARY KEY, phone_number VARCHAR(20), amount DECIMAL(10,2),
  status VARCHAR(50) DEFAULT 'pending', mpesa_receipt_number VARCHAR(100), ... timestamps
);
\`\`\`

### 5.3 Implemented: M-Pesa Integration (Phase 1 - Complete)
**Features:**
- STK push payment initiation
- Callback handling and validation
- Transaction persistence to database
- Payment receipt generation
- Transaction history tracking in admin dashboard
- Support for both sandbox and production modes

### 5.4 Implemented: Email Notifications (Phase 1 - Complete)
**Features:**
- Application confirmation emails
- Contact inquiry acknowledgment emails
- Payment receipt emails
- Using Resend API (configured, can be enabled)

### 5.5 Implemented: Admin Dashboard (Phase 1 - Complete)
**Pages:**
- `/admin/` - Dashboard overview with statistics
- `/admin/applications` - Application management with filtering and export
- `/admin/inquiries` - Contact inquiry management with response capability
- `/admin/payments` - Payment tracking with revenue analytics
- `/admin/subscribers` - Newsletter subscriber management

### 5.6 Phase 2: Optimization & Enhancement (Next)
**Timeline:** Q1 2026

**Planned:**
- Performance optimization
- Advanced analytics
- Automated admin notifications
- Batch email capabilities
- Payment report generation

---

## 6. DATABASE SCHEMA (Ready for Implementation)

### 6.1 Environment Variables
All database credentials are pre-configured:

\`\`\`
SUPABASE_SUPABASE_URL          # Supabase project URL
SUPABASE_NEXT_PUBLIC_SUPABASE_URL
SUPABASE_NEXT_PUBLIC_SUPABASE_ANON_KEY
SUPABASE_SUPABASE_ANON_KEY
SUPABASE_SUPABASE_SERVICE_ROLE_KEY
SUPABASE_SUPABASE_JWT_SECRET

SUPABASE_POSTGRES_URL          # Direct PostgreSQL connection
SUPABASE_POSTGRES_PRISMA_URL   # Connection pool
SUPABASE_POSTGRES_URL_NON_POOLING
SUPABASE_POSTGRES_HOST
SUPABASE_POSTGRES_PORT
SUPABASE_POSTGRES_DATABASE
SUPABASE_POSTGRES_USER
SUPABASE_POSTGRES_PASSWORD
\`\`\`

---

## 7. DEPLOYMENT & HOSTING

### 7.1 Frontend Hosting
- **Platform:** Vercel (Recommended)
- **Benefits:** Automatic deployment from Git, edge functions, analytics
- **Build Command:** `npm run build`
- **Start Command:** `npm start`

### 7.2 Database Hosting
- **Platform:** Supabase Cloud (Hosted PostgreSQL)
- **Automatic Backups:** Yes
- **Scaling:** Auto-scaling included

### 7.3 CI/CD Pipeline
\`\`\`
Git Push → GitHub → Vercel → Automatic Deployment → Live
\`\`\`

---

## 8. PERFORMANCE TARGETS

| Metric | Target | Tool |
|--------|--------|------|
| First Contentful Paint (FCP) | < 1.5s | Vercel Analytics |
| Largest Contentful Paint (LCP) | < 2.5s | Vercel Analytics |
| Cumulative Layout Shift (CLS) | < 0.1 | Vercel Analytics |
| Time to Interactive (TTI) | < 3.5s | Vercel Analytics |
| Lighthouse Score | > 90 | Google Lighthouse |
| Mobile Score | > 85 | Google PageSpeed |

---

## 9. SEO & ACCESSIBILITY

### 9.1 SEO Implementation
- ✅ Meta tags for title and description
- ✅ Open Graph tags for social sharing
- ✅ Structured data (JSON-LD ready)
- ✅ Mobile-first responsive design
- ✅ Fast performance metrics
- ✅ Clean, semantic HTML

### 9.2 Accessibility (WCAG 2.1 AA)
- ✅ Proper heading hierarchy
- ✅ Alt text for all images
- ✅ ARIA labels and roles
- ✅ Keyboard navigation
- ✅ Color contrast compliance
- ✅ Screen reader friendly

---

## 10. SECURITY CONSIDERATIONS

### 10.1 Frontend Security
- ✅ No sensitive data in client-side code
- ✅ Environment variables for API keys
- ✅ CSRF protection ready
- ✅ XSS prevention via React

### 10.2 Backend Security (When Implemented)
- [ ] Rate limiting on API endpoints
- [ ] Input validation and sanitization
- [ ] SQL injection prevention (Supabase handles via parameterized queries)
- [ ] Authentication on protected endpoints
- [ ] HTTPS/TLS encryption (automatic with Vercel)
- [ ] CORS configuration

---

## 11. TOOLS & SERVICES USED

### 11.1 Development Tools
- **v0.app** - AI-powered component generation and development
- **VS Code** - Code editor
- **Git/GitHub** - Version control
- **npm** - Package manager

### 11.2 Design & Content
- **Figma** (ready for use) - UI/UX design
- **Tailwind CSS** - Responsive design system
- **shadcn/ui** - Component library

### 11.3 Hosting & Infrastructure
- **Vercel** - Frontend hosting and deployment
- **Supabase** - Database and backend infrastructure
- **Vercel Analytics** - Performance monitoring

### 11.4 Additional Services (Optional)
- **Resend/SendGrid** - Email delivery (for Phase 2)
- **Stripe** - Payment processing (if needed)
- **Google Analytics** - User analytics

---

## 12. PROJECT MILESTONES

| Phase | Description | Timeline | Status |
|-------|-------------|----------|--------|
| Phase 0 | Initial design & setup | ✅ Complete | Done |
| Phase 1 | Core website with animations | ✅ Complete | Done |
| Phase 1b | Database, APIs, M-Pesa, Admin | ✅ Complete | Done |
| Phase 2 | Optimization & Enhancement | 📅 Q1 2026 | Planned |
| Phase 3 | Advanced Features | 📅 Q2 2026 | Queued |

---

## 13. DEVELOPMENT GUIDELINES

### 13.1 Code Standards
- **Language:** TypeScript (strict mode)
- **Style:** Tailwind CSS for styling
- **Components:** Functional components with hooks
- **File Naming:** kebab-case for files, PascalCase for components
- **Formatting:** Automatic via Prettier (when configured)

### 13.2 Component Development
\`\`\`tsx
// Always use proper typing
interface ComponentProps {
  title: string
  children: React.ReactNode
}

export function Component({ title, children }: ComponentProps) {
  // Use hooks for state management
  // Use custom hooks for reusable logic
  // Return typed JSX
  return <div>{children}</div>
}
\`\`\`

### 13.3 Git Workflow
- Branch from `main`
- Create feature branches: `feature/feature-name`
- Commit messages: `feat: add feature` or `fix: resolve issue`
- Create pull requests for review

---

## 14. DEPENDENCIES & VERSIONS

See `package.json` for complete dependency list. Key versions:

- Next.js: 15.2.6
- React: 19
- TypeScript: 5
- Tailwind CSS: 4.1.9
- Node.js: 18.17+ recommended

---

## 15. TROUBLESHOOTING & SUPPORT

### Common Issues

**Issue:** Build fails with Tailwind CSS errors
- **Solution:** Run `npm install` and clear `.next` directory

**Issue:** Dark mode not working
- **Solution:** Ensure `ThemeProvider` is properly wrapped in layout

**Issue:** Animations not triggering on scroll
- **Solution:** Check that `useScrollAnimation` hook is properly imported and ref is attached

**Issue:** Mobile menu not showing
- **Solution:** Verify mobile breakpoint is correct and menu toggle is working

**Issue:** M-Pesa payment not processing
- **Solution:** Check API keys and ensure Daraja API is correctly configured

---

## 16. FUTURE ENHANCEMENTS

- [ ] Blog section for engineering insights
- [ ] Project portfolio/case studies with images
- [ ] Team member profiles
- [ ] Client logos/partners section
- [ ] Multi-language support (Swahili)
- [ ] Advanced analytics dashboard
- [ ] CRM integration for lead management
- [ ] Chatbot for instant support
- [ ] Video content integration
- [ ] Payment integration for online services

---

## 17. MAINTENANCE & UPDATES

### 17.1 Regular Maintenance
- Update dependencies monthly
- Security patches: immediate
- Monitor performance metrics weekly
- Test all forms monthly
- Backup database: daily (automatic with Supabase)

### 17.2 Content Updates
- Update testimonials quarterly
- Refresh service descriptions as needed
- Update contact information promptly
- Archive old news/updates

---

## 18. CONTACT & SUPPORT

**Project Lead:** [Your Name]  
**Repository:** https://github.com/[username]/engineeringproject  
**Deployment:** https://[project-name].vercel.app  
**Support Email:** support@engineeringcompany.ke  

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**Next Review:** March 2026
