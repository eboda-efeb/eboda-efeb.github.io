/*
Image Gallery
Author: Eszter Boda
Copyright (c) by Eszter Boda, 2021

Implemented functionalities:
- Load image data from a(n emulated) database
    Note: Even loading from local json file is not allowed in JS due to security reasons,
    files only can be loaded either by user interaction or from a GET call's response on a web server    
- Display thumbnails
- Change thumbnail's look if
    1. hovered (including to show a tooltip)
         Note: the tooltip could be very likely shown also by just styling/positioning
               the "title" attribute of the image
    2. selected
- Display image and descriptive data to selected thumbnail
- Enable shifting the selection (circular: first after last and last before first)
- Multi-language support:
    1. Over CSS (+ work around for tooltip)
    2. Over loaded UI text resources
- Automatic scrolling if the selected thumbnail moves off the visible part

Planned improvements:
- Much more error handling
- More efficient data structure (looping) to set language specific data
- Enable category selection (filter/specify loaded data)
- Enable "paging" of loaded image data (i.e. load only a specific number of images
    and load a new range on demand, when the user tries to navigate)
- Create a real slide show (carousel) having the currently selected thumbnail always in the 
    middle and put the last images circularly to its left
- Skins
- Save user preferences (language, skin, category ...)

Note:
For copyright reasons only published with "lorem ipsum"-like dummy data! 
  Copyright for all images in the gallery is owned by the author of this webpage.
*/

import { loadImageData } from './image_data.js';
import { loadUITextsForLanguage } from './ui_data.js';

const sGalleryImagesPath = './gallery_images/';

const sDefaultUILanguage = 'de';

const sThumbnailImageClass = "thumbnailImage";
const sThumbnailItemClass = "thumbnailItem";
const sThumbnailTooltipClass = "tooltipText";

const sNavArrowPreviousClass = 'previousArrow';
const sNavArrowNextClass = 'nextArrow';

const aThumbnailsBrowser = $('#thumbnailsBrowser');
const loadDataMaxCount = 15;

const aLanguageSelector = $('select#languageSelector');
const enabledLanguages = ['en', 'de', 'hu'];

const aImage = $('#displayImage');
const aImageTitle = $('#imageTitle');
const aImageDescription = $('#imageDescription');

var aImageData = null;
var currentDataIndex = 0;

var loadDataStartIndex = 0;

var aCurrentlyLoadedRecordRange = { start: -1, end: -1 };

function setUIElementsForLanguage(langID) {
    // set language dependent attributes
    // (like alt and title on the navigation arrows)
    // where a CSS solution is not possible
    const aUITexts = loadUITextsForLanguage(langID);
    aUITexts.forEach((aSelectorItem) => {
        // there is currently only one "type":"name":"value"[val by lang] record by array element,
        // but should be replaced by looping over multiple elements
        let aTypeItem = aSelectorItem; // aSelectorItem.types.forEach((aTypeItem) => { ... });
        // could be extended with further type value combinations such as setting classes
        switch (aTypeItem.type) {
            case 'attr':
                {
                    // for the case there are more attributes to set for the same selector
                    // this should be replaced by looping over multiple elements
                    let aItem = aTypeItem; // aTypeItem.names.forEach((aItem) => { ... });

                    $(aSelectorItem.selector).attr(aItem.name, aItem.value);
                    break;
                }
            case 'text':
                {
                    // for the case there are more attributes to set for the same selector
                    // this should be replaced by looping over multiple elements
                    let aItem = aTypeItem; // aTypeItem.names.forEach((aItem) => { ... });

                    $(aSelectorItem.selector).text(aItem.value);
                    break;
                }
            case 'title':
                {
                    // for the case there are more attributes to set for the same selector
                    // this should be replaced by looping over multiple elements
                    let aItem = aTypeItem; // aTypeItem.names.forEach((aItem) => { ... });

                    $(document).prop('title', aItem.value);
                    break;
                }
        }
    });
}

function initData() {
    // fill data structures, create the thumbnails, select first image
    /*let*/ aImageData = loadImageData(loadDataStartIndex, loadDataMaxCount);
    if (aImageData.length > 0) {
        $(aThumbnailsBrowser).children().remove();
    }
    aCurrentlyLoadedRecordRange.start = loadDataStartIndex;
    aCurrentlyLoadedRecordRange.end = aCurrentlyLoadedRecordRange.start + aImageData.length - 1;
    // Add image with data to thumbnailsBrowser

    let i = 0;
    aImageData.forEach((a) => {

        let sThumbnailItem = '<div class="' + sThumbnailItemClass + '">';
        if (a.localeTitles != undefined) {
            // Looping through the Object.keys results in no entries in case when a language is not defined,
            // and in never shown entries if a not selectable ("supported") language is contained.
            // Object.keys(a.localeTitles).forEach((key) => {
            //     sThumbnailItem +=  '<span " lang="' + key + '">' +
            //     '<span class="' + sThumbnailTooltipClass + '">' + a.localeTitles[key] + '</span>' +
            //     '</span>';

            enabledLanguages.forEach((langID) => {
                // Work around: since all tooltip would be shown when hovering the thumbnail due to
                // a more specific CSS rule than the one for the language based hiding, we need to
                // apply a language specific element pair around the language-independent tooltip content,
                // instead of just including the lang attribute in the tooltip element itself
                sThumbnailItem += '<span " lang="' + langID + '">' +
                    '<span class="' + sThumbnailTooltipClass + '">' +
                    (a.localeTitles[langID] != undefined ? a.localeTitles[langID] : a.title) + '</span>' +
                    '</span>';
            });
        }
        else {
            sThumbnailItem += '<span class="' + sThumbnailTooltipClass + '">' + a.title + '</span>';
        }

        sThumbnailItem += '<img src="' + sGalleryImagesPath + a.src +
            '" alt="' + a.title +
            '" class="' + sThumbnailImageClass +
            '" data-number="' + (i++) + '"/>' +
            '</div>';

        $(aThumbnailsBrowser).append(sThumbnailItem);
    });

    if (aImageData.length > 0) { // or: i > 0
        onThumbnailActivate($(aThumbnailsBrowser).children('.' + sThumbnailItemClass).first().children('.' + sThumbnailImageClass));
    }
}

function initUILanguage(langID) {
    langID = langID || sDefaultUILanguage;
    // select option programatically
    $(aLanguageSelector).val(langID);

    console.log('Set language to: ' + $(aLanguageSelector).val());

    onUILangSelectionChange(langID);
}

function onUILangSelectionChange(langID) {
    if ($('html').attr('lang') !== langID) {
        $('html').attr('lang', langID);
        setUIElementsForLanguage(langID);
    }
}

function convertToHTMLParagraphs(sText) {
    // separate HTML paragraphs by replacing line breaks with </p><p>
    sText = sText.replaceAll('\\n', '</p><p>');
    return '<p>' + (sText || '') + '</p>';
}

function getDescriptionForUILanguage(aImageDataObject, langID) {
    if (aImageDataObject.localeDescriptions != undefined && aImageDataObject.localeDescriptions[langID] != undefined) {
        return aImageDataObject.localeDescriptions[langID];

    }
    return aImageDataObject.description;
}

function getTitleForUILanguage(aImageDataObject, langID) {
    if (aImageDataObject.localeTitles != undefined && aImageDataObject.localeTitles[langID] != undefined) {
        return aImageDataObject.localeTitles[langID];

    }
    return aImageDataObject.title;
}

function setImageDescriptiveDataForLanguage(index, langID) {
    const sTitle = getTitleForUILanguage(aImageData[index], langID);
    $(aImageTitle).text(sTitle);
    $(aImageDescription).children().remove();
    $(aImageDescription).append(convertToHTMLParagraphs(getDescriptionForUILanguage(aImageData[index], langID)));

    $(aImage).attr('alt', sTitle);
    $(aImage).attr('title', sTitle);
}

function calculateBoundariesForViewCheck(aContainer, aElement, bVertically = false) {
    //Get container properties:
    // - base sides are the ones that the coordinates are counted from (top and left, respectively)
    // - other sides  are the ones with the higher coordinates (bottom and right, respectively)
    let cBaseSide = (bVertically ? aContainer.scrollTop() : aContainer.scrollLeft());
    let cOtherSide = cBaseSide + (bVertically ? aContainer.innerHeight() : aContainer.innerWidth());

    //Get element properties
    let eBaseSide = (bVertically ? aElement.offset().top : aElement.offset().left);
    let eOtherSide = eBaseSide + (bVertically ? aElement.outerHeight() : aElement.outerWidth());

    return { cBaseSide: cBaseSide, cOtherSide: cOtherSide, eBaseSide: eBaseSide, eOtherSide: eOtherSide };
}

// Check if thumbnail is visible inside the (scrollable) container
function isInsideView(aContainer, aElement, bPartial = true, bVertically = false) {

    let aBoundaries = calculateBoundariesForViewCheck(aContainer, aElement, bVertically);

    //Check if in view    
    let isTotal = (aBoundaries.eBaseSide >= aBoundaries.cBaseSide && aBoundaries.eOtherSide <= aBoundaries.cOtherSide);
    let isPartial = bPartial && (
        (aBoundaries.eBaseSide < aBoundaries.cBaseSide && aBoundaries.eOtherSide > aBoundaries.cBaseSide) ||
        (aBoundaries.eOtherSide > aBoundaries.cOtherSide && aBoundaries.eBaseSide < aBoundaries.cOtherSide)
    );

    //Return outcome
    return (isTotal || isPartial);
}

function ensureInsideView(aContainer, aElement, bVertically) {
    let aBoundaries = calculateBoundariesForViewCheck(aContainer, aElement, bVertically);
    //Check if out of view and scroll if not
    if (aBoundaries.eBaseSide < aBoundaries.cBaseSide) {
        bVertically ? aContainer.scrollTop(aBoundaries.eBaseSide) : aContainer.scrollLeft(aBoundaries.eBaseSide);
        return true; // scrolled
    }
    else if (aBoundaries.eOtherSide > aBoundaries.cOtherSide) {
        bVertically
            ? aContainer.scrollTop(aBoundaries.cOtherSide + aBoundaries.eOtherSide - aBoundaries.cOtherSide)
            : aContainer.scrollLeft(aBoundaries.cOtherSide + aBoundaries.eOtherSide - aBoundaries.cOtherSide);
        return true; // scrolled
    }
    return false; // not scrolled
}

// Check if thumbnail is visible inside the (scrollable) container
function isInsideViewVertically(aContainer, aElement, bPartial) {
    return isInsideView(aContainer, aElement, bPartial, true);
}

function ensureInsideViewVertically(aContainer, aElement) {
    return ensureInsideView(aContainer, aElement, true);
}

function isInsideViewHorizontally(aContainer, aElement, bPartial) {
    return isInsideView(aContainer, aElement, bPartial, false);
}

function ensureInsideViewHorizontally(aContainer, aElement) {
    return ensureInsideView(aContainer, aElement, false);
}

function onThumbnailActivate(aThumbnail) {
    deactivateThumbnailAtIndex(currentDataIndex);

    $(aImage).attr('src', $(aThumbnail).attr('src'));

    if (!$(aThumbnail).hasClass('activated')) {
        $(aThumbnail).toggleClass('activated');
    }

    let index = parseInt($(aThumbnail).attr('data-number'));

    currentDataIndex = index;

    const langID = $('html').attr('lang');
    setImageDescriptiveDataForLanguage(index, langID);

    if (true === ensureInsideViewHorizontally(aThumbnailsBrowser, aThumbnail)) {
        console.log('Container was scrolled to make the selected thumbnail visible. Thumbnail now visible in container: ' +
            isInsideViewHorizontally(aThumbnailsBrowser, aThumbnail, true));
    }
}

