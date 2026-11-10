# IMAGES_NEEDED.md — HYDRELEX LIFT SYSTEMS

This document lists all image assets for the HYDRELEX LIFT SYSTEMS corporate website.
All image slots currently render deliberate, high-contrast dark graphite (`#141416`) fallback blocks with animated or hand-drawn forged copper (`#E8782E`) and brushed steel (`#C9CDD2`) line-art SVGs (1.5–2px strokes) and technical typography so the site looks premium and finished with zero stock photography.

When real photography is ready, place the corresponding image files in `client/public/images/` or upload them via the Admin Portal. Real photos in `/public/images/` automatically take precedence when present and receive a dark gradient overlay to guarantee text contrast.

---

## 1. Hero & Brand Slots
| Slot / Filename | Recommended Format | Aspect Ratio | Dimensions (Min) | Subject Description | Fallback Behavior |
|---|---|---|---|---|---|
| `hero-lift-lobby.webp` | WebP / PNG | 16:9 | 2560 × 1440 | Architectural passenger elevator in high-end modern lobby or atrium with dramatic lighting. | Full-screen 55/45 split with full-height animated traveling SVG lift shaft (`HeroLiftShaftAnimated.tsx`), digital floor HUD indicator (G, 1, 2, 3, 4), and copper radial glow (`rgba(232,120,46,0.35)`). |
| `about-facility.webp` | WebP / PNG | 4:5 or 1:1 | 1600 × 2000 | Heavy elevator fabrication and assembly line or engineering design desk in Sriperumbudur. | Full-bleed graphite blueprint cross-section panel (`BlueprintShaftView.tsx`) with dimension lines and millimeter datum callouts. |

---

## 2. Product / System Showcase Slots (6 Core Systems)
| Slot / Filename | Recommended Format | Aspect Ratio | Dimensions (Min) | Subject Description | Fallback Line-Art SVG |
|---|---|---|---|---|---|
| `product-passenger.webp` | WebP / PNG | 4:5 or 16:10 | 1600 × 2000 | Interior or entrance of a luxury passenger elevator cabin (stainless steel / glass). | Architectural passenger cabin frame in steel and copper strokes with ceiling spot lights. |
| `product-goods.webp` | WebP / PNG | 16:10 | 1920 × 1200 | Heavy-duty industrial freight lift with steel checker plate floor and forklift loading entry. | Heavy goods lift structural chassis with reinforced uprights and guide shoes. |
| `product-hydraulic.webp` | WebP / PNG | 4:3 | 1600 × 1200 | Direct or indirect hydraulic lifting ram cylinder and pump power unit. | Precision electro-hydraulic cylinder and piston rod assembly. |
| `product-scissor.webp` | WebP / PNG | 4:3 | 1600 × 1200 | Industrial hydraulic scissor lift table / dock leveling platform in operation. | Heavy pantograph scissor linkage with dual lifting rams. |
| `product-panoramic.webp` | WebP / PNG | 4:3 | 1600 × 1200 | Custom curved glass panoramic observation elevator ascending through an atrium. | Semi-circular architectural glass capsule lift framework. |
| `product-modernization.webp` | WebP / PNG | 4:3 | 1600 × 1200 | VVVF inverter controller electrical cabinet and permanent magnet gearless motor. | High-efficiency permanent magnet gearless machine and inverter drive schematic. |

---

## 3. Project Gallery Slots
| Slot / Filename | Recommended Format | Aspect Ratio | Dimensions (Min) | Subject Description | Fallback Line-Art SVG |
|---|---|---|---|---|---|
| `project-1.webp` | WebP / PNG | 16:10 | 1600 × 1000 | Commercial passenger elevator installation at a corporate complex. | Passenger lift line-art blueprint. |
| `project-2.webp` | WebP / PNG | 4:3 | 1400 × 1050 | High-capacity freight lift installed in an industrial warehouse facility. | Industrial freight lift line-art blueprint. |
| `project-3.webp` | WebP / PNG | 16:10 | 1600 × 1000 | Heavy hydraulic scissor platform in manufacturing plant. | Scissor lifting platform line-art blueprint. |
| `project-4.webp` | WebP / PNG | 4:3 | 1400 × 1050 | Custom panoramic glass elevator in an executive building. | Panoramic capsule line-art blueprint. |
| `project-5.webp` | WebP / PNG | 16:10 | 1600 × 1000 | VVVF inverter modernization retrofit of older traction system. | Inverter drive controller line-art blueprint. |
| `project-6.webp` | WebP / PNG | 4:3 | 1400 × 1050 | Precision hydraulic goods platform at logistics dock. | Hydraulic cylinder line-art blueprint. |

---

## 4. Logo Assets (Verified Existing)
- `client/public/logo_original.png` — Original company emblem and wordmark.
- `client/public/logo_transparent.png` — High-resolution transparent background logo (210×60 rendered, naturalWidth 210px).
