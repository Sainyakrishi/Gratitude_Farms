import { Component, Fragment } from 'react';
import { A } from '../lib/ui.jsx';
import { css } from '../lib/css.js';

class SiteNav extends Component {

  state = { isMobile: false, mobileOpen: false, openDropdown: null, openSub: null, scrolled: false };

  // The site's page graph lives here. SiteFooter builds its sitemap from the
  // same shape, so a new page only has to be added in one place.
  navDef = [
    { key: 'home', label: 'Home', href: './' },
    { key: 'about', label: 'About Us', href: '/about-us', children: [
      { label: 'About Gratitude Farms', href: '/about-us' },
      { label: 'Our Team', href: '/our-team' }
    ]},
    { key: 'program', label: 'Our Services', href: '/services', children: [
      { group: 'Services', label: 'Managed Farmland Service', href: '/services/managed-farmland', audiences: true },
      { group: 'Services', label: 'Soil Fertility (BhuPrana™)', href: '/services/soil-fertility', audiences: true },
      { group: 'Services', label: 'Farmland Design (Vasudha™)', href: '/services/farmland-design', audiences: true },
      { group: 'Services', label: 'Farmland Operate (Sanjeevani™)', href: '/services/farmland-operate', audiences: true },
      { group: 'Programs', label: 'Farmland Development Projects', href: '/farmland-development' },
      { group: 'Programs', label: 'Personal Nakshatra Vanam', href: '/nakshatra-vanam' },
      { group: 'Programs', label: 'Corporate ESG Projects', href: '/corporate-esg' }
    ]},
    { key: 'sainya', label: 'Sainya Krishi', href: '/sainya-krishi' },
    { key: 'medicinal', label: 'Medicinal Plants & Trees', href: '/medicinal-plants-trees', children: [
      { label: 'Medicinal Plants & Trees', href: '/medicinal-plants-trees' },
      { label: 'About Vriksh Ayurveda', href: '/vriksh-ayurveda' }
    ]},
    { key: 'blog', label: 'Blogs', href: '/blog' },
    { key: 'contact', label: 'Contact', href: '/contact' }
  ];

  audienceDefs = [
    ['individuals', 'Individuals / NRIs'],
    ['corporates', 'Corporates & PSUs'],
    ['fpos', 'FPOs / Village Orgs'],
    ['small', 'Small Landholders'],
    ['marginal', 'Small & Marginal Holders']
  ];

  componentDidMount() {
    this.mq = window.matchMedia('(max-width: 980px)');
    // Named handler, so componentWillUnmount can actually detach it.
    this.onMq = () => this.setState({ isMobile: this.mq.matches, mobileOpen: false, openDropdown: null, openSub: null });
    this.onMq();
    this.mq.addEventListener('change', this.onMq);

    this.onScroll = () => {
      const scrolled = window.scrollY > 8;
      if (scrolled !== this.state.scrolled) this.setState({ scrolled });
    };
    window.addEventListener('scroll', this.onScroll, { passive: true });
  }

  componentWillUnmount() {
    if (this.mq && this.onMq) this.mq.removeEventListener('change', this.onMq);
    if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
    document.body.style.overflow = '';
  }

  setMobileOpen(open) {
    this.setState({ mobileOpen: open, openDropdown: open ? this.state.openDropdown : null });
    // Stop the page behind the drawer from scrolling with it.
    document.body.style.overflow = open ? 'hidden' : '';
  }

