# Constructarium — Data

## Overview

All data is stored as JSON in `data/`. The original CSVs (semicolon-delimited) are kept as archived source documents but are not read by the site. One file (`constructarium_inheritance.json`) has no CSV origin — it was created directly as JSON. One CSV (`constructarium_sources.csv`) was deleted and replaced by a restructured `constructarium_references.json`.

All `source` fields across files are reference IDs that resolve to `constructarium_references.json`. Reference IDs must never appear in the UI — always resolved to readable citations before display.

---

## Files

### `constructarium_constructions.json`
12 constructions covering argument structure, motion-activity, fixed pragmatic, clause-combining, and NP-internal types.

| Field | Description |
|---|---|
| `id` | Unique string identifier (e.g. `transitive_cxn`) |
| `name` | Primary name |
| `alt_names` | Array of alternative names; empty array if none |
| `form.phrase_structure` | Phrase structure formula (e.g. `NP V NP PP`) |
| `form.syntactic_function` | Grammatical roles (e.g. `Subj V Obj Obl`); `"n/a"` for non-clausal constructions |
| `meaning` | Short meaning label |
| `meaning_description` | Full semantic paraphrase |
| `notes` | Non-empty for 2 constructions only (comparative_correlative, binominal_np) |
| `primary_source` | Reference ID pointing to key theoretical source |

---

### `constructarium_examples.json`
49 corpus and literature examples across all 12 constructions. 37 of 49 have an empty `annotation` field — to be filled post-prototype.

| Field | Description |
|---|---|
| `id` | Unique identifier (ex_1–ex_49) |
| `construction_id` | Links to a construction |
| `sentence` | Example sentence |
| `annotation` | Linguistic gloss or note; empty string if none |
| `source` | Reference ID (`davies_2008` for COCA examples, bibliographic ID for literature examples) |
| `corpus_ref` | Specific corpus location (e.g. `COCA 2016, NEWS, Charlotte Observer`); empty string if none |

---

### `constructarium_cross_construction_set.json`
11 entries across 2 verb sets demonstrating how the same verb appears in multiple constructions.

| Field | Description |
|---|---|
| `set_id` | Verb set identifier (`slice_set`, `cook_set`) |
| `verb` | The verb in question |
| `construction_id` | Links to a construction |
| `sentence` | Example sentence |
| `annotation` | Linguistic note; empty string if none |
| `source` | Reference ID |

**Note:** cook_set has two entries for `intransitive_cxn` — "The chicken cooked all night." (true intransitive) and "Pat cooks." (deprofiled object, marked by annotation).

---

### `constructarium_contrastive_pairs.json`
5 pre-authored sentence pairs contrasting constructions. All 5 pairs are derived from the slice_set and involve the verb *slice*.

| Field | Description |
|---|---|
| `id` | Unique identifier (cp_1–cp_5) |
| `construction_id_a/b` | The two constructions being contrasted |
| `sentence_a/b` | One sentence per construction |
| `contrast_type` | Short label (e.g. `transitive vs. caused motion`) |
| `explanation` | Prose explanation of the contrast |
| `source_table` | Origin of the examples (`cross_construction_set` for all current entries) |

---

### `constructarium_inheritance.json`
Directed graph encoding constructional inheritance relations. Created directly as JSON — no CSV origin.

**Nodes** (16): each has `id` and `cluster`. The original 12 constructions plus four ditransitive sub-sense nodes added to reflect Goldberg's (1995) sense network: `ditransitive_transfer_cxn`, `ditransitive_enablement_cxn`, `ditransitive_promise_cxn`, `ditransitive_refusal_cxn`.

**Edges** (17): two naming conventions are used depending on relation type.
- Strictly hierarchical relations (`instance`, `metaphorical_extension`): fields are `parent` and `child`.
- Non-hierarchical relations (`construal_variant`, `related_to`, `subpart`, `polysemy`): fields are `source` and `target`.

