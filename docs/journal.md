# Constructarium — Development Journal

## 10.04.2026
Research on Construction Grammar (CxG) and construction types. Reviewed foundational literature (Goldberg 1995, 2005, 2009; Kay & Fillmore 1999; Jackendoff 1997). Decided to scope the prototype at **12 constructions** covering five clusters: argument structure, motion-activity, fixed pragmatic, clause-combining, and NP-internal.

## 11.04.2026
Searching for construction examples in the literature, compiling and annotating them.

## 12.04.2026
Adding examples from the COCA corpus (Corpus of Contemporary American English) where specific examples couldn't be found in the literature. Sourced 49 total examples: 37 unannotated (to be completed post-prototype), 12 with initial annotations. 

## 13.04.2026
**Data model finalized.** 
Discussion on best data formats for the project:
Completed CSV → JSON conversion for all data files:
- `constructarium_constructions.json` (12 constructions with form, meaning, notes)
- `constructarium_examples.json` (49 corpus and literature examples)
- `constructarium_cross_construction_set.json` (11 entries across 2 verb sets: slice_set, cook_set)
- `constructarium_contrastive_pairs.json` (5 pre-authored pairs from slice_set)
- `constructarium_inheritance.json` (DAG of 12 nodes, 7 edges; 3 relation types)
- `constructarium_references.json` (10 unique bibliographic entries; replaced old sources.csv)

**Design specification completed.** Seven pages spec'd with must-have and nice-to-have features:
1. Home (entry points)
2. Construction Index (12 constructions grouped by cluster)
3. Construction Detail (full breakdown per construction)
4. Comparison View (guided contrasts, 5 pairs)
5. Inheritance Network (interactive DAG visualization)
6. Verb Explorer (2 verb sets across constructions)
7. About / Sources (project description, bibliography)

**Visual design skeched.** Typography (Lora / Inter / JetBrains Mono), colour palette (warm neutrals + cluster-based colours), and layout grid documented. 

**Open questions** documented: tech stack selection (framework vs. plain JS), graph library choice (D3-force / Cytoscape.js / vis-network), routing approach (SPA vs. multi-page), and isolated node layout strategy for inheritance graph.

**Prototype implementation started.**
- Built semantic HTML framework in `index.html`: header/nav, Home, Construction Index, Construction Details, Comparison View, Inheritance Network, Verb Explorer, About / Sources.
- Expanded HTML from placeholders to a full static prototype with all construction detail articles and real content.
- Added beginner-friendly inline comments in HTML for ARIA, landmarks, repeated lists, and structural wrappers.
- Added base CSS in `css/style.css`: colour tokens, typography defaults, spacing, section panels, table styling.
- Implemented project typography system: Lora for headings, Inter for body/UI text, JetBrains Mono for notation.
- Styled major page areas step by step: navigation, reusable cards/lists, construction sections, comparison view, verb explorer, home, inheritance, responsive behavior, hover/focus states, and final visual polish.
- Reorganized CSS comments into beginner-friendly numbered sections for easier explanation.
- Added minimal JavaScript in `js/app.js` only where it was necessary for the prototype: interactive comparison switching and verb-set switching.
- Upgraded key prototype areas to data-driven rendering from JSON: Comparison View, Verb Explorer, and Inheritance Network now load from files in `data/`.
- Implemented a lightweight inheritance graph as inline SVG generated from `constructarium_inheritance.json` plus construction metadata.

## 17.05.2026
**JavaScript rewritten from scratch.**
The previous `js/app.js` — which included interactive comparison switching, verb-set switching, and an inline SVG inheritance graph generated from `constructarium_inheritance.json` — was removed entirely. The inline SVG approach to the inheritance network was set aside as too complex for this stage of the prototype.

A new `app.js` was written step by step, learning each concept before moving to the next:

- **Data loading:** all five JSON files (`constructions`, `references`, `contrastive_pairs`, `cross_construction_set`, `inheritance`) are fetched with `async`/`await` inside a `DOMContentLoaded` listener, so the page is fully loaded and all data is available before any rendering begins.
- **References (About page):** `references.json` is iterated with `forEach`; a `<li>` element is created per entry and appended to `#reference-list`, formatting author, year, and title from separate JSON fields.
- **Comparison View:** `contrastive_pairs.json` populates the clickable pair list. Each list item has a click event listener that resolves `construction_id_a/b` to human-readable names via `.find()` on `constructions`, sets the example sentence text and its anchor `href` (converting underscores to hyphens to match HTML anchor IDs), and fills in the contrast type and explanation.
- **Verb Explorer:** `new Set()` on a `.map()` of `set_id` values produces the two unique verb sets (slice, cook) without duplicates. Each set gets a clickable list item that toggles section visibility via the `hidden` property. A `fillSetTable()` function builds table rows by resolving `construction_id` → construction name and `source` → `author (year)` using `.find()` on the already-loaded datasets.

Documented the concept and structure of `app.js` in `docs/app-concept.md`.

## 20.06.2026
**Inheritance Network graph implemented.**

