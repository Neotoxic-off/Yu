export function removeElementsByClass(className: string) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode?.removeChild(elements[0]);
    }
}

export function removeElementsByTag(tagName: string) {
    const elements = document.getElementsByTagName(tagName);
    while (elements.length > 0) {
      elements[0].parentNode?.removeChild(elements[0]);
    }
}

export function removeVideoPreview() {
    removeElementsByTag("ytd-video-preview");
}

export function removeTabsContent() {
    const parentSection = document.querySelector('#sections');
  
    if (parentSection) {
        const guideSections = parentSection.querySelectorAll('ytd-guide-section-renderer');

        guideSections.forEach((section, index) => {
            if (index > 0) {
                section.remove();
            }
        });
        removeFooter();
    }
}

function removeFooter() {
    const footer = document.querySelector('#footer.style-scope.ytd-guide-renderer');
  
    if (footer) {
        footer.remove();
    }
}

export function removeShorts() {
    removeElementsByClass("style-scope ytd-rich-section-renderer");
}

export function removeShortEmbeded() {
    removeElementsByTag("ytd-reel-shelf-renderer");
}

export function removeSearchVoice() {
    const voiceSearchButton = document.getElementById('voice-search-button');

    if (voiceSearchButton) {
        voiceSearchButton.remove();
    }
}

export function removePaidContent() {
    removeElementsByTag("ytm-paid-content-overlay-renderer");
}

export function removeFeedBar() {
    removeElementsByTag("ytd-feed-filter-chip-bar-renderer");
}

export function removeEndPromotion() {
    removeElementsByClass("ytp-ce-element");
}
