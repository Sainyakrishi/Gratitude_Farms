import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SainyaKrishi(props) {
  return (
    <>
      <Seo title={"Sainya Krishi — Ex-Servicemen as Natural Farming Entrepreneurs | Gratitude Farms"} description={"Sainya Krishi - empowering ex-servicemen to lead India's natural farming revolution."} />
      <SiteNav active="sainya" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("position:relative;height:64vh;min-height:460px;display:flex;align-items:flex-end;overflow:hidden;")}>
          <img src="/assets/papaya-farm-video-still.png" alt="Gratitude Farms field footage" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
          <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.35));")} />
          <div style={css("position:relative;z-index:2;max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(29px,5.3vw,64px);width:100%;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
              {"Social Impact"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,56px);color:#FAFAF9;margin:16px 0 0;max-width:760px;")}>
              {"Sainya Krishi"}
            </h1>
            <p style={css("color:#e5e2dd;font-size:17px;max-width:600px;margin:18px 0 0;")}>
              {"Empowering Ex-Servicemen to lead the agricultural revolution — transitioning military discipline into precision farming and sustainable enterprise leadership."}
            </p>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:repeat(2,1fr);gap:24px;")}>
          <div>
            <div style={css("font-family:'Source Serif 4',serif;font-size:52px;color:#C5A059;")}>
              {"50+"}
            </div>
            <div style={css("font-size:14px;color:#414846;margin-top:8px;")}>
              {"Ex-Servicemen Trained as Agri-Entrepreneurs"}
            </div>
          </div>
          <div>
            <div style={css("font-family:'Source Serif 4',serif;font-size:52px;color:#2D5A27;")}>
              {"120"}
            </div>
            <div style={css("font-size:14px;color:#414846;margin-top:8px;")}>
              {"Acres Restored Under Sainya Krishi"}
            </div>
          </div>
        </section>
        <section style={css("background:#F0EDE8;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div className="gf-2col" style={css("max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                {"The Program"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:16px 0 20px;")}>
                {"From Uniform to Ownership"}
              </h2>
              <p style={css("color:#414846;font-size:16px;line-height:1.75;margin:0 0 16px;")}>
                {"Sainya Krishi trains retired and transitioning servicemen in natural precision farming and farm-management technology — equipping them to run their own high-yield agricultural enterprises."}
              </p>
              <p style={css("color:#414846;font-size:16px;line-height:1.75;margin:0;")}>
                {"Their inherent discipline, leadership, and resilience make them ideal stewards for large-scale ecological restoration projects across India."}
              </p>
            </div>
            <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
              <img src="/assets/farm-land-preparation.png" alt="Land being prepared by tractor ahead of planting" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
          </div>
        </section>
        <section style={css("max-width:900px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);text-align:center;")}>
          <p style={css("font-family:'Source Serif 4',serif;font-style:italic;font-size:24px;color:#1A3C34;line-height:1.5;margin:0;")}>
            {"\"Farming is another form of serving the nation. We protect the borders, now we protect the soil.\""}
          </p>
        </section>
        <section style={css("max-width:1200px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);text-align:center;")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
            {"Are You an Ex-Serviceman?"}
          </h2>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:600px;margin:0 auto 36px;")}>
            {"Join the Sainya Krishi program and build your own natural farming enterprise."}
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
            <A href="/contact?service=Sainya%20Krishi%20(I'm%20an%20Ex-Serviceman)" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Apply Now"}
            </A>
            <A href="/blog/sainya-krishi-ex-servicemen-entrepreneurs" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Read the Full Story"}
            </A>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0 0 28px;")}>
            {"Where Sainya Krishi Fits"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px;")}>
            <A className="gf-card-lift" href="/about-us" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Our Story & Mission"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Why two ex-Army officers and two technologists started this in 2018."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/farmland-operate" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Operate · Sanjeevani™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The service our trained ex-servicemen teams deliver on client land."}
              </span>
            </A>
            <A className="gf-card-lift" href="/corporate-esg" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Corporate ESG Projects"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Fund ex-servicemen livelihoods as part of your CSR programme."}
              </span>
            </A>
            <A className="gf-card-lift" href="/our-team" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"The People Behind It"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Board, advisors and the leadership running the programme."}
              </span>
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
