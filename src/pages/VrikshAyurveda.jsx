import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function VrikshAyurveda(props) {
  return (
    <>
      <Seo title={"Vriksh Ayurveda — Ancient Plant Care Science | Gratitude Farms"} description={"About Vriksh Ayurveda - ancient plant-care wisdom applied by Gratitude Farms."} />
      <SiteNav active="medicinal" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("max-width:1000px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;text-align:center;")}>
          <img src="/assets/vriksh-ayurveda-icon.png" alt="Vriksh Ayurveda icon" style={css("width:88px;height:88px;object-fit:contain;margin:0 auto 24px;display:block;")} />
          <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
            {"Medicinal Plants & Trees"}
          </span>
          <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,50px);color:#1A3C34;margin:20px 0 22px;")}>
            {"About Vriksh Ayurveda"}
          </h1>
          <p style={css("color:#414846;font-size:17px;line-height:1.8;margin:0;")}>
            {"Vriksh Ayurveda, rooted in ancient wisdom, offers holistic techniques for the health and care of trees and plants — promoting vitality and balance through natural methods from Ayurveda."}
          </p>
        </section>
        <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
          <div style={css("background:#FAFAF9;border-radius:24px;padding:32px;border:1px solid #e5e2dd;display:flex;align-items:center;justify-content:center;")}>
            <img src="/assets/tree-roots-icon.png" alt="Tree and root system illustration" style={css("width:100%;max-width:380px;")} />
          </div>
          <div>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,30px);color:#1A3C34;margin:0 0 20px;")}>
              {"A Living Science"}
            </h2>
            <p style={css("color:#414846;font-size:16px;line-height:1.75;margin:0 0 16px;")}>
              {"Just as Ayurveda treats the human body holistically, Vriksh Ayurveda treats every plant as a living system — diagnosing soil, water and sunlight balance to restore vitality without chemical intervention."}
            </p>
            <p style={css("color:#414846;font-size:16px;line-height:1.75;margin:0;")}>
              {"This ancient science guides every medicinal plant and tree we cultivate, ensuring maximum potency and purity for wellness and longevity."}
            </p>
          </div>
        </section>
        <section style={css("background:#F0EDE8;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px);")}>
          <div className="gf-swipe" style={css("max-width:1440px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;")}>
            <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Soil Regeneration"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Cultivation methods that actively restore soil biodiversity and carbon levels."}
              </p>
            </div>
            <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Natural Bio-Enhancers"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Ancient horticultural formulations replace synthetic fertilizers and pesticides."}
              </p>
            </div>
            <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
              <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 10px;")}>
                {"Clinical Grade Purity"}
              </h4>
              <p style={css("color:#414846;font-size:14px;line-height:1.65;margin:0;")}>
                {"Every harvest is tested for heavy metals and pesticides for therapeutic safety."}
              </p>
            </div>
          </div>
        </section>
        <section style={css("max-width:1200px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);text-align:center;")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
            {"Explore Our Medicinal Program"}
          </h2>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:600px;margin:0 auto 36px;")}>
            {"See the species we raise under these principles, or apply them to your own land."}
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
            <A href="/medicinal-plants-trees#catalogue" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Browse the Species Catalogue"}
            </A>
            <A href="/contact?service=Medicinal%20Plants%20%26%20Produce" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Enquire Now"}
            </A>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0 0 28px;")}>
            {"Vriksh Ayurveda In Practice"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px;")}>
            <A className="gf-card-lift" href="/nakshatra-vanam" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Personal Nakshatra Vanam"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Where these principles guide tree selection, water flow and Vastu layout."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/farmland-design" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Design · Vasudha™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Master planning that puts every square foot to intentional use."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/soil-fertility" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Soil Fertility · BhuPrana™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The living soil these plants need before a single sapling goes in."}
              </span>
            </A>
            <A className="gf-card-lift" href="/blog/what-makes-natural-farming-truly-natural" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"What Makes Natural Farming Natural?"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The four core principles, from our Journal."}
              </span>
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
