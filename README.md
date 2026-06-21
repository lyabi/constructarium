# Constructarium

Constructarium is an interactive web prototype for exploring English grammatical constructions through the lens of Construction Grammar (CxG). It is designed for linguistics students, advanced English learners, and instructors, with guided comparison as its core feature.

## What It Includes

- a Home page with entry-point navigation buttons
- a Construction Index grouped by construction cluster
- full Construction Details for 12 constructions (including four Ditransitive sub-senses)
- a guided Comparison View (5 contrastive pairs)
- a Verb Explorer for cross-construction verb sets (slice, cook)
- an interactive Inheritance Network graph (Cytoscape.js + dagre layout)
- an About / Sources section with a rendered bibliography

All content is loaded dynamically from JSON files in `data/`. The JavaScript is split across `js/app.js` (data rendering, navigation, comparison and verb explorer logic) and `js/graph.js` (inheritance graph).

## How To Use It

- use the top navigation to move between the main sections (on mobile: tap the menu icon to open/close the nav)
- open constructions from the index or from links inside other sections
- use the Comparison View to switch between contrast pairs
- use the Verb Explorer to switch between verb sets
- use the Inheritance Network to zoom and pan the graph, and click nodes to follow links to construction details

## Run Locally

Because the site now loads JSON data with JavaScript, it should be opened through a local web server instead of opening `index.html` directly.

In PowerShell, from the project folder:

```powershell
python -m http.server 8000
```

If `python` does not work, try:

```powershell
py -m http.server 8000
```

Then open this URL in your browser:

```text
http://localhost:8000
```

To stop the server, press `Ctrl + C` in the PowerShell window.

## Tutorial and Documentation

The `tutorial/` folder contains a detailed walkthrough of the code for presentation and study purposes:

- [tutorial.md](tutorial/tutorial.md) — line-by-line explanation of `index.html` and `css/style.css`
- [short_network_graph.md](tutorial/short_network_graph.md) — focused walkthrough of the Cytoscape.js graph implementation

Design decisions and requirements are documented in the `docs/` folder.

## Run With VS Code Live Server

If you use Visual Studio Code, you can also run the project with the Live Server extension:

1. Open the project folder in Visual Studio Code.
2. Make sure the Live Server extension is installed.
3. Open `index.html`.
4. Right-click inside the file and choose `Open with Live Server`, or click the `Go Live` button in the bottom status bar.
5. Your browser should open automatically on a local `http://...` address.