function deactivateThumbnailAtIndex(index) {
    let aThumbnail = $(aThumbnailsBrowser).children().eq(index).children('.' + sThumbnailImageClass).first();
    if (!aThumbnail) {
        console.log('deactivateThumbnailAtIndex: Could not find thumbnail with index: ' + index);
        return;
    }
    onThumbnailDeactivate(aThumbnail);
}

function onThumbnailDeactivate(aThumbnail) {
    if ($(aThumbnail).hasClass('activated')) {
        $(aThumbnail).toggleClass('activated');
    }
}

function calculatedShiftedIndex(shiftBy) {
    if (!shiftBy) {
        return 0; // wrong input or nothing to do
    }

    let loadedRecordsMaxIndex = aCurrentlyLoadedRecordRange.end - aCurrentlyLoadedRecordRange.start;
    let newIndex = (currentDataIndex + shiftBy);

    if (newIndex > loadedRecordsMaxIndex) {
        return newIndex % (loadedRecordsMaxIndex + 1); // get remainder with modulo record cnt
    }
    else if (newIndex < 0) {
        return (loadedRecordsMaxIndex + 1 + (newIndex % (loadedRecordsMaxIndex + 1))); // get remainder with modulo record cnt
    }

    return newIndex;
}

function shiftImage(shiftBy) {
    if (!shiftBy) {
        return; // wrong input or nothing to do
    }

    const oldIndex = currentDataIndex; // just to ensure that it won't be changed
    const newIndex = calculatedShiftedIndex(shiftBy);

    deactivateThumbnailAtIndex(oldIndex);
    onThumbnailActivate($(aThumbnailsBrowser).children().eq(newIndex).children('.' + sThumbnailImageClass).first());
}

function onImageNavArrowClick(aObject) {
    if (!aObject) {
        console.log('onImageNavArrowClick: No navigation arrow was provided: ' + aObject);
        return;
    }

    let shiftBy = 0;
    if ($(aObject).hasClass(sNavArrowPreviousClass)) {
        shiftBy = -1;
    }
    else if ($(aObject).hasClass(sNavArrowNextClass)) {
        shiftBy = 1;
    }

    if (shiftBy === 0) {
        return;
    }
    shiftImage(shiftBy);
}

function onThumbnailClick(aObject) {
    if (!aObject) {
        console.log('onThumbnailClick: No thumbnail object was provided: ' + aObject);
        return;
    }

    if (isNaN($(aObject).attr('data-number')) || $(aObject).attr('data-number') === null) {
        console.log('onThumbnailClick: No or incorrect thumbnail object data number was provided: ' + $(aObject).attr('data-number'));
        return;
    }

    // Pass it as an Object, not as a HTMLElement, to enable function calls like "offset()" directly
    onThumbnailActivate($(aObject));
}

$(document).ready(() => {
    // order of the init calls should be the same, but it is more efficient
    // to set the language first, we would need to reassign the main image's
    // description (which may be language secific) twice 
    initUILanguage(sDefaultUILanguage);
    initData();

    setImageDescriptiveDataForLanguage(currentDataIndex, sDefaultUILanguage);
});

$(aThumbnailsBrowser).on('click', '.' + sThumbnailImageClass, (event) => {
    onThumbnailClick(event.target);
});

$('.navArrow').click((event) => {
    onImageNavArrowClick(event.target);
});

$(aLanguageSelector).change((event) => {
    const langID = $(event.target).val();
    console.log('Selected language: ' + langID);

    $('html').attr('lang', langID);
    setUIElementsForLanguage(langID);

    setImageDescriptiveDataForLanguage(currentDataIndex, langID);
});

