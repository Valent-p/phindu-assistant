---
name: Professional Modern Mobile
colors:
  surface: '#fcf8ff'
  surface-dim: '#ddd8e2'
  surface-bright: '#fcf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f7f2fc'
  surface-container: '#f1ecf6'
  surface-container-high: '#ebe6f1'
  surface-container-highest: '#e5e1eb'
  on-surface: '#1c1b22'
  on-surface-variant: '#474553'
  inverse-surface: '#312f37'
  inverse-on-surface: '#f4eff9'
  outline: '#787584'
  outline-variant: '#c9c4d5'
  surface-tint: '#5d4cbf'
  primary: '#5140b3'
  on-primary: '#ffffff'
  primary-container: '#6a5acd'
  on-primary-container: '#f0ebff'
  inverse-primary: '#c8bfff'
  secondary: '#005fac'
  on-secondary: '#ffffff'
  secondary-container: '#65a8fd'
  on-secondary-container: '#003c70'
  tertiary: '#763792'
  on-tertiary: '#ffffff'
  tertiary-container: '#9150ac'
  on-tertiary-container: '#fce6ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e5deff'
  primary-fixed-dim: '#c8bfff'
  on-primary-fixed: '#190064'
  on-primary-fixed-variant: '#4532a6'
  secondary-fixed: '#d4e3ff'
  secondary-fixed-dim: '#a4c9ff'
  on-secondary-fixed: '#001c39'
  on-secondary-fixed-variant: '#004884'
  tertiary-fixed: '#f8d8ff'
  tertiary-fixed-dim: '#ebb2ff'
  on-tertiary-fixed: '#320047'
  on-tertiary-fixed-variant: '#692984'
  background: '#fcf8ff'
  on-background: '#1c1b22'
  surface-variant: '#e5e1eb'
typography:
  display-lg:
    fontFamily: Manrope
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 42px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Manrope
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Manrope
    fontSize: 20px
    fontWeight: '700'
    lineHeight: 28px
  title-lg:
    fontFamily: Manrope
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
  body-lg:
    fontFamily: Manrope
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Manrope
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  label-md:
    fontFamily: Manrope
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  headline-lg-mobile:
    fontFamily: Manrope
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  base: 4px
  xs: 4px
  sm: 8px
  md: 16px
  lg: 24px
  xl: 32px
  2xl: 48px
  gutter: 16px
  margin: 20px
---

## Brand & Style
The design system is engineered for a professional yet approachable mobile experience. It targets a sophisticated audience that values efficiency and clarity. The aesthetic is rooted in **Modern Minimalism** with a focus on high-contrast readability and a "digital-first" air. 

The emotional response should be one of confidence and calm. By leveraging generous white space and a structured color palette, the UI avoids cognitive overload. The style utilizes subtle depth—moving away from flat design toward a more tactile, layered interface that feels responsive and premium.

## Colors
The palette is dominated by **Slate Blue**, which provides a professional anchor for the brand. **Accent Blue** is used for secondary interactive elements, while **Highlight Violet** is reserved for high-impact moments, notifications, or specific data visualizations.

- **Primary (#6A5ACD):** Main actions, active states, and branding.
- **Secondary (#4A90E3):** Supporting icons, links, and secondary buttons.
- **Tertiary (#9B59B6):** Special highlights and progress indicators.
- **Surface & Background:** A pure white background ensures maximum contrast for text, while the light grey surface creates subtle containment for cards and input groups.

## Typography
This design system utilizes **Manrope** for all text roles. Its modern, geometric construction and open counters ensure exceptional legibility on mobile displays.

Hierarchy is established through weight and scale rather than color. Headings use Bold or Extra-Bold weights to create clear entry points for the eye. Body text maintains a comfortable line height (1.5x) to ensure long-form reading is effortless. Labels use a slightly increased letter spacing and semi-bold weight to distinguish them from functional body text.

## Layout & Spacing
The layout follows a **Fluid Grid** model optimized for mobile devices. It utilizes a 4-column structure for phones and an 8-column structure for tablets. 

- **Margins:** A 20px horizontal margin is maintained on all screen edges to prevent content from feeling cramped.
- **Gutters:** A 16px gutter separates columns.
- **Vertical Rhythm:** Spacing is strictly based on a 4px baseline grid. Functional groups (like labels and inputs) use `sm` (8px) spacing, while distinct sections use `lg` (24px) or `xl` (32px) to provide breathable whitespace.

## Elevation & Depth
Depth is communicated through **Tonal Layers** and **Ambient Shadows**. 

1. **Base:** The primary background level (#FFFFFF).
2. **Surface:** Tonal containment using #F5F5F5 for secondary background areas.
3. **Elevated:** Cards and modals use a very soft, diffused shadow (Offset: 0, 4px; Blur: 20px; Color: #333333 at 6% opacity) to lift them from the background without creating visual noise.

Avoid harsh borders. Instead, use thin 1px strokes in a slightly darker grey (#E0E0E0) only when elements need explicit separation on a white background.

## Shapes
The design system employs a **Rounded** shape language. A standard radius of 12px (rounded-lg) is applied to all primary containers, cards, and large buttons. This specific radius strikes a balance between professional precision and approachable softness. Smaller elements like chips or checkboxes use a 4px (soft) or 8px radius to maintain consistency at scale.

## Components
- **Buttons:** Primary buttons feature a solid Slate Blue fill with white text. Secondary buttons use a Slate Blue outline or a subtle grey fill. Height is standardized at 48px or 56px for touch accessibility.
- **Input Fields:** Use a 12px corner radius and a light grey background (#F5F5F5) with a 1px border that turns Slate Blue upon focus.
- **Cards:** Elevate cards slightly with the ambient shadow defined in the Elevation section. They should have 16px to 20px of internal padding.
- **Chips:** Used for filtering or tagging, these feature a 32px height (pill-shape) and utilize the Accent Blue or Highlight Violet for active states.
- **Lists:** Clean, edge-to-edge layout with 16px vertical padding per item and a subtle divider (1px, #EEEEEE).
- **Navigation:** Bottom navigation bars should use a white background with 10% transparency and a backdrop blur for a modern, glass-like effect.