/**
 * The console's accounts and session.
 *
 * There is no server behind this site — it is static files on GitHub Pages — so
 * everything here happens in the visitor's browser, and the repository is
 * public. That shapes every decision below:
 *
 *   · No password is kept anywhere as text. The founder account ships as a
 *     salted PBKDF2-SHA256 hash, and every account an admin adds is stored the
 *     same way. Reading the bundle or the repo tells an attacker the hash, and
 *     at 600,000 iterations a strong password is not recoverable from it.
 *   · Failed sign-ins are throttled, and a session expires on its own.
 *   · What this cannot do is stop someone who edits the page's JavaScript in
 *     their own browser: a check that runs on the visitor's machine can be
 *     skipped on the visitor's machine. That is tolerable only because the
 *     console holds nothing real — its edits never leave the open tab and
 *     cannot change the public site. The day it gains a backend, the server has
 *     to do this checking, and this file is the seam to replace.
 *
 * An account an admin adds lives in that browser's localStorage, so it exists
 * on that computer only and clearing site data removes it.
 */

/**
 * The founder account. It ships with the site, which makes it the one account
 * always present — a browser with an empty store would otherwise have no way in
 * — so it cannot be removed, and it cannot be edited from the console either:
 * it lives in this file, not in any browser.
 *
 * `hash` is PBKDF2-SHA256(password, salt, iterations). To change the password,
 * derive a new salt and hash with Node and replace both values — never put the
 * password itself in this file:
 *
 *   node -e "const c=require('crypto'),s=c.randomBytes(16);
 *     console.log(s.toString('base64'),
 *       c.pbkdf2Sync(process.env.PW,s,600000,32,'sha256').toString('base64'))"
 */
const OWNER = {
  name: 'Krushna',
  email: 'admin@sainyakrishi.com',
  role: 'Admin',
  salt: 'sSTUUb7om+qzzRRqsbenYQ==',
  hash: 'yePWzWuZGZ8jV/3sJPhc+CLzrBL4zrg2A5Jy1o3Mx5U=',
  iterations: 600000
};

export const ADMIN_ROLE = 'Admin';
export const MEMBER_ROLE = 'Member';

/** Admins can manage the team; members get everything else. */
export const ROLES = [MEMBER_ROLE, ADMIN_ROLE];

export const MIN_PASSWORD = 12;

// OWASP's current floor for PBKDF2-SHA256. It costs a fraction of a second per
// sign-in and makes guessing against a leaked hash prohibitively slow.
const ITERATIONS = 600000;

// The session goes in sessionStorage — closing the tab signs you out, so a
// shared machine is not left open — and it also lapses after SESSION_TTL_MS
// while the tab stays open. The accounts go in localStorage, because they are
// meant to outlive the visit.
const SESSION_KEY = 'gf-admin-session';
const USERS_KEY = 'gf-admin-users';
const SESSION_TTL_MS = 2 * 60 * 60 * 1000;

// After MAX_TRIES wrong passwords in a row, sign-in is refused for LOCKOUT_MS.
const THROTTLE_KEY = 'gf-admin-throttle';
const MAX_TRIES = 5;
const LOCKOUT_MS = 5 * 60 * 1000;

// One message for both fields: saying which half was wrong tells an outsider
// which half to keep guessing at.
const NO_MATCH = 'That email and password do not match an account.';

// Deliberately loose: the point is to catch a typo, not to adjudicate RFC 5322.
const EMAIL_SHAPE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/**
 * Storage access can throw outright — Safari's private mode does — and a console
 * that cannot remember anything is still better than a page that will not
 * render, so every caller treats a missing store as "empty".
 */
function session() {
  try {
    return window.sessionStorage;
  } catch {
    return null;
  }
}

function vault() {
  try {
    return window.localStorage;
  } catch {
    return null;
  }
}

/** An address as it is compared and stored: trimmed and lower-case. */
const clean = (email) => String(email ?? '').trim().toLowerCase();

const fail = (error) => ({ ok: false, error });

/** The same date format the rest of the console shows, e.g. "Aug 17, 2026". */
function today() {
  return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
}

/* ------------------------------------------------------------------ hashing */

// Web Crypto exists only in a secure context. The site is served over https,
// so this is null only on a very old browser or a plain-http copy — and then
// the console refuses to sign anyone in rather than fall back to weaker checks.
const subtle = () => globalThis.crypto?.subtle || null;

const toBase64 = (buf) => btoa(String.fromCharCode(...new Uint8Array(buf)));
const fromBase64 = (text) => Uint8Array.from(atob(text), (ch) => ch.charCodeAt(0));

async function derive(password, salt, iterations) {
  const key = await subtle().importKey(
    'raw', new TextEncoder().encode(String(password)), 'PBKDF2', false, ['deriveBits']
  );
  const bits = await subtle().deriveBits(
    { name: 'PBKDF2', hash: 'SHA-256', salt, iterations }, key, 256
  );
  return toBase64(bits);
}

