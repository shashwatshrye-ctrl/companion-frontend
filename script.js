

let currentTabIndex = 1;

function switchTab(tabNum) {
    currentTabIndex = tabNum;
    updateTabs();
}

function nextTab() {
    if (currentTabIndex < 5) {
        currentTabIndex++;
        updateTabs();
    }
}

function prevTab() {
    if (currentTabIndex > 1) {
        currentTabIndex--;
        updateTabs();
    }
}

function updateTabs() {
    // Hide all panels
    document.querySelectorAll('.tab-panel').forEach(panel => {
        panel.classList.remove('active');
    });

    // Deactivate all buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });

    // Show current panel
    const currentPanel = document.getElementById(`tab-${currentTabIndex}`);
    if (currentPanel) {
        currentPanel.classList.add('active');
    }

    // Activate current button
    document.querySelectorAll('.tab-btn').forEach((btn, index) => {
        if (index === currentTabIndex - 1) {
            btn.classList.add('active');
        }
    });

    // Update counter
    const counter = document.getElementById('currentTab');
    if (counter) {
        counter.textContent = currentTabIndex;
    }

    // Scroll to tabs on mobile
    if (window.innerWidth < 768) {
        const howWorksSection = document.querySelector('.how-works');
        if (howWorksSection) {
            howWorksSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

// Select mode functionality
function selectMode(element) {
    // Remove selected class from all modes
    document.querySelectorAll('.mode-option').forEach(option => {
        option.classList.remove('selected');
    });

    // Add selected class to clicked element
    element.classList.add('selected');
    Toast.show('✨ Mode selected successfully!', 'success', 2500);
}

// Save personalization preferences
function savePersonalization() {
    const name = document.getElementById('companionName')?.value || 'Companion';
    const voice = document.getElementById('voiceSelect')?.value || 'female';
    const tone = document.getElementById('toneSelect')?.value || 'warm';

    if (!name.trim()) {
        Toast.show('Please enter a name for your companion', 'error');
        return;
    }

    // Save to localStorage
    localStorage.setItem('companionName', name);
    localStorage.setItem('companionVoice', voice);
    localStorage.setItem('companionTone', tone);

    // Update the voice command name display
    const voiceCommandElement = document.getElementById('voiceCommandName');
    if (voiceCommandElement) {
        voiceCommandElement.textContent = name;
    }

    Toast.show(`✨ Preferences saved! Your companion "${name}" is ready!`, 'success', 3000);
}

// Load saved preferences on page load
function loadPersonalizationPrefs() {
    const savedName = localStorage.getItem('companionName');
    const savedVoice = localStorage.getItem('companionVoice');
    const savedTone = localStorage.getItem('companionTone');

    if (savedName && document.getElementById('companionName')) {
        document.getElementById('companionName').value = savedName;
    }

    if (savedVoice && document.getElementById('voiceSelect')) {
        document.getElementById('voiceSelect').value = savedVoice;
    }

    if (savedTone && document.getElementById('toneSelect')) {
        document.getElementById('toneSelect').value = savedTone;
    }

    // Update the voice command name display
    if (savedName && document.getElementById('voiceCommandName')) {
        document.getElementById('voiceCommandName').textContent = savedName;
    }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Toast Notification System
class Toast {
    static show(message, type = 'info', duration = 3000) {
        const container = document.querySelector('.toast-container');
        const toast = document.createElement('div');
        toast.className = `toast ${type}`;
        
        const icons = {
            success: 'fas fa-check-circle',
            error: 'fas fa-exclamation-circle',
            info: 'fas fa-info-circle'
        };
        
        toast.innerHTML = `
            <i class="${icons[type]}"></i>
            <span class="toast-message">${message}</span>
        `;
        
        container.appendChild(toast);
        
        setTimeout(() => {
            toast.style.animation = 'none';
            setTimeout(() => toast.remove(), 300);
        }, duration);
    }
}

// Scroll Progress Bar
function updateScrollProgress() {
    const scrollBar = document.querySelector('.scroll-progress-bar');
    const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
    scrollBar.style.width = scrollPercentage + '%';
}

// Scroll to Top Functionality
function toggleScrollToTop() {
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (window.scrollY > 300) {
        scrollBtn.classList.add('show');
    } else {
        scrollBtn.classList.remove('show');
    }
}

function scrollToTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// Email Validation
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Pre-order Handler
function handlePreOrder() {
    const emailInput = document.getElementById('preorderEmail');
    const email = emailInput.value.trim();
    
    if (!email) {
        Toast.show('Please enter your email address', 'error');
        emailInput.focus();
        return;
    }
    
    if (!validateEmail(email)) {
        Toast.show('Please enter a valid email address', 'error');
        emailInput.focus();
        return;
    }
    
    // Save to localStorage
    const preorders = JSON.parse(localStorage.getItem('preorders') || '[]');
    if (!preorders.includes(email)) {
        preorders.push(email);
        localStorage.setItem('preorders', JSON.stringify(preorders));
    }
    
    Toast.show(`✨ Thank you! Check your email (${email}) for updates`, 'success', 4000);
    emailInput.value = '';
}

// ============================================
// IMAGE CAROUSEL
// ============================================

let currentSlideIndex = 0;
const autoPlayInterval = 5000;

function currentSlide(n) {
    showSlide(currentSlideIndex = n - 1);
}

function showSlide(n) {
    const slides = document.querySelectorAll('.carousel-image');
    const dots = document.querySelectorAll('.dot');

    if (n >= slides.length) {
        currentSlideIndex = 0;
    }
    if (n < 0) {
        currentSlideIndex = slides.length - 1;
    }

    slides.forEach(slide => slide.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));

    if (slides[currentSlideIndex]) {
        slides[currentSlideIndex].classList.add('active');
    }
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

let carouselInterval;

function startCarouselAutoPlay() {
    carouselInterval = setInterval(() => {
        currentSlideIndex++;
        showSlide(currentSlideIndex);
    }, autoPlayInterval);
}

function stopCarouselAutoPlay() {
    clearInterval(carouselInterval);
}

// ============================================
// INITIALIZATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Load personalization preferences
    loadPersonalizationPrefs();

    // Initialize carousel
    showSlide(currentSlideIndex);
    startCarouselAutoPlay();

    // Carousel controls
    const carousel = document.querySelector('.image-carousel');
    if (carousel) {
        carousel.addEventListener('mouseenter', stopCarouselAutoPlay);
        carousel.addEventListener('mouseleave', startCarouselAutoPlay);
    }

    // Mobile menu
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');

    if (hamburger) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            hamburger.classList.toggle('active');
        });
    }

    // Close menu when link is clicked
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu) navMenu.classList.remove('active');
            if (hamburger) hamburger.classList.remove('active');
        });
    });

    // Pre-order buttons
    document.querySelectorAll('.pre-order-btn, .btn-primary').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const emailInput = document.getElementById('preorderEmail');
            if (emailInput) {
                emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
                emailInput.focus();
            }
        });
    });

    // Scroll to top button
    const scrollBtn = document.querySelector('.scroll-to-top');
    if (scrollBtn) {
        scrollBtn.addEventListener('click', scrollToTop);
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            if (href !== '#' && document.querySelector(href)) {
                e.preventDefault();
                const target = document.querySelector(href);
                const offsetTop = target.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Initialize animations
    initializeIntersectionObserver();
    initializeButtonEffects();

    // Show welcome toast if first visit
    if (!sessionStorage.getItem('visited')) {
        setTimeout(() => {
            Toast.show('Welcome to Companion! 👋 Explore the sections below', 'info', 3000);
            sessionStorage.setItem('visited', 'true');
        }, 500);
    }
});

// ============================================
// SCROLL EVENTS
// ============================================

window.addEventListener('scroll', () => {
    updateScrollProgress();
    toggleScrollToTop();
});

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================

function initializeIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    document.querySelectorAll('.function-card, .benefit-card, .mode-card, .step, .spec-item, .everyone-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
        observer.observe(el);
    });
}

// ============================================
// BUTTON EFFECTS
// ============================================

function initializeButtonEffects() {
    document.querySelectorAll('button').forEach(button => {
        button.addEventListener('click', function(e) {
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;

            ripple.style.cssText = `
                position: absolute;
                width: ${size}px;
                height: ${size}px;
                background: rgba(255, 255, 255, 0.5);
                border-radius: 50%;
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                animation: ripple-animation 0.6s ease-out;
            `;

            if (!this.style.position || this.style.position === 'static') {
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
            }

            this.appendChild(ripple);
            setTimeout(() => ripple.remove(), 600);
        });

        // Hover effects
        button.addEventListener('mousedown', function() {
            this.style.transform = 'scale(0.98)';
        });

        button.addEventListener('mouseup', function() {
            this.style.transform = 'scale(1)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

// ============================================
// RESPONSIVE MOBILE MENU
// ============================================

window.addEventListener('resize', () => {
    const navMenu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    
    if (window.innerWidth > 768) {
        if (navMenu) navMenu.classList.remove('active');
        if (hamburger) hamburger.classList.remove('active');
    }
});

// ============================================
// ACTIVE NAVIGATION LINK HIGHLIGHTING
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section[id]');

    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}` && current) {
            link.classList.add('active');
        }
    });
});

// ============================================
// IMAGE LAZY LOADING
// ============================================

if ('IntersectionObserver' in window) {
    const imgObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src || img.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });

    document.querySelectorAll('img[loading="lazy"]').forEach(img => {
        imgObserver.observe(img);
    });
}

// ============================================
// KEYBOARD SHORTCUTS
// ============================================

document.addEventListener('keydown', (e) => {
    // Scroll to top with "Home" key
    if (e.key === 'Home') {
        e.preventDefault();
        scrollToTop();
    }
    
    // Open pre-order with Ctrl+P
    if ((e.ctrlKey || e.metaKey) && e.key === 'p') {
        e.preventDefault();
        const emailInput = document.getElementById('preorderEmail');
        if (emailInput) {
            emailInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
            emailInput.focus();
        }
    }
});

// ============================================
// PERFORMANCE MONITORING
// ============================================

window.addEventListener('load', () => {
    console.log('✨ Companion website loaded successfully!');
    console.log('📱 Responsive design active');
    console.log('🎨 Modern UI/UX implemented');
    console.log('🖼️ All images and videos linked');
    console.log('⚡ Advanced features enabled');
    console.log('💬 Toast notifications active');
    console.log('📊 Progress tracking enabled');
    
    const preorders = JSON.parse(localStorage.getItem('preorders') || '[]');
    if (preorders.length > 0) {
        console.log(`📊 Pre-orders stored: ${preorders.length}`);
    }
});

// Dark mode detection
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    console.log('🌙 Dark mode preference detected');
}
