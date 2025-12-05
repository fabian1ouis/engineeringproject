# Admin Dashboard Guide

## Overview

The admin dashboard provides tools to manage applications, inquiries, payments, and subscribers.

## Accessing the Dashboard

1. Navigate to `/admin/login`
2. Enter admin email and password
3. Click Login

### Default Admin Account
- Email: admin@engineerskenya.co.ke
- Password: (set during setup)

## Dashboard Features

### 1. Dashboard Home

Overview of key metrics:
- Total applications received
- Pending applications awaiting review
- Contact inquiries
- Total payment revenue
- Newsletter subscriber count

Quick action buttons to navigate to detailed management pages.

### 2. Applications Management

View all client applications with filtering and search:

**Columns:**
- Full Name
- Email
- Phone
- Company
- Service Type
- Status (Pending/Approved/Rejected)
- Application Date
- Actions

**Actions:**
- View full application details
- Change status
- Send email notification
- Export to CSV

**Filters:**
- Status (All/Pending/Approved/Rejected)
- Service type
- Date range
- Search by name or email

### 3. Contact Inquiries

Manage all contact form submissions:

**Columns:**
- Name
- Email
- Subject
- Message preview
- Status (New/Read/Responded)
- Date
- Actions

**Actions:**
- View full message
- Mark as read/responded
- Reply via email
- Delete
- Export

### 4. Payment Transactions

Track all M-Pesa payments:

**Columns:**
- Phone Number
- Amount (KES)
- Service Type
- Status (Pending/Success/Failed)
- M-Pesa Receipt
- Transaction Date
- Actions

**Analytics:**
- Total revenue
- Daily/monthly revenue charts
- Payment success rate
- Average transaction value

### 5. Newsletter Subscribers

Manage email list:

**Columns:**
- Email Address
- Subscription Date
- Status (Active/Inactive)
- Actions

**Actions:**
- Activate/Deactivate
- Send email campaign
- Export list
- Delete subscriber

## Common Tasks

### Responding to Application

1. Go to Applications
2. Click on application
3. Review details
4. Change status
5. Send email notification
6. Close

### Processing Payment

1. Go to Payments
2. Check transaction status
3. Verify M-Pesa receipt
4. Send receipt email
5. Update records

### Sending Newsletter

1. Go to Subscribers
2. Select recipients
3. Click "Send Campaign"
4. Compose message
5. Schedule or send immediately

### Exporting Data

Most sections support CSV export:
1. Apply filters (optional)
2. Click "Export"
3. Choose format
4. Download file

## User Roles

Currently, all admins have full access. Future versions will support:
- Super Admin - Full access
- Manager - Manage applications and inquiries
- Finance - Manage payments only
- Support - Respond to inquiries only

## Security

- Admin sessions expire after 24 hours
- All actions are logged
- Sensitive data is encrypted
- Row-level security enforces data access

## Troubleshooting

### Can't Login
- Verify email address is correct
- Check password
- Contact super admin to reset password

### Data Not Loading
- Refresh the page
- Check internet connection
- Verify authentication token

### Email Not Sending
- Check email service credentials
- Verify recipient email is valid
- Check spam folder

## Support

For admin issues:
- Email: support@engineerskenya.co.ke
- Phone: +254 (712) 345-678
