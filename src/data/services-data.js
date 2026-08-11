// Source of truth: "Gratitude Farms - Service Product Specifications - Cumulative (All Services)" v1.0, 20 Jul 2026.
// Four flagship services shown on the site (S0–S3). Shared fields sit on the service;
// audience-specific fields live under service.audiences[key].

export const AUDIENCES = [
  { key: 'individuals', label: 'Individuals / NRIs / Family Foundations', short: 'Individuals / NRIs' },
  { key: 'corporates', label: 'Corporates & PSUs', short: 'Corporates & PSUs' },
  { key: 'fpos', label: 'FPOs / Village Organisations', short: 'FPOs' },
  { key: 'small', label: 'Small Landholders', short: 'Small Landholders' },
  { key: 'marginal', label: 'Small & Marginal Holders', short: 'Small & Marginal' }
];

export const SERVICES = [
  {
    key: 'managed-farmland', code: 'S0', brand: null, name: 'Managed Farmland Service',
    badge: 'Mother Service', category: 'Integrated · S1 → S5 under one contract',
    tagline: 'End-to-end transformation of barren or degraded land into a profitable, biodiverse natural farm — S1 to S5 under one accountable contract.',
    hero: '/assets/banner-managed-farmland.png',
    highlights: ['Bundles all five services under one contract', 'One accountable point of delivery', 'Designed, operated & monetised farm', 'Ex-servicemen supervision'],
    overview: "Gratitude Farms' flagship, integrated offering. It bundles Soil Fertility (S1), Farmland Design (S2), Farmland Operate (S3), the Agri-Operations Centre (S4) and Market Linkage (S5) into a single, end-to-end engagement with one point of accountability. The client hands over a landholding and receives back a designed, living, operating and monetised natural farm.",
    purpose: 'Hand over a landholding and receive back a designed, living, operating and monetised natural farm — under one accountable contract.',
    methodology: ['Diagnose & design — soil and land baseline, and a custom master plan (S1 + S2)', 'Restore the soil — biochar-enriched compost programme to rebuild soil organic carbon (S1)', 'Develop & plant — infrastructure, water, mechanisation and planting to the design (S3)', 'Operate & manage — day-to-day operations, supervision and training via the AOC (S3 + S4)', 'Monetise & report — market/export linkage, carbon credits and per-plot reporting (S5 + S4)'],
    technology: ['AOC dashboard & per-plot mobile app', 'Drones & IoT sensors', 'Biochar / BEC production', 'Carbon MRV (Puro.earth-type methodology)', 'Farm-management software'],
    timeline: [{ phase: 'Design', duration: '1–2 months' }, { phase: 'Development', duration: '~6 months' }, { phase: 'System stabilises', duration: '~3 years' }, { phase: 'Operations', duration: 'Typically 8 years' }],
    esg: ['Carbon sequestration', '100–300 trees / acre', 'Water conservation', 'Rural livelihoods — ex-servicemen, women SHGs, youth', 'Healthy, chemical-free produce'],
    support: { title: 'Dedicated Relationship Manager', text: 'A documented change-request process, a defined escalation matrix and scheduled service reviews at a cadence set by your SLA tier.' },
    audiences: {
      individuals: {
        size: '20+ acres',
        targetProfile: 'Individual, NRI or family-foundation owners with 20+ acres, seeking a managed, high-value natural farm and a multi-generational legacy / wellness asset.',
        objectives: 'Wealth preservation and a living legacy asset; a productive natural farm and personal wellness retreat; transparent per-plot reporting; an optional cultural / spiritual layer (Nakshatra Vanam).',
        deliverables: ['Master farm design + 3-year development plan', 'Restored, carbon-rich soil (SOC uplift)', 'Fully planted farm: orchards, medicinal, vegetables, flowers, water bodies', 'Dedicated ex-servicemen supervisor', 'Monthly per-plot online reports + annual owner review', 'Branded produce sales; optional agri-tourism'],
        kpis: ['SOC %', 'Yield / acre', 'Biodiversity count', 'Water saved', 'Cost / acre', 'Farm profitability', 'Carbon sequestered'],
        sla: 'Platinum — weekly / resident supervision, same-day response, real-time dashboard, dedicated RM',
        edition: 'Enterprise / Premier · Design-Build-Operate',
        model: 'Fixed-price development + managed-service subscription and/or revenue-share',
        pricing: ['Development (one-time): ₹5–10 L / acre', 'Annual managed fee: ₹45,000–85,000 / acre / yr or 18–25% revenue-share', 'Design: ₹20,000–35,000 / acre', 'Nakshatra Vanam: ₹50,000–1,50,000', 'Bundle discount 10–15% vs à-la-carte'],
        addons: ['Nakshatra Vanam', 'Carbon-credit monetisation', 'Organic certification', 'Agri-tourism / wellness retreat', 'Eco-stay design', 'Drone surveys']
      },
      corporates: {
        size: 'Barren / degraded land · 100+ acres · ESG mandate',
        targetProfile: 'Corporates and PSUs (cement, steel, power) holding 100+ acres of barren, unused or degraded land, with an ESG / CSR and net-zero mandate.',
        objectives: 'Convert idle / degraded land into a long-term profitable asset; deliver auditable ESG / CSR outcomes (carbon, biodiversity, water, livelihoods); de-risk through professional management and governance.',
        deliverables: ['Land & soil baseline + restoration roadmap', 'Large-scale biodiverse natural-farming development', 'Carbon MRV + verified credits', 'ESG / CSR impact dashboard + annual audited report (BRSR / GRI / SDG-mapped)', 'Employment: ex-servicemen, women SHGs, youth', 'Produce off-take / market linkage'],
        kpis: ['Acres restored', 'tCO2e sequestered', 'SOC uplift', 'Biodiversity index', 'Jobs created', 'Water recharged', 'Programme ROI', 'ESG-score contribution'],
        sla: 'Platinum + steering committee; SLA-linked outcome payments',
        edition: 'Enterprise · BOOT / outcome-based managed service',
        model: 'SLA-linked; optional GF co-investment; CSR / ESG-funded',
        pricing: ['Development: ₹2–5 L / acre', 'Managed service: ₹30,000–60,000 / acre / yr or outcome-based', 'AOC ESG platform: ₹8–25 L / yr', 'Carbon-credit revenue share (GF 20–30%)', 'Indicative 100-acre programme: ₹3–6 Cr over 3 years'],
        addons: ['Verified carbon credits', 'Biodiversity certification', 'Employee CSR engagement visits', '"Restored-land" branded produce', 'Agro-forestry timber']
      },
      fpos: {
        size: 'Aggregated member farms',
        targetProfile: 'Registered FPOs or village-level organisations aggregating multiple small & marginal member farms into a cluster.',
        objectives: 'Cluster-scale conversion to natural farming; member capacity-building; input supply, aggregation and market / export access; higher member incomes (2.5–3×).',
        deliverables: ['Cluster soil-fertility programme + BEC supply', 'Standardised farm-design templates', 'Farmer training & FPO capacity building', 'Shared AOC dashboard & reporting', 'Aggregation, branding & market / export linkage', 'Cluster-level carbon-credit aggregation'],
        kpis: ['Members onboarded', 'Acres converted', 'Yield uplift', 'Input-cost reduction', 'Price realisation', 'Credits generated', 'Member income'],
        sla: 'Gold (cluster-level) with a shared resident agronomist',
        edition: 'Enterprise (Cluster) · blended finance',
        model: 'NABARD / CSR / grants + revenue-share + membership',
        pricing: ['GF facilitation fee: ₹8,000–20,000 / acre + 5–10% revenue-share', 'BEC: ₹15,000–20,000 / tonne (bulk)', 'Membership / aggregation: ₹50,000–2,00,000 / FPO / yr', 'Training: grant / CSR-funded'],
        addons: ['Export facilitation', 'Organic / GI certification', 'Warehousing', 'Micro-processing units', 'Carbon aggregation']
      },
      small: {
        size: '5–20 acres',
        targetProfile: 'Individual small landholders with 5–20 acres seeking affordable, full-service conversion to natural farming with dependable management and market linkage.',
        objectives: 'Affordable full-service conversion to a productive, diversified natural farm with dependable management, market linkage and meaningful income uplift.',
        deliverables: ['Soil restoration + BEC', 'Custom farm design (diversified crops / trees)', 'Development + ongoing managed operation', 'AOC dashboard + monthly reports', 'Produce marketing & linkage', 'Optional short-format agri-tourism'],
        kpis: ['SOC %', 'Yield / acre', 'Input-cost saving', 'Revenue diversification', 'Profitability', 'Water saved'],
        sla: 'Gold — fortnightly visits, monthly reporting',
        edition: 'Professional · Design-Build-Operate',
        model: 'Fixed-price development + managed-service subscription',
        pricing: ['Development: ₹3–7 L / acre', 'Managed fee: ₹35,000–60,000 / acre / yr or 15–20% revenue-share', 'Design: ₹15,000–30,000 / acre', 'NABARD / bank EMI options'],
        addons: ['Agri-tourism', 'Carbon credits', 'Certification', 'Drone survey', 'Farm-stay']
      },
      marginal: {
        size: '< 5 acres',
        targetProfile: 'Small & marginal farmers with under 5 acres, served through group / FPO aggregation and blended finance.',
        objectives: 'Low-cost, modular entry to natural farming via group delivery; productivity and income improvement; access to inputs, knowledge and markets.',
        deliverables: ['Soil test + BEC supply (group buy)', 'Standard plot-design template', 'Group training & shared supervision', 'App-based monitoring & advisories', 'Group aggregation & sale of produce'],
        kpis: ['Yield uplift', 'Input-cost saving', 'Price realisation', 'Adoption rate', 'Income increase'],
        sla: 'Silver — monthly group visit, app support',
        edition: 'Essential · group / FPO-aggregated',
        model: 'Blended finance; low fixed fee + commission on sales',
        pricing: ['Entry package: ₹40,000–1,20,000 / acre (modular, group-delivered)', 'BEC: ₹18,000–25,000 / tonne', 'AOC app: ₹3,000–6,000 / plot / yr', 'Market linkage: 8–12% commission', 'CSR / subsidy reduces net cost'],
        addons: ['Agri-tourism co-op', 'Carbon aggregation', 'FPO certification', 'Micro-processing']
      }
    }
  },

  {
    key: 'soil-fertility', code: 'S1', brand: 'BhuPrana™', name: 'Soil Fertility Service',
    badge: 'S1 · BhuPrana™', category: 'Soil regeneration & carbon',
    tagline: 'Rebuild living soil — diagnostics, biochar, enriched compost, microbial inputs and multi-season fertility restoration.',
    hero: '/assets/banner-soil-fertility.png',
    highlights: ['Circular bio-economy: biomass → biochar → BEC', 'Soil organic carbon that persists for centuries', 'Foundation of every Gratitude farm', 'Carbon-credit enablement'],
    overview: 'Soil Fertility Services (BhuPrana™) restores soil organic carbon and soil biology through a circular bio-economy — converting waste and invasive biomass into biochar, blending it into Biochar-Enriched Compost (BEC), and returning it to the soil, where the carbon persists for centuries. It is the foundation of every Gratitude farm and a national-scale service in its own right.',
    purpose: 'Restore a genuinely living, carbon-rich soil as the foundation of every natural farm.',
    methodology: ['Diagnose — soil & SOC assessment, biomass mapping and a per-site remediation plan', 'Set up supply — biochar & BEC production (central AOC unit or a dedicated unit)', 'Build the soil — multi-season BEC application with microbial & botanical inputs', 'Measure & verify — SOC, water & yield monitoring and carbon documentation', 'Sustain — hand a living, carbon-rich soil to design / operate or to cultivation'],
    technology: ['Soil-biology diagnostics', 'Continuous-pyrolysis biochar reactor', 'BEC formulation to standard (~1:5 biochar:compost)', 'SOC / water monitoring', 'Carbon MRV tools'],
    timeline: [{ phase: 'Diagnostics', duration: '2–4 weeks' }, { phase: 'First BEC application', duration: 'Within the season' }, { phase: 'Measurable SOC uplift', duration: '1–3 seasons' }, { phase: 'Carbon-credit stream', duration: 'From Year 2' }],
    esg: ['Soil carbon sink', 'Reduced chemical load', 'Water conservation', 'Invasive-biomass reuse'],
    support: { title: 'Agronomy Support Line', text: 'Documented change requests, a defined escalation matrix and a season-end review.' },
    audiences: {
      individuals: {
        size: '20+ acres',
        targetProfile: 'Individual, NRI or family-foundation estates seeking a living, carbon-rich soil as the basis of a high-value farm.',
        objectives: 'Restore a living, carbon-rich soil across the estate as the basis for a high-value farm, with measurable, reported outcomes.',
        deliverables: ['Detailed soil-health & SOC report', 'BEC supply @ ~2 T / acre / yr', 'Application + multi-season schedule', 'SOC / water / yield monitoring', 'Carbon documentation'],
        kpis: ['SOC %', 'Water retention', 'Input-cost saving', 'Yield response', 'Carbon locked'],
        sla: 'Platinum / Gold — fortnightly monitoring, detailed reporting',
        edition: 'Premier · per-acre remediation + BEC sales',
        model: 'Per-acre remediation service fee + BEC product sales',
        pricing: ['Soil diagnostics: ₹10,000–15,000 / site', 'Remediation: ₹35,000–45,000 / acre / yr', 'BEC: ₹18,000–25,000 / tonne', 'Carbon-credit revenue share (GF 20–30%)'],
        addons: ['Carbon-credit monetisation', 'Organic certification', 'Micro-nutrient customisation']
      },
      corporates: {
        size: 'Barren / degraded land · 100+ acres · ESG mandate',
        targetProfile: 'Corporates and PSUs with 100+ acres and an ESG / carbon mandate — optionally owning a biochar-BEC production unit.',
        objectives: 'Large-scale soil restoration as a measurable ESG / carbon outcome; optionally own a biochar-BEC unit; monetise carbon credits.',
        deliverables: ['Land-wide soil & carbon baseline', 'Large-scale BEC supply & application', 'Carbon MRV + verified credits', 'Optional turnkey biochar-BEC unit (47-SOP)', 'ESG / carbon audited report'],
        kpis: ['Acres restored', 'SOC uplift', 'tCO2e sequestered & credited', 'Biomass processed', 'Unit uptime'],
        sla: 'Platinum + steering committee',
        edition: 'Enterprise · managed service or turnkey unit',
        model: 'Remediation managed service or turnkey unit (licence + platform fee); outcome / carbon-linked',
        pricing: ['Remediation: ₹25,000–40,000 / acre / yr', 'Turnkey biochar-BEC unit: ₹1.5–3.5 Cr + AOC / tech licence (4% royalty + platform fee)', 'Carbon-credit revenue share (GF 20–30%)'],
        addons: ['Verified carbon credits', 'Biodiversity MRV', 'Biomass-supply-chain setup', 'Wood-vinegar co-products']
      },
      fpos: {
        size: 'Aggregated member farms',
        targetProfile: 'FPOs / village organisations seeking affordable, bulk soil-fertility restoration across member farms with local BEC access.',
        objectives: 'Affordable, bulk soil-fertility restoration across member farms; local BEC access; cluster carbon aggregation.',
        deliverables: ['Cluster soil assessment', 'Bulk BEC supply (subsidised)', 'Shared biochar-BEC unit / access', 'Farmer training on application', 'Cluster carbon aggregation'],
        kpis: ['Acres treated', 'BEC tonnes supplied', 'Yield / cost impact', 'Credits aggregated'],
        sla: 'Gold (cluster)',
        edition: 'Enterprise (Cluster) · blended finance',
        model: 'Blended finance + bulk BEC sales + carbon share',
        pricing: ['BEC (bulk): ₹15,000–20,000 / tonne', 'GF facilitation: ₹8,000–15,000 / acre', 'Shared unit via blended finance', 'Training grant / CSR-funded'],
        addons: ['Shared unit ownership', 'Export-grade BEC', 'GI / organic certification']
      },
      small: {
        size: '5–20 acres',
        targetProfile: 'Small landholders seeking affordable per-acre soil restoration with clear yield and cost benefits.',
        objectives: 'Affordable per-acre soil restoration with clear yield and input-cost benefits.',
        deliverables: ['Soil-health report', 'BEC supply & application', 'Multi-season schedule', 'Yield & cost tracking'],
        kpis: ['SOC %', 'Input-cost saving', 'Yield response'],
        sla: 'Gold (monthly)',
        edition: 'Professional · per-acre remediation + BEC',
        model: 'Per-acre remediation + BEC sales',
        pricing: ['Soil test: ₹5,000–10,000 / site', 'Remediation: ₹30,000–40,000 / acre / yr', 'BEC: ₹18,000–25,000 / tonne', 'EMI options'],
        addons: ['Carbon aggregation', 'Certification']
      },
      marginal: {
        size: '< 5 acres',
        targetProfile: 'Small & marginal farmers taking a low-cost first step to living soil through group purchase.',
        objectives: 'Low-cost first step to living soil — a soil test and BEC via group purchase.',
        deliverables: ['Basic soil test', 'BEC supply (group buy)', 'Application advisory (app / group)'],
        kpis: ['Yield uplift', 'Input-cost saving', 'Adoption'],
        sla: 'Silver (monthly group)',
        edition: 'Essential · group / FPO-aggregated',
        model: 'Group / FPO-aggregated; blended finance',
        pricing: ['Soil test: ₹1,500–3,000 / plot', 'BEC: ₹18,000–25,000 / tonne (group)', 'CSR / subsidy reduces net cost'],
        addons: ['Cluster carbon aggregation', 'Certification via FPO']
      }
    }
  },

  {
    key: 'farmland-design', code: 'S2', brand: 'Vasudha™', name: 'Farmland Design Service',
    badge: 'S2 · Vasudha™', category: 'Master-planning & design',
    tagline: 'Design every square foot — master planning, water, crop / tree design, biodiversity and the optional Nakshatra Vanam.',
    hero: '/assets/banner-farmland-design.png',
    highlights: ['Designed from contours & satellite imagery', 'Water flows where it should', 'Beautiful as well as productive', 'Optional astro-botanical Nakshatra Vanam'],
    overview: "Farmland Design Services (Vasudha™) converts a featureless, barren or under-used holding into a fully-designed, biodiverse, water-secure, revenue-diversified natural farm. Beginning from the site's contours and satellite image, we design the placement of every zone so that water flows where it should and the farm is beautiful as well as productive.",
    purpose: 'Design every square foot — master planning, water, crop / tree design and biodiversity, with an optional Nakshatra Vanam.',
    methodology: ['Discover — survey the land and understand goals, budget, timeline and (optionally) family Nakshatras', 'Design — master layout, planting scheme, water design and revenue-diversification plan, with visualisations', 'Validate — review with the client, iterate and finalise the design and estimates', 'Handover — issue drawings, bill of quantities and a development-ready package'],
    technology: ['GIS & contour mapping', 'Satellite imagery', '3D visualisation', 'Water / hydrology design tools', 'Vriksh Ayurveda species matrix'],
    timeline: [{ phase: 'Survey', duration: '1–2 weeks' }, { phase: 'Design', duration: '2–5 weeks' }, { phase: 'Review & iterate', duration: '~1 week' }, { phase: 'Handover', duration: 'By week 6' }],
    esg: ['Biodiversity-first layout', 'Water-secure design', 'Native & medicinal species', 'Beauty with productivity'],
    support: { title: 'Dedicated Design Consultant', text: 'Included review rounds, documented change requests and a final design walk-through.' },
    audiences: {
      individuals: {
        size: '20+ acres',
        targetProfile: 'Individual, NRI or family-foundation owners wanting a bespoke, beautiful, biodiverse farm design aligned to family goals.',
        objectives: "A bespoke, beautiful, biodiverse farm design aligned to the family's goals — optionally an astro-botanical Nakshatra Vanam.",
        deliverables: ['Survey report', 'Custom master layout + 3D visuals', 'Planting scheme + water design', 'Bill of quantities', 'Revenue-diversification plan', 'Nakshatra Vanam design (optional)'],
        kpis: ['Design coverage (per sq ft)', 'Biodiversity planned', 'Water-security index', 'Revenue streams designed'],
        sla: 'Premier — dedicated design consultant',
        edition: 'Premier · design-only or design + build',
        model: 'Fixed design fee; optional progression to development (S3)',
        pricing: ['Design: ₹20,000–35,000 / acre', '3D visualisation package (optional)', 'Nakshatra Vanam: ₹50,000–1,50,000'],
        addons: ['Nakshatra Vanam', '3D visualisation', 'Vastu-aligned water routing', 'Eco-stay / retreat design']
      },
      corporates: {
        size: 'Barren / degraded land · 100+ acres · ESG mandate',
        targetProfile: 'Corporates and PSUs master-planning large degraded parcels for scaled, auditable ESG restoration.',
        objectives: 'Master-plan large degraded parcels for scaled, phased and auditable ESG restoration.',
        deliverables: ['Land-wide survey & GIS baseline', 'Scaled master plan + phasing', 'Water & biodiversity design', 'Bill of quantities + development roadmap', 'ESG-aligned planting scheme'],
        kpis: ['Acres designed', 'Biodiversity planned', 'Water structures designed', 'Phasing milestones'],
        sla: 'Enterprise — steering-committee reviews',
        edition: 'Enterprise · design (optionally design + build)',
        model: 'Programme-based design fee; optional development mandate',
        pricing: ['Design: ₹12,000–25,000 / acre (scale-dependent)', 'GIS / drone survey add-on', 'Programme-priced per parcel'],
        addons: ['Drone survey', 'Biodiversity plan', 'Carbon-ready design']
      },
      fpos: {
        size: 'Aggregated member farms',
        targetProfile: 'FPOs needing standardised, replicable cluster design templates for member farms.',
        objectives: 'Standardised, replicable cluster design templates for member farms with shared water and agroforestry design.',
        deliverables: ['Cluster survey', 'Standardised plot-design templates', 'Shared water & agroforestry design', 'Training on layout', 'Aggregation-ready cropping plan'],
        kpis: ['Member plots designed', 'Template adoption', 'Cropping diversity'],
        sla: 'Gold (cluster)',
        edition: 'Enterprise (Cluster) · blended finance',
        model: 'Blended-finance funded template design',
        pricing: ['Template design: ₹8,000–15,000 / acre', 'Blended-finance / grant funded', 'Bulk cluster rates'],
        addons: ['Export-crop planning', 'Warehousing layout']
      },
      small: {
        size: '5–20 acres',
        targetProfile: 'Small landholders wanting an affordable custom design for a diversified, water-secure smallholding.',
        objectives: 'Affordable custom design for a diversified, water-secure smallholding.',
        deliverables: ['Site survey', 'Custom plot layout', 'Planting & water design', 'Bill of quantities'],
        kpis: ['Design coverage', 'Revenue streams designed', 'Water-security'],
        sla: 'Gold',
        edition: 'Professional · design or design + build',
        model: 'Fixed design fee; EMI options',
        pricing: ['Design: ₹15,000–30,000 / acre', 'EMI options'],
        addons: ['3D visualisation', 'Farm-stay layout']
      },
      marginal: {
        size: '< 5 acres',
        targetProfile: 'Small & marginal farmers accessing a low-cost standard plot-design template via group delivery.',
        objectives: 'Low-cost standard plot-design template via group delivery.',
        deliverables: ['Standard plot-design template', 'Group design workshop', 'Basic water & planting guidance'],
        kpis: ['Plots designed', 'Adoption rate'],
        sla: 'Silver (group)',
        edition: 'Essential · group-aggregated',
        model: 'Group-aggregated; CSR / subsidy supported',
        pricing: ['Template design: ₹3,000–8,000 / plot (group)', 'CSR / subsidy reduces net cost'],
        addons: ['Cluster template', 'FPO planting plan']
      }
    }
  },

  {
    key: 'farmland-operate', code: 'S3', brand: 'Sanjeevani™', name: 'Farmland Operate Service',
    badge: 'S3 · Sanjeevani™', category: 'Operations & management',
    tagline: 'Operate and manage the living farm — day-to-day cultivation, supervision, mechanisation and training that keep it thriving.',
    hero: '/assets/banner-farmland-operate.png',
    highlights: ['Trained ex-servicemen field teams', 'Natural, chemical-free operations', 'Run through the Agri-Operations Centre', 'Per-plot reporting & market handoff'],
    overview: 'Farmland Operate Services (Sanjeevani™) runs the developed farm day to day — cultivation, water, mechanisation, labour and supervision — through trained ex-servicemen teams and the Agri-Operations Centre, keeping the farm healthy, productive and profitable season after season.',
    purpose: 'Keep a developed natural farm thriving, productive and profitable — season after season.',
    methodology: ['Onboard — an operational audit of the developed farm and a season plan', 'Cultivate — natural cultivation, multi-cropping and water / mechanisation management', 'Supervise — resident / visiting ex-servicemen teams via the AOC', 'Protect — natural pest & disease management, no synthetic chemicals', 'Harvest & report — harvest cycles, per-plot reporting and market handoff'],
    technology: ['AOC dashboard & per-plot app', 'Drip irrigation & mechanisation', 'IoT sensors', 'Natural pest-management protocols', 'Farm-management software'],
    timeline: [{ phase: 'Onboarding', duration: '2–4 weeks' }, { phase: 'First season cycle', duration: 'One crop season' }, { phase: 'Stabilisation', duration: '~3 years' }, { phase: 'Ongoing operations', duration: 'Multi-year' }],
    esg: ['Chemical-free operations', 'Fair rural employment', 'Water-use efficiency', 'Reduced post-harvest loss'],
    support: { title: 'Seasonal Operations Manager', text: 'A named manager overseeing every crop cycle, with a documented escalation matrix and season reviews.' },
    audiences: {
      individuals: {
        size: '20+ acres',
        targetProfile: 'Individual, NRI or family-foundation owners wanting a hands-off, professionally operated estate with transparent reporting.',
        objectives: 'A hands-off, professionally operated estate with transparent per-plot reporting.',
        deliverables: ['Seasonal operating plan', 'Dedicated ex-servicemen supervisor', 'Natural cultivation & multi-cropping', 'AOC per-plot monitoring', 'Monthly reports + annual review', 'Branded produce sales'],
        kpis: ['Yield / acre', 'Farm profitability', 'Water saved', 'Cost / acre', 'Operational uptime'],
        sla: 'Platinum — weekly / resident supervision',
        edition: 'Premier · managed-operations subscription',
        model: 'Managed-service subscription and/or revenue-share',
        pricing: ['Managed-farm fee: ₹45,000–85,000 / acre / yr or 18–25% revenue-share'],
        addons: ['Agri-tourism', 'Carbon credits', 'Organic certification']
      },
      corporates: {
        size: 'Barren / degraded land · 100+ acres · ESG mandate',
        targetProfile: 'Corporates and PSUs needing SLA-linked, auditable operations at scale with ESG reporting.',
        objectives: 'SLA-linked, auditable operations at scale with ESG reporting.',
        deliverables: ['Scaled operating plan', 'Ex-servicemen & SHG workforce', 'ESG / CSR operations dashboard', 'MRV + audited annual report', 'Off-take / market linkage'],
        kpis: ['Acres under operation', 'Yield', 'Jobs sustained', 'tCO2e', 'Programme ROI'],
        sla: 'Platinum + steering committee',
        edition: 'Enterprise · outcome-based managed service',
        model: 'SLA / outcome-based; CSR / ESG-funded',
        pricing: ['Managed service: ₹30,000–60,000 / acre / yr or outcome-based', 'AOC platform: ₹8–25 L / yr'],
        addons: ['Verified carbon credits', 'Employee CSR visits', 'Branded produce']
      },
      fpos: {
        size: 'Aggregated member farms',
        targetProfile: 'FPOs seeking shared operations support and training across member farms.',
        objectives: 'Shared operations support and training across member farms.',
        deliverables: ['Cluster operating support', 'Shared resident agronomist', 'Farmer training', 'Shared AOC dashboard', 'Aggregation & market linkage'],
        kpis: ['Members supported', 'Yield uplift', 'Input-cost reduction', 'Price realisation'],
        sla: 'Gold (cluster) with a shared agronomist',
        edition: 'Enterprise (Cluster) · blended finance',
        model: 'Facilitation fee + revenue-share + membership',
        pricing: ['GF facilitation: ₹8,000–20,000 / acre + 5–10% revenue-share', 'Membership: ₹50,000–2,00,000 / FPO / yr'],
        addons: ['Warehousing', 'Micro-processing', 'Export facilitation']
      },
      small: {
        size: '5–20 acres',
        targetProfile: 'Small landholders wanting dependable managed operations with regular supervision.',
        objectives: 'Dependable managed operations with fortnightly supervision.',
        deliverables: ['Season operating plan', 'Fortnightly supervision', 'Natural cultivation', 'AOC dashboard + monthly reports', 'Produce marketing'],
        kpis: ['Yield / acre', 'Input-cost saving', 'Profitability', 'Water saved'],
        sla: 'Gold — fortnightly visits',
        edition: 'Professional · managed operations',
        model: 'Managed-service subscription',
        pricing: ['Managed fee: ₹35,000–60,000 / acre / yr or 15–20% revenue-share', 'EMI options'],
        addons: ['Agri-tourism', 'Carbon credits', 'Farm-stay']
      },
      marginal: {
        size: '< 5 acres',
        targetProfile: 'Small & marginal farmers accessing low-cost group operations support and advisories.',
        objectives: 'Low-cost group operations support and advisories.',
        deliverables: ['Group operating support', 'Shared supervision', 'App-based advisories', 'Group aggregation & sale'],
        kpis: ['Yield uplift', 'Adoption rate', 'Income increase'],
        sla: 'Silver — monthly group visit',
        edition: 'Essential · group-aggregated',
        model: 'Low fixed fee + commission on sales',
        pricing: ['Low fixed fee + 8–12% sales commission', 'CSR / subsidy reduces net cost'],
        addons: ['Carbon aggregation', 'Co-op agri-tourism']
      }
    }
  }
];

export const SERVICE_PAGES = {
  'managed-farmland': '/services/managed-farmland',
  'soil-fertility': '/services/soil-fertility',
  'farmland-design': '/services/farmland-design',
  'farmland-operate': '/services/farmland-operate'
};
