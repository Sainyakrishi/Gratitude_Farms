import { Component, Fragment } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import TeamCard from '../components/TeamCard.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

const STEP_ICON_PATHS = {
  screen: 'M10.5 3a7.5 7.5 0 1 0 4.9 13.2l4.2 4.2M10.5 3a7.5 7.5 0 0 1 4.9 13.2M7.5 10.2l2.2 2.2 4-4.3',
  certify: 'M12 3l2.6 1.9 3.2-.1.9 3 2.6 1.8-1 3 1 3-2.6 1.8-.9 3-3.2-.1L12 21l-2.6-1.7-3.2.1-.9-3L2.7 14.6l1-3-1-3 2.6-1.8.9-3 3.2.1L12 3z M8.8 12.2l2.2 2.2 4.2-4.4',
  farm: 'M12 21v-7m0 0c0-3.3 2.5-6 5.8-6 0 3.3-2.5 6-5.8 6zm0 0C12 10.7 9.5 8 6.2 8c0 3.3 2.5 6 5.8 6zM4.5 21h15',
  buyback: 'M4 8h11.5a4 4 0 0 1 0 8H9m-5-8l3.2-3.2M4 8l3.2 3.2M9 16l2.6 2.6M9 16l2.6-2.6'
};

function StepIcon({ name }) {
  return (
    <svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#8a6a2a" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" focusable="false">
      <path d={STEP_ICON_PATHS[name]} />
    </svg>
  );
}

class AboutUs extends Component {

