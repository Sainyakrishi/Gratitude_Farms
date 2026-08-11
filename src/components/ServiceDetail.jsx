import { Component, Fragment } from 'react';
import { A, Hov } from '../lib/ui.jsx';
import { css } from '../lib/css.js';

class ServiceDetail extends Component {

  state = { audience: 'individuals', toastVisible: false, scrollPct: 0 };
  data = null;

  componentDidMount() {
    const params = new URLSearchParams(window.location.search);
    const a = params.get('audience');
    if (a) this.setState({ audience: a });
    import('../data/services-data.js').then(mod => { this.data = mod; this.forceUpdate(); });
    this.onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      this.setState({ scrollPct: h > 0 ? Math.min(100, (window.scrollY / h) * 100) : 0 });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }
  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll);
    clearTimeout(this.toastTimer);
  }

  // Keep ?audience= in step with the visible tab, so the segmented view stays
  // shareable and the browser's back button works the way people expect.
  setAudience(key) {
    this.setState({ audience: key });
    try {
      const url = new URL(window.location.href);
      url.searchParams.set('audience', key);
      window.history.replaceState({}, '', url);
    } catch (e) {}
  }

  renderVals() {
    if (!this.data) {
      return { svc: null, aud: null, audienceTabs: [], otherServices: [], notFound: false, toastVisible: false, scrollPct: 0 };
    }
    const { SERVICES, AUDIENCES, SERVICE_PAGES } = this.data;
    const base = SERVICES.find(s => s.key === this.props.serviceKey);
    const audDef = AUDIENCES.find(a => a.key === this.state.audience) || AUDIENCES[0];
    const pad = n => String(n).padStart(2, '0');

    const svc = base ? {
      ...base,
      methodologyX: base.methodology.map((step, i) => ({ step, num: i + 1, delay: `${i * 80}ms` })),
      timelineX: base.timeline.map((t, i) => ({ ...t, num: pad(i + 1) })),
      supportTitle: base.support.title,
      supportText: base.support.text
    } : null;

    const src = base ? base.audiences[this.state.audience] : null;
    const aud = src ? {
      ...src,
      label: audDef.label,
      deliverablesX: src.deliverables.map((text, i) => ({ text, num: pad(i + 1), delay: `${i * 60}ms` }))
    } : null;

    const audienceTabs = AUDIENCES.map(a => ({
      short: a.short,
      pressed: String(a.key === this.state.audience),
      bg: a.key === this.state.audience ? '#1A3C34' : '#FAFAF9',
      color: a.key === this.state.audience ? '#FAFAF9' : '#414846',
      border: a.key === this.state.audience ? '#1A3C34' : '#e5e2dd',
      onClick: () => this.setAudience(a.key)
    }));

    // Every other flagship service, so no service page is a dead end.
    const otherServices = SERVICES.filter(s => s.key !== this.props.serviceKey).map(s => ({
      code: s.code,
      name: s.name,
      brand: s.brand,
      short: s.highlights && s.highlights[0] ? s.highlights[0] : s.badge,
      href: SERVICE_PAGES[s.key]
    }));

    return {
      svc,
      aud,
      audienceTabs,
      otherServices,
      notFound: !base,
      enquireHref: base ? `/contact?service=${encodeURIComponent(base.name)}&audience=${encodeURIComponent(audDef.label)}` : '/contact',
      ctaText: base ? `For ${audDef.label}, our team can help you identify the right solution for your land through ${base.name}${base.brand ? ' (' + base.brand + ')' : ''}.` : '',
      brochureHref: '/assets/docs/gratitude-farms-service-specifications.pdf',
      phoneDial: '+919360903652',
      toastVisible: this.state.toastVisible,
      scrollPct: this.state.scrollPct,
      onBrochure: () => {
        this.setState({ toastVisible: true });
        clearTimeout(this.toastTimer);
        this.toastTimer = setTimeout(() => this.setState({ toastVisible: false }), 4000);
      }
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
        <div className="gf-sticky-under-nav" style={css("position:fixed;left:0;right:0;height:3px;background:transparent;z-index:90;")}>
          <div style={css(`height:100%;background:linear-gradient(90deg,#C5A059,#e9c176);width:${$v.scrollPct}%;transition:width 0.1s linear;`)} />
        </div>
        {($v.svc) ? (
          <>
          <section style={css("position:relative;min-height:80vh;display:flex;align-items:flex-end;overflow:hidden;")}>
            <div role="img" aria-label={$v.svc.name} style={css(`position:absolute;inset:0;background-image:url('${$v.svc.hero}');background-size:cover;background-position:center;animation:heroZoom 9s ease-out both;`)} />
            <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.96),rgba(26,60,52,0.3));")} />
            <div style={css("position:relative;z-index:2;max-width:1200px;margin:0 auto;padding:0 clamp(24px,6vw,80px) 84px;width:100%;box-sizing:border-box;animation:fadeUp 0.9s cubic-bezier(.16,1,.3,1) both;")}>
              <div style={css("display:flex;align-items:center;gap:12px;margin-bottom:22px;")}>
                <span style={css("width:9px;height:9px;border-radius:999px;background:#C5A059;animation:pulseDot 1.6s ease-in-out infinite;")} />
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:0.14em;color:#e9c176;text-transform:uppercase;")}>
                  {$v.svc.code}{" · "}{$v.svc.category}
                </span>
              </div>
              <div style={css("display:flex;align-items:baseline;gap:18px;flex-wrap:wrap;")}>
                <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(40px,7vw,76px);line-height:1.02;color:#FAFAF9;margin:0;letter-spacing:-0.01em;")}>
                  {$v.svc.name}
                </h1>
                {($v.svc.brand) ? (
                  <>
                  <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.6vw,42px);color:#C5A059;font-weight:700;")}>
                    {$v.svc.brand}
                  </span>
                  </>
                ) : null}
              </div>
              <p style={css("color:#eef0ec;font-size:clamp(19px,2.2vw,26px);line-height:1.5;max-width:760px;margin:26px 0 40px;text-wrap:balance;")}>
                {$v.svc.tagline}
              </p>
              <div style={css("display:flex;gap:16px;flex-wrap:wrap;")}>
                <A href={$v.enquireHref} style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:16px;padding:18px 38px;border-radius:14px;transition:transform 0.2s ease, box-shadow 0.2s ease;")} hoverStyle={css("transform:translateY(-3px);box-shadow:0 14px 32px rgba(197,160,89,0.4);")}>
                  {"Enquire Now"}
                </A>
                <A href="/services" style={css("text-decoration:none;background:rgba(250,250,249,0.08);border:1px solid rgba(250,250,249,0.4);color:#FAFAF9;font-weight:700;font-size:16px;padding:18px 38px;border-radius:14px;")}>
                  {"← All Services"}
                </A>
              </div>
            </div>
          </section>
          <div className="gf-sticky-under-nav" style={css("position:sticky;z-index:30;background:rgba(252,249,244,0.94);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid #e5e2dd;")}>
            <div className="gf-scroll-x" style={css("max-width:1200px;margin:0 auto;padding:14px clamp(24px,6vw,80px);display:flex;gap:10px;align-items:center;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;color:#717976;text-transform:uppercase;letter-spacing:0.08em;margin-right:6px;white-space:nowrap;")}>
                {"Built for →"}
              </span>
              {($v.audienceTabs || []).map((tab, tabIndex) => (
                <Fragment key={tabIndex}>
                  <button onClick={tab.onClick} aria-pressed={tab.pressed} style={css(`background:${tab.bg};color:${tab.color};border:1px solid ${tab.border};border-radius:999px;padding:10px 18px;font-size:13.5px;font-weight:700;cursor:pointer;font-family:'Hanken Grotesk',sans-serif;transition:all 0.2s ease;white-space:nowrap;flex-shrink:0;`)}>
                    {tab.short}
                  </button>
                </Fragment>
              ))}
            </div>
          </div>
          <section id="overview" style={css("padding:clamp(64px,8vw,110px) clamp(24px,6vw,80px);")}>
            <div style={css("max-width:960px;margin:0 auto;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:14px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"The Overview"}
              </span>
              <p style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3.4vw,38px);line-height:1.4;color:#1A3C34;margin:24px 0 0;text-wrap:pretty;")}>
                {$v.svc.overview}
              </p>
            </div>
          </section>
          <section id="target" style={css("padding:0 clamp(24px,6vw,80px) clamp(48px,6vw,90px);")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:inline-flex;align-items:center;gap:10px;background:#F5F2ED;border:1px solid #e5e2dd;border-radius:999px;padding:10px 20px;margin-bottom:28px;")}>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;color:#717976;text-transform:uppercase;letter-spacing:0.08em;")}>
                  {"Segment"}
                </span>
                <span style={css("font-size:15px;font-weight:700;color:#1A3C34;")}>
                  {$v.aud.label}{" · "}{$v.aud.size}
                </span>
              </div>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(320px,1fr));gap:24px;")}>
                <div style={css("background:#1A3C34;border-radius:22px;padding:clamp(32px,4vw,48px);")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12.5px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;")}>
                    {"Who It's For"}
                  </span>
                  <p style={css("color:#FAFAF9;font-size:clamp(18px,1.9vw,22px);line-height:1.55;margin:18px 0 0;font-family:'Source Serif 4',serif;")}>
                    {$v.aud.targetProfile}
                  </p>
                </div>
                <div style={css("background:#F5F2ED;border:1px solid #e5e2dd;border-radius:22px;padding:clamp(32px,4vw,48px);")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12.5px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                    {"Objectives"}
                  </span>
                  <p style={css("color:#1c1c19;font-size:clamp(17px,1.7vw,20px);line-height:1.65;margin:18px 0 0;")}>
                    {$v.aud.objectives}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="deliverables" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);background:#FAFAF9;border-top:1px solid #eee9e1;border-bottom:1px solid #eee9e1;")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:44px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                  {"01"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#1A3C34;margin:0;")}>
                  {"What You Receive"}
                </h2>
              </div>
              <div className="gf-swipe gf-bleed-24" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:18px;")}>
                {($v.aud.deliverablesX || []).map((d, dIndex) => (
                  <Fragment key={dIndex}>
                    <Hov as="div" style={css(`background:#FCF9F4;border:1px solid #e5e2dd;border-radius:16px;padding:28px;display:flex;flex-direction:column;gap:14px;animation:fadeUp 0.5s ease both;animation-delay:${d.delay};transition:transform 0.2s ease,border-color 0.2s ease;`)} hoverStyle={css("transform:translateY(-4px);border-color:#C5A059;")}>
                      <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;color:#C5A059;")}>
                        {d.num}
                      </span>
                      <span style={css("font-size:clamp(16px,1.7vw,19px);color:#1A3C34;font-weight:600;line-height:1.4;")}>
                        {d.text}
                      </span>
                    </Hov>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          <section id="methodology" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:48px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                  {"02"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#1A3C34;margin:0;")}>
                  {"How It Works"}
                </h2>
              </div>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:28px;")}>
                {($v.svc.methodologyX || []).map((m, mIndex) => (
                  <Fragment key={mIndex}>
                    <div style={css(`display:flex;flex-direction:column;gap:16px;animation:fadeUp 0.5s ease both;animation-delay:${m.delay};`)}>
                      <div style={css("width:56px;height:56px;border-radius:999px;background:#1A3C34;color:#e9c176;display:flex;align-items:center;justify-content:center;font-family:'Source Serif 4',serif;font-size:22px;font-weight:700;flex-shrink:0;")}>
                        {m.num}
                      </div>
                      <p style={css("color:#1A3C34;font-size:clamp(16px,1.7vw,19px);font-weight:600;margin:0;line-height:1.45;")}>
                        {m.step}
                      </p>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          <section id="kpis" style={css("padding:clamp(64px,8vw,110px) clamp(24px,6vw,80px);background:linear-gradient(135deg,#1A3C34,#22483f);")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:44px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#e9c176;font-weight:700;line-height:1;")}>
                  {"03"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#FAFAF9;margin:0;")}>
                  {"KPIs & Success Metrics"}
                </h2>
              </div>
              <div style={css("display:flex;flex-wrap:wrap;gap:14px;")}>
                {($v.aud.kpis || []).map((k, kIndex) => (
                  <Fragment key={kIndex}>
                    <span style={css("background:rgba(233,193,118,0.12);border:1px solid rgba(233,193,118,0.35);color:#FAFAF9;font-size:clamp(15px,1.7vw,18px);font-weight:600;padding:14px 24px;border-radius:14px;")}>
                      {k}
                    </span>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          <section id="timeline" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:44px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                  {"04"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#1A3C34;margin:0;")}>
                  {"Timeline & Milestones"}
                </h2>
              </div>
              <div style={css("display:flex;overflow-x:auto;gap:20px;padding-bottom:10px;")}>
                {($v.svc.timelineX || []).map((tl, tlIndex) => (
                  <Fragment key={tlIndex}>
                    <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:26px 28px;min-width:220px;flex-shrink:0;")}>
                      <div style={css("width:34px;height:34px;border-radius:999px;background:#C5A059;color:#1A3C34;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:700;margin-bottom:16px;")}>
                        {tl.num}
                      </div>
                      <div style={css("font-family:'JetBrains Mono',monospace;font-size:12px;color:#C5A059;text-transform:uppercase;margin-bottom:8px;")}>
                        {tl.duration}
                      </div>
                      <div style={css("color:#1A3C34;font-size:18px;font-weight:700;font-family:'Source Serif 4',serif;")}>
                        {tl.phase}
                      </div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          <section id="commercial" style={css("padding:clamp(64px,8vw,110px) clamp(24px,6vw,80px);background:#F5F2ED;border-top:1px solid #eee9e1;")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:44px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                  {"05"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#1A3C34;margin:0;")}>
                  {"Commercial Model"}
                </h2>
              </div>
              <div style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px;align-items:start;")}>
                <div style={css("display:flex;flex-direction:column;gap:16px;")}>
                  <div style={css("background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:28px;")}>
                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                      {"Edition"}
                    </span>
                    <div style={css("font-family:'Source Serif 4',serif;font-size:clamp(20px,2.2vw,25px);color:#1A3C34;margin-top:10px;")}>
                      {$v.aud.edition}
                    </div>
                  </div>
                  <div style={css("background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:28px;")}>
                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                      {"Model"}
                    </span>
                    <p style={css("color:#414846;font-size:16px;line-height:1.6;margin:10px 0 0;")}>
                      {$v.aud.model}
                    </p>
                  </div>
                  <div style={css("background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:28px;")}>
                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                      {"Service Level"}
                    </span>
                    <p style={css("color:#414846;font-size:16px;line-height:1.6;margin:10px 0 0;")}>
                      {$v.aud.sla}
                    </p>
                  </div>
                </div>
                <div style={css("background:#1A3C34;border-radius:22px;padding:clamp(32px,4vw,44px);")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11.5px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;")}>
                    {"Indicative Pricing · 2026 · ex-GST"}
                  </span>
                  <div style={css("display:flex;flex-direction:column;gap:16px;margin-top:22px;")}>
                    {($v.aud.pricing || []).map((p, pIndex) => (
                      <Fragment key={pIndex}>
                        <div style={css("display:flex;align-items:flex-start;gap:14px;border-bottom:1px solid rgba(250,250,249,0.12);padding-bottom:16px;")}>
                          <span style={css("color:#e9c176;font-size:18px;line-height:1.4;flex-shrink:0;")}>
                            {"₹"}
                          </span>
                          <span style={css("color:#FAFAF9;font-size:clamp(16px,1.7vw,19px);line-height:1.45;")}>
                            {p}
                          </span>
                        </div>
                      </Fragment>
                    ))}
                  </div>
                  <p style={css("color:#83a69c;font-size:13px;margin:20px 0 0;line-height:1.55;")}>
                    {"Indicative for 2026, exclusive of GST; firmed up per site in a written proposal after survey."}
                  </p>
                </div>
              </div>
            </div>
          </section>
          <section id="technology" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);")}>
            <div style={css("max-width:1200px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:48px;")}>
              <div>
                <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:28px;flex-wrap:wrap;")}>
                  <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                    {"06"}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,34px);color:#1A3C34;margin:0;")}>
                    {"Technology & Platforms"}
                  </h2>
                </div>
                <div style={css("display:flex;flex-wrap:wrap;gap:12px;")}>
                  {($v.svc.technology || []).map((t, tIndex) => (
                    <Fragment key={tIndex}>
                      <span style={css("background:#F5F2ED;border:1px solid #e5e2dd;color:#1A3C34;font-size:15px;font-weight:600;padding:11px 20px;border-radius:999px;")}>
                        {t}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
              <div id="addons">
                <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:28px;flex-wrap:wrap;")}>
                  <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#C5A059;font-weight:700;line-height:1;")}>
                    {"07"}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,34px);color:#1A3C34;margin:0;")}>
                    {"Optional Add-ons"}
                  </h2>
                </div>
                <div style={css("display:flex;flex-wrap:wrap;gap:12px;")}>
                  {($v.aud.addons || []).map((a, aIndex) => (
                    <Fragment key={aIndex}>
                      <span style={css("border:1px dashed #C5A059;color:#1A3C34;font-size:15px;font-weight:600;padding:11px 20px;border-radius:999px;")}>
                        {"+ "}{a}
                      </span>
                    </Fragment>
                  ))}
                </div>
              </div>
            </div>
          </section>
          <section id="esg" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);background:#e8f3ee;")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;gap:18px;margin-bottom:44px;flex-wrap:wrap;")}>
                <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(30px,4vw,48px);color:#2D5A27;font-weight:700;line-height:1;")}>
                  {"08"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,38px);color:#1A3C34;margin:0;")}>
                  {"ESG & Sustainability"}
                </h2>
              </div>
              <div className="gf-swipe gf-bleed-24" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:18px;")}>
                {($v.svc.esg || []).map((e, eIndex) => (
                  <Fragment key={eIndex}>
                    <div style={css("background:#FCF9F4;border-radius:16px;padding:26px 28px;color:#2D5A27;font-size:clamp(16px,1.7vw,19px);font-weight:600;line-height:1.4;")}>
                      {e}
                    </div>
                  </Fragment>
                ))}
              </div>
            </div>
          </section>
          <section id="support" style={css("padding:clamp(56px,7vw,100px) clamp(24px,6vw,80px);")}>
            <div style={css("max-width:1200px;margin:0 auto;background:#1A3C34;border-radius:24px;padding:clamp(36px,5vw,64px);")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12.5px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;")}>
                {"Support & Escalation"}
              </span>
              <div style={css("color:#FAFAF9;font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,34px);margin:16px 0 14px;")}>
                {$v.svc.supportTitle}
              </div>
              <p style={css("color:#c5eadf;font-size:clamp(16px,1.8vw,20px);line-height:1.6;margin:0;max-width:640px;")}>
                {$v.svc.supportText}
              </p>
            </div>
          </section>
          <section id="cta" style={css("padding:0 clamp(24px,6vw,80px) clamp(80px,9vw,130px);")}>
            <div style={css("max-width:1200px;margin:0 auto;background:linear-gradient(120deg,#1A3C34,#2D5A27,#1A3C34);background-size:200% 200%;animation:gradientPan 9s ease infinite;border-radius:28px;padding:clamp(48px,7vw,90px) clamp(28px,5vw,72px);text-align:center;")}>
              <h3 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,4.2vw,46px);color:#FAFAF9;margin:0 0 18px;line-height:1.1;")}>
                {"Ready to Transform Your Farmland?"}
              </h3>
              <p style={css("color:#d3e6df;font-size:clamp(17px,2vw,21px);line-height:1.6;max-width:640px;margin:0 auto 10px;")}>
                {$v.ctaText}
              </p>
              <p style={css("color:#83a69c;font-size:15px;margin:0 auto 36px;max-width:520px;")}>
                {"Want detailed pricing, timelines and implementation guidance? Download the brochure or connect with our specialists."}
              </p>
              <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-bottom:20px;")}>
                <A href={$v.enquireHref} style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:17px;padding:19px 40px;border-radius:14px;transition:transform 0.2s ease,box-shadow 0.2s ease;")} hoverStyle={css("transform:translateY(-3px);box-shadow:0 16px 36px rgba(197,160,89,0.45);")}>
                  {"Enquire Now"}
                </A>
                <A href={$v.brochureHref} download="Gratitude-Farms-Service-Specifications.pdf" onClick={$v.onBrochure} style={css("text-decoration:none;background:transparent;border:1px solid rgba(250,250,249,0.5);color:#FAFAF9;font-weight:700;font-size:17px;padding:19px 40px;border-radius:14px;display:inline-block;")} hoverStyle={css("background:rgba(250,250,249,0.1);color:#FAFAF9;")}>
                  {"⬇ Download Full Specification (PDF)"}
                </A>
              </div>
              <A href={`tel:${$v.phoneDial}`} style={css("text-decoration:none;color:#e9c176;font-size:15px;font-weight:600;")}>
                {"Talk to an Expert →"}
              </A>
            </div>
          </section>
          <section id="other-services" style={css("padding:0 clamp(24px,6vw,80px) clamp(64px,8vw,110px);")}>
            <div style={css("max-width:1200px;margin:0 auto;")}>
              <div style={css("display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin-bottom:28px;")}>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0;")}>
                  {"Explore Our Other Services"}
                </h2>
                <A href="/services" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                  {"All Services →"}
                </A>
              </div>
              <div className="gf-swipe gf-bleed-24" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:18px;")}>
                {($v.otherServices || []).map((o, oIndex) => (
                  <Fragment key={oIndex}>
                    <A className="gf-card-lift" href={o.href} style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:10px;")}>
                      <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                        {o.code}
                      </span>
                      <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;line-height:1.3;")}>
                        {o.name}
                      </span>
                      {(o.brand) ? (
                        <>
                        <span style={css("font-family:'Source Serif 4',serif;font-size:14px;color:#C5A059;font-weight:700;")}>
                          {o.brand}
                        </span>
                        </>
                      ) : null}
                      <span style={css("color:#414846;font-size:13.5px;line-height:1.6;margin-top:2px;")}>
                        {o.short}
                      </span>
                    </A>
                  </Fragment>
                ))}
                <A className="gf-card-lift" href="/nakshatra-vanam" style={css("text-decoration:none;background:#e8f3ee;border:1px solid #c5eadf;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:10px;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                    {"Add-on Program"}
                  </span>
                  <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;line-height:1.3;")}>
                    {"Personal Nakshatra Vanam"}
                  </span>
                  <span style={css("color:#414846;font-size:13.5px;line-height:1.6;margin-top:2px;")}>
                    {"A 1-acre micro-forest of 120 trees aligned to your birth star."}
                  </span>
                </A>
              </div>
            </div>
          </section>
          </>
        ) : null}
        {($v.notFound) ? (
          <>
          <section style={css("max-width:800px;margin:0 auto;padding:clamp(80px,12vw,140px) clamp(24px,6vw,80px);text-align:center;")}>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,4vw,34px);color:#1A3C34;margin:0 0 16px;")}>
              {"We couldn't find that service"}
            </h1>
            <p style={css("color:#414846;font-size:16px;line-height:1.7;margin:0 0 28px;")}>
              {"It may have been renamed or moved. Browse everything we offer instead."}
            </p>
            <A href="/services" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"View All Services"}
            </A>
          </section>
          </>
        ) : null}
        {($v.toastVisible) ? (
          <>
          <div className="gf-toast" role="status">
            {"Your download has started — the full Service Product Specification (PDF)."}
          </div>
          </>
        ) : null}
      </>
    );
  }
}

export default ServiceDetail;
