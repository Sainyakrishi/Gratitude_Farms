import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class Home extends Component {

  state = { slide: 0, services: [], posts: [] };
  banners = [
    { name: 'Circular Economy', brand: null, badge: 'Waste to Wealth via Natural Farming', hero: '/assets/banner-circular-economy.png', href: '/services',
      tagline: 'Turn farm waste into wealth. Biomass becomes biochar, biochar rebuilds soil, and richer soil means higher yields and higher income for small farmers.' },
    { name: 'Managed Farmland', brand: null, badge: 'Cultivating Discipline, Harvesting Hope', hero: '/assets/banner-managed-farmland.png', href: '/services/managed-farmland',
      tagline: 'Hand over your land. Get back a living, profitable natural farm — designed, restored, operated and monetised, all under one roof.' },
    { name: 'Soil Fertility', brand: 'BhuPrana™', badge: 'Living Soil · Locked Carbon', hero: '/assets/banner-soil-fertility.png', href: '/services/soil-fertility',
      tagline: 'Bring your soil back to life. We turn waste biomass into biochar and lock carbon into the earth for centuries.' },
    { name: 'Farmland Design', brand: 'Vasudha™', badge: 'Every Square Foot, Intentional', hero: '/assets/banner-farmland-design.png', href: '/services/farmland-design',
      tagline: 'Water, trees and beauty — planned before a single seed goes in. A farm that is as productive as it is stunning.' },
    { name: 'Farmland Operate', brand: 'Sanjeevani™', badge: 'Thriving, Season After Season', hero: '/assets/banner-farmland-operate.png', href: '/services/farmland-operate',
      tagline: 'Ex-servicemen teams run your farm day to day, so it keeps thriving — and you never lift a spade.' }
  ];
  componentDidMount() {
    this.timer = setInterval(() => this.setState(s => ({ slide: (s.slide + 1) % this.banners.length })), 5500);

    // The service grid and journal strip are built from the same data the
    // dedicated pages use, so the home page can never drift out of date.
    import('../data/services-data.js').then(mod => {
      this.setState({
        services: mod.SERVICES.map(s => ({
          code: s.code, name: s.name, brand: s.brand, hero: s.hero,
          short: (s.highlights && s.highlights[0]) || s.badge,
          href: mod.SERVICE_PAGES[s.key]
        }))
      });
    });
    import('../data/blog-data.js').then(mod => {
      const sorted = [...mod.POSTS].sort((a, b) => (a.date < b.date ? 1 : -1));
      this.setState({
        posts: sorted.slice(0, 3).map(p => ({
          title: p.title, category: p.category, hero: p.hero,
          dateDisplay: p.dateDisplay, readTime: p.readTime,
          href: `/blog/${p.slug}`
        }))
      });
    });
  }
  componentWillUnmount() { clearInterval(this.timer); }
  go(dir) {
    const n = this.banners.length;
    clearInterval(this.timer);
    this.timer = setInterval(() => this.setState(s => ({ slide: (s.slide + 1) % n })), 5500);
    this.setState(s => ({ slide: (s.slide + dir + n) % n }));
  }
  renderVals() {
    const cur = this.state.slide;
    const banners = this.banners.map((b, i) => ({
      ...b,
      opacity: i === cur ? 1 : 0,
      pointer: i === cur ? 'auto' : 'none'
    }));
    const dots = this.banners.map((b, i) => ({
      w: i === cur ? '30px' : '8px',
      bg: i === cur ? '#C5A059' : 'rgba(250,250,249,0.5)',
      onClick: () => this.setState({ slide: i })
    }));
    return {
      banners, dots,
      services: this.state.services,
      posts: this.state.posts,
      hasPosts: this.state.posts.length > 0,
      prevSlide: () => this.go(-1),
      nextSlide: () => this.go(1)
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Gratitude Farms — Natural Precision Farming & Managed Farmland in India"} description={"Gratitude Farms - India's premium natural farming and agri-tech enterprise, led by ex-servicemen."} />
        <SiteNav active="home" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("position:relative;height:clamp(560px,90vh,900px);overflow:hidden;background:#1A3C34;")}>
            {($v.banners || []).map((b, bIndex) => (
              <Fragment key={bIndex}>
                <div style={css(`position:absolute;inset:0;opacity:${b.opacity};transition:opacity 1s ease;pointer-events:${b.pointer};`)}>
                  <div role="img" aria-label={b.name} style={css(`position:absolute;inset:0;background-image:url('${b.hero}');background-size:cover;background-position:center;animation:slideKen 8s ease-out both;`)} />
                  <div style={css("position:absolute;inset:0;background:linear-gradient(180deg,rgba(26,60,52,0.5),rgba(26,60,52,0.88));")} />
                  <div style={css("position:relative;z-index:2;max-width:960px;margin:0 auto;height:100%;padding:0 24px;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;")}>
                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:12.5px;letter-spacing:0.18em;color:#e9c176;text-transform:uppercase;margin-bottom:20px;")}>
                      {b.badge}
                    </span>
                    <div style={css("display:flex;align-items:baseline;gap:14px;flex-wrap:wrap;justify-content:center;")}>
                      <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(36px,6vw,68px);line-height:1.06;font-weight:700;color:#FAFAF9;margin:0;text-wrap:balance;")}>
                        {b.name}
                      </h1>
                      {(b.brand) ? (
                        <>
                        <span style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3.4vw,40px);color:#C5A059;font-weight:700;")}>
                          {b.brand}
                        </span>
                        </>
                      ) : null}
                    </div>
                    <p style={css("font-size:clamp(16px,2vw,21px);line-height:1.55;color:#e5e2dd;max-width:640px;margin:24px 0 40px;text-wrap:balance;")}>
                      {b.tagline}
                    </p>
                    <div style={css("display:flex;gap:16px;flex-wrap:wrap;justify-content:center;")}>
                      <A href={b.href} style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                        {"Explore "}{b.name}{" →"}
                      </A>
                      <A href="/services" style={css("text-decoration:none;background:transparent;border:1px solid rgba(250,250,249,0.5);color:#FAFAF9;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                        {"All Services"}
                      </A>
                    </div>
                  </div>
                </div>
              </Fragment>
            ))}
            <div style={css("position:absolute;left:0;right:0;bottom:28px;z-index:5;display:flex;gap:12px;justify-content:center;")}>
              {($v.dots || []).map((d, dIndex) => (
                <Fragment key={dIndex}>
                  <button onClick={d.onClick} aria-label="Go to slide" style={css(`width:${d.w};height:8px;border-radius:999px;border:none;cursor:pointer;background:${d.bg};transition:all 0.3s ease;padding:0;`)} />
                </Fragment>
              ))}
            </div>
            <button onClick={$v.prevSlide} aria-label="Previous" className="gf-carousel-arrow" style={css("position:absolute;left:clamp(12px,3vw,36px);top:50%;transform:translateY(-50%);z-index:5;width:50px;height:50px;border-radius:999px;border:1px solid rgba(250,250,249,0.4);background:rgba(26,60,52,0.35);color:#FAFAF9;font-size:22px;cursor:pointer;backdrop-filter:blur(6px);")}>
              {"‹"}
            </button>
            <button onClick={$v.nextSlide} aria-label="Next" className="gf-carousel-arrow" style={css("position:absolute;right:clamp(12px,3vw,36px);top:50%;transform:translateY(-50%);z-index:5;width:50px;height:50px;border-radius:999px;border:1px solid rgba(250,250,249,0.4);background:rgba(26,60,52,0.35);color:#FAFAF9;font-size:22px;cursor:pointer;backdrop-filter:blur(6px);")}>
              {"›"}
            </button>
          </section>
          <section style={css("background:#1A3C34;padding:clamp(36px,5.5vw,64px) clamp(20px,5.5vw,80px);")}>
            <div style={css("max-width:1100px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);")}>
              <img src="/assets/global-triggers.jpg" alt="Global Triggers — climate change, conservation, biodiversity and regenerative farming" style={css("width:100%;height:auto;display:block;")} />
            </div>
          </section>
          <section style={css("padding:clamp(29px,5.3vw,64px) clamp(20px,5.5vw,80px) clamp(34px,6vw,76px);max-width:1440px;margin:0 auto;")}>
            <A href="https://www.weforum.org/organizations/gratitude-farms/" target="_blank" rel="noopener" style={css("text-decoration:none;display:flex;align-items:center;justify-content:space-between;gap:28px;flex-wrap:wrap;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:20px;padding:32px 40px;transition:transform 0.25s ease, box-shadow 0.25s ease;")} hoverStyle={css("transform:translateY(-4px);box-shadow:0 20px 48px rgba(26,60,52,0.1);")}>
              <div style={css("display:flex;align-items:center;gap:24px;flex-wrap:wrap;")}>
                <img src="/assets/logo-badge.png" alt="Gratitude Farms" style={css("width:56px;height:56px;object-fit:contain;flex-shrink:0;")} />
                <div>
                  <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;margin-bottom:6px;")}>
                    {"Featured On"}
                  </div>
                  <div style={css("font-family:'Source Serif 4',serif;font-size:clamp(20px,2.4vw,26px);font-weight:700;color:#1A3C34;")}>
                    {"World Economic Forum"}
                  </div>
                  <div style={css("color:#414846;font-size:14px;margin-top:4px;")}>
                    {"Recognized for innovative sustainability in agriculture."}
                  </div>
                </div>
              </div>
              <span style={css("color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;white-space:nowrap;")}>
                {"Read More →"}
              </span>
            </A>
          </section>
          <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);display:grid;grid-template-columns:5fr 6fr;gap:32px;align-items:center;")}>
            <div>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                {"Our Legacy"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,42px);color:#1A3C34;margin:18px 0 24px;")}>
                {"Discipline Meets the Earth"}
              </h2>
              <p style={css("color:#414846;font-size:16px;line-height:1.75;margin:0 0 18px;")}>
                {"The company has been co-founded by two ex-Army Officers and two Technology Professionals. We are a Social Impact Enterprise working towards dignified livelihood and entrepreneurship opportunities for ex-servicemen, rural women and youth through Natural Precision Farming and On-Farm value addition."}
              </p>
              <A href="/about-us" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"Read the Full Story →"}
              </A>
            </div>
            <div style={css("border-radius:24px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);aspect-ratio:4/3;")}>
              <img src="/assets/marigold-field.jpeg" alt="Marigold in bloom across a Gratitude Farms field" style={css("width:100%;height:100%;object-fit:cover;")} />
            </div>
          </section>
          <section style={css("background:#FAFAF9;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
            <div style={css("max-width:1440px;margin:0 auto;")}>
              <div style={css("text-align:center;max-width:720px;margin:0 auto 64px;")}>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                  {"What Makes Us Different"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#1A3C34;margin:16px 0 0;")}>
                  {"UniqueGratitude"}
                </h2>
              </div>
              <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px;")}>
                <A className="gf-card-lift" href="/farmland-development" style={css("text-decoration:none;background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:36px;display:flex;flex-direction:column;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#1A3C34;margin:0 0 12px;")}>
                    {"Natural Farming"}
                  </h3>
                  <p style={css("color:#414846;font-size:14.5px;line-height:1.7;margin:0 0 16px;")}>
                    {"We follow 100% natural agriculture practice, without any chemicals — sustaining every element within the ecosystem."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;")}>
                    {"How we develop land →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/nakshatra-vanam" style={css("text-decoration:none;background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:36px;display:flex;flex-direction:column;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#1A3C34;margin:0 0 12px;")}>
                    {"Nakshatra Vanam"}
                  </h3>
                  <p style={css("color:#414846;font-size:14.5px;line-height:1.7;margin:0 0 16px;")}>
                    {"A sacred forest where trees are planted in alignment with one's birth star, zodiac sign, or ruling planet — connecting humans, nature and the cosmos."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;")}>
                    {"Create your own →"}
                  </span>
                </A>
                <A className="gf-card-lift" href="/vriksh-ayurveda" style={css("text-decoration:none;background:#FCF9F4;border:1px solid #e5e2dd;border-radius:18px;padding:36px;display:flex;flex-direction:column;")}>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#1A3C34;margin:0 0 12px;")}>
                    {"Vriksh Ayurveda"}
                  </h3>
                  <p style={css("color:#414846;font-size:14.5px;line-height:1.7;margin:0 0 16px;")}>
                    {"Rooted in ancient wisdom, offering holistic techniques for the health and care of trees and plants through natural Ayurvedic methods."}
                  </p>
                  <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;")}>
                    {"The science behind it →"}
                  </span>
                </A>
              </div>
            </div>
          </section>
          <section id="services" style={css("max-width:1440px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px) clamp(29px,5vw,60px);")}>
            <div style={css("display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:44px;flex-wrap:wrap;gap:16px;")}>
              <div>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                  {"What We Do"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#1A3C34;margin:14px 0 0;")}>
                  {"Four Services, One Living Farm"}
                </h2>
              </div>
              <A href="/services" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"Compare All Services →"}
              </A>
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px;")}>
              {($v.services || []).map((s, sIndex) => (
                <Fragment key={sIndex}>
                  <A className="gf-card-lift" href={s.href} style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;")}>
                    <div style={css("position:relative;aspect-ratio:16/10;overflow:hidden;")}>
                      <div role="img" aria-label={s.name} style={css(`position:absolute;inset:0;background-image:url('${s.hero}');background-size:cover;background-position:center;`)} />
                      <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.88),rgba(26,60,52,0.05) 65%);")} />
                      <span style={css("position:absolute;top:12px;left:12px;background:rgba(250,250,249,0.92);color:#1A3C34;font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.06em;padding:5px 10px;border-radius:999px;")}>
                        {s.code}
                      </span>
                      <div style={css("position:absolute;left:18px;right:18px;bottom:14px;")}>
                        {(s.brand) ? (
                          <>
                          <span style={css("color:#e9c176;font-family:'Source Serif 4',serif;font-size:13px;font-weight:700;display:block;")}>
                            {s.brand}
                          </span>
                          </>
                        ) : null}
                        <h3 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#FAFAF9;margin:2px 0 0;line-height:1.25;")}>
                          {s.name}
                        </h3>
                      </div>
                    </div>
                    <div style={css("padding:20px 22px 24px;display:flex;flex-direction:column;gap:12px;flex:1;")}>
                      <p style={css("color:#414846;font-size:13.5px;line-height:1.65;margin:0;")}>
                        {s.short}
                      </p>
                      <span style={css("margin-top:auto;color:#1A3C34;font-weight:700;font-size:13.5px;")}>
                        {"Explore service →"}
                      </span>
                    </div>
                  </A>
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px);")}>
            <div style={css("display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:48px;flex-wrap:wrap;gap:16px;")}>
              <div>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                  {"Initiatives"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#1A3C34;margin:14px 0 0;")}>
                  {"Featured Projects"}
                </h2>
              </div>
              <A href="/farmland-development" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;")}>
                {"View All Projects →"}
              </A>
            </div>
            <div className="gf-2col gf-swipe gf-swipe-wide" style={css("display:grid;grid-template-columns:1.6fr 1fr;gap:24px;")}>
              <A href="/farmland-development" style={css("position:relative;border-radius:24px;overflow:hidden;text-decoration:none;height:420px;display:block;")}>
                <img src="/assets/aerial-farmland.png" alt="Farmland Development project" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.1) 60%);")} />
                <div style={css("position:absolute;inset:0;padding:40px;display:flex;flex-direction:column;justify-content:flex-end;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;margin-bottom:10px;")}>
                    {"Agricultural Tech"}
                  </span>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:26px;color:#FAFAF9;margin:0;")}>
                    {"Farmland Development"}
                  </h3>
                </div>
              </A>
              <A href="/nakshatra-vanam" style={css("position:relative;border-radius:24px;overflow:hidden;text-decoration:none;height:420px;display:block;")}>
                <img src="/assets/nakshatra-vanam-aerial.png" alt="Nakshatra Vanam grove laid out in concentric planting rings" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.1) 60%);")} />
                <div style={css("position:absolute;inset:0;padding:32px;display:flex;flex-direction:column;justify-content:flex-end;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;margin-bottom:10px;")}>
                    {"Heritage"}
                  </span>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:22px;color:#FAFAF9;margin:0;")}>
                    {"Nakshatra Vanam"}
                  </h3>
                </div>
              </A>
            </div>
            <div className="gf-swipe gf-swipe-wide" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:24px;margin-top:24px;")}>
              <A href="/sainya-krishi" style={css("position:relative;border-radius:24px;overflow:hidden;text-decoration:none;height:260px;display:block;")}>
                <img src="/assets/papaya-farm-video-still.png" alt="Sainya Krishi ex-servicemen programme" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.1) 60%);")} />
                <div style={css("position:absolute;inset:0;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;margin-bottom:8px;")}>
                    {"Social Impact"}
                  </span>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#FAFAF9;margin:0;")}>
                    {"Sainya Krishi"}
                  </h3>
                </div>
              </A>
              <A href="/corporate-esg" style={css("position:relative;border-radius:24px;overflow:hidden;text-decoration:none;height:260px;display:block;")}>
                <img src="/assets/banner-circular-economy.png" alt="Corporate ESG restoration programme" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.1) 60%);")} />
                <span style={css("position:absolute;top:20px;left:20px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#1A3C34;background:#e9c176;border-radius:999px;padding:6px 13px;font-weight:700;")}>
                  {"Launching Shortly"}
                </span>
                <div style={css("position:absolute;inset:0;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;margin-bottom:8px;")}>
                    {"Enterprise"}
                  </span>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#FAFAF9;margin:0;")}>
                    {"Corporate ESG Projects"}
                  </h3>
                </div>
              </A>
              <A href="/medicinal-plants-trees" style={css("position:relative;border-radius:24px;overflow:hidden;text-decoration:none;height:260px;display:block;")}>
                <img src="/assets/trees/arjuna-tree.jpg" alt="Medicinal trees cultivated by Gratitude Farms" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
                <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.1) 60%);")} />
                <span style={css("position:absolute;top:20px;left:20px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.08em;text-transform:uppercase;color:#1A3C34;background:#e9c176;border-radius:999px;padding:6px 13px;font-weight:700;")}>
                  {"Launching Shortly"}
                </span>
                <div style={css("position:absolute;inset:0;padding:28px;display:flex;flex-direction:column;justify-content:flex-end;")}>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#e9c176;text-transform:uppercase;margin-bottom:8px;")}>
                    {"Catalogue"}
                  </span>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:21px;color:#FAFAF9;margin:0;")}>
                    {"Medicinal Plants & Trees"}
                  </h3>
                </div>
              </A>
            </div>
          </section>
          <section style={css("background:#1A3C34;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px);position:relative;overflow:hidden;")}>
            <div className="gf-2col" style={css("max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;")}>
              <div>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
                  {"Social Impact"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,38px);color:#FAFAF9;margin:16px 0 22px;")}>
                  {"Empowering the Defenders of the Nation"}
                </h2>
                <p style={css("color:#c5eadf;font-size:16px;line-height:1.7;margin:0 0 32px;")}>
                  {"We train and transition Ex-Servicemen into rural agritech entrepreneurs, applying military discipline to precision farming and sustainable enterprise leadership."}
                </p>
                <div style={css("display:flex;gap:14px;flex-wrap:wrap;")}>
                  <A href="/sainya-krishi" style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:14px;padding:15px 28px;border-radius:12px;")}>
                    {"Explore Sainya Krishi →"}
                  </A>
                  <A href="/contact?service=Sainya%20Krishi" style={css("text-decoration:none;background:transparent;border:1px solid rgba(250,250,249,0.45);color:#FAFAF9;font-weight:700;font-size:14px;padding:15px 28px;border-radius:12px;")}>
                    {"I'm an Ex-Serviceman"}
                  </A>
                </div>
              </div>
              <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);aspect-ratio:16/9;background:#000;")}>
                <iframe src="https://www.youtube-nocookie.com/embed/videoseries?list=UU61AuTlj_15ZXKLPCQF-F2w" title="Gratitude Farms field footage" style={css("width:100%;height:100%;border:0;display:block;")} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
              </div>
            </div>
          </section>
          {($v.hasPosts) ? (
            <>
            <section style={css("max-width:1440px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px) 0;")}>
              <div style={css("display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:40px;flex-wrap:wrap;gap:16px;")}>
                <div>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                    {"Field Notes"}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#1A3C34;margin:14px 0 0;")}>
                    {"From the Journal"}
                  </h2>
                </div>
                <A href="/blog" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                  {"Read the Journal →"}
                </A>
              </div>
              <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,280px),1fr));gap:24px;")}>
                {($v.posts || []).map((p, pIndex) => (
                  <Fragment key={pIndex}>
                    <A className="gf-card-lift" href={p.href} style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;")}>
                      <div role="img" aria-label={p.title} style={css(`aspect-ratio:16/10;background-image:url('${p.hero}');background-size:cover;background-position:center;`)} />
                      <div style={css("padding:22px;display:flex;flex-direction:column;gap:9px;flex:1;")}>
                        <span style={css("font-family:'JetBrains Mono',monospace;font-size:10.5px;letter-spacing:0.1em;color:#2D5A27;text-transform:uppercase;")}>
                          {p.category}
                        </span>
                        <h3 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;margin:0;line-height:1.28;")}>
                          {p.title}
                        </h3>
                        <span style={css("color:#717976;font-size:12px;margin-top:auto;padding-top:8px;")}>
                          {p.dateDisplay}{" · "}{p.readTime}
                        </span>
                      </div>
                    </A>
                  </Fragment>
                ))}
              </div>
            </section>
            </>
          ) : null}
          <section style={css("max-width:1200px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px);text-align:center;")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
              {"Join Our Mission"}
            </h2>
            <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:640px;margin:0 auto 36px;")}>
              {"Whether you are an investor seeking sustainable ESG opportunities, a landowner seeking restoration, or a partner in our vision — we welcome you to the Gratitude family."}
            </p>
            <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
              <A href="/contact" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                {"Partner With Us"}
              </A>
              <A href="/corporate-esg" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                {"Corporate ESG Program"}
              </A>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Home;
