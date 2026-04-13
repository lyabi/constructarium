# Constructarium — Visual Design

## Fonts

Three typefaces, each with a distinct role:

| Role | Font | Rationale |
|---|---|---|
| Headings, construction names | **Lora** (serif) | Warm, scholarly feel; signals academic context without being austere; works well at display sizes |
| Body, UI elements, labels | **Inter** (sans-serif) | Maximum legibility for dense technical content; neutral; excellent at small sizes |
| Linguistic notation | **JetBrains Mono** (monospace) | Applied to all `phrase_structure` and `syntactic_function` values (e.g. `NP V NP PP`); monospace evokes formal notation and visually separates formulae from prose |

All three are available on Google Fonts. Use **Lora** for page titles, section headers, and construction names. Use **Inter** for everything else. Use **JetBrains Mono** exclusively for linguistic notation — never for general text.

Font sizes (base 16px):
- Page title: 2rem, Lora, regular
- Section heading: 1.25rem, Lora, regular
- Body: 1rem, Inter, regular
- Small label / metadata: 0.875rem, Inter, regular
- Notation: 0.9rem, JetBrains Mono

---

## Colour Scheme

### Base palette

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#F5F3EE` | Page background (warm off-white, paper-like) |
| `--surface` | `#FFFFFF` | Cards, panels, modals |
| `--text-primary` | `#1C1B18` | Main body text |
| `--text-secondary` | `#6B6860` | Labels, metadata, de-emphasised content |
| `--border` | `#E4E0D8` | Card borders, dividers |

### Cluster colours

Used consistently for construction cards (Construction Index), construction name headers (Construction Detail), and nodes (Inheritance Network). Muted tones — no fully saturated colours.

| Cluster | Hex | Use case |
|---|---|---|
| `argument_structure` | `#3D6B9F` | Slate blue — central, largest cluster |
| `motion_activity` | `#5C8C6E` | Sage green |
| `fixed_pragmatic` | `#B85C3A` | Terracotta |
| `clause_combining` | `#7A5C9E` | Muted purple |
| `np_internal` | `#A07830` | Amber/ochre |

Cluster colours appear as:
- Left border stripe on construction cards (Construction Index)
- Header background tint on Construction Detail pages
- Node fill colour in Inheritance Network

### Inheritance edge colours

| Relation | Hex | Style |
|---|---|---|
| `instance` | `#9BAAB8` | Solid line |
| `metaphorical_extension` | `#C4905A` | Dashed line |
| `discourse_variant` | `#89A88A` | Dotted line |

---

## Navigation

Fixed horizontal top bar, present on all pages.

```
┌──────────────────────────────────────────────────────────────────┐
│  Constructarium    Constructions   Compare   Inheritance          │
│                    Verb Explorer   About                          │
└──────────────────────────────────────────────────────────────────┘
```

- **Logo/wordmark** left-aligned, links to Home; set in Lora
- **5 nav items** right-aligned: Constructions, Compare, Inheritance, Verb Explorer, About
- Compare is the core feature — consider a subtle visual marker (e.g. slightly bolder weight or a small dot indicator)
- Active page underlined or highlighted with a bottom border in cluster-neutral accent
- Thin `--border` line separates nav from content
- No dropdown menus — all destinations are top-level pages

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

  ┌──────────┐  ┌──────────┐  ┌──────────┐  ┌──────────┐
  │ Compare  │  │Construc- │  │Inheritan-│  │  Verb    │
  │ [primary]│  │  tions   │  │  ce      │  │ Explorer │
  └──────────┘  └──────────┘  └──────────┘  └──────────┘
  ↑ visually largest / most prominent card

```

Four entry point cards in a row. Compare card is visually primary (larger, or with a distinct border). Clicking any card navigates to that page.

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
