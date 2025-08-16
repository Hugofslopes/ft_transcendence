// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up button listeners...');
    // Get buttons by their classes
    const playButton = document.querySelector('.btn-play');
    const settingsButton = document.querySelector('.btn-settings');
    // Add event listeners for console logging
    if (playButton) {
        playButton.addEventListener("click", () => {
            console.log("Play");
            // Here you can trigger your game start logic
        });
        console.log('Play button listener added');
    }
    else {
        console.log('Play button not found');
    }
    if (settingsButton) {
        settingsButton.addEventListener("click", () => {
            console.log("Settings");
            // Here you can trigger your settings logic
        });
        console.log('Settings button listener added');
    }
    else {
        console.log('Settings button not found');
    }
});
const appDiv = document.getElementById('app');
export {};
//playBtn.addEventListener('click', () => {
//  renderRegistrationForm(appDiv);
//});
