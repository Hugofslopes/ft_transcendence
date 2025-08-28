// Import the renderAuthModal function
import { renderAuthModal } from './services/render.js';
console.log("Loading all buttons");
// Function to initialize auth button
function initAuthButton() {
    console.log("Authentication Starting");
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', (event) => {
            try {
                console.log("renderAuthModal function:", typeof renderAuthModal);
                if (typeof renderAuthModal === 'function') {
                    renderAuthModal('login');
                }
                else {
                    console.error("renderAuthModal is not a function:", renderAuthModal);
                }
            }
            catch (error) {
                console.error("Error calling renderAuthModal:", error);
            }
        });
    }
    else {
        console.log("Authentication Button Not Found");
    }
}
// Check if DOM is already loaded or wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthButton);
}
else {
    // DOM is already loaded, run immediately
    initAuthButton();
}
