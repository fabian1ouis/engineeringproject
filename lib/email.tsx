interface EmailData {
  to: string
  subject: string
  htmlBody: string
}

export async function sendEmail(data: EmailData): Promise<boolean> {
  try {
    if (!process.env.RESEND_API_KEY) {
      console.warn("RESEND_API_KEY not configured, skipping email")
      return true
    }

    const response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: process.env.RESEND_FROM_EMAIL || "noreply@engineerskenya.co.ke",
        to: data.to,
        subject: data.subject,
        html: data.htmlBody,
      }),
    })

    return response.ok
  } catch (err) {
    console.error("Email error:", err)
    return false
  }
}

export function getApplicationConfirmationEmail(name: string, email: string): EmailData {
  return {
    to: email,
    subject: "Application Received - Kenyan Engineers",
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #001a4d; border-bottom: 3px solid #001a4d; padding-bottom: 10px;">
              Application Received
            </h1>
            
            <p>Dear ${name},</p>
            
            <p>Thank you for submitting your application to Kenyan Engineers. We appreciate your interest in our services.</p>
            
            <p>Our team has received your application and will review it shortly. We typically respond within 24-48 hours.</p>
            
            <p>In the meantime, if you have any questions, please don't hesitate to contact us:</p>
            
            <ul>
              <li>Email: info@engineerskenya.co.ke</li>
              <li>Phone: +254 (712) 345-678</li>
            </ul>
            
            <p>Best regards,<br/>
            <strong>Kenyan Engineers Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </body>
      </html>
    `,
  }
}

export function getContactConfirmationEmail(name: string, email: string): EmailData {
  return {
    to: email,
    subject: "We Received Your Message - Kenyan Engineers",
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #001a4d; border-bottom: 3px solid #001a4d; padding-bottom: 10px;">
              Message Received
            </h1>
            
            <p>Hi ${name},</p>
            
            <p>Thank you for contacting Kenyan Engineers. We have received your message and our team will get back to you as soon as possible.</p>
            
            <p>Expected response time: 24 hours</p>
            
            <p>Best regards,<br/>
            <strong>Kenyan Engineers Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </body>
      </html>
    `,
  }
}

export function getPaymentReceiptEmail(phoneNumber: string, amount: number, receipt: string, email: string): EmailData {
  return {
    to: email,
    subject: "Payment Receipt - Kenyan Engineers",
    htmlBody: `
      <html>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
          <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
            <h1 style="color: #001a4d; border-bottom: 3px solid #001a4d; padding-bottom: 10px;">
              Payment Receipt
            </h1>
            
            <p>Your payment has been successfully processed.</p>
            
            <div style="background-color: #f5f5f5; padding: 15px; border-radius: 5px; margin: 20px 0;">
              <p><strong>Phone Number:</strong> ${phoneNumber}</p>
              <p><strong>Amount:</strong> KES ${amount.toLocaleString()}</p>
              <p><strong>Receipt Number:</strong> ${receipt}</p>
              <p><strong>Date:</strong> ${new Date().toLocaleDateString()}</p>
            </div>
            
            <p>Thank you for using our services. If you have any questions about this payment, please contact us.</p>
            
            <p>Best regards,<br/>
            <strong>Kenyan Engineers Team</strong></p>
            
            <hr style="border: none; border-top: 1px solid #ddd; margin: 20px 0;" />
            <p style="font-size: 12px; color: #666;">
              This is an automated email. Please do not reply to this message.
            </p>
          </div>
        </body>
      </html>
    `,
  }
}
