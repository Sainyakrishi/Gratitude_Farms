import { Component, Fragment } from 'react';
import { A, Hov } from '../lib/ui.jsx';
import { css } from '../lib/css.js';

class SiteFooter extends Component {

  state = { subEmail: '', subError: '', subscribed: false };
  cfg = null;

  componentDidMount() {
    import('../data/site-config.js').then(mod => { this.cfg = mod; this.forceUpdate(); });
  }

  subscribe(e) {
    e.preventDefault();
    if (!this.cfg) return;
    const email = this.state.subEmail.trim();
    if (!this.cfg.EMAIL_RE.test(email)) {
      this.setState({ subError: 'Please enter a valid email address.' });
      return;
    }
    this.setState({ subError: '' });
    this.cfg
      .submitEnquiry('Newsletter subscription — Gratitude Farms', { Email: email, Source: 'Website footer' })
      .then(() => this.setState({ subscribed: true }))
      .catch(() => this.setState({ subError: 'Could not subscribe right now — please email us instead.' }));
  }

  renderVals() {
    const c = this.cfg ? this.cfg.CONTACT : {
      email: 'info@gratitudefarms.co.in', phoneDisplay: '+91 91500 23044',
      phoneDial: '+919150023044', whatsapp: '919150023044', addressLines: [], social: {}
    };

    const columns = [
      { title: 'Services', links: [
        { label: 'All Products & Services', href: '/services' },
        { label: 'Managed Farmland', href: '/services/managed-farmland' },
        { label: 'Soil Fertility · BhuPrana™', href: '/services/soil-fertility' },
        { label: 'Farmland Design · Vasudha™', href: '/services/farmland-design' },
        { label: 'Farmland Operate · Sanjeevani™', href: '/services/farmland-operate' }
      ]},
      { title: 'Programs', links: [
        { label: 'Farmland Development', href: '/farmland-development' },
        { label: 'Personal Nakshatra Vanam', href: '/nakshatra-vanam' },
        { label: 'Corporate ESG Projects', href: '/corporate-esg' },
        { label: 'Sainya Krishi', href: '/sainya-krishi' },
        { label: 'Medicinal Plants & Trees', href: '/medicinal-plants-trees' },
        { label: 'Vriksh Ayurveda', href: '/vriksh-ayurveda' }
      ]},
      { title: 'Company', links: [
        { label: 'About Gratitude Farms', href: '/about-us' },
        { label: 'Our Team', href: '/our-team' },
        { label: 'The Journal', href: '/blog' },
        { label: 'Contact & Enquiries', href: '/contact' }
      ]}
    ];

    const s = c.social || {};
    const socials = [
      { short: 'FB', label: 'Gratitude Farms on Facebook', href: s.facebook },
      { short: 'IG', label: 'Gratitude Farms on Instagram', href: s.instagram },
      { short: 'IN', label: 'Gratitude Farms on LinkedIn', href: s.linkedin },
      { short: 'YT', label: 'Gratitude Farms on YouTube', href: s.youtube }
    ].filter(x => x.href);

    return {
      columns,
      socials,
      year: new Date().getFullYear(),
      email: c.email,
      phoneDial: c.phoneDial,
      phoneDisplay: c.phoneDisplay,
      addressLines: c.addressLines || [],
      whatsappHref: `https://wa.me/${c.whatsapp}?text=${encodeURIComponent("Hello Gratitude Farms, I'd like to know more about your natural farming services.")}`,
      subEmail: this.state.subEmail,
      subError: this.state.subError,
      subscribed: this.state.subscribed,
      subBorder: this.state.subError ? '#ba1a1a' : '#c1c8c4',
      onSubEmail: (e) => this.setState({ subEmail: e.target.value, subError: '' }),
      onSubscribe: (e) => this.subscribe(e)
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
        <footer style={css("background:#EBE8E3;font-family:'Hanken Grotesk',sans-serif;border-top-left-radius:24px;border-top-right-radius:24px;")}>
          <div className="gf-foot-grid" style={css("max-width:1440px;margin:0 auto;padding:clamp(48px,7vw,80px) clamp(20px,5.5vw,80px) 40px;display:grid;grid-template-columns:1.6fr 1fr 1fr 1fr 1.3fr;gap:40px;")}>
            <div style={css("display:flex;flex-direction:column;gap:16px;")}>
              <A href="/" style={css("display:flex;align-items:center;gap:10px;text-decoration:none;")}>
                <img src="/assets/logo-badge.png" alt="" style={css("width:42px;height:42px;object-fit:contain;")} />
                <span style={css("font-family:'Source Serif 4',serif;font-size:23px;font-weight:700;color:#1A3C34;")}>
                  {"Gratitude Farms"}
                </span>
              </A>
              <p style={css("color:#414846;font-size:14.5px;line-height:1.7;max-width:300px;margin:0;")}>
                {"Cultivating Discipline, Harvesting Hope. A Social Impact Enterprise led by Ex-Servicemen, building natural precision farming across India."}
              </p>
              <div style={css("display:flex;gap:10px;margin-top:6px;")}>
                {($v.socials || []).map((s, sIndex) => (
                  <Fragment key={sIndex}>
                    <A href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label} style={css("width:38px;height:38px;border-radius:999px;background:rgba(26,60,52,0.08);display:flex;align-items:center;justify-content:center;color:#1A3C34;text-decoration:none;font-size:12.5px;font-weight:700;letter-spacing:0.02em;")} hoverStyle={css("background:#1A3C34;color:#fff;")}>
                      {s.short}
                    </A>
                  </Fragment>
                ))}
              </div>
              <A href="https://www.weforum.org/organizations/gratitude-farms/" target="_blank" rel="noopener noreferrer" style={css("display:inline-flex;align-items:center;gap:8px;text-decoration:none;color:#414846;font-size:12.5px;margin-top:6px;")} hoverStyle={css("color:#C5A059;")}>
                {"Featured on the World Economic Forum ↗"}
              </A>
            </div>
            {($v.columns || []).map((col, colIndex) => (
              <Fragment key={colIndex}>
                <nav aria-label={col.title} style={css("display:flex;flex-direction:column;gap:13px;")}>
                  <div style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;color:#1A3C34;text-transform:uppercase;margin-bottom:4px;")}>
                    {col.title}
                  </div>
                  {(col.links || []).map((l, lIndex) => (
                    <Fragment key={lIndex}>
                      <A href={l.href} style={css("color:#414846;text-decoration:none;font-size:14.5px;line-height:1.35;")} hoverStyle={css("color:#C5A059;")}>
                        {l.label}
                      </A>
                    </Fragment>
                  ))}
                </nav>
              </Fragment>
            ))}
            <div style={css("display:flex;flex-direction:column;gap:14px;")}>
              <div style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.1em;color:#1A3C34;text-transform:uppercase;margin-bottom:4px;")}>
                {"Get In Touch"}
              </div>
              {(!$v.subscribed) ? (
                <>
                <form onSubmit={$v.onSubscribe} noValidate style={css("display:flex;flex-direction:column;gap:8px;")}>
                  <p style={css("color:#414846;font-size:14px;margin:0 0 2px;line-height:1.6;")}>
                    {"Insights on natural farming, carbon credits and impact."}
                  </p>
                  <div style={css("display:flex;gap:8px;")}>
                    <label htmlFor="gf-news-email" className="gf-hp">
                      {"Email address"}
                    </label>
                    <input id="gf-news-email" type="email" name="email" autoComplete="email" placeholder="Email address" value={$v.subEmail} onChange={$v.onSubEmail} style={css(`flex:1;min-width:0;background:#FAFAF9;border:1px solid ${$v.subBorder};border-radius:8px;padding:11px 12px;font-size:13.5px;font-family:'Hanken Grotesk',sans-serif;color:#1c1c19;`)} />
                    <Hov as="button" type="submit" style={css("background:#1A3C34;color:#fff;border:none;border-radius:8px;padding:11px 18px;font-size:13px;font-weight:700;cursor:pointer;font-family:'Hanken Grotesk',sans-serif;flex-shrink:0;")} hoverStyle={css("background:#C5A059;color:#1A3C34;")}>
                      {"Join"}
                    </Hov>
                  </div>
                  {($v.subError) ? (
                    <>
                    <span className="gf-error">
                      {$v.subError}
                    </span>
                    </>
                  ) : null}
                </form>
                </>
              ) : null}
              {($v.subscribed) ? (
                <>
                <div role="status" style={css("background:#e8f3ee;border:1px solid #c5eadf;border-radius:10px;padding:14px 16px;color:#2D5A27;font-size:13.5px;line-height:1.6;")}>
                  {"Thanks — your subscription request is on its way to "}{$v.email}{"."}
                </div>
                </>
              ) : null}
              <div style={css("display:flex;flex-direction:column;gap:7px;margin-top:6px;")}>
                <A href={`tel:${$v.phoneDial}`} style={css("color:#414846;text-decoration:none;font-size:13.5px;font-weight:600;")} hoverStyle={css("color:#C5A059;")}>
                  {$v.phoneDisplay}
                </A>
                <A href={`mailto:${$v.email}`} style={css("color:#414846;text-decoration:none;font-size:13.5px;")} hoverStyle={css("color:#C5A059;")}>
                  {$v.email}
                </A>
                <address style={css("color:#717976;font-size:13px;line-height:1.65;font-style:normal;margin-top:4px;")}>
                  {($v.addressLines || []).map((line, lineIndex) => (
                    <Fragment key={lineIndex}>
                      <span style={css("display:block;")}>
                        {line}
                      </span>
                    </Fragment>
                  ))}
                </address>
              </div>
            </div>
          </div>
          <div style={css("border-top:1px solid #dcdad5;padding:24px clamp(20px,5.5vw,80px);display:flex;justify-content:space-between;flex-wrap:wrap;gap:14px;max-width:1440px;margin:0 auto;")}>
            <span style={css("color:#414846;font-size:13px;")}>
              {"© "}{$v.year}{" Gratitude Farms Private Limited. All Rights Reserved."}
            </span>
            <div style={css("display:flex;gap:22px;align-items:center;flex-wrap:wrap;")}>
              <A href="/privacy-policy" style={css("color:#414846;text-decoration:none;font-size:13px;")} hoverStyle={css("color:#C5A059;")}>
                {"Privacy Policy"}
              </A>
              <A href="/terms" style={css("color:#414846;text-decoration:none;font-size:13px;")} hoverStyle={css("color:#C5A059;")}>
                {"Terms of Service"}
              </A>
              <A href="/admin" style={css("color:#9aa19d;text-decoration:none;font-size:12px;letter-spacing:0.02em;")} hoverStyle={css("color:#1A3C34;")}>
                {"Admin Login"}
              </A>
            </div>
          </div>
        </footer>
        <div className="gf-dock">
          <A className="gf-dock-wa" href={$v.whatsappHref} target="_blank" rel="noopener noreferrer" aria-label="Chat with us on WhatsApp" title="Chat on WhatsApp">
            <svg width="26" height="26" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38a9.9 9.9 0 0 0 4.79 1.22h.01c5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0 0 12.04 2Zm0 18.15h-.01a8.2 8.2 0 0 1-4.18-1.15l-.3-.18-3.11.82.83-3.04-.2-.31a8.17 8.17 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 2.2 0 4.26.86 5.82 2.41a8.18 8.18 0 0 1 2.41 5.83c0 4.54-3.7 8.23-8.24 8.23Zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.24-.64.8-.78.97-.15.16-.29.18-.53.06-.25-.13-1.05-.39-1.99-1.23-.74-.66-1.24-1.47-1.38-1.72-.15-.25-.02-.38.11-.5.11-.11.25-.29.37-.44.12-.15.16-.25.25-.41.08-.17.04-.31-.02-.44-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.43h-.47c-.17 0-.44.06-.67.31-.23.25-.87.86-.87 2.09s.9 2.42 1.02 2.59c.13.17 1.76 2.68 4.26 3.76.6.26 1.06.41 1.42.53.6.19 1.14.16 1.57.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.08.15-1.18-.06-.11-.23-.17-.48-.29Z" />
            </svg>
          </A>
          <A className="gf-dock-call" href={`tel:${$v.phoneDial}`} aria-label="Call Gratitude Farms" title="Call us">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.96.36 1.9.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.9.34 1.85.57 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
          </A>
        </div>
      </>
    );
  }
}

export default SiteFooter;
