function getDetailLink(constructionId) {
  return `#detail-${constructionId.replace(/_/g, "-")}`;
}

function getVerbSetId(setId) {
  return setId.replace(/_/g, "-");
}

function formatShortCitation(reference) {
  if (!reference) {
    return "Unknown source";
  }

  const authorField = String(reference.author || "");
  const year = String(reference.year || "").replace(/[–—]/g, "-");
  const authorMatches = [...authorField.matchAll(/([^,]+),/g)].map((match) => match[1].trim());

  let authorText = "Unknown";

  if (authorMatches.length === 1) {
    authorText = authorMatches[0];
  } else if (authorMatches.length === 2) {
    authorText = `${authorMatches[0]} & ${authorMatches[1]}`;
  } else if (authorMatches.length >= 3) {
    authorText = `${authorMatches[0]} et al.`;
  }

  return `${authorText} ${year}`.trim();
}

function buildReferenceMap(references) {
  return new Map(references.map((reference) => [reference.id, reference]));
}

function buildConstructionMap(constructions) {
  return new Map(constructions.map((construction) => [construction.id, construction]));
}

function renderComparisonView(pairs, constructions) {
  const pairList = document.getElementById("comparison-pair-list");
  const titleA = document.getElementById("construction-a-title");
  const linkA = document.getElementById("comparison-link-a");
  const titleB = document.getElementById("construction-b-title");
  const linkB = document.getElementById("comparison-link-b");
  const contrastType = document.getElementById("comparison-contrast-type");
  const explanation = document.getElementById("comparison-explanation");

  if (!pairList || !titleA || !linkA || !titleB || !linkB || !contrastType || !explanation) {
    return;
  }

  const constructionMap = buildConstructionMap(constructions);

  function applyPair(pair, clickedLink) {
    pairList.querySelectorAll("a").forEach((link) => link.removeAttribute("aria-current"));
    if (clickedLink) {
      clickedLink.setAttribute("aria-current", "true");
    }

    const constructionA = constructionMap.get(pair.construction_id_a);
    const constructionB = constructionMap.get(pair.construction_id_b);

    titleA.textContent = constructionA?.name || pair.construction_id_a;
    linkA.textContent = pair.sentence_a;
    linkA.setAttribute("href", getDetailLink(pair.construction_id_a));

    titleB.textContent = constructionB?.name || pair.construction_id_b;
    linkB.textContent = pair.sentence_b;
    linkB.setAttribute("href", getDetailLink(pair.construction_id_b));

    contrastType.textContent = pair.contrast_type;
    explanation.textContent = pair.explanation;
  }

  pairList.innerHTML = "";

  pairs.forEach((pair, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#comparison-pair-detail";
    link.textContent = pair.contrast_type;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      applyPair(pair, link);
      document.getElementById("comparison-pair-detail")?.scrollIntoView({ behavior: "smooth", block: "start" });
    });

    if (index === 0) {
      link.setAttribute("aria-current", "true");
      applyPair(pair, link);
    }

    item.appendChild(link);
    pairList.appendChild(item);
  });
}

function renderVerbExplorer(crossSet, constructions, references) {
  const verbSetList = document.getElementById("verb-set-list");
  const sliceBody = document.getElementById("slice-set-body");
  const cookBody = document.getElementById("cook-set-body");
  const sliceSection = document.getElementById("slice-set");
  const cookSection = document.getElementById("cook-set");

  if (!verbSetList || !sliceBody || !cookBody || !sliceSection || !cookSection) {
    return;
  }

  const groupedSets = new Map();
  const constructionMap = buildConstructionMap(constructions);
  const referenceMap = buildReferenceMap(references);

  crossSet.forEach((entry) => {
    if (!groupedSets.has(entry.set_id)) {
      groupedSets.set(entry.set_id, []);
    }
    groupedSets.get(entry.set_id).push(entry);
  });

  function buildRows(entries, tbody) {
    tbody.innerHTML = "";

    entries.forEach((entry) => {
      const row = document.createElement("tr");
      const sentenceCell = document.createElement("td");
      const constructionCell = document.createElement("td");
      const sourceCell = document.createElement("td");
      const sentenceText = document.createElement("div");

      sentenceText.textContent = entry.sentence;
      sentenceCell.appendChild(sentenceText);

      if (entry.annotation) {
        const annotationNote = document.createElement("div");
        annotationNote.className = "annotation-note";
        annotationNote.textContent = entry.annotation;
        sentenceCell.appendChild(annotationNote);
      }

      const constructionLink = document.createElement("a");
      constructionLink.href = getDetailLink(entry.construction_id);
      constructionLink.textContent = constructionMap.get(entry.construction_id)?.name || entry.construction_id;
      constructionCell.appendChild(constructionLink);

      sourceCell.textContent = formatShortCitation(referenceMap.get(entry.source));

      row.append(sentenceCell, constructionCell, sourceCell);
      tbody.appendChild(row);
    });
  }

  buildRows(groupedSets.get("slice_set") || [], sliceBody);
  buildRows(groupedSets.get("cook_set") || [], cookBody);

  function showSet(targetId) {
    [sliceSection, cookSection].forEach((section) => {
      section.hidden = section.id !== targetId;
    });

    verbSetList.querySelectorAll("a").forEach((link) => {
      const isCurrent = link.getAttribute("href") === `#${targetId}`;
      if (isCurrent) {
        link.setAttribute("aria-current", "true");
      } else {
        link.removeAttribute("aria-current");
      }
    });
  }

  verbSetList.innerHTML = "";

  Array.from(groupedSets.keys()).forEach((setId, index) => {
    const item = document.createElement("li");
    const link = document.createElement("a");
    const targetId = getVerbSetId(setId);
    link.href = `#${targetId}`;
    link.textContent = setId.replace("_set", "").replace("_", " ");
    link.addEventListener("click", (event) => {
      event.preventDefault();
      showSet(targetId);
    });

    if (index === 0) {
      link.setAttribute("aria-current", "true");
      showSet(targetId);
    }

    item.appendChild(link);
    verbSetList.appendChild(item);
  });
}

