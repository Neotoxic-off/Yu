document.addEventListener('DOMContentLoaded', function() {
    // Load and apply saved button states
    chrome.storage.sync.get(['buttonStates'], function(result) {
        const buttonStates = result.buttonStates || {};
        
        // Apply saved states to buttons
        Object.keys(buttonStates).forEach(id => {
            const button = document.getElementById(id);
            if (button) {
                updateButtonState(button, buttonStates[id]);
            }
        });
    });

    // Add click listeners to buttons
    document.querySelectorAll('.toggle-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonId = this.id;
            
            // Toggle button state in storage
            chrome.storage.sync.get(['buttonStates'], function(result) {
                const buttonStates = result.buttonStates || {};
                
                // Toggle the state
                buttonStates[buttonId] = !buttonStates[buttonId];
                
                // Save updated states
                chrome.storage.sync.set({ 'buttonStates': buttonStates }, function() {
                    // Update local button state
                    const button = document.getElementById(buttonId);
                    updateButtonState(button, buttonStates[buttonId]);
                    
                    // Send message to content script to toggle state
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
                        chrome.tabs.sendMessage(tabs[0].id, {
                            type: 'toggleButtonState',
                            buttonId: buttonId
                        });
                    });
                });
            });
        });
    });
});

// Helper function to update button visual state
function updateButtonState(button, isActive) {
    if (button) {
        button.classList.toggle("active", isActive);
        button.classList.toggle("inactive", !isActive);
        
        // Update the state text
        const stateElement = button.querySelector('.button-state');
        if (stateElement) {
            stateElement.textContent = isActive ? 'ON' : 'OFF';
        }
    }
}
