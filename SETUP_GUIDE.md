# Project Setup Guide

## Quick Start

### Prerequisites
- Node.js 18+ and npm/yarn installed
- Vercel account
- GitHub account (for deployment)
- Supabase account
- M-Pesa Daraja API credentials (from Safaricom)

### Installation

1. **Clone the repository**
\`\`\`bash
git clone https://github.com/yourusername/kenyan-engineers.git
cd kenyan-engineers
\`\`\`

2. **Install dependencies**
\`\`\`bash
npm install
\`\`\`

3. **Set up environment variables**
\`\`\`bash
cp .env.example .env.local
# Edit .env.local with your credentials
\`\`\`

4. **Run database migrations**
\`\`\`bash
# Via Supabase Dashboard or using the scripts
npm run db:setup
\`\`\`

5. **Start development server**
\`\`\`bash
npm run dev
\`\`\`

Visit \`http://localhost:3000\`

## Database Setup

### Using Supabase Dashboard
1. Go to Supabase dashboard
2. Select your project
3. Go to SQL Editor
4. Copy and run the SQL from \`scripts/001_create_tables.sql\`
5. Copy and run the SQL from \`scripts/002_enable_rls.sql\`

### Using CLI
\`\`\`bash
npm run db:migrate
\`\`\`

## M-Pesa Setup

1. Register on [Safaricom Developer Portal](https://developer.safaricom.co.ke/)
2. Create a new app
3. In app settings:
   - Copy Consumer Key and Secret
   - Copy Business Shortcode
   - Create and copy PassKey
4. Add these to your environment variables
5. Test with sandbox credentials first

## Admin Dashboard

Access at \`/admin\` after deployment:

1. Default admin setup (create via Supabase):
   - Email: admin@engineerskenva.co.ke
   - Password: (set a strong password)

2. Users can manage:
   - Applications
   - Contact inquiries
   - Payments
   - Newsletter subscribers

## Deployment to Vercel

1. **Push to GitHub**
\`\`\`bash
git add .
git commit -m "Initial commit"
git push origin main
\`\`\`

2. **Connect to Vercel**
   - Go to vercel.com and import project
   - Select your GitHub repository
   - Vercel will auto-detect Next.js

3. **Add Environment Variables**
   - In Vercel dashboard: Settings → Environment Variables
   - Add all variables from \`docs/ENVIRONMENT_SETUP.md\`

4. **Deploy**
   - Vercel will automatically deploy when you push to main
   - Watch deployment logs for any errors

## Testing Payment Flow

### Sandbox Testing
1. Use test credentials in environment
2. Test phone: 254708374149
3. Test with small amounts (KES 10+)

### Production Migration
1. Get live credentials from Safaricom
2. Update M-Pesa environment variables
3. Test thoroughly before going live

## Troubleshooting

### Database Connection Issues
- Check SUPABASE_URL and keys are correct
- Verify database isn't sleeping (upgrade or add activity)
- Check Row Level Security policies

### M-Pesa Integration Issues
- Verify Consumer Key and Secret
- Check Business Shortcode matches
- Ensure callback URL is publicly accessible
- Test with sandbox environment first

### Email Not Sending
- Verify RESEND_API_KEY or SENDGRID_API_KEY
- Check FROM_EMAIL is verified in service
- Check spam/junk folder
- Verify email service limits

## Support

For issues:
1. Check documentation in \`/docs\`
2. Review GitHub Issues
3. Contact: support@engineerskenya.co.ke
