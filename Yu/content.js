import { removeShorts, removeShortEmbeded } from './modules/remove-shorts.js';
import { removePaidContent } from './modules/remove-paid-content.js';
import { removeEndPromotion } from './modules/remove-end-promotion.js';
import { removeFeedBar } from './modules/remove-feed-bar.js'
import { removeVideoPreview } from './modules/remove-video-preview.js'
import { sign } from './modules/sign.js'
import { removeSearchVoice } from './modules/remove-search-voice.js'

const observer = new MutationObserver(() => {
    removePaidContent();
    removeEndPromotion();
    removeShorts();
    removeShortEmbeded();
    removeFeedBar();
    removeVideoPreview();
    sign();
    removeSearchVoice();
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});
