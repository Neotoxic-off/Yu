import { removeShorts, removeShortEmbeded } from './modules/remove-shorts.js';
import { removePaidContent } from './modules/remove-paid-content.js';
import { removeEndPromotion } from './modules/remove-end-promotion.js';
import { removeFeedBar } from './modules/remove-feed-bar.js'
import { removeVideoPreview } from './modules/remove-video-preview.js'
import { replaceSearchPlaceholder } from './modules/replace-search-placeholder.js'

const observer = new MutationObserver(() => {
    removePaidContent();
    removeEndPromotion();
    removeShorts();
    removeShortEmbeded();
    removeFeedBar();
    removeVideoPreview();
    replaceSearchPlaceholder();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
