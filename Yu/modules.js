// Default button states
const defaultButtonStates = {
    "remove-paid-content": true,
    "remove-end-promotion": true,
    "remove-shorts": true,
    "remove-shorts-embeded": true,
    "remove-feed-bar": true,
    "remove-video-preview": true,
    "remove-search-voice": true,
    "remove-tabs-content": true,
    "sign": true
};

const buttonActions = {
    "remove-paid-content": removePaidContent,
    "remove-end-promotion": removeEndPromotion,
    "remove-shorts": removeShorts,
    "remove-shorts-embeded": removeShortEmbeded,
    "remove-feed-bar": removeFeedBar,
    "remove-video-preview": removeVideoPreview,
    "remove-search-voice": removeSearchVoice,
    "remove-tabs-content": removeTabsContent,
    "sign": sign
};

function saveButtonStates(states) {
    chrome.storage.sync.set({ 'buttonStates': states }, function() {
        console.log('Button states saved', states);
    });
}

function loadButtonStates(callback) {
    chrome.storage.sync.get(['buttonStates'], function(result) {
        const loadedStates = result.buttonStates || defaultButtonStates;
        callback(loadedStates);
    });
}

function initializeContentRemover() {
    loadButtonStates((buttonStates) => {
        const observer = setupObserver(buttonStates);
        Object.entries(buttonStates).forEach(([id, isActive]) => {
            if (isActive) {
                try {
                    buttonActions[id]();
                } catch (error) {
                    console.error(`Error in initial action ${id}: ${error}`);
                }
            }
        });

        setupButtonListeners(buttonStates);
    });
}

function setupButtonListeners(buttonStates) {
    // Listener for button state changes from popup
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
        if (message.type === 'toggleButtonState') {
            const { buttonId } = message;
            
            // Toggle the state
            buttonStates[buttonId] = !buttonStates[buttonId];
            
            // Save the updated states
            saveButtonStates(buttonStates);
            
            // Immediately run or stop the corresponding action
            if (buttonStates[buttonId]) {
                buttonActions[buttonId]();
            }
        }
    });
}

function setupObserver(buttonStates) {
    const observer = new MutationObserver((mutations) => {
        if (mutations.length > 0) {
            console.log(`Observed ${mutations.length} mutations`);
            
            // Run all active removal functions
            Object.entries(buttonStates).forEach(([id, isActive]) => {
                if (isActive) {
                    try {
                        buttonActions[id]();
                    } catch (error) {
                        console.error(`Error in action ${id}: ${error}`);
                    }
                }
            });
        }
    });

    // More robust target selection
    const targetNode = document.body || document.documentElement;
    
    const config = {
        childList: true,
        subtree: true,
        attributes: false,
        characterData: false
    };

    try {
        observer.observe(targetNode, config);
        console.log("Observer started successfully");
    } catch (error) {
        console.error("Failed to start observer:", error);
    }

    return observer;
}


// Utility functions remain the same as in the previous implementation
function removeElementsByClass(className) {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function removeElementsByTag(tagName) {
    const elements = document.getElementsByTagName(tagName);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function sign() {
    const redPath = document.querySelector('path[fill="#FF0033"]');
    if (redPath) {
        redPath.setAttribute('fill', '#3a0ca3');
    }
}

function removeVideoPreview() {
    removeElementsByTag("ytd-video-preview");
}

function removeTabsContent() {
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

function removeShorts() {
    removeElementsByClass("style-scope ytd-rich-section-renderer");
}

function removeShortEmbeded() {
    removeElementsByTag("ytd-reel-shelf-renderer");
}

function removeSearchVoice() {
    const voiceSearchButton = document.getElementById('voice-search-button');
    if (voiceSearchButton) {
        voiceSearchButton.remove();
    }
}

function removePaidContent() {
    removeElementsByTag("ytm-paid-content-overlay-renderer");
}

function removeFeedBar() {
    removeElementsByTag("ytd-feed-filter-chip-bar-renderer");
}

function removeEndPromotion() {
    removeElementsByClass("ytp-ce-element");
}

// Initialize as soon as possible
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeContentRemover);
} else {
    initializeContentRemover();
}