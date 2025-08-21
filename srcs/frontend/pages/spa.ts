// Simple SPA in TypeScript
class SimpleSPA {
    private contentContainer: HTMLElement | null;
    private loadingScreen: HTMLElement | null;

    constructor() {
        this.contentContainer = document.getElementById('content');
        this.loadingScreen = document.getElementById('loading');
        this.init();
    }

    private init(): void {
        // Simulate loading time
        setTimeout(() => {
            this.loadPongPage();
        }, 2000);
    }

    private async loadPongPage(): Promise<void> {
        try {
            // Fetch the pong.html content
            const response = await fetch('./pong.html');
            if (!response.ok) {
                throw new Error('Failed to load pong.html');
            }
            
            const html = await response.text();
            
            // Extract just the body content
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const bodyContent = doc.body.innerHTML;
            
            // Hide loading and show content
            if (this.loadingScreen) {
                this.loadingScreen.classList.add('hidden');
            }
            
            if (this.contentContainer) {
                this.contentContainer.innerHTML = bodyContent;
                this.contentContainer.classList.remove('hidden');
            }
            
        } catch (error) {
            console.error('Failed to load pong page:', error);
            this.showFallback();
        }
    }

    private showFallback(): void {
        // Hide loading and show fallback
        if (this.loadingScreen) {
            this.loadingScreen.classList.add('hidden');
        }
        
        if (this.contentContainer) {
            this.contentContainer.innerHTML = `
                <div class="w-screen h-screen flex items-center justify-center">
                    <h1 class="text-white font-montserrat font-bold text-6xl text-center">PONG</h1>
                </div>
            `;
            this.contentContainer.classList.remove('hidden');
        }
    }
}

// Initialize the SPA when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new SimpleSPA();
});
