# API Specifications
## Kenyan Engineers Website

---

## 1. OVERVIEW

This document outlines all API endpoints for the Kenyan Engineers website backend. All endpoints are implemented as Next.js API Routes and use Supabase as the database backend.

---

## 2. BASE CONFIGURATION

### 2.1 Base URL
- Production: `https://[project-name].vercel.app/api`
- Development: `http://localhost:3000/api`

### 2.2 Headers
All requests should include:
\`\`\`
Content-Type: application/json
\`\`\`

### 2.3 Response Format
All responses follow this structure:
\`\`\`json
{
  "success": boolean,
  "data": object | null,
  "message": string | null,
  "error": string | null,
  "timestamp": "ISO8601 datetime"
}
\`\`\`

---

## 3. AUTHENTICATION (Future Implementation)

All protected endpoints require:
\`\`\`
Authorization: Bearer <JWT_TOKEN>
\`\`\`

---

## 4. ENDPOINTS

### 4.1 Applications Endpoint

#### Create Application
\`\`\`
POST /forms/apply

Request Body:
{
  "service_type": "structural | electrical | mechanical | construction",
  "company_name": "string",
  "contact_email": "string (valid email)",
  "contact_phone": "string",
  "project_description": "string",
  "budget_range": "string",
  "timeline": "string"
}

Response (Success - 201):
{
  "success": true,
  "data": {
    "id": "uuid",
    "service_type": "structural",
    "company_name": "Example Corp",
    "status": "pending",
    "created_at": "2025-12-05T10:30:00Z"
  },
  "message": "Application submitted successfully"
}

Response (Validation Error - 400):
{
  "success": false,
  "error": "Invalid email format"
}

Response (Server Error - 500):
{
  "success": false,
  "error": "Failed to save application"
}
\`\`\`

#### Get Application (Admin - Future)
\`\`\`
GET /forms/apply/:id
Authorization: Bearer <JWT_TOKEN>

Response (Success - 200):
{
  "success": true,
  "data": {
    "id": "uuid",
    "service_type": "structural",
    "company_name": "Example Corp",
    "contact_email": "contact@example.com",
    "project_description": "...",
    "status": "pending",
    "created_at": "2025-12-05T10:30:00Z"
  }
}
\`\`\`

#### List Applications (Admin - Future)
\`\`\`
GET /forms/apply?status=pending&limit=10&offset=0
Authorization: Bearer <JWT_TOKEN>

Response (Success - 200):
{
  "success": true,
  "data": {
    "applications": [...],
    "total": 42,
    "limit": 10,
    "offset": 0
  }
}
\`\`\`

---

### 4.2 Contact Inquiries Endpoint

#### Create Contact Inquiry
\`\`\`
POST /forms/contact

Request Body:
{
  "name": "string",
  "email": "string (valid email)",
  "phone": "string",
  "message": "string"
}

Response (Success - 201):
{
  "success": true,
  "data": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "status": "unread",
    "created_at": "2025-12-05T10:30:00Z"
  },
  "message": "Thank you for your inquiry"
}
\`\`\`

---

### 4.3 Newsletter Endpoint

#### Subscribe to Newsletter
\`\`\`
POST /forms/subscribe

Request Body:
{
  "email": "string (valid email)"
}

Response (Success - 201):
{
  "success": true,
  "data": {
    "email": "user@example.com",
    "status": "active",
    "subscribed_at": "2025-12-05T10:30:00Z"
  },
  "message": "Successfully subscribed to newsletter"
}

Response (Already Subscribed - 409):
{
  "success": false,
  "error": "Email already subscribed"
}
\`\`\`

#### Unsubscribe from Newsletter
\`\`\`
POST /forms/unsubscribe

Request Body:
{
  "email": "string"
}

Response (Success - 200):
{
  "success": true,
  "message": "Successfully unsubscribed"
}
\`\`\`

---

## 5. ERROR HANDLING

### 5.1 Error Codes

| Code | Message | Cause |
|------|---------|-------|
| 400 | Bad Request | Invalid request body or validation error |
| 401 | Unauthorized | Missing or invalid authentication token |
| 404 | Not Found | Resource not found |
| 409 | Conflict | Resource already exists (e.g., duplicate email) |
| 422 | Unprocessable Entity | Invalid data format |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Server-side error |

### 5.2 Error Response Example
\`\`\`json
{
  "success": false,
  "error": "Invalid email format",
  "timestamp": "2025-12-05T10:30:00Z"
}
\`\`\`

---

## 6. RATE LIMITING (To Implement)

| Endpoint | Limit | Window |
|----------|-------|--------|
| POST /forms/apply | 5 requests | per hour per IP |
| POST /forms/contact | 10 requests | per hour per IP |
| POST /forms/subscribe | 20 requests | per hour per IP |

---

## 7. VALIDATION RULES

### 7.1 Application Form
\`\`\`
service_type:         Required, enum, must match predefined services
company_name:         Required, string, 1-255 characters
contact_email:        Required, valid email format
contact_phone:        Required, phone number format
project_description:  Required, string, 10-5000 characters
budget_range:         Required, enum value
timeline:             Required, enum value
\`\`\`

### 7.2 Contact Form
\`\`\`
name:     Required, string, 2-255 characters
email:    Required, valid email format
phone:    Optional, phone number format
message:  Required, string, 10-5000 characters
\`\`\`

### 7.3 Newsletter
\`\`\`
email:    Required, valid email format, must be unique
\`\`\`

---

## 8. WEBHOOK SUPPORT (Future)

\`\`\`
POST /webhooks/application-submitted
POST /webhooks/contact-inquiry-received
\`\`\`

---

## 9. TESTING

### 9.1 Example Requests

#### Test Application Submission
\`\`\`bash
curl -X POST http://localhost:3000/api/forms/apply \
  -H "Content-Type: application/json" \
  -d '{
    "service_type": "structural",
    "company_name": "Test Company",
    "contact_email": "test@example.com",
    "contact_phone": "+254700000000",
    "project_description": "We need structural engineering support for our new building project",
    "budget_range": "KES 1M - 5M",
    "timeline": "3-6 months"
  }'
\`\`\`

#### Test Contact Inquiry
\`\`\`bash
curl -X POST http://localhost:3000/api/forms/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+254700000000",
    "message": "I would like to discuss a project with your team"
  }'
\`\`\`

---

## 10. PAGINATION (Future)

For list endpoints, use query parameters:
\`\`\`
GET /forms/apply?limit=10&offset=20&sort=-created_at

Response:
{
  "data": [...],
  "pagination": {
    "limit": 10,
    "offset": 20,
    "total": 150,
    "pages": 15,
    "has_next": true,
    "has_prev": true
  }
}
\`\`\`

---

## 11. FILTERING (Future)

\`\`\`
GET /forms/apply?status=pending&service_type=structural&date_from=2025-01-01&date_to=2025-12-31
\`\`\`

---

**Document Version:** 1.0  
**Last Updated:** December 2025  
**API Status:** Ready for Implementation
