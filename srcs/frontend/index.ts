import { renderAuthModal, renderUserListModal, renderDeleteUserModal } from './render.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, setting up button listeners...');
  
  // Get buttons by their classes
  const playButton = document.querySelector('.gris-btn-top') as HTMLButtonElement;
  const settingsButton = document.querySelector('.gris-btn-bottom') as HTMLButtonElement;
  const listUsersButton = document.querySelector('.gris-btn-list') as HTMLButtonElement;
  // const deleteUserButton = document.querySelector('.btn-delete-user') as HTMLButtonElement;

  // Add event listeners for console logging
  if (playButton) {
    playButton.addEventListener("click", () => {
      console.log("Play");
      renderAuthModal('login');
    });
    console.log('Play button listener added');
  } else {
    console.log('Play button not found');
  }

  if (settingsButton) {
    settingsButton.addEventListener("click", () => {
      console.log("Settings");
      // Here you can trigger your settings logic
    });
    console.log('Settings button listener added');
  } else {
    console.log('Settings button not found');
  }

  if (listUsersButton) {
    listUsersButton.addEventListener("click", () => {
      console.log("List Users");
      renderUserListModal();
    });
    console.log('List Users button listener added');
  } else {
    console.log('List Users button not found');
  }


});
