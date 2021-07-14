// "Database"
const sImagesJSON = '[' +
    '{' +
    '"src": "LoremIpsum.png",' +
    '"title": "Unilang Lorem Ipsum",' +
    '"description": "[Unilang] Ex mei viris possim iuvaret. Ei moderatius dissentiet pro. Doming qualisque at vim, lorem perpetua persecuti ad pri. Novum iuvaret suavitate sea ut, an oratio appareat inciderint nam.\\\\nNumquam convenire per no, adolescens consectetuer pri ex. Legere pericula has in, ea sea denique quaerendum, nam id nemore quaerendum contentiones.\\\\nEt tritani malorum est, simul consectetuer ne mel."' +
    '},' +

    '{' +
    '"src": "LoremIpsum_CutHigh.png",' +
    '"title": "Bilang Lorem Ipsum",' +
    '"description": "[Bilang => no en => Default] Tritani pericula id duo, an menandri intellegam nec. Sit alii tantas melius at, nec ex scaevola temporibus, nam diam eirmod detracto ad. Iisque bonorum ad pri, qui scripta aliquam ad. Zril semper te cum, quas quodsi scriptorem eu pro. Aperiri eligendi argumentum eos ei, et tamquam conceptam sit, reque iriure eos cu. An eum fierent referrentur, explicari inciderint repudiandae no eam.",' +
    '"localeTitles": {' +
    '"de": "Zweisprachiger Titel",' +
    '"hu": "Kétnyelvű cím"' +
    '},' +
    '"localeDescriptions": {' +
    '"de": "Zweisprachige Beschreibung, keine englische Übersetzung",' +
    '"hu": "Kétnyelvű leírás, nincs angol fordítás"' +
    '}},' +

    '{' +
    '"src": "LoremIpsum_RecoloredNoBlue_Resized25percent_Rotated_Resized25percent.png",' +
    '"title": "Átszínezett, kétszer kicsinyített, elforgatott kép",' +
    '"description": "Ez az alapértelmezett leírás az átszínezett, kétszer kicsinyített, elforgatott képhez, amihez van egy német nyelvű fordítás is.",' +
    '"localeDescriptions": {' +
    '"de": "Dies ist die deutschsprachige Beschreibung des neu gefärbten, zweimal verkleinerten, verdrehten Bildes.\\\\nEs gibt nur noch eine Standarversion der Beschreibung, aber keine weiteren Übersetzungen."' +
    '}},' +

    '{' +
    '"src": "LoremIpsum_CutWide.png",' +
    '"title": "Partial Bilang Lorem Ipsum",' +
    '"description": "[Partial Bilang => no en desc => Default] Malorum molestie suscipit vim an, iracundia honestatis temporibus mei ei. Putent propriae placerat his et. Eos ne sint oportere. No iusto ornatus eam, ad malis offendit mnesarchum per. His eu gubergren comprehensam. Ius diam nusquam contentiones ea, ut wisi fabulas delicatissimi eum. Mea ut sint percipit consequat, duo esse sanctus voluptaria et.\\\\nEos debitis nusquam at. Dolor putant philosophia eos ei, eu adhuc mazim lobortis vix, usu delectus facilisis scriptorem an. Eros fastidii sed ad. Soleat iisque has ne, percipit moderatius scribentur ea sed.",' +
    '"localeTitles": {' +
    '"en": "Bilingual title",' +
    '"de": "Zweisprachiger Titel",' +
    '"hu": "Kétnyelvű cím"' +
    '},' +
    '"localeDescriptions": {' +
    '"de": "Zweisprachige Beschreibung, keine englische Übersetzung",' +
    '"hu": "Kétnyelvű leírás, nincs angol fordítás"' +
    '}},' +

    '{' +
    '"src": "dummy.jpg", ' +
    '"title": "Dummy item with missing image file and a little bit longer tooltip text, even with further rows generated, just to see, how it behaves", ' +
    '"description": "This is a dummy item with intentionally missing image file. Also the tooltip text is quite long, in order to prove, how it behaves",' +
    '"localeDescriptions": {' +
    '"hu": "Ennél a példánál a képfájl szándékosan hiányzik.\\\\nA cím csak alapértelmezett, lokalizáció nélkül. Ezen kívül csupán egynyelvű leírása van, nincs angol és német fordítás."' +
    '}},' +

    '{' +
    '"src": "LoremIpsum_RecoloredNoBlue.png",' +
    '"title": "Trilang Nietsche Ipsum",' +
    '"description": "[Trilang] Zarathustra hatred endless god sea right madness. Intentions spirit faith ascetic of suicide abstract enlightenment battle convictions.",' +
    '"localeTitles": {' +
    '"en": "English Title for Nietsche Ipsum",' +
    '"de": "Deutscher Titel für Nietsche Ipsum",' +
    '"hu": "Magyar cím a  Nietsche Ipsumhoz"' +
    '},' +
    '"localeDescriptions": {' +
    '"en": "Moral holiest merciful intentions good suicide evil superiority war. Sexuality right gains ascetic war ultimate ocean gains. Free god christianity virtues decrepit snare hope good hatred faith contradict convictions. Sea evil sexuality transvaluation christian oneself superiority holiest. Spirit contradict spirit gains overcome convictions dead convictions snare merciful pinnacle. Superiority moral zarathustra enlightenment pious against evil victorious madness strong burying sea. Evil holiest morality evil merciful spirit overcome strong.\\\\nGood convictions superiority self prejudice virtues morality faith superiority philosophy holiest value pious eternal-return. Love horror dead salvation christianity insofar revaluation. Ultimate pious philosophy joy overcome philosophy strong passion moral. Faith suicide faith depths strong battle will.",' +
    '"de": "Moralisch heiligste barmherzige Absichten guter Selbstmord böser Überlegenheitskrieg. Das Recht der Sexualität gewinnt durch den asketischen Krieg die ultimativen Ozeangewinne. Freier Gott Christentum Tugenden altersschwache Schlinge Hoffnung guter Hass Glaube widersprechen Überzeugungen. Sea böse Sexualität Transvaluation christliche Überlegenheit heiligste. Geist widerspricht Geist gewinnt Überzeugungen überwindet tote Überzeugungen Schlinge barmherziger Gipfel. Überlegenheit moralische zarathustra Aufklärung fromm gegen das Böse siegreiche Wahnsinn starkes Meer begraben. Böse heiligste Moral böser barmherziger Geist überwunden stark.\\\\nGute Überzeugungen Überlegenheit Selbstvorurteile Tugenden Moral Glaube Überlegenheit Philosophie heiligster Wert fromm ewige Wiederkunft. Liebe Horror Toten Heil Christentum insofern Aufwertung. Ultimative fromme Philosophie Freude überwinden Philosophie starke Leidenschaft Moral. Glaube Selbstmord Glaube Tiefen starken Kampfwillen.",' +
    '"hu": "Az erkölcsi legszentebb irgalmas szándékok jó öngyilkosság gonosz felsőbbrendűségi háború. A szexualitás helyes nyeri az aszketikus háború végső óceánnyereségét. A szabad isten kereszténység erényei elvetemült pergő remény, hogy a jó gyűlölet hit ellentmond a meggyőződésnek. Tengeri gonosz szexualitás átértékelés keresztény önmagának felsőbbrendűsége. A szellem ellentmond a szellem nyereményeinek legyőzésén a meggyőződéseket. A felsőbbrendűség erkölcsi zarathustra megvilágosodás jámbor a gonosz győztes őrület ellen erős temető tenger. Gonosz legszentebb erkölcs gonosz irgalmas szellem legyőzni erős.\\\\nJó meggyőződés felsőbbrendűség önmegítélés erények erkölcs hit felsőbbrendűség filozófia legszentebb érték jámbor örök visszatérés. Szerelem horror halott üdvösség kereszténység, amennyiben az átértékelés. Végső jámbor filozófia öröm legyőzni filozófia erős szenvedély erkölcsi. A hit öngyilkos hite mélységes harc akaratot mélyít el."' +
    '}},' +

    '{' +
    '"src": "LoremIpsum_Resized10percent.png",' +
    '"title": "Kicsinyített kép",' +
    '"description": "10%-ra kicsinyítve."' +
    '},' +

    '{' +
    '"src": "LoremIpsum_RecoloredNoBlue_Resized25percent.png",' +
    '"title": "Átszínezett, kicsinyített kép",' +
    '"description": "Ez egy egynyelvű, alapértelmezett leírás az átszínezett, kicsinyített képhez."' +
    '},' +

    '{' +
    '"src": "LoremIpsum_RecoloredNoBlue_Resized25percent_Rotated.png",' +
    '"title": "Átszínezett, kicsinyített, elforgatott kép",' +
    '"description": "Ez egy egynyelvű, alapértelmezett leírás az átszínezett, kicsinyített, elforgatott képhez."' +
    '},' +

    '{' +
    '"src": "LoremIpsum_SkewedCut.png",' +
    '"title": "Skewed image",' +
    '"description": "This item has a title translation in a currently not supported language (zh) which never should appear (as long as Chinese does not get supported).",' +
    '"localeTitles": {' +
    '"zh": "The Emulated Chinese Title"' +
    '}}' +
    ']';

// Exported function to load image data from "database"
function loadImageData(startIndex, maxItemCnt) {

    const aImagesDataRows = JSON.parse(sImagesJSON);

    const numOfImages = aImagesDataRows.length;
    if (isNaN(startIndex) || startIndex == null) {
        startIndex = 0;
    }
    else if (startIndex < 0) {
        // Setting to 0 as the default. Maybe calculate index from the end instead?
        startIndex = 0;
    }

    maxItemCnt = maxItemCnt || numOfImages;
    const maxIndex = Math.min(maxItemCnt, numOfImages);

    if (startIndex >= numOfImages) {
        console.log('loadImageData: No image at position: ' + startIndex + '. The overall number of images in the gallery is: ' + numOfImages);
        return null;
    }
    let aLoadedImageData = new Array();
    for (let i = startIndex; i < maxIndex; ++i) {
        aLoadedImageData.push(aImagesDataRows[i]);
    }

    console.log('loadImageData: Loaded data, number of returned records: ' + aLoadedImageData.length);
    return aLoadedImageData;
}



// Export functions
export { loadImageData };