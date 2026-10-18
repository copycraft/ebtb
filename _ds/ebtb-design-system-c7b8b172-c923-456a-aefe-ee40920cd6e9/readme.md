# EBTB Design System

**EBTB — "everything but the bagel."** A small-batch seasoning brand: the everything-bagel topping, jarred and sold on its own. Direct-to-consumer, one hero product with variants (blends, refill pouches, gear, bundles) plus a subscription programme, the **Spice Club**.

The brand voice is loud, food-obsessed and self-aware — it exists because the topping is the best part of the bagel. Everything in this system should feel like a sticker on a jar: chunky type, saturated colour blocks, hard-edged shadows, no gloss.

## Sources I was given

| Source | What it was | What I took from it |
|---|---|---|
| `uploads/25f23e32fd381d38340ae77414a2cd72.jpg` | Screenshot of the **Myna** snacks site | Chunky rounded display type on a saturated field, outlined product cards, pill CTAs, top announcement ticker |
| `uploads/0dbe6e854f011ffff41b51aaca293e43.jpg` | Screenshot of the **Just Salad** site | Full-bleed colour hero split with food photography, marquee claim bar between bands, colour-block product tiles with mono spec rows |
| `uploads/a1689be7fa1613e43eb251a8fd8b6f42.jpg` | Screenshot of the **Feastie** festival site | Hard offset "sticker" shadow on display type, arch photo crops, tilted sticker badges, high-contrast colour pairs |
| `uploads/9d0dc969f0ee87bd32716b01800aa034.jpg` | Screenshot of **Solar Pop Studio** | Warm cream base, blob/arch shapes, coloured icon chips |
| Brief | "we sell everything but the bagel spice, and i want to make a design system for it" | Product model, naming, tone |

**Important:** these four files are *reference/mood material for other companies' sites*, not EBTB assets. **No EBTB logo, photography, font files, Figma file or codebase was supplied.** Everything here is an original system built in the spirit of that reference material. Nothing was copied from those brands' marks or type.

- **No logo exists.** Wherever a mark would go, the name is set in display type (see `guidelines/brand-wordmark.card.html`). Do not invent a symbol.
- **No photography exists.** The `Photo` component renders labelled placeholders, and each label states the shot needed.

## Index

