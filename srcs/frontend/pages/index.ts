import { renderAuthModal, renderUserListModal, renderDeleteUserModal } from './services/render.js';
import { renderSettingsPage } from './services/settings.js';
import { renderTournamentsPage } from './services/tournaments.js';
import { renderTeamsPage } from './services/teams.js';

const playBtn = document.getElementById('play-btn') as HTMLButtonElement;
const loginBtn = document.getElementById('login-btn') as HTMLButtonElement;
const settingsBtn = document.getElementById('settings-btn') as HTMLButtonElement;
const tournamentsBtn = document.getElementById('tournaments-btn') as HTMLButtonElement;
const logoutBtn = document.getElementById('logout-btn') as HTMLButtonElement;

console.log('Setting up button event listeners...');

// Check if user is logged in
function isUserLoggedIn(): boolean {
  const userData = localStorage.getItem('currentUser');
  return userData !== null;
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      return JSON.parse(userData);
    } catch (err) {
      console.error('Error parsing user data:', err);
      localStorage.removeItem('currentUser');
      return null;
    }
  }
  return null;
}

// Show/hide buttons based on login state
function updateButtonVisibility() {
  const loginBtn = document.getElementById('login-btn');
  const logoutBtn = document.getElementById('logout-btn');
  
  if (isUserLoggedIn()) {
    // User is logged in - show logout, hide login
    if (loginBtn) loginBtn.style.display = 'none';
    if (logoutBtn) logoutBtn.style.display = 'block';
  } else {
    // User is not logged in - show login, hide logout
    if (loginBtn) loginBtn.style.display = 'block';
    if (logoutBtn) logoutBtn.style.display = 'none';
  }
}
// Check if user is already logged in and restore their name
function restoreUserSession() {
  const userData = localStorage.getItem('currentUser');
  if (userData) {
    try {
      const user = JSON.parse(userData);
      const centerText = document.getElementById('center-text');
      if (centerText && user.name) {
        centerText.textContent = user.name.toUpperCase();
        console.log(`Restored session for user: ${user.name}`);
      }
    } catch (err) {
      console.error('Error restoring user session:', err);
      localStorage.removeItem('currentUser'); // Clear invalid data
    }
  }
  updateButtonVisibility();
}

// Show logout button
function showLogoutButton() {
  console.log('showLogoutButton called');
  const logoutBtn = document.getElementById('logout-btn');
  console.log('logoutBtn element:', logoutBtn);
  if (logoutBtn) {
    logoutBtn.style.display = 'block';
    console.log('Logout button should now be visible');
  } else {
    console.error('Logout button not found in DOM');
  }
}

// Hide logout button
function hideLogoutButton() {
  console.log('hideLogoutButton called');
  const logoutBtn = document.getElementById('logout-btn');
  if (logoutBtn) {
    logoutBtn.style.display = 'none';
    console.log('Logout button hidden');
  }
}

// Logout function
function logout() {
  // Clear user data
  localStorage.removeItem('currentUser');
  
  // Reset center text to PONG
  const centerText = document.getElementById('center-text');
  if (centerText) {
    centerText.textContent = 'PONG';
  }
  
  // Update button visibility
  updateButtonVisibility();
  
  console.log('User logged out');
}

// Restore user session on page load
restoreUserSession();

if (playBtn) {
  console.log('playBtn found');
  playBtn.addEventListener('click', () => {
    if (isUserLoggedIn()) {
      const user = getCurrentUser();
      console.log(`User ${user.name} is logged in and ready to play!`);
      // Here you can add game logic or navigate to game page
      console.log('Starting game for logged in user...');
    } else {
      console.log('User not logged in - opening registration form');
      renderAuthModal('register'); // Open with register tab for new players
    }
  });
}

if (loginBtn) {
  console.log('loginBtn found');
  loginBtn.addEventListener('click', () => {
    console.log('Login button clicked - opening auth modal');
    renderAuthModal('login'); // Open with login tab active
  });
}

if (settingsBtn) {
  console.log('settingsBtn found');
  settingsBtn.addEventListener('click', () => {
    console.log('Settings button clicked - opening user list modal');
    renderUserListModal(); // Show all users
  });
}

if (tournamentsBtn) {
  console.log('tournamentsBtn found');
  tournamentsBtn.addEventListener('click', () => {
    console.log('Tournaments button clicked - opening auth modal');
    renderAuthModal('login'); // Open with login tab active for tournaments/settings
  });
}

if (logoutBtn) {
  console.log('logoutBtn found');
  logoutBtn.addEventListener('click', () => {
    console.log('Logout button clicked');
    logout();
  });
}