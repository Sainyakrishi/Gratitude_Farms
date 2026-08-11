import { Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import ServiceDetail from '../components/ServiceDetail.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function ManagedFarmland(props) {
  return (
    <>
      <Seo title={"Managed Farmland Service — End-to-End Natural Farm | Gratitude Farms"} description={"Managed Farmland Service - full-service natural farmland management by Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <ServiceDetail serviceKey="managed-farmland" />
      </main>
      <SiteFooter />
    </>
  );
}
