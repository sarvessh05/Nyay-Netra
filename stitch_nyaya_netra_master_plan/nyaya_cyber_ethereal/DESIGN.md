# Design System Strategy: The Luminescent Juris

## 1. Overview & Creative North Star: "The Digital Visionary"
This design system is built to bridge the gap between ancient legal wisdom and futuristic artificial intelligence. The Creative North Star, **"The Digital Visionary,"** moves away from the cold, clinical nature of traditional "Legal Tech" (usually flat, white, and rigid) and embraces a soulful, immersive dark-mode aesthetic. 

The experience is defined by **Intentional Depth**. We break the "template" look by using asymmetric layouts where content breathes within large negative spaces. Elements should feel like they are floating in a digital ether—achieved through overlapping glass layers, soft neon light leaks, and a typography scale that favors dramatic contrast between massive Display headers and tight, technical Label text.

---

## 2. Color & Atmosphere
The palette is rooted in a deep, cosmic navy, punctuated by high-energy primary tokens that simulate glowing light sources.

### Surface Hierarchy & The "No-Line" Rule
Traditional 1px borders are strictly prohibited for sectioning. We define boundaries through **Tonal Transitions**:
*   **The Foundation:** `surface` (#060e20) is the infinite backdrop.
*   **The Nesting Principle:** Use `surface-container-low` (#091328) for large content areas. Nested cards inside these areas must use `surface-container` (#0f1930) or `surface-container-high` (#141f38). 
*   **The Result:** Depth is perceived through "lifts" in brightness, not structural lines.

### Glass & Gradient Signature
To achieve the premium "Nyaya Netra" feel, main CTAs and Hero elements must use the **Signature Glow**:
*   **Linear Gradients:** Transition from `primary_dim` (#8a4cfc) to `secondary` (#53ddfc) at a 135° angle.
*   **Glassmorphism:** Floating panels use `surface_variant` at 40% opacity with a `24px` backdrop-blur. This allows the primary glows to bleed through the UI, creating a sense of "digital soul."

---

## 3. Typography: The Calligraphic Tech
The typography strategy juxtaposes the heritage of Law with the precision of AI.

*   **Display & Headline (Manrope):** Chosen for its geometric purity. Use `display-lg` for impactful landing statements to create a "High-End Editorial" feel.
*   **The Identity Exception:** The brand mark uses a custom Devanagari calligraphy for 'न्याय' (Nyaya), paired with `headline-lg` Manrope for 'Netra'. This high-contrast pairing should be mirrored in UI headers where possible.
*   **Body (Inter):** The workhorse. `body-md` is the standard for legal documents and AI insights, ensuring maximum readability against dark backgrounds.
*   **Labels (Plus Jakarta Sans):** Used for micro-copy and metadata. The increased letter-spacing in `label-sm` provides a technical, "HUD" (Heads-Up Display) aesthetic.

---

## 4. Elevation & Depth: Tonal Layering
We do not use drop shadows to indicate elevation; we use **Light Emission.**

*   **The Layering Principle:** Stacking follows the Material sequence. A `surface-container-highest` panel on a `surface` background creates a natural visual lift.
*   **Ambient Shadows:** For floating modals, use a shadow with a `64px` blur, `0%` spread, and 6% opacity using the `primary` token color. This mimics a soft purple neon glow rather than a grey shadow.
*   **The Ghost Border:** For accessibility on inputs, use `outline-variant` at 15% opacity. It should feel like a suggestion of an edge, caught by a stray light beam.

---

## 5. Components & Interactions

### Buttons: The Tactile Pulse
*   **Primary:** A gradient fill (`primary` to `secondary`). On hover, apply a `box-shadow` of 20px blur using `primary_fixed_dim` to create a "pulsing glow" effect.
*   **Tertiary:** No background or border. Text uses `secondary`. On hover, a subtle `surface-bright` background fades in (transition: 300ms cubic-bezier(0.4, 0, 0.2, 1)).

### Cards: The Frosted Slate
*   **Rule:** Forbid all divider lines.
*   **Structure:** Use `spacing-6` (2rem) as internal padding. Separate the header from the body using a background shift from `surface-container-high` to `surface-container`.
*   **Edge:** Use `rounded-md` (1.5rem) or `rounded-lg` (2rem) to maintain the organic, premium feel.

### Input Fields: The Focused Beam
*   **Default:** `surface-container-low` with a 10% `outline-variant` ghost border.
*   **Active State:** The border transitions to 100% opacity `secondary` blue, accompanied by a soft `secondary` outer glow.

### AI Insight Chips
*   **Visual:** Semi-transparent `primary_container` with a `label-md` Inter font. These should feel like physical "tags" floating over the glass surfaces.

---

## 6. Do’s and Don'ts

### Do:
*   **Use Asymmetry:** Place a large `display-md` headline on the left with significant `spacing-24` white space on the right to create an editorial look.
*   **Layer Surfaces:** Place a `surface-container-highest` search bar over a `surface-container-low` dashboard.
*   **Soft Transitions:** Every hover state must have a minimum 200ms transition. Snap-to-state interactions are forbidden.

### Don’t:
*   **Don't Use Pure White:** Never use #FFFFFF for text. Use `on_surface` (#dee5ff) to prevent eye strain and maintain the dark-mode immersion.
*   **Don't Use Solid Borders:** Avoid 1px #40485d borders. They flatten the design and make it look like a generic dashboard template.
*   **Don't Over-Glow:** Glows are for *interaction* (hover/focus) and *hierarchy* (primary CTAs). If everything glows, nothing is important.

### Accessibility Note:
While we utilize glassmorphism and low-contrast ghost borders, ensure all functional text meets WCAG AA standards by using the `on_surface_variant` and `primary` tokens against their respective containers. Depth should enhance the experience, never hinder the legibility of legal data.