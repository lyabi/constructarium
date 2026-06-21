# Constructarium — Visual Design

## Fonts

Three typefaces, each with a distinct role:

| Role | Font | Rationale |
|---|---|---|
| Headings, construction names | **Plus Jakarta Sans** (geometric sans-serif) | Clean, modern look at weight 600; works well at display sizes |
| Body, UI elements, labels | **Inter** (sans-serif) | Maximum legibility for dense technical content; neutral; excellent at small sizes |
| Linguistic notation | **JetBrains Mono** (monospace) | Applied to all `phrase_structure` and `syntactic_function` values (e.g. `NP V NP PP`); monospace evokes formal notation and visually separates formulae from prose |

All three are loaded as local variable fonts from `fonts/`. Use **Plus Jakarta Sans** for page titles, section headers, and construction names. Use **Inter** for everything else. Use **JetBrains Mono** exclusively for linguistic notation — never for general text.

Font sizes (base 16px):
- Page title: 2rem, Plus Jakarta Sans, weight 600
- Section heading: 1.25rem, Plus Jakarta Sans, weight 600
- Body: 1rem, Inter, regular
- Small label / metadata: 0.875rem, Inter, regular
- Notation: 0.9rem, JetBrains Mono

---

## Colour Scheme

### Base palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F4F8` | Page background (cool lavender-neutral) |
| `--surface` | `#FFFFFF` | Cards, panels |
| `--text-primary` | `#1C1B22` | Main body text |
| `--text-secondary` | `#6B6878` | Labels, metadata, de-emphasised content |
| `--border` | `#E2DFF0` | Card borders, dividers |
| `--accent` | `#B06000` | Interactive accent (dark amber) — links, buttons, hover states |

### Header

Full-width sticky violet bar (`#2E1A6E`). White wordmark (weight 700) and white nav items (88% opacity). Hover turns links to light amber (`--accent`). Nav items are not underlined.

### Cluster colours

Each cluster has an **accent** colour (used for borders, text, and graph nodes) and a **tint** (used as card background fill).

| Cluster | Accent | Tint | Description |
|---|---|---|---|
| `argument_structure` | `#1A5FA8` | `#DDEEFF` | Slate blue |
| `motion_activity` | `#1A7040` | `#D6F0E3` | Forest green |
| `fixed_pragmatic` | `#B82055` | `#FFDCE8` | Rose/crimson |
| `clause_combining` | `#6030A0` | `#EAD9FF` | Violet |
| `np_internal` | `#8A5500` | `#FFF0CC` | Amber/ochre |

Cluster accent colours appear as:
- 4px left border stripe on construction cards (Construction Index)
- Accent text/border on Construction Detail headers
- Node fill colour in Inheritance Network

Tint colours appear as the full background of construction cards.

### Inheritance edge colours

| Relation | Hex | Style |
|---|---|---|
| `instance` | `#9BAAB8` | Solid line (default) |
| `metaphorical_extension` | `#C47820` | Long dashes |
| `construal_variant` | `#89A88A` | Medium dashes |
| `related_to` | `#2D3FB8` | Short dashes |
| `subpart` | `#6030A0` | Long dashes (wider gap) |
| `polysemy` | `#B82055` | Dash-dot pattern |

---

## Navigation

Full-width sticky bar in deep violet (`#2E1A6E`), present on all pages.

```
┌──────────────────────────────────────────────────────────────────┐
│  Constructarium    Constructions   Compare   Inheritance          │  ← violet bg
│                    Verb Explorer   About                          │
└──────────────────────────────────────────────────────────────────┘
```

- **Logo/wordmark** left-aligned, links to Home; set in Plus Jakarta Sans, weight 700, white
- **5 nav items** right-aligned: Constructions, Compare, Inheritance, Verb Explorer, About — white at 88% opacity; hover turns to light amber
- Nav items are not underlined; no dropdown menus
- On mobile: hamburger toggle reveals a stacked nav list; clicking any nav link closes the menu automatically

---

## Layout Sketches

Max content width: **1200px**, centred. Page background `--bg`, content on `--surface`.

---

### Home

```
┌──────────────────────── nav ────────────────────────────────────┐

  Constructarium                                    [logo / wordmark]
  An interactive tool for exploring English
  grammatical constructions.

  [  Compare  ]  [  Constructions  ]  [  Inheritance  ]  [  Verb Explorer  ]
  ↑ pill-shaped buttons (violet fill, white text, amber on hover)

```

Four pill-shaped navigation buttons in a flex row. Clicking any button navigates to that page. No card layout — the entry points are inline buttons, not separate panels.

---

### Construction Index

```
┌──────────────────────── nav ────────────────────────────────────┐

  Constructions

  Argument Structure ─────────────────────────────────────────────
  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │Intransit.│  │Transitive│  │Ditransit.│  │Caused    │
  │ NP VP    │  │ NP VP NP │  │NP VP NP …│  │Motion …  │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
  ┌──────────┐  ┌──────────┐
  │Resultive │  │ Passive  │
  └──────────┘  └──────────┘

  Motion & Activity ──────────────────────────────────────────────
  ┌──────────┐  ┌──────────┐
  │   Way    │  │Time Away │
  └──────────┘  └──────────┘

  Fixed Pragmatic / Clause-combining / NP-internal ───────────────
  [remaining 4 constructions]
```

Each card: cluster colour as left border stripe; construction name (Lora); phrase_structure formula (JetBrains Mono); one-line meaning_description (Inter).

---

### Construction Detail

