// ── Input sanitization and validation utilities ───────────────────────────────

/** Escape HTML special characters to prevent XSS if output is ever rendered as HTML. */
export function escapeHtml(raw: string): string {
  return raw
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;')
    .replace(/\//g, '&#x2F;')
}

/** Strip all control characters except newlines and tabs (harmless in email body). */
export function stripControls(raw: string): string {
  // eslint-disable-next-line no-control-regex
  return raw.replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
}

/** Sanitize a single field: trim, strip control chars, escape HTML entities. */
export function sanitizeField(raw: string): string {
  return escapeHtml(stripControls(raw.trim()))
}

/** RFC 5321 / 5322 email regex — strict enough for server-side validation. */
const EMAIL_RE = /^[^\s@"'<>()[\]\\,;:]+@[^\s@"'<>()[\]\\,;:]+\.[^\s@"'<>()[\]\\,;:.]{2,}$/

export function isValidEmail(email: string): boolean {
  return EMAIL_RE.test(email) && email.length <= 254
}

export const FIELD_LIMITS = {
  name:    100,
  email:   254,
  subject: 200,
  message: 2_000,
} as const
