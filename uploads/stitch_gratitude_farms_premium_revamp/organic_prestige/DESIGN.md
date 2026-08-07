---
name: Organic Prestige
colors:
  surface: '#fcf9f4'
  surface-dim: '#dcdad5'
  surface-bright: '#fcf9f4'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f6f3ee'
  surface-container: '#f0ede8'
  surface-container-high: '#ebe8e3'
  surface-container-highest: '#e5e2dd'
  on-surface: '#1c1c19'
  on-surface-variant: '#414846'
  inverse-surface: '#31302d'
  inverse-on-surface: '#f3f0eb'
  outline: '#717976'
  outline-variant: '#c1c8c4'
  surface-tint: '#43655c'
  primary: '#01261f'
  on-primary: '#ffffff'
  primary-container: '#1a3c34'
  on-primary-container: '#83a69c'
  inverse-primary: '#aacec3'
  secondary: '#775a19'
  on-secondary: '#ffffff'
  secondary-container: '#fed488'
  on-secondary-container: '#785a1a'
  tertiary: '#162419'
  on-tertiary: '#ffffff'
  tertiary-container: '#2c392e'
  on-tertiary-container: '#93a394'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#c5eadf'
  primary-fixed-dim: '#aacec3'
  on-primary-fixed: '#00201a'
  on-primary-fixed-variant: '#2b4d44'
  secondary-fixed: '#ffdea5'
  secondary-fixed-dim: '#e9c176'
  on-secondary-fixed: '#261900'
  on-secondary-fixed-variant: '#5d4201'
  tertiary-fixed: '#d7e7d6'
  tertiary-fixed-dim: '#bbcbbb'
  on-tertiary-fixed: '#111e14'
  on-tertiary-fixed-variant: '#3c4a3e'
  background: '#fcf9f4'
  on-background: '#1c1c19'
  surface-variant: '#e5e2dd'
  forest-green: '#1A3C34'
  golden-highlight: '#C5A059'
  deep-olive: '#3C4A3E'
  warm-beige: '#F5F2ED'
  stone-white: '#FAFAF9'
  soft-emerald: '#2D5A27'
typography:
  display-hero:
    fontFamily: Source Serif 4
    fontSize: 72px
    fontWeight: '700'
    lineHeight: 84px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Source Serif 4
    fontSize: 48px
    fontWeight: '600'
    lineHeight: 56px
  headline-lg-mobile:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  headline-md:
    fontFamily: Source Serif 4
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: 32px
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 28px
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.1em
  button:
    fontFamily: Hanken Grotesk
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.05em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-max: 1440px
  gutter: 32px
  margin-desktop: 80px
  margin-tablet: 40px
  margin-mobile: 20px
  section-gap: 160px
---

## Brand & Style

The design system embodies "Modern Traditionalism"—a sophisticated fusion of ancestral agricultural wisdom and high-end Agri-Tech innovation. It is designed to evoke deep trust, environmental stewardship, and the disciplined excellence of its ex-servicemen founders. 

The visual style is **Editorial Minimalism** with **Tactile** accents. It leverages high-end SaaS aesthetics—precision, clarity, and fluid performance—while grounding them in an immersive, nature-inspired environment. The UI should feel like a premium digital monograph: spacious, authoritative, and deeply connected to the earth.

- **Immersive Narrative:** Heavy use of high-fidelity organic textures and "impact-story" layouts.
- **Precision Tech:** Clean, sharp functional elements that signal the advanced data and AI capabilities.
- **Sustainable Luxury:** A refined aesthetic that moves away from "budget" green-washing toward a "premium-harvest" feel.

## Colors

The palette is derived from deep forest canopies and sun-drenched harvests. It deliberately avoids artificial "neon" greens in favor of complex, desaturated earthy tones.

- **Primary (Forest Green):** Used for deep immersion, headers, and primary branding. It represents stability and the depth of natural soil.
- **Secondary (Golden Highlights):** Reserved for prestige moments, high-level CTAs, and accents that signify value and quality.
- **Neutral (Warm Beige & Stone):** These form the "canvas" of the design, providing a softer, more premium alternative to pure white.
- **Tertiary (Deep Olive):** Used for secondary UI elements, borders, and supportive iconography.

## Typography

The typographic strategy juxtaposes literary elegance with technical precision. 

- **Headlines:** Use **Source Serif 4** for its authoritative, editorial character. Large, high-contrast headings should feel like titles in a premium magazine.
- **Body:** **Hanken Grotesk** provides a sharp, contemporary "SaaS" clarity that balances the traditional serif headlines.
- **Technical Accents:** **JetBrains Mono** is used sparingly for data points, coordinates, and "AI Data" labels to highlight the Agri-Tech/Annotation side of the business.

## Layout & Spacing

The layout follows a **Fluid Editorial Grid**. It prioritizes breathability and asymmetrical balance to move away from standard corporate templates.

- **Generous Whitespace:** Section gaps are intentionally large (160px+) to allow the brand story to unfold without clutter.
- **The 12-Column System:** Content typically occupies 6-8 columns to maintain optimal reading lengths, with imagery occasionally breaking the grid for a dynamic feel.
- **Breakpoints:**
  - **Desktop (1440px+):** Wide margins, multi-column editorial layouts.
  - **Tablet (768px - 1024px):** Single column for text, reduced horizontal padding, maintains large section gaps.
  - **Mobile (<768px):** Stacked components with 20px side margins; font sizes scale down to maintain legibility.

## Elevation & Depth

Depth is conveyed through **Tonal Layering** and **Subtle Organic Shadows** rather than aggressive bevels.

- **Surface Tiers:** Use `Stone White` for the base background and `Warm Beige` or `Forest Green` for container surfaces to create natural separation.
- **Shadows:** Use extremely soft, long-spread shadows with a slight `Forest Green` tint (`rgba(26, 60, 52, 0.05)`) to make cards appear as if they are resting lightly on a surface.
- **Glassmorphism:** Use sparingly for navigation overlays or image captions to maintain a modern tech feel. Apply a high blur (20px) and low opacity (10-15%).

## Shapes

The shape language is **Organic & Refined**. 

- **Radii:** A consistent `0.5rem` (rounded) base is used for small elements, while cards and large containers use `1.5rem` (rounded-xl) to echo the soft curves found in nature.
- **Interactive Elements:** Buttons should feel tactile—either fully pill-shaped for "soft" actions or large-radius rectangles for "structural" actions.
- **Masking:** Use organic, pebble-like masks for secondary imagery to reinforce the natural farming theme.

## Components

- **Buttons:** 
  - *Primary:* Solid `Forest Green` or `Golden Highlight` with white or deep-green text. Large padding (16px 32px) and `rounded-xl` corners.
  - *Secondary:* Ghost style with a `1px` border in `Deep Olive` and a subtle hover lift.
- **Cards:** 
  - Borderless with soft tinted shadows. Backgrounds are either `Stone White` or very light `Warm Beige`. High internal padding (40px).
- **Input Fields:** 
  - Minimalist style. Underline or subtle 1px border. Focus states use `Golden Highlight` to denote value.
- **Chips/Labels:** 
  - Use the `label-caps` typography style. Backgrounds should be low-saturation versions of the brand colors (e.g., light olive or pale gold).
- **Impact Indicators:** 
  - Unique "Progress Rings" or data visualizations for the ex-servicemen impact story, using `Soft Emerald` to indicate growth and success.
- **Navigation:** 
  - A persistent, high-blur frosted header with `Forest Green` links that transition to `Golden Highlight` on hover.