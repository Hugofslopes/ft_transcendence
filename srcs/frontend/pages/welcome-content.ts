// Welcome page content in TypeScript
export interface WelcomePageContent {
  getHTML(): string;
  init(): void;
}

export const WelcomePageTS: WelcomePageContent = {
  getHTML(): string {
    return `
      <div class="loading-welcome fixed inset-0 bg-black flex items-center justify-center z-50">
        <div class="text-center">
          <div class="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p class="text-white font-montserrat text-lg">Loading...</p>
        </div>
      </div>

      <div class="welcome-content hidden w-screen h-screen bg-cover bg-center bg-no-repeat flex items-center justify-center" style="background-image: url('../assets/background.png');">
        <div class="text-center text-white font-montserrat">
          <h1 class="text-6xl font-bold mb-6 glow">Welcome to PONG</h1>
          <p class="text-xl mb-8 opacity-70">The classic game reimagined</p>
          <div class="space-y-4">
            <p class="text-lg">Get ready for an epic gaming experience</p>
            <button class="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded font-montserrat transition-colors" onclick="router.navigate('home')">Enter Game</button>
          </div>
        </div>
      </div>
    `;
  },

  init(): void {
    // Show loading, then reveal content after 2 seconds
    setTimeout(() => {
      const loadingDiv = document.querySelector('.loading-welcome') as HTMLElement;
      const welcomeContent = document.querySelector('.welcome-content') as HTMLElement;
      
      if (loadingDiv && welcomeContent) {
        loadingDiv.style.display = 'none';
        welcomeContent.classList.remove('hidden');
      }
    }, 2000);
  }
};
