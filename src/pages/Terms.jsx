import { Component } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class Terms extends Component {

  renderVals() {
    return { updated: '7 August 2026' };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Terms of Service | Gratitude Farms"} description={"Terms governing the use of the Gratitude Farms website and the indicative information published on it."} />
        <SiteNav active="" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:860px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Legal"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,48px);color:#1A3C34;margin:18px 0 14px;")}>
              {"Terms of Service"}
            </h1>
            <p style={css("color:#717976;font-size:14px;margin:0;")}>
              {"Last updated "}{$v.updated}
            </p>
          </section>
          <section className="legal" style={css("max-width:860px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <p>
              {"These terms govern your use of gratitudefarms.co.in, operated by "}
              <strong>
                {"Gratitude Farms Private Limited"}
              </strong>
              {", No. 70, Auroville Main Road, Kottakuppam, Pondicherry – 605104, India. By using the site you accept them."}
            </p>
            <h2>
              {"What this website is"}
            </h2>
            <p>
              {"This site describes our services and programs and lets you send us an enquiry. It is an information and enquiry channel — not a shop. No booking, payment or binding order can be placed here."}
            </p>
            <h2>
              {"Pricing and specifications are indicative"}
            </h2>
            <p>
              {"Prices, timelines, yields, tree counts, soil-carbon figures, KPIs and service levels shown on this site are "}
              <strong>
                {"indicative planning figures for 2026 and exclusive of GST"}
              </strong>
              {". Every site is different. Actual scope, price and schedule are fixed only in a written proposal issued after a site survey, and only a signed agreement creates any obligation on either side."}
            </p>
            <p>
              {"Nothing on this website is an offer capable of acceptance, a guarantee of outcome, or a projection of investment return."}
            </p>
            <h2>
              {"Agricultural and environmental outcomes"}
            </h2>
            <p>
              {"Farming outcomes depend on rainfall, soil condition, pests, market prices, statutory approvals and the client's own decisions. Past project results described here do not guarantee future results on your land. Carbon credit volumes and revenues depend on the applicable methodology, verification and market conditions at the time."}
            </p>
            <h2>
              {"Regulated species and permits"}
            </h2>
            <p>
              {"Some species we cultivate — Red Sanders among them — are subject to statutory controls on cultivation, felling and transport. Any supply is conditional on the necessary approvals being in place. We will tell you what is required before an agreement is signed."}
            </p>
            <h2>
              {"Content on this site is not professional advice"}
            </h2>
            <p>
              {"Articles in our Journal and the notes in our species catalogue describe traditional, ecological and agronomic use. They are general information, not medical, legal, financial or investment advice, and no therapeutic claim is made for any plant described."}
            </p>
            <h2>
              {"Using our material"}
            </h2>
            <p>
              {"The text, photographs, illustrations, design and trade marks on this site — including "}
              <strong>
                {"BhuPrana™"}
              </strong>
              {", "}
              <strong>
                {"Vasudha™"}
              </strong>
              {", "}
              <strong>
                {"Sanjeevani™"}
              </strong>
              {" and Sainya Krishi — belong to Gratitude Farms or our licensors. You may view, download and print pages for your own reference or to evaluate working with us. You may not republish, resell or use them commercially without our written permission."}
            </p>
            <h2>
              {"Enquiries you send us"}
            </h2>
            <ul>
              <li>
                {"Give accurate information — we plan surveys and proposals from what you tell us."}
              </li>
              <li>
                {"Do not submit anything unlawful, misleading or infringing, and do not send other people's personal data without their consent."}
              </li>
              <li>
                {"Do not use automated tools to scrape, overload or disrupt the site."}
              </li>
            </ul>
            <p>
              {"How we handle what you send is set out in our "}
              <A href="/privacy-policy">
                {"Privacy Policy"}
              </A>
              {"."}
            </p>
            <h2>
              {"Third-party links and embeds"}
            </h2>
            <p>
              {"This site links to and embeds third-party content, including Google Maps, YouTube and external publications. We do not control those services and are not responsible for their content or practices."}
            </p>
            <h2>
              {"Availability"}
            </h2>
            <p>
              {"We aim to keep the site available and accurate but do not warrant uninterrupted access or freedom from error. We may change, suspend or withdraw any part of it at any time."}
            </p>
            <h2>
              {"Liability"}
            </h2>
            <p>
              {"To the extent permitted by law, Gratitude Farms is not liable for indirect or consequential loss, or for loss of profit, arising from use of this website or reliance on the indicative information published on it. Nothing here limits liability that cannot lawfully be limited. Liability under any engagement is governed by that engagement's own signed agreement."}
            </p>
            <h2>
              {"Governing law"}
            </h2>
            <p>
              {"These terms are governed by the laws of India. The courts at Puducherry have exclusive jurisdiction over any dispute arising from them."}
            </p>
            <h2>
              {"Changes"}
            </h2>
            <p>
              {"We may revise these terms. The revision date at the top always reflects the current version, and continued use of the site means you accept it."}
            </p>
            <h2>
              {"Contact us"}
            </h2>
            <p>
              {"Email "}
              <A href="mailto:info@gratitudefarms.co.in">
                {"info@gratitudefarms.co.in"}
              </A>
              {" · Phone "}
              <A href="tel:+919150023044">
                {"+91 91500 23044"}
              </A>
            </p>
            <div style={css("margin-top:48px;padding-top:28px;border-top:1px solid #e5e2dd;display:flex;gap:22px;flex-wrap:wrap;")}>
              <A href="/privacy-policy" style={css("color:#1A3C34;font-weight:700;font-size:14px;text-decoration:none;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"Privacy Policy →"}
              </A>
              <A href="/contact" style={css("color:#1A3C34;font-weight:700;font-size:14px;text-decoration:none;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"Contact us →"}
              </A>
            </div>
          </section>
        </main>
        <SiteFooter />
      </>
    );
  }
}

export default Terms;
