// Performance optimization utilities
// Author: Olavo Stauros
// Description: Font loading optimization, CSS performance, and general performance enhancements

class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    this.optimizeFontLoading();
    this.setupPreloadHints();
    this.optimizeImages();
    this.setupServiceWorker();
  }
  
  // Font loading optimization
  optimizeFontLoading() {
    // Use Font Loading API if available
    if ('fonts' in document) {
      // Preload critical fonts
      const fontFaces = [
        new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiA.woff2)', {
          weight: '400',
          style: 'normal',
          display: 'swap'
        }),
        new FontFace('Inter', 'url(https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuI6fAZ9hiA.woff2)', {
          weight: '600',
          style: 'normal',
          display: 'swap'
        })
      ];
      
      fontFaces.forEach(fontFace => {
        fontFace.load().then(loadedFont => {
          document.fonts.add(loadedFont);
        }).catch(error => {
          console.warn('Font loading failed:', error);
        });
      });
    }
    
    // Add font-display: swap to fallback fonts
    this.addFontDisplaySwap();
  }
  
  addFontDisplaySwap() {
    const styleSheets = Array.from(document.styleSheets);
    
    try {
      styleSheets.forEach(sheet => {
        if (sheet.href && sheet.href.includes('fonts.googleapis.com')) {
          // Add font-display: swap to Google Fonts
          const link = document.querySelector(`link[href="${sheet.href}"]`);
          if (link && !link.href.includes('display=swap')) {
            link.href = link.href + (link.href.includes('?') ? '&' : '?') + 'display=swap';
          }
        }
      });
    } catch (error) {
      // CORS restrictions may prevent access to external stylesheets
      console.warn('Could not modify external stylesheets:', error);
    }
  }
  
  // Setup resource hints for better performance
  setupPreloadHints() {
    // Preload critical CSS
    const criticalCSS = document.querySelector('link[href="/styles/styles.css"]');
    if (criticalCSS) {
      criticalCSS.setAttribute('rel', 'preload');
      criticalCSS.setAttribute('as', 'style');
      criticalCSS.setAttribute('onload', "this.onload=null;this.rel='stylesheet'");
    }
    
    // Preconnect to external domains
    const preconnectDomains = [
      'https://fonts.googleapis.com',
      'https://fonts.gstatic.com'
    ];
    
    preconnectDomains.forEach(domain => {
      if (!document.querySelector(`link[href="${domain}"]`)) {
        const link = document.createElement('link');
        link.rel = 'preconnect';
        link.href = domain;
        if (domain.includes('gstatic')) {
          link.crossOrigin = 'anonymous';
        }
        document.head.appendChild(link);
      }
    });
  }
  
  // Image optimization
  optimizeImages() {
    // Add WebP support detection and fallback
    this.detectWebPSupport().then(supportsWebP => {
      if (supportsWebP) {
        document.documentElement.classList.add('webp-support');
      } else {
        document.documentElement.classList.add('no-webp-support');
      }
    });
    
    // Optimize image loading with Intersection Observer
    this.setupImageOptimization();
  }
  
  detectWebPSupport() {
    return new Promise(resolve => {
      const webP = new Image();
      webP.onload = webP.onerror = () => {
        resolve(webP.height === 2);
      };
      webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
    });
  }
  
  setupImageOptimization() {
    // Add loading indicators and error handling for images
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
      // Add loading state
      img.addEventListener('loadstart', () => {
        img.classList.add('image-loading');
      });
      
      // Remove loading state when loaded
      img.addEventListener('load', () => {
        img.classList.remove('image-loading');
        img.classList.add('image-loaded');
      });
      
      // Handle loading errors
      img.addEventListener('error', () => {
        img.classList.remove('image-loading');
        img.classList.add('image-error');
        console.warn('Failed to load image:', img.src);
      });
    });
  }
  
  // Service Worker setup for caching
  setupServiceWorker() {
    if ('serviceWorker' in navigator && 'caches' in window) {
      window.addEventListener('load', () => {
        // Create a simple service worker for caching static assets
        this.createInlineServiceWorker();
      });
    }
  }
  
  createInlineServiceWorker() {
    const swCode = `
      const CACHE_NAME = 'olavostauros-v1';
      const urlsToCache = [
        '/',
        '/styles/styles.css',
        '/scripts/navigation.js',
        '/scripts/utils.js',
        '/favicon.svg',
        '/profile-placeholder.svg',
        '/project-1.svg',
        '/project-2.svg',
        '/project-3.svg'
      ];
      
      self.addEventListener('install', event => {
        event.waitUntil(
          caches.open(CACHE_NAME)
            .then(cache => cache.addAll(urlsToCache))
        );
      });
      
      self.addEventListener('fetch', event => {
        event.respondWith(
          caches.match(event.request)
            .then(response => {
              if (response) {
                return response;
              }
              return fetch(event.request);
            })
        );
      });
    `;
    
    const blob = new Blob([swCode], { type: 'application/javascript' });
    const swUrl = URL.createObjectURL(blob);
    
    navigator.serviceWorker.register(swUrl)
      .then(registration => {
        console.log('Service Worker registered successfully:', registration);
      })
      .catch(error => {
        console.warn('Service Worker registration failed:', error);
      });
  }
  
  // CSS optimization utilities
  removeUnusedCSS() {
    // This would typically be done at build time, but we can provide a simple runtime version
    const usedSelectors = new Set();
    
    // Collect all classes and IDs used in the HTML
    document.querySelectorAll('[class]').forEach(el => {
      el.classList.forEach(className => usedSelectors.add(`.${className}`));
    });
    
    document.querySelectorAll('[id]').forEach(el => {
      usedSelectors.add(`#${el.id}`);
    });
    
    // Log unused selectors for development
    if (window.location.hostname === 'localhost') {
      console.log('Used selectors:', Array.from(usedSelectors));
    }
  }
  
  // Performance monitoring
  measurePerformance() {
    if ('performance' in window) {
      window.addEventListener('load', () => {
        setTimeout(() => {
          const perfData = performance.getEntriesByType('navigation')[0];
          console.log('Performance metrics:', {
            DOMContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
            LoadComplete: perfData.loadEventEnd - perfData.loadEventStart,
            TotalTime: perfData.loadEventEnd - perfData.fetchStart
          });
        }, 0);
      });
    }
  }
}

// Initialize performance optimizer when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new PerformanceOptimizer();
  });
} else {
  new PerformanceOptimizer();
}

// Export for potential use in other scripts
window.PerformanceOptimizer = PerformanceOptimizer;
