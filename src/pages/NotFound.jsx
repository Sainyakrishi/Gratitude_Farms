import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function NotFound() {
  return (
    <>
      <Seo
        title="Page Not Found | Gratitude Farms"
        description="The page you were looking for is not here. Browse our services, programmes and journal instead."
      />
      <SiteNav />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("max-width:760px;margin:0 auto;padding:clamp(72px,14vw,160px) clamp(20px,5.5vw,80px);text-align:center;")}>
          <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.14em;color:#C5A059;text-transform:uppercase;")}>
            Error 404
          </span>
          <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,52px);color:#1A3C34;margin:18px 0 20px;line-height:1.1;")}>
            This path leads nowhere
          </h1>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.7;margin:0 auto 36px;max-width:520px;")}>
            The page you asked for has been moved or never existed. The land, the trees
            and the rest of the site are all still here.
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
            <A href="/" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              Back to Home
            </A>
            <A href="/services" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              Browse Services
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
