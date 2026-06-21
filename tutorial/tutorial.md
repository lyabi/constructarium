# Constructarium — Personal Code Tutorial

This document walks through every line of `index.html` and `css/style.css` so you can explain each decision in a presentation and answer follow-up questions about it.

---

## Table of Contents

1. [The HTML Document](#1-the-html-document)
   - [The document shell](#11-the-document-shell-lines-1-11)
   - [The skip link](#12-the-skip-link-line-15)
   - [The header and navigation](#13-the-header-and-navigation-lines-16-33)
   - [The home section](#14-the-home-section-lines-37-56)
   - [Construction Index](#15-construction-index-lines-59-181)
   - [Construction Details](#16-construction-details-lines-184-865)
   - [Comparison View](#17-comparison-view-lines-868-913)
   - [Inheritance Network](#18-inheritance-network-lines-916-955)
   - [Verb Explorer](#19-verb-explorer-lines-958-998)
   - [About and Sources](#110-about-and-sources-lines-1002-1044)
   - [The footer](#111-the-footer-lines-1047-1049)
   - [The script tags](#112-the-script-tags-lines-1051-1056)
2. [The CSS Stylesheet](#2-the-css-stylesheet)
   - [Section 0 — Local Fonts](#20-section-0--local-fonts)
   - [Section 1 — Design Tokens](#21-section-1--design-tokens)
   - [Section 2 — Global Reset and Base Styles](#22-section-2--global-reset-and-base-styles)
   - [Section 3 — Basic Element Styling](#23-section-3--basic-element-styling)
   - [Section 4 — Main Page Shell](#24-section-4--main-page-shell)
   - [Section 5 — Reusable Card and List Patterns](#25-section-5--reusable-card-and-list-patterns)
   - [Section 6 — Construction Index and Detail Styling](#26-section-6--construction-index-and-detail-styling)
   - [Section 7 — Comparison View](#27-section-7--comparison-view)
   - [Section 8 — Verb Explorer](#28-section-8--verb-explorer)
   - [Section 9 — Home and Inheritance Sections](#29-section-9--home-and-inheritance-sections)
   - [Section 10 — Responsive Rules](#210-section-10--responsive-rules)
3. [Accessibility](#3-accessibility)
   - [Language and page identity](#31-language-and-page-identity)
   - [Semantic landmarks and heading hierarchy](#32-semantic-landmarks-and-heading-hierarchy)
   - [Skip link](#33-skip-link)
   - [Navigation: labelling and state](#34-navigation-labelling-and-state)
   - [Keyboard focus styles](#35-keyboard-focus-styles)
   - [ARIA labels and regions](#36-aria-labels-and-regions)
   - [Tables](#37-tables)
   - [Decorative SVG](#38-decorative-svg)
   - [Hidden content](#39-hidden-content)
   - [Colour contrast](#310-colour-contrast)

---

## 1. The HTML Document

### 1.1 The document shell (lines 1–11)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Constructarium</title>
  <meta name="description" content="Constructarium is an interactive tool...">
  <link rel="stylesheet" href="css/style.css">
</head>
```

**`<!DOCTYPE html>`**
This is not really an HTML tag — it is a declaration that tells the browser "this file uses the modern HTML5 standard." Without it, browsers enter a backwards-compatibility mode called *quirks mode* and may render your page differently across browsers. It must always be the very first line.

**`<html lang="en">`**
The root element that wraps the entire page. Every other element lives inside it. The `lang="en"` attribute tells browsers, search engines, and screen readers that the page content is in English. Screen readers use this to choose the correct speech engine and pronunciation rules.

**`<head>`**
The head contains *metadata* — information about the page that the browser needs but that is not displayed on screen. Your head has four important things:

- **`<meta charset="UTF-8">`** — Tells the browser to interpret the file's bytes as the UTF-8 character encoding. This is what allows special characters like `₁`, `₂`, `é`, and linguistic notation symbols to display correctly. It must come early in the head so the browser knows how to read everything that follows.

- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`** — This is the critical line that makes your page work on mobile phones. Without it, a phone would zoom out and pretend the page was 980 pixels wide. `width=device-width` tells the browser to match the page width to the actual screen width, and `initial-scale=1.0` means no zoom is applied on load. This one line activates your responsive CSS.

- **`<title>Constructarium</title>`** — Sets the text shown in the browser tab and in search engine results. It is not visible in the page body.

- **`<meta name="description" content="...">`** — A short summary of the page for search engines and social media previews (the text shown under a result in Google). It is not visible on the page itself.

**`<link rel="stylesheet" href="css/style.css">`**
Links your stylesheet. The browser reads and applies `style.css` before rendering the page. Placing it in the `<head>` prevents a flash of unstyled content. Notice that there are no `<link>` tags for Google Fonts: your fonts are loaded locally from the `fonts/` folder via `@font-face` rules in the CSS. This means the page works offline and does not depend on an external service.

---

### 1.2 The skip link (line 15)

```html
<a class="skip-link" href="#home">Skip to main content</a>
```

This is a keyboard accessibility feature. Sighted mouse users never notice it because it is hidden off-screen by default. When a keyboard user presses Tab, this link is the first thing they can focus, and it lets them jump directly to the `#home` section instead of having to Tab through every navigation item on every page. The CSS makes it invisible until focused. It lives before `<header>` so it is truly the first focusable element in the document.

---

### 1.3 The header and navigation (lines 16–33)

```html
<header>
  <nav aria-label="Primary">
    <a href="#home">Constructarium</a>
    <button class="nav-toggle" aria-expanded="false" aria-label="Navigation öffnen">
      <span></span>
      <span></span>
      <span></span>
    </button>
    <ul id="primary-nav-list">
      <li><a href="#construction-index">Constructions</a></li>
      <li><a href="#comparison-view">Compare</a></li>
      <li><a href="#inheritance-network">Inheritance</a></li>
      <li><a href="#verb-explorer">Verb Explorer</a></li>
      <li><a href="#about-sources">About</a></li>
    </ul>
  </nav>
</header>
```

**`<header>`**
A semantic landmark element. It signals to browsers and screen readers "this is the site header." Screen readers present a list of landmarks so users can jump directly to any section — `<header>` makes this possible.

**`<nav aria-label="Primary">`**
`<nav>` marks a block of navigation links. The `aria-label="Primary"` attribute gives this nav an accessible name. This is important because the page has a second `<nav>` element (for Verb Explorer verb sets). Without labels, a screen reader would just announce "navigation" twice with no way to tell them apart. With labels, it announces "Primary navigation" and "Verb sets navigation."

**`<a href="#home">Constructarium</a>`**
This is the wordmark — the site name that acts as a home link. The `href="#home"` is an *anchor link*: the `#` means "scroll to the element with `id="home"` on this same page." All your navigation links work this way because the entire site lives in one HTML file.

**`<button class="nav-toggle" aria-expanded="false" aria-label="Navigation öffnen">`**
A hamburger button for mobile devices. The three empty `<span>` elements inside it are the three horizontal bars that CSS draws and animates into an × shape when the menu is open. `aria-expanded="false"` tells screen readers whether the navigation menu is currently open or closed — JavaScript updates this attribute when the button is clicked. `aria-label="Navigation öffnen"` gives the button an accessible name since it contains no visible text. *(JavaScript behaviour will be explained later in the semester.)*

**`<ul id="primary-nav-list">`**
The nav links are in an unordered list because they are a set of parallel, unordered options — the standard HTML pattern for navigation. `id="primary-nav-list"` is a JavaScript hook that allows the script to toggle the `.nav-open` class on this element to show or hide the menu on mobile. *(Will be explained later in the semester.)*

---

### 1.4 The home section (lines 37–56)

```html
<section id="home" aria-labelledby="home-title">
  <h1 id="home-title">Constructarium</h1>
  <p>Constructarium is an interactive tool...</p>

  <section aria-labelledby="entry-points-title">
    <h2 id="entry-points-title">Explore the Project</h2>
    <ul class="entry-point-list">
      <li class="entry-point-card"><a href="#comparison-view">Comparison View</a></li>
      <li class="entry-point-card"><a href="#construction-index">Construction Index</a></li>
      <li class="entry-point-card"><a href="#inheritance-network">Inheritance Network</a></li>
      <li class="entry-point-card"><a href="#verb-explorer">Verb Explorer</a></li>
    </ul>
  </section>
</section>
```

**`<section id="home" aria-labelledby="home-title">`**
`<section>` groups related content. The `id="home"` makes this the target of the `href="#home"` links in your navigation and skip link. The `aria-labelledby="home-title"` connects this section to its `<h1>` so screen readers announce the section's purpose when navigating to it.

**`<h1 id="home-title">Constructarium</h1>`**
The `<h1>` is the most important heading on the page — there is only one, and it belongs in the home section. All other major sections use `<h2>` headings. This is the correct heading hierarchy: one `<h1>` at the top, `<h2>` for each major section of the site. The `id="home-title"` exists only so `aria-labelledby` can reference it.

**The nested `<section>` for entry points**
A second `<section>` inside `#home` groups the four launch-point cards. Nesting is correct here because this is a distinct sub-topic (entry points) within the home section. It gets its own `<h2>` to maintain the heading hierarchy.

**`<ul class="entry-point-list">` with `<li class="entry-point-card">`**
The four main entry points are an unordered list — the right choice because the cards are parallel options with no ranking. The CSS gives these items a dark purple pill appearance rather than a standard rectangular card. Each `<a>` inside the `<li>` is the clickable link.

---

### 1.5 Construction Index (lines 59–181)

```html
<section id="construction-index" aria-labelledby="construction-index-title">
  <h2 id="construction-index-title">Construction Index</h2>
  <p>Browse all constructions grouped by cluster.</p>

  <section aria-labelledby="argument-structure-title">
    <h3 id="argument-structure-title">Argument Structure</h3>
    <ul class="construction-card-list">
      <li>
        <article class="construction-card">
          <h4><a href="#detail-intransitive-cxn">Intransitive Construction</a></h4>
          <p class="notation">NP VP</p>
          <p>X acts</p>
        </article>
      </li>
      ...
    </ul>
  </section>
  ...
</section>
```

**The outer `<section id="construction-index">`**
Groups the entire index. The `id` makes it a navigation target and `<h2>` is the right heading level since this is a major section of the site (below the single `<h1>` in the home section).

**Inner `<section>` elements for each cluster**
Each linguistic cluster gets its own nested section with its own `<h3>`. This creates a four-level heading outline: `<h1>` for the site, `<h2>` for the index, `<h3>` for each cluster, `<h4>` for individual cards. No heading levels are skipped.

**`<article class="construction-card">`**
`<article>` is the right element here because each construction card is a self-contained piece of content — it could be lifted out and placed anywhere and still make sense. This distinguishes it from `<section>`, which is about grouping related content on a page.

**`<h4>` inside the article**
The fourth heading level is correct here because the hierarchy is: `<h1>` → `<h2>` → `<h3>` → `<h4>`. Skipping a level would break the document outline and confuse screen readers.

**`<p class="notation">NP VP</p>`**
This paragraph gets the `notation` class which applies the JetBrains Mono monospace font. Linguistic phrase-structure notation looks better and reads more clearly in a monospace font because spacing is predictable.

---

### 1.6 Construction Details (lines 184–865)

```html
<section id="construction-detail" aria-labelledby="construction-detail-title">
  <h2 id="construction-detail-title">Construction Details</h2>

  <ul class="detail-link-list">
    <li><a href="#detail-intransitive-cxn">Intransitive Construction</a></li>
    ...
  </ul>

  <article id="detail-intransitive-cxn" aria-labelledby="detail-intransitive-cxn-title">
    <h3 id="detail-intransitive-cxn-title">Intransitive Construction</h3>
    ...
    <h4>Inheritance</h4>
    <h4>Examples</h4>
    <ul class="example-list">
      <li>
        <blockquote><p>These things happen.</p></blockquote>
        <p>Davies 2008-</p>
        <p>COCA 2016, NEWS, Charlotte Observer</p>
      </li>
    </ul>
    <h4>Cross-Construction Uses</h4>
    <ul class="cross-construction-list">...</ul>
  </article>
  ...
</section>
```

**Heading levels `<h2>`, `<h3>`, `<h4>`**
The section heading is `<h2>`, each construction article title is `<h3>`, and the sub-sections inside each article (Inheritance, Examples, Cross-Construction Uses) are `<h4>`. This continues the four-level hierarchy without ever skipping a level.

**`<ul class="detail-link-list">`**
A quick-jump list at the top of the section that links to each construction's `article` by `id`. This is the HTML-only navigation substitute for what will later be a JavaScript-driven panel.

**`<article id="detail-intransitive-cxn">`**
Each construction gets its own `<article>`. The `id` is the target of links from the index cards and from the detail link list. Every `id` in this file is unique — duplicate ids cause broken anchor links and accessibility problems.

**`<blockquote><p>These things happen.</p></blockquote>`**
`<blockquote>` is the semantically correct element for quoted text from an external source. The corpus examples are quotes from COCA or scholarly sources, so `<blockquote>` is the right choice over `<p>`. The CSS adds a left border to visually mark these as quotations.

**The Ditransitive Construction's `<h4>Senses</h4>` block**
The Ditransitive article has an additional sub-section not present in other articles, listing the four polysemy senses (Transfer, Enablement, Promise, Refusal). Each sense includes a quoted example inside a `<blockquote>`. This extra section is needed because the ditransitive has a documented polysemy network, not a single meaning.

---

### 1.7 Comparison View (lines 868–913)

```html
<section id="comparison-view" aria-labelledby="comparison-view-title">
  <h2 id="comparison-view-title">Comparison View</h2>
  ...
  <div class="comparison-layout">
    <aside aria-labelledby="comparison-pairs-title">
      <h3 id="comparison-pairs-title">Pairs</h3>
      <ul class="comparison-pair-list" id="comparison-pair-list"></ul>
    </aside>

    <section id="comparison-pair-detail" aria-labelledby="comparison-pair-title">
      <h3 id="comparison-pair-title">Selected Contrast Pair</h3>
      <div class="comparison-sentences">
        <article aria-labelledby="construction-a-title">
          <h4 id="construction-a-title">Transitive Construction</h4>
          <p><a id="comparison-link-a" href="#detail-transitive-cxn">He sliced the bread.</a></p>
        </article>
        <article aria-labelledby="construction-b-title">
          <h4 id="construction-b-title">Caused Motion Construction</h4>
          <p><a id="comparison-link-b" href="#detail-caused-motion-cxn">Pat sliced the carrots into the salad.</a></p>
        </article>
      </div>
      <section aria-labelledby="contrast-type-title">
        <h4 id="contrast-type-title">Contrast Type</h4>
        ...
      </section>
      <section aria-labelledby="contrast-explanation-title">
        <h4 id="contrast-explanation-title">Explanation</h4>
        ...
      </section>
    </section>
  </div>
</section>
```

**`<div class="comparison-layout">`**
A `<div>` is a generic container with no semantic meaning. It is used here — rather than `<section>` — because this wrapper's sole purpose is to apply the CSS grid layout (sidebar + main panel). It does not represent a meaningful part of the document outline.

**`<aside aria-labelledby="comparison-pairs-title">`**
`<aside>` marks content that is related to, but secondary to, the main content. The pair list is a navigation sidebar — complementary content, not the primary focus. This is exactly the semantic role `<aside>` was designed for.

**`<ul class="comparison-pair-list" id="comparison-pair-list">`**
Empty in the HTML. JavaScript fills it with pair items dynamically. *(Will be explained later in the semester.)*

**`<div class="comparison-sentences">`**
Another purely structural `<div>`. Its job is to apply the two-column grid placing the two construction articles side by side on wider screens.

**Two `<article>` elements inside `.comparison-sentences`**
Each compared construction is an `<article>` because each is a self-contained unit of content. Their heading level is `<h4>` because the hierarchy is: `<h2>` section → `<h3>` pair detail panel → `<h4>` individual articles inside it.

**`<section aria-labelledby="contrast-type-title">` and `<section aria-labelledby="contrast-explanation-title">`**
Two nested sections hold the contrast type and explanation text. Their content will be replaced dynamically by JavaScript when the user picks a different pair. *(Will be explained later in the semester.)*

---

### 1.8 Inheritance Network (lines 916–955)

```html
<section id="inheritance-network" aria-labelledby="inheritance-network-title">
  <h2 id="inheritance-network-title">Inheritance Network</h2>
  <p>Directed graph of constructional inheritance relations.</p>

  <section aria-labelledby="inheritance-legend-title">
    <h3 id="inheritance-legend-title">Legend</h3>
    <ul class="legend-list">
      <li>
        <svg class="legend-line-sample" width="40" height="14" aria-hidden="true">
          <line x1="2" y1="7" x2="38" y2="7" stroke="#9baab8" stroke-width="2.5"/>
        </svg>
        Instance
      </li>
      <li>
        <svg ... stroke-dasharray="7 5"/> Metaphorical extension
      </li>
      <li>
        <svg ... stroke-dasharray="4 4"/> Construal variant
      </li>
      <li>
        <svg ... stroke-dasharray="2 4"/> Related to
      </li>
      <li>
        <svg ... stroke-dasharray="10 4"/> Subpart
      </li>
      <li>
        <svg ... stroke-dasharray="8 3 2 3"/> Polysemy
      </li>
    </ul>
  </section>

  <section aria-labelledby="graph-area-title">
    <h3 id="graph-area-title">Graph Area</h3>
    <div id="inheritance-graph" role="region" aria-label="Inheritance graph"></div>
  </section>
</section>
```

**Six legend items**
The legend now shows all six relation types used in the inheritance data (`constructarium_inheritance.json`): Instance, Metaphorical extension, Construal variant, Related to, Subpart, and Polysemy. Each maps directly to a `relation` value in the JSON. A "Construal variant" (earlier drafts said "Discourse variant") link shares the same argument structure but differs in how the event is construed — the passive is a construal variant of the transitive.

**`<svg class="legend-line-sample" ... aria-hidden="true">`**
Each legend item contains a small SVG element that renders a short line in the same visual style as the corresponding graph edge. `aria-hidden="true"` tells screen readers to ignore the SVG — the text label next to it already conveys the meaning. Using inline SVG means the visual pattern exactly matches the graph without loading separate image files.

**`<line ... stroke-dasharray="7 5">`**
`stroke-dasharray` controls the dash pattern of an SVG line. `7 5` means: draw 7 pixels, skip 5 pixels, repeat. Different patterns make each relation type visually distinct even in black and white.

**`role="region"` on the graph `<div>`**
`role="region"` is added alongside `aria-label` to ensure screen readers treat this as a named landmark region. Without a heading inside the `<div>`, the combination of `role` and `aria-label` gives it an accessible name.

**No standalone constructions list**
An earlier version of the HTML had a third sub-section for constructions with no edges. This has been removed — JavaScript handles this inside the graph rendering code.

---

### 1.9 Verb Explorer (lines 958–998)

```html
<section id="verb-explorer" aria-labelledby="verb-explorer-title">
  <h2 id="verb-explorer-title">Verb Explorer</h2>
  <p>Compare how the same verb appears in different constructions.</p>

  <nav aria-label="Verb sets">
    <ul class="verb-set-list" id="verb-set-list"></ul>
  </nav>

  <section id="slice-set" aria-labelledby="slice-set-title">
    <h3 id="slice-set-title">slice</h3>
    <table>
      <caption>Verb set entries for slice</caption>
      <thead>
        <tr>
          <th scope="col">Sentence</th>
          <th scope="col">Construction</th>
          <th scope="col">Source</th>
        </tr>
      </thead>
      <tbody id="slice-set-body"></tbody>
    </table>
  </section>

  <section id="cook-set" aria-labelledby="cook-set-title" hidden>
    ...
  </section>
</section>
```

**`<nav aria-label="Verb sets">`**
A second navigation element for switching between verb sets. It gets its own `aria-label` to distinguish it from the primary navigation in the header.

**`<ul class="verb-set-list" id="verb-set-list">`**
Empty in the HTML. JavaScript will add items here for each verb set. The items will contain `<span>` elements styled as pill-shaped buttons — not `<a>` tags — because switching verb sets does not navigate to a different page or anchor: it shows and hides content in place. *(Will be explained later in the semester.)*

**`<table>` with `<caption>`, `<thead>`, `<tr>`, `<th scope="col">`, `<tbody>`**
The verb data is true tabular data — rows and columns with defined headers — so a `<table>` is the semantically correct element, not a grid of `<div>` elements.

- **`<caption>`** — A visible title for the table, explicitly linked to the table by the browser. Screen readers announce it before reading the table.
- **`<thead>`** — Groups the header row. Browsers can repeat this row when a table spans multiple printed pages.
- **`<th scope="col">`** — A header cell. `scope="col"` explicitly tells screen readers that this header applies to the entire column below it, not just the adjacent cell. Without `scope`, screen readers have to guess.
- **`<tbody id="slice-set-body">`** — The body section of the table. The `id` is a JavaScript hook for injecting row data. *(Will be explained later in the semester.)*

**`<section id="cook-set" ... hidden>`**
The `hidden` attribute removes an element entirely — not just visually but from display and accessibility. The cook set starts hidden because JavaScript shows and hides sections as the user clicks verb-set navigation items. *(Will be explained later in the semester.)*

---

### 1.10 About and Sources (lines 1002–1044)

```html
<section id="about-sources" aria-labelledby="about-sources-title">
  <h2 id="about-sources-title">About and Sources</h2>

  <section aria-labelledby="about-title">
    <h3 id="about-title">About</h3>
    <p>Constructarium presents English grammatical constructions...</p>
  </section>

  <section aria-labelledby="what-is-cxg-title">
    <h3 id="what-is-cxg-title">What is Construction Grammar?</h3>
    <p>Construction Grammar (CxG) is one approach...</p>
  </section>

  <section aria-labelledby="what-are-constructions-title">
    <h3 id="what-are-constructions-title">What are Constructions?</h3>
    <p>Constructions themselves can be of different form...</p>
  </section>

  <section aria-labelledby="sources-title">
    <h3 id="sources-title">References</h3>
    <ul class="reference-list" id="reference-list"></ul>
  </section>
</section>
```

**Four sub-sections**
The About page is divided into four nested `<section>` elements, each with its own `<h3>`: a short project description, an explanation of Construction Grammar, an explanation of what constructions are, and the references list. This structure lets screen reader users navigate directly to the sub-topic they want.

**`<b>` inside the CxG paragraphs**
Key terms in the quotations (e.g. *"systematic collections of form-function pairings"*, *"not strictly predictable"*, *"sufficient frequency"*) are marked with `<b>`. `<b>` draws bold typographic attention without adding semantic importance; `<strong>` would imply that the term is critically urgent, which `<b>` does not.

**`<ul class="reference-list" id="reference-list">`**
Empty in the HTML. JavaScript will inject list items from the references data file. *(Will be explained later in the semester.)*

---

### 1.11 The footer (lines 1047–1049)

```html
<footer>
  <a href="imprint.html">Imprint</a>
</footer>
```

`<footer>` is a semantic landmark element. It marks the bottom of the page and typically contains legal notices, copyright, or contact links. The single `<a href="imprint.html">` link navigates to a separate `imprint.html` file — unlike the navigation links in the header, which all use `#anchor` links within the same page. The CSS gives the footer a top border and small secondary-colour text so it reads as clearly subordinate to the main content.

---

### 1.12 The script tags (lines 1051–1056)

```html
<script src="https://cdn.jsdelivr.net/npm/cytoscape@3.34.0/dist/cytoscape.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dagre@0.8.5/dist/dagre.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/cytoscape-dagre@4.0.0/dist/cytoscape-dagre.min.js"></script>

<script src="js/app.js"></script>
<script src="js/graph.js"></script>
```

**Why at the end of `<body>`?**
All `<script>` tags are placed at the very end of `<body>`, just before `</body>`. This placement is intentional: the browser reads HTML top to bottom. If the scripts were in the `<head>`, they would run before any HTML elements exist, and the JavaScript would try to find elements (like `#verb-set-list`) that haven't been created yet. By placing them last, all HTML elements are already in the document by the time the scripts run.

**Three CDN scripts for the inheritance graph**
The inheritance graph uses two external libraries loaded from a content delivery network (CDN — a fast file hosting service):

- **Cytoscape.js** — A graph visualisation library. It handles drawing nodes and edges, and zoom, pan, click, and hover interactions.
- **dagre** — A layout algorithm library that calculates layered, hierarchical node positions for directed graphs. Without it, Cytoscape would not know where to place each node on screen.
- **cytoscape-dagre** — The bridge between the two: it registers dagre as a layout option inside Cytoscape.

They are loaded in this exact order because `cytoscape-dagre` depends on both Cytoscape and dagre being already defined. JavaScript files run in the order they appear.

**`js/app.js` and `js/graph.js`**
The site's own JavaScript is split into two files. `app.js` handles all the interactive features of the page (navigation, comparison view, verb explorer, references). `graph.js` handles the inheritance graph separately because it depends on Cytoscape, which must be loaded first.

---

## 2. The CSS Stylesheet

### 2.0 Section 0 — Local Fonts

```css
@font-face {
  font-family: 'Inter';
  src: url('../fonts/Inter/Inter-VariableFont_opsz,wght.ttf') format('truetype');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}
```

**`@font-face`**
`@font-face` is the CSS rule for registering a custom font from a local file. It tells the browser: "When you need a font named 'Inter', load it from this path." Each `@font-face` block registers one variant — a combination of family name, weight range, and style (normal or italic).

**`font-family: 'Inter'`**
This is the name you will use elsewhere in your CSS (`font-family: "Inter"`). It does not need to match the filename — it is the label you define for this font.

**`src: url(...) format('truetype')`**
`url(...)` is the path to the font file, relative to the CSS file. Since the CSS file is inside `css/`, the `../` means "go up one folder." `format('truetype')` tells the browser what kind of font file it is (`.ttf` = TrueType format).

**`font-weight: 100 900`**
This is a *variable font* feature. A variable font is a single file that contains the entire weight range — from thin (100) to black (900) — rather than separate files for each weight. The value `100 900` tells the browser that this single file covers all weights in that range. Inter, JetBrains Mono, and Plus Jakarta Sans are all variable fonts.

**`font-display: swap`**
Controls what happens while the font is loading. `swap` means: display body text immediately in a fallback font, then swap to the correct font when it finishes loading. The alternative (`block`) would show invisible text until the font loads. `swap` prevents a flash of invisible text.

Your stylesheet registers **six font faces** in total:
- Inter (normal + italic)
- JetBrains Mono (normal + italic)
- Plus Jakarta Sans (normal + italic)

All three are loaded locally from the `fonts/` folder. This is more reliable than loading from Google Fonts because the page works without an internet connection and does not send requests to a third-party service.

---

### 2.1 Section 1 — Design Tokens

```css
:root {
  --bg: #f5f4f8;
  --surface: #ffffff;
  --text-primary: #1c1b22;
  --text-secondary: #6b6878;
  --border: #e2dff0;
  --accent: #b06000;
  --focus-ring: #b06000;
  --argument-structure: #1a5fa8;
  --argument-structure-tint: #ddeeff;
  --motion-activity: #1a7040;
  --motion-activity-tint: #d6f0e3;
  --fixed-pragmatic: #b82055;
  --fixed-pragmatic-tint: #ffdce8;
  --clause-combining: #6030a0;
  --clause-combining-tint: #ead9ff;
  --np-internal: #8a5500;
  --np-internal-tint: #fff0cc;
  --font-heading: "Plus Jakarta Sans", Arial, sans-serif;
  --font-body: "Inter", Arial, sans-serif;
  --font-notation: "JetBrains Mono", "Courier New", monospace;
}
```

**`:root`**
`:root` is a CSS pseudo-class that selects the root element of the document — the `<html>` element. CSS custom properties (variables) defined here are accessible everywhere in the stylesheet.

**`--variable-name: value`**
CSS custom properties store reusable values. Every colour and font is defined once here and referenced everywhere else with `var(--name)`. If you want to change the accent colour, you change one line and it updates across the entire file.

**Why these specific colours?**
- `--bg: #f5f4f8` — A cool off-white with a slight purple tint, matching the dark purple header and overall palette.
- `--surface: #ffffff` — Pure white for content panels. The contrast between off-white background and white surface creates subtle depth.
- `--text-primary: #1c1b22` — Near-black with a slight cool-purple tint. Softer than pure black but still high-contrast.
- `--text-secondary: #6b6878` — A grey for secondary information (captions, metadata). It reduces visual weight without making text unreadable.
- `--accent: #b06000` — An amber-brown used for hover states and active indicators. It creates warm contrast against the cool purple tones of the header and background.
- `--focus-ring: #b06000` — The same amber for keyboard focus outlines, keeping the focus state consistent with the hover colour.

**Tint variables**
Each cluster now has two colour variables:
- `--argument-structure: #1a5fa8` — The saturated blue used for headings and left-border highlights.
- `--argument-structure-tint: #ddeeff` — A pastel version of the same blue used as the card background.

This two-variable pattern means construction cards are visually associated with their cluster colour through a light background, while the full saturated colour is reserved for borders and headings.

**`--font-heading: "Plus Jakarta Sans"`**
The heading font is Plus Jakarta Sans — a geometric sans-serif. The fallback chain (`Arial, sans-serif`) ensures headings remain readable if the font file fails to load. An earlier version used Lora (a serif typeface); the switch to a sans-serif heading font gives the interface a cleaner, more modern feel that is more consistent with the sans-serif body text.

---

### 2.2 Section 2 — Global Reset and Base Styles

```css
*,
*::before,
*::after {
  box-sizing: border-box;
}
```

**The universal selector `*`**
`*` matches every element. `*::before` and `*::after` also cover CSS pseudo-elements. This rule sets `box-sizing: border-box` on everything.

**`box-sizing: border-box`**
By default, browsers use `box-sizing: content-box`, which means if you give an element `width: 200px; padding: 1rem`, the total rendered width is `200px + 32px = 232px`. With `border-box`, padding and border are included inside the declared width, so `width: 200px` always means exactly 200px. This makes layout calculations predictable and prevents the common bug where adding padding to a grid item breaks the layout.

```css
html {
  font-size: 16px;
}
```

Setting `font-size: 16px` on `<html>` establishes the *root em* value. All the `rem` units in the stylesheet are multiples of this value: `1rem = 16px`, `0.875rem = 14px`, `2rem = 32px`.

```css
body {
  margin: 0;
  background: var(--bg);
  color: var(--text-primary);
  font-family: var(--font-body);
  font-size: 1rem;
  line-height: 1.6;
}
```

- `margin: 0` — Browsers add a small default margin to `<body>`. This removes it.
- `background: var(--bg)` — Sets the cool off-white page background.
- `color: var(--text-primary)` — Sets the default text colour. Child elements inherit this unless overridden.
- `font-family: var(--font-body)` — Sets Inter as the default font. Inherited by all text elements.
- `line-height: 1.6` — A unitless value meaning 1.6× the element's font size. This is a widely-used comfortable reading value for body text.

```css
section,
article {
  scroll-margin-top: 4.5rem;
}
```

When a browser scrolls to an anchor (e.g. `#home`), it aligns the element exactly to the top of the viewport. With a sticky header, the header would overlap the content. `scroll-margin-top: 4.5rem` adds an offset above the element when it is scrolled to. The value is larger than in earlier versions (was `1rem`) because the header is now sticky and taller — the offset needs to match the header height.

```css
main,
footer {
  width: min(100% - 1rem, 1200px);
  margin: 0 auto;
}
```

`min(100% - 1rem, 1200px)` means: use whichever value is smaller — `100% - 1rem` (the full viewport width minus a 1rem breathing margin) or `1200px`. On narrow screens the content fills the available width with a small margin. On wide screens it is capped at 1200px. `margin: 0 auto` centers the element. Notice that `header` is no longer in this group — the header stretches the full viewport width so its dark purple background covers the entire screen edge to edge, and only the `<nav>` inside it is centered.

```css
header {
  background: #2e1a6e;
  position: sticky;
  top: 0;
  z-index: 100;
}
```

The header is now **sticky**: it stays fixed at the top of the screen as the user scrolls. `position: sticky; top: 0` makes it stick to the top edge of the viewport. `z-index: 100` ensures it always appears on top of other page content (including graph elements or overlapping sections). The dark purple colour (`#2e1a6e`) makes the navigation clearly visible against any content that scrolls beneath it.

```css
h1, h2, h3, h4 {
  font-family: var(--font-heading);
  font-weight: 600;
  line-height: 1.25;
  margin-top: 0;
  margin-bottom: 0.75rem;
}
h1 { font-size: 2rem; }
h2 { font-size: 1.25rem; }
h3 { font-size: 1.125rem; }
h4 { font-size: 1rem; }
```

All four heading levels use Plus Jakarta Sans at `font-weight: 600` (semi-bold). Adding `h4` to this rule is necessary because construction details and the comparison view now use a four-level heading hierarchy. The sizes create a clear visual progression: `2rem → 1.25rem → 1.125rem → 1rem`.

```css
p, ul, ol, blockquote {
  margin-top: 0;
  margin-bottom: 1rem;
}
```

Browser defaults add margins both above and below paragraphs and lists. This rule removes the top margin and standardises the bottom margin to `1rem`, giving consistent vertical rhythm throughout the page.

```css
p, li, th, td, caption, a {
  font-family: var(--font-body);
}
```

Explicitly sets the body font on all text-carrying elements. This is needed because headings override the font from `body`, so any elements nested inside a heading (like an `<a>` inside an `<h3>`) would otherwise inherit the heading font.

```css
p {
  max-width: 72ch;
}
```

`72ch` means 72 characters wide. Long lines (over ~80 characters) are harder to read because the eye has to travel further across the line. `ch` is a CSS unit equal to the width of the `0` character in the current font. This rule keeps body paragraphs at a comfortable reading width.

---

### 2.3 Section 3 — Basic Element Styling

```css
ul {
  padding-left: 1.25rem;
}
li + li {
  margin-top: 0.5rem;
}
```

Browser default list indentation is around 40px. This rule reduces it to `1.25rem` (20px). `li + li` adds a small gap between adjacent list items. The `+` is a *sibling combinator* — it only matches an `<li>` that immediately follows another `<li>`, so the first item gets no extra top margin.

```css
caption {
  margin-bottom: 0.75rem;
  font-weight: 700;
  text-align: left;
}
th {
  font-weight: 700;
}
td {
  font-weight: 400;
}
```

Table captions get bold weight and bottom margin to stand out as table titles. Column headers (`<th>`) are bold; data cells (`<td>`) are regular weight — reinforcing the distinction between labels and content. Browser default for `<th>` is center-aligned; `text-align: left` on `th, td` in the table rule below overrides this.

```css
.skip-link {
  position: absolute;
  top: 0.5rem;
  left: 0.5rem;
  z-index: 10;
  padding: 0.75rem 1rem;
  background: var(--surface);
  border: 1px solid var(--border);
  color: var(--text-primary);
  text-decoration: none;
  transform: translateY(-140%);
}
.skip-link:focus {
  transform: translateY(0);
}
```

- `position: absolute` — Takes the link out of the normal document flow.
- `transform: translateY(-140%)` — Moves the link 140% of its own height upward, hiding it above the viewport. This is the standard technique: the link is in the DOM (accessible to keyboard and screen readers) but not visible.
- `.skip-link:focus { transform: translateY(0) }` — When a keyboard user tabs to the link, the focus state removes the transform and brings the link into view.
- `z-index: 10` — Ensures the link appears on top of other content when visible.

```css
caption,
nav ul,
article > p,
section > p,
aside > p {
  color: var(--text-secondary);
}

caption,
nav ul,
article > p,
aside > p {
  font-size: 0.875rem;
}
```

The first rule applies a grey colour to metadata-like text. The second rule reduces the font size for the same elements, excluding `section > p` (section introductory paragraphs keep the default body size since they serve as descriptions, not footnotes). The `>` child combinator means these rules only target direct children — not paragraphs nested deeper inside other elements.

```css
caption,
nav ul,
.detail-link-list a,
#comparison-view > p,
#verb-explorer > p,
#inheritance-network > p,
#home > p {
  letter-spacing: 0.01em;
}
```

A very slight letter-spacing is applied to small helper text and section introductory paragraphs. At small sizes, a tiny amount of additional spacing makes text feel more open and readable.

```css
.notation {
  font-family: var(--font-notation);
  font-size: 0.9rem;
  color: var(--text-primary);
}
```

JetBrains Mono applied to any element with `class="notation"`. The font size is slightly smaller than body text because monospace fonts appear larger at the same size. The colour is `--text-primary` rather than secondary grey because notation is primary information, not metadata.

```css
blockquote {
  margin-left: 0;
  padding-left: 1rem;
  border-left: 3px solid var(--border);
}
```

Removes the browser's large default left margin on `<blockquote>`. `padding-left: 1rem` adds internal spacing from the left border. `border-left: 3px solid var(--border)` is the visible left-rule that marks corpus examples as quoted material.

```css
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
}
th, td {
  padding: 0.6rem;
  border: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}
```

- `border-collapse: collapse` — By default, table cells have separate borders with a gap between them. `collapse` merges adjacent borders into one line.
- `padding: 0.6rem` — The base padding for narrow screens. A responsive rule at 680px increases this to `0.75rem`.
- `vertical-align: top` — Cells with multi-line content align their text to the top of the cell.

---

### 2.4 Section 4 — Main Page Shell

```css
main > section {
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
}
main > section:first-child {
  border-top: 0;
}
main > section {
  background: var(--surface);
  padding: 1.25rem;
  margin-top: 1.5rem;
  border: 1px solid var(--border);
}
main > section:first-child {
  margin-top: 0;
}
```

Two separate `main > section` rule blocks — CSS applies both. Together they give each major section a white background, a full border, internal padding, and a top margin that separates sections from each other. The `>` child combinator means this only targets `<section>` elements that are direct children of `<main>`, not the nested sections inside them. `:first-child` removes the border and top margin from the home section so it sits flush against the navigation bar.

```css
header nav[aria-label="Primary"] {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 0.75rem;
  padding: 0.75rem 1rem;
  max-width: 1200px;
  margin: 0 auto;
}
```

**Flexbox** is used for the navigation bar. `display: flex` places the wordmark, hamburger button, and nav list in a row. The selector `nav[aria-label="Primary"]` uses an *attribute selector* — it targets only the `<nav>` with exactly that `aria-label` value, leaving the Verb Explorer nav unaffected. `max-width: 1200px; margin: 0 auto` centers the nav content within the full-width purple header.

- `align-items: center` — Vertically centers the wordmark and hamburger button.
- `justify-content: space-between` — Pushes the wordmark to the left and the nav list to the right.
- `flex-wrap: wrap` — Allows the hamburger button and nav list to wrap to new lines on very narrow screens.

```css
header nav[aria-label="Primary"] > a {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: 700;
  color: #ffffff;
  text-decoration: none;
}
header nav[aria-label="Primary"] ul {
  color: rgba(255, 255, 255, 0.88);
  ...
}
header nav[aria-label="Primary"] a:hover {
  color: #ffe8c0;
}
```

The wordmark is large, bold, and white. Nav links are slightly translucent white (`rgba(255,255,255,0.88)`) to distinguish them visually from the wordmark. Hovering turns links to a pale warm gold (`#ffe8c0`), giving a visible interactive response against the purple background.

```css
a:hover {
  color: var(--accent);
}
a:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
```

- `a:hover` — Applies when a mouse user moves over a link. The amber accent colour signals interactivity.
- `a:focus-visible` — Applies when a *keyboard* user focuses a link via Tab. `:focus-visible` is smarter than `:focus` — it only shows the outline for keyboard navigation, not when a mouse user clicks a link. `outline` is drawn outside the element box so it does not shift layout. `outline-offset: 3px` adds space between the element border and the focus ring.

```css
.nav-toggle {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem;
  border-radius: 0.25rem;
}
.nav-toggle span {
  display: block;
  width: 22px;
  height: 2px;
  background: rgba(255, 255, 255, 0.88);
  border-radius: 2px;
  transition: transform 200ms ease, opacity 200ms ease;
}
.nav-toggle[aria-expanded="true"] span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}
.nav-toggle[aria-expanded="true"] span:nth-child(2) {
  opacity: 0;
}
.nav-toggle[aria-expanded="true"] span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}
```

The hamburger button is a `<button>` with no visible background or border (`background: none; border: none`). The three `<span>` children are the bars: each is a thin white rectangle, `22px × 2px`. When the button's `aria-expanded` attribute is `"true"` (set by JavaScript when the menu opens):

- The first bar moves down 7px and rotates 45 degrees.
- The middle bar fades out (`opacity: 0`).
- The third bar moves up 7px and rotates −45 degrees.

Together the first and third bars form an × shape. The `transition` rule animates this at 200ms. `nth-child(1/2/3)` selects each span by its position among its siblings.

---

### 2.5 Section 5 — Reusable Card and List Patterns

```css
.entry-point-list,
.construction-card-list,
.detail-link-list,
.example-list,
.cross-construction-list,
.reference-list,
.legend-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

All custom list types have default browser styles removed. `margin: 0` and `padding: 0` remove the default indentation. `list-style: none` removes bullet points. These lists are styled as cards or grids, not bullet lists.

```css
.entry-point-list,
.construction-card-list {
  display: grid;
  gap: 1rem;
}
```

Both card-grid lists use `display: grid`. The number of columns is set in responsive rules: 1 column on mobile, 2 at 680px, 4 or 3 columns at 900px. Base styles are for the narrowest screens first.

```css
.entry-point-card,
.construction-card,
.detail-link-list li,
.example-list li,
.cross-construction-list li,
.reference-list li,
.legend-list li {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 0.25rem;
}
```

All these elements share the same card appearance: white background, subtle border, internal padding, and slightly rounded corners. `border-radius: 0.25rem` is intentionally small — just enough to soften corners without looking overstated.

```css
.entry-point-card:hover,
.construction-card:hover,
.detail-link-list li:hover,
.comparison-pair-list li:hover,
nav[aria-label="Verb sets"] a:hover {
  border-color: var(--accent);
}
```

On hover, the card border changes to the amber accent colour. This gives interactive cards a clear visual response without moving or resizing them.

```css
.entry-point-card a {
  display: block;
  font-family: var(--font-heading);
  font-size: 1.125rem;
  color: var(--text-primary);
}
```

Entry point card links are displayed as blocks (filling the full card width), use the heading font for emphasis, and are slightly larger than body text.

```css
.detail-link-list,
.example-list,
.cross-construction-list,
.reference-list,
.legend-list {
  display: grid;
  gap: 0.75rem;
}
```

These vertical-list types also use grid layout for consistent spacing via `gap`, rather than relying on margins which can collapse unexpectedly in certain layouts.

```css
.detail-link-list li + li,
.example-list li + li,
.cross-construction-list li + li,
.reference-list li + li,
.legend-list li + li,
.construction-card-list li + li,
.entry-point-list li + li {
  margin-top: 0;
}
```

The global `li + li { margin-top: 0.5rem }` from Section 3 would add unwanted extra space to grid items that already have `gap` for their spacing. This override resets that margin to zero for all grid-based lists.

---

### 2.6 Section 6 — Construction Index and Detail Styling

```css
#construction-index > section h3,
#construction-detail article h3 {
  padding-bottom: 0.5rem;
  border-bottom: 1px solid var(--border);
}
```

Cluster headings in the index and construction-name headings in the detail section get a bottom border. This acts as a visual divider separating the heading from the content below it, giving each card and each detail article a clearer internal structure.

```css
#argument-structure-title { color: var(--argument-structure); }
#motion-activity-title    { color: var(--motion-activity); }
#fixed-pragmatic-title    { color: var(--fixed-pragmatic); }
#clause-combining-title   { color: var(--clause-combining); }
#np-internal-title        { color: var(--np-internal); }
```

Each cluster heading gets its cluster colour via `id` selectors. There is exactly one of each in the document, so `id` selectors (which have higher specificity than class selectors) are appropriate here.

```css
#construction-index section:nth-of-type(1) .construction-card {
  background: var(--argument-structure-tint);
  border-left: 4px solid var(--argument-structure);
}
#construction-index section:nth-of-type(2) .construction-card {
  background: var(--motion-activity-tint);
  border-left: 4px solid var(--motion-activity);
}
...
```

`section:nth-of-type(1)` selects the first `<section>` among its siblings inside `#construction-index` — the Argument Structure cluster. Cards in that cluster get a pastel tint background and a 4px coloured left border. Each cluster maps to its own tint and accent colour without needing separate classes on every card.

```css
.construction-card {
  height: 100%;
}
```

Cards fill their grid cell height. This ensures all cards in the same grid row have the same height, even if some cards have more text.

```css
#construction-detail article[id^="detail-"] {
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0.25rem;
}
#construction-detail article[id^="detail-"]:first-of-type {
  margin-top: 0;
}
```

`article[id^="detail-"]` is an *attribute selector with a prefix match*. `^=` means "starts with." This selects every `<article>` whose `id` starts with `"detail-"` — all twelve construction articles — without needing to list each id separately. `:first-of-type` removes the top margin from the first article so it sits flush against the detail link list above it.

---

### 2.7 Section 7 — Comparison View

```css
.comparison-layout {
  display: grid;
  gap: 1.5rem;
  align-items: start;
}
```

The comparison layout uses a single-column grid in the base (mobile) style. At 900px, a responsive rule adds the sidebar column (`grid-template-columns: minmax(220px, 280px) 1fr`). `align-items: start` prevents the shorter column from stretching to match the taller one.

```css
#comparison-pair-detail {
  padding: 1.5rem;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0.25rem;
}
```

The selected comparison panel has its own card-like styling — a visible bordered panel that distinguishes it from the outer section background.

```css
.comparison-sentences {
  display: grid;
  gap: 1rem;
  margin-bottom: 1.5rem;
}
.comparison-sentences article {
  padding: 1rem;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0.25rem;
}
```

The two construction articles sit in a single-column grid on mobile, side by side in two equal columns at 680px. Each article has its own card styling — a bordered panel that visually frames it as a distinct block.

```css
.comparison-pair-list li[aria-current="true"] {
  color: var(--accent);
  font-weight: 600;
}
```

`[aria-current="true"]` is the attribute that JavaScript sets on the currently-selected pair item. *(Will be explained later in the semester.)* The selector targets the `<li>` directly — not a child `<a>` — because the list items have no anchor element inside them. The CSS styles the active item in amber and bold to mark it as selected.

---

### 2.8 Section 8 — Verb Explorer

```css
nav[aria-label="Verb sets"] li span {
  display: inline-block;
  padding: 0.5rem 1.1rem;
  background: var(--surface);
  border: 1.5px solid var(--border);
  color: var(--text-secondary);
  border-radius: 999px;
  cursor: pointer;
  font-size: 1rem;
}
nav[aria-label="Verb sets"] li span.active {
  background: #2e1a6e;
  border-color: #2e1a6e;
  color: #ffffff;
  font-weight: 600;
}
```

The verb-set navigation uses `<span>` elements styled as pill-shaped buttons. `border-radius: 999px` creates fully rounded ends — a very large radius on a short element produces a pill shape. The active pill gets the same dark purple as the header. This uses a `.active` class (added by JavaScript) rather than `aria-current` because the spans are not links. *(Will be explained later in the semester.)*

```css
#verb-explorer table {
  display: block;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  margin-bottom: 2rem;
}
```

`display: block` combined with `overflow-x: auto` makes the table horizontally scrollable on narrow screens instead of overflowing the page. `-webkit-overflow-scrolling: touch` is a legacy Safari property that enables smooth momentum scrolling on iOS.

```css
#verb-explorer th {
  background: #eeeaf8;
  color: var(--text-primary);
}
#verb-explorer td:first-child {
  width: auto;
}
```

The header row of the verb table gets a light lavender background, coordinating with the overall cool-purple tone. The sentence column has no fixed width in the base style — a responsive rule at 680px sets it to 50%.

```css
.annotation-note {
  margin-top: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
```

Annotation notes inside table cells are smaller and greyer than the sentence text — secondary metadata, not primary content.

---

### 2.9 Section 9 — Home and Inheritance Sections

```css
#home .entry-point-list {
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-top: 1.5rem;
}
#home .entry-point-card {
  background: #2e1a6e;
  border: 2px solid transparent;
  border-radius: 999px;
  padding: 0.75rem 1.5rem;
  color: #ffffff;
}
#home .entry-point-card a {
  display: inline;
  font-size: 1rem;
  font-weight: 600;
  color: #ffffff;
}
#home .entry-point-card:hover {
  background: var(--accent);
  border-color: transparent;
}
```

The home entry-point list overrides the default card-grid CSS to become a **flex row** of pill-shaped buttons. These rules are *more specific* than the earlier card rules (they use `#home .entry-point-card` vs. `.entry-point-card`) so they win the specificity competition and override the white card appearance. The dark purple matches the header, making the entry points feel like extensions of the primary navigation. On hover the background switches to amber.

```css
#inheritance-network section {
  padding: 1.25rem;
  border: 1px solid var(--border);
  background: var(--surface);
  border-radius: 0.25rem;
}
```

Each sub-section of the Inheritance page (Legend, Graph Area) gets its own bordered white panel, giving the page a structured appearance before the graph is rendered.

```css
#inheritance-network .legend-list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}
.legend-line-sample {
  flex-shrink: 0;
}
```

Legend items are flex rows: the SVG line sample on the left, the text label on the right. `align-items: center` vertically centers them. `flex-shrink: 0` on the SVG prevents it from being compressed when the container is narrow.

```css
#inheritance-graph {
  height: 250px;
  padding: 1rem;
  border: 1px dashed var(--border);
  background: var(--surface);
  overflow-x: auto;
}
```

The graph container uses a dashed border to signal "this area is a canvas placeholder." `height: 250px` gives it a defined size on small screens (a responsive rule at 680px increases this to `500px`). `overflow-x: auto` allows the graph to scroll horizontally if it is wider than its container.

---

### 2.10 Section 10 — Responsive Rules

The responsive approach is **mobile-first**: the base CSS is written for the narrowest screens, and `@media (min-width: ...)` rules progressively add enhancements for wider screens. This is the opposite of a desktop-first (`max-width`) approach. Mobile-first is the standard recommendation because most web traffic comes from mobile devices.

**At 680px (tablet):**

```css
@media (min-width: 680px) {
  main > section { padding: 2rem; }
  .comparison-sentences { grid-template-columns: repeat(2, minmax(0, 1fr)); }
  .entry-point-list { grid-template-columns: repeat(2, 1fr); }
  .construction-card-list { grid-template-columns: repeat(2, 1fr); }
  .detail-link-list { grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); }
  #inheritance-network .legend-list { grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); }
  th, td { padding: 0.75rem; }
  #verb-explorer td:first-child { width: 50%; }
  #inheritance-graph { height: 500px; }
}
```

- Sections get more internal padding.
- The comparison sentences switch to two equal columns (`minmax(0, 1fr)` prevents overflow from long text).
- Entry points and construction cards switch to 2-column grids.
- The detail link list uses `auto-fit` (as many 220px-minimum columns as fit).
- The legend becomes a multi-column grid.
- Table cell padding increases from `0.6rem` to `0.75rem`.
- The sentence column in the verb table gets fixed at 50% width.
- The inheritance graph grows from 250px to 500px height.

**At 900px (desktop):**

```css
@media (min-width: 900px) {
  main, footer { width: min(1200px, calc(100% - 2rem)); }
  header nav[aria-label="Primary"] { flex-direction: row; align-items: center; ... }
  header nav[aria-label="Primary"] ul { justify-content: flex-end; }
  .comparison-layout { grid-template-columns: minmax(220px, 280px) 1fr; }
  .entry-point-list { grid-template-columns: repeat(4, 1fr); }
  .construction-card-list { grid-template-columns: repeat(3, 1fr); }
  .nav-toggle { display: none; }
}
```

- Main content and footer switch to a wider centering formula with 2rem side margins.
- The navigation becomes a full horizontal row with links right-aligned.
- The comparison layout gains its sidebar: 220–280px for the pair list, remaining space for the detail panel.
- Entry points expand to a 4-column row (one pill per entry point).
- Construction cards expand to 3 columns.
- The hamburger button is hidden (`display: none`) since the full nav list is always visible at this width.

**Mobile hamburger rule:**

```css
@media (max-width: 899px) {
  #primary-nav-list {
    display: none;
    width: 100%;
    flex-direction: column;
    gap: 0.75rem;
    padding-top: 0.25rem;
  }
  #primary-nav-list.nav-open {
    display: flex;
  }
}
```

This is the one `max-width` rule in the stylesheet. On screens narrower than 900px, the nav list is hidden by default (`display: none`). When JavaScript adds the class `.nav-open`, the list becomes a vertical flex column. Note that `display: none` inside this `max-width: 899px` block only applies on mobile — at 900px and above the `min-width: 900px` block takes over and the hamburger rule no longer applies, so the list is always visible.

---

*End of tutorial. Last updated June 2026 (major revision: local fonts via `@font-face`, sticky dark-purple header, mobile-first responsive approach, Plus Jakarta Sans heading font, cluster tint card backgrounds, hamburger navigation with animated × toggle, updated heading hierarchy h1–h4, six-type inheritance legend with inline SVG samples, entry-point pills, Cytoscape + dagre graph library scripts; accessibility fixes: comparison pair active state via `li[aria-current="true"]`, keyboard support for comparison pairs and verb-set tabs, hamburger navigation and footer added to imprint.html; footer uses plain `<span>` instead of `<a>` to avoid a redundant link alongside the header wordmark; added Section 3: Accessibility documenting all WCAG 2.1 AA decisions — language, landmarks, heading hierarchy, skip link, navigation labelling, keyboard focus styles, ARIA labels, tables, decorative SVG, hidden content, colour contrast; verified with WAVE).*

---

## 3. Accessibility

Constructarium targets **WCAG 2.1 Level AA**. This means the site must be perceivable, operable, understandable, and robust for users who navigate with a keyboard, use a screen reader, or rely on high contrast and zoom. Compliance was verified with the **WAVE** browser extension, which flags missing labels, contrast errors, and structural problems. The decisions below are organised by the aspect of accessibility they address.

---

### 3.1 Language and page identity

```html
<html lang="en">
```

**`lang="en"`**
Screen readers need to know what language the page is written in so they can choose the correct speech engine and pronunciation rules. Without `lang`, a German screen reader might read English words with German phonetics. This attribute satisfies WCAG 3.1.1 (Language of Page).

The `<title>Constructarium</title>` element in the `<head>` gives the page an accessible name that screen readers announce when the page loads and that appears in the browser tab. This satisfies WCAG 2.4.2 (Page Titled).

---

### 3.2 Semantic landmarks and heading hierarchy

```html
<header> … </header>
<nav aria-label="Primary"> … </nav>
<main> … </main>
<aside aria-labelledby="comparison-pairs-title"> … </aside>
<footer> … </footer>
```

**Semantic landmark elements**
HTML5 landmark elements (`<header>`, `<nav>`, `<main>`, `<aside>`, `<footer>`, `<section>`, `<article>`) carry built-in roles that screen readers expose in a landmark list. A screen reader user can jump directly to the main content, to the navigation, or to the footer without reading everything in between. Using `<div>` for these structures would remove that ability entirely.

**The heading hierarchy**
```html
<h1>Constructarium</h1>          <!-- one per page -->
  <h2>Construction Index</h2>
    <h3>Argument Structure</h3>
      <h4>Intransitive Construction</h4>
```

There is exactly one `<h1>` on the page, placed in the home section. Every major page section uses `<h2>`. Cluster headings inside the index use `<h3>`, and individual construction titles inside those clusters use `<h4>`. No heading level is skipped anywhere on the page. This matters because screen readers offer a "jump to next heading" shortcut, and users rely on the hierarchy to understand the document structure. A gap (e.g. jumping from `<h2>` to `<h4>`) would imply a missing level and confuse that navigation. This satisfies WCAG 1.3.1 (Info and Relationships) and WCAG 2.4.6 (Headings and Labels).

**`aria-labelledby` on every section and article**
```html
<section id="construction-index" aria-labelledby="construction-index-title">
  <h2 id="construction-index-title">Construction Index</h2>
```

Every `<section>` and `<article>` has `aria-labelledby` pointing to its heading. This connects the region to its name in the accessibility tree, so a screen reader announces "Construction Index, region" when the user navigates there, rather than just "region." The heading `id` exists solely for this purpose — it is not used for anchor navigation.

---

### 3.3 Skip link

```html
<a class="skip-link" href="#home">Skip to main content</a>
```

```css
.skip-link {
  position: absolute;
  transform: translateY(-140%);
}
.skip-link:focus {
  transform: translateY(0);
}
```

This is the first element in the document — before the header and navigation. A keyboard user who presses Tab will focus it immediately. Clicking or pressing Enter jumps directly to the `#home` section, bypassing the navigation bar.

The link is invisible to mouse users because `transform: translateY(-140%)` moves it above the viewport. It is still in the DOM, which means screen readers and keyboards can reach it. When it receives focus, the transform is removed and it slides into view. This technique is preferred over `display: none` or `visibility: hidden`, both of which would remove the element from the focus order entirely.

This satisfies WCAG 2.4.1 (Bypass Blocks), which requires a mechanism to skip repeated navigation on every page.

---

### 3.4 Navigation: labelling and state

**Two `<nav>` elements with distinct labels**
```html
<nav aria-label="Primary"> … </nav>        <!-- header navigation -->
<nav aria-label="Verb sets"> … </nav>       <!-- Verb Explorer tabs -->
```

The page contains two navigation regions. Without labels, a screen reader would announce "navigation" twice, giving the user no way to distinguish them. `aria-label` gives each nav an accessible name, so they are announced as "Primary navigation" and "Verb sets navigation." This satisfies WCAG 2.4.6 (Headings and Labels).

**Hamburger button state**
```html
<button class="nav-toggle" aria-expanded="false" aria-label="Navigation öffnen">
```

`aria-expanded` communicates whether the navigation menu is currently open or closed. JavaScript updates this attribute between `"false"` and `"true"` every time the button is clicked. Without it, a screen reader user pressing the button would have no feedback about whether anything happened. `aria-label` gives the button its accessible name because the button contains only three empty `<span>` elements (the visual bars) and no readable text. This satisfies WCAG 4.1.2 (Name, Role, Value).

**Active comparison pair**
```css
.comparison-pair-list li[aria-current="true"] {
  color: var(--accent);
  font-weight: 600;
}
```

When the user selects a comparison pair, JavaScript sets `aria-current="true"` on the active list item. This is both a visual signal (amber and bold) and a semantic one — screen readers announce the item as "current." This satisfies WCAG 4.1.2 (Name, Role, Value).

---

### 3.5 Keyboard focus styles

```css
a:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}

.entry-point-card a:focus-visible,
.construction-card a:focus-visible,
.detail-link-list a:focus-visible,
.comparison-pair-list li:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
```

**`:focus-visible` instead of `:focus`**
`:focus-visible` is a CSS pseudo-class that the browser applies only when the element was reached by keyboard navigation, not by mouse click. Using `:focus` would show a visible outline every time a mouse user clicks a link, which is visually distracting. `:focus-visible` gives keyboard users a clear indicator while leaving the mouse experience unchanged.

The focus ring is `3px solid #b06000` (the amber accent colour) with `3px offset`. The `outline` property is drawn outside the element's box, so it does not shift layout — unlike `border`, which would move surrounding content. The offset creates a small gap between the element edge and the ring, making the ring more legible on both light and dark backgrounds.

This satisfies WCAG 2.4.7 (Focus Visible).

---

### 3.6 ARIA labels and regions

**Named region for the inheritance graph**
```html
<div id="inheritance-graph" role="region" aria-label="Inheritance graph"></div>
```

The inheritance graph is a `<div>` container that Cytoscape.js fills with a canvas element at runtime. A plain `<div>` has no semantic role, so screen readers would ignore it or describe it without context. Adding `role="region"` promotes it to a named landmark, and `aria-label="Inheritance graph"` gives it an accessible name. Unlike most other regions on the page, there is no heading inside this `<div>`, so `aria-labelledby` cannot be used — `aria-label` is the correct alternative when there is no visible heading to reference. This satisfies WCAG 1.3.1 (Info and Relationships).

---

### 3.7 Tables

```html
<table>
  <caption>Verb set entries for slice</caption>
  <thead>
    <tr>
      <th scope="col">Sentence</th>
      <th scope="col">Construction</th>
      <th scope="col">Source</th>
    </tr>
  </thead>
  <tbody id="slice-set-body"></tbody>
</table>
```

The verb data is genuinely tabular — rows and columns with clear headers — so `<table>` is the correct element. Using a grid of `<div>` elements would look the same visually but strip all semantic structure.

**`<caption>`** gives the table a visible title that is programmatically associated with it. Screen readers announce the caption before reading the table, so users know what they are about to hear.

**`<th scope="col">`** explicitly declares that each header cell applies to the column below it. Without `scope`, screen readers have to guess whether a `<th>` is a row header or a column header, which can produce incorrect announcements. `scope="col"` removes all ambiguity.

This satisfies WCAG 1.3.1 (Info and Relationships).

---

### 3.8 Decorative SVG

```html
<svg class="legend-line-sample" width="40" height="14" aria-hidden="true">
  <line x1="2" y1="7" x2="38" y2="7" stroke="#9baab8" stroke-width="2.5"/>
</svg>
Instance
```

Each legend item shows a small SVG line sample followed by a text label. The SVG is purely decorative — the text label already conveys the meaning. Adding `aria-hidden="true"` tells screen readers to skip the SVG entirely. Without it, the screen reader would attempt to describe the SVG element, producing redundant or confusing output alongside the text label.

This satisfies WCAG 1.1.1 (Non-text Content), which requires either a text alternative for meaningful images or `aria-hidden` for decorative ones.

---

### 3.9 Hidden content

```html
<section id="cook-set" aria-labelledby="cook-set-title" hidden>
```

The `hidden` attribute removes an element from rendering *and* from the accessibility tree. This is the correct technique for content that should be genuinely absent until activated — not just visually invisible. A screen reader navigating the page will not encounter the cook set until JavaScript removes the `hidden` attribute, at which point it becomes available exactly like any other section.

This is preferable to `visibility: hidden` (which hides visually but may still be announced by some screen readers) and to `opacity: 0` (which hides visually but leaves the element fully interactive and accessible). This satisfies WCAG 1.3.1 (Info and Relationships) and WCAG 4.1.2 (Name, Role, Value).

---

### 3.10 Colour contrast

WCAG 1.4.3 (Contrast Minimum) requires a contrast ratio of at least **4.5 : 1** for normal body text at Level AA.

**Primary text**
`--text-primary: #1c1b22` on `--bg: #f5f4f8` and `--surface: #ffffff` both meet and exceed this threshold. Near-black text on a near-white or white background is the most reliable contrast combination.

**Secondary text**
`--text-secondary: #6b6878` produces lower contrast on the coloured cluster card backgrounds. This is explicitly noted in the CSS with the comment: *"On coloured card backgrounds --text-secondary lacks contrast; use primary text colour."* Wherever secondary text appears on a coloured background, the rule is overridden to use `--text-primary` instead.

**Navigation links**
White (`#ffffff`) on the dark purple header (`#2e1a6e`) provides a contrast ratio well above 4.5 : 1. The hover state (`#ffe8c0`, pale warm gold) on the same purple background also maintains sufficient contrast.

**Focus ring**
The amber focus ring (`--focus-ring: #b06000`) on a white surface meets contrast requirements. Against the off-white background it is similarly legible.

The entire page was verified with the **WAVE** accessibility evaluation tool, which found no contrast errors and no missing labels.

---
