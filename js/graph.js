document.addEventListener('DOMContentLoaded', async function () {
    async function loadJSON(file_path) {
        const response = await fetch(file_path);
        const data = await response.json();
        return data;
    }
    const constructions = await loadJSON('data/constructarium_constructions.json');
    const inheritance = await loadJSON('data/constructarium_inheritance.json');
    console.log('Daten erfolgreich geladen und in Variablen gespeichert.'); //Bestätigung, dass die Daten erfolgreich in Variablen gespeichert wurden
    //JS startet erst, wenn die HTML Seite vollständig geladen ist


    const cytoscapeNodes = inheritance.nodes.map(function (node) {
        return { data: { id: node.id, cluster: node.cluster, label: constructions.find(function (construction) { return construction.id === node.id; }).name } }; //Erstellen eines neuen Objekts für jedes Knoten-Element, wobei die id des Knotens als data.id gespeichert wird
        //Erstellen eines neuen Objekts für jedes Knoten-Element, wobei die id des Knotens als data.id gespeichert wird
    });
    const cytoscapeEdges = inheritance.edges.map(function (edge) {
        const source = edge.source || edge.parent;
        const target = edge.target || edge.child;

        return {
            data: {
                id: `${source}_${target}_${edge.relation}`,
                source: source,
                target: target,
                relation: edge.relation
            }
        };
    });

    cytoscape({
        container: document.getElementById('inheritance-graph'),
        elements: cytoscapeNodes.concat(cytoscapeEdges),
        minZoom: 0.3,
        maxZoom: 2.5,
        layout: {
            name: 'dagre',
            rankDir: 'TB',
            rankSep: 80,
            nodeSep: 50,
            nodeDimensionsIncludeLabels: true,
        },
        style: [
            {
                selector: 'node',
                style: {
                    'label': 'data(label)',
                    'width': 170,
                    'height': 60,
                    'shape': 'roundrectangle',
                    'text-wrap': 'wrap',
                    'text-max-width': 145,
                    'text-halign': 'center',
                    'text-valign': 'center',
                    'font-size': 12,
                    'padding': 8
                }
            },
            {
                selector: 'node[cluster = "argument_structure"]',
                style: { 'background-color': '#DDEEFF' }
            },
            {
                selector: 'node[cluster = "motion_activity"]',
                style: { 'background-color': '#D6F0E3' }
            },
            {
                selector: 'node[cluster = "fixed_pragmatic"]',
                style: { 'background-color': '#FFDCE8' }
            },
            {
                selector: 'node[cluster = "clause_combining"]',
                style: { 'background-color': '#EAD9FF' }
            },
            {
                selector: 'node[cluster = "np_internal"]',
                style: { 'background-color': '#FFF0CC' }
            },
            {
                selector: 'edge',
                style: {
                    'width': 2,
                    'curve-style': 'bezier',
                    'target-arrow-shape': 'triangle',
                    'line-color': '#9baab8',
                    'target-arrow-color': '#9baab8'
                }
            },
            {
                selector: 'edge[relation = "metaphorical_extension"]',
                style: {
                    'line-color': '#c47820',
                    'target-arrow-color': '#c47820',
                    'line-style': 'dashed',
                    'line-dash-pattern': [7, 5]
                }
            },
            {
                selector: 'edge[relation = "construal_variant"]',
                style: {
                    'line-color': '#89a88a',
                    'target-arrow-color': '#89a88a',
                    'line-style': 'dashed',
                    'line-dash-pattern': [4, 4]
                }
            },
            {
                selector: 'edge[relation = "related_to"]',
                style: {
                    'line-color': '#2d3fb8',
                    'target-arrow-color': '#2d3fb8',
                    'line-style': 'dashed',
                    'line-dash-pattern': [2, 4]
                }
            },
            {
                selector: 'edge[relation = "subpart"]',
                style: {
                    'line-color': '#6030a0',
                    'target-arrow-color': '#6030a0',
                    'line-style': 'dashed',
                    'line-dash-pattern': [10, 4]
                }
            },
            {
                selector: 'edge[relation = "polysemy"]',
                style: {
                    'line-color': '#b82055',
                    'target-arrow-color': '#b82055',
                    'line-style': 'dashed',
                    'line-dash-pattern': [8, 3, 2, 3]
                }
            }
        ]
    });

});
