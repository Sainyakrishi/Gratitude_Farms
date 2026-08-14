import { Component } from 'react';
import { A, Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

class PrivacyPolicy extends Component {

  renderVals() {
    return { updated: '7 August 2026' };
  }

  render() {
    const $v = this.renderVals();
    return (
      <>
      <Seo title={"Privacy Policy | Gratitude Farms"} description={"How Gratitude Farms Private Limited collects, uses and protects personal information submitted through this website."} />
        <SiteNav active="" />
        <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
          <section style={css("max-width:860px;margin:0 auto;padding:clamp(45px,8.3vw,100px) clamp(20px,5.5vw,80px) 20px;")}>
            <span style={css("font-family:'JetBrains Mono',monospace;font-size:12px;letter-spacing:0.12em;color:#C5A059;text-transform:uppercase;")}>
              {"Legal"}
            </span>
            <h1 style={css("font-family:'Source Serif 4',serif;font-size:clamp(32px,5vw,48px);color:#1A3C34;margin:18px 0 14px;")}>
              {"Privacy Policy"}
            </h1>
            <p style={css("color:#717976;font-size:14px;margin:0;")}>
              {"Last updated "}{$v.updated}
            </p>
          </section>
          <section className="legal" style={css("max-width:860px;margin:0 auto;padding:20px clamp(20px,5.5vw,80px) clamp(63px,11.7vw,140px);")}>
            <p>
              {"This policy explains how "}
              <strong>
                {"Gratitude Farms Private Limited"}
              </strong>
              {" (\"Gratitude Farms\", \"we\", \"us\") handles personal information collected through gratitudefarms.co.in and in the course of responding to enquiries. We are based at No. 70, Auroville Main Road, Kottakuppam, Pondicherry – 605104, India."}
            </p>
            <h2>
              {"What we collect"}
            </h2>
            <p>
              {"We only collect what you choose to give us. That is:"}
            </p>
            <ul>
              <li>
                <strong>
                  {"Enquiry details"}
                </strong>
                {" — the name, email address, phone number, land location, area of interest and message you enter in our contact form."}
              </li>
              <li>
                <strong>
                  {"Newsletter sign-ups"}
                </strong>
                {" — the email address you submit in the footer subscription field."}
              </li>
              <li>
                <strong>
                  {"Basic technical data"}
                </strong>
                {" — where analytics are enabled, standard information such as pages viewed, approximate region, referring site, browser and device type."}
              </li>
            </ul>
            <p>
              {"We do not ask for, and you should not send us, financial account details, government identity numbers or health information through this website."}
            </p>
            <h2>
              {"Why we use it"}
            </h2>
            <ul>
              <li>
                {"To answer your enquiry and prepare a proposal or site survey where relevant."}
              </li>
              <li>
                {"To send updates about natural farming, carbon credits and our work, where you have asked for them."}
              </li>
              <li>
                {"To understand which parts of the site are useful, so we can improve them."}
              </li>
              <li>
                {"To meet legal, accounting and contractual obligations."}
              </li>
            </ul>
            <p>
              {"We do not sell your personal information, and we do not share it with advertisers."}
            </p>
            <h2>
              {"Who else sees it"}
            </h2>
            <p>
              {"Enquiries reach our own team. Where a service provider processes data on our behalf — for example email hosting, form delivery or website analytics — they may access it only to provide that service, under contract. Some of these providers operate servers outside India."}
            </p>
            <p>
              {"This site also embeds content from third parties: Google Maps on the contact page, YouTube (in privacy-enhanced mode) on the home page, and Google Fonts. These providers may collect technical data when their content loads, under their own privacy policies."}
            </p>
            <h2>
              {"How long we keep it"}
            </h2>
            <p>
              {"Enquiry correspondence is retained for as long as needed to serve you and to meet our record-keeping obligations, and is then deleted. Newsletter subscriptions are kept until you unsubscribe."}
            </p>
            <h2>
              {"Your choices"}
            </h2>
            <ul>
              <li>
                {"Ask us for a copy of the personal information we hold about you."}
              </li>
              <li>
                {"Ask us to correct anything that is wrong or out of date."}
              </li>
              <li>
                {"Ask us to delete your information, where we are not required to keep it."}
              </li>
              <li>
                {"Withdraw consent to marketing at any time — every newsletter includes an unsubscribe option, or simply reply and ask."}
              </li>
            </ul>
            <p>
              {"To exercise any of these, write to "}
              <A href="mailto:info@gratitudefarms.co.in">
                {"info@gratitudefarms.co.in"}
              </A>
              {". We will respond within 30 days."}
            </p>
            <h2>
              {"Security"}
            </h2>
            <p>
              {"We apply reasonable technical and organisational safeguards to protect the information you send us. No transmission over the internet can be guaranteed completely secure, so please do not send sensitive material through the contact form."}
            </p>
            <h2>
              {"Children"}
            </h2>
            <p>
              {"This website is intended for adults. We do not knowingly collect personal information from children under 18."}
            </p>
            <h2>
              {"Changes"}
            </h2>
            <p>
              {"We may update this policy as our services or the law change. The revision date at the top always reflects the current version."}
            </p>
            <h2>
              {"Contact us"}
            </h2>
            <p>
              {"Questions about this policy, or about how we handle your information:"}
              <br />
              {"\n    Email "}
              <A href="mailto:info@gratitudefarms.co.in">
                {"info@gratitudefarms.co.in"}
              </A>
              {" · Phone "}
              <A href="tel:+919150023044">
                {"+91 91500 23044"}
              </A>
              <br />
              {"\n    Gratitude Farms Private Limited, No. 70, Auroville Main Road, Kottakuppam, Pondicherry – 605104, India."}
            </p>
            <div style={css("margin-top:48px;padding-top:28px;border-top:1px solid #e5e2dd;display:flex;gap:22px;flex-wrap:wrap;")}>
              <A href="/terms" style={css("color:#1A3C34;font-weight:700;font-size:14px;text-decoration:none;border-bottom:1px solid #1A3C34;padding-bottom:2px;")}>
                {"Terms of Service →"}
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

export default PrivacyPolicy;
