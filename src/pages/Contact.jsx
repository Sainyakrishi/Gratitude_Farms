import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class Contact extends Component {

  state = {
    prefillService: '', prefillAudience: '', openFaq: 0,
    firstName: '', lastName: '', email: '', phone: '', location: '',
    interestValue: 'Managed Farmland Services', messageValue: '',
    hp: '', errors: {}, formError: '', busy: false, sent: false, sentVia: ''
  };
  cfg = null;
  baseOptions = [
    'Managed Farmland Services',
    'Soil Fertility (BhuPrana™)',
    'Farmland Design (Vasudha™)',
    'Farmland Operate (Sanjeevani™)',
    'Farmland Development',
    'Personal Nakshatra Vanam',
    'Corporate ESG Partnership',
    "Sainya Krishi (I'm an Ex-Serviceman)",
    'Medicinal Plants & Produce',
    'Something else'
  ];
  faqItems = [
    { question: 'What is natural farming and how is it different from organic farming?', answer: 'Natural farming is a chemical-free, self-regenerating system that rebuilds soil biology using on-farm inputs like Jeevamrutham and biochar. Unlike organic farming, which often still depends on external inputs, it minimises outside dependence and restores the soil’s own fertility.' },
    { question: 'Do you manage the entire farm, or only part of it?', answer: 'Our Managed Farmland service is fully end-to-end — soil restoration, design, cultivation, operations and market linkage under one accountable contract. You can also engage any single service (soil, design or operations) on its own.' },
    { question: 'How long does it take to restore a barren or degraded farm?', answer: 'Most farmland development projects take 6 to 12 months, during which soil organic carbon is raised from below 0.5% to over 3% using biochar, Amrit Mitti beds and natural bio-inputs.' },
    { question: 'How can ex-servicemen join Sainya Krishi?', answer: 'Ex-servicemen can apply through this Contact page. Selected candidates receive NSDC-aligned residential training, help establishing a Food Forest farm, and market access under the Sainya Krishi “We are your Family Farmers” brand.' },
    { question: 'Do you work with corporates for ESG and carbon credits?', answer: 'Yes. We deliver verifiable carbon offsetting, community agriculture and sustainable supply-chain programs with audit-ready reporting for corporate ESG and CSR mandates.' },
    { question: 'Where are you located and which regions do you serve?', answer: 'Gratitude Farms is based in Pondicherry (Kottakuppam) and works with landowners, FPOs and corporates across India. Direct-to-consumer produce is feasible for farms within 100–150 km of a city.' }
  ];

  componentDidMount() {
    import('../data/site-config.js').then(mod => { this.cfg = mod; this.forceUpdate(); });

    const params = new URLSearchParams(window.location.search);
    const service = params.get('service') || '';
    const audience = params.get('audience') || '';
    if (service) {
      const msg = audience ? `Enquiring about: ${service} (Audience: ${audience})` : `Enquiring about: ${service}`;
      this.setState({ prefillService: service, prefillAudience: audience, interestValue: service, messageValue: msg });
    }
    try {
      let ld = document.getElementById('faq-ld');
      if (!ld) { ld = document.createElement('script'); ld.type = 'application/ld+json'; ld.id = 'faq-ld'; document.head.appendChild(ld); }
      ld.textContent = JSON.stringify({
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: this.faqItems.map(f => ({ '@type': 'Question', name: f.question, acceptedAnswer: { '@type': 'Answer', text: f.answer } }))
      });
    } catch (e) {}
  }

  validate() {
    const s = this.state;
    const errors = {};
    if (!s.firstName.trim()) errors.firstName = 'Please tell us your name.';
    if (!s.email.trim()) errors.email = 'We need an email address to reply to.';
    else if (this.cfg && !this.cfg.EMAIL_RE.test(s.email.trim())) errors.email = 'That email address does not look right.';
    if (s.messageValue.trim().length < 10) errors.message = 'A sentence or two about your land or goal helps us reply properly.';
    return errors;
  }

  submit(e) {
    e.preventDefault();
    if (this.state.busy || !this.cfg) return;

    // Honeypot: a bot filled the hidden field. Show the success state so it
    // learns nothing, but send nothing.
    if (this.state.hp) { this.setState({ sent: true, sentVia: 'sent' }); return; }

    const errors = this.validate();
    if (Object.keys(errors).length) {
      this.setState({ errors, formError: 'Please correct the highlighted fields.' });
      const first = document.getElementById('gf-' + ({ firstName: 'first', email: 'email', message: 'message' })[Object.keys(errors)[0]]);
      if (first) first.focus();
      return;
    }

    const s = this.state;
    this.setState({ errors: {}, formError: '', busy: true });

    this.cfg.submitEnquiry(`Website enquiry — ${s.interestValue}`, {
      Name: `${s.firstName.trim()} ${s.lastName.trim()}`.trim(),
      Email: s.email.trim(),
      Phone: s.phone.trim(),
      'Interested in': s.interestValue,
      'Land location': s.location.trim(),
      Audience: s.prefillAudience,
      Message: s.messageValue.trim()
    })
      .then(via => this.setState({ busy: false, sent: true, sentVia: via }))
      .catch(() => this.setState({
        busy: false,
        formError: 'We could not send that just now. Please email info@gratitudefarms.co.in or call +91 91500 23044.'
      }));
  }

  field(key, stateKey) {
    const error = this.state.errors[key] || '';
    const base = key === 'message' ? 'gf-field-box' : 'gf-field';
    return {
      value: this.state[stateKey],
      error,
      invalid: error ? 'true' : 'false',
      cls: error ? `${base} gf-field-invalid` : base,
      onChange: (e) => this.setState(st => ({
        [stateKey]: e.target.value,
        errors: { ...st.errors, [key]: '' },
        formError: ''
      }))
    };
  }

  renderVals() {
    const s = this.state;
    const options = s.prefillService && !this.baseOptions.includes(s.prefillService)
      ? [s.prefillService, ...this.baseOptions]
      : this.baseOptions;

    const wa = this.cfg ? this.cfg.CONTACT.whatsapp : '919150023044';

    return {
      phoneDial: this.cfg ? this.cfg.CONTACT.phoneDial : '+919150023044',
      phoneDisplay: this.cfg ? this.cfg.CONTACT.phoneDisplay : '+91 91500 23044',
      prefillService: s.prefillService,
      prefillAudience: s.prefillAudience,
      interestOptions: options,
      interestValue: s.interestValue,
      onInterestChange: (e) => this.setState({ interestValue: e.target.value }),

      f: {
        firstName: this.field('firstName', 'firstName'),
        lastName: this.field('lastName', 'lastName'),
        email: this.field('email', 'email'),
        phone: this.field('phone', 'phone'),
        location: this.field('location', 'location'),
        message: this.field('message', 'messageValue')
      },
      hp: s.hp,
      onHp: (e) => this.setState({ hp: e.target.value }),

      busy: s.busy,
      submitLabel: s.busy ? 'Sending…' : 'Send Enquiry',
      formError: s.formError,
      sent: s.sent,
      sentTitle: s.sentVia === 'mailto' ? 'Almost there' : 'Thank you — enquiry received',
      sentBody: s.sentVia === 'mailto'
        ? 'Your email app should have opened with the enquiry filled in. Press send there and we will get back to you within two working days. If nothing opened, email us at info@gratitudefarms.co.in.'
        : 'A member of our team will review your enquiry and get back to you within two working days.',
      whatsappHref: `https://wa.me/${wa}?text=${encodeURIComponent('Hello Gratitude Farms, I have just submitted an enquiry through your website.')}`,
      onSubmit: (e) => this.submit(e),
      onReset: () => this.setState({
        sent: false, sentVia: '', firstName: '', lastName: '', email: '',
        phone: '', location: '', messageValue: '', errors: {}, formError: ''
      }),

      faqs: this.faqItems.map((f, i) => ({
        question: f.question, answer: f.answer,
        open: s.openFaq === i, icon: s.openFaq === i ? '−' : '+',
        onToggle: () => this.setState(st => ({ openFaq: st.openFaq === i ? -1 : i }))
      }))
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Contact Gratitude Farms — Enquire About Land, ESG & Sainya Krishi"} description={"Contact Gratitude Farms - enquire about farmland development, ESG partnerships and Nakshatra Vanam."} />
        <SiteNav active="contact" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;text-align:center;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Get in Touch"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,52px);color:#1A3C34;margin:18px auto 0;max-width:700px;")}>
              {"Let's Grow Something Together"}
            </h1>
            {($v.prefillService) ? (
              <>
              <div style={css("display:inline-flex;gap:8px;flex-wrap:wrap;justify-content:center;margin-top:22px;")}>
                <span style={css("background:#F5F2ED;border:1px solid #e5e2dd;color:#1A3C34;font-size:13px;font-weight:700;padding:8px 16px;border-radius:999px;")}>
                  {"Service: "}{$v.prefillService}
                </span>
                {($v.prefillAudience) ? (
                  <>
                  <span style={css("background:#F5F2ED;border:1px solid #e5e2dd;color:#1A3C34;font-size:13px;font-weight:700;padding:8px 16px;border-radius:999px;")}>
                    {"Audience: "}{$v.prefillAudience}
                  </span>
                  </>
                ) : null}
              </div>
              </>
            ) : null}
          </section>
          <section className="gf-2col" style={css("max-width:1200px;margin:0 auto;padding:clamp(36px,6.7vw,80px) clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);display:grid;grid-template-columns:1fr 1.2fr;gap:48px;")}>
            <div style={css("display:flex;flex-direction:column;gap:28px;")}>
              <div>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;margin-bottom:8px;")}>
                  {"Address"}
                </div>
                <div style={css("color:#1A3C34;font-size:15.5px;line-height:1.6;max-width:340px;")}>
                  {"Gratitude Farms Private Limited, No.70, Auroville Main Road, Periyamudaliyar Chavadi, Kottakuppam, Town Panchayath, Pondicherry – 605104, India."}
                </div>
              </div>
              <div>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;margin-bottom:8px;")}>
                  {"Phone"}
                </div>
                <A href={`tel:${$v.phoneDial}`} style={css("text-decoration:none;color:#1A3C34;font-size:19px;font-weight:700;")}>
                  {$v.phoneDisplay}
                </A>
              </div>
              <div>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;margin-bottom:8px;")}>
                  {"Email"}
                </div>
                <A href="mailto:info@gratitudefarms.co.in" style={css("text-decoration:none;color:#1A3C34;font-size:19px;font-weight:700;")}>
                  {"info@gratitudefarms.co.in"}
                </A>
              </div>
              <div>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;margin-bottom:8px;")}>
                  {"Follow Us"}
                </div>
                <div style={css("display:flex;gap:10px;")}>
                  <A href="https://www.facebook.com/gratitudefarmsindia/" style={css("width:40px;height:40px;border-radius:999px;background:#F5F2ED;display:flex;align-items:center;justify-content:center;color:#1A3C34;text-decoration:none;font-size:13px;")} hoverStyle={css("background:#1A3C34;color:#fff;")}>
                    {"FB"}
                  </A>
                  <A href="https://www.instagram.com/gratitude_farms/" style={css("width:40px;height:40px;border-radius:999px;background:#F5F2ED;display:flex;align-items:center;justify-content:center;color:#1A3C34;text-decoration:none;font-size:13px;")} hoverStyle={css("background:#1A3C34;color:#fff;")}>
                    {"IG"}
                  </A>
                  <A href="https://www.linkedin.com/company/gratitudefarmsindia" style={css("width:40px;height:40px;border-radius:999px;background:#F5F2ED;display:flex;align-items:center;justify-content:center;color:#1A3C34;text-decoration:none;font-size:13px;")} hoverStyle={css("background:#1A3C34;color:#fff;")}>
                    {"IN"}
                  </A>
                  <A href="https://www.youtube.com/channel/UC61AuTlj_15ZXKLPCQF-F2w" style={css("width:40px;height:40px;border-radius:999px;background:#F5F2ED;display:flex;align-items:center;justify-content:center;color:#1A3C34;text-decoration:none;font-size:13px;")} hoverStyle={css("background:#1A3C34;color:#fff;")}>
                    {"YT"}
                  </A>
                </div>
              </div>
              <div style={css("border-radius:16px;overflow:hidden;margin-top:8px;")}>
                <img src="/assets/retreat-hut-pathway.png" alt="Visualisation of a Gratitude Farms one-acre plot with planted beds and a natural hut" style={css("width:100%;display:block;object-fit:cover;")} />
              </div>
            </div>
            <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:20px;padding:clamp(24px,4vw,44px);")}>
              {($v.sent) ? (
                <>
                <div role="status" style={css("display:flex;flex-direction:column;gap:16px;text-align:center;padding:20px 0;")}>
                  <div style={css("width:64px;height:64px;border-radius:999px;background:#e8f3ee;color:#2D5A27;display:flex;align-items:center;justify-content:center;font-size:30px;margin:0 auto;")}>
                    {"✓"}
                  </div>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:26px;color:#1A3C34;margin:0;")}>
                    {$v.sentTitle}
                  </h2>
                  <p style={css("color:#414846;font-size:15.5px;line-height:1.7;margin:0 auto;max-width:420px;")}>
                    {$v.sentBody}
                  </p>
                  <div style={css("display:flex;gap:12px;justify-content:center;flex-wrap:wrap;margin-top:8px;")}>
                    <A href={$v.whatsappHref} target="_blank" rel="noopener noreferrer" style={css("text-decoration:none;background:#25D366;color:#fff;font-weight:700;font-size:14px;padding:15px 26px;border-radius:12px;")}>
                      {"Chat on WhatsApp"}
                    </A>
                    <button onClick={$v.onReset} className="gf-btn-primary" style={css("background:transparent;color:#1A3C34;border:1px solid #3C4A3E;")}>
                      {"Send another enquiry"}
                    </button>
                  </div>
                </div>
                </>
              ) : null}
              {(!$v.sent) ? (
                <>
                {/* novalidate: the browser's own bubble on type="email" cancels the
             submit event before our handler runs, which would hide the styled,
             screen-reader-announced errors below. We validate in JS instead. */}
                <form onSubmit={$v.onSubmit} noValidate style={css("display:flex;flex-direction:column;gap:20px;")}>
                  <div className="gf-2col-sm" style={css("display:grid;grid-template-columns:1fr 1fr;gap:20px;")}>
                    <div>
                      <label className="gf-label" htmlFor="gf-first">
                        {"First Name *"}
                      </label>
                      <input id="gf-first" className={$v.f.firstName.cls} type="text" name="firstName" autoComplete="given-name" placeholder="John" aria-invalid={$v.f.firstName.invalid} value={$v.f.firstName.value} onChange={$v.f.firstName.onChange} />
                      {($v.f.firstName.error) ? (
                        <>
                        <span className="gf-error">
                          {$v.f.firstName.error}
                        </span>
                        </>
                      ) : null}
                    </div>
                    <div>
                      <label className="gf-label" htmlFor="gf-last">
                        {"Last Name"}
                      </label>
                      <input id="gf-last" className="gf-field" type="text" name="lastName" autoComplete="family-name" placeholder="Doe" value={$v.f.lastName.value} onChange={$v.f.lastName.onChange} />
                    </div>
                  </div>
                  <div className="gf-2col-sm" style={css("display:grid;grid-template-columns:1fr 1fr;gap:20px;")}>
                    <div>
                      <label className="gf-label" htmlFor="gf-email">
                        {"Email Address *"}
                      </label>
                      <input id="gf-email" className={$v.f.email.cls} type="email" name="email" autoComplete="email" placeholder="john@example.com" aria-invalid={$v.f.email.invalid} value={$v.f.email.value} onChange={$v.f.email.onChange} />
                      {($v.f.email.error) ? (
                        <>
                        <span className="gf-error">
                          {$v.f.email.error}
                        </span>
                        </>
                      ) : null}
                    </div>
                    <div>
                      <label className="gf-label" htmlFor="gf-phone">
                        {"Phone / WhatsApp"}
                      </label>
                      <input id="gf-phone" className="gf-field" type="tel" name="phone" autoComplete="tel" placeholder="+91 98765 43210" value={$v.f.phone.value} onChange={$v.f.phone.onChange} />
                    </div>
                  </div>
                  <div className="gf-2col-sm" style={css("display:grid;grid-template-columns:1fr 1fr;gap:20px;")}>
                    <div>
                      <label className="gf-label" htmlFor="gf-interest">
                        {"I'm Interested In"}
                      </label>
                      <select id="gf-interest" className="gf-field" name="interest" value={$v.interestValue} onChange={$v.onInterestChange}>
                        {($v.interestOptions || []).map((opt, optIndex) => (
                          <Fragment key={optIndex}>
                            <option value={opt}>
                              {opt}
                            </option>
                          </Fragment>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="gf-label" htmlFor="gf-location">
                        {"Land Location / City"}
                      </label>
                      <input id="gf-location" className="gf-field" type="text" name="location" placeholder="e.g. Chikkaballapur, Karnataka" value={$v.f.location.value} onChange={$v.f.location.onChange} />
                    </div>
                  </div>
                  <div>
                    <label className="gf-label" htmlFor="gf-message">
                      {"Message *"}
                    </label>
                    <textarea id="gf-message" className={$v.f.message.cls} rows="5" name="message" placeholder="Tell us about your land, goals, or partnership idea..." aria-invalid={$v.f.message.invalid} value={$v.f.message.value} onChange={$v.f.message.onChange} />
                    {($v.f.message.error) ? (
                      <>
                      <span className="gf-error">
                        {$v.f.message.error}
                      </span>
                      </>
                    ) : null}
                  </div>
                  <div className="gf-hp" aria-hidden="true">
                    <label htmlFor="gf-company-website">
                      {"Leave this field empty"}
                    </label>
                    <input id="gf-company-website" type="text" name="companyWebsite" tabIndex="-1" autoComplete="off" value={$v.hp} onChange={$v.onHp} />
                  </div>
                  {($v.formError) ? (
                    <>
                    <div role="alert" style={css("background:#ffdad6;border:1px solid #f5b5ae;border-radius:10px;padding:13px 16px;color:#93000a;font-size:13.5px;line-height:1.6;")}>
                      {$v.formError}
                    </div>
                    </>
                  ) : null}
                  <button type="submit" className="gf-btn-primary" disabled={$v.busy}>
                    {$v.submitLabel}
                  </button>
                  <p style={css("color:#717976;font-size:12.5px;line-height:1.6;margin:0;")}>
                    {"Fields marked * are required. We reply to most enquiries within two working days. See our "}
                    <A href="/privacy-policy" style={css("color:#1A3C34;")}>
                      {"Privacy Policy"}
                    </A>
                    {"."}
                  </p>
                </form>
                </>
              ) : null}
            </div>
          </section>
          <section style={css("max-width:1000px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <div style={css("text-align:center;margin-bottom:48px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                {"Answers"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#1A3C34;margin:14px 0 0;")}>
                {"Frequently Asked Questions"}
              </h2>
            </div>
            <div style={css("display:flex;flex-direction:column;gap:14px;")}>
              {($v.faqs || []).map((f, fIndex) => (
                <Fragment key={fIndex}>
                  <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;overflow:hidden;")}>
                    <button onClick={f.onToggle} style={css("width:100%;display:flex;justify-content:space-between;align-items:center;gap:16px;text-align:left;background:none;border:none;cursor:pointer;padding:24px 28px;font-family:'Hanken Grotesk',sans-serif;")}>
                      <span style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;font-weight:700;")}>
                        {f.question}
                      </span>
                      <span style={css("flex-shrink:0;width:28px;height:28px;border-radius:999px;background:#F5F2ED;color:#1A3C34;display:flex;align-items:center;justify-content:center;font-size:18px;")}>
                        {f.icon}
                      </span>
                    </button>
                    {(f.open) ? (
                      <>
                      <div style={css("padding:0 28px 26px;color:#414846;font-size:15.5px;line-height:1.75;")}>
                        {f.answer}
                      </div>
                      </>
                    ) : null}
                  </div>
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <div style={css("border-radius:20px;overflow:hidden;border:1px solid #e5e2dd;height:440px;")}>
              <iframe src="https://maps.google.com/maps?q=Gratitude%20Farms%20Private%20Limited%2C%20Auroville%20Main%20Road%2C%20Kottakuppam%2C%20Pondicherry%20605104&t=m&z=15&output=embed&iwloc=near" title="Gratitude Farms location map" style={css("width:100%;height:100%;border:0;")} loading="lazy" />
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Contact;
