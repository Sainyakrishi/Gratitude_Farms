import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class OurServices extends Component {

  state = { slide: 0 };
  data = null;
  bannerTaglines = {
    'managed-farmland': 'Hand over your land. Get back a living, profitable farm — designed, restored, operated and monetised, all under one roof.',
    'soil-fertility': 'Bring your soil back to life. We turn waste biomass into biochar and lock carbon into the earth for centuries.',
    'farmland-design': 'Every square foot, intentional. Water, trees and beauty planned before a single seed goes in.',
    'farmland-operate': 'Season after season, thriving. Ex-servicemen teams run your farm so you never lift a spade.'
  };
  componentDidMount() {
    import('../data/services-data.js').then(mod => { this.data = mod; this.forceUpdate(); });
    this.timer = setInterval(() => {
      if (this.data) this.setState(s => ({ slide: (s.slide + 1) % (this.data.SERVICES.length + 1) }));
    }, 5500);
  }
  componentWillUnmount() { clearInterval(this.timer); }
  go(dir) {
    const n = this.data.SERVICES.length + 1;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.setState(s => ({ slide: (s.slide + 1) % n })), 5500);
    this.setState(s => ({ slide: (s.slide + dir + n) % n }));
  }
  renderVals() {
    if (!this.data) return { services: [], banners: [], dots: [], prevSlide: () => {}, nextSlide: () => {} };
    const { SERVICES, SERVICE_PAGES } = this.data;
    const services = SERVICES.map((s, i) => ({
      ...s,
      delay: `${i * 90}ms`,
      highlightsShort: s.highlights.slice(0, 3),
      pageHref: SERVICE_PAGES[s.key]
    }));
    const cur = this.state.slide;
    const rawBanners = [
      { name: 'Circular Economy', brand: null, badge: 'Waste to Wealth via Natural Farming', hero: '/assets/banner-circular-economy.png',
        tagline: 'Turn farm waste into wealth — biomass becomes biochar, biochar rebuilds soil, and richer soil means higher yields and higher income for small farmers.',
        href: '/services' },
      ...SERVICES.map(s => ({
        name: s.name, brand: s.brand, badge: s.badge, hero: s.hero,
        tagline: this.bannerTaglines[s.key] || s.tagline,
        href: SERVICE_PAGES[s.key]
      }))
    ];
    const banners = rawBanners.map((b, i) => ({
      ...b,
      opacity: i === cur ? 1 : 0,
      pointer: i === cur ? 'auto' : 'none'
    }));
    const dots = rawBanners.map((b, i) => ({
      w: i === cur ? '30px' : '8px',
      bg: i === cur ? '#C5A059' : 'rgba(250,250,249,0.5)',
      onClick: () => this.setState({ slide: i })
    }));
    return { services, banners, dots, prevSlide: () => this.go(-1), nextSlide: () => this.go(1) };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Products & Services — Managed Farmland, Soil, Design & Operations | Gratitude Farms"} description={"Gratitude Farms Products & Services - Managed Farmland, BhuPrana Soil Fertility, Vasudha Farmland Design and Sanjeevani Farmland Operations."} />
        <SiteNav active="program" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("position:relative;height:clamp(460px,72vh,720px);overflow:hidden;background:#1A3C34;")}>
            {($v.banners || []).map((b, bIndex) => (
              <Fragment key={bIndex}>
                <A href={b.href} style={css(`position:absolute;inset:0;display:block;text-decoration:none;opacity:${b.opacity};transition:opacity 0.9s ease;pointer-events:${b.pointer};`)}>
                  <div role="img" aria-label={b.name} style={css(`position:absolute;inset:0;background-image:url('${b.hero}');background-size:cover;background-position:center;animation:slideKenSm 7s ease-out both;`)} />
                  <div style={css("position:absolute;inset:0;background:linear-gradient(90deg,rgba(26,60,52,0.92),rgba(26,60,52,0.45) 60%,rgba(26,60,52,0.2));")} />
                  <div style={css("position:relative;z-index:2;max-width:1440px;margin:0 auto;height:100%;padding:0 clamp(24px,6vw,80px);display:flex;flex-direction:column;justify-content:center;box-sizing:border-box;")}>
                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:13px;letter-spacing:0.16em;color:#e9c176;text-transform:uppercase;margin-bottom:18px;")}>
                      {b.badge}
                    </span>
                    <div style={css("display:flex;align-items:baseline;gap:16px;flex-wrap:wrap;")}>
                      <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(34px,5.5vw,64px);line-height:1.05;color:#FAFAF9;margin:0;max-width:800px;")}>
                        {b.name}
                      </h2>
                      {(b.brand) ? (
                        <>
                        <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,3vw,36px);color:#C5A059;font-weight:700;")}>
                          {b.brand}
                        </span>
                        </>
                      ) : null}
                    </div>
                    <p style={css("color:#eef0ec;font-size:clamp(17px,2vw,23px);line-height:1.5;max-width:620px;margin:22px 0 32px;text-wrap:balance;")}>
                      {b.tagline}
                    </p>
                    <span style={css("align-self:flex-start;background:#C5A059;color:#1A3C34;font-weight:700;font-size:15px;padding:15px 32px;border-radius:12px;")}>
                      {"Explore "}{b.name}{" →"}
                    </span>
                  </div>
                </A>
              </Fragment>
            ))}
            <div style={css("position:absolute;left:0;right:0;bottom:26px;z-index:5;display:flex;gap:12px;justify-content:center;")}>
              {($v.dots || []).map((d, dIndex) => (
                <Fragment key={dIndex}>
                  <button onClick={d.onClick} aria-label="Go to slide" style={css(`width:${d.w};height:8px;border-radius:999px;border:none;cursor:pointer;background:${d.bg};transition:all 0.3s ease;padding:0;`)} />
                </Fragment>
              ))}
            </div>
            <button onClick={$v.prevSlide} aria-label="Previous" className="gf-carousel-arrow" style={css("position:absolute;left:clamp(12px,3vw,32px);top:50%;transform:translateY(-50%);z-index:5;width:48px;height:48px;border-radius:999px;border:1px solid rgba(250,250,249,0.4);background:rgba(26,60,52,0.35);color:#FAFAF9;font-size:20px;cursor:pointer;backdrop-filter:blur(6px);")}>
              {"‹"}
            </button>
            <button onClick={$v.nextSlide} aria-label="Next" className="gf-carousel-arrow" style={css("position:absolute;right:clamp(12px,3vw,32px);top:50%;transform:translateY(-50%);z-index:5;width:48px;height:48px;border-radius:999px;border:1px solid rgba(250,250,249,0.4);background:rgba(26,60,52,0.35);color:#FAFAF9;font-size:20px;cursor:pointer;backdrop-filter:blur(6px);")}>
              {"›"}
            </button>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;text-align:center;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Our Programs"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,54px);color:#1A3C34;margin:18px auto 20px;max-width:820px;")}>
              {"Products & Services"}
            </h1>
            <p style={css("color:#414846;font-size:17px;line-height:1.7;max-width:640px;margin:0 auto;")}>
              {"Four flagship services covering the full lifecycle of a natural farm — design, restore, manage and operate — built for individuals, corporates, FPOs and farmers alike."}
            </p>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px;")}>
              {($v.services || []).map((svc, svcIndex) => (
                <Fragment key={svcIndex}>
                  <A href={svc.pageHref} style={css(`text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:20px;overflow:hidden;display:flex;flex-direction:column;animation:fadeUpSm 0.6s ease both;animation-delay:${svc.delay};transition:transform 0.25s ease, box-shadow 0.25s ease;`)} hoverStyle={css("transform:translateY(-6px);box-shadow:0 20px 48px rgba(26,60,52,0.14);")}>
                    <div style={css("position:relative;aspect-ratio:16/10;overflow:hidden;")}>
                      <div role="img" aria-label={svc.name} style={css(`position:absolute;inset:0;background-image:url('${svc.hero}');background-size:cover;background-position:center;`)} />
                      <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.85),rgba(26,60,52,0.05) 60%);")} />
                      <span style={css("position:absolute;top:14px;left:14px;background:rgba(250,250,249,0.92);color:#1A3C34;font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.06em;text-transform:uppercase;padding:6px 12px;border-radius:999px;")}>
                        {svc.badge}
                      </span>
                      <div style={css("position:absolute;left:20px;right:20px;bottom:16px;")}>
                        {(svc.brand) ? (
                          <>
                          <span style={css("color:#e9c176;font-family:'Source Serif 4',serif;font-size:14px;font-weight:700;")}>
                            {svc.brand}
                          </span>
                          </>
                        ) : null}
                        <h3 style={css("font-family:'Source Serif 4',serif;font-size:22px;color:#FAFAF9;margin:4px 0 0;")}>
                          {svc.name}
                        </h3>
                      </div>
                    </div>
                    <div style={css("padding:24px;display:flex;flex-direction:column;gap:16px;flex:1;")}>
                      <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                        {svc.tagline}
                      </p>
                      <ul style={css("margin:0;padding:0;list-style:none;display:flex;flex-direction:column;gap:8px;")}>
                        {(svc.highlightsShort || []).map((h, hIndex) => (
                          <Fragment key={hIndex}>
                            <li style={css("display:flex;align-items:flex-start;gap:8px;font-size:13px;color:#1A3C34;")}>
                              <span style={css("width:5px;height:5px;border-radius:999px;background:#C5A059;margin-top:7px;flex-shrink:0;")} />
                              {h}
                            </li>
                          </Fragment>
                        ))}
                      </ul>
                      <span style={css("margin-top:auto;background:#1A3C34;color:#fff;border:none;border-radius:10px;padding:13px;font-size:13.5px;font-weight:700;text-align:center;transition:background 0.2s ease;")}>
                        {"Explore Service →"}
                      </span>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
            <div style={css("margin-top:clamp(48px,7vw,90px);")}>
              <div style={css("display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:32px;flex-wrap:wrap;gap:16px;")}>
                <div>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                    {"Beyond the Four"}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,34px);color:#1A3C34;margin:14px 0 0;")}>
                    {"Programs & Initiatives"}
                  </h2>
                </div>
              </div>
              <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,250px),1fr));gap:20px;")}>
                <A className="gf-card-lift" href="/farmland-development" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:10px;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;")}>
                    {"Farmland Development Projects"}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                    {"Barren land to carbon-rich, microbially active ecosystem in 6–12 months."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;padding-top:8px;")}>
                    {"See the roadmap →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/nakshatra-vanam" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:10px;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;")}>
                    {"Personal Nakshatra Vanam"}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                    {"A one-acre micro-forest of 120 trees aligned to your birth star and zodiac."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;padding-top:8px;")}>
                    {"Create your grove →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/corporate-esg" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:10px;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;")}>
                    {"Corporate ESG Projects"}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                    {"Audit-ready carbon, biodiversity and livelihood outcomes for CSR mandates."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;padding-top:8px;")}>
                    {"Design a program →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/sainya-krishi" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:10px;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;")}>
                    {"Sainya Krishi"}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                    {"Ex-servicemen trained and established as natural farming entrepreneurs."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;padding-top:8px;")}>
                    {"Meet the program →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/medicinal-plants-trees" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;padding:30px;display:flex;flex-direction:column;gap:10px;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:20px;color:#1A3C34;margin:0;")}>
                    {"Medicinal Plants & Trees"}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                    {"The species catalogue we raise, grown under Vriksh Ayurveda principles."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;padding-top:8px;")}>
                    {"Browse the catalogue →"}
                  </span>
                </A>
              </div>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default OurServices;
