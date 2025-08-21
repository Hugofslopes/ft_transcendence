// Import the renderAuthModal function
import { renderAuthModal } from './services/render.js';

// Add click event listener to auth button
document.addEventListener('DOMContentLoaded', () => {
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', () => {
            renderAuthModal('login');
        });
    }
});

// Also add the event listener immediately in case DOM is already loaded
const authBtn = document.getElementById('auth-btn');
if (authBtn) {
    authBtn.addEventListener('click', () => {
        renderAuthModal('login');
    });
}
