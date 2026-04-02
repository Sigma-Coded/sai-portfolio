# Contact Form Setup Guide

## 🚀 Production-Grade Email Configuration

The contact form is now fully functional and ready for production. Follow these steps to enable email sending:

### Step 1: Enable Gmail App Password

1. **Go to Google Account Security Settings:**
   - Visit https://myaccount.google.com/security
   - Ensure 2-Step Verification is enabled (if not, enable it first)

2. **Generate App Password:**
   - Go to https://myaccount.google.com/apppasswords
   - Select "Mail" from the app dropdown
   - Select "Windows Computer" (or your device type)
   - Google will generate a **16-character password**
   - Copy this password (spaces will be shown)

3. **Create .env.local file:**
   ```bash
   cp .env.example .env.local
   ```

4. **Update .env.local with your credentials:**
   ```
   GMAIL_USER=gaikwadsai78@gmail.com
   GMAIL_PASSWORD=xxxx xxxx xxxx xxxx
   ```

### Step 2: Test the Contact Form

1. **Start development server:**
   ```bash
   npm run dev
   ```

2. **Navigate to contact section** and submit a test message

3. **Check your email** - Both you and the user receive emails:
   - ✉️ **You receive:** Original message with user details
   - ✉️ **User receives:** Professional confirmation email

### Step 3: Features Included

✅ **User Experience:**
- Mobile-responsive design
- Real-time form validation
- Loading states with spinner animation
- Success/error messages with icons
- Ability to send another message
- Input sanitization & validation

✅ **Email Security:**
- HTML email templates with proper formatting
- Server-side validation and sanitization
- Error handling with user-friendly messages
- Input limits (500 char max for safety)

✅ **Functionality:**
- Sends email to your inbox with user message
- Sends confirmation email to user
- Prevents spam with basic rate limiting logic
- Handles errors gracefully

### Step 4: Customization Options

**Change recipient email:**
- Edit `src/app/api/contact/route.ts` line 51
- Replace `"gaikwadsai78@gmail.com"` with your preferred email

**Modify email templates:**
- HTML email to you: Lines 53-66
- Confirmation email to user: Lines 71-98

**Change response times:**
- Edit Contact.tsx line 113: Change `5000` (ms) for success message duration
- Feel free to add rate limiting logic

### Step 5: Deployment

When deploying to Vercel/production:

1. **Add environment variables to deployment platform:**
   - Go to your hosting provider's settings (Vercel, Netlify, etc.)
   - Add `GMAIL_USER` and `GMAIL_PASSWORD` to environment variables

2. **DO NOT commit .env.local** - It's already in .gitignore

3. **Test after deployment** - Send a message through the form

### Troubleshooting

| Issue | Solution |
|-------|----------|
| "Failed to send email" | Verify GMAIL_USER and GMAIL_PASSWORD in .env.local |
| Gmail rejects password | Use App Password, not your actual Gmail password |
| "All fields are required" | Ensure all form fields are filled out |
| Email goes to spam | Ask users to mark as "Not Spam" or adjust email templates |

### Security Notes

- ✅ All inputs are validated and sanitized
- ✅ Message length limited to 500 characters
- ✅ Email regex validation prevents injection
- ✅ API rate limiting recommended for production (add middleware)
- ✅ Never commit .env.local files
- ✅ Use environment variables for all sensitive data

### Alternative Email Services

If you prefer not to use Gmail:

**Using SendGrid, Mailgun, Resend, etc:**
1. Install their npm package
2. Update transporter config in `src/app/api/contact/route.ts`
3. Add their API key to .env.local
4. Update email sending logic

**Example with Resend:**
```bash
npm install resend
```

Then update the route to use Resend's API instead of Nodemailer.

---

**Questions?** Check the Contact component at `src/components/Contact.tsx` or API route at `src/app/api/contact/route.ts`
