// Single source of truth for contact details and form delivery.
// Imported by src/pages/Contact.jsx and src/components/SiteFooter.jsx.

export const CONTACT = {
  email: 'info@gratitudefarms.co.in',
  phoneDisplay: '+91 91500 23044',
  phoneDial: '+919150023044',
  whatsapp: '919150023044',
  addressLines: ['No. 70, Auroville Main Road', 'Kottakuppam, Pondicherry – 605104', 'India'],
  social: {
    facebook: 'https://www.facebook.com/gratitudefarmsindia/',
    instagram: 'https://www.instagram.com/gratitude_farms/',
    linkedin: 'https://www.linkedin.com/company/gratitudefarmsindia',
    youtube: 'https://www.youtube.com/channel/UC61AuTlj_15ZXKLPCQF-F2w'
  }
};

// ---------------------------------------------------------------------------
// Form delivery
//
// Submissions go to a Google Apps Script web app bound to the enquiries sheet,
// which appends a row and emails a copy. The script itself is checked in at
// tools/google-sheet-endpoint.gs, with its install steps at the top.
//
// FORM_TOKEN is not a secret — it ships inside this bundle like everything
// else here. It exists so the endpoint can ignore stray traffic, and it must
// match TOKEN in the script.
//
// While FORM_ENDPOINT is null the forms stay fully usable: they validate, then
// hand the completed enquiry to the visitor's mail client, pre-addressed and
// pre-filled. Nothing is silently dropped either way — and that is also the
// fallback whenever a send fails.
//
// The site's Content-Security-Policy (vite.config.js) names the origins the
// browser may post to. Any new endpoint has to be added to `connect-src`
// there too, or submissions are blocked before they leave the page.
// ---------------------------------------------------------------------------

export const FORM_ENDPOINT = null;
export const FORM_TOKEN = 'm8VddUf2YM5YPPNaubhyD52m';

export function mailtoLink(subject, fields) {
  const body = Object.entries(fields)
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Delivers an enquiry. Resolves to 'sent' when the endpoint accepted it, or
 * 'mailto' when the visitor's mail client was opened instead. Rejects only
 * when neither route worked, so callers can show an error.
 *
 * `form` picks the sheet tab: 'enquiry' or 'newsletter'.
 *
 * The body goes as text/plain on purpose. A JSON content type would make the
 * browser send a CORS preflight first, and Apps Script does not answer those,
 * so the request would fail before it was ever delivered. The script parses
 * the body itself, so the header costs nothing.
 */
export async function submitEnquiry(subject, fields, form = 'enquiry') {
  if (FORM_ENDPOINT) {
    try {
      const res = await fetch(FORM_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify({ token: FORM_TOKEN, form, subject, fields }),
        redirect: 'follow'
      });

      if (!res.ok) throw new Error(`Submission failed (${res.status})`);

      const result = await res.json().catch(() => ({ ok: true }));
      if (result.ok === false) throw new Error(result.error || 'Submission refused');

      return 'sent';
    } catch (err) {
      // The sheet is unreachable — offline, a bad deployment, a blocked
      // request. An enquiry the visitor has already typed is worth more than a
      // tidy error, so fall back to the mail client rather than losing it.
      if (form === 'newsletter') throw err;
      window.location.href = mailtoLink(subject, fields);
      return 'mailto';
    }
  }
  window.location.href = mailtoLink(subject, fields);
  return 'mailto';
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
