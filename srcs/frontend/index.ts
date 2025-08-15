import { renderAuthModal, renderUserListModal, renderDeleteUserModal } from './render.js';

// Wait for DOM to be ready
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOM loaded, setting up button listeners...');
  
  // Get buttons by their classes
  const playButton = document.querySelector('.btn-play') as HTMLButtonElement;
  const settingsButton = document.querySelector('.btn-settings') as HTMLButtonElement;
  const listUsersButton = document.querySelector('.btn-list-users') as HTMLButtonElement;
  const deleteUserButton = document.querySelector('.btn-delete-user') as HTMLButtonElement;

  // Add event listeners for console logging
  if (playButton) {
    playButton.addEventListener("click", () => {
      console.log("Play");
      renderAuthModal();
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

  if (deleteUserButton) {
    deleteUserButton.addEventListener("click", () => {
      console.log("Delete User");
      renderDeleteUserModal();
    });
    console.log('Delete User button listener added');
  } else {
    console.log('Delete User button not found');
  }
});
