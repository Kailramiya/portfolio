import nodemailer from 'nodemailer'

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

function asString(value) {
  if (typeof value !== 'string') return ''
  return value
}

function json(res, status, payload) {
  res.statusCode = status
  res.setHeader('Content-Type', 'application/json; charset=utf-8')
  res.end(JSON.stringify(payload))
}

function getConfig() {
  const host = process.env.SMTP_HOST
  const port = Number(process.env.SMTP_PORT || '587')
  const secure = String(process.env.SMTP_SECURE || '') === 'true' || port === 465
  const user = process.env.SMTP_USER
  const pass = process.env.SMTP_PASS
  const from = process.env.SMTP_FROM || user
  const to = process.env.CONTACT_TO || process.env.SMTP_TO || from
  const siteName = process.env.SITE_NAME || 'Portfolio'

  if (!host || !user || !pass || !from || !to) {
    const missing = [
      !host && 'SMTP_HOST',
      !user && 'SMTP_USER',
      !pass && 'SMTP_PASS',
      !from && 'SMTP_FROM',
      !to && 'CONTACT_TO',
    ].filter(Boolean)
    const error = new Error(`Missing email env vars: ${missing.join(', ')}`)
    error.code = 'CONFIG_MISSING'
    throw error
  }

  return { host, port, secure, user, pass, from, to, siteName }
}

export default async function handler(req, res) {
  // Allow only POST
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return json(res, 405, { ok: false, error: 'Method Not Allowed' })
  }

  try {
    const rawBody = req.body
    const body = typeof rawBody === 'string' ? JSON.parse(rawBody) : rawBody || {}

    // Honeypot (spam trap): must be empty
    const company = asString(body.company)
    if (company) {
      return json(res, 200, { ok: true })
    }

    const name = asString(body.name).trim()
    const email = asString(body.email).trim()
    const subject = asString(body.subject).trim()
    const message = asString(body.message).trim()

    if (!name || name.length > 100) {
      return json(res, 400, { ok: false, error: 'Invalid name' })
    }
    if (!EMAIL_RE.test(email) || email.length > 254) {
      return json(res, 400, { ok: false, error: 'Invalid email' })
    }
    if (!subject || subject.length > 150) {
      return json(res, 400, { ok: false, error: 'Invalid subject' })
    }
    if (!message || message.length > 5000) {
      return json(res, 400, { ok: false, error: 'Invalid message' })
    }

    const { host, port, secure, user, pass, from, to, siteName } = getConfig()

    const transporter = nodemailer.createTransport({
      host,
      port,
      secure,
      auth: { user, pass },
    })

    const submittedAt = new Date().toISOString()

    // 1) Email to you
    await transporter.sendMail({
      from: `${siteName} Contact Form <${from}>`,
      to,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `New contact form submission\n\nName: ${name}\nEmail: ${email}\nSubject: ${subject}\nSubmitted: ${submittedAt}\n\nMessage:\n${message}\n`,
    })

    // 2) Auto-reply to sender (optional; enabled by default)
    const autoReplyEnabled = String(process.env.AUTO_REPLY_ENABLED || 'true') === 'true'
    if (autoReplyEnabled) {
      await transporter.sendMail({
        from: `${siteName} <${from}>`,
        to: email,
        subject: `Thanks for reaching out — ${siteName}`,
        text: `Hi ${name},\n\nThanks for contacting me! I received your message and will reply as soon as possible.\n\n— Aman\n`,
      })
    }

    return json(res, 200, { ok: true })
  } catch (err) {
    console.error('Contact API error:', err)

    if (err?.code === 'CONFIG_MISSING') {
      return json(res, 500, { ok: false, error: 'Server email configuration missing' })
    }

    return json(res, 500, { ok: false, error: 'Failed to send message' })
  }
}
