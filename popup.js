document.addEventListener('DOMContentLoaded', function() {
    const toggle = document.getElementById('aiToggle');

    chrome.storage.sync.get(['aiEnabled'], function(result) {
        toggle.checked = result.aiEnabled !== undefined ? result.aiEnabled : true;
    });

    toggle.addEventListener('change', function() {
        chrome.storage.sync.set({ aiEnabled: toggle.checked });
    });
});