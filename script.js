// GSAP Animation Setup
gsap.registerPlugin(ScrollTrigger);

// Load ScrollTo plugin
gsap.registerPlugin(ScrollToPlugin);

// DOM Elements
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-link');
const cursor = document.querySelector('.cursor');
const cursorInner = document.querySelector('.cursor-inner');
const cursorOuter = document.querySelector('.cursor-outer');

// Custom Cursor Effect
function initCursor() {
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;

    // Mouse move event
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor follow animation
    gsap.ticker.add(() => {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        gsap.set(cursor, {
            x: cursorX,
            y: cursorY
        });
    });

    // Hover effects for interactive elements
    const hoverElements = document.querySelectorAll('a, button, .btn, .project-card, .skill-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            gsap.to(cursorInner, {
                scale: 1.5,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorOuter, {
                scale: 1.2,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        element.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            gsap.to(cursorInner, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
            gsap.to(cursorOuter, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
}

// Hamburger Menu Toggle
function initHamburgerMenu() {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
        
        // Animate menu items
        if (navMenu.classList.contains('active')) {
            gsap.fromTo(navLinks, 
                { 
                    opacity: 0, 
                    y: 20 
                },
                { 
                    opacity: 1, 
                    y: 0, 
                    duration: 0.5, 
                    stagger: 0.1, 
                    ease: "power2.out" 
                }
            );
        }
    });

    // Close menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });
}

// Smooth Scrolling for Navigation Links
function initSmoothScrolling() {
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70; // Account for fixed navbar
                
                // Try GSAP ScrollTo first, fallback to native smooth scroll
                try {
                    gsap.to(window, {
                        duration: 1.5,
                        scrollTo: offsetTop,
                        ease: "power2.inOut"
                    });
                } catch (error) {
                    // Fallback to native smooth scrolling
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// Hero Section Animations
function initHeroAnimations() {
    const tl = gsap.timeline();
    
    tl.fromTo('.hero-title .title-line',
        { 
            opacity: 0, 
            y: 100,
            rotationX: -90
        },
        { 
            opacity: 1, 
            y: 0,
            rotationX: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power3.out"
        }
    )
    .fromTo('.hero-description',
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.8,
            ease: "power2.out"
        }, "-=0.5"
    )
    .fromTo('.hero-buttons .btn',
        { 
            opacity: 0, 
            y: 30,
            scale: 0.8
        },
        { 
            opacity: 1, 
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)"
        }, "-=0.3"
    )
    .fromTo('.profile-container',
        { 
            opacity: 0, 
            scale: 0.5,
            rotation: 15
        },
        { 
            opacity: 1, 
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)"
        }, "-=0.8"
    )
    .fromTo('.floating-element',
        { 
            opacity: 0, 
            scale: 0,
            rotation: 180
        },
        { 
            opacity: 0.3, 
            scale: 1,
            rotation: 0,
            duration: 1.2,
            stagger: 0.2,
            ease: "elastic.out(1, 0.5)"
        }, "-=0.8"
    );
}

// ScrollTrigger Animations
function initScrollAnimations() {
    // About Section
    gsap.fromTo('.about-content',
        { 
            opacity: 0, 
            y: 100 
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.about-content',
                start: 'top 80%',
                end: 'bottom 20%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // About Profile Image
    gsap.fromTo('.about-profile-image',
        { 
            opacity: 0, 
            scale: 0.5,
            rotation: 180
        },
        {
            opacity: 1,
            scale: 1,
            rotation: 0,
            duration: 1.2,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.about-image',
                start: 'top 85%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Skills Section
    gsap.fromTo('.skill-category',
        { 
            opacity: 0, 
            x: -50 
        },
        {
            opacity: 1,
            x: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    gsap.fromTo('.skill-item',
        { 
            opacity: 0, 
            y: 30,
            scale: 0.8
        },
        {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.6,
            stagger: 0.1,
            ease: "back.out(1.7)",
            scrollTrigger: {
                trigger: '.skills-grid',
                start: 'top 70%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Projects Section
    gsap.fromTo('.project-card',
        { 
            opacity: 0, 
            y: 100,
            rotationY: 15
        },
        {
            opacity: 1,
            y: 0,
            rotationY: 0,
            duration: 1,
            stagger: 0.2,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.projects-grid',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Contact Section
    gsap.fromTo('.contact-content',
        { 
            opacity: 0, 
            y: 50 
        },
        {
            opacity: 1,
            y: 0,
            duration: 1,
            ease: "power2.out",
            scrollTrigger: {
                trigger: '.contact-content',
                start: 'top 80%',
                toggleActions: 'play none none reverse'
            }
        }
    );

    // Section Headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header.querySelector('.section-title'),
            { 
                opacity: 0, 
                y: 50 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );

        gsap.fromTo(header.querySelector('.section-subtitle'),
            { 
                opacity: 0, 
                y: 30 
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: header,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// Parallax Effects
function initParallaxEffects() {
    // Floating elements parallax
    gsap.utils.toArray('.floating-element').forEach((element, index) => {
        const speed = element.getAttribute('data-speed') || 1;
        
        gsap.to(element, {
            y: () => window.innerHeight * 0.1 * speed,
            ease: "none",
            scrollTrigger: {
                trigger: '.hero',
                start: 'top top',
                end: 'bottom top',
                scrub: true
            }
        });
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('.navbar');
    
    // Ensure navbar is always visible
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '9999';
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
    }
    
    // Add scroll listener for navbar effect
    window.addEventListener('scroll', () => {
        if (navbar) {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
            
            // Ensure navbar stays visible on scroll
            navbar.style.position = 'fixed';
            navbar.style.top = '0';
            navbar.style.display = 'block';
            navbar.style.visibility = 'visible';
            navbar.style.opacity = '1';
        }
    });
}


// Performance Optimizations
function initPerformanceOptimizations() {
    // Preload critical images (if any)
    const preloadImages = () => {
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
        });
    };

    // Intersection Observer for lazy loading animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, observerOptions);

    // Observe elements that need animation
    const animateElements = document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in');
    animateElements.forEach(el => observer.observe(el));
}

// Loading Animation
function initLoadingAnimation() {
    const loadingElements = document.querySelectorAll('.loading');
    
    gsap.fromTo(loadingElements,
        { 
            opacity: 0, 
            y: 30 
        },
        { 
            opacity: 1, 
            y: 0, 
            duration: 0.6, 
            stagger: 0.1, 
            ease: "power2.out" 
        }
    );
}

// Mobile Optimizations
function initMobileOptimizations() {
    // Disable cursor on mobile devices
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    }

    // Optimize animations for mobile
    if (window.innerWidth <= 768) {
        // Reduce animation complexity on mobile
        gsap.globalTimeline.timeScale(1.2);
    }

    // Handle orientation change
    window.addEventListener('orientationchange', () => {
        setTimeout(() => {
            ScrollTrigger.refresh();
        }, 100);
    });
}

// Error Handling
function initErrorHandling() {
    window.addEventListener('error', (e) => {
        console.error('An error occurred:', e.error);
    });

    // Handle GSAP errors gracefully
    try {
        gsap.set('.hero', { opacity: 0 });
        gsap.to('.hero', { opacity: 1, duration: 0.5 });
    } catch (error) {
        console.warn('GSAP animation failed, falling back to CSS animations');
    }
}

// Ensure navbar is always visible
function ensureNavbarVisible() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        navbar.style.position = 'fixed';
        navbar.style.top = '0';
        navbar.style.left = '0';
        navbar.style.right = '0';
        navbar.style.width = '100%';
        navbar.style.zIndex = '9999';
        navbar.style.display = 'block';
        navbar.style.visibility = 'visible';
        navbar.style.opacity = '1';
    }
}

// Initialize all functions when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    try {
        // Initialize all features
        initCursor();
        initHamburgerMenu();
        initSmoothScrolling();
        initHeroAnimations();
        initScrollAnimations();
        initParallaxEffects();
        initNavbarScrollEffect();
        initFormHandling();
        initPerformanceOptimizations();
        initLoadingAnimation();
        initMobileOptimizations();
        initErrorHandling();

        // Ensure navbar is visible
        ensureNavbarVisible();

        // Add loading class to body for initial animations
        document.body.classList.add('loading');

        // Continuously ensure navbar is visible
        setInterval(ensureNavbarVisible, 100);

        console.log('Portfolio website initialized successfully!');
    } catch (error) {
        console.error('Error initializing portfolio:', error);
    }
});

// Handle window resize
window.addEventListener('resize', () => {
    ScrollTrigger.refresh();
    
    // Reinitialize mobile optimizations
    if (window.innerWidth <= 768) {
        cursor.style.display = 'none';
    } else {
        cursor.style.display = 'block';
    }
});

// Add some interactive hover effects for project cards
document.addEventListener('DOMContentLoaded', () => {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out"
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.3,
                ease: "power2.out"
            });
        });
    });
});

// Add typing effect for hero title (optional enhancement)
function initTypingEffect() {
    const titleLines = document.querySelectorAll('.title-line');
    
    titleLines.forEach((line, index) => {
        const text = line.textContent;
        line.textContent = '';
        
        gsap.delayedCall(index * 0.5, () => {
            gsap.to(line, {
                duration: 0.05 * text.length,
                ease: "none",
                onUpdate: function() {
                    const progress = this.progress();
                    const currentLength = Math.round(text.length * progress);
                    line.textContent = text.substring(0, currentLength);
                }
            });
        });
    });
}

// Uncomment the line below to enable typing effect
// initTypingEffect();
