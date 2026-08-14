import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function NakshatraVanam(props) {
  return (
    <>
      <Seo title={"Personal Nakshatra Vanam — Your Own 1-Acre Micro Forest | Gratitude Farms"} description={"Personal Nakshatra Vanam - create your own micro forest with Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <section style={css("position:relative;height:60vh;min-height:440px;display:flex;align-items:flex-end;overflow:hidden;")}>
          <img src="/assets/nakshatra-vanam-aerial.png" alt="Aerial view of a Nakshatra Vanam grove laid out in concentric planting rings" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
          <div style={css("position:absolute;inset:0;background:linear-gradient(0deg,rgba(26,60,52,0.92),rgba(26,60,52,0.3));")} />
          <div style={css("position:relative;z-index:2;max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(29px,5.3vw,64px);width:100%;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
              {"Our Program · Heritage"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,52px);color:#FAFAF9;margin:16px 0 0;max-width:760px;")}>
              {"Discover Inner Peace with Your Personal Nakshatra Vanam"}
            </h1>
          </div>
        </section>
        <section style={css("max-width:900px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;")}>
          <p style={css("color:#1c1c19;font-size:18px;line-height:1.85;margin:0 0 20px;")}>
            {"In today's fast-paced urban life, success extracts its own price. Many professionals across various fields have achieved significant financial success, yet stress levels are soaring. A common theme among people today is uncertainty about the future, despite advancements in technology and wealth creation. The key missing ingredient? Balance and harmony in life."}
          </p>
          <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0;")}>
            {"At Gratitude Farms, we believe that one of the best ways to address the lack of balance is by connecting with nature. This is where our unique solution comes into play: the Personal Abode for Harmony through a well-designed micro-forest in a space as small as one acre. The deep principles of "}
            <strong style={css("color:#1A3C34;")}>
              {"Vriksh Ayurveda"}
            </strong>
            {" and "}
            <strong style={css("color:#1A3C34;")}>
              {"Nakshatra Vanam"}
            </strong>
            {" are integral to the design."}
          </p>
        </section>
        <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
          <div>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
              {"What is a Nakshatra Vanam?"}
            </span>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
              {"A Living Bond Between You and the Cosmos"}
            </h2>
            <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0 0 16px;")}>
              {"The concept of a Nakshatra Vanam (Nakshatra Forest) is rooted in ancient Indian traditions. It stems from the belief that human beings, trees, and the Earth are deeply interconnected. Nakshatras, or constellations, correspond to both human birth stars and specific trees — a connection identified by Indian sages over 3,000 years ago, forming the basis of our 1-acre personal micro-forest model."}
            </p>
            <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0;")}>
              {"A Nakshatra Vanam consists of trees aligned with your birth star, zodiac sign, or ruling planet, creating a direct link between you, the universe, and nature — fostering spiritual growth, health, harmony, and inner peace."}
            </p>
          </div>
          <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
            <img src="/assets/food-forest-walkway.png" alt="Shaded walkway winding through a Nakshatra Vanam planting" style={css("width:100%;display:block;object-fit:cover;")} />
          </div>
        </section>
        <section style={css("background:#F0EDE8;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div style={css("max-width:1440px;margin:0 auto;")}>
            <div style={css("text-align:center;max-width:720px;margin:0 auto 48px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                {"The Magic of a 1-Acre Micro Forest"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 0;")}>
                {"Key Features"}
              </h2>
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;")}>
              <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
                <div style={css("font-family:'Source Serif 4',serif;font-size:30px;color:#C5A059;margin-bottom:10px;")}>
                  {"120"}
                </div>
                <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                  {"Trees per acre, covering 27 Nakshatras, 12 zodiac signs, and 9 planetary influences."}
                </p>
              </div>
              <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 10px;")}>
                  {"Holistic Ecosystem"}
                </h4>
                <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                  {"Water bodies, flowers, and medicinal plants integrated for a rich ecosystem."}
                </p>
              </div>
              <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 10px;")}>
                  {"Biodiverse Soil"}
                </h4>
                <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                  {"Carbon-rich, biodiverse soil built for the long-term growth of the forest."}
                </p>
              </div>
              <div style={css("background:#FAFAF9;border-radius:16px;padding:32px;")}>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#1A3C34;margin:0 0 10px;")}>
                  {"Optional Retreat"}
                </h4>
                <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                  {"Living spaces in local materials like wood and earth, for a peaceful retreat."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={css("background:#FAFAF9;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div className="gf-2col" style={css("max-width:1200px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:clamp(32px,5vw,64px);align-items:center;")}>
            <div>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
                {"The Layout"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
                {"Every Square Foot Is Designed"}
              </h2>
              <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0;")}>
                {"A Nakshatra Vanam is planted in concentric rings — a shelter belt of tall trees on the outside, fruit and medicinal species through the middle rings, and beds, ponds and a living space at the centre. Nothing is placed at random: each ring earns its position from the sunlight it needs, the shade it casts and the water it holds."}
              </p>
            </div>
            <div style={css("display:flex;flex-direction:column;gap:16px;")}>
              <div style={css("border-radius:20px;overflow:hidden;")}>
                <img src="/assets/nakshatra-vanam-plan.jpg" alt="Plan drawing of a Nakshatra Vanam showing concentric rings of trees, planting beds and ponds around a central living space" style={css("width:100%;display:block;")} />
              </div>
              <div style={css("border-radius:16px;overflow:hidden;")}>
                <img src="/assets/nakshatra-vanam-orchard.jpg" alt="Aerial view of an established orchard planted in long parallel rows" style={css("width:100%;height:180px;object-fit:cover;display:block;")} />
              </div>
            </div>
          </div>
        </section>
        <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
          <div>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
              {"Environmental Impact"}
            </span>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
              {"Planting for Future Generations"}
            </h2>
            <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0 0 16px;")}>
              {"As the world battles climate change and deforestation, planting trees on your own land is a simple yet powerful way to contribute to a healthier planet."}
            </p>
            <ul style={css("color:#414846;font-size:15px;line-height:1.9;margin:0;padding-left:20px;")}>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Carbon Sequestration"}
                </strong>
                {" — trees absorb CO2 and store carbon in their biomass."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Biodiversity"}
                </strong>
                {" — your micro-forest hosts a rich diversity of plant and animal life."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Soil Health"}
                </strong>
                {" — rich microbial activity, water retention, and organic matter return."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Water Conservation"}
                </strong>
                {" — integrated rainwater harvesting systems."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Climate Resilience"}
                </strong>
                {" — a dense, multi-layered forest cools and stabilizes the land."}
              </li>
            </ul>
          </div>
          <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
            <img src="/assets/retreat-hut-grove.png" alt="Dense multi-layered tree canopy shading the ground below" style={css("width:100%;display:block;object-fit:cover;")} />
          </div>
        </section>
        <section style={css("background:#1A3C34;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
          <div style={css("max-width:1440px;margin:0 auto;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
              {"Personal Benefits"}
            </span>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#FAFAF9;margin:16px 0 40px;")}>
              {"Nature as a Healer"}
            </h2>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;")}>
              <div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#e9c176;margin:0 0 10px;")}>
                  {"Mental Peace & Balance"}
                </h4>
                <p style={css("color:#c5eadf;font-size:14px;line-height:1.7;margin:0;")}>
                  {"Walking among trees lowers stress, improves mood, and provides clarity."}
                </p>
              </div>
              <div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#e9c176;margin:0 0 10px;")}>
                  {"Health Benefits"}
                </h4>
                <p style={css("color:#c5eadf;font-size:14px;line-height:1.7;margin:0;")}>
                  {"Proximity to trees helps reduce risk of chronic disease and encourages outdoor activity."}
                </p>
              </div>
              <div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#e9c176;margin:0 0 10px;")}>
                  {"Spiritual Growth"}
                </h4>
                <p style={css("color:#c5eadf;font-size:14px;line-height:1.7;margin:0;")}>
                  {"Aligned with Vriksh Ayurveda and astrological systems for introspection and growth."}
                </p>
              </div>
              <div>
                <h4 style={css("font-family:'Source Serif 4',serif;font-size:17px;color:#e9c176;margin:0 0 10px;")}>
                  {"A Personal Retreat"}
                </h4>
                <p style={css("color:#c5eadf;font-size:14px;line-height:1.7;margin:0;")}>
                  {"Natural huts in earth and wood offer a tranquil space to disconnect and meditate."}
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
          <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);order:2;")}>
            <img src="/assets/living-unit-hut.png" alt="A natural hut built in earth, wood and thatch with a shaded verandah" style={css("width:100%;display:block;object-fit:cover;")} />
          </div>
          <div style={css("order:1;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#2D5A27;text-transform:uppercase;")}>
              {"Implementation"}
            </span>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:16px 0 20px;")}>
              {"How We Can Help You"}
            </h2>
            <p style={css("color:#414846;font-size:16px;line-height:1.8;margin:0 0 16px;")}>
              {"At Gratitude Farms, we have expertise in designing and implementing Nakshatra Vanams. Our nursery sources native and rare plants from across India, ensuring your micro-forest is rich with medicinal plants, flowers, and essential tree species for your zodiac or Nakshatra."}
            </p>
            <ul style={css("color:#414846;font-size:15px;line-height:1.9;margin:0;padding-left:20px;")}>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Tailored design"}
                </strong>
                {" based on your family's Nakshatras, zodiac signs, and preferences."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Expertise in planting and soil health"}
                </strong>
                {" with organic bio-inputs."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Integrated features"}
                </strong>
                {" — rainwater harvesting, irrigation, soil management."}
              </li>
              <li>
                <strong style={css("color:#1A3C34;")}>
                  {"Ongoing support"}
                </strong>
                {" for maintaining your forest for years to come."}
              </li>
            </ul>
          </div>
        </section>
        <section style={css("max-width:900px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);text-align:center;")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
            {"A Lasting Legacy for You and Your Family"}
          </h2>
          <p style={css("color:#414846;font-size:16.5px;line-height:1.75;max-width:640px;margin:0 auto 20px;")}>
            {"In as little as 3 to 5 years, your Nakshatra Vanam will grow into a flourishing personal forest — a living sanctuary and an eco-friendly legacy that benefits future generations. The cost to create this micro-forest is less than 5-10% of the price of an average urban home."}
          </p>
          <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;margin-top:16px;")}>
            <A href="/contact?service=Personal%20Nakshatra%20Vanam" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"Create Your Nakshatra Vanam"}
            </A>
            <A href="/medicinal-plants-trees#catalogue" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
              {"See the Tree Species"}
            </A>
          </div>
        </section>
        <section style={css("max-width:1440px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
          <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.8vw,30px);color:#1A3C34;margin:0 0 28px;")}>
            {"What Goes Into a Vanam"}
          </h2>
          <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,240px),1fr));gap:18px;")}>
            <A className="gf-card-lift" href="/vriksh-ayurveda" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Vriksh Ayurveda"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The plant-care science guiding water flow, routes and Vastu components."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/farmland-design" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Farmland Design · Vasudha™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"The master plan your grove sits inside — water, trees and beauty, planned first."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/soil-fertility" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Soil Fertility · BhuPrana™"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Carbon-rich, biodiverse soil built for the long-term growth of the forest."}
              </span>
            </A>
            <A className="gf-card-lift" href="/services/managed-farmland" style={css("text-decoration:none;background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:26px;display:flex;flex-direction:column;gap:8px;")}>
              <span style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;font-weight:700;")}>
                {"Managed Farmland"}
              </span>
              <span style={css("color:#414846;font-size:13.5px;line-height:1.6;")}>
                {"Add a Nakshatra Vanam to a fully designed, operated and monetised farm."}
              </span>
            </A>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
