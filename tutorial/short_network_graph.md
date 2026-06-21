# Inheritance Network Graph

The Inheritance Network visualises how grammatical constructions relate to each other as a directed diagram. The graph is a DAG (directed acyclic graph), not a tree: a construction can have more than one parent. Constructions with no inheritance relations are displayed separately inside the graph area.

Six relation types are represented, each with a distinct visual style in both the graph edges and the legend:

| Relation | Description |
|---|---|
| **Instance** | A more specific construction inherits all properties of a more general one and adds further constraints (e.g. *kick the bucket* is an instance of the transitive construction). |
| **Metaphorical extension** | Two constructions are linked via a conceptual metaphor (e.g. the caused-motion and resultative constructions are linked by CHANGE IS MOTION). |
| **Construal variant** | Two constructions share the same argument structure but differ in how the event is construed informationally (e.g. the passive is a construal variant of the transitive). |
| **Related to** | A loose semantic or pragmatic association between constructions that does not fit the stricter inheritance categories (e.g. the WXDY construction and the Incredulity Response Construction are both fixed pragmatic interrogatives). |
| **Subpart** | A construction contains another construction as one of its structural parts (e.g. the Comparative Correlative embeds a transitive clause as a subpart). |
| **Polysemy** | A construction's basic sense is extended to a related reading (e.g. the ditransitive transfer sense extends to enablement, promise, and refusal via metaphorical transfer). |

These six types map directly to the `relation` field in `constructarium_inheritance.json`.

The implementation uses **Cytoscape.js** with the **dagre** layout plugin, loaded from CDN in `index.html`. Dagre computes a layered hierarchical layout from the graph topology automatically, handles multiple parents per node correctly, and scales as data grows. Three alternatives were considered and ruled out: plain SVG requires hardcoded positions that do not scale as data grows; D3-force produces a physics-based organic layout with no inherent top-down hierarchy; Vis-network offers less DAG layout flexibility. The graph rendering code lives in `js/graph.js`, which depends on Cytoscape being loaded first.

Users can zoom and pan the graph. Clicking a node navigates to that construction's detail article. The legend (rendered in HTML below the graph area in `index.html`) shows all six edge styles so users can identify relation types without needing to inspect individual edges.
