# Constructarium — Requirements

Interactive web tool for exploring English grammatical constructions (CxG). Audience: linguistics students, advanced English learners, instructors. **The core feature is side-by-side comparison of constructions.** Supporting features: construction descriptions, annotated corpus examples, cross-construction verb sets, visual inheritance network.

---

## Data layer

All data is JSON in `data/`. CSVs are archived originals, not read by the site. `source` fields across all files are reference IDs resolved via `constructarium_references.json`.

| File | Contents |
|---|---|
| `constructarium_constructions.json` | 12 constructions: id, name, alt_names, form (phrase_structure + syntactic_function), meaning, meaning_description, notes, primary_source |
| `constructarium_examples.json` | 49 examples: id, construction_id, sentence, annotation, source, corpus_ref |
| `constructarium_cross_construction_set.json` | 11 entries, 2 verb sets (slice_set, cook_set): set_id, verb, construction_id, sentence, annotation, source |
| `constructarium_contrastive_pairs.json` | 5 pairs, all from slice_set: id, construction_id_a/b, sentence_a/b, contrast_type, explanation, source_table |
| `constructarium_inheritance.json` | nodes (id, cluster) + edges (parent, child, relation, notes) |
| `constructarium_references.json` | 10 entries: id, author, year, title, type, url_doi |

---

## Pages

### 1. Home

**Must-have**
- One-paragraph project description
- Four entry points, Comparison View listed first as the primary feature: Comparison View, Construction Index, Inheritance Network, Verb Explorer

**Nice-to-have:** featured construction as teaser

---

### 2. Construction Index

**Must-have**
- All 12 constructions as cards: `name`, `form.phrase_structure`, `meaning_description`
- `alt_names` shown as secondary labels where present
- Cards grouped by `cluster` (argument_structure / motion_activity / fixed_pragmatic / clause_combining / np_internal)
- Each card links to Construction Detail

**Nice-to-have:** filter by cluster; sort alphabetically

---

### 3. Construction Detail

**Must-have**
- `name` as header; `alt_names` as secondary labels
- Form: `phrase_structure` + `syntactic_function`; render `n/a` gracefully (comparative_correlative, binominal_np are non-clausal)
- Meaning: `meaning` (label) + `meaning_description`
- Notes: only rendered if non-empty
- Examples: all matching `construction_id`; `annotation` hidden/de-emphasised if empty (37 of 49 currently unannotated); `source` resolved to author-year citation; `corpus_ref` shown if non-empty
- Inheritance: parent and child edges from `inheritance.json`; show `relation` type and edge `notes`; link to related constructions
- **Duplicate sentence:** "Emeril sliced and diced his way to stardom." exists in both `examples.json` (ex_34) and `cross_construction_set.json` (slice_set); on the `way_cxn` detail page it will appear in both the Examples and cross-construction sections — decide whether to deduplicate or display both with distinct labels
- Primary source: formatted citation resolved from `primary_source` → `references.json`; linked if `url_doi` non-empty
- "View guided contrasts" button linking to Comparison View; only shown on constructions that appear in at least one contrastive pair (`transitive_cxn`, `caused_motion_cxn`, `ditransitive_cxn`, `resultative_cxn`); not shown on other construction detail pages

**Nice-to-have**
- Colour-coded phrase structure slots
- COCA corpus_ref linked to COCA search interface
- Mini-graph showing only immediate neighbours (direct parents and children); static and non-navigable — distinct from the full interactive Inheritance Network page

---

### 4. Comparison View

**Must-have (guided mode only)**
- 5 contrastive pairs from `constructarium_contrastive_pairs.json`
- Each pair: `sentence_a` vs `sentence_b` side by side; `contrast_type` as label; `explanation` as body text; sentences link to their construction detail pages
- Standalone page (not integrated into Verb Explorer) — thinness is a data limitation, not a design reason to subordinate the core feature; scope is clearly framed as "guided comparison: same verb, different constructions"

**Nice-to-have (free mode — post-prototype)**
- Pick any two constructions; side-by-side form/meaning; filtered examples
- Only worth building once more contrastive pair data exists

---

### 5. Inheritance Network

