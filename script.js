/**
 * VISTA - Advanced Travel Website JavaScript
 * Modern JavaScript Concepts: Modules, Classes, Async/Await, Observers
 */

// ============================================
// IIFE to avoid global scope pollution
// ============================================
(function() {
    'use strict';

    // ============================================
    // Utility Functions
    // ============================================
    const Utils = {
        // Debounce function for performance
        debounce: (func, wait) => {
            let timeout;
            return function executedFunction(...args) {
                const later = () => {
                    clearTimeout(timeout);
                    func(...args);
                };
                clearTimeout(timeout);
                timeout = setTimeout(later, wait);
            };
        },

        // Throttle function for scroll events
        throttle: (func, limit) => {
            let inThrottle;
            return function(...args) {
                if (!inThrottle) {
                    func.apply(this, args);
                    inThrottle = true;
                    setTimeout(() => inThrottle = false, limit);
                }
            };
        },

        // Check if element is in viewport
        isInViewport: (element) => {
            const rect = element.getBoundingClientRect();
            return (
                rect.top >= 0 &&
                rect.left >= 0 &&
                rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
                rect.right <= (window.innerWidth || document.documentElement.clientWidth)
            );
        },

        // Smooth scroll to element
        scrollTo: (element, offset = 80) => {
            const elementPosition = element.getBoundingClientRect().top + window.pageYOffset;
            window.scrollTo({
                top: elementPosition - offset,
                behavior: 'smooth'
            });
        },

        // Generate random ID
        generateId: () => {
            return Math.random().toString(36).substr(2, 9);
        }
    };

    // ============================================
    // Loader Class
    // ============================================
    class Loader {
        constructor() {
            this.loader = document.getElementById('loader');
            this.init();
        }

        init() {
            window.addEventListener('load', () => {
                setTimeout(() => {
                    this.hide();
                }, 1500);
            });
        }

        hide() {
            this.loader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }
    }

    // ============================================
    // Navigation Class
    // ============================================
    class Navigation {
        constructor() {
            this.navbar = document.getElementById('navbar');
            this.hamburger = document.getElementById('hamburger');
            this.navMenu = document.getElementById('navMenu');
            this.navLinks = document.querySelectorAll('.nav-link[data-scroll]');
            this.dropdownItems = document.querySelectorAll('.nav-item.dropdown');
            this.init();
        }

        init() {
            this.handleScroll();
            this.handleHamburger();
            this.handleDropdown();
            this.handleNavLinks();
        }

        handleScroll() {
            const handleScroll = Utils.throttle(() => {
                if (window.scrollY > 50) {
                    this.navbar.classList.add('scrolled');
                } else {
                    this.navbar.classList.remove('scrolled');
                }
            }, 100);

            window.addEventListener('scroll', handleScroll);
        }

        handleHamburger() {
            if (this.hamburger) {
                this.hamburger.addEventListener('click', () => {
                    this.hamburger.classList.toggle('active');
                    this.navMenu.classList.toggle('active');
                    document.body.style.overflow = this.navMenu.classList.contains('active') ? 'hidden' : '';
                });
            }
        }

        handleDropdown() {
            this.dropdownItems.forEach(item => {
                const link = item.querySelector('.nav-link');
                link.addEventListener('click', (e) => {
                    if (window.innerWidth <= 1024) {
                        e.preventDefault();
                        item.classList.toggle('active');
                    }
                });
            });
        }

        handleNavLinks() {
            this.navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    e.preventDefault();
                    const targetId = link.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        Utils.scrollTo(targetElement);
                        this.navLinks.forEach(l => l.classList.remove('active'));
                        link.classList.add('active');
                        
                        if (window.innerWidth <= 1024) {
                            this.hamburger.classList.remove('active');
                            this.navMenu.classList.remove('active');
                            document.body.style.overflow = '';
                        }
                    }
                });
            });
        }
    }

    // ============================================
    // Scroll Progress Class
    // ============================================
    class ScrollProgress {
        constructor() {
            this.progressBar = document.getElementById('scrollProgress');
            this.init();
        }

        init() {
            window.addEventListener('scroll', Utils.throttle(() => {
                const scrollTop = window.scrollY;
                const docHeight = document.documentElement.scrollHeight - window.innerHeight;
                const scrollPercent = (scrollTop / docHeight) * 100;
                this.progressBar.style.width = `${scrollPercent}%`;
            }, 50));
        }
    }

    // ============================================
    // Scroll Animations Class (Intersection Observer)
    // ============================================
    class ScrollAnimations {
        constructor() {
            this.animatedElements = document.querySelectorAll('[data-animate]');
            this.init();
        }

        init() {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver(
                    (entries) => {
                        entries.forEach(entry => {
                            if (entry.isIntersecting) {
                                const delay = entry.target.dataset.delay || 0;
                                setTimeout(() => {
                                    entry.target.classList.add('animated');
                                }, delay);
                                observer.unobserve(entry.target);
                            }
                        });
                    },
                    {
                        threshold: 0.1,
                        rootMargin: '0px 0px -50px 0px'
                    }
                );

                this.animatedElements.forEach(el => observer.observe(el));
            } else {
                // Fallback for older browsers
                this.animatedElements.forEach(el => el.classList.add('animated'));
            }
        }
    }

    // ============================================
    // Counter Animation Class
    // ============================================
    class CounterAnimation {
        constructor() {
            this.counters = document.querySelectorAll('.stat-number[data-count]');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.animateCounter(entry.target);
                            observer.unobserve(entry.target);
                        }
                    });
                },
                { threshold: 0.5 }
            );

            this.counters.forEach(counter => observer.observe(counter));
        }

        animateCounter(counter) {
            const target = parseInt(counter.dataset.count);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.floor(current) + (counter.dataset.count === '10' ? '' : 'K+');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target + (counter.dataset.count === '10' ? '' : 'K+');
                }
            };

            updateCounter();
        }
    }

    // ============================================
    // Destination Filter Class
    // ============================================
    class DestinationFilter {
        constructor() {
            this.filterBtns = document.querySelectorAll('.filter-btn');
            this.cards = document.querySelectorAll('.destination-card');
            this.init();
        }

        init() {
            this.filterBtns.forEach(btn => {
                btn.addEventListener('click', () => {
                    this.filterBtns.forEach(b => b.classList.remove('active'));
                    btn.classList.add('active');
                    this.filter(btn.dataset.filter);
                });
            });
        }

        filter(category) {
            this.cards.forEach(card => {
                if (category === 'all' || card.dataset.category === category) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        }
    }

    // ============================================
    // Testimonials Slider Class
    // ============================================
    class TestimonialsSlider {
        constructor() {
            this.cards = document.querySelectorAll('.testimonial-card');
            this.dots = document.querySelectorAll('.slider-dots .dot');
            this.currentSlide = 0;
            this.autoPlay = true;
            this.intervalTime = 5000;
            this.init();
        }

        init() {
            this.createDots();
            this.startAutoPlay();
            
            this.dots.forEach((dot, index) => {
                dot.addEventListener('click', () => {
                    this.goToSlide(index);
                });
            });

            // Pause on hover
            const slider = document.querySelector('.testimonials-slider');
            slider.addEventListener('mouseenter', () => {
                this.autoPlay = false;
            });
            
            slider.addEventListener('mouseleave', () => {
                this.autoPlay = true;
                this.startAutoPlay();
            });
        }

        createDots() {
            const dotsContainer = document.querySelector('.slider-dots');
            dotsContainer.innerHTML = '';
            this.cards.forEach((_, index) => {
                const dot = document.createElement('span');
                dot.classList.add('dot');
                if (index === 0) dot.classList.add('active');
                dotsContainer.appendChild(dot);
            });
            this.dots = document.querySelectorAll('.slider-dots .dot');
        }

        goToSlide(index) {
            this.cards.forEach(card => card.classList.remove('active'));
            this.dots.forEach(dot => dot.classList.remove('active'));
            
            this.cards[index].classList.add('active');
            this.dots[index].classList.add('active');
            this.currentSlide = index;
        }

        startAutoPlay() {
            if (!this.autoPlay) return;
            
            clearInterval(this.interval);
            this.interval = setInterval(() => {
                this.currentSlide = (this.currentSlide + 1) % this.cards.length;
                this.goToSlide(this.currentSlide);
            }, this.intervalTime);
        }
    }

    // ============================================
    // Search Modal Class
    // ============================================
    class SearchModal {
        constructor() {
            this.searchBtn = document.getElementById('searchBtn');
            this.searchModal = document.getElementById('searchModal');
            this.searchClose = document.getElementById('searchClose');
            this.searchInput = document.querySelector('.search-box-large input');
            this.init();
        }

        init() {
            if (this.searchBtn) {
                this.searchBtn.addEventListener('click', () => this.open());
            }
            
            if (this.searchClose) {
                this.searchClose.addEventListener('click', () => this.close());
            }
            
            if (this.searchModal) {
                this.searchModal.addEventListener('click', (e) => {
                    if (e.target === this.searchModal) this.close();
                });
            }
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.searchModal?.classList.contains('active')) {
                    this.close();
                }
            });
        }

        open() {
            this.searchModal.classList.add('active');
            document.body.style.overflow = 'hidden';
            setTimeout(() => this.searchInput?.focus(), 100);
        }

        close() {
            this.searchModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    }

    // ============================================
    // Back to Top Button Class
    // ============================================
    class BackToTop {
        constructor() {
            this.btn = document.getElementById('backToTop');
            this.init();
        }

        init() {
            const toggleVisibility = Utils.throttle(() => {
                if (window.scrollY > 500) {
                    this.btn.classList.add('visible');
                } else {
                    this.btn.classList.remove('visible');
                }
            }, 100);

            window.addEventListener('scroll', toggleVisibility);
            
            this.btn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // ============================================
    // Form Handler Class
    // ============================================
    class FormHandler {
        constructor() {
            this.contactForm = document.getElementById('contactForm');
            this.newsletterForm = document.getElementById('newsletterForm');
            this.init();
        }

        init() {
            if (this.contactForm) {
                this.contactForm.addEventListener('submit', (e) => this.handleContactSubmit(e));
            }
            
            if (this.newsletterForm) {
                this.newsletterForm.addEventListener('submit', (e) => this.handleNewsletterSubmit(e));
            }
        }

        async handleContactSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const formData = new FormData(form);
            const data = Object.fromEntries(formData);
            
            // Simulate API call
            await this.simulateLoading();
            
            // Show success message
            this.showNotification('Thank you! Your message has been sent successfully.', 'success');
            form.reset();
        }

        async handleNewsletterSubmit(e) {
            e.preventDefault();
            const form = e.target;
            const email = form.querySelector('input[type="email"]').value;
            
            // Simulate API call
            await this.simulateLoading();
            
            this.showNotification('Successfully subscribed to our newsletter!', 'success');
            form.reset();
        }

        simulateLoading() {
            return new Promise(resolve => setTimeout(resolve, 1000));
        }

        showNotification(message, type) {
            // Create notification element
            const notification = document.createElement('div');
            notification.className = `notification ${type}`;
            notification.innerHTML = `
                <div class="notification-content">
                    <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
                    <span>${message}</span>
                </div>
            `;
            
            // Add styles dynamically
            const style = document.createElement('style');
            style.textContent = `
                .notification {
                    position: fixed;
                    top: 100px;
                    right: 20px;
                    padding: 1rem 2rem;
                    background: ${type === 'success' ? 'linear-gradient(135deg, #28a745, #20c997)' : 'linear-gradient(135deg, #dc3545, #fd7e14)'};
                    color: white;
                    border-radius: 10px;
                    box-shadow: 0 10px 40px rgba(0, 0, 0, 0.2);
                    z-index: 10003;
                    animation: slideIn 0.3s ease, fadeOut 0.3s ease 2.7s forwards;
                }
                .notification-content {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                }
                @keyframes slideIn {
                    from { transform: translateX(100%); opacity: 0; }
                    to { transform: translateX(0); opacity: 1; }
                }
                @keyframes fadeOut {
                    to { opacity: 0; transform: translateY(-20px); }
                }
            `;
            document.head.appendChild(style);
            document.body.appendChild(notification);
            
            // Remove after 3 seconds
            setTimeout(() => {
                notification.remove();
                style.remove();
            }, 3000);
        }
    }

    // ============================================
    // Gallery Lightbox Class
    // ============================================
    class GalleryLightbox {
        constructor() {
            this.galleryItems = document.querySelectorAll('.gallery-item');
            this.init();
        }

        init() {
            this.galleryItems.forEach(item => {
                item.addEventListener('click', () => {
                    this.openLightbox(item.querySelector('img'));
                });
            });
        }

        openLightbox(img) {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <img src="${img.src}" alt="${img.alt}">
                    <button class="lightbox-close"><i class="fas fa-times"></i></button>
                </div>
            `;
            
            const style = document.createElement('style');
            style.textContent = `
                .lightbox {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, 0.95);
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 10004;
                    animation: fadeIn 0.3s ease;
                }
                .lightbox-content {
                    position: relative;
                    max-width: 90%;
                    max-height: 90%;
                }
                .lightbox-content img {
                    max-width: 100%;
                    max-height: 90vh;
                    border-radius: 10px;
                    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                }
                .lightbox-close {
                    position: absolute;
                    top: -50px;
                    right: 0;
                    font-size: 2rem;
                    color: white;
                    opacity: 0.7;
                    transition: all 0.3s ease;
                }
                .lightbox-close:hover {
                    opacity: 1;
                    transform: rotate(90deg);
                }
            `;
            
            document.head.appendChild(style);
            document.body.appendChild(lightbox);
            
            lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
                lightbox.remove();
                style.remove();
            });
            
            lightbox.addEventListener('click', (e) => {
                if (e.target === lightbox) {
                    lightbox.remove();
                    style.remove();
                }
            });
            
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape') {
                    lightbox.remove();
                    style.remove();
                }
            });
        }
    }

    // ============================================
    // Parallax Effect Class
    // ============================================
    class ParallaxEffect {
        constructor() {
            this.hero = document.querySelector('.hero-bg');
            this.mountains = document.querySelectorAll('.mountain');
            this.clouds = document.querySelectorAll('.clouds, .cloud-extra');
            this.init();
        }

        init() {
            const handleScroll = Utils.throttle(() => {
                const scrollY = window.scrollY;
                const heroHeight = window.innerHeight;
                
                if (scrollY < heroHeight) {
                    // Parallax for mountains
                    this.mountains.forEach((mountain, index) => {
                        const speed = (index + 1) * 0.1;
                        mountain.style.transform = `translateY(${scrollY * speed}px)`;
                    });
                    
                    // Parallax for clouds
                    this.clouds.forEach((cloud, index) => {
                        const speed = (index + 1) * 0.05;
                        cloud.style.transform = `translateY(${scrollY * speed}px)`;
                    });
                    
                    // Fade out hero content
                    const content = document.querySelector('.hero-content');
                    if (content) {
                        content.style.opacity = 1 - (scrollY / heroHeight) * 1.5;
                        content.style.transform = `translateY(${scrollY * 0.3}px)`;
                    }
                }
            }, 16);

            window.addEventListener('scroll', handleScroll);
        }
    }

    // ============================================
    // Active Navigation Link on Scroll Class
    // ============================================
    class ActiveNavLink {
        constructor() {
            this.sections = document.querySelectorAll('section[id]');
            this.init();
        }

        init() {
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.updateActiveLink(entry.target.id);
                        }
                    });
                },
                { threshold: 0.3 }
            );

            this.sections.forEach(section => observer.observe(section));
        }

        updateActiveLink(sectionId) {
            document.querySelectorAll('.nav-link').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    }

    // ============================================
    // Like Button Handler Class
    // ============================================
    class LikeButtonHandler {
        constructor() {
            this.likeButtons = document.querySelectorAll('.card-btn');
            this.init();
        }

        init() {
            this.likeButtons.forEach(btn => {
                btn.addEventListener('click', () => {
                    btn.classList.toggle('liked');
                    const icon = btn.querySelector('i');
                    if (btn.classList.contains('liked')) {
                        icon.classList.remove('far');
                        icon.classList.add('fas');
                        icon.style.color = '#e94560';
                    } else {
                        icon.classList.remove('fas');
                        icon.classList.add('far');
                        icon.style.color = '';
                    }
                });
            });
        }
    }

    // ============================================
    // Initialize All Modules
    // ============================================
    const initApp = () => {
        new Loader();
        new Navigation();
        new ScrollProgress();
        new ScrollAnimations();
        new CounterAnimation();
        new DestinationFilter();
        new TestimonialsSlider();
        new SearchModal();
        new BackToTop();
        new FormHandler();
        new GalleryLightbox();
        new ParallaxEffect();
        new ActiveNavLink();
        new LikeButtonHandler();
        
        console.log('Vista Travel Website - All modules initialized successfully!');
    };

    // Initialize when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initApp);
    } else {
        initApp();
    }
})();
