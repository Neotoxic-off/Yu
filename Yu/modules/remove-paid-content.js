import { removeElementsByTag } from './utils.js';

export function removePaidContent() {
    removeElementsByTag("ytm-paid-content-overlay-renderer");
}
