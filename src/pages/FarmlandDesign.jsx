import { Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import ServiceDetail from '../components/ServiceDetail.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function FarmlandDesign(props) {
  return (
    <>
      <Seo title={"Vasudha™ Farmland Design Service — Master Planning | Gratitude Farms"} description={"Vasudha - Farmland Design Service by Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <ServiceDetail serviceKey="farmland-design" />
      </main>
      <SiteFooter />
    </>
  );
}