| Path | What's there |
|---|---|
| `styles.css` | Global entry — imports only. Consumers link this one file. |
| `tokens/` | `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `radius.css`, `shadow.css`, `motion.css`, `base.css` |
| `components/core/` | `Button`, `IconButton`, `Icon`, `Badge`, `Tag`, `Card`, `SectionHeading`, `Photo`, `Marquee` |
| `components/forms/` | `Input`, `Select`, `Checkbox`, `Radio`, `Switch`, `QuantityStepper` |
| `components/commerce/` | `ProductCard`, `SpecStrip`, `CartLine`, `PriceTag` |
| `components/feedback/` | `Dialog`, `Toast`, `Tooltip` |
| `components/navigation/` | `NavBar`, `Tabs`, `Footer` |
| `ui_kits/storefront/` | Shop: home, collection, PDP, cart drawer (click-through `index.html`) |
| `ui_kits/spice-club/` | Subscription member dashboard: deliveries, blends, account |
| `guidelines/*.card.html` | 19 foundation specimen cards (Colors, Type, Spacing, Brand) |
| `thumbnail.html` | Homepage tile |
| `SKILL.md` | Agent Skills front-matter for use outside this project |

Every component has a sibling `.d.ts` (props contract) and `.prompt.md` (what & when, usage snippet). Read the `.prompt.md` before using a component.

### Intentional additions
- **`Icon`** — a Lucide wrapper. The brief supplied no icon set, so one wrapper keeps every glyph consistent and tintable.
- **`Photo`** — a placeholder-capable image frame, because no photography exists yet. It doubles as an art-direction brief.

---

## CONTENT FUNDAMENTALS

**The voice.** Confident, food-first, dryly funny. EBTB knows its whole business is a joke premise taken seriously, and leans in — the humour comes from commitment, never from puns about bagels being sad.

**Person.** Talk to the customer as *you*; talk about the company as *we*. "We toast it, we grind it, we jar it." "Add $8.20 to skip the flat rate." Never third-person corporate ("EBTB believes…").

**Casing.**
- Display headlines: **sentence case**. "Everything but the bagel", "Sprinkle responsibly", "Pick what turns up next".
- Buttons, tags, eyebrows, badges, toast titles, labels: **UPPERCASE** with wide tracking.
- Product names: **UPPERCASE** in Archivo Expanded on cards; sentence case in body copy.
- Never Title Case Every Word. Never ALL CAPS in a sentence of body copy.

**Length.** Headlines ≤ 5 words. Body paragraphs 1–2 sentences, max ~30 words. Button labels 1–3 words, verb-first ("Shake it on", "Skip next", "Copy your link"). Badge copy 1–4 words.

**Numbers are facts, set in mono.** Prices, weights, dates, ingredient counts and card digits always render in DM Mono, em-dash separated: `$12.00 — 2.3 OZ — 6 INGREDIENTS — 0 BAGEL`. Marketing claims never go in mono.

**Signature moves.**
- The "no bagel" gag, stated deadpan: "Zero bagel." "0 BAGEL." "Anything that isn't a bagel."
- Verb-as-CTA: "Shake it on", "Sprinkle responsibly", "Refill, don't rebuy".
- Confirmations get personality, bodies stay factual: title "IN THE BAG", body "Everything Blend ×2 added."
- Empty states are deadpan: "Nothing in here yet. Suspicious."

**Never.** Emoji (not in UI, not in marketing copy — the sticker badges do that job). Exclamation stacking. "Delicious", "artisanal", "elevate", "journey". Wellness language or health claims beyond plain fact ("six ingredients", "vegan", "kosher"). Fake scarcity.

---

## VISUAL FOUNDATIONS

**The idea.** A sticker stuck on a jar. Flat saturated colour, ink outlines on everything, hard offset shadows with zero blur, chunky rounded display type. Warm and pantry-ish, never neon or futuristic.

**Colour.** Base is warm cream (`--sesame-200` #F6ECD9) with poppy-seed ink (`--poppy-800` #241C33) for text *and every border*. Four saturated accents carry the identity: **blaze** #FF4A1E (primary action, the loudest thing on any page), **garlic** #F7A81B, **onion** #6B3FD4, **scallion** #A8D45A. Rules: one primary blaze action per view; two background colours per page band maximum; never gradient a brand colour; never place blaze on onion. Tints (`*-100`) back toasts and selected states only, never large fills. Approved fill/text pairings are in `guidelines/colors-pairings.card.html`.

**Type.** Three roles. Display = **Bagel Fat One** (chunky rounded, sentence case, 0.92 leading, −0.02em tracking, never below 32px). Headline/UI = **Archivo Expanded** black, uppercase, for product names and card titles. Body = **Archivo** at 16/19px, 1.5 leading, 62ch measure. Numbers = **DM Mono**. Max two type sizes per card. Display type may sit on colour but never on photography without a solid block behind it.

**Spacing & layout.** 4px base scale; 16/24/32 do most of the work. Page gutter is fluid `clamp(16px,4vw,56px)`; vertical band rhythm `clamp(48px,7vw,112px)`; grids use a flat 20px gap and a 1360px max content width. Layout is banded — full-width horizontal bands stacked, each with its own background, separated by 2px ink rules or a marquee. Product grids are 4-up desktop, 2-up tablet, 1-up mobile. Nothing is sticky except the nav bar; no floating action buttons, no fixed side rails.

**Backgrounds.** Solid colour blocks, full-bleed, edge to edge — that is the system. No gradients anywhere. No noise or grain overlays. No repeating patterns except the 45° hatch inside photo placeholders. Optional arch shapes behind hero imagery. Photography is full-bleed within its band or cropped into a shape; it never fades out at the edges.

**Imagery direction.** Warm daylight, hard-ish shadows, high saturation, tight crops on food and hands. Props are everyday kitchen (eggs, tomatoes, cutting boards) — never styled marble slabs. No black and white, no cool-toned or desaturated shots, no grain filters. Crops: rounded (20px), **arch** (`--radius-arch`, hero/story), circle (product on colour), square (full-bleed bands). Every photo carries the 2px ink outline.

**Borders.** 2px solid ink is the default on every card, control, badge and photo. 1.5px sesame hairlines separate rows *inside* a container. 3px ink only at display scale (large hero blocks). Borders are never coloured except the blaze outline on a selected radio panel; never dashed except in specimen diagrams.

**Shadows.** Hard offset only — `2px/4px/7px` ink offsets, no blur, no opacity. Cards get `--shadow-sticker` (4px); small controls 2px; hover on clickable cards grows to 7px and shifts the card up-left 3px. The single exception in the whole system is `--shadow-overlay`, a soft blurred shadow used *only* by `Dialog`, which lifts off the page. No inner shadows, ever.

**Corner radii.** Pill (999px) for every button, badge, tag, input, tooltip and switch. 20px for cards, 32px for large panels and dialogs, 12px for nested blocks, 6px for the checkbox — the only square-ish control, so it can't be confused with a radio.

**Hover states.** Filled buttons darken (brightness 0.94); ghost buttons pick up a cream wash; clickable cards grow their shadow and lift 3px up-left; nav links and tags fill ink; icon buttons keep their shadow and darken. Opacity is never used for hover.

**Press states.** Controls translate +2px x/y *into* their shadow, which shrinks to 1px — the element physically presses into the page. Nothing scales down, nothing changes colour on press.

**Focus.** 3px `--focus-ring` (onion) outline, 2px offset. Always visible, never removed.

**Motion.** Short and snappy: 120ms for control feedback, 220ms for state changes, on `--ease-snap` (cubic-bezier(.2,.9,.25,1)). `--ease-pop` (slight overshoot) for things that *appear* — badges, toasts, the switch knob. Linear easing exists only for marquees (26–34s loops). No parallax, no scroll-jacking, no long fades, no bouncing page elements. Respect `prefers-reduced-motion` by pausing marquees.

**Transparency & blur.** Almost never. Two sanctioned uses: the ink scrim behind a dialog (`--scrim-ink`, 55% + 3px backdrop blur), and reduced-opacity text inside ink footers/marquees. No frosted-glass nav, no translucent cards, no protection gradients over images — if text must sit on a photo, put it in a solid capsule or a colour block instead.

**Cards.** Cream or paper fill, 2px ink outline, 20px radius, 4px hard shadow, 20–24px padding. Media inside a card goes edge to edge on a coloured panel with its own 2px bottom rule. Nested cards drop their shadow. Coloured card tones (blaze/onion/garlic/scallion) are for editorial and promo blocks — never for product tiles, where the colour lives in the media panel instead.

**Signature devices.** (1) The **marquee band** — a scrolling uppercase claim ticker used as a divider between page bands and as the top announcement strip. (2) **Tilted sticker badges** (−8°…8°) on cards and packs. (3) The **mono spec strip** — hairline-ruled fact row. (4) Oversized display wordmark in the footer, set in garlic on ink.

---

## ICONOGRAPHY

**No icon set was supplied**, so the system standardises on **Lucide** — outline, 2px stroke, rounded caps — which matches the brand's ink-outline geometry better than any filled set. **This is a flagged substitution:** if EBTB has its own glyphs, replace them and keep the `Icon` API.

- Icons load per-glyph from the Lucide CDN (`https://unpkg.com/lucide-static@0.441.0/icons/<name>.svg`) and are applied as a CSS mask, so they inherit `currentColor`. No icon font, no sprite sheet, no local SVG files — nothing to copy in, nothing to keep in sync.
- Always go through `<Icon name="…" />`. Never inline hand-drawn SVG paths.
- Sizes: 16px inline with body text, 18–20px in buttons and rows, 22px standalone in a chip.
- Icons are always monochrome ink (or the surface's text colour). Never multicolour, never filled, never in a coloured circle unless it's the 44px garlic-tint chip used in value rows.
- Common glyphs: `shopping-bag`, `x`, `plus`, `minus`, `check`, `chevron-down`, `arrow-right`, `truck`, `leaf`, `package`, `refresh-cw`, `heart`, `calendar`, `receipt`, `instagram`, `youtube`, `mail`.
- **Emoji are never used** — not in UI, not in copy. The ✳ asterisk in marquee separators is the one decorative Unicode character in the system.

---

## Fonts — flagged substitution

No font files were provided. These are Google Fonts stand-ins loaded from the CDN in `tokens/fonts.css`:

| Role | Using | Why |
|---|---|---|
| Display | **Bagel Fat One** | Chunky rounded weight matching the reference display type (and the name is on the nose) |
| Headline | **Archivo Expanded** 800/900 | Wide uppercase grotesque for product names |
| Body / UI | **Archivo** 400–700 | Neutral companion, same family as the headline |
| Numbers | **DM Mono** | Reads as label/packaging data |

**If EBTB owns licensed type, send the files** and I'll swap the `@font-face` rules — nothing else in the system needs to change.
