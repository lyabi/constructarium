// Hamburger-Navigation: Button und Nav-Liste aus dem DOM holen
const navToggle = document.querySelector('.nav-toggle'); // der <button class="nav-toggle">
const primaryNavList = document.getElementById('primary-nav-list'); // die <ul id="primary-nav-list">
const navLinks = primaryNavList.querySelectorAll('a'); // alle <a> Links innerhalb der Nav-Liste

// Beim Klick auf den Button die Nav-Liste ein- oder ausblenden
navToggle.addEventListener('click', function () {
  // toggle() fügt die Klasse hinzu, wenn sie fehlt, und entfernt sie, wenn sie da ist
  // Der Rückgabewert ist true (Klasse wurde hinzugefügt) oder false (Klasse wurde entfernt)
  const isOpen = primaryNavList.classList.toggle('nav-open');
  // aria-expanded sagt Screenreadern, ob das Menü gerade offen ist
  navToggle.setAttribute('aria-expanded', String(isOpen)); // String() wandelt true/false in "true"/"false" um
});

// Damit die Navigation bei mobilen Geräten wieder verschwindet
navLinks.forEach(function (link) {
  link.addEventListener('click', function () {
    primaryNavList.classList.remove('nav-open');
    navToggle.setAttribute('aria-expanded', 'false');
  });
});

document.addEventListener('DOMContentLoaded', async function () { //JS startet erst, wenn die HTML Seite vollständig geladen ist
  async function loadJSON(file_path) {
    const response = await fetch(file_path);
    const data = await response.json();
    return data;
  }
  const constructions = await loadJSON('data/constructarium_constructions.json');
  const references = await loadJSON('data/constructarium_references.json');
  const contrastivePairs = await loadJSON('data/constructarium_contrastive_pairs.json');
  const crossSets = await loadJSON('data/constructarium_cross_construction_set.json');
  const inheritance = await loadJSON('data/constructarium_inheritance.json');
  console.log('Daten erfolgreich geladen und in Variablen gespeichert.'); //Bestätigung, dass die Daten erfolgreich in Variablen gespeichert wurden

  const referenceList = document.querySelector('#reference-list');
  references.forEach(function (reference) {
    const listItem = document.createElement('li');
    let text = '';
    if (reference.type === 'article') {
      text = `${reference.author} (${reference.year}). "${reference.title}". ${reference.journal} ${reference.volume}.${reference.issue}: ${reference.pages}.`;
    } else if (reference.type === 'book') {
      text = `${reference.author} (${reference.year}). ${reference.title}. ${reference.place}: ${reference.publisher}.`;
    } else if (reference.type === 'edited volume') {
      text = `${reference.author} (${reference.year}). ${reference.title}. ${reference.place}: ${reference.publisher}.`;
    } else if (reference.type === 'chapter') {
      text = `${reference.author} (${reference.year}). "${reference.title}". In: ${reference.editors} ${reference.book_title}. ${reference.place}: ${reference.publisher}.`;
    } else if (reference.type === 'proceedings') {
      text = `${reference.author} (${reference.year}). "${reference.title}". ${reference.journal}: ${reference.pages}.`;
    } else if (reference.type === 'corpus') {
      text = `${reference.author} (${reference.year}). ${reference.title}.`;
    }
    listItem.appendChild(document.createTextNode(text));
    if (reference.url_doi) {
      const link = document.createElement('a');
      link.href = reference.url_doi;
      listItem.appendChild(document.createTextNode(' '));
      link.textContent = '[Link]';
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      listItem.appendChild(link);
    }
    referenceList.appendChild(listItem);
  });

  const comparisonPairList = document.querySelector('#comparison-pair-list');
  const constructionATitle = document.querySelector('#construction-a-title');
  const constructionASentence = document.querySelector('#comparison-link-a');
  const constructionBTitle = document.querySelector('#construction-b-title');
  const constructionBSentence = document.querySelector('#comparison-link-b');
  const contrastType = document.querySelector('#comparison-contrast-type');
  const comparisonExplanation = document.querySelector('#comparison-explanation');
  contrastivePairs.forEach(function (pair) {
    const listItem = document.createElement('li');
    listItem.textContent = pair.contrast_type;
    comparisonPairList.appendChild(listItem);
    listItem.setAttribute('role', 'button');
    listItem.setAttribute('tabindex', '0');
    listItem.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        listItem.click();
      }
    });
    listItem.addEventListener('click', function (event) {
      comparisonPairList.querySelectorAll('li').forEach(function (s) { s.removeAttribute('aria-current'); }); // aria-current von allen Einträgen entfernen
      listItem.setAttribute('aria-current', 'true'); // aria-current auf das angeklickte <li> setzen → CSS hebt es hervor
      const constructionA = constructions.find(function (construction) { return construction.id === pair.construction_id_a; }).name;
      const constructionB = constructions.find(function (construction) { return construction.id === pair.construction_id_b; }).name;
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

  const uniqueSetIds = new Set(crossSets.map(function (entry) { return entry.set_id; })); //Erstellen eines Sets aus den set_id Werten, um Duplikate zu entfernen; map() wird verwendet, um ein Array der set_id Werte zu erstellen, und Set() entfernt die Duplikate
  const crossSetList = document.querySelector('#verb-set-list');
  const sliceSet = document.querySelector('#slice-set');
  const cookSet = document.querySelector('#cook-set');
  uniqueSetIds.forEach(function (setId) {
    const listItem = document.createElement('li');
    const setLink = document.createElement('span');
    setLink.textContent = setId.replace('_set', ''); //Entfernt "_set" aus dem set_id Wert --> nur noch "slice" und "cook"
    if (setId === 'slice_set') { setLink.classList.add('active'); } //Erster Button beim Laden aktiv markieren
    listItem.appendChild(setLink); //Hinzufügen des Links zum Listenelement
    crossSetList.appendChild(listItem);
    listItem.setAttribute('role', 'button');
    listItem.setAttribute('tabindex', '0');
    listItem.addEventListener('keydown', function (event) {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        listItem.click();
      }
    });
    listItem.addEventListener('click', function (event) {
      crossSetList.querySelectorAll('span').forEach(function (s) { s.classList.remove('active'); }); //Aktiv-Markierung von allen Buttons entfernen
      setLink.classList.add('active'); //Aktiv-Markierung auf den angeklickten Button setzen
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
    return crossSets.filter(function (verbEntry) { return verbEntry.set_id === setId; }); //filter(), um Einträge zu finden, die mit id übereinstimmen -> alle slice_id in eine Tabelle, alle cook_id in eine Tabelle 
  }
  const sliceSetBody = document.querySelector('#slice-set-body');
  const cookSetBody = document.querySelector('#cook-set-body');
  function fillSetTable(setId, tableBody) {
    getEntriesForSetId(setId).forEach(function (entry) {
      const row = document.createElement('tr');
      const sentenceCell = document.createElement('td');
      sentenceCell.textContent = entry.sentence;
      const constructionCell = document.createElement('td');
      constructionCell.textContent = constructions.find(function (construction) {
        return construction.id === entry.construction_id; //Sucht die Konstruktion, die mit der construction_id des Eintrags übereinstimmt, und gibt den Konstruktionstext zurück
      }).name; //Nimmt den Namen der gefundenen Konstruktion
      const sourceCell = document.createElement('td');
      const matchingReference = references.find(function (reference) {
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