// Species cultivated by Gratitude Farms, matched to the photographs in
// assets/trees/. Common names come from the image filenames supplied by the
// company; the botanical names are the standard binomials for those common
// names and should be confirmed against the nursery's own records before this
// is used as a procurement list.
//
// Notes describe traditional and ecological use only. They are not medical
// advice and make no therapeutic claim.

export const TREE_GROUPS = ['Sacred & Nakshatra', 'Medicinal', 'Fruit & Food', 'Timber & Utility'];

export const TREES = [
  { name: 'Peepal', botanical: 'Ficus religiosa', img: 'peepal.jpg', group: 'Sacred & Nakshatra',
    note: 'Among the most venerated trees in India. A prolific oxygen producer with a wide canopy that anchors a grove.' },
  { name: 'Banyan', botanical: 'Ficus benghalensis', img: 'banyan-tree.jpg', group: 'Sacred & Nakshatra',
    note: 'India’s national tree. Aerial roots form a spreading, self-supporting canopy that shelters entire ecosystems.' },
  { name: 'Ashoka', botanical: 'Saraca asoca', img: 'asoka-tree.jpg', group: 'Sacred & Nakshatra',
    note: 'A sacred flowering tree of temple gardens, long valued in traditional Indian medicine.' },
  { name: 'Shami', botanical: 'Prosopis cineraria', img: 'shami-tree.jpg', group: 'Sacred & Nakshatra',
    note: 'A drought-hardy nitrogen fixer of arid regions, held sacred and used as fodder and fuel.' },
  { name: 'Palash', botanical: 'Butea monosperma', img: 'palash.jpg', group: 'Sacred & Nakshatra',
    note: 'The “flame of the forest”. Brilliant orange blooms, traditional dye source, and a nitrogen-fixing legume.' },
  { name: 'Naga Kesar', botanical: 'Mesua ferrea', img: 'naga-kesar.jpg', group: 'Sacred & Nakshatra',
    note: 'Ironwood. Dense, slow-growing, with fragrant white flowers used in traditional preparations.' },
  { name: 'Kadamba', botanical: 'Neolamarckia cadamba', img: 'bur-flower-tree.jpg', group: 'Sacred & Nakshatra',
    note: 'Fast-growing with distinctive spherical orange flower heads. Frequently planted in sacred groves.' },
  { name: 'Cluster Fig', botanical: 'Ficus racemosa', img: 'cluster-fig.jpg', group: 'Sacred & Nakshatra',
    note: 'Gular. Fruits directly on the trunk and sustains birds and pollinators through the dry season.' },
  { name: 'Dye Fig', botanical: 'Ficus tinctoria', img: 'dye-fig.jpg', group: 'Sacred & Nakshatra',
    note: 'A strangler fig traditionally used as a dye source; valuable wildlife forage.' },
  { name: 'Bulletwood', botanical: 'Mimusops elengi', img: 'bulletwood.jpg', group: 'Sacred & Nakshatra',
    note: 'Bakul. Small, intensely fragrant flowers; evergreen and long-lived, common in temple courtyards.' },

  { name: 'Amla', botanical: 'Phyllanthus emblica', img: 'amla.jpg', group: 'Medicinal',
    note: 'Indian gooseberry. One of the most widely cultivated medicinal fruits in India and a cornerstone of Ayurveda.' },
  { name: 'Arjuna', botanical: 'Terminalia arjuna', img: 'arjuna-tree.jpg', group: 'Medicinal',
    note: 'A large riverside tree whose bark has a long history in traditional Indian medicine.' },
  { name: 'Saptaparni', botanical: 'Alstonia scholaris', img: 'devils-tree.jpg', group: 'Medicinal',
    note: 'Devil’s tree. Whorled leaves in sevens; bark used traditionally and the timber used for boards and blackboards.' },
  { name: 'Nux Vomica', botanical: 'Strychnos nux-vomica', img: 'nux-vomica.jpg', group: 'Medicinal',
    note: 'Strictly a controlled traditional preparation species — cultivated under supervision only.' },
  { name: 'Bael', botanical: 'Aegle marmelos', img: 'stone-apple.jpg', group: 'Medicinal',
    note: 'Stone apple. A sacred and medicinal fruit tree, extremely tolerant of poor soil and drought.' },
  { name: 'Khair', botanical: 'Acacia catechu', img: 'acacia-catechu-2.jpg', group: 'Medicinal',
    note: 'Source of katha. A hardy nitrogen-fixing acacia suited to degraded and eroded land.' },
  { name: 'Safed Khair', botanical: 'Acacia leucophloea', img: 'safed-khair.jpg', group: 'Medicinal',
    note: 'White-barked acacia of dry regions; fodder, gum and soil stabilisation on marginal ground.' },
  { name: 'Vetiver', botanical: 'Chrysopogon zizanioides', img: 'vetti.jpg', group: 'Medicinal',
    note: 'Not a tree but essential to our designs — deep root curtains hold soil, slow runoff and yield aromatic oil.' },

  { name: 'Mango', botanical: 'Mangifera indica', img: 'mango.jpg', group: 'Fruit & Food',
    note: 'The anchor orchard crop across our managed farmlands, with decades of productive life per tree.' },
  { name: 'Jackfruit', botanical: 'Artocarpus heterophyllus', img: 'jackfruit.jpg', group: 'Fruit & Food',
    note: 'Exceptional yield per tree and a staple of food-forest plantings; timber is valuable at end of life.' },
  { name: 'Jamun', botanical: 'Syzygium cumini', img: 'jamun.jpg', group: 'Fruit & Food',
    note: 'Indian blackberry. Fruit, shade and a strong groundwater-loving root system.' },
  { name: 'Mahua', botanical: 'Madhuca longifolia', img: 'mahua.jpg', group: 'Fruit & Food',
    note: 'A livelihood tree for forest communities — flowers, seed oil and reliable yield on poor soil.' },
  { name: 'Indian Jujube', botanical: 'Ziziphus mauritiana', img: 'indian-jujube.jpg', group: 'Fruit & Food',
    note: 'Ber. Fruits through the dry season on land where little else will crop.' },
  { name: 'Indian Plum', botanical: 'Flacourtia indica', img: 'indian-plum.jpg', group: 'Fruit & Food',
    note: 'Governor’s plum. A thorny, hardy hedge species that fruits well and shelters wildlife.' },
  { name: 'Hog Plum', botanical: 'Spondias pinnata', img: 'hog-plum.jpg', group: 'Fruit & Food',
    note: 'Amra. Tart fruit used in pickles and chutneys; grows quickly from cuttings.' },
  { name: 'Toddy Palm', botanical: 'Borassus flabellifer', img: 'toddy-palm.jpg', group: 'Fruit & Food',
    note: 'Palmyra. Sap, fruit, fibre and leaf — one of the most completely useful plants in South India.' },

  { name: 'Indian Rosewood', botanical: 'Dalbergia sissoo', img: 'indian-rosewood.jpg', group: 'Timber & Utility',
    note: 'Shisham. A nitrogen-fixing timber tree that grows fast and improves the soil beneath it.' },
  { name: 'Red Sanders', botanical: 'Pterocarpus santalinus', img: 'red-sanders.jpg', group: 'Timber & Utility',
    note: 'Endemic to the Eastern Ghats and highly prized. Cultivation and trade are legally regulated.' },
  { name: 'Indian Ebony', botanical: 'Diospyros ebenum', img: 'indian-ebony.jpg', group: 'Timber & Utility',
    note: 'Very slow growing, exceptionally dense heartwood — a genuine multi-generational asset.' },
  { name: 'Sal', botanical: 'Shorea robusta', img: 'raal.jpg', group: 'Timber & Utility',
    note: 'Raal. Durable structural timber and a resin traditionally used as incense.' },
  { name: 'Bamboo', botanical: 'Bambusa spp.', img: 'bamboo.jpg', group: 'Timber & Utility',
    note: 'Our fastest biomass producer — windbreaks, construction material and feedstock for biochar.' }
];

export const treeImage = t => `/assets/trees/${t.img}`;
