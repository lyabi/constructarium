# Constructarium — Personal Code Tutorial

This document walks through every line of `index.html` and `css/style.css` so you can explain each decision in a presentation and answer follow-up questions about it.

---

## Table of Contents

1. [The HTML Document](#1-the-html-document)
   - [The document shell](#11-the-document-shell-lines-1-13)
   - [The skip link](#12-the-skip-link-line-16)
   - [The header and navigation](#13-the-header-and-navigation-lines-17-29)
   - [The home section](#14-the-home-section-lines-33-52)
   - [Construction Index](#15-construction-index-lines-55-177)
   - [Construction Details](#16-construction-details-lines-180-516)
   - [Comparison View](#17-comparison-view-lines-519-563)
   - [Inheritance Network](#18-inheritance-network-lines-566-590)
   - [Verb Explorer](#19-verb-explorer-lines-593-634)
   - [About and Sources](#110-about-and-sources-lines-637-653)
   - [The footer](#111-the-footer)
   - [The script tag](#112-the-script-tag)
2. [The CSS Stylesheet](#2-the-css-stylesheet)
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

---

## 1. The HTML Document

### 1.1 The document shell (lines 1–13)

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Constructarium</title>
  ...
</head>
```

**`<!DOCTYPE html>`**
This is not really an HTML tag — it is a declaration that tells the browser "this file uses the modern HTML5 standard." Without it, browsers enter a backwards-compatibility mode called *quirks mode* and may render your page differently across browsers. It must always be the very first line.

**`<html lang="en">`**
The root element that wraps the entire page. Every other element lives inside it. The `lang="en"` attribute tells browsers, search engines, and screen readers that the page content is in English. Screen readers use this to choose the correct speech engine and pronunciation rules.

**`<head>`**
The head contains *metadata* — information about the page that the browser needs but that is not displayed on screen. Your head has five important lines:

- **`<meta charset="UTF-8">`** — Tells the browser to interpret the file's bytes as the UTF-8 character encoding. This is what allows special characters like `₁`, `₂`, `é`, and linguistic notation symbols to display correctly. It must come early in the head so the browser knows how to read everything that follows.

- **`<meta name="viewport" content="width=device-width, initial-scale=1.0">`** — This is the critical line that makes your page work on mobile phones. Without it, a phone would zoom out and pretend the page was 980 pixels wide. `width=device-width` tells the browser to match the page width to the actual screen width, and `initial-scale=1.0` means no zoom is applied on load. This one line activates your responsive CSS.

- **`<title>Constructarium</title>`** — Sets the text shown in the browser tab and in search engine results. It is not visible in the page body.

**The three `<link>` tags for fonts (lines 8–10)**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Lora:wght@400;500;600&display=swap" rel="stylesheet">
```

Your site uses three fonts that are loaded from Google Fonts: **Inter** (body text), **Lora** (headings), and **JetBrains Mono** (linguistic notation). Each font has a distinct typographic role.

- The first two `<link rel="preconnect">` tags tell the browser to open network connections to Google's font servers *before* it actually needs the fonts. This makes the fonts load faster. `crossorigin` on the second one is required for the way Google Fonts splits its servers.
- The third `<link>` is the actual font request. It asks for specific weight variants (`wght@400;500;600;700`) so the browser only downloads the weights you actually use. `display=swap` means body text will appear in a fallback font immediately, and the correct font will swap in when it loads — preventing a blank page while fonts are downloading.

**`<link rel="stylesheet" href="css/style.css">`**
Links your stylesheet. The browser reads and applies `style.css` before rendering the page. Placing it in the `<head>` prevents a flash of unstyled content.

---

### 1.2 The skip link (line 16)

```html
<a class="skip-link" href="#home">Skip to main content</a>
```

This is a keyboard accessibility feature. Sighted mouse users never notice it because it is hidden off-screen by default. When a keyboard user presses Tab, this link is the first thing they can focus, and it lets them jump directly to the `#home` section instead of having to Tab through every navigation item on every page. The CSS makes it invisible until focused. It lives before `<header>` so it is truly the first focusable element in the document.

---

### 1.3 The header and navigation (lines 17–29)

```html
<header>
  <nav aria-label="Primary">
    <a href="#home">Constructarium</a>
    <ul>
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

**`<ul>` containing `<li>` elements**
The nav links are in an unordered list (`<ul>`) because they are a set of parallel, unordered options. This is the standard HTML pattern for navigation. Screen readers announce the number of items in a list, so a user knows before starting that there are five navigation options. Each `<li>` contains an `<a>` element — the list item is the container, the anchor is the clickable link.

---

### 1.4 The home section (lines 33–52)

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
The main heading of the home section. `id="home-title"` is only there so `aria-labelledby` can reference it — it has no visual effect. Notice the heading font (Lora) set in CSS creates the serif look for all `h1`, `h2`, `h3` headings.

**The nested `<section>` for entry points**
A second `<section>` inside `#home` groups the four launch-point cards. Nesting is correct here because this is a distinct sub-topic (entry points) within the home section. It gets its own `<h2>` to maintain the heading hierarchy.

**`<ul class="entry-point-list">` with `<li class="entry-point-card">`**
The four main entry points are an unordered list. This is the right choice because the cards are parallel options with no ranking. The `class="entry-point-list"` and `class="entry-point-card"` are hooks for CSS grid styling. Notice that the card styling is on the `<li>` itself, and the `<a>` inside it is a block-level link covering the whole card face. This is intentional: the visual card and the clickable area are the same element.

---

### 1.5 Construction Index (lines 55–177)

```html
<section id="construction-index" aria-labelledby="construction-index-title">
  <h1 id="construction-index-title">Construction Index</h1>
  <p>Browse all constructions grouped by cluster.</p>

  <section aria-labelledby="argument-structure-title">
    <h2 id="argument-structure-title">Argument Structure</h2>
    <ul class="construction-card-list">
      <li>
        <article class="construction-card">
          <h3><a href="#detail-intransitive-cxn">Intransitive Construction</a></h3>
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
Groups the entire index page. The `id` makes it a navigation target.

**Inner `<section>` elements for each cluster (Argument Structure, Motion and Activity, etc.)**
Each linguistic cluster gets its own nested section with its own `<h2>`. This creates a clear outline: the page is one document, the index is one section of it, and within the index each cluster is a sub-section. This also gives the CSS a way to target specific clusters by their position (`section:nth-of-type(1)`, etc.) to apply the correct colour.

**`<article class="construction-card">`**
`<article>` is the right element here because each construction card is a self-contained piece of content — it could be lifted out and placed anywhere and still make sense. This distinguishes it from `<section>`, which is more about grouping related content on a page.

**`<h3>` inside the article**
The heading hierarchy is: `<h1>` for the section, `<h2>` for the cluster, `<h3>` for individual cards. This three-level hierarchy is both correct HTML (no skipping levels) and useful for screen reader navigation.

**`<p class="notation">NP VP</p>`**
This paragraph gets the `notation` class which applies the JetBrains Mono monospace font. Linguistic phrase-structure notation looks better and reads more clearly in a monospace font because spacing is predictable.

---

### 1.6 Construction Details (lines 180–516)

```html
<section id="construction-detail" aria-labelledby="construction-detail-title">
  <h1 id="construction-detail-title">Construction Details</h1>
  <p>Each construction below has its own static anchor...</p>

  <ul class="detail-link-list">
    <li><a href="#detail-intransitive-cxn">Intransitive Construction</a></li>
    ...
  </ul>

  <article id="detail-intransitive-cxn" aria-labelledby="detail-intransitive-cxn-title">
    <h2 id="detail-intransitive-cxn-title">Intransitive Construction</h2>
    <p class="notation">Phrase structure: NP VP</p>
    ...
    <h3>Inheritance</h3>
    <h3>Examples</h3>
    <ul class="example-list">
      <li>
        <blockquote><p>These things happen.</p></blockquote>
        <p>Davies 2008-</p>
        <p>COCA 2016, NEWS, Charlotte Observer</p>
      </li>
    </ul>
    <h3>Cross-Construction Uses</h3>
    <ul class="cross-construction-list">...</ul>
  </article>
  ...
</section>
```

**`<ul class="detail-link-list">`**
A quick-jump list at the top of the section. It links to each construction's `article` by `id`. This is the HTML-only navigation substitute for what will later be a JavaScript-driven panel.

**`<article id="detail-intransitive-cxn">`**
Each construction gets its own `<article>`. The `id` is the target of links from the index cards and from the detail link list above. Every `id` in this file is unique, which is required — duplicate ids cause broken anchor links and accessibility problems.

**`<blockquote><p>These things happen.</p></blockquote>`**
`<blockquote>` is the semantically correct element for quoted text from an external source. The corpus examples are quotes from the COCA corpus or scholarly sources, so `<blockquote>` is the right choice over `<p>`. The CSS adds a left border to visually mark these as quotations.

**`<ul class="example-list">` and `<ul class="cross-construction-list">`**
Examples and cross-construction uses are both lists because they are parallel items of the same type. The CSS removes bullet points and adds card-like borders to both.

**The `<p>` elements inside each article**
Plain paragraphs hold the metadata fields: alternative names, meaning labels, references. There is no table here because the data is linear and sparse — a table would add unnecessary structure for fields that may often just say "No alternative names listed."

---

### 1.7 Comparison View (lines 519–563)

```html
<section id="comparison-view" aria-labelledby="comparison-view-title">
  <h1 id="comparison-view-title">Comparison View</h1>
  <p>Guided comparison: same verb, different constructions.</p>

  <div class="comparison-layout">
    <aside aria-labelledby="comparison-pairs-title">
      <h2 id="comparison-pairs-title">Pairs</h2>
      <ul class="comparison-pair-list" id="comparison-pair-list"></ul>
    </aside>

    <section id="comparison-pair-detail" aria-labelledby="comparison-pair-title">
      <h2 id="comparison-pair-title">Selected Contrast Pair</h2>
      <div class="comparison-sentences">
        <article aria-labelledby="construction-a-title">
          <h3 id="construction-a-title">Transitive Construction</h3>
          <p><a id="comparison-link-a" href="#detail-transitive-cxn">He sliced the bread.</a></p>
        </article>
        <article aria-labelledby="construction-b-title">
          <h3 id="construction-b-title">Caused Motion Construction</h3>
          <p><a id="comparison-link-b" href="#detail-caused-motion-cxn">Pat sliced the carrots into the salad.</a></p>
        </article>
      </div>
      ...
    </section>
  </div>
</section>
```

**`<div class="comparison-layout">`**
A `<div>` is a generic container with no semantic meaning. It is used here — rather than `<section>` — because this wrapper's sole purpose is to apply the CSS grid layout (sidebar + main panel). It does not represent a meaningful part of the document outline.

**`<aside aria-labelledby="comparison-pairs-title">`**
`<aside>` marks content that is related to, but secondary to, the main content. The pair list is a navigation sidebar — it is complementary content, not the primary focus. This is exactly the semantic role `<aside>` was designed for.

**`<ul class="comparison-pair-list" id="comparison-pair-list">`**
The empty `id="comparison-pair-list"` is a hook that will be used by JavaScript to inject the pair items dynamically. The HTML-only version shows an empty list; JavaScript fills it in. *(Will be explained later in the semester.)*

**`<div class="comparison-sentences">`**
Another purely structural `<div>`. Its job is to apply the two-column CSS grid that places the two construction articles side by side.

**Two `<article>` elements inside `.comparison-sentences`**
Each compared construction is an `<article>` because each is a self-contained unit of content. They have `id` attributes (`comparison-link-a`, `comparison-link-b`) that JavaScript will update to point to the correct construction detail. *(Will be explained later in the semester.)*

**`<section aria-labelledby="contrast-type-title">` and `<section aria-labelledby="contrast-explanation-title">`**
Two nested sections hold the contrast type and explanation text. These use sections rather than plain paragraphs because their content will be replaced dynamically by JavaScript when the user picks a different pair. *(Will be explained later in the semester.)*

---

### 1.8 Inheritance Network (lines 566–590)

```html
<section id="inheritance-network" aria-labelledby="inheritance-network-title">
  <h1 id="inheritance-network-title">Inheritance Network</h1>
  <p>Directed graph of constructional inheritance relations.</p>

  <section aria-labelledby="inheritance-legend-title">
    <h2 id="inheritance-legend-title">Legend</h2>
    <ul class="legend-list">
      <li>Instance</li>
      <li>Metaphorical extension</li>
      <li>Discourse variant</li>
    </ul>
  </section>

  <section aria-labelledby="graph-area-title">
    <h2 id="graph-area-title">Graph Area</h2>
    <div id="inheritance-graph" aria-label="Inheritance graph"></div>
  </section>

  <section aria-labelledby="standalone-constructions-title">
    <h2 id="standalone-constructions-title">Standalone Constructions</h2>
    <ul class="standalone-construction-list" id="standalone-construction-list"></ul>
  </section>
</section>
```

**`<div id="inheritance-graph" aria-label="Inheritance graph">`**
A `<div>` is used as the graph container because SVG elements will be injected into it by JavaScript. *(Will be explained later in the semester.)* It has no semantic meaning on its own, which is appropriate since the SVG will provide the actual content. `aria-label="Inheritance graph"` gives screen readers a name for this region since it contains no heading.

**`<ul class="legend-list">`**
The three relation types (Instance, Metaphorical extension, Discourse variant) are a list of parallel items — a natural fit for `<ul>`. The CSS strips the default bullets and styles them as small cards.

**`<ul class="standalone-construction-list" id="standalone-construction-list">`**
Empty in the HTML; JavaScript will populate this with constructions that have no inheritance edges in the graph. *(Will be explained later in the semester.)*

---

### 1.9 Verb Explorer (lines 593–634)

```html
<section id="verb-explorer" aria-labelledby="verb-explorer-title">
  <h1 id="verb-explorer-title">Verb Explorer</h1>
  <p>Compare how the same verb appears in different constructions.</p>

  <nav aria-label="Verb sets">
    <ul class="verb-set-list" id="verb-set-list"></ul>
  </nav>

  <section id="slice-set" aria-labelledby="slice-set-title">
    <h2 id="slice-set-title">slice</h2>
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
A second navigation element for switching between verb sets (slice, cook). It gets its own `aria-label` to distinguish it from the primary navigation in the header.

**`<ul class="verb-set-list" id="verb-set-list">`**
Empty in the HTML. JavaScript will add pill-shaped buttons here for each verb set. *(Will be explained later in the semester.)*

**`<table>` with `<caption>`, `<thead>`, `<tr>`, `<th scope="col">`, `<tbody>`**
The verb data is true tabular data — rows and columns with defined headers — so a `<table>` is the semantically correct element, not a grid of `<div>` elements.

- **`<caption>`** — A visible title for the table. It is preferred over an `<h3>` above the table because it is explicitly linked to the table by the browser and screen readers, which announce it before reading the table data.
- **`<thead>`** — Groups the header row. Browsers use this to repeat the header when the table spans multiple pages in print, and screen readers use it to identify which row contains column labels.
- **`<th scope="col">`** — A header cell. `scope="col"` explicitly tells screen readers that this header applies to the entire column below it, not just the cell next to it. Without `scope`, screen readers have to guess.
- **`<tbody id="slice-set-body">`** — The body section of the table. The `id` is a JavaScript hook for injecting row data. *(Will be explained later in the semester.)*

**`<section id="cook-set" ... hidden>`**
The `hidden` attribute is a native HTML attribute that hides the element entirely (not just visually — it is removed from accessibility and display). The cook set starts hidden because JavaScript shows and hides sections as the user clicks verb-set navigation links. *(Will be explained later in the semester.)*

---

### 1.10 About and Sources (lines 637–653)

```html
<section id="about-sources" aria-labelledby="about-sources-title">
  <h1 id="about-sources-title">About and Sources</h1>

  <section aria-labelledby="about-title">
    <h2 id="about-title">About</h2>
    <p>Constructarium presents English grammatical constructions...</p>
  </section>

  <section aria-labelledby="sources-title">
    <h2 id="sources-title">References</h2>
    <ul class="reference-list" id="reference-list"></ul>
  </section>
</section>
```

**`<ul class="reference-list" id="reference-list">`**
Empty in the HTML. JavaScript will inject list items from the data file. *(Will be explained later in the semester.)* The `class` gives it card styling via CSS; the `id` is the JavaScript hook.

---

### 1.11 The footer

```html
<footer>
  <a href="imprint.html">Imprint</a>
</footer>
```

`<footer>` is a semantic landmark element, just like `<header>`. It marks the bottom of the page and typically contains secondary information such as legal notices, copyright, or contact links. Placing it after `</main>` and before `<script>` means it is the last visible content on the page.

The single `<a href="imprint.html">` link navigates to a separate `imprint.html` file — unlike the navigation links in the header, which all use `#anchor` links within the same page. The CSS gives the footer a top border and small secondary-colour text so it reads as clearly subordinate to the main content.

---

### 1.12 The script tag

```html
<script src="js/app.js"></script>
```

**Will be explained later in the semester.**

The `<script>` tag is placed at the very end of `<body>`, just before `</body>`. This placement is intentional: the browser reads HTML top to bottom. If the script were in the `<head>`, it would run before any HTML elements exist, and the JavaScript would try to find elements (like `#verb-set-list`) that haven't been created yet. By placing it last, all the HTML elements are already in the document by the time the script runs.

---

## 2. The CSS Stylesheet

### 2.1 Section 1 — Design Tokens

```css
:root {
  --bg: #f5f3ee;
  --surface: #ffffff;
  --text-primary: #1c1b18;
  --text-secondary: #6b6860;
  --border: #e4e0d8;
  --accent: #2f4f6f;
  --focus-ring: #1f5f99;
  --argument-structure: #3d6b9f;
  --motion-activity: #5c8c6e;
  --fixed-pragmatic: #b85c3a;
  --clause-combining: #7a5c9e;
  --np-internal: #a07830;
  --font-heading: "Lora", Georgia, serif;
  --font-body: "Inter", Arial, sans-serif;
  --font-notation: "JetBrains Mono", "Courier New", monospace;
}
```

**`:root`**
`:root` is a CSS pseudo-class that selects the root element of the document — the `<html>` element. Rules placed here apply to the entire page. The reason to use `:root` rather than `html` directly is convention: CSS custom properties (variables) defined on `:root` are accessible everywhere in the stylesheet.

**`--variable-name: value`**
CSS custom properties (also called CSS variables) store reusable values. Every colour and font in your stylesheet is defined once here and referenced everywhere else with `var(--name)`. The advantage: if you want to change the accent colour from `#2f4f6f` to something else, you change it in one place and it updates across the entire file.

**Why these specific colours?**
- `--bg: #f5f3ee` — A warm off-white for the page background. Pure white (`#ffffff`) can feel harsh; this warm tone matches the academic, document-like feel of a linguistics tool.
- `--surface: #ffffff` — Pure white for content panels (sections, cards). The contrast between off-white background and white surface creates subtle depth without using shadows.
- `--text-primary: #1c1b18` — Near-black with a very slight warm tint. Softer than pure black (`#000000`) but still high-contrast.
- `--text-secondary: #6b6860` — A grey for secondary information (captions, metadata). It reduces visual weight without making text unreadable.
- `--accent: #2f4f6f` — A dark slate blue used for interactive states (hover, active links). It matches the academic, structured feel of linguistics content.
- `--focus-ring: #1f5f99` — A brighter blue specifically for keyboard focus outlines. It needs to be distinct enough from the accent to be clearly visible.
- **The five cluster colours** (`--argument-structure` through `--np-internal`) — Each linguistic cluster has a dedicated colour. These are used for heading text and card border highlights in the Construction Index.

**The font stack pattern**
Each font variable lists a preferred Google Font, then a common system fallback, then a generic family:
- `"Lora", Georgia, serif` — If Lora hasn't loaded, use Georgia (widely installed); if neither, use any serif font.
- `"Inter", Arial, sans-serif` — If Inter hasn't loaded, use Arial; if neither, any sans-serif.
- `"JetBrains Mono", "Courier New", monospace` — If JetBrains Mono hasn't loaded, use Courier New; if neither, any monospace font.

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
`*` matches every element. `*::before` and `*::after` also cover CSS pseudo-elements (decorative content added via CSS). This rule sets `box-sizing: border-box` on every element.

**`box-sizing: border-box`**
By default, browsers use `box-sizing: content-box`, which means if you give an element `width: 200px; padding: 1rem`, the total rendered width is `200px + 32px = 232px`. With `border-box`, padding and border are included inside the declared width, so `width: 200px` always means exactly 200px. This makes layout calculations predictable and prevents the common bug where adding padding to a grid item breaks the layout.

```css
html {
  font-size: 16px;
}
```

Setting `font-size: 16px` on `<html>` establishes the *root em* value. All the `rem` units throughout the stylesheet (`1rem`, `0.875rem`, `2rem`) are multiples of this value. `1rem = 16px`, `0.875rem = 14px`, `2rem = 32px`. This is the main reason for setting it explicitly — it makes the relationship between `rem` values and actual pixel sizes easy to reason about.

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

- `margin: 0` — Browsers add a small default margin to `<body>`. This removes it so the page content starts exactly at the edges.
- `background: var(--bg)` — Sets the warm off-white page background.
- `color: var(--text-primary)` — Sets the default text colour for the entire page. Child elements inherit this unless overridden.
- `font-family: var(--font-body)` — Sets Inter as the default font. Inherited by all text elements.
- `line-height: 1.6` — A unitless value meaning 1.6× the element's font size. This is the line spacing. `1.6` is a widely-used comfortable reading value for body text — tight enough to look intentional, loose enough to be readable.

```css
html {
  scroll-behavior: smooth;
}
```

Since all your navigation links jump to anchors on the same page (e.g. `href="#home"`), `scroll-behavior: smooth` makes the page scroll smoothly to the target instead of jumping instantly. There are two `html` rules — the second one adds `scroll-behavior` without repeating `font-size`. CSS applies all matching rules.

```css
section,
article {
  scroll-margin-top: 1rem;
}
```

When a browser scrolls to an anchor (e.g. `#home`), it aligns the element exactly to the top of the viewport. With a sticky header, the header would overlap the content. `scroll-margin-top: 1rem` adds a 1rem offset above the element when it is scrolled to, preventing content from being hidden under the header.

```css
header,
main,
footer {
  width: min(1200px, calc(100% - 2rem));
  margin: 0 auto;
}

footer {
  padding: 1.5rem 0;
  border-top: 1px solid var(--border);
  font-size: 0.875rem;
  color: var(--text-secondary);
}
```

`header`, `main`, and `footer` all share the same centering rule so every layer of the page aligns to the same column width. `min(1200px, calc(100% - 2rem))` means: use whichever value is smaller — 1200px or the full viewport width minus 2rem of padding. On a wide screen the content is capped at 1200px. On a narrow screen it fills the available width with a 1rem margin on each side. `margin: 0 auto` centers the element horizontally when it is narrower than the viewport.

The footer gets its own additional rules: `border-top` draws a separator line between the main content and the footer. `font-size: 0.875rem` makes the footer text slightly smaller than body text (14px vs 16px). `color: var(--text-secondary)` uses the grey tone so the imprint link reads as background information rather than primary content.

```css
h1, h2, h3 {
  font-family: var(--font-heading);
  font-weight: 400;
  line-height: 1.25;
  margin-top: 0;
  margin-bottom: 0.75rem;
}
h1 { font-size: 2rem; }
h2 { font-size: 1.25rem; }
h3 { font-size: 1.125rem; }
```

Headings use the Lora font. `font-weight: 400` is normal weight — Lora is expressive enough at regular weight; bold would be too heavy for an academic tool. `line-height: 1.25` is tighter than body text because headings are short and benefit from compact spacing. `margin-top: 0` prevents the browser's default top margin from adding unwanted space above the first heading in a section.

```css
p {
  max-width: 72ch;
}
```

`72ch` means 72 characters wide. This is a readability constraint: long lines (over ~80 characters) are harder to read because the eye has to travel further across the line. `ch` is a CSS unit equal to the width of the `0` character in the current font. This rule keeps body paragraphs at a comfortable reading width.

```css
a {
  color: inherit;
  text-decoration-thickness: 0.08em;
  text-underline-offset: 0.15em;
  transition: color 160ms ease, background-color 160ms ease, border-color 160ms ease;
}
```

- `color: inherit` — Links take the colour of their surrounding text instead of the default browser blue. This is intentional: your navigation links, card headings, and body links should all look like part of their context. Hover states add the accent colour.
- `text-decoration-thickness: 0.08em` — The underline is thinner than the browser default, which looks cleaner.
- `text-underline-offset: 0.15em` — Moves the underline slightly below the text baseline so it doesn't touch descenders (letters like g, y, p).
- `transition: color 160ms ease, ...` — This adds smooth colour transitions on hover. Without this, colour changes are instant and feel abrupt. `160ms` is fast enough to feel responsive, slow enough to feel deliberate.

---

### 2.3 Section 3 — Basic Element Styling

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

- `position: absolute` — Takes the link out of the normal document flow so it doesn't affect page layout.
- `transform: translateY(-140%)` — Moves the link 140% of its own height upward, pushing it above the visible viewport. This is the standard technique for hiding skip links: they are in the DOM (accessible to keyboard and screen readers) but not visible.
- `.skip-link:focus { transform: translateY(0) }` — When a keyboard user tabs to the link, the focus state removes the transform, bringing the link back into view at the top-left corner.
- `z-index: 10` — Ensures the link appears on top of other content when it becomes visible.

```css
caption,
nav ul,
article > p,
section > p,
aside > p {
  color: var(--text-secondary);
}
```

Secondary text colour is applied to: table captions, navigation list text, and `<p>` elements that are direct children of `article`, `section`, or `aside`. The `>` is a *child combinator* — `article > p` matches a `<p>` directly inside an `<article>`, but not a `<p>` nested deeper inside a `<blockquote>` inside the article.

```css
.notation {
  font-family: var(--font-notation);
  font-size: 0.9rem;
  color: var(--text-primary);
}
```

Any element with `class="notation"` renders in JetBrains Mono. In your HTML this is applied to every phrase structure line (`NP VP`, `NP VP NP`, etc.). The font size is slightly smaller than body text because monospace fonts appear larger at the same size. The colour is `--text-primary` rather than the secondary grey because notation is primary information, not metadata.

```css
blockquote {
  margin-left: 0;
  padding-left: 1rem;
  border-left: 3px solid var(--border);
}
```

Browsers add a large default left margin to `<blockquote>`. Setting `margin-left: 0` removes it so blockquotes align with your other content. `padding-left: 1rem` adds internal spacing from the left border. `border-left: 3px solid var(--border)` is the visible left-rule that marks corpus examples as quoted material.

```css
table {
  width: 100%;
  border-collapse: collapse;
  background: var(--surface);
}
```

- `width: 100%` — Tables fill their container width.
- `border-collapse: collapse` — By default, table cells have separate borders with a gap between them. `collapse` merges adjacent borders into one line.
- `background: var(--surface)` — White background for table cells.

```css
th, td {
  padding: 0.75rem;
  border: 1px solid var(--border);
  text-align: left;
  vertical-align: top;
}
```

- `padding: 0.75rem` — Comfortable space between cell content and cell borders.
- `border: 1px solid var(--border)` — Grid lines between cells.
- `text-align: left` — Browser default for `<th>` is center; this overrides it for consistency with body text.
- `vertical-align: top` — Cells with multi-line content align their text to the top of the cell, not the vertical center.

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
```

A thin border line separates each major section. The `>` child combinator means this only targets `<section>` elements that are direct children of `<main>` — not the nested sections inside them. `:first-child` removes the border on the first section so there is no line at the very top of the content area.

```css
main > section {
  background: var(--surface);
  padding: 2rem;
  margin-top: 1.5rem;
  border: 1px solid var(--border);
}
main > section:first-child {
  margin-top: 0;
}
```

There are two `main > section` rules. CSS applies both. The second one sets the white panel appearance: white background, full border, and a top margin. `:first-child` removes the top margin from the home section so it sits flush against the navigation bar.

```css
header nav[aria-label="Primary"] {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  padding: 1rem 0;
  border-bottom: 1px solid var(--border);
}
```

**Flexbox** is used for the navigation bar. `display: flex` puts the wordmark and the nav `<ul>` on one row. The selector `nav[aria-label="Primary"]` uses an *attribute selector* — it targets only the `<nav>` element that has exactly that `aria-label` value, leaving the Verb Explorer nav unaffected.

- `align-items: center` — Vertically centers the wordmark and nav list.
- `justify-content: space-between` — Pushes the wordmark to the left and the nav links to the right.
- `gap: 1.5rem` — Space between the wordmark and the nav list.

```css
header nav[aria-label="Primary"] ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-end;
  gap: 1rem 1.5rem;
  margin: 0;
  padding: 0;
  list-style: none;
}
```

The `<ul>` itself is also a flex container so the nav items sit in a row. `flex-wrap: wrap` allows the items to wrap to a second line on narrower screens instead of overflowing. `gap: 1rem 1.5rem` sets row gap to 1rem and column gap to 1.5rem. `list-style: none` removes the bullet points.

```css
a:hover {
  color: var(--accent);
}
a:focus-visible {
  outline: 3px solid var(--focus-ring);
  outline-offset: 3px;
}
```

- `a:hover` applies when a mouse user moves over a link. The accent colour (dark slate blue) signals interactivity.
- `a:focus-visible` applies when a *keyboard* user focuses a link (using Tab). `:focus-visible` is smarter than `:focus` — it only shows the outline for keyboard users, not when a mouse user clicks a link (which would show a distracting outline on every click). `outline` is drawn outside the element box so it doesn't shift layout. `outline-offset: 3px` adds space between the element border and the focus ring.

---

### 2.5 Section 5 — Reusable Card and List Patterns

```css
.entry-point-list,
.construction-card-list,
.detail-link-list,
.example-list,
.cross-construction-list,
.reference-list,
.legend-list,
.standalone-construction-list {
  margin: 0;
  padding: 0;
  list-style: none;
}
```

All the custom list types have their default browser styles removed. `margin: 0` and `padding: 0` remove the default indentation that browsers apply to `<ul>`. `list-style: none` removes the bullet points. These lists are styled as cards or grids, so they don't need bullet-list formatting.

```css
.entry-point-list,
.construction-card-list {
  display: grid;
  gap: 1rem;
}
.entry-point-list {
  grid-template-columns: repeat(4, 1fr);
}
.construction-card-list {
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
}
```

**CSS Grid** creates the card layouts. `display: grid` on the `<ul>` makes its `<li>` children grid items. `gap: 1rem` adds space between cards.

`.entry-point-list` uses `repeat(4, 1fr)` — exactly 4 equal columns, one per entry-point card. This guarantees all four cards (Comparison View, Construction Index, Inheritance Network, Verb Explorer) always sit in one row at the same height. The responsive rule at 680px overrides this to `1fr` so the cards stack on mobile.

`.construction-card-list` uses `repeat(auto-fit, minmax(220px, 1fr))` — a responsive pattern that needs no media queries. Each column is at least 220px wide and grows to fill space equally. The browser creates as many columns as fit: on a wide screen you get 5–6 per row, on a narrow screen fewer.

```css
.entry-point-card,
.construction-card,
.detail-link-list li,
.example-list li,
.cross-construction-list li,
.reference-list li,
.legend-list li,
.standalone-construction-list li {
  background: var(--surface);
  border: 1px solid var(--border);
  padding: 1rem;
  border-radius: 0.35rem;
}
```

All these elements share the same card-like appearance: white background, subtle border, internal padding, and a slight border-radius for rounded corners. The radius value `0.35rem` is small — just enough to soften the corners without looking like a design overstatement.

```css
.entry-point-card:hover,
.construction-card:hover,
.detail-link-list li:hover,
...{
  border-color: var(--accent);
}
```

On hover, the card border changes to the accent colour. This gives interactive cards a clear visual response without moving or resizing them (which would be disorienting).

---

### 2.6 Section 6 — Construction Index and Detail Styling

```css
#argument-structure-title { color: var(--argument-structure); }
#motion-activity-title    { color: var(--motion-activity); }
#fixed-pragmatic-title    { color: var(--fixed-pragmatic); }
#clause-combining-title   { color: var(--clause-combining); }
#np-internal-title        { color: var(--np-internal); }
```

Each cluster heading gets its cluster colour. The `id` selector (`#`) is used because there is exactly one of each heading in the document. The `id` matches the `id="argument-structure-title"` attribute on the `<h2>` element.

```css
#construction-index section:nth-of-type(1) .construction-card {
  border-left: 6px solid var(--argument-structure);
}
#construction-index section:nth-of-type(2) .construction-card {
  border-left: 6px solid var(--motion-activity);
}
```

`section:nth-of-type(1)` selects the first `<section>` element among its siblings inside `#construction-index`. This is how each cluster of cards gets its left-border colour without needing a separate class on each card. The first section = Argument Structure = blue border; the second = Motion and Activity = green border; and so on.

```css
#construction-detail article[id^="detail-"] {
  padding: 1.5rem;
  margin-top: 1.5rem;
  border: 1px solid var(--border);
  background: #fcfbf8;
  border-radius: 0.35rem;
}
```

`article[id^="detail-"]` is an *attribute selector with a prefix match*. `^=` means "starts with". This selects every `<article>` whose `id` starts with "detail-". It targets all 12 construction detail articles without needing to list each id separately.

---

### 2.7 Section 7 — Comparison View

```css
.comparison-layout {
  display: grid;
  grid-template-columns: minmax(220px, 280px) 1fr;
  gap: 1.5rem;
  align-items: start;
}
```

The comparison view uses a two-column grid. The first column (the pair list sidebar) is between 220px and 280px wide. The second column (the comparison detail panel) takes all remaining space (`1fr`). `align-items: start` prevents the shorter column from stretching to match the taller one.

```css
.comparison-sentences {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 1.5rem;
}
```

Two equal columns, each at least 0px wide (the `minmax(0, 1fr)` avoids overflow issues with grid items that contain long text). This places the two construction articles — Transitive Construction and Caused Motion Construction — side by side.

```css
.comparison-pair-list a[aria-current="true"] {
  color: var(--accent);
  font-weight: 600;
}
```

`[aria-current="true"]` is the attribute that JavaScript will set on the currently-selected pair link. *(Will be explained later in the semester.)* The CSS rule styles that link in accent colour and bold to mark it as active.

---

### 2.8 Section 8 — Verb Explorer

```css
nav[aria-label="Verb sets"] a {
  display: inline-block;
  padding: 0.5rem 0.9rem;
  border: 1px solid var(--border);
  background: #fcfbf8;
  text-decoration: none;
  color: var(--text-primary);
  border-radius: 999px;
}
```

The verb-set navigation links are styled as pill-shaped buttons. `border-radius: 999px` creates fully rounded ends — a large radius on a short element creates a pill shape. `display: inline-block` is needed so padding applies correctly (plain inline elements ignore vertical padding for layout purposes).

```css
nav[aria-label="Verb sets"] a[aria-current="true"] {
  background: #efe7da;
  border-color: var(--accent);
  color: var(--accent);
  font-weight: 600;
}
```

The active verb-set pill gets a warm beige background and accent-coloured border and text. JavaScript sets `aria-current="true"` on the active link. *(Will be explained later in the semester.)*

```css
#verb-explorer th {
  background: #f0ece4;
  color: var(--text-primary);
}
#verb-explorer td {
  background: var(--surface);
}
#verb-explorer td:first-child {
  width: 50%;
}
```

The header row of the verb table gets a warm grey background to distinguish it from data rows. `td:first-child` targets the first `<td>` in each row (the Sentence column) and sets it to 50% width, because sentence text is typically the longest content.

```css
.annotation-note {
  margin-top: 0.4rem;
  color: var(--text-secondary);
  font-size: 0.875rem;
}
```

Annotation notes inside table cells are smaller and greyer than the sentence text above them. This establishes a visual hierarchy: the sentence is primary, the annotation is supplementary metadata.

---

### 2.9 Section 9 — Home and Inheritance Sections

```css
#home .entry-point-card {
  min-height: 100%;
  background: linear-gradient(180deg, #fffdf9 0%, #f7f2ea 100%);
}
```

The home entry-point cards use a vertical gradient instead of a flat colour. The gradient goes from near-white at the top (`#fffdf9`) to a slightly warmer, more saturated tone at the bottom (`#f7f2ea`). `min-height: 100%` ensures cards in the same grid row are the same height (the grid already stretches them, but `min-height: 100%` keeps this working as content grows).

```css
#inheritance-graph {
  min-height: 220px;
  padding: 1rem;
  border: 1px dashed var(--border);
  background: var(--surface);
  overflow-x: auto;
}
```

The graph container uses a dashed border to signal "this area is a canvas placeholder." `min-height: 220px` ensures it is visible even when empty. `overflow-x: auto` allows the SVG graph to scroll horizontally if it is wider than its container, rather than overflowing the page.

```css
.metaphorical-edge {
  stroke: #c4905a;
  stroke-dasharray: 7 5;
}
.discourse-edge {
  stroke: #89a88a;
  stroke-dasharray: 2 5;
}
```

These rules style the SVG lines in the inheritance graph. `stroke` sets the line colour. `stroke-dasharray: 7 5` creates a dashed line pattern: 7px dash, 5px gap. The three edge types (instance, metaphorical, discourse) have distinct visual treatments: solid lines for instance, orange dashes for metaphorical extension, green short-dashes for discourse variant.

```css
.cluster-argument_structure circle { fill: #dbe8f5; }
.cluster-motion_activity circle    { fill: #dcebdc; }
.cluster-fixed_pragmatic circle    { fill: #f2ddd4; }
.cluster-clause_combining circle   { fill: #e5ddf0; }
.cluster-np_internal circle        { fill: #efe4c8; }
```

SVG `<circle>` elements inside `.cluster-*` groups get cluster-specific fill colours. The colours are lightened versions of the cluster accent colours — soft pastels rather than the saturated heading colours, since they need to work as backgrounds behind text labels.

---

### 2.10 Section 10 — Responsive Rules

```css
@media (max-width: 900px) { ... }
@media (max-width: 680px) { ... }
```

`@media` is a *media query* — a CSS block that only applies when a condition is true. `max-width: 900px` means "apply these rules when the viewport is 900px wide or less." This is the *mobile-first from a desktop baseline* approach: the main CSS is written for wide screens, and the media queries override it for smaller ones.

**At 900px:**

```css
header nav[aria-label="Primary"] {
  align-items: flex-start;
  flex-direction: column;
}
header nav[aria-label="Primary"] ul {
  justify-content: flex-start;
}
```

The navigation changes from a horizontal row to a vertical stack (`flex-direction: column`). The nav links switch from right-aligned (`flex-end`) to left-aligned (`flex-start`) to match the stacked layout.

```css
.comparison-layout {
  grid-template-columns: 1fr;
}
```

The comparison sidebar collapses into a single column. The pair list and detail panel now stack vertically instead of sitting side by side.

**At 680px:**

```css
.comparison-sentences {
  grid-template-columns: 1fr;
}
```

The two-column sentence comparison becomes one column on phones. The two articles stack vertically.

```css
.entry-point-list,
.construction-card-list,
.detail-link-list,
#inheritance-network .legend-list {
  grid-template-columns: 1fr;
}
```

All grid layouts become single-column. `.entry-point-list` normally shows a fixed 4-column row; this rule overrides it for phones. `.construction-card-list` already adapts via `auto-fit`, but the override makes the behaviour explicit and reliable at this breakpoint.

```css
th, td {
  padding: 0.6rem;
}
#verb-explorer td:first-child {
  width: auto;
}
```

Table cell padding is reduced from `0.75rem` to `0.6rem` to save space. The 50% width on the sentence column is released (`width: auto`) so the table adapts naturally to the narrow screen.

---

*End of tutorial. Last updated April 2026 (revised: footer added, entry-point grid fixed to 4 columns, Comparison View card emphasis removed).*
