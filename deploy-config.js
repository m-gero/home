// DEVGERO Deployment Configuration
// Handles API endpoints for different environments

const DEPLOYMENT_CONFIG = {
    // GitHub Pages URL (update with your username/repo)
    GITHUB_PAGES_URL: 'https://DEVGERO.github.io/devgero-estudos',
    
    // Vercel API URL (will be generated after Vercel deployment)
    VERCEL_API_URL: 'https://devgero-estudos.vercel.app',
    
    // Development URLs
    DEV_URL: 'http://localhost:8000',
    DEV_API_URL: 'http://localhost:3000',
    
    // Current environment detection
    getCurrentEnvironment() {
        const hostname = window.location.hostname;
        
        if (hostname === 'localhost' || hostname === '127.0.0.1') {
            return 'development';
        } else if (hostname.includes('github.io')) {
            return 'github-pages';
        } else if (hostname.includes('vercel.app')) {
            return 'vercel';
        } else {
            return 'production';
        }
    },
    
    // Get API base URL based on environment
    getApiBaseUrl() {
        const env = this.getCurrentEnvironment();
        
        switch (env) {
            case 'development':
                return this.DEV_API_URL;
            case 'github-pages':
                return this.VERCEL_API_URL;
            case 'vercel':
                return window.location.origin;
            default:
                return this.VERCEL_API_URL;
        }
    },
    
    // Get site base URL
    getSiteBaseUrl() {
        const env = this.getCurrentEnvironment();
        
        switch (env) {
            case 'development':
                return this.DEV_URL;
            case 'github-pages':
                return this.GITHUB_PAGES_URL;
            default:
                return window.location.origin;
        }
    }
};

// Export for use in other scripts
window.DEPLOYMENT_CONFIG = DEPLOYMENT_CONFIG;