  renderVals() {
    return {
      directors: [
        { name: 'Major VP Sharma (Retd)', role: 'Co-Founder & CEO', photo: '/assets/team/major-vp-sharma.png' },
        { name: 'Ayushi Sharma', role: 'Co-Founder & Director', photo: '/assets/team/ayushi-sharma.png' }
      ],
      leadership: [
        { name: 'Abhilash', role: 'Co-Founder & CEO, Operations', photo: '/assets/team/placeholder-avatar.svg' },
        { name: 'Shoba Srinivas', role: 'Manager, HR & Projects', photo: '/assets/team/shoba-srinivas.png' },
        { name: 'Raja Ganesh', role: 'Manager, HR & Projects', photo: '/assets/team/raja-ganesh.jpg' }
      ],
      advisors: [
        { name: 'Dr. Ramesh Mittal', role: 'Director, NIAM Jaipur', photo: '/assets/team/dr-ramesh-mittal.png' },
        { name: 'Prof. M. V. Ashok', role: 'Agribusiness Professional', photo: '/assets/team/mv-ashok.png' }
      ],
      focusStates: ['Tamil Nadu', 'Telangana', 'Karnataka'],
      empowermentSteps: [
        {
          step: 'STEP 01',
          icon: 'screen',
          title: 'Screen and Select',
          lead: 'We work with AWPO and ESM organizations to identify motivated ex-servicemen.',
          points: []
        },
        {
          step: 'STEP 02',
          icon: 'certify',
          title: 'Train and Certify',
          lead: 'Currently being done internally.',
          points: ['Planned NSDC aligned along with university certification.']
        },
        {
          step: 'STEP 03',
          icon: 'farm',
          title: 'Help Establish Farming',
          lead: 'Help them establish farming in their small farmlands with our multi-cropping model.',
          points: [
            'With three to five medicinal plants and fruit trees per acre.',
            'Yield: 15 to 18 tons per acre.'
          ]
        },
        {
          step: 'STEP 04',
          icon: 'buyback',
          title: 'Buy Back Produce',
          lead: 'Gratitude Farm buys back the entire produce.',
          points: ['Ensuring that the ESM farmers get good revenue, good yield, and revenue per acre numbers.']
        }
      ]
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"About Us — Ex-Servicemen Led Natural Farming | Gratitude Farms"} description={"About Gratitude Farms - our story, mission, vision, and the ex-servicemen team behind India's natural precision farming movement."} />
        <SiteNav active="about" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 40px;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Our Heritage"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(34px,5.5vw,64px);color:#1A3C34;margin:20px 0 26px;max-width:820px;line-height:1.1;")}>
              {"A Legacy of Service & "}
              <span style={css("font-style:italic;font-weight:400;")}>
                {"Sustainability"}
              </span>
            </h1>
            <p style={css("color:#414846;font-size:18px;line-height:1.7;max-width:640px;border-left:2px solid #C5A059;padding-left:22px;margin:0;")}>
              {"Cultivating discipline, harvesting hope. We are a collective of Ex-Servicemen and Agritech pioneers dedicated to transforming barren lands into thriving ecosystems."}
            </p>
          </section>
          <section style={css("background:#1A3C34;padding:clamp(36px,5.5vw,64px) clamp(20px,5.5vw,80px);")}>
            <div style={css("max-width:1100px;margin:0 auto;border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);")}>
              <img src="/assets/global-triggers.jpg" alt="Global Triggers — climate change, conservation, biodiversity and regenerative farming" style={css("width:100%;height:auto;display:block;")} />
            </div>
          </section>
          <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,36px);color:#2D5A27;margin:0 0 22px;")}>
                {"About Gratitude"}
              </h2>
              <p style={css("color:#1c1c19;font-size:16px;line-height:1.8;margin:0 0 18px;")}>
                {"Established in 2018, Gratitude Farms Private Limited is an agri-tech start-up, based at Pondicherry. We specialise in Natural Precision Farming and On-Farm value addition with an integrated marketing / sales model."}
              </p>
              <p style={css("color:#1c1c19;font-size:16px;line-height:1.8;margin:0;")}>
                {"The company has been co-founded by two ex-Army Officers and two Technology Professionals. We are a Social Impact Enterprise working towards dignified livelihood and entrepreneurship opportunities for ex-servicemen, rural women and youth through Natural Precision Farming and On-Farm value addition."}
              </p>
            </div>
            <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
              <img src="/assets/farm-lush-growth.jpg" alt="Dense natural-farming growth across a Gratitude Farms field" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
          </section>
          <section style={css("position:relative;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);margin-top:40px;overflow:hidden;")}>
            <img src="/assets/aerial-farmland.png" alt="Aerial view of Gratitude Farms land" style={css("position:absolute;inset:0;width:100%;height:100%;object-fit:cover;")} />
            <div style={css("position:absolute;inset:0;background:rgba(26,60,52,0.72);")} />
            <div style={css("position:relative;z-index:2;max-width:900px;margin:0 auto;text-align:center;")}>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,36px);color:#FAFAF9;margin:0 0 20px;")}>
                {"Our Vision"}
              </h2>
              <p style={css("color:#e5e2dd;font-size:19px;line-height:1.6;margin:0;")}>
                {"Make Indian Agriculture natural (chemical free) and sustainable."}
              </p>
            </div>
          </section>
          <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px) clamp(27px,5.0vw,60px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,36px);color:#2D5A27;margin:0 0 22px;")}>
                {"Our Mission"}
              </h2>
              <p style={css("color:#1A3C34;font-size:17px;font-weight:700;line-height:1.6;margin:0 0 18px;")}>
                {"Achieve 1 million acres of cultivation and 10 crore medicinal trees across India in ten years."}
              </p>
              <p style={css("color:#1c1c19;font-size:16px;line-height:1.8;margin:0;")}>
                {"To help convert a 10 Lakh Acres of agricultural land to Natural Farming in next 10 years; and in the process, help 100,000 ex-servicemen, rural women & youth to become Natural Farming entrepreneurs. Developing ex-servicemen as Natural Farming entrepreneurs not only helps them with their individual economic needs, but also has the potential to become a true Nation-Building activity by unleashing Natural Farming revolution for small farmers through this initiative."}
              </p>
            </div>
            <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);")}>
              <img src="/assets/banner-managed-farmland.png" alt="Ex-servicemen supervising a natural precision farm" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
          </section>
          <section className="gf-2col" style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px) clamp(45px,8.3vw,100px);display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center;")}>
            <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(26,60,52,0.12);order:2;")}>
              <img src="/assets/papaya-farm-video-still.png" alt="Gratitude Farms field" style={css("width:100%;display:block;object-fit:cover;")} />
            </div>
            <div style={css("order:1;")}>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,36px);color:#2D5A27;margin:0 0 22px;")}>
                {"Our Story"}
              </h2>
              <p style={css("color:#1c1c19;font-size:16px;line-height:1.8;margin:0;")}>
                {"Today, we live in a fragile world, where natural ecosystems and resources are depleting in rapid proportions. In our journey to find the solutions to these issues, we quickly learnt that they weren't to be found in complicated textbooks and research; but rather in the hands of the rural communities that punctuate India's landscape. The recipe to a sustainable future lies in the practices of grass-root groups and villages, that don't often get a voice."}
              </p>
            </div>
          </section>
          <section style={css("background:#F0EDE8;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
            <div style={css("max-width:1440px;margin:0 auto;")}>
              <div style={css("text-align:center;max-width:720px;margin:0 auto 64px;")}>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                  {"Our Methodology"}
                </span>
                <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,38px);color:#1A3C34;margin:16px 0 0;")}>
                  {"Wisdom of the Ancients, Precision of the Future"}
                </h2>
              </div>
              <div className="gf-2col" style={css("display:grid;grid-template-columns:1fr 1fr;gap:32px;align-items:center;")}>
                <div style={css("background:#FAFAF9;border-radius:24px;padding:32px;display:flex;align-items:center;justify-content:center;")}>
                  <img src="/assets/tree-roots-icon.png" alt="Tree and roots illustration representing Vriksh Ayurveda" style={css("width:100%;max-width:380px;")} />
                </div>
                <div style={css("display:flex;flex-direction:column;gap:20px;")}>
                  <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:28px;")}>
                    <h4 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;margin:0 0 8px;")}>
                      {"Natural Farming"}
                    </h4>
                    <p style={css("color:#414846;font-size:14.5px;line-height:1.65;margin:0;")}>
                      {"Zero synthetic inputs. We rely on cow-based formulations (Jivamrit) and diverse multi-cropping to build resilient soil microbiomes."}
                    </p>
                  </div>
                  <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:28px;")}>
                    <h4 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;margin:0 0 8px;")}>
                      {"Nakshatra Vanam"}
                    </h4>
                    <p style={css("color:#414846;font-size:14.5px;line-height:1.65;margin:0;")}>
                      {"Biodiversity groves planted according to ancient astrological alignments, acting as ecological anchors that restore micro-climates."}
                    </p>
                  </div>
                  <div style={css("background:#FAFAF9;border:1px solid #e5e2dd;border-radius:16px;padding:28px;")}>
                    <h4 style={css("font-family:'Source Serif 4',serif;font-size:19px;color:#1A3C34;margin:0 0 8px;")}>
                      {"Vriksh Ayurveda"}
                    </h4>
                    <p style={css("color:#414846;font-size:14.5px;line-height:1.65;margin:0;")}>
                      {"The science of plant life applied to farm management, ensuring holistic health of the plantation without chemical intervention."}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,38px);color:#1A3C34;margin:0 0 14px;")}>
              {"The Gratitude Model"}
            </h2>
            <p style={css("color:#414846;font-size:16px;max-width:600px;margin:0 0 40px;")}>
              {"From barren land to thriving ecosystem — our structured approach guarantees ecological and economic returns."}
            </p>
            <div style={css("border-radius:24px;overflow:hidden;border:1px solid #e5e2dd;background:#FAFAF9;padding:20px;")}>
              <img src="/assets/gratitude-model-roadmap.png" alt="Gratitude Farms development roadmap: barren land to biodiverse farm" style={css("width:100%;display:block;")} />
            </div>
          </section>
          <section style={css("background:#1A3C34;padding:clamp(54px,10.0vw,120px) clamp(20px,5.5vw,80px);")}>
            <div style={css("max-width:1440px;margin:0 auto;")}>
              <div className="gf-2col" style={css("display:grid;grid-template-columns:1fr 1fr;gap:56px;align-items:center;")}>
                <div>
                  <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
                    {"Social Impact · Sainya Krishi"}
                  </span>
                  <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,40px);color:#FAFAF9;margin:16px 0 22px;line-height:1.12;")}>
                    {"Empowering the Defenders of the Nation"}
                  </h2>
                  <p style={css("color:#c5eadf;font-size:16.5px;line-height:1.75;margin:0 0 18px;")}>
                    {"A typical soldier is from a rural background, has served 15–20 years, and returns home well-respected and highly disciplined — yet too often ends up in low-end city jobs for lack of options. We believe that is a travesty. Duly groomed as a grass-root entrepreneur, an ex-serviceman can become one of the most effective agents of change for rural India."}
                  </p>
                  <p style={css("color:#c5eadf;font-size:16.5px;line-height:1.75;margin:0;")}>
                    {"At Gratitude Farms, we combine the "}
                    <strong style={css("color:#FAFAF9;")}>
                      {"discipline of Indian Army veterans"}
                    </strong>
                    {" with the fast-rising demand for natural farming — giving them a dignified livelihood near their homes, and their villages a leader who can transform them."}
                  </p>
                </div>
                <div style={css("border-radius:20px;overflow:hidden;box-shadow:0 20px 60px rgba(0,0,0,0.3);aspect-ratio:4/3;")}>
                  <img src="/assets/banner-farmland-operate.png" alt="An ex-serviceman tending a thriving natural farm" style={css("width:100%;height:100%;display:block;object-fit:cover;")} />
                </div>
              </div>
              <div style={css("text-align:center;max-width:640px;margin:56px auto 40px;")}>
                <h3 style={css("font-family:'Source Serif 4',serif;font-size:clamp(22px,2.6vw,28px);color:#FAFAF9;margin:0;")}>
                  {"How We Empower Them"}
                </h3>
              </div>
              <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(230px,1fr));gap:20px;")}>
                {($v.empowermentSteps || []).map((step, stepIndex) => (
                  <div key={stepIndex} style={css("background:#FAFAF9;border-radius:18px;padding:30px;")}>
                    <div style={css("width:42px;height:42px;border-radius:12px;background:#f3e6cd;display:flex;align-items:center;justify-content:center;margin-bottom:16px;")}>
                      <StepIcon name={step.icon} />
                    </div>
                    <div style={css("font-family:'JetBrains Mono',monospace;font-size:12px;color:#C5A059;margin-bottom:12px;")}>
                      {step.step}
                    </div>
                    <h4 style={css("font-family:'Source Serif 4',serif;font-size:18px;color:#1A3C34;margin:0 0 8px;")}>
                      {step.title}
                    </h4>
                    <p style={css("color:#414846;font-size:14px;line-height:1.6;margin:0;")}>
                      {step.lead}
                    </p>
                    {step.points.length > 0 && (
                      <ul style={css("margin:10px 0 0;padding:0 0 0 18px;color:#C5A059;")}>
                        {step.points.map((point, pointIndex) => (
                          <li key={pointIndex} style={css("margin-top:6px;")}>
                            <span style={css("color:#414846;font-size:14px;line-height:1.6;")}>
                              {point}
                            </span>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
              <div style={css("margin-top:28px;background:rgba(250,250,249,0.06);border:1px solid rgba(197,160,89,0.4);border-left:4px solid #C5A059;border-radius:16px;padding:clamp(24px,3.2vw,32px);")}>
                <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#e9c176;text-transform:uppercase;")}>
                  {"Our Partnership"}
                </span>
                <p style={css("color:#FAFAF9;font-size:clamp(16px,1.9vw,18.5px);line-height:1.65;margin:12px 0 0;")}>
                  {"We have signed an "}
                  <strong style={css("color:#e9c176;")}>
                    {"MOU with the Army Welfare Placement Organization (AWPO)"}
                  </strong>
                  {" for screening and selection of ESM and running joint projects."}
                </p>
                <div style={css("display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:20px;")}>
                  <span style={css("color:#c5eadf;font-size:14.5px;")}>
                    {"Currently focusing on"}
                  </span>
                  {($v.focusStates || []).map((state, stateIndex) => (
                    <span key={stateIndex} style={css("font-family:'JetBrains Mono',monospace;font-size:12.5px;color:#f3e6cd;background:rgba(197,160,89,0.18);border:1px solid rgba(197,160,89,0.4);border-radius:999px;padding:6px 14px;")}>
                      {state}
                    </span>
                  ))}
                </div>
                <p style={css("color:#c5eadf;font-size:14.5px;line-height:1.6;margin:14px 0 0;")}>
                  {"Over time, we will be working across India."}
                </p>
              </div>
              <div style={css("text-align:center;margin-top:48px;")}>
                <A href="/sainya-krishi" style={css("text-decoration:none;background:#C5A059;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 34px;border-radius:12px;display:inline-block;")} hoverStyle={css("background:#e9c176;")}>
                  {"Explore Sainya Krishi →"}
                </A>
              </div>
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(63px,11.7vw,140px) clamp(20px,5.5vw,80px) clamp(27px,5.0vw,60px);")}>
            <div style={css("text-align:center;max-width:720px;margin:0 auto 24px;")}>
              <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
                {"Leadership"}
              </span>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(28px,3.5vw,38px);color:#1A3C34;margin:16px 0 0;")}>
                {"Board of Directors"}
              </h2>
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;max-width:700px;margin:48px auto 0;")}>
              {($v.directors || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(27px,5.0vw,60px);")}>
            <div style={css("text-align:center;max-width:720px;margin:0 auto 24px;")}>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:0;")}>
                {"Leadership Team"}
              </h2>
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;")}>
              {($v.leadership || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <div style={css("text-align:center;max-width:720px;margin:0 auto 24px;")}>
              <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:0;")}>
                {"Board of Advisors"}
              </h2>
            </div>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:24px;")}>
              {($v.advisors || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
            <div style={css("text-align:center;margin-top:40px;")}>
              <A href="/our-team" style={css("text-decoration:none;color:#1A3C34;font-weight:700;font-size:14px;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"View Full Team Directory →"}
              </A>
            </div>
          </section>
          <section style={css("max-width:1200px;margin:0 auto;padding:0 clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);text-align:center;")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(26px,3.2vw,34px);color:#1A3C34;margin:0 0 20px;")}>
              {"Join Our Mission"}
            </h2>
            <p style={css("color:#414846;font-size:16.5px;line-height:1.7;max-width:640px;margin:0 auto 36px;")}>
              {"Whether you are an investor, a landowner seeking restoration, or a partner in our vision — we welcome you to the Gratitude family."}
            </p>
            <div style={css("display:flex;gap:16px;justify-content:center;flex-wrap:wrap;")}>
              <A href="/contact" style={css("text-decoration:none;background:#1A3C34;color:#fff;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                {"Partner With Us"}
              </A>
              <A href="/our-team" style={css("text-decoration:none;background:transparent;border:1px solid #3C4A3E;color:#1A3C34;font-weight:700;font-size:14px;padding:16px 32px;border-radius:12px;")}>
                {"Meet the Team"}
              </A>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default AboutUs;