All edges also have `relation` and `notes` fields. JavaScript normalises `parent`/`child` to `source`/`target` before passing data to Cytoscape.

| Relation type | Count | Meaning |
|---|---|---|
| `instance` | 6 | Child is a more specific instance of the parent schema |
| `metaphorical_extension` | 1 | Child extends parent via conceptual metaphor (CHANGE IS MOTION) |
| `construal_variant` | 1 | Shares semantics of parent but differs in information structure |
| `subpart` | 4 | Child is a component or sub-sense of the parent |
| `polysemy` | 3 | Nodes share a polysemy relation (sense network, not strict hierarchy) |
| `related_to` | 2 | Loose associative relation between constructions |

`resultative_cxn` has two incoming edges (from `transitive_cxn` as `instance` and from `caused_motion_cxn` as `metaphorical_extension`) — the graph is a DAG, not a tree.

5 nodes have no edges: `intransitive_cxn` (argument_structure cluster, no theoretical parent in this set), and `wxdy_cxn`, `incredulity_cxn`, `comparative_correlative_cxn`, `binominal_np_cxn` (genuinely standalone constructions).

---

### `constructarium_references.json`
10 unique bibliographic entries covering all sources used across the project.

| Field | Description |
|---|---|
| `id` | Unique reference key (e.g. `goldberg_1995`) |
| `author` | Author(s); `(eds.)` included in field for edited volumes |
| `year` | Publication year; string `"2008–"` for COCA (ongoing) |
| `title` | Full title |
| `type` | `book`, `article`, `edited volume`, or `corpus` |
| `url_doi` | URL or DOI; empty string if none |

**Note:** `goldberg_2009` has no `url_doi` — article is Goldberg, A. E. (2009). The nature of generalization in language. *Cognitive Linguistics*, 20(1), pp. 93–127.

---

## Changes made during CSV → JSON conversion

### `constructarium_constructions.csv` → `.json`
- **Multiple names per cell** (ditransitive, incredulity, comparative_correlative, binominal_np): split into `name` (primary) + `alt_names` (array)
- **`passive_cxn` meaning_description**: reassembled from two broken CSV rows into a single string
- **`form` field**: split into nested `phrase_structure` and `syntactic_function` subfields
- **`primary_source` field**: added to each entry, pointing to a reference ID in `references.json`

### `constructarium_examples.csv` → `.json`
- **`ex_14`**: missing trailing period added
- **`ex_24`**: "Bronte" corrected to "Brontë"
- **`ex_40`**: spurious trailing quotation mark removed
- **`source` field**: converted from free string (e.g. `"Goldberg 1995"`) to reference ID (e.g. `"goldberg_1995"`) across all 49 entries; COCA examples mapped to `"davies_2008"`

### `constructarium_cross_construction_set.csv` → `.json`
- **cook_set added**: 6 new entries authored during the conversion process (Goldberg 2009)
- **`annotation` field**: added to all entries (empty string for those without one) for structural consistency
- **`source` field**: converted from free string to reference ID

### `constructarium_contrastive_pairs.csv` → `.json`
- **`cp_4` explanation**: reassembled from two broken CSV rows; "CHANGE IS MOTION" formatted as a conceptual metaphor per convention
- **`cp_5`**: leading whitespace trimmed from `caused_motion_cxn` in `construction_id_b`

### `constructarium_sources.csv` → deleted
Replaced by `constructarium_references.json`. Reasons:
- Original file had one entry per construction, causing Goldberg 1995 to appear five times
- `comparative_correlative_cxn` row had author in the title column and no title — fixed during restructuring (title: "English comparative correlative constructions: a usage-based account")
- New `references.json` uses unique IDs per work, deduplicated, with a `type` field for rendering
- COCA added as `davies_2008` (type: `corpus`) — previously unlisted despite being the source for all COCA examples
- Goldberg 2009 added — previously absent from sources entirely
- `primary_source` field added to `constructarium_constructions.json` to preserve the one-per-construction reference relationship
