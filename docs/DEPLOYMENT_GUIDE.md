# Deployment Guide
## Kenyan Engineers Website

---

## 1. PREREQUISITES

- Node.js 18.17 or higher
- npm or yarn package manager
- Vercel account
- Supabase account
- GitHub account

---

## 2. ENVIRONMENT SETUP

### 2.1 Environment Variables

Create `.env.local` file in project root:

\`\`\`env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Database Connection
DATABASE_URL=postgresql://user:password@host:5432/database

# Email Configuration (When implementing Phase 2)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASSWORD=your-app-password
\`\`\`

### 2.2 Vercel Environment Variables

Add to Vercel project settings:
- All variables from `.env.local`
- Ensure `NEXT_PUBLIC_*` variables are marked as public

---

## 3. LOCAL DEVELOPMENT

### 3.1 Setup Steps

\`\`\`bash
# Clone repository
git clone https://github.com/username/engineeringproject.git
cd engineeringproject

# Install dependencies
npm install

# Create .env.local with Supabase credentials

# Run development server
npm run dev

# Open http://localhost:3000 in browser
\`\`\`

### 3.2 Testing Forms Locally

Forms submission will store data in your Supabase project. Test by:
1. Filling form on http://localhost:3000
2. Checking Supabase dashboard for new records

---

## 4. DEPLOYMENT TO VERCEL

### 4.1 Initial Setup

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Add environment variables
vercel env add
\`\`\`

### 4.2 Deployment

#### First Deployment
\`\`\`bash
# Deploy to production
vercel --prod

# Or push to main branch on GitHub
# Vercel will auto-deploy
\`\`\`

#### Subsequent Deployments
\`\`\`bash
# Option 1: Via CLI
vercel --prod

# Option 2: Via Git (Recommended)
git push origin main
# Vercel automatically deploys
\`\`\`

### 4.3 Vercel Configuration

`vercel.json` is already configured:
\`\`\`json
{
  "buildCommand": "npm run build",
  "installCommand": "npm install",
  "outputDirectory": ".next"
}
\`\`\`

---

## 5. DATABASE MIGRATIONS

### 5.1 Create Tables in Supabase

Use Supabase dashboard SQL editor or API:

\`\`\`bash
# Run migration script (when implemented)
npm run migrate:deploy
\`\`\`

Or manually create tables:
1. Go to Supabase dashboard
2. SQL Editor → New query
3. Copy schema from `docs/ARCHITECTURE.md`
4. Execute

---

## 6. DOMAIN SETUP

### 6.1 Connect Domain to Vercel

1. In Vercel dashboard → Project → Settings → Domains
2. Add your domain (e.g., kenyaengineers.com)
3. Update DNS records:
   - CNAME: www.kenyaengineers.com → Vercel nameserver
   - A record: kenyaengineers.com → Vercel IP

### 6.2 SSL/TLS Certificate

Automatic with Vercel. Certificate issued within 24 hours.

---

## 7. MONITORING & LOGS

### 7.1 Vercel Analytics

Dashboard shows:
- Traffic and performance metrics
- Page views and user sessions
- Error tracking
- Build performance

Access at: https://vercel.com/dashboard/projects

### 7.2 Application Logs

\`\`\`bash
# View live logs
vercel logs --follow

# View logs for specific deployment
vercel logs kenyaengineers.com
\`\`\`

---

## 8. ROLLBACK

\`\`\`bash
# View deployments
vercel deployments

# Rollback to previous deployment
vercel rollback

# Or specify deployment ID
vercel rollback deployment_id
\`\`\`

---

## 9. UPDATES & MAINTENANCE

### 9.1 Deploying Updates

\`\`\`bash
# Make changes locally
git add .
git commit -m "feat: add new feature"

# Push to main (or create PR)
git push origin main

# Vercel automatically deploys
\`\`\`

### 9.2 Updating Dependencies

\`\`\`bash
# Check for outdated packages
npm outdated

# Update packages
npm update

# Test locally
npm run dev

# Deploy
git push origin main
\`\`\`

---

## 10. TROUBLESHOOTING

### Issue: Build Fails
**Solution:**
\`\`\`bash
# Clear cache and rebuild
vercel rebuild

# Or check build logs in Vercel dashboard
\`\`\`

### Issue: Environment Variables Not Found
**Solution:**
1. Verify variables in Vercel Settings → Environment Variables
2. Redeploy project: `vercel --prod`
3. Check .env.local for local testing

### Issue: Database Connection Error
**Solution:**
1. Verify Supabase credentials in .env
2. Check Supabase project status
3. Ensure connection string is correct

---

## 11. SECURITY CHECKLIST

- [ ] Environment variables are set in Vercel
- [ ] No credentials in source code
- [ ] HTTPS enabled (automatic)
- [ ] Rate limiting configured
- [ ] CORS properly configured
- [ ] Database backups enabled
- [ ] Error logging configured

---

## 12. PERFORMANCE OPTIMIZATION

### 12.1 Vercel Edge Caching

Add to Next.js config:
\`\`\`javascript
// next.config.mjs
export default {
  experimental: {
    isrMemoryCacheSize: 50 * 1024 * 1024,
  },
}
\`\`\`

### 12.2 Image Optimization

Images are automatically optimized via Vercel. Ensure images are in `/public`:
\`\`\`jsx
import Image from 'next/image'

<Image
  src="/hero-bg.jpg"
  alt="Hero background"
  width={1200}
  height={600}
  priority
/>
\`\`\`

---

**Document Version:** 1.0  
**Last Updated:** December 2025
