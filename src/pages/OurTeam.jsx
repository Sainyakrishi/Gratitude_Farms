import { Component, Fragment } from 'react';
import { Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import TeamCard from '../components/TeamCard.jsx';
import SiteFooter from '../components/SiteFooter.jsx';
import { directors, leadership, advisors } from '../data/team-data.js';

class OurTeam extends Component {

  renderVals() {
    return {
      directors,
      leadership,
      advisors
    };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Our Team — Board, Advisors & Leadership | Gratitude Farms"} description={"Meet the Gratitude Farms team - Board of Directors, Board of Advisors and Leadership."} />
        <SiteNav active="about" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;text-align:center;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"About Team"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,54px);color:#1A3C34;margin:20px auto 22px;max-width:800px;")}>
              {"The Discipline Behind the Soil"}
            </h1>
            <p style={css("color:#414846;font-size:17px;line-height:1.7;max-width:640px;margin:0 auto;")}>
              {"Ex-servicemen, technologists and agricultural scientists working together to build India's most trusted natural farming enterprise."}
            </p>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(36px,6.7vw,80px) clamp(20px,5.5vw,80px) 20px;")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:0 0 40px;text-align:center;")}>
              {"Board of Directors"}
            </h2>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,300px));justify-content:center;gap:24px;margin:0 auto;")}>
              {($v.directors || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px) 20px;")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:0 0 40px;text-align:center;")}>
              {"Leadership Team"}
            </h2>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,300px));justify-content:center;gap:24px;")}>
              {($v.leadership || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
          </section>
          <section style={css("max-width:1440px;margin:0 auto;padding:clamp(27px,5.0vw,60px) clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <h2 style={css("font-family:'Source Serif 4',serif;font-size:clamp(24px,3vw,32px);color:#1A3C34;margin:0 0 40px;text-align:center;")}>
              {"Board of Advisors"}
            </h2>
            <div className="gf-swipe" style={css("display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,300px));justify-content:center;gap:24px;")}>
              {($v.advisors || []).map((person, personIndex) => (
                <Fragment key={personIndex}>
                  <TeamCard person={person} />
                </Fragment>
              ))}
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default OurTeam;
