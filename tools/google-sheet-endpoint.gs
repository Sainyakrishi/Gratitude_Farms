/**
 * Receives the website's form submissions and appends them to a Google Sheet.
 *
 * The site is static — GitHub Pages serves files and runs no code of ours — so
 * a form has nowhere to post to on its own. This script is that missing piece:
 * a Google Apps Script web app, bound to the sheet, that the browser posts to
 * directly. Google runs it as you, which is what lets it write to your sheet
 * without the site holding any Google credentials.
 *
 * ── Installing it ──────────────────────────────────────────────────────────
 *  1. Open the sheet → Extensions → Apps Script.
 *  2. Delete whatever is in Code.gs and paste this file in its place.
 *  3. Change TOKEN below to match FORM_TOKEN in src/data/site-config.js.
 *  4. Deploy → New deployment → type "Web app".
 *       Execute as:        Me
 *       Who has access:    Anyone                 ← must be "Anyone", not
 *                                                   "Anyone with a Google
 *                                                   account", or visitors get
 *                                                   a sign-in page.
 *  5. Authorise it when Google asks. The "unverified app" warning is expected
 *     for your own script: Advanced → Go to (project name).
 *  6. Copy the /exec URL it gives you into FORM_ENDPOINT in site-config.js.
 *
 * Re-deploy after any edit — "Deploy → Manage deployments → edit → Version:
 * New version". Saving alone does not update the live URL.
 *
 * ── What this can and cannot protect ───────────────────────────────────────
 * TOKEN travels inside the website's JavaScript, which anyone can read, so it
 * stops stray traffic and casual bots, not a determined person. The real
 * guards are that this script only ever appends to a sheet, caps what it will
 * store, and can do nothing else with your account.
 */

// Must match FORM_TOKEN in src/data/site-config.js.
const TOKEN = 'REPLACE_WITH_THE_TOKEN_FROM_SITE_CONFIG';

// Each form lands on its own tab. A tab that does not exist yet is created on
// first use, so the sheet needs no setting up by hand.
const TABS = {
  enquiry: 'Enquiries',
  newsletter: 'Newsletter'
};

// The order columns appear in. A field that is not listed still gets stored —
// it is appended as a new column — so adding a field to a form cannot lose it.
const COLUMNS = {
  enquiry: ['Received', 'Name', 'Email', 'Phone', 'Interested in', 'Land location', 'Audience', 'Message', 'Subject'],
  newsletter: ['Received', 'Email', 'Source', 'Subject']
};

// Leave as '' to switch the notification email off.
const NOTIFY = 'info@gratitudefarms.co.in';

// A single submission cannot be larger than this, per field and in total.
const MAX_FIELD = 5000;
const MAX_TOTAL = 20000;

function doPost(request) {
  try {
    const body = JSON.parse(request.postData.contents);

    if (body.token !== TOKEN) return reply({ ok: false, error: 'bad token' });

    const form = TABS[body.form] ? body.form : 'enquiry';
    const fields = body.fields && typeof body.fields === 'object' ? body.fields : {};

    // Bots fill every field they find, including the hidden one. Accept the
    // request so the bot learns nothing, but store nothing.
    if (body.hp) return reply({ ok: true });

    let total = 0;
    const clean = {};
    Object.keys(fields).forEach(function (key) {
      const value = String(fields[key] == null ? '' : fields[key]).slice(0, MAX_FIELD);
      total += value.length;
      if (total <= MAX_TOTAL) clean[String(key).slice(0, 100)] = value;
    });
    clean.Subject = String(body.subject || '').slice(0, 300);

    append(form, clean);
    notify(form, clean);

    return reply({ ok: true });
  } catch (err) {
    // The row is what matters; never hand an internal message back to the page.
    console.error(err);
    return reply({ ok: false, error: 'could not save' });
  }
}

/** A plain GET is someone opening the URL in a browser. Say so, store nothing. */
function doGet() {
  return reply({ ok: true, message: 'Gratitude Farms form endpoint. Submissions are POSTed here.' });
}

function append(form, fields) {
  const book = SpreadsheetApp.getActiveSpreadsheet();
  const name = TABS[form];
  const sheet = book.getSheetByName(name) || book.insertSheet(name);

  // A new or empty tab gets its headings first.
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS[form]);
    sheet.getRange(1, 1, 1, COLUMNS[form].length).setFontWeight('bold');
    sheet.setFrozenRows(1);
  }

  let headers = sheet.getRange(1, 1, 1, Math.max(sheet.getLastColumn(), 1)).getValues()[0]
    .map(function (h) { return String(h).trim(); });

  // A field the sheet has no column for becomes one, rather than being dropped.
  Object.keys(fields).forEach(function (key) {
    if (headers.indexOf(key) === -1) {
      headers.push(key);
      sheet.getRange(1, headers.length).setValue(key).setFontWeight('bold');
    }
  });

  const row = headers.map(function (header) {
    if (header === 'Received') return new Date();
    return fields[header] === undefined ? '' : fields[header];
  });

  sheet.appendRow(row);
}

function notify(form, fields) {
  if (!NOTIFY) return;
  try {
    const lines = Object.keys(fields).map(function (k) { return k + ': ' + fields[k]; });
    MailApp.sendEmail({
      to: NOTIFY,
      subject: fields.Subject || (form === 'newsletter' ? 'New newsletter signup' : 'New website enquiry'),
      body: lines.join('\n') + '\n\n— sent by the website form',
      replyTo: fields.Email || undefined
    });
  } catch (err) {
    // A failed notification must not cost us the row that was already written.
    console.error(err);
  }
}

function reply(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
