// Navigation JavaScript for smooth scrolling and interactive features
// Author: Olavo Stauros
// Description: Handles smooth scrolling navigation, active section highlighting, mobile menu toggle, and accessibility

class Navigation {
  constructor() {
    this.navbar = document.querySelector('header');
    this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    this.sections = document.querySelectorAll('section[id]');
    this.mobileMenuToggle = document.getElementById('nav-toggle');
    this.navLinksContainer = document.getElementById('nav-links');
    
    // Performance optimization: debounce scroll events
    this.debounceTimer = null;
    this.scrollThreshold = 50;
    this.lastKnownScrollPosition = 0;
    this.ticking = false;
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupScrollEffects();
    this.setupMobileMenu();
    this.setupAccessibility();
    this.setupImageLazyLoading();
    this.setupAnimationObserver();
  }

  // Enhanced smooth scrolling with accessibility considerations
  setupSmoothScrolling() {
    this.navLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = this.navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          // Check for reduced motion preference
          const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          
          window.scrollTo({
            top: targetPosition,
            behavior: prefersReducedMotion ? 'auto' : 'smooth'
          });

          // Set focus to target section for screen readers
          targetSection.setAttribute('tabindex', '-1');
          targetSection.focus();
          
          // Remove tabindex after focus to prevent confusion
          setTimeout(() => {
            targetSection.removeAttribute('tabindex');
          }, 1000);

          // Close mobile menu if open
          this.closeMobileMenu();
          
          // Announce navigation to screen readers
          this.announceNavigation(targetSection);
        }
      });
    });
  }

  // Enhanced active section highlighting with performance optimization
  setupActiveNavigation() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.updateActiveNavLink(id);
        }
      });
    }, {
      threshold: 0.3,
      rootMargin: '-100px 0px -50% 0px'
    });

    this.sections.forEach(section => {
      observer.observe(section);
    });
  }

  // Update active navigation link
  updateActiveNavLink(activeId) {
    this.navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${activeId}`) {
        link.classList.add('active');
      }
    });
  }

  // Scroll effects for navbar
  setupScrollEffects() {
    let lastScrollY = window.scrollY;
    
    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;
      
      // Add background to navbar on scroll
      if (currentScrollY > 50) {
        this.navbar.classList.add('scrolled');
      } else {
        this.navbar.classList.remove('scrolled');
      }
      
      // Hide/show navbar on scroll direction
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        this.navbar.classList.add('hidden');
      } else {
        this.navbar.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
    });
  }

  // Mobile menu accessibility and functionality
  setupMobileMenu() {
    if (!this.mobileMenuToggle || !this.navLinksContainer) return;
    
    this.mobileMenuToggle.addEventListener('click', () => {
      const isExpanded = this.mobileMenuToggle.getAttribute('aria-expanded') === 'true';
      
      // Toggle aria-expanded
      this.mobileMenuToggle.setAttribute('aria-expanded', !isExpanded);
      
      // Toggle menu visibility
      this.navLinksContainer.classList.toggle('active');
      
      // Trap focus when menu is open
      if (!isExpanded) {
        this.trapFocus(this.navLinksContainer);
      } else {
        this.releaseFocus();
      }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.navLinksContainer.classList.contains('active')) {
        this.closeMobileMenu();
        this.mobileMenuToggle.focus();
      }
    });
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
      if (!this.navbar.contains(e.target) && this.navLinksContainer.classList.contains('active')) {
        this.closeMobileMenu();
      }
    });
  }
  
  closeMobileMenu() {
    if (this.mobileMenuToggle && this.navLinksContainer) {
      this.mobileMenuToggle.setAttribute('aria-expanded', 'false');
      this.navLinksContainer.classList.remove('active');
      this.releaseFocus();
    }
  }
  
  // Accessibility enhancements
  setupAccessibility() {
    // Add skip link functionality
    const skipLink = document.querySelector('.skip-link');
    if (skipLink) {
      skipLink.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.getElementById('main-content');
        if (target) {
          target.setAttribute('tabindex', '-1');
          target.focus();
          setTimeout(() => target.removeAttribute('tabindex'), 1000);
        }
      });
    }
    
    // Announce page changes to screen readers
    this.createLiveRegion();
  }
  
  // Image lazy loading optimization
  setupImageLazyLoading() {
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.classList.add('loaded');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for browsers without IntersectionObserver
      images.forEach(img => img.classList.add('loaded'));
    }
  }
  
  // Animation observer for performance
  setupAnimationObserver() {
    const animatedElements = document.querySelectorAll('.project-card, .about-content, .skills-grid');
    
    if ('IntersectionObserver' in window) {
      const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
            animationObserver.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
      });
      
      animatedElements.forEach(el => animationObserver.observe(el));
    } else {
      // Fallback: add animation class immediately
      animatedElements.forEach(el => el.classList.add('animate-in'));
    }
  }
  
  // Focus management utilities
  trapFocus(container) {
    const focusableElements = container.querySelectorAll(
      'a, button, [tabindex]:not([tabindex="-1"])'
    );
    
    if (focusableElements.length === 0) return;
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    this.focusTrapHandler = (e) => {
      if (e.key === 'Tab') {
        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };
    
    document.addEventListener('keydown', this.focusTrapHandler);
    firstElement.focus();
  }
  
  releaseFocus() {
    if (this.focusTrapHandler) {
      document.removeEventListener('keydown', this.focusTrapHandler);
      this.focusTrapHandler = null;
    }
  }
  
  // Create live region for screen reader announcements
  createLiveRegion() {
    const liveRegion = document.createElement('div');
    liveRegion.setAttribute('aria-live', 'polite');
    liveRegion.setAttribute('aria-atomic', 'true');
    liveRegion.className = 'sr-only';
    liveRegion.id = 'live-region';
    document.body.appendChild(liveRegion);
  }
  
  // Announce navigation changes
  announceNavigation(section) {
    const liveRegion = document.getElementById('live-region');
    if (liveRegion) {
      const sectionTitle = section.querySelector('h1, h2')?.textContent || section.id;
      liveRegion.textContent = `Navigated to ${sectionTitle} section`;
      
      // Clear announcement after 1 second
      setTimeout(() => {
        liveRegion.textContent = '';
      }, 1000);
    }
  }
  
  // Performance optimized scroll handling
  handleScroll() {
    this.lastKnownScrollPosition = window.scrollY;
    
    if (!this.ticking) {
      requestAnimationFrame(() => {
        this.updateScrollEffects(this.lastKnownScrollPosition);
        this.ticking = false;
      });
      this.ticking = true;
    }
  }
  
  updateScrollEffects(scrollPos) {
    // Show/hide navbar based on scroll direction
    if (scrollPos > this.scrollThreshold) {
      this.navbar.classList.add('scrolled');
    } else {
      this.navbar.classList.remove('scrolled');
    }
  }
}

// Scroll-triggered animations for project cards and sections
class ScrollAnimations {
  constructor() {
    this.animatedElements = document.querySelectorAll('.project-card, .about-content, .skills-grid');
    this.init();
  }

  init() {
    this.setupScrollAnimations();
  }

  setupScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    this.animatedElements.forEach(element => {
      observer.observe(element);
    });
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Navigation();
  new ScrollAnimations();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { Navigation, ScrollAnimations };
}