**Must-have**
- Interactive directed graph: 12 nodes, 7 edges
- Edge style/colour encodes `relation`: `instance`, `metaphorical_extension`, `discourse_variant`
- Node labels show construction name; clicking navigates to detail page
- Legend for relation types
- **Must use a DAG-capable library** (D3-force, Cytoscape.js, or vis-network) — `resultative_cxn` has two parents; tree-layout components will break
- **Layout strategy required for edgeless nodes — two distinct cases:**
  - `intransitive_cxn`: edgeless but in the `argument_structure` cluster — position near other argument_structure nodes, grouped by cluster even without edges
  - `wxdy_cxn`, `incredulity_cxn`, `comparative_correlative_cxn`, `binominal_np_cxn`: genuinely standalone — place in a dedicated peripheral zone or separate list below the main graph

**Nice-to-have:** node tooltip (`meaning_description`); edge tooltip (`notes`); cluster-based colouring; zoom/pan

---

### 6. Verb Explorer

**Must-have**
- Verb set selector (slice_set, cook_set)
- Table per set: `sentence`, `construction_id` as readable label (linked), `source` resolved; `annotation` shown as inline note beneath the sentence where non-empty (not a table column — only 1 of 11 current entries has an annotation)
- **cook_set has two `intransitive_cxn` entries** ("The chicken cooked all night." / "Pat cooks."); both must render visibly — the annotation on "Pat cooks." (deprofiled object) is what distinguishes them

**Nice-to-have:** additional verb sets; side-by-side comparison of two sets; link to Comparison page filtered by verb set where contrastive pairs exist (currently slice_set only)

---

### 7. About / Sources

**Must-have**
- Project description
- Bibliography from `constructarium_references.json`; render books and edited volumes (same format; `(eds.)` already present in `author` field), articles (linked if `url_doi`), and corpus entries (`davies_2008`) distinctly

**Nice-to-have:** separate corpus vs. publication sections; contact/feedback link

---

## Cross-cutting requirements

**Must-have**
- All construction data loaded from JSON at runtime — nothing hardcoded in HTML/JS
- Reference IDs (`"goldberg_1995"`, `"davies_2008"`) always resolved to readable citations before display — IDs must never appear in the UI
- Inline citations use short form: Last name(s) + year (e.g. Goldberg 1995, Hoffmann & Trousdale 2013, Davies 2008–); 3+ authors truncated to "et al." (e.g. Hoffmann et al. 2020); About/Sources page uses full citations from `references.json`
- `alt_names` shown as secondary to `name`, never at equal weight
- `"n/a"` in `syntactic_function` rendered as a meaningful label
- Empty fields (`annotation`, `corpus_ref`, `notes`, `url_doi`) handled gracefully — no blank spaces or raw empty strings
- Linguistic notation in `phrase_structure` and `syntactic_function` fields (`NP.poss`, `NP[acc]`, `Obj[way]`, `VPpp`, `Comp-XP1/XP2`) and subscript characters in `meaning_description` (N₁/N₂) must be rendered deliberately — not displayed as raw strings

**Nice-to-have:** shareable URLs per construction; mobile layout (side-by-side comparison needs stacked fallback); keyboard navigation for graph; sufficient colour contrast

---

## Open questions

1. **Tech stack** — plain HTML/CSS/JS or framework (Svelte, Vue)? Affects routing and component structure.
2. **Graph library** — D3-force, Cytoscape.js, or vis-network? Determines layout flexibility for isolated nodes.
3. **Isolated node layout** — manual fixed positions, a dedicated visual zone, or a separate list below the graph?
4. **Routing** — SPA with client-side routing vs. separate HTML pages? If SPA: shareable URLs per construction require explicit client-side routing. If separate HTML pages: shareable URLs come for free.
5. **Deprofiled object** — "Pat cooks." is mapped to `intransitive_cxn` as a prototype workaround. A dedicated `deprofiled_object_cxn` may be warranted post-prototype.
6. **Goldberg 2009 DOI** — missing from `references.json`; article is in *Cognitive Linguistics* 20(1), pp. 93–127.
7. **BNC references** — ex_44–46 use BNC codes (e.g. `BNC W_newsp_brdsht AHC`). Display verbatim or humanise? Linkable?
8. **Primary source label** — "Key reference" or "Source"? The field is one reference per construction, not a reading list.