**Data fixes in `constructarium_inheritance.json`:**
- Clarified two-system edge naming convention: `parent`/`child` for strictly hierarchical relations (instance, metaphorical_extension); `source`/`target` for non-hierarchical relations (construal_variant, related_to, subpart, polysemy, motivates).
- Fixed one `instance` edge (ditransitive_cxn → ditransitive_transfer_cxn) that was incorrectly using `source`/`target`.
- Removed the `related_to` edge from `intransitive_cxn` → `caused_motion_cxn`, which created a cycle incompatible with the DAG requirement.
- Added four ditransitive sub-sense nodes: `ditransitive_transfer_cxn`, `ditransitive_enablement_cxn`, `ditransitive_promise_cxn`, `ditransitive_refusal_cxn`.

**Four matching entries added to `constructarium_constructions.json`** so all graph nodes resolve to human-readable names.

**New file `js/graph.js`** implements the interactive inheritance graph using Cytoscape.js with the dagre layout plugin (loaded via CDN). Key steps:
- Loads `constructarium_inheritance.json` and `constructarium_constructions.json` via the `loadJSON()` helper.
- Normalises `parent`/`child` edge fields to `source`/`target` in JavaScript before passing data to Cytoscape.
- Generates a unique edge ID from the normalised source, target, and relation. This fixed duplicate IDs caused by the previous fallback expression, which could make Cytoscape omit edges.
- Resolves node IDs to human-readable names via `.find()` on `constructions`.
- Renders nodes as rounded rectangles with cluster-coloured backgrounds matching the design palette.
- Replaced the initial `breadthfirst` layout with dagre so the inheritance structure is displayed as a layered 2D hierarchy. The layout runs top-to-bottom, with `rankSep` and `nodeSep` set for readable spacing.
- Increased node dimensions and enabled label-aware layout calculations. Long construction names now wrap inside the nodes, remain horizontally and vertically centred, and no longer overlap neighbouring labels.
- Tested the graph through a local web server; the project can be run with the Python HTTP server or VS Code Live Server as documented in `README.md`.

**Graph styling in `css/style.css`:**
- Increased the graph container height from a minimum of 220px to a fixed 500px so the multi-level hierarchy has enough vertical space.

**`index.html` additions:**
- CDN script tags for cytoscape, dagre, and cytoscape-dagre added before `app.js`.
- Added `<script src="js/graph.js"></script>`.
- Added a "Senses" section to the Ditransitive Construction detail block, listing all four senses (Transfer, Enablement, Promise, Refusal) with examples and references from Goldberg 1995.

**Minor `app.js` improvements:**
- Introduced a `loadJSON(file_path)` helper function, replacing five repetitive fetch/parse pairs with single-line calls.
- Changed the verb-set link element from `<a>` to `<span>` to accurately reflect its role.

## 15.05.2026
**Visual redesign.** Replaced the warm-academic aesthetic with a cleaner, more modern look:
- **Colour palette:** warm off-white and brown tones replaced with cool lavender-neutral background (`#F5F4F8`) and violet-tinted border/text colours. Cluster colours updated to accessible pastels (blue, green, rose, violet, amber) with richer accent shades for headings and borders (all WCAG AA compliant). Dark amber (`#B06000`) as the interactive accent throughout.
- **Construction cards:** now display a full pastel tint background per cluster with a 4px coloured left border stripe. Fixed 3-column grid (2 on medium screens, 1 on mobile) so card rows are always consistent. Cards stretch to equal height within each row (`height: 100%`). Fixed a `li + li { margin-top }` inheritance bug that caused the first card in each row to sit above its neighbours.
- **Typography:** replaced Lora (serif) with Plus Jakarta Sans (geometric sans-serif) for headings. Heading weight increased to 600. Border-radius tightened from 0.35rem to 0.25rem for a crisper look.
- **Header:** full-width sticky violet bar (`#2E1A6E`), white wordmark at weight 700, white nav items at 88% opacity. Hover turns links to light amber. Nav items no longer underlined. Font size and item spacing increased.
- **Home entry points:** "Explore the Project" cards replaced with pill-shaped navigation buttons (violet fill, white text, amber on hover) in a flex row.
- **Scroll behaviour:** removed `scroll-behavior: smooth`; anchor links now jump instantly.

## 21.06.2026
**CSS rewritten mobile-first. References fixed and expanded.**

`css/style.css` was restructured so that all base styles target mobile viewports first, with `min-width` media queries progressively widening the layout. This replaces the previous approach where desktop styles were the default and small screens were overrides.

**Reference fixes in `app.js` and `index.html`:**
- Corrected formatting of rendered reference entries (author, year, title, source now display consistently).
- Expanded the reference list in `constructarium_references.json` to cover all sources cited in the newly added Ditransitive senses section.
- Inline citations in `index.html` updated to match the expanded reference data.

**Two navigation fixes:**
- `scroll-margin-top` on `section` and `article` increased from `1rem` to `4.5rem` so that anchor links no longer land underneath the sticky header.
- Mobile menu now closes automatically when a nav link is clicked: `app.js` selects all `<a>` elements inside `#primary-nav-list` with `querySelectorAll` and attaches a click listener to each that removes the `nav-open` class and resets `aria-expanded` to `"false"`.

**Mobile improvements to the inheritance graph:**
- `#inheritance-graph` in `css/style.css`: base height reduced to `250px` (mobile), overridden to `500px` inside the `min-width: 680px` media query. Cytoscape renders to a canvas, so horizontal scrolling is not possible — a shorter container is more appropriate for small screens.
- `js/graph.js`: Added `minZoom: 0.3` and `maxZoom: 2.5` to the Cytoscape configuration. This allows users to zoom out far enough to see the full graph on small screens and zoom in to read labels.

