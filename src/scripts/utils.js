// Utility functions for the website
// Author: Olavo Stauros
// Description: Helper functions for DOM manipulation, animations, and common tasks

/**
 * Utility functions for DOM manipulation and common tasks
 */
const Utils = {
  /**
   * Debounce function to limit the rate of function execution
   * @param {Function} func - Function to debounce
   * @param {number} wait - Wait time in milliseconds
   * @param {boolean} immediate - Execute immediately on first call
   * @returns {Function} Debounced function
   */
  debounce(func, wait, immediate = false) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        timeout = null;
        if (!immediate) func(...args);
      };
      const callNow = immediate && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
      if (callNow) func(...args);
    };
  },

  /**
   * Throttle function to limit function execution frequency
   * @param {Function} func - Function to throttle
   * @param {number} limit - Time limit in milliseconds
   * @returns {Function} Throttled function
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  },

  /**
   * Get element offset from top of document
   * @param {Element} element - DOM element
   * @returns {number} Offset from top
   */
  getOffsetTop(element) {
    let offsetTop = 0;
    while (element) {
      offsetTop += element.offsetTop;
      element = element.offsetParent;
    }
    return offsetTop;
  },

  /**
   * Check if element is in viewport
   * @param {Element} element - DOM element to check
   * @param {number} threshold - Percentage of element that should be visible (0-1)
   * @returns {boolean} Whether element is in viewport
   */
  isInViewport(element, threshold = 0.1) {
    const rect = element.getBoundingClientRect();
    const elementHeight = rect.bottom - rect.top;
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    
    return (visibleHeight / elementHeight) >= threshold;
  },

  /**
   * Smooth scroll to element
   * @param {Element|string} target - Element or selector to scroll to
   * @param {number} offset - Offset from target position
   * @param {number} duration - Animation duration in milliseconds
   */
  smoothScrollTo(target, offset = 0, duration = 800) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;

    const targetPosition = this.getOffsetTop(element) - offset;
    const startPosition = window.pageYOffset;
    const distance = targetPosition - startPosition;
    let startTime = null;

    const animation = (currentTime) => {
      if (startTime === null) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const run = this.easeInOutQuad(timeElapsed, startPosition, distance, duration);
      window.scrollTo(0, run);
      if (timeElapsed < duration) requestAnimationFrame(animation);
    };

    requestAnimationFrame(animation);
  },

  /**
   * Easing function for smooth animations
   * @param {number} t - Current time
   * @param {number} b - Start value
   * @param {number} c - Change in value
   * @param {number} d - Duration
   * @returns {number} Eased value
   */
  easeInOutQuad(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  },

  /**
   * Add class with animation delay
   * @param {NodeList|Array} elements - Elements to animate
   * @param {string} className - Class to add
   * @param {number} delay - Delay between each element animation
   */
  staggerAnimation(elements, className, delay = 100) {
    elements.forEach((element, index) => {
      setTimeout(() => {
        element.classList.add(className);
      }, index * delay);
    });
  },

  /**
   * Create and dispatch custom event
   * @param {string} eventName - Name of the event
   * @param {any} detail - Event detail data
   * @param {Element} target - Target element (defaults to document)
   */
  dispatchCustomEvent(eventName, detail = null, target = document) {
    const event = new CustomEvent(eventName, {
      detail,
      bubbles: true,
      cancelable: true
    });
    target.dispatchEvent(event);
  },

  /**
   * Get current breakpoint based on CSS media queries
   * @returns {string} Current breakpoint name
   */
  getCurrentBreakpoint() {
    const width = window.innerWidth;
    if (width >= 1200) return 'xl';
    if (width >= 992) return 'lg';
    if (width >= 768) return 'md';
    if (width >= 576) return 'sm';
    return 'xs';
  },

  /**
   * Preload images for better performance
   * @param {Array} imageSources - Array of image URLs
   * @returns {Promise} Promise that resolves when all images are loaded
   */
  preloadImages(imageSources) {
    const promises = imageSources.map(src => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.onload = resolve;
        img.onerror = reject;
        img.src = src;
      });
    });
    return Promise.all(promises);
  }
};

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = Utils;
}

// Make available globally
window.Utils = Utils;
