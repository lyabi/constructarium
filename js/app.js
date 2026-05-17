document.addEventListener('DOMContentLoaded', async function() { //JS startet erst, wenn die HTML Seite vollständig geladen ist
    const constructionsResponse = await fetch('data/constructarium_constructions.json'); //async + await: warten bis die Daten geladen sind, bevor der Code weiter ausgeführt wird
    const constructions = await constructionsResponse.json(); //Daten in JSON Format umwandeln
    const referencesResponse = await fetch('data/constructarium_references.json');
    const references = await referencesResponse.json();
    const contrastivePairsResponse = await fetch('data/constructarium_contrastive_pairs.json');
    const contrastivePairs = await contrastivePairsResponse.json();
    const crossSetsResponse = await fetch('data/constructarium_cross_construction_set.json');
    const crossSets = await crossSetsResponse.json();
    const inheritanceResponse = await fetch('data/constructarium_inheritance.json');
    const inheritance = await inheritanceResponse.json();
    console.log('Daten erfolgreich geladen und in Variablen gespeichert.'); //Bestätigung, dass die Daten erfolgreich in Variablen gespeichert wurden

    const referenceList = document.querySelector('#reference-list');
    references.forEach(function(reference) {
      const listItem = document.createElement('li'); //Erstellen eines Listenelements
      listItem.textContent = `${reference.author} (${reference.year}). ${reference.title}`; //Textinhalt des Listenelements
      referenceList.appendChild(listItem); //Hinzufügen des Listenelements zur Referenzliste
    });

    const comparisonPairList = document.querySelector('#comparison-pair-list');
    const constructionATitle = document.querySelector('#construction-a-title');
    const constructionASentence = document.querySelector('#comparison-link-a');
    const constructionBTitle = document.querySelector('#construction-b-title');
    const constructionBSentence = document.querySelector('#comparison-link-b');
    const contrastType = document.querySelector('#comparison-contrast-type');
    const comparisonExplanation = document.querySelector('#comparison-explanation');
    contrastivePairs.forEach(function(pair) {
      const listItem = document.createElement('li');
      listItem.textContent = `${pair.contrast_type}`;
      comparisonPairList.appendChild(listItem);
      listItem.addEventListener('click', function(event) {
        const constructionA = constructions.find(function(construction) {return construction.id === pair.construction_id_a;}).name;
        const constructionB = constructions.find(function(construction) {return construction.id === pair.construction_id_b;}).name;
        constructionATitle.textContent = constructionA;
        constructionASentence.textContent = pair.sentence_a;
        constructionASentence.href = '#detail-' + pair.construction_id_a.replace(/_/g, '-'); //Setzt den href-Attribut des Satzes, damit er anklickbar ist und auf die entsprechende URL verweist
        constructionBTitle.textContent = constructionB;
        constructionBSentence.textContent = pair.sentence_b;
        constructionBSentence.href = '#detail-' + pair.construction_id_b.replace(/_/g, '-'); //#detail fest, '+' verbindet strings; /_/g: entfernt alle Unterstriche im construction_id ersetzt, damit URL korrekt formatiert ist
        contrastType.textContent = pair.contrast_type;
        comparisonExplanation.textContent = pair.explanation;
      });
    });

    const uniqueSetIds = new Set(crossSets.map(function(entry) {return entry.set_id;})); //Erstellen eines Sets aus den set_id Werten, um Duplikate zu entfernen; map() wird verwendet, um ein Array der set_id Werte zu erstellen, und Set() entfernt die Duplikate
    const crossSetList = document.querySelector('#verb-set-list');
    const sliceSet = document.querySelector('#slice-set');
    const cookSet = document.querySelector('#cook-set');
    uniqueSetIds.forEach(function(setId) {
      const listItem = document.createElement('li');
      const setLink = document.createElement('a'); 
      setLink.textContent = setId.replace('_set', '') //Entfernt "_set" aus dem set_id Wert --> nur noch "slice" und "cook"
      listItem.appendChild(setLink); //Hinzufügen des Links zum Listenelement
      crossSetList.appendChild(listItem);
      listItem.addEventListener('click', function(event) {
       //Event Listener für Klicks auf die Liste der Verb-Sets
       if (setId === 'slice_set') {
        sliceSet.hidden = false; //Anzeigen des Slice-Sets
        cookSet.hidden = true; //Verstecken des Cook-Sets
       } else if (setId === 'cook_set') {
        cookSet.hidden = false; //Anzeigen des Cook-Sets
        sliceSet.hidden = true; //Verstecken des Slice-Sets
       }
    });
  });
    function getEntriesForSetId(setId) {
      return crossSets.filter(function(verbEntry) {return verbEntry.set_id === setId;}); //filter(), um Einträge zu finden, die mit id übereinstimmen -> alle slice_id in eine Tabelle, alle cook_id in eine Tabelle 
    }
    const sliceSetBody = document.querySelector('#slice-set-body');
    const cookSetBody = document.querySelector('#cook-set-body');
    function fillSetTable(setId, tableBody) {
      getEntriesForSetId(setId).forEach(function(entry) {
      const row = document.createElement('tr');
      const sentenceCell = document.createElement('td');
      sentenceCell.textContent = entry.sentence;
      const constructionCell = document.createElement('td');
      constructionCell.textContent = constructions.find(function(construction) {
        return construction.id === entry.construction_id; //Sucht die Konstruktion, die mit der construction_id des Eintrags übereinstimmt, und gibt den Konstruktionstext zurück
      }).name; //Nimmt den Namen der gefundenen Konstruktion
      const sourceCell = document.createElement('td');
      const matchingReference = references.find(function(reference) {
        return reference.id === entry.source; //Sucht die Referenz, die mit der source_id des Eintrags übereinstimmt
      });
      sourceCell.textContent = `${matchingReference.author} (${matchingReference.year})`; //Nimmt den Autor und das Jahr der gefundenen Referenz
      row.appendChild(sentenceCell);
      row.appendChild(constructionCell);
      row.appendChild(sourceCell);
      tableBody.appendChild(row);
    })
  }
  fillSetTable('slice_set', sliceSetBody);
  fillSetTable('cook_set', cookSetBody);
    

});