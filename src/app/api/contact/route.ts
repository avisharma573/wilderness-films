import { NextRequest, NextResponse } from 'next/server'
import { rateLimit } from '@/lib/rate-limit'
import { sanitizeField, isValidEmail, FIELD_LIMITS } from '@/lib/sanitize'

// ── Helpers ───────────────────────────────────────────────────────────────────

/** Extract the real client IP, respecting Vercel's forwarding headers. */
function getClientIp(req: NextRequest): string {
  return (
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
    req.headers.get('x-real-ip') ??
    'unknown'
  )
}

/** Generic error response that never leaks internal details. */
function err(message: string, status: number) {
  return NextResponse.json({ error: message }, { status })
}

// ── POST /api/contact ─────────────────────────────────────────────────────────
export async function POST(req: NextRequest) {

  // 1. Rate limiting — 5 submissions per IP per minute
  const ip = getClientIp(req)
  if (!rateLimit(ip, 5, 60_000)) {
    return err('Too many requests. Please wait a minute and try again.', 429)
  }

  // 2. Parse body — reject malformed JSON immediately
  let body: Record<string, unknown>
  try {
    body = await req.json()
  } catch {
    return err('Invalid request.', 400)
  }

  // 3. Honeypot check — bots fill the hidden "website" field; humans never see it
  if (body.website) {
    // Return a fake 200 so bots don't retry
    return NextResponse.json({ success: true })
  }

  // 4. Type guard — all required fields must be non-empty strings
  const { name, email, subject, message } = body
  if (
    typeof name    !== 'string' || !name.trim()    ||
    typeof email   !== 'string' || !email.trim()   ||
    typeof subject !== 'string' || !subject.trim() ||
    typeof message !== 'string' || !message.trim()
  ) {
    return err('All fields are required.', 400)
  }

  // 5. Length validation — prevent payload bloat / storage abuse
  if (name.length    > FIELD_LIMITS.name)    return err('Name is too long.',    400)
  if (email.length   > FIELD_LIMITS.email)   return err('Email is too long.',   400)
  if (subject.length > FIELD_LIMITS.subject) return err('Subject is too long.', 400)
  if (message.length > FIELD_LIMITS.message) return err('Message is too long.', 400)

  // 6. Email format validation
  if (!isValidEmail(email)) {
    return err('Please enter a valid email address.', 400)
  }

  // 7. Sanitize all fields before any downstream use
  const clean = {
    name:    sanitizeField(name),
    email:   sanitizeField(email),
    subject: sanitizeField(subject),
    message: sanitizeField(message),
  }

  // 8. Deliver via Web3Forms
  const payload = {
    access_key: process.env.WEB3FORMS_KEY!,
    from_name:  clean.name,
    reply_to:   clean.email,
    cc:         'dharanshidang@gmail.com',
    subject:    `[WildFilmsIndia] ${clean.subject}`,
    message:    `From: ${clean.name} <${clean.email}>\n\n${clean.message}`,
  }

  let w3res: Response
  try {
    w3res = await fetch('https://api.web3forms.com/submit', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body:    JSON.stringify(payload),
    })
  } catch (e) {
    console.error('[web3forms] fetch threw:', e)
    return err('Failed to send message. Please try again.', 502)
  }

  const w3data = await w3res.json().catch(() => ({}))
  console.log('[web3forms] status:', w3res.status, 'body:', w3data)

  if (!w3res.ok) {
    return err('Failed to send message. Please try again.', 502)
  }

  if (process.env.NODE_ENV === 'development') {
    console.log('[contact] sent', { ...clean, ip })
  }

  return NextResponse.json({ success: true }, { status: 200 })
}

// ── Block all other HTTP methods explicitly ───────────────────────────────────
export async function GET()    { return err('Method not allowed.', 405) }
export async function PUT()    { return err('Method not allowed.', 405) }
export async function PATCH()  { return err('Method not allowed.', 405) }
export async function DELETE() { return err('Method not allowed.', 405) }
