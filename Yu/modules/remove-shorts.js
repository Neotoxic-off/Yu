import { removeElementsByClass, removeElementsByTag } from './utils.js';

export function removeShorts() {
    removeElementsByClass("style-scope ytd-rich-section-renderer");
}

export function removeShortEmbeded() {
    removeElementsByTag("ytd-reel-shelf-renderer");
}