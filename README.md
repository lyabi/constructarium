# Constructarium

Constructarium is an interactive web prototype for exploring English grammatical constructions through the lens of Construction Grammar (CxG). It is designed for linguistics students, advanced English learners, and instructors, with guided comparison as its core feature.

## What It Includes

- a Construction Index grouped by construction cluster
- full Construction Details for 12 constructions
- a guided Comparison View
- a Verb Explorer for cross-construction verb sets
- an Inheritance Network view
- an About / Sources section

## How To Use It

- use the top navigation to move between the main sections
- open constructions from the index or from links inside other sections
- use the Comparison View to switch between contrast pairs
- use the Verb Explorer to switch between verb sets
- use the Inheritance Network to inspect the current inheritance graph and follow links to construction details

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

## Run With VS Code Live Server

If you use Visual Studio Code, you can also run the project with the Live Server extension:

1. Open the project folder in Visual Studio Code.
2. Make sure the Live Server extension is installed.
3. Open `index.html`.
4. Right-click inside the file and choose `Open with Live Server`, or click the `Go Live` button in the bottom status bar.
5. Your browser should open automatically on a local `http://...` address.

This works because the site is then served through `http://...` instead of being opened directly as a `file://...` page.
