// Single source of truth for contact details and form delivery.
// Imported by Contact.dc.html and SiteFooter.dc.html.

export const CONTACT = {
  email: 'info@gratitudefarms.co.in',
  phoneDisplay: '+91 93609 03652',
  phoneDial: '+919360903652',
  whatsapp: '919360903652',
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
// Set FORM_ENDPOINT to a URL that accepts a JSON POST and enquiries are sent
// straight from the browser — Formspree ("https://formspree.io/f/xxxxxxx"),
// Web3Forms, a Netlify function, or your own API all work unchanged.
//
// While it is null the forms stay fully usable: they validate, then hand the
// completed enquiry to the visitor's mail client, pre-addressed and pre-filled.
// Nothing is silently dropped either way.
// ---------------------------------------------------------------------------

export const FORM_ENDPOINT = null;

export function mailtoLink(subject, fields) {
  const body = Object.entries(fields)
    .filter(([, v]) => v !== '' && v != null)
    .map(([k, v]) => `${k}: ${v}`)
    .join('\n');
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

/**
 * Delivers an enquiry. Resolves to 'sent' when a real endpoint accepted it,
 * or 'mailto' when the visitor's mail client was opened instead.
 * Rejects only on a genuine transport failure, so callers can show an error.
 */
export async function submitEnquiry(subject, fields) {
  if (FORM_ENDPOINT) {
    const res = await fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({ _subject: subject, ...fields })
    });
    if (!res.ok) throw new Error(`Submission failed (${res.status})`);
    return 'sent';
  }
  window.location.href = mailtoLink(subject, fields);
  return 'mailto';
}

export const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
