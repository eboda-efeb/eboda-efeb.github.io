// "Database"
const sUITextsForLanguagesJSON = '[' +
    '{' +
    '  "selector": "img.nextArrow",' +
    '  "type": "attr",' +
    '  "name": "alt",' +
    '  "value": {' +
    '    "en": "Next",' +
    '    "de": "Nächstes",' +
    '    "hu": "Következő",' +
    '    "default": "Next"' +
    '  }' +
    '},' +
    '{' +
    '  "selector": "img.previousArrow",' +
    '  "type": "attr",' +
    '  "name": "alt",' +
    '  "value": {' +
    '    "en": "Previous",' +
    '    "de": "Vorheriges",' +
    '    "hu": "Előző",' +
    '    "default": "Previous"' +
    '  }' +
    '},' +
    // could be made less redundant and more eficient by nesting items
    // for the same selector into the same JSON object
    '{' +
    '  "selector": "img.nextArrow",' +
    '  "type": "attr",' +
    '  "name": "title",' +
    '  "value": {' +
    '    "en": "Next",' +
    '    "de": "Nächstes",' +
    '    "hu": "Következő",' +
    '    "default": "Next"' +
    '}' +
    '},' +
    '{' +
    '  "selector": "img.previousArrow",' +
    '  "type": "attr",' +
    '  "name": "title",' +
    '  "value": {' +
    '    "en": "Previous",' +
    '    "de": "Vorheriges",' +
    '    "hu": "Előző",' +
    '    "default": "Previous"' +
    '  }' +
    '},' +

    '{' +
    '  "selector": "img#displayImage",' +
    '  "type": "attr",' +
    '  "name": "alt",' +
    '  "value": {' +
    '    "en": "[No image selected]",' +
    '    "de": "[Kein Bild ist ausgewählt]",' +
    '    "hu": "[Nincs kiválasztott kép]",' +
    '    "default": "[No image selected]"' +
    '  }' +
    '},' +

    '{' +
    '  "selector": "img#displayImage",' +
    '  "type": "attr",' +
    '  "name": "title",' +
    '  "value": {' +
    '    "en": "[No image selected]",' +
    '    "de": "[Kein Bild ist ausgewählt]",' +
    '    "hu": "[Nincs kiválasztott kép]",' +
    '    "default": "[No image selected]"' +
    '  }' +
    '},' +

    '{' +
    '  "selector": "document",' +
    '  "type": "title",' +
    // '  "name": "title",' +
    '  "value": {' +
    '    "en": "Image Gallery",' +
    '    "de": "Bildergalerie",' +
    '    "hu": "Képgaléria",' +
    '    "default": "Image Gallery"' +
    '  }' +
    '}' +
    ']';

// Exported function to load image data from "database"
function loadUITextsForLanguage(langID) {
    const aUITexts = JSON.parse(sUITextsForLanguagesJSON);

    let aLoadedTextsForLang = Array();
    // here we just imitate a filtering by converting the JSON into a simlfied one value by item format
    aUITexts.forEach((a) => {

        let sValue = (a.value[langID] == undefined ? a.value.default : a.value[langID]);
        aLoadedTextsForLang.push({
            selector: a.selector,
            type: a.type,
            name: a.name,
            value: sValue
        });
    });


    console.log('loadUITextsForLanguage: Loaded data, number of returned records: ' + aLoadedTextsForLang.length);
    return aLoadedTextsForLang;
}

// Export functions
export { loadUITextsForLanguage };