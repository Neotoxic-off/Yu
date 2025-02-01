export function removeSearchVoice() {
    const voiceSearchButton = document.getElementById('voice-search-button');

    if (voiceSearchButton) {
        voiceSearchButton.remove();
    }
}
