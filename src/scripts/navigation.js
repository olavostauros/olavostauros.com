// Navigation JavaScript for smooth scrolling and interactive features
// Author: Olavo Stauros
// Description: Handles smooth scrolling navigation, active section highlighting, and mobile menu toggle

class Navigation {
  constructor() {
    this.navbar = document.querySelector('header');
    this.navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    this.sections = document.querySelectorAll('section[id]');
    this.mobileMenuToggle = document.getElementById('nav-toggle');
    
    this.init();
  }

  init() {
    this.setupSmoothScrolling();
    this.setupActiveNavigation();
    this.setupScrollEffects();
    this.setupMobileMenu();
  }

  // Smooth scrolling for navigation links
  setupSmoothScrolling() {
    this.navLinks.forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const targetId = anchor.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
          const headerHeight = this.navbar.offsetHeight;
          const targetPosition = targetSection.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });

          // Close mobile menu if open
          if (this.mobileMenuToggle && this.mobileMenuToggle.checked) {
            this.mobileMenuToggle.checked = false;
          }
        }
      });
    });
  }

  // Active section highlighting in navigation
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

  // Mobile menu functionality
  setupMobileMenu() {
    if (this.mobileMenuToggle) {
      // Close menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!e.target.closest('nav') && this.mobileMenuToggle.checked) {
          this.mobileMenuToggle.checked = false;
        }
      });

      // Close menu on escape key
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && this.mobileMenuToggle.checked) {
          this.mobileMenuToggle.checked = false;
        }
      });
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