  renderVals() {
    const active = this.props.active ?? '';
    const isMobile = this.state.isMobile;

    const navItems = this.navDef.map(item => {
      const kids = item.children || [];
      let lastGroup = null;
      const children = kids.map(child => {
        const groupLabel = child.group && child.group !== lastGroup ? child.group : '';
        lastGroup = child.group || lastGroup;
        const hasAudiences = !!child.audiences;
        return {
          label: child.label,
          href: child.href,
          groupLabel,
          hasAudiences,
          audiences: hasAudiences
            ? this.audienceDefs.map(([k, l]) => ({ label: l, href: `${child.href}?audience=${k}` }))
            : [],
          isOpen: !isMobile && this.state.openSub === child.href,
          linkColor: this.state.openSub === child.href ? '#C5A059' : '#1A3C34',
          linkBg: this.state.openSub === child.href ? '#F5F2ED' : 'transparent',
          onEnter: () => hasAudiences && !isMobile && this.setState({ openSub: child.href }),
          onLeave: () => {}
        };
      });

      const isOpen = this.state.openDropdown === item.key;
      return {
        key: item.key,
        label: item.label,
        href: item.href,
        children,
        hasChildren: kids.length > 0,
        isOpen,
        ariaExpanded: kids.length ? String(isOpen) : undefined,
        mobileIcon: isOpen ? '▲' : '▼',
        color: active === item.key ? '#C5A059' : '#1A3C34',
        borderColor: active === item.key ? '#C5A059' : 'transparent',
        onEnter: () => kids.length && !isMobile && this.setState({ openDropdown: item.key }),
        onLeave: () => kids.length && !isMobile && this.setState({ openDropdown: null, openSub: null }),
        // Keyboard users tab through the menu; close it only once focus has
        // genuinely left the item, not while moving between its own links.
        onBlur: (e) => {
          if (isMobile) return;
          const next = e.relatedTarget;
          if (next && e.currentTarget.contains(next)) return;
          this.setState({ openDropdown: null, openSub: null });
        },
        onToggleMobile: () => this.setState(s => ({
          openDropdown: s.openDropdown === item.key ? null : item.key
        }))
      };
    });

    return {
      navItems,
      isMobile,
      mobileOpen: this.state.mobileOpen,
      mobileExpanded: String(this.state.mobileOpen),
      menuLabel: this.state.mobileOpen ? 'Close menu' : 'Open menu',
      navClass: this.state.scrolled ? 'gf-nav-scrolled' : '',
      logoSize: isMobile ? '40px' : '52px',
      titleSize: isMobile ? '19px' : '24px',
      toggleMobile: () => this.setMobileOpen(!this.state.mobileOpen),
      closeMobile: () => this.setMobileOpen(false),
      onEscape: (e) => { if (e.key === 'Escape') this.setState({ openDropdown: null, openSub: null }); }
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
        <nav className={$v.navClass} style={css("position:fixed;top:0;left:0;right:0;z-index:100;background:rgba(252,249,244,0.92);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px);border-bottom:1px solid #e5e2dd;font-family:'Hanken Grotesk',sans-serif;")}>
          <div style={css("max-width:1440px;margin:0 auto;padding:14px clamp(20px,5.5vw,80px);display:flex;align-items:center;justify-content:space-between;gap:24px;")}>
            <A href="/" aria-label="Gratitude Farms home" style={css("display:flex;align-items:center;gap:10px;text-decoration:none;flex-shrink:0;")}>
              <img src="/assets/logo-badge.png" alt="" style={css(`width:${$v.logoSize};height:${$v.logoSize};object-fit:contain;`)} />
              <span style={css(`font-family:'Source Serif 4',serif;font-size:${$v.titleSize};font-weight:700;color:#1A3C34;letter-spacing:-0.01em;white-space:nowrap;`)}>
                {"Gratitude Farms"}
              </span>
            </A>
            {(!$v.isMobile) ? (
              <>
              <div style={css("display:flex;align-items:center;gap:clamp(16px,2vw,32px);")}>
                {($v.navItems || []).map((item, itemIndex) => (
                  <Fragment key={itemIndex}>
                    <div style={css("position:relative;")} onMouseEnter={item.onEnter} onMouseLeave={item.onLeave} onBlur={item.onBlur} onKeyDown={$v.onEscape}>
                      <A href={item.href} aria-expanded={item.ariaExpanded} onFocus={item.onEnter} style={css(`text-decoration:none;font-size:14px;font-weight:600;letter-spacing:0.02em;color:${item.color};padding-bottom:4px;border-bottom:2px solid ${item.borderColor};white-space:nowrap;display:inline-flex;align-items:center;gap:6px;`)}>
                        {item.label}
                        {(item.hasChildren) ? (
                          <>
                          <span aria-hidden="true" style={css("font-size:9px;opacity:0.65;")}>
                            {"▼"}
                          </span>
                          </>
                        ) : null}
                      </A>
                      {(item.isOpen) ? (
                        <>
                        <div style={css("position:absolute;top:100%;left:0;padding-top:14px;")}>
                          <div className="gf-nav-panel" style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:12px;box-shadow:0 12px 40px rgba(26,60,52,0.14);padding:10px;min-width:300px;display:flex;flex-direction:column;")}>
                            {(item.children || []).map((child, childIndex) => (
                              <Fragment key={childIndex}>
                                <div style={css("position:relative;")} onMouseEnter={child.onEnter} onMouseLeave={child.onLeave}>
                                  {(child.groupLabel) ? (
                                    <>
                                    <span style={css("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#717976;text-transform:uppercase;padding:12px 14px 6px;display:block;")}>
                                      {child.groupLabel}
                                    </span>
                                    </>
                                  ) : null}
                                  <A href={child.href} onFocus={child.onEnter} style={css(`text-decoration:none;color:${child.linkColor};font-size:13.5px;font-weight:500;padding:11px 14px;border-radius:8px;display:flex;align-items:center;justify-content:space-between;gap:12px;background:${child.linkBg};`)} hoverStyle={css("background:#F5F2ED;color:#C5A059;")}>
                                    {child.label}
                                    {(child.hasAudiences) ? (
                                      <>
                                      <span aria-hidden="true" style={css("color:#C5A059;font-size:16px;line-height:1;")}>
                                        {"›"}
                                      </span>
                                      </>
                                    ) : null}
                                  </A>
                                  {(child.isOpen) ? (
                                    <>
                                    <div style={css("position:absolute;top:-10px;left:100%;padding-left:8px;z-index:5;")}>
                                      <div className="gf-nav-panel" style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:12px;box-shadow:0 12px 40px rgba(26,60,52,0.15);padding:10px;min-width:250px;display:flex;flex-direction:column;")}>
                                        <span style={css("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#717976;text-transform:uppercase;padding:6px 14px 8px;")}>
                                          {"By Target Audience"}
                                        </span>
                                        {(child.audiences || []).map((aud, audIndex) => (
                                          <Fragment key={audIndex}>
                                            <A href={aud.href} style={css("text-decoration:none;color:#1A3C34;font-size:13px;font-weight:500;padding:10px 14px;border-radius:8px;")} hoverStyle={css("background:#F5F2ED;color:#C5A059;")}>
                                              {aud.label}
                                            </A>
                                          </Fragment>
                                        ))}
                                      </div>
                                    </div>
                                    </>
                                  ) : null}
                                </div>
                              </Fragment>
                            ))}
                          </div>
                        </div>
                        </>
                      ) : null}
                    </div>
                  </Fragment>
                ))}
              </div>
              <A href="/contact" style={css("text-decoration:none;font-size:13px;font-weight:700;letter-spacing:0.04em;color:#fff;background:#1A3C34;padding:13px 26px;border-radius:10px;flex-shrink:0;white-space:nowrap;")} hoverStyle={css("background:#C5A059;color:#1A3C34;")}>
                {"Enquire Now"}
              </A>
              </>
            ) : null}
            {($v.isMobile) ? (
              <>
              <button onClick={$v.toggleMobile} aria-label={$v.menuLabel} aria-expanded={$v.mobileExpanded} style={css("background:none;border:none;color:#1A3C34;cursor:pointer;padding:6px;display:flex;")}>
                {(!$v.mobileOpen) ? (
                  <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                  </svg>
                  </>
                ) : null}
                {($v.mobileOpen) ? (
                  <>
                  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                    <line x1="5" y1="5" x2="19" y2="19" />
                    <line x1="19" y1="5" x2="5" y2="19" />
                  </svg>
                  </>
                ) : null}
              </button>
              </>
            ) : null}
          </div>
          {($v.mobileOpen) ? (
            <>
            <div className="gf-mobile-panel" style={css("background:#FAFAF9;border-top:1px solid #e5e2dd;padding:8px 20px 28px;display:flex;flex-direction:column;")}>
              {($v.navItems || []).map((item, itemIndex) => (
                <Fragment key={itemIndex}>
                  <div style={css("display:flex;flex-direction:column;border-bottom:1px solid #ebe8e3;")}>
                    <div style={css("display:flex;align-items:center;justify-content:space-between;gap:8px;")}>
                      <A href={item.href} onClick={$v.closeMobile} style={css(`text-decoration:none;color:${item.color};font-size:16px;font-weight:700;padding:15px 4px;flex:1;`)}>
                        {item.label}
                      </A>
                      {(item.hasChildren) ? (
                        <>
                        <button onClick={item.onToggleMobile} aria-label={`Show ${item.label} links`} aria-expanded={item.ariaExpanded} style={css("background:none;border:none;color:#717976;font-size:13px;cursor:pointer;padding:12px;line-height:1;")}>
                          {item.mobileIcon}
                        </button>
                        </>
                      ) : null}
                    </div>
                    {(item.isOpen) ? (
                      <>
                      <div style={css("display:flex;flex-direction:column;padding-bottom:10px;")}>
                        {(item.children || []).map((child, childIndex) => (
                          <Fragment key={childIndex}>
                            <div style={css("display:flex;flex-direction:column;")}>
                              {(child.groupLabel) ? (
                                <>
                                <span style={css("font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.08em;color:#717976;text-transform:uppercase;padding:12px 4px 4px 16px;")}>
                                  {child.groupLabel}
                                </span>
                                </>
                              ) : null}
                              <A href={child.href} onClick={$v.closeMobile} style={css("text-decoration:none;color:#414846;font-size:14.5px;font-weight:600;padding:9px 4px 9px 16px;")}>
                                {child.label}
                              </A>
                              {(child.audiences || []).map((aud, audIndex) => (
                                <Fragment key={audIndex}>
                                  <A href={aud.href} onClick={$v.closeMobile} style={css("text-decoration:none;color:#717976;font-size:12.5px;font-weight:500;padding:6px 4px 6px 32px;")}>
                                    {aud.label}
                                  </A>
                                </Fragment>
                              ))}
                            </div>
                          </Fragment>
                        ))}
                      </div>
                      </>
                    ) : null}
                  </div>
                </Fragment>
              ))}
              <A href="/contact" onClick={$v.closeMobile} style={css("text-decoration:none;text-align:center;font-size:14px;font-weight:700;color:#fff;background:#1A3C34;padding:15px 26px;border-radius:10px;margin-top:20px;")}>
                {"Enquire Now"}
              </A>
            </div>
            </>
          ) : null}
        </nav>
        <div className="gf-nav-spacer" />
      </>
    );
  }
}

export default SiteNav;
