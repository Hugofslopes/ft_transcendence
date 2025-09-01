// Import the renderAuthModal function
import { renderAuthModal } from './services/render.js';

console.log("Loading all buttons");

// Authentication state management
class AuthManager {
    private static readonly TOKEN_KEY = 'auth_token';
    private static readonly USER_ID_KEY = 'user_id';
    
    // Store authentication data
    static setAuthData(token: string, userId: string) {
        localStorage.setItem(this.TOKEN_KEY, token);
        localStorage.setItem(this.USER_ID_KEY, userId);
    }
    
    // Get stored token
    static getToken(): string | null {
        return localStorage.getItem(this.TOKEN_KEY);
    }
    
    // Get stored user ID
    static getUserId(): string | null {
        return localStorage.getItem(this.USER_ID_KEY);
    }
    
    // Check if user is logged in
    static isLoggedIn(): boolean {
        return this.getToken() !== null && this.getUserId() !== null;
    }
    
    // Clear authentication data (logout)
    static clearAuth() {
        localStorage.removeItem(this.TOKEN_KEY);
        localStorage.removeItem(this.USER_ID_KEY);
    }
    
    // Get authorization header for API requests
    static getAuthHeader(): Record<string, string> {
        const token = this.getToken();
        return token ? { 'Authorization': `Bearer ${token}` } : {};
    }
}

// Function to initialize auth button
function initAuthButton() {
    console.log("Authentication Starting");
    const authBtn = document.getElementById('auth-btn');
    if (authBtn) {
        authBtn.addEventListener('click', (event) => {
            try {
                console.log("renderAuthModal function:", typeof renderAuthModal);
                if (typeof renderAuthModal === 'function') {
                    // Check if already logged in
                    if (AuthManager.isLoggedIn()) {
                        console.log("User already logged in, user ID:", AuthManager.getUserId());
                        // Could show profile or different modal
                        return ;
                    }
                    renderAuthModal('login');
                } else {
                    console.error("renderAuthModal is not a function:", renderAuthModal);
                }
            } catch (error) {
                console.error("Error calling renderAuthModal:", error);
            }
        });
    } else {
        console.log("Authentication Button Not Found");
    }
}

function initPlayButton() {
    console.log("Play Button Initialized");
    const playBtn = document.getElementById('play-btn');
    if (playBtn) {
        playBtn.addEventListener('click', (event) => {
            console.log("Play button clicked");
        });
    } else {
        console.log("Play Button Not Found");
    }
}

// Check if DOM is already loaded or wait for it
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAuthButton);
} else {
    // DOM is already loaded, run immediately
    initAuthButton();
    initPlayButton();
}

// Export AuthManager for use in other modules
export { AuthManager };
