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

## 15.05.2026
**Visual redesign.** Replaced the warm-academic aesthetic with a cleaner, more modern look:
- **Colour palette:** warm off-white and brown tones replaced with cool lavender-neutral background (`#F5F4F8`) and violet-tinted border/text colours. Cluster colours updated to accessible pastels (blue, green, rose, violet, amber) with richer accent shades for headings and borders (all WCAG AA compliant). Dark amber (`#B06000`) as the interactive accent throughout.
- **Construction cards:** now display a full pastel tint background per cluster with a 4px coloured left border stripe. Fixed 3-column grid (2 on medium screens, 1 on mobile) so card rows are always consistent. Cards stretch to equal height within each row (`height: 100%`). Fixed a `li + li { margin-top }` inheritance bug that caused the first card in each row to sit above its neighbours.
- **Typography:** replaced Lora (serif) with Plus Jakarta Sans (geometric sans-serif) for headings. Heading weight increased to 600. Border-radius tightened from 0.35rem to 0.25rem for a crisper look.
- **Header:** full-width sticky violet bar (`#2E1A6E`), white wordmark at weight 700, white nav items at 88% opacity. Hover turns links to light amber. Nav items no longer underlined. Font size and item spacing increased.
- **Home entry points:** "Explore the Project" cards replaced with pill-shaped navigation buttons (violet fill, white text, amber on hover) in a flex row.
- **Scroll behaviour:** removed `scroll-behavior: smooth`; anchor links now jump instantly.

