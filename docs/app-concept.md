# app.js — Concept and Role

original idea: network graph --> too complex yet, therefore: 

`app.js` connects the static HTML to the project's JSON data. Without it, the reference list, Comparison View pair list, and Verb Explorer tables are all empty.

## How it works

The script waits for the page to finish loading (`DOMContentLoaded`), then fetches all five JSON files using `async`/`await` before doing anything else. Once the data is available, it renders three sections:

**References** — iterates over `references.json` and appends a `<li>` per entry to `#reference-list`.

**Comparison View** — builds the clickable pair list from `contrastive_pairs.json`. On click, it resolves the two `construction_id` fields to human-readable names (via `.find()` on `constructions`), updates the sentence links (converting `construction_id` underscores to hyphens for the anchor `href`), and fills in the contrast type and explanation.

**Verb Explorer** — deduplicates `set_id` values with `new Set()` to build the slice/cook navigation; toggles section visibility on click. Two table-filling calls (`fillSetTable`) iterate the entries for each set, resolving `construction_id` → construction name and `source` → `author (year)` from `references.json`.

## Shared pattern

Every section follows the same steps: select an existing HTML element → create new child elements → append them. Wherever a field holds a reference ID, `.find()` resolves it to readable text before it touches the UI.

## Not yet implemented

Construction Index cards and Construction Detail content are still static HTML — not yet driven by JavaScript.

The Inheritance Network is implemented in a separate file, `js/graph.js`, using Cytoscape.js with the dagre layout plugin. It is not part of `app.js`.
