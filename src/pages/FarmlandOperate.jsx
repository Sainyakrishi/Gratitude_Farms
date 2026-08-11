import { Seo } from '../lib/ui.jsx';
import { css } from '../lib/css.js';
import SiteNav from '../components/SiteNav.jsx';
import ServiceDetail from '../components/ServiceDetail.jsx';
import SiteFooter from '../components/SiteFooter.jsx';

export default function FarmlandOperate(props) {
  return (
    <>
      <Seo title={"Sanjeevani™ Farmland Operate Service — Daily Farm Operations | Gratitude Farms"} description={"Sanjeevani - Farmland Operate Service by Gratitude Farms."} />
      <SiteNav active="program" />
      <main style={css("font-family:'Hanken Grotesk',sans-serif;background:#FCF9F4;overflow-x:clip;")}>
        <ServiceDetail serviceKey="farmland-operate" />
      </main>
      <SiteFooter />
    </>
  );
}
