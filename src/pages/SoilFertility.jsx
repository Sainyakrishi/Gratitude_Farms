import { Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import ServiceDetail from '../components/ServiceDetail.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function SoilFertility(props) {
  return (
    <>
      <Seo title={"BhuPrana™ Soil Fertility Services — Biochar & Soil Carbon | Gratitude Farms"} description={"BhuPrana - Soil Fertility Services by Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <ServiceDetail serviceKey="soil-fertility" />
      </main>
      <SiteFooter />
    </>
  );
}
