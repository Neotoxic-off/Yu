export function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

export function removeElementsByTag(tagName) {
    const elements = document.getElementsByTagName(tagName);
    while (elements.length > 0) {
      elements[0].parentNode.removeChild(elements[0]);
    }
}
