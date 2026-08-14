import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function CorporateEsg(props) {
  return (
    <>
      <Seo title={"Corporate ESG & CSR Projects — Carbon, Community, Supply Chain | Gratitude Farms"} description={"Corporate ESG Projects - carbon offsetting, community agriculture and sustainable supply chains with Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 40px;")}>
          <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
            {"Our Program · Enterprise Solutions"}
          </span>
          <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,56px);color:#1A3C34;margin:20px 0 22px;max-width:800px;")}>
            {"Corporate ESG Projects"}
          </h1>
          <p style={css("color:#414846;font-size:17px;line-height:1.7;max-width:640px;margin:0;")}>
            {"Partnering with enterprises to fulfill Environmental, Social, and Governance mandates through verifiable carbon offsetting, community agriculture, and sustainable supply chains."}
          </p>
        </section>
        <section className="gf-stat-row" style={css("max-width:1440px;margin:0 auto;padding:40px clamp(20px,5.5vw,80px) clamp(45px,8.3vw,100px);display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;")}>
          <div style={css("background:#F5F2ED;border-radius:16px;padding:32px;text-align:center;")}>
            <div style={css("font-family:'Source Serif 4',serif;font-size:36px;color:#C5A059;")}>
              {"100%"}
            </div>
            <div style={css("font-size:13px;color:#3C4A3E;margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;")}>
              {"Verifiable Impact"}
            </div>
          </div>
          <div style={css("background:#F5F2ED;border-radius:16px;padding:32px;text-align:center;")}>
            <div style={css("font-family:'Source Serif 4',serif;font-size:36px;color:#C5A059;")}>
              {"ISO"}
            </div>
            <div style={css("font-size:13px;color:#3C4A3E;margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;")}>
              {"Compliant Models"}
            </div>
          </div>
          <div style={css("background:#F5F2ED;border-radius:16px;padding:32px;text-align:center;")}>
            <div style={css("font-family:'Source Serif 4',serif;font-size:36px;color:#C5A059;")}>
              {"120"}
            </div>
            <div style={css("font-size:13px;color:#3C4A3E;margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;")}>
              {"Acres Restored"}
            </div>
          </div>
          <div style={css("background:#F5F2ED;border-radius:16px;padding:32px;text-align:center;")}>
            <div style={css("font-family:'Source Serif 4',serif;font-size:36px;color:#C5A059;")}>
              {"50+"}
            </div>
            <div style={css("font-size:13px;color:#3C4A3E;margin-top:6px;text-transform:uppercase;letter-spacing:0.04em;")}>
              {"ESM Trained"}
            </div>
          </div>
        </section>
        <section style={css("background:#1A3C34;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div className="gf-2col" style={css("max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div style={css("border-radius:20px;overflow:hidden;")}>
              <img src="/assets/tree-grove-path.jpeg" alt="Mature tree grove on carbon-credit farmland managed by Gratitude Farms" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
            <div>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
                {"Carbon Credits"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#FAFAF9;margin:16px 0 20px;")}>
                {"Measurable Environmental Returns"}
              </h2>
              <p style={css("color:#c5eadf;font-size:16px;line-height:1.75;margin:0;")}>
                {"Every restored acre sequesters carbon while regenerating soil biodiversity. We provide enterprises with audit-ready carbon offsetting tied to real, on-ground plantation and community agriculture programs."}
              </p>
            </div>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 48px;text-align:center;")}>
            {"What CSR Partners Get"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(260px,1fr));gap:24px;")}>
            <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Verified Carbon Offsetting"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Traceable plantation data tied to your ESG reporting."}
              </p>
            </div>
            <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Community Agriculture"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Livelihood generation for ex-servicemen and rural families."}
              </p>
            </div>
            <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Sustainable Supply Chains"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Organic produce and medicinal plant sourcing at scale."}
              </p>
            </div>
          </div>
        </section>
        <section style={css("max-width:1200px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);text-align:center;")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
            {"Design Your ESG Program"}
          </h2>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:600px;margin:0 auto 36px;")}>
            {"Talk to our team about a tailored corporate sustainability partnership."}
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
            <A href="/contact?service=Corporate%20ESG%20Partnership&audience=Corporates%20%26%20PSUs" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Talk to Our Team"}
            </A>
            <A href="/services/managed-farmland?audience=corporates" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"See the Corporate Service Spec"}
            </A>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0 0 28px;")}>
            {"How We Deliver It"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px;")}>
            <A className="gf-card-lift" href="/services/managed-farmland?audience=corporates" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"S0"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Managed Farmland Services"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"100+ acre programmes with MRV, ESG dashboard and audited annual reporting."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/soil-fertility?audience=corporates" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"S1"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Soil Fertility · BhuPrana™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Biochar carbon locked into the soil, measured under Puro.earth-type methodology."}
              </span>
            </A>
            <A className="gf-card-lift" href="/farmland-development" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"Program"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Development"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The on-ground restoration process, phase by phase."}
              </span>
            </A>
            <A className="gf-card-lift" href="/sainya-krishi" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"Social"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Sainya Krishi"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The livelihood outcome your ESG spend funds — ex-servicemen entrepreneurs."}
              </span>
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
