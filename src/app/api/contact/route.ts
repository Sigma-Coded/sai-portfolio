import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const RATE_LIMIT_WINDOW_MS = 10 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 3;
const rateLimitStore = new Map<string, number[]>();

// Email validation
function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Sanitize input
function sanitizeInput(text: string): string {
  return text.trim().slice(0, 500);
}

function getClientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) {
    return forwarded.split(",")[0]?.trim() || "unknown";
  }

  const realIp = request.headers.get("x-real-ip");
  if (realIp) {
    return realIp;
  }

  return "unknown";
}

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const existing = rateLimitStore.get(ip) || [];
  const fresh = existing.filter((ts) => now - ts < RATE_LIMIT_WINDOW_MS);

  if (fresh.length >= RATE_LIMIT_MAX_REQUESTS) {
    rateLimitStore.set(ip, fresh);
    return true;
  }

  fresh.push(now);
  rateLimitStore.set(ip, fresh);
  return false;
}

function isLikelySpam(message: string): boolean {
  const lowered = message.toLowerCase();
  const urls = lowered.match(/https?:\/\//g);
  const repeatedChars = /(.)\1{6,}/.test(lowered);
  const spamTerms = ["crypto", "forex", "casino", "loan", "buy now", "click here"];
  const hasSpamTerm = spamTerms.some((term) => lowered.includes(term));

  return Boolean((urls && urls.length > 2) || repeatedChars || hasSpamTerm);
}

export async function POST(request: NextRequest) {
  try {
    if (!process.env.GMAIL_USER || !process.env.GMAIL_PASSWORD) {
      return NextResponse.json(
        {
          error:
            "Email service is not configured. Please set GMAIL_USER and GMAIL_PASSWORD in .env.local.",
        },
        { status: 500 }
      );
    }

    const ip = getClientIp(request);
    if (isRateLimited(ip)) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few minutes and try again." },
        { status: 429 }
      );
    }

    const { name, email, message, website, submittedAt } = await request.json();

    // Honeypot: bots often fill hidden fields.
    if (website && String(website).trim().length > 0) {
      return NextResponse.json({ success: true }, { status: 200 });
    }

    // Validation
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    if (!validateEmail(email)) {
      return NextResponse.json(
        { error: "Invalid email format" },
        { status: 400 }
      );
    }

    const now = Date.now();
    const submittedTime = Number(submittedAt);
    if (!Number.isFinite(submittedTime) || now - submittedTime < 3000) {
      return NextResponse.json(
        { error: "Submission blocked. Please try again." },
        { status: 400 }
      );
    }

    if (name.trim().length < 2 || message.trim().length < 10) {
      return NextResponse.json(
        { error: "Please provide a bit more detail in your message." },
        { status: 400 }
      );
    }

    if (isLikelySpam(message)) {
      return NextResponse.json(
        { error: "Message looks automated/spam. Please revise and try again." },
        { status: 400 }
      );
    }

    // Sanitize inputs
    const sanitizedName = sanitizeInput(name);
    const sanitizedEmail = email.toLowerCase().trim();
    const sanitizedMessage = sanitizeInput(message);

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASSWORD,
      },
    });

    // Email to you
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: "gaikwadsai78@gmail.com",
      subject: `New Contact Form Submission from ${sanitizedName}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">New Message from Portfolio Contact Form</h2>
          <div style="background: #f3f4f6; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <p><strong>Name:</strong> ${sanitizedName}</p>
            <p><strong>Email:</strong> ${sanitizedEmail}</p>
            <p><strong>Message:</strong></p>
            <p style="white-space: pre-wrap; color: #374151;">${sanitizedMessage}</p>
          </div>
          <p style="color: #6b7280; font-size: 12px; margin-top: 20px;">
            This is an automated email from your portfolio contact form.
          </p>
        </div>
      `,
    });

    // Confirmation email to user
    await transporter.sendMail({
      from: process.env.GMAIL_USER,
      to: sanitizedEmail,
      subject: "Thank You for Reaching Out! 🙌",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #10b981;">Thank You, ${sanitizedName}!</h2>
          <p>I received your message and appreciate you taking the time to reach out.</p>
          
          <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 16px; margin: 20px 0; border-radius: 4px;">
            <p><strong>Here's what happens next:</strong></p>
            <ul style="margin: 10px 0; padding-left: 20px;">
              <li>I'll review your message carefully</li>
              <li>I'll get back to you within 24-48 hours</li>
              <li>Feel free to reach out again if you have follow-up questions</li>
            </ul>
          </div>

          <p>In the meantime, you can:</p>
          <ul style="margin: 10px 0; padding-left: 20px;">
            <li>Check out my projects and experience on the portfolio</li>
            <li>Connect with me on <a href="https://linkedin.com/in/sai-gaikwad-46a4a8222" style="color: #10b981; text-decoration: none;">LinkedIn</a></li>
            <li>View my work on <a href="https://github.com/gaikwadsai" style="color: #10b981; text-decoration: none;">GitHub</a></li>
          </ul>

          <div style="border-top: 1px solid #e5e7eb; margin-top: 20px; padding-top: 20px; color: #6b7280; font-size: 12px;">
            <p>Best regards,<br><strong>Sai Gaikwad</strong></p>
            <p style="margin: 10px 0;">📧 gaikwadsai78@gmail.com</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json(
      { success: true, message: "Email sent successfully!" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Failed to send email. Please try again later." },
      { status: 500 }
    );
  }
}
