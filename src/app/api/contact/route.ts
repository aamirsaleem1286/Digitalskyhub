import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  subject: string;
  message: string;
}

function validateForm(data: unknown): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!data || typeof data !== "object") {
    return { valid: false, errors: { _form: "Invalid form data" } };
  }

  const form = data as Record<string, unknown>;

  // Name
  if (!form.name || typeof form.name !== "string" || form.name.trim().length < 2) {
    errors.name = "Name must be at least 2 characters";
  }

  // Email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!form.email || typeof form.email !== "string" || !emailRegex.test(form.email.trim())) {
    errors.email = "Please enter a valid email address";
  }

  // Phone (optional but must be valid if provided)
  if (form.phone && typeof form.phone === "string" && form.phone.trim()) {
    const phoneDigits = form.phone.replace(/[\s\-\(\)\+]/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      errors.phone = "Please enter a valid phone number";
    }
  }

  // Subject
  if (!form.subject || typeof form.subject !== "string" || form.subject.trim().length < 3) {
    errors.subject = "Subject must be at least 3 characters";
  }

  // Message
  if (!form.message || typeof form.message !== "string" || form.message.trim().length < 10) {
    errors.message = "Message must be at least 10 characters";
  }

  return { valid: Object.keys(errors).length === 0, errors };
}

export async function POST(request: Request) {
  try {
    const body: ContactFormData = await request.json();

    // Validate
    const { valid, errors } = validateForm(body);
    if (!valid) {
      return Response.json({ success: false, errors }, { status: 400 });
    }

    const { name, email, phone, service, budget, subject, message } = body;

    // If Resend key is not configured, simulate success for development
    if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === "re_placeholder_replace_with_your_key") {
      console.log("📧 [DEV MODE] Contact form submission:", { name, email, phone, service, budget, subject, message });
      return Response.json({
        success: true,
        message: "Message received! (DEV MODE — no email sent. Configure RESEND_API_KEY in .env.local)",
      });
    }

    const contactEmail = process.env.CONTACT_EMAIL || "info@digitalskyhub.com";

    // Send notification email to the business
    await resend.emails.send({
      from: "Digital Sky Hub <onboarding@resend.dev>",
      to: contactEmail,
      replyTo: email,
      subject: `New Contact: ${subject} — from ${name}`,
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, sans-serif; background: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #2563EB, #06B6D4, #7C3AED); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">New Contact Form Submission</h1>
              <p style="color: rgba(255,255,255,0.8); margin: 8px 0 0;">Digital Sky Hub</p>
            </div>
            <div style="padding: 32px;">
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666; width: 120px;">Name</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">${name}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Email</td><td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="mailto:${email}" style="color: #2563EB; text-decoration: none;">${email}</a></td></tr>
                ${phone ? `<tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Phone</td><td style="padding: 12px 0; border-bottom: 1px solid #eee;"><a href="tel:${phone}" style="color: #2563EB; text-decoration: none;">${phone}</a></td></tr>` : ""}
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Service</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">${service || "Not specified"}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Budget</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">${budget || "Not specified"}</td></tr>
                <tr><td style="padding: 12px 0; border-bottom: 1px solid #eee; color: #666;">Subject</td><td style="padding: 12px 0; border-bottom: 1px solid #eee; font-weight: 500;">${subject}</td></tr>
              </table>
              <div style="margin-top: 24px;">
                <h3 style="font-size: 14px; color: #666; text-transform: uppercase; letter-spacing: 0.5px;">Message</h3>
                <p style="background: #f9fafb; padding: 16px; border-radius: 8px; line-height: 1.6; white-space: pre-wrap;">${message}</p>
              </div>
            </div>
            <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">Sent via digitalskyhub.com contact form</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    // Send auto-reply to the customer
    await resend.emails.send({
      from: "Digital Sky Hub <onboarding@resend.dev>",
      to: email,
      subject: "Thank you for contacting Digital Sky Hub!",
      html: `
        <!DOCTYPE html>
        <html>
        <head><meta charset="utf-8"></head>
        <body style="font-family: -apple-system, sans-serif; background: #f5f5f5; padding: 40px;">
          <div style="max-width: 600px; margin: 0 auto; background: white; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.1);">
            <div style="background: linear-gradient(135deg, #2563EB, #06B6D4, #7C3AED); padding: 32px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px;">Thank You, ${name}! 🙌</h1>
            </div>
            <div style="padding: 32px;">
              <p style="font-size: 16px; line-height: 1.6;">Hi ${name},</p>
              <p style="font-size: 16px; line-height: 1.6;">Thank you for reaching out to <strong>Digital Sky Hub</strong>! We've received your message and our team will review it shortly.</p>
              <p style="font-size: 16px; line-height: 1.6;">Here's what you can expect:</p>
              <ul style="line-height: 2;">
                <li>📞 <strong>Response time:</strong> Within 24 hours</li>
                <li>💡 <strong>Next step:</strong> We'll schedule a free consultation call</li>
                <li>📋 <strong>We'll discuss:</strong> Your project goals, timeline, and budget</li>
              </ul>
              <div style="background: #f0f9ff; border-left: 4px solid #2563EB; padding: 16px; border-radius: 4px; margin: 24px 0;">
                <p style="margin: 0; font-size: 14px; color: #1e40af;">
                  <strong>Quick tip:</strong> For faster assistance, reach out on WhatsApp or call us directly.
                </p>
              </div>
              <p style="font-size: 16px; line-height: 1.6;">In the meantime, feel free to explore our <a href="https://digitalskyhub.com/portfolio" style="color: #2563EB;">portfolio</a> or check out our latest <a href="https://digitalskyhub.com/blog" style="color: #2563EB;">blog posts</a>.</p>
              <p style="font-size: 16px; line-height: 1.6;">Best regards,<br><strong>The Digital Sky Hub Team</strong></p>
            </div>
            <div style="background: #f9fafb; padding: 24px 32px; text-align: center; border-top: 1px solid #eee;">
              <p style="color: #999; font-size: 12px; margin: 0;">Digital Sky Hub — Innovate · Automate · Scale</p>
            </div>
          </div>
        </body>
        </html>
      `,
    });

    return Response.json({
      success: true,
      message: "Message sent! Check your email for confirmation.",
    });
  } catch (error) {
    console.error("Contact form error:", error);
    return Response.json(
      { success: false, errors: { _form: "Something went wrong. Please try again later." } },
      { status: 500 }
    );
  }
}
