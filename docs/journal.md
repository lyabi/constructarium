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
