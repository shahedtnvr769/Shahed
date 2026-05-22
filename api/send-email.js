const nodemailer = require('nodemailer');

// Vercel Serverless Function — handles POST /api/send-email
module.exports = async (req, res) => {
    // ── CORS Headers ──────────────────────────────────────────────────────────
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    // Handle preflight request
    if (req.method === 'OPTIONS') {
        return res.status(200).end();
    }

    if (req.method !== 'POST') {
        return res.status(405).json({ success: false, error: 'Method not allowed.' });
    }

    const { name, email, subject, message } = req.body;

    // ── Validation ─────────────────────────────────────────────────────────────
    if (!name || !email || !subject || !message) {
        return res.status(400).json({ success: false, error: 'All fields are required.' });
    }

    // ── Nodemailer Transporter ─────────────────────────────────────────────────
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER || 'shahedtnvr769@gmail.com',
            pass: process.env.GMAIL_APP_PASSWORD || 'ttwo gdmm eqdx qwrz'
        }
    });

    const mailOptions = {
        from: `"Portfolio Contact Form" <${process.env.GMAIL_USER || 'shahedtnvr769@gmail.com'}>`,
        to: process.env.GMAIL_USER || 'shahedtnvr769@gmail.com',
        replyTo: email,
        subject: `[Portfolio] ${subject}`,
        html: `
        <!DOCTYPE html>
        <html>
        <head>
            <meta charset="utf-8">
            <style>
                body { font-family: 'Georgia', serif; background-color: #0d0d0d; color: #e5e2e1; margin: 0; padding: 20px; }
                .container { max-width: 600px; margin: 0 auto; background: #1c1b1b; border: 1px solid rgba(233,193,118,0.2); border-radius: 8px; overflow: hidden; }
                .header { background: linear-gradient(135deg, #1c1b1b, #201f1f); padding: 40px 40px 30px; border-bottom: 1px solid rgba(233,193,118,0.15); }
                .header h1 { margin: 0; font-size: 28px; color: #e9c176; letter-spacing: 0.2em; text-transform: uppercase; }
                .header p { margin: 8px 0 0; font-size: 12px; color: #9a8f80; text-transform: uppercase; letter-spacing: 0.15em; }
                .body { padding: 40px; }
                .field { margin-bottom: 28px; }
                .field-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.15em; color: #9a8f80; margin-bottom: 8px; display: block; }
                .field-value { font-size: 16px; color: #e5e2e1; line-height: 1.6; }
                .field-value a { color: #e9c176; text-decoration: none; }
                .divider { border: none; border-top: 1px solid rgba(255,255,255,0.05); margin: 28px 0; }
                .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.08); border-radius: 4px; padding: 20px; font-size: 16px; color: #d1c5b4; line-height: 1.8; white-space: pre-wrap; }
                .footer { padding: 20px 40px; border-top: 1px solid rgba(255,255,255,0.05); text-align: center; font-size: 10px; color: #4e4639; text-transform: uppercase; letter-spacing: 0.1em; }
                .badge { display: inline-block; background: rgba(233,193,118,0.1); border: 1px solid rgba(233,193,118,0.3); color: #e9c176; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.1em; padding: 4px 12px; border-radius: 2px; margin-bottom: 16px; }
            </style>
        </head>
        <body>
            <div class="container">
                <div class="header">
                    <span class="badge">New Inquiry</span>
                    <h1>MD. Shahed</h1>
                    <p>Portfolio Contact Form — New Message Received</p>
                </div>
                <div class="body">
                    <div class="field">
                        <span class="field-label">From</span>
                        <div class="field-value">${name}</div>
                    </div>
                    <div class="field">
                        <span class="field-label">Reply-To Email</span>
                        <div class="field-value"><a href="mailto:${email}">${email}</a></div>
                    </div>
                    <hr class="divider">
                    <div class="field">
                        <span class="field-label">Subject</span>
                        <div class="field-value">${subject}</div>
                    </div>
                    <div class="field">
                        <span class="field-label">Message</span>
                        <div class="message-box">${message.replace(/\n/g, '<br>')}</div>
                    </div>
                </div>
                <div class="footer">
                    © ${new Date().getFullYear()} MD. Shahed Portfolio — Sent automatically from the contact form.
                </div>
            </div>
        </body>
        </html>
        `
    };

    try {
        await transporter.sendMail(mailOptions);
        return res.status(200).json({ success: true, message: 'Email sent successfully!' });
    } catch (error) {
        console.error('Email send error:', error.message);
        return res.status(500).json({ success: false, error: 'Failed to send email. Please try again.' });
    }
};