```
┌──────────── nav ───────────────────────────────────────────────┐

  ┌────────────────────────────────────┐  ┌─────────────────────┐
  │ Transitive Construction            │  │  Inheritance        │
  │ [cluster colour tint on header]    │  │  (mini-graph:       │
  │ alt: Double Object Construction    │  │  immediate          │
  ├────────────────────────────────────┤  │  neighbours only,   │
  │ Form                               │  │  static)            │
  │  NP VP NP      Subj V Obj          │  │                     │
  │  [mono]        [mono]              │  │  ○ ── ●             │
  ├────────────────────────────────────┤  │       └── ○         │
  │ Meaning                            │  └─────────────────────┘
  │  transitive action                 │
  │  X acts on Y                       │
  ├────────────────────────────────────┤
  │ Key reference                      │
  │  Hoffmann & Trousdale 2013 ↗       │
  ├────────────────────────────────────┤
  │ [View guided contrasts]            │  ← only if construction
  └────────────────────────────────────┘    appears in pairs

  Examples ───────────────────────────────────────────────────────
  "I read this book."
   Goldberg 1995  ·  COCA 1993, TV, Homicide: Life on the Street

  "He bought a house for more than two million dollars."
   ↳ Subj V Obj [adjunct PP]
   Davies 2008  ·  COCA 2012, BLOG, gossipcop.com
```

Two-column layout at top (detail left, mini-graph right). Examples as a full-width list below. Annotations appear as an indented line (↳) directly beneath the sentence where non-empty.

---

### Comparison View

```
┌──────────── nav ───────────────────────────────────────────────┐

  Guided Comparison — same verb, different constructions

  ┌──────────────────┐  ┌────────────────────────────────────────┐
  │ Pairs            │  │  Transitive  ─────  Caused Motion      │
  │ ─────────────    │  │                                        │
  │ ● Trans / CM     │  │  "He sliced      "Pat sliced the       │
  │ ○ Trans / Dit    │  │   the bread."     carrots into         │
  │ ○ Trans / Res    │  │                   the salad."          │
  │ ○ CM / Res       │  │  ────────────────────────────────────  │
  │ ○ Dit / CM       │  │  transitive vs. caused motion          │
  └──────────────────┘  │                                        │
                        │  Same verb; transitive encodes simple  │
                        │  action on a Patient with no specified  │
                        │  endpoint; caused-motion adds a Goal   │
                        │  PP, encoding the Theme's change of    │
                        │  location as constructionally entailed.│
                        └────────────────────────────────────────┘
```

Pair list as a left sidebar (or tab strip). Selected pair in the main panel: two sentences side by side at top, contrast_type as a label, explanation as prose below.

---

### Inheritance Network

```
┌──────────── nav ───────────────────────────────────────────────┐

  Inheritance Network              ┌──────────────────────────┐
                                   │ Legend                   │
                                   │ ─── instance             │
                                   │ - - metaphorical ext.    │
                                   │ ··· discourse variant    │
                                   │                          │
                                   │ ● argument_structure     │
                                   │ ● motion_activity        │
                                   │ ● fixed_pragmatic  ...   │
                                   └──────────────────────────┘
  ┌──────────────────────────────────────────────────────────────┐
  │                                                              │
  │   [intransitive]      [transitive] ───── [ditransitive]      │
  │                            │ ─────────── [caused motion]     │
  │                            │                  │              │
  │                            └──── [resultative]┘  [passive]  │
  │                                       [way] ── [time away]   │
  │  ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─ ─  │
  │  [wxdy]  [incredulity]  [comp. correlative]  [binominal NP]  │
  └──────────────────────────────────────────────────────────────┘
```

Dashed line separates the argument_structure cluster (with `intransitive_cxn` grouped nearby despite no edges) from the four standalone constructions below. Clicking a node navigates to its Construction Detail page.

---

### Verb Explorer

```
┌──────────── nav ───────────────────────────────────────────────┐

  Verb Explorer

  [ slice ]  [ cook ]   ← tab selector

  cook  ·  Goldberg 2009
  ──────────────────────────────────────────────────────────────
  Sentence                        Construction       Source
  ──────────────────────────────────────────────────────────────
  The chicken cooked all night.   Intransitive       Goldberg 2009
  Pat cooked the steaks.          Transitive         Goldberg 2009
  Pat cooked the steak well done. Resultative        Goldberg 2009
  Pat cooks.                      Intransitive       Goldberg 2009
    ↳ deprofiled object; verb is semantically transitive
       but object is implicit
  Pat cooked Chris some dinner.   Ditransitive       Goldberg 2009
  Pat cooked her way into the     Way Construction   Goldberg 2009
  Illinois State bake-off.
```

Tabs for verb set selection. Table with three columns; annotation as indented inline note beneath the sentence row where non-empty.

---

### About / Sources

```
┌──────────── nav ───────────────────────────────────────────────┐

  ┌──────────────────────────┐  ┌──────────────────────────────┐
  │ About                    │  │ References                   │
  │                          │  │                              │
  │ Constructarium is …      │  │ Davies, M. (2008–). The      │
  │                          │  │ Corpus of Contemporary …     │
  │                          │  │                              │
  │                          │  │ Goldberg, A. E. (1995). …    │
  │                          │  │                              │
  │                          │  │ Goldberg, A. E. (2005). …    │
  │                          │  │ …                            │
  └──────────────────────────┘  └──────────────────────────────┘
```

Two-column layout. References sorted alphabetically by author last name. Corpus entries visually distinct (e.g. small "corpus" badge). DOI/URL linked where available.