/** A fresh salt and the hash of `password` under it — what gets stored. */
async function seal(password) {
  const salt = globalThis.crypto.getRandomValues(new Uint8Array(16));
  return { salt: toBase64(salt), hash: await derive(password, salt, ITERATIONS), iterations: ITERATIONS };
}

/** Compares every character whatever the result, so timing says nothing. */
function same(a, b) {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

async function matches(account, password) {
  if (account.hash && account.salt) {
    const got = await derive(password, fromBase64(account.salt), account.iterations || ITERATIONS);
    return same(got, account.hash);
  }

  // An account added before passwords were hashed still holds its text. It is
  // accepted once, and signIn re-stores it hashed on that success.
  return typeof account.password === 'string' && same(String(password), account.password);
}

/* ------------------------------------------------------------------- stores */

/**
 * The added accounts. A store that has been hand-edited, half-written or left
 * over from an older shape should not take the console down, so every record is
 * checked and normalised on the way out rather than trusted.
 */
function readUsers() {
  try {
    const raw = vault()?.getItem(USERS_KEY);
    const list = raw ? JSON.parse(raw) : [];
    if (!Array.isArray(list)) return [];

    return list
      .filter((u) => u && typeof u.email === 'string' &&
        ((typeof u.hash === 'string' && typeof u.salt === 'string') || typeof u.password === 'string'))
      .map((u) => {
        const record = {
          name: String(u.name || ''),
          email: clean(u.email),
          role: ROLES.includes(u.role) ? u.role : MEMBER_ROLE,
          added: String(u.added || '')
        };
        if (typeof u.hash === 'string') {
          Object.assign(record, { salt: u.salt, hash: u.hash, iterations: Number(u.iterations) || ITERATIONS });
        } else {
          record.password = u.password;
        }
        return record;
      })
      .filter((u) => u.email !== OWNER.email);   // the founder is never a stored record
  } catch {
    return [];
  }
}

/** False when the browser refused the write — a full or locked-down store. */
function writeUsers(list) {
  try {
    vault()?.setItem(USERS_KEY, JSON.stringify(list));
    return true;
  } catch {
    return false;
  }
}

/** The full record for an address, hash included, or null. */
function find(email) {
  const wanted = clean(email);
  if (wanted === OWNER.email) return { ...OWNER, isOwner: true };

  const hit = readUsers().find((u) => u.email === wanted);
  return hit ? { ...hit, isOwner: false } : null;
}

/** Re-stores a legacy text-password account as a hash. */
async function upgrade(email, password) {
  const sealed = await seal(password);
  const list = readUsers();
  const index = list.findIndex((u) => u.email === email);
  if (index === -1) return;

  const { password: _dropped, ...rest } = list[index];
  list[index] = { ...rest, ...sealed };
  writeUsers(list);
}

function readThrottle() {
  try {
    const t = JSON.parse(vault()?.getItem(THROTTLE_KEY) || 'null');
    if (t && typeof t.fails === 'number' && typeof t.until === 'number') return t;
  } catch { /* a garbled record counts as a clean slate */ }
  return { fails: 0, until: 0 };
}

function writeThrottle(t) {
  try {
    if (t) vault()?.setItem(THROTTLE_KEY, JSON.stringify(t));
    else vault()?.removeItem(THROTTLE_KEY);
  } catch { /* nowhere to record it; the hash cost still slows guessing */ }
}

/* ------------------------------------------------------------------ session */

function readSession() {
  try {
    const s = JSON.parse(session()?.getItem(SESSION_KEY) || 'null');
    if (s && typeof s.email === 'string' && typeof s.exp === 'number') return s;
  } catch { /* a session from before sessions expired is not one */ }
  return null;
}

function openSession(email, exp = Date.now() + SESSION_TTL_MS) {
  session()?.setItem(SESSION_KEY, JSON.stringify({ email, exp }));
}

/**
 * Resolves to `{ ok: true }` when the credential matches an account, and the
 * session opens as a result; otherwise to `{ ok: false, error }`.
 */
export async function signIn(email, password) {
  const now = Date.now();
  const throttle = readThrottle();

  if (throttle.until > now) {
    const minutes = Math.ceil((throttle.until - now) / 60000);
    return fail(`Too many failed attempts. Try again in ${minutes} minute${minutes === 1 ? '' : 's'}.`);
  }
  if (!subtle()) return fail('This browser cannot sign in securely. Use an up-to-date browser.');

  // The email is matched leniently — case and stray whitespace are how a real
  // person types an address — while the password is compared exactly.
  const account = find(email);

  // An unknown address still pays for a full derivation, so a miss takes as
  // long as a wrong password and the timing does not reveal who has an account.
  const ok = account
    ? await matches(account, password)
    : (await derive(password, new Uint8Array(16), ITERATIONS), false);

  if (!ok) {
    const fails = throttle.fails + 1;
    if (fails >= MAX_TRIES) {
      writeThrottle({ fails: 0, until: now + LOCKOUT_MS });
      return fail(`Too many failed attempts. Try again in ${LOCKOUT_MS / 60000} minutes.`);
    }
    writeThrottle({ fails, until: 0 });
    return fail(NO_MATCH);
  }

  writeThrottle(null);
  if (!account.isOwner && !account.hash) await upgrade(account.email, password);
  openSession(account.email);
  return { ok: true };
}

export function signOut() {
  session()?.removeItem(SESSION_KEY);
}

/** The signed-in address, or null once the session is missing or has lapsed. */
export function currentAdmin() {
  const s = readSession();
  if (!s || s.exp <= Date.now()) {
    signOut();
    return null;
  }
  return s.email;
}

/**
 * The signed-in account, or null. An account that has been removed since the
 * session opened resolves to null here, which is what closes the console behind
 * the person who was using it.
 */
export function currentUser() {
  const email = currentAdmin();
  if (!email) return null;

  const account = find(email);
  if (!account) return null;

  return { name: account.name, email: account.email, role: account.role, isOwner: !!account.isOwner };
}

export function isSignedIn() {
  return currentUser() !== null;
}

/** Only admins may add and remove people. */
export function canManageTeam(user) {
  return !!user && user.role === ADMIN_ROLE;
}

/* ------------------------------------------------------------------- people */

/**
 * Every account, founder first. Hashes are deliberately left out: nothing in
 * the console needs one, and a list that does not carry them cannot put one on
 * screen by accident.
 */
export function listUsers() {
  return [
    { name: OWNER.name, email: OWNER.email, role: OWNER.role, added: 'Founder account', isOwner: true },
    ...readUsers().map((u) => ({ name: u.name, email: u.email, role: u.role, added: u.added, isOwner: false }))
  ];
}

export async function addUser({ name, email, password, role } = {}) {
  const person = String(name ?? '').trim();
  const address = clean(email);

  if (!person) return fail('Give this person a name.');
  if (!EMAIL_SHAPE.test(address)) return fail('That does not look like an email address.');
  if (find(address)) return fail(address + ' already has an account.');
  if (String(password ?? '').length < MIN_PASSWORD) {
    return fail(`The password needs at least ${MIN_PASSWORD} characters.`);
  }
  if (!subtle()) return fail('This browser cannot store a password securely.');

  const sealed = await seal(password);

  const list = readUsers();
  if (list.some((u) => u.email === address)) return fail(address + ' already has an account.');
  list.unshift({
    name: person,
    email: address,
    role: ROLES.includes(role) ? role : MEMBER_ROLE,
    added: today(),
    ...sealed
  });

  if (!writeUsers(list)) return fail('This browser would not save the account.');
  return { ok: true };
}

/**
 * Changes an added account. An absent or empty `password` leaves the existing
 * one alone, so an admin can correct a name or a role without knowing it.
 */
export async function updateUser(email, patch = {}) {
  const target = clean(email);
  if (target === OWNER.email) {
    return fail('The founder account is set in the site’s code and cannot be edited here.');
  }

  const found = readUsers().find((u) => u.email === target);
  if (!found) return fail('That account no longer exists.');

  const person = String(patch.name ?? found.name).trim();
  const address = patch.email === undefined ? found.email : clean(patch.email);
  const password = patch.password ? String(patch.password) : null;

  if (!person) return fail('Give this person a name.');
  if (!EMAIL_SHAPE.test(address)) return fail('That does not look like an email address.');
  if (address !== target && find(address)) return fail(address + ' already has an account.');
  if (password && password.length < MIN_PASSWORD) {
    return fail(`The password needs at least ${MIN_PASSWORD} characters.`);
  }
  if (password && !subtle()) return fail('This browser cannot store a password securely.');

  const sealed = password ? await seal(password) : null;

  // Re-read after the derivation: the list may have changed while it ran.
  const list = readUsers();
  const index = list.findIndex((u) => u.email === target);
  if (index === -1) return fail('That account no longer exists.');

  const { password: legacy, salt, hash, iterations, ...current } = list[index];
  list[index] = {
    ...current,
    name: person,
    email: address,
    role: ROLES.includes(patch.role) ? patch.role : current.role,
    ...(sealed || (hash ? { salt, hash, iterations } : { password: legacy }))
  };

  if (!writeUsers(list)) return fail('This browser would not save the change.');

  // Re-addressing the account you are signed in as would otherwise strand the
  // session on an address that no longer resolves.
  const s = readSession();
  if (s && clean(s.email) === target) openSession(address, s.exp);

  return { ok: true };
}

export function removeUser(email) {
  const target = clean(email);

  if (target === OWNER.email) return fail('The founder account cannot be removed.');
  if (target === clean(currentAdmin())) return fail('You cannot remove the account you are signed in as.');

  const list = readUsers();
  const remaining = list.filter((u) => u.email !== target);
  if (remaining.length === list.length) return fail('That account no longer exists.');
  if (!writeUsers(remaining)) return fail('This browser would not save the change.');

  return { ok: true };
}
