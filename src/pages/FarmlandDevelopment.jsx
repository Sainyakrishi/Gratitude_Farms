import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const STAGES = [
  {
    img: '/assets/contour-survey.jpg',
    alt: 'Contour survey overlaid on an aerial photograph of the parcel',
    step: 'Stage 01',
    title: 'Survey the Contours',
    body: 'The land is mapped to its levels before anything is moved, so water and planting follow the ground rather than fight it.'
  },
  {
    img: '/assets/land-earthworks.jpg',
    alt: 'Excavator cutting a swale into red earth across the parcel',
    step: 'Stage 02',
    title: 'Shape and Prepare',
    body: 'Swales, bunds and ponds are cut to the survey, then top-soil is built up with biochar and compost.'
  },
  {
    img: '/assets/farm-lush-growth.jpg',
    alt: 'Dense green crop growth covering the same land after establishment',
    step: 'Stage 03',
    title: 'Plant and Establish',
    body: 'Multi-layer planting goes in and thickens season on season, until the ground is fully covered and self-shading.'
  }
];

export default function FarmlandDevelopment(props) {
  const $v = { stages: STAGES };
  return (
    <>
      <Seo title={"Farmland Development Projects — Barren Land to Living Farm | Gratitude Farms"} description={"Farmland Development Projects - turnkey natural farming ecosystem development by Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("position:relative;height:60vh;min-height:440px;display:flex;align-items:flex-end;overflow:hidden;")}>
          <img src="/assets/aerial-farmland.png" alt="Aerial view of a Gratitude Farms farmland development project" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
          <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.25));")} />
          <div style={css("position:relative;z-index:2;max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(29px,5.3vw,64px);width:100%;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
              {"Our Program"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,56px);color:#FAFAF9;margin:16px 0 0;max-width:760px;")}>
              {"Farmland Development Projects"}
            </h1>
          </div>
        </section>
        <section style={css("max-width:900px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;")}>
          <p style={css("color:#1c1c19;font-size:18px;line-height:1.85;margin:0;")}>
            {"Gratitude Farms undertakes transformative farmland development projects where barren and unused lands, previously unfit for cultivation, are converted into fertile, carbon-rich, and microbially active ecosystems. These projects generally take 6 to 12 months, during which the soil's carbon content is increased from below 0.5% to over 3%."}
          </p>
        </section>
        <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
          <div>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
              {"Soil Regeneration"}
            </span>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
              {"Ancestral Techniques, Modern Discipline"}
            </h2>
            <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0;")}>
              {"This is achieved through the application of traditional Indian agricultural methods passed down through generations — Navadhanya (the practice of sowing nine different types of seeds), the creation of Amrit Mitti beds (a nutrient-rich soil mixture), and the extensive use of locally produced biochar, made on the farm, to improve soil fertility and microbial richness. To enhance the microbial content further, inputs such as Jeevamritham, Panchagavya, and a variety of cow-derived products like cow dung and cow urine are used, integrated with composting and bacteria that enrich both macro and micronutrients — leading to a naturally fertile and biodiverse farming practice."}
            </p>
          </div>
          <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
            <img src="/assets/polyhouse-greens.jpg" alt="Rows of leafy greens growing under shade netting in a Gratitude Farms polyhouse" style={css("width:100%;display:block;object-fit:cover;")} />
          </div>
        </section>
        <section style={css("background:#1A3C34;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div className="gf-2col" style={css("max-width:1440px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div style={css("border-radius:20px;overflow:hidden;order:2;")}>
              <img src="/assets/farm-ponds-aerial.png" alt="Aerial view of a developed farm with rainwater harvesting ponds set into the layout" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
            <div style={css("order:1;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
                {"Water Conservation"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#FAFAF9;margin:16px 0 20px;")}>
                {"Built to Withstand Drought"}
              </h2>
              <p style={css("color:#c5eadf;font-size:16px;line-height:1.8;margin:0;")}>
                {"A critical component of these farmland development projects is water conservation. Gratitude Farms incorporates a well-designed rainwater harvesting mechanism as an integral part of the development process, meticulously planned to align with the topography and layout of the land, capturing and storing rainwater for use during drier periods. This approach conserves water while supporting the overall health and productivity of the soil, creating a resilient agricultural environment that can thrive even under challenging climatic conditions."}
              </p>
            </div>
          </div>
        </section>
        <section style={css("max-width:900px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px) clamp(27px,5.0vw,60px);")}>
          <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
            {"Design Philosophy"}
          </span>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
            {"Designed Per Square Foot"}
          </h2>
          <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0 0 20px;")}>
            {"Gratitude Farms approaches land development with meticulous attention to detail, designing the farmland per square foot, even when dealing with large tracts spanning tens of acres. The philosophy: ensure no part of the land is wasted once the soil has been enriched and revitalized. The design process breaks the land into smaller blocks, which are then developed and replicated across the entire plot — standardizing design and simplifying unit economics, so crops, water flow, and other resources are utilized in the most effective way possible."}
          </p>
          <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0;")}>
            {"Gratitude Farms adopts a multi-cropping practice within these carefully designed blocks — planting a diverse combination of medicinal plants, trees, fruit trees, and flowers within each unit block, replicated across the entire farm. In every acre of land, around "}
            <strong style={css("color:#1A3C34;")}>
              {"5,000 medicinal plants, 200 medicinal trees, and 1,000 flowers and other plants"}
            </strong>
            {" are cultivated. The selection of medicinal trees is rooted in the ancient practice of Nakshatra Vanam, where specific trees are planted based on their astrological significance, while the principles of Vriksh Ayurveda guide water flow, routes, and Vastu components — blending ancient practices with modern sustainable farming to foster a deep connection with the natural world."}
          </p>
        </section>
        <section style={css("background:#F0EDE8;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div style={css("max-width:1440px;margin:0 auto;")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,36px);color:#1A3C34;margin:0 0 12px;")}>
              {"Development Roadmap"}
            </h2>
            <p style={css("color:#414846;font-size:16px;max-width:600px;margin:0 0 48px;")}>
              {"A structured, disciplined approach to establishing resilient agricultural ecosystems."}
            </p>
            <div style={css("border-radius:20px;overflow:hidden;background:#FAFAF9;border:1px solid #e5e2dd;padding:20px;margin-bottom:40px;")}>
              <img src="/assets/gratitude-model-roadmap.png" alt="Farmland development roadmap illustration" style={css("width:100%;display:block;")} />
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:24px;")}>
              <div style={css("border-left:2px solid #C5A059;padding-left:18px;")}>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;color:#C5A059;margin-bottom:6px;")}>
                  {"PHASE 01"}
                </div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 4px;")}>
                  {"Land Assessment"}
                </h4>
                <p style={css("color:#414846;font-size:13.5px;margin:0;")}>
                  {"Soil profiling & topographical surveys."}
                </p>
              </div>
              <div style={css("border-left:2px solid #c1c8c4;padding-left:18px;")}>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;color:#3C4A3E;margin-bottom:6px;")}>
                  {"PHASE 02"}
                </div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 4px;")}>
                  {"Infrastructure"}
                </h4>
                <p style={css("color:#414846;font-size:13.5px;margin:0;")}>
                  {"Irrigation, fencing & core facilities."}
                </p>
              </div>
              <div style={css("border-left:2px solid #c1c8c4;padding-left:18px;")}>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;color:#3C4A3E;margin-bottom:6px;")}>
                  {"PHASE 03"}
                </div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 4px;")}>
                  {"Cultivation"}
                </h4>
                <p style={css("color:#414846;font-size:13.5px;margin:0;")}>
                  {"Plantation drives & biodiversity mapping."}
                </p>
              </div>
              <div style={css("border-left:2px solid #c1c8c4;padding-left:18px;")}>
                <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;color:#3C4A3E;margin-bottom:6px;")}>
                  {"PHASE 04"}
                </div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 4px;")}>
                  {"Harvest & Yield"}
                </h4>
                <p style={css("color:#414846;font-size:13.5px;margin:0;")}>
                  {"Market linkage & carbon credit audits."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={css("max-width:1200px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px);text-align:center;")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
            {"Develop Your Land With Us"}
          </h2>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:600px;margin:0 auto 36px;")}>
            {"Own barren or underutilized land? Partner with our ex-servicemen teams to turn it into a thriving, revenue-generating natural farm."}
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
            <A href="/contact?service=Farmland%20Development" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Start a Project"}
            </A>
            <A href="/services/managed-farmland" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"See Commercials & Timelines"}
            </A>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(54px,10vw,120px);")}>
          <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
            {"On the Ground"}
          </span>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:16px 0 12px;")}>
            {"From Barren to Biodiverse"}
          </h2>
          <p style={css("color:#414846;font-size:16px;line-height:1.75;max-width:620px;margin:0 0 36px;")}>
            {"The same parcel, at three points in the process — surveyed to its contours, shaped to hold water, then planted out and left to thicken."}
          </p>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,260px),1fr));gap:20px;")}>
            {($v.stages || []).map((stage, stageIndex) => (
              <div key={stageIndex} style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:18px;overflow:hidden;display:flex;flex-direction:column;")}>
                <img src={stage.img} alt={stage.alt} style={css("width:100%;height:220px;object-fit:cover;display:block;")} />
                <div style={css("padding:22px 24px;")}>
                  <div style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;margin-bottom:8px;")}>
                    {stage.step}
                  </div>
                  <h3 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;margin:0 0 8px;")}>
                    {stage.title}
                  </h3>
                  <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                    {stage.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0 0 28px;")}>
            {"The Services That Deliver This"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px;")}>
            <A className="gf-card-lift" href="/services/soil-fertility" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"S1"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Soil Fertility · BhuPrana™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Raising soil organic carbon from below 0.5% to over 3% with biochar."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/farmland-design" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"S2"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Design · Vasudha™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The per-square-foot master plan behind every block we develop."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/farmland-operate" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"S3"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Operate · Sanjeevani™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Ex-servicemen teams running the farm season after season."}
              </span>
            </A>
            <A className="gf-card-lift" href="/nakshatra-vanam" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.1em;color:#C5A059;text-transform:uppercase;")}>
                {"Add-on"}
              </span>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Nakshatra Vanam"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The astrological tree selection woven into our medicinal plantings."}
              </span>
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
