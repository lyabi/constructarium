# Inheritance Network Graph

## What should it do?

The Inheritance Network visualises how grammatical constructions relate to each other as a directed diagram: nodes represent constructions, arrows represent inheritance relations. Construction Grammar distinguishes four link types, each rendered with a distinct visual style:

**Instance links** are the most basic form of inheritance: a more specific construction inherits all properties of a more general one and adds further constraints. For example, *kick the bucket* is a special case of the transitive construction — same syntactic form, but lexically fixed and semantically non-compositional.

**Subpart links** connect a complex construction to the smaller constructions that make up its parts, formally or semantically. For example, the transitive construction contains an NP and a VP as subparts. These links become especially relevant as the network grows to include phrasal and lexical constructions.

**Polysemy links** connect a construction's basic sense to its extended senses, which develop through repeated use. The ditransitive construction has a basic sense of *X causes Y to receive Z* (*John gave Mary the book*), extended to enabling (*The doctor allowed me a full meal*) and intention (*I promise you a rose garden*). The s-genitive works similarly: from possession (*John's book*) to increasingly abstract relations (*yesterday's events*, *inflation's consequence*).

**Metaphorical links** connect constructions whose meanings are related through a conceptual metaphor. The caused-motion construction (*John combed his hair to the side*) and the resultative construction (*Anne tied her hair into a bun*) are linked by CHANGE IS MOTION. The modal auxiliary construction links its deontic sense (*You must be home by 10*) to its epistemic sense (*You must be David's brother*) through a metaphor from the sociophysical world to the domain of possibility and likelihood.

The graph is a DAG (directed acyclic graph), not a tree: a construction can have more than one parent. Constructions with no inheritance relations are displayed separately below the main graph. As new constructions and link types are added to the data, the layout updates automatically.

## How is it operated?

- **Clicking a node** navigates to that construction's detail page (form, meaning, examples, inheritance context).
- **Hovering a node** shows a tooltip with the construction's one-line meaning description.
- A **legend** explains edge styles (one per link type) and node colours (one per cluster).
- **Zoom and pan** keep the diagram usable as the network grows.

As the network grows, **filters** by cluster or relation type would become useful — for example, showing only argument_structure constructions, or highlighting only metaphorical links. This is a nice-to-have for a later stage once there is enough data to make filtering meaningful.

## How does it fit into the site?

The graph lives on its own page under **Inheritance** in the main navigation. The data comes from two existing JSON files — `constructarium_inheritance.json` (nodes and edges, each edge carrying a `relation` field) and `constructarium_constructions.json` (names and cluster assignments). No new files are needed.

The implementation will use **Cytoscape.js** with the **dagre** layout plugin. Three alternatives were considered: plain SVG, D3-force, and vis-network. Plain SVG works for a fixed small graph but requires hardcoded node positions — as soon as data grows, positions need manual adjustment, and zoom and pan would have to be implemented from scratch. D3-force was ruled out because it uses a physics simulation that positions nodes by repulsion and attraction, which produces an organic layout with no inherent top-down structure; an inheritance hierarchy needs a layout that reflects depth and direction, not one that has to be manually constrained to approximate it. Vis-network is a valid option, but its layout flexibility for DAGs is more limited. Cytoscape with dagre computes a layered hierarchical layout directly from the graph topology, handles multiple parents per node correctly, and scales as data grows — all without manual positioning. Zoom, pan, click, and hover are built in. 