function renderInheritanceGraph(inheritance, constructions) {
  const graphContainer = document.getElementById("inheritance-graph");
  const standaloneList = document.getElementById("standalone-construction-list");

  if (!graphContainer || !standaloneList) {
    return;
  }

  const constructionMap = buildConstructionMap(constructions);
  const connectedIds = new Set();
  inheritance.edges.forEach((edge) => {
    connectedIds.add(edge.parent);
    connectedIds.add(edge.child);
  });

  const positions = {
    intransitive_cxn: { x: 110, y: 140 },
    transitive_cxn: { x: 270, y: 90 },
    ditransitive_cxn: { x: 440, y: 60 },
    caused_motion_cxn: { x: 440, y: 125 },
    resultative_cxn: { x: 610, y: 95 },
    passive_cxn: { x: 440, y: 195 },
    way_cxn: { x: 610, y: 165 },
    time_away_cxn: { x: 770, y: 165 }
  };

  const edgeStyles = {
    instance: "inheritance-edge instance-edge",
    metaphorical_extension: "inheritance-edge metaphorical-edge",
    discourse_variant: "inheritance-edge discourse-edge"
  };

  const svgParts = [
    '<svg viewBox="0 0 880 260" role="img" aria-labelledby="graph-svg-title graph-svg-desc">',
    '<title id="graph-svg-title">Inheritance graph</title>',
    '<desc id="graph-svg-desc">Directed graph showing inheritance links among the connected constructions.</desc>',
    '<defs>',
    '<marker id="arrowhead" markerWidth="10" markerHeight="7" refX="8" refY="3.5" orient="auto">',
    '<polygon points="0 0, 10 3.5, 0 7" class="inheritance-arrow" />',
    '</marker>',
    '</defs>'
  ];

  inheritance.edges.forEach((edge) => {
    const from = positions[edge.parent];
    const to = positions[edge.child];
    if (!from || !to) {
      return;
    }

    svgParts.push(
      `<line class="${edgeStyles[edge.relation] || "inheritance-edge"}" x1="${from.x}" y1="${from.y}" x2="${to.x}" y2="${to.y}" marker-end="url(#arrowhead)">` +
      `<title>${edge.notes}</title>` +
      "</line>"
    );
  });

  Object.entries(positions).forEach(([id, position]) => {
    const construction = constructionMap.get(id);
    if (!construction) {
      return;
    }

    const clusterClass = `cluster-${inheritance.nodes.find((node) => node.id === id)?.cluster || "default"}`;
    svgParts.push(
      `<a href="${getDetailLink(id)}" class="inheritance-node-link">` +
      `<g class="inheritance-node ${clusterClass}">` +
      `<circle cx="${position.x}" cy="${position.y}" r="28"></circle>` +
      `<text x="${position.x}" y="${position.y + 46}" text-anchor="middle">${construction.name}</text>` +
      `<title>${construction.meaning_description}</title>` +
      `</g>` +
      `</a>`
    );
  });

  svgParts.push("</svg>");
  graphContainer.innerHTML = svgParts.join("");

  standaloneList.innerHTML = "";
  inheritance.nodes
    .filter((node) => !connectedIds.has(node.id) && node.id !== "intransitive_cxn")
    .forEach((node) => {
      const construction = constructionMap.get(node.id);
      if (!construction) {
        return;
      }
      const item = document.createElement("li");
      const link = document.createElement("a");
      link.href = getDetailLink(node.id);
      link.textContent = construction.name;
      item.appendChild(link);
      standaloneList.appendChild(item);
    });
}

function renderReferences(references) {
  const referenceList = document.getElementById("reference-list");

  if (!referenceList) {
    return;
  }

  referenceList.innerHTML = "";

  references.forEach((reference) => {
    const item = document.createElement("li");
    item.textContent = `${reference.author} (${String(reference.year).replace(/[–—]/g, "-")}). ${reference.title}.`;
    referenceList.appendChild(item);
  });
}

function showDataError() {
  const graphContainer = document.getElementById("inheritance-graph");
  const pairList = document.getElementById("comparison-pair-list");
  const verbSetList = document.getElementById("verb-set-list");

  if (graphContainer) {
    graphContainer.textContent = "The JSON data could not be loaded. Run the project through a local web server rather than opening the HTML file directly.";
  }
  if (pairList) {
    pairList.innerHTML = "<li>The comparison data could not be loaded.</li>";
  }
  if (verbSetList) {
    verbSetList.innerHTML = "<li>The verb-set data could not be loaded.</li>";
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  try {
    const [constructions, references, pairs, crossSet, inheritance] = await Promise.all([
      fetch("data/constructarium_constructions.json").then((response) => response.json()),
      fetch("data/constructarium_references.json").then((response) => response.json()),
      fetch("data/constructarium_contrastive_pairs.json").then((response) => response.json()),
      fetch("data/constructarium_cross_construction_set.json").then((response) => response.json()),
      fetch("data/constructarium_inheritance.json").then((response) => response.json())
    ]);

    renderComparisonView(pairs, constructions);
    renderVerbExplorer(crossSet, constructions, references);
    renderInheritanceGraph(inheritance, constructions);
    renderReferences(references);
  } catch (error) {
    console.error("Constructarium data loading failed:", error);
    showDataError();
  }
});
