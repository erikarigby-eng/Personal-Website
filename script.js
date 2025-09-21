// Enhanced JavaScript for smooth, performant website
document.addEventListener('DOMContentLoaded', function() {
    
    // Cool Navbar Functionality
    const navbar = document.getElementById('navbar');
    const navMenu = document.getElementById('nav-menu');
    const navToggle = document.getElementById('nav-toggle');
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('section[id], footer[id]');
    
    // Mobile menu toggle with animation
    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        navToggle.classList.toggle('active');
        
        // Animate menu items
        if (navMenu.classList.contains('active')) {
            const navItems = navMenu.querySelectorAll('.nav-item');
            navItems.forEach((item, index) => {
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    });
    
    // Close mobile menu when link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Navbar scroll effects
    let lastScroll = 0;
    const scrollThreshold = 100;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Add scrolled class for navbar styling
        if (currentScroll > scrollThreshold) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        // Hide/show navbar on scroll
        if (currentScroll > lastScroll && currentScroll > scrollThreshold) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
        
        lastScroll = currentScroll;
        
        // Update scroll progress indicator
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        navbar.style.setProperty('--scroll-progress', scrolled + '%');
        
        // Update active nav link based on scroll position
        updateActiveNavLink();
    });
    
    // Update active navigation link based on scroll position
    function updateActiveNavLink() {
        let current = '';
        const scrollY = window.pageYOffset;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }
    
    // Smooth scroll to section when nav link clicked
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 70;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active state immediately
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
    });
    
    // Add hover effects to nav items
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            const otherLinks = document.querySelectorAll('.nav-link:not(:hover)');
            otherLinks.forEach(otherLink => {
                otherLink.style.opacity = '0.5';
            });
        });
        
        link.addEventListener('mouseleave', function() {
            navLinks.forEach(link => {
                link.style.opacity = '1';
            });
        });
    });
    
    // Performance optimizations
    const requestFrame = window.requestAnimationFrame || 
                         window.webkitRequestAnimationFrame || 
                         window.mozRequestAnimationFrame ||
                         window.msRequestAnimationFrame ||
                         function(callback) { return setTimeout(callback, 1000 / 60); };
    
    // Debounce function for performance
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Throttle function for scroll events
    function throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments;
            const context = this;
            if (!inThrottle) {
                func.apply(context, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        }
    }
    
    // Smooth scrolling with easing for anchor links
    const smoothScrollLinks = document.querySelectorAll('a[href^="#"]');
    smoothScrollLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const startPosition = window.pageYOffset;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - 80;
                const distance = targetPosition - startPosition;
                const duration = 1000;
                let start = null;
                
                function easeInOutCubic(t) {
                    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
                }
                
                function animation(currentTime) {
                    if (start === null) start = currentTime;
                    const timeElapsed = currentTime - start;
                    const progress = Math.min(timeElapsed / duration, 1);
                    const ease = easeInOutCubic(progress);
                    
                    window.scrollTo(0, startPosition + (distance * ease));
                    
                    if (timeElapsed < duration) {
                        requestFrame(animation);
                    }
                }
                
                requestFrame(animation);
            }
        });
    });

    // Enhanced button interactions with ripple effect
    const ctaButtons = document.querySelectorAll('.cta-button');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
        
        // Add hover animation
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px) scale(1.05)';
        });
        
        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });

    // Optimized book card animations
    const bookCards = document.querySelectorAll('.book-card');
    let isAnimating = false;
    
    bookCards.forEach(card => {
        // 3D hover effect with performance optimization
        card.addEventListener('mousemove', throttle(function(e) {
            if (!isAnimating) {
                isAnimating = true;
                requestFrame(() => {
                    const rect = this.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    
                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;
                    
                    const rotateX = ((y - centerY) / centerY) * 5;
                    const rotateY = ((centerX - x) / centerX) * 5;
                    
                    this.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`;
                    isAnimating = false;
                });
            }
        }.bind(card), 16)); // ~60fps
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateZ(0)';
        });
    });

    // Optimized Intersection Observer for fade-in animations
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const fadeInObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                requestFrame(() => {
                    entry.target.classList.add('visible');
                    fadeInObserver.unobserve(entry.target);
                });
            }
        });
    }, observerOptions);

    // Apply observer to elements
    const animatedElements = document.querySelectorAll('.section-header, .journey-updates li');
    animatedElements.forEach(element => {
        element.classList.add('fade-in-element');
        fadeInObserver.observe(element);
    });

    // Optimized parallax scrolling
    let ticking = false;
    const heroSection = document.querySelector('.hero-section');
    const heroContent = document.querySelector('.hero-content');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const windowHeight = window.innerHeight;
        
        if (heroSection && scrolled < windowHeight) {
            requestFrame(() => {
                const speed = 0.5;
                const yPos = -(scrolled * speed);
                heroSection.style.transform = `translate3d(0, ${yPos}px, 0)`;
                
                // Fade out hero content as user scrolls
                if (heroContent) {
                    const opacity = Math.max(0, 1 - (scrolled / (windowHeight * 0.8)));
                    heroContent.style.opacity = opacity;
                }
            });
        }
        
        ticking = false;
    }
    
    function requestTick() {
        if (!ticking) {
            requestFrame(updateParallax);
            ticking = true;
        }
    }
    
    // Throttled scroll event
    window.addEventListener('scroll', throttle(requestTick, 10));

    // Smooth typing effect for hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const originalText = heroTitle.textContent;
        heroTitle.textContent = '';
        heroTitle.style.minHeight = '1.2em';
        
        let i = 0;
        function typeWriter() {
            if (i < originalText.length) {
                heroTitle.textContent += originalText.charAt(i);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing after a short delay
        setTimeout(typeWriter, 500);
    }

    // Page load optimization
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
        
        // Preload images for better performance
        const images = document.querySelectorAll('img[data-src]');
        images.forEach(img => {
            img.src = img.dataset.src;
            img.removeAttribute('data-src');
        });
    });

    // Add performance-optimized styles dynamically
    const style = document.createElement('style');
    style.textContent = `
        body {
            opacity: 0;
            animation: pageLoad 0.5s ease forwards;
            animation-delay: 0.1s;
        }
        
        body.loaded {
            opacity: 1;
        }
        
        .cta-button {
            position: relative;
            overflow: hidden;
            transform: translateZ(0);
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.4);
            transform: scale(0);
            animation: ripple-animation 0.6s cubic-bezier(0.4, 0, 0.2, 1);
            pointer-events: none;
        }
        
        @keyframes ripple-animation {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .fade-in-element {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), 
                        transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .fade-in-element.visible {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* GPU acceleration for smooth animations */
        .book-card, .hero-section, .cta-button {
            will-change: transform;
            transform: translateZ(0);
            backface-visibility: hidden;
        }
        
        /* Optimize image rendering */
        img {
            image-rendering: -webkit-optimize-contrast;
            image-rendering: crisp-edges;
        }
        
        /* Smooth font rendering */
        body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
        }
        
        /* Reduce paint areas */
        .book-card:hover {
            will-change: transform, box-shadow;
        }
        
        /* Mobile touch optimization */
        @media (hover: none) {
            .book-card:hover {
                transform: none !important;
            }
        }
    `;
    document.head.appendChild(style);

    // Lazy loading for images
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.src) {
                        img.src = img.dataset.src;
                        img.removeAttribute('data-src');
                        imageObserver.unobserve(img);
                    }
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img[data-src]');
        lazyImages.forEach(img => imageObserver.observe(img));
    }

    // Cool Interactive Quiz Functionality
    const quizContainer = document.getElementById('quizContainer');
    if (quizContainer) {
        const questions = document.querySelectorAll('.quiz-question');
        const progressBar = document.getElementById('quizProgress');
        const currentQDisplay = document.querySelector('.current-q');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtn = document.getElementById('nextBtn');
        const submitBtn = document.getElementById('submitBtn');
        const resultsDiv = document.getElementById('quizResults');
        const restartBtn = document.getElementById('restartQuiz');
        const recommendationDiv = document.getElementById('bookRecommendation');
        
        let currentQuestion = 0;
        const answers = {};
        
        // Book recommendations database
        const bookRecommendations = {
            'romantic-cozy': {
                title: "Beach Read by Emily Henry",
                description: "A perfect blend of romance and cozy vibes with witty banter and heartfelt moments.",
                emoji: "🏖️💕",
                amazonLink: "https://www.amazon.com/s?k=Beach+Read+Emily+Henry"
            },
            'romantic-nature': {
                title: "The Simple Wild by K.A. Tucker",
                description: "Romance set in the Alaskan wilderness with breathtaking nature scenes.",
                emoji: "🏔️💕",
                amazonLink: "https://www.amazon.com/s?k=The+Simple+Wild+K+A+Tucker"
            },
            'adventure-epic': {
                title: "The Way of Kings by Brandon Sanderson",
                description: "Epic fantasy adventure with incredible worldbuilding and complex magic systems.",
                emoji: "⚔️🐉",
                amazonLink: "https://www.amazon.com/s?k=The+Way+of+Kings+Brandon+Sanderson"
            },
            'mystery-twist': {
                title: "The Silent Patient by Alex Michaelides",
                description: "A psychological thriller with one of the best plot twists you'll never see coming.",
                emoji: "🔍😱",
                amazonLink: "https://www.amazon.com/s?k=The+Silent+Patient+Alex+Michaelides"
            },
            'fantasy-world': {
                title: "The Name of the Wind by Patrick Rothfuss",
                description: "Rich worldbuilding with beautiful prose and a captivating magic system.",
                emoji: "🧙‍♂️📚",
                amazonLink: "https://www.amazon.com/s?k=The+Name+of+the+Wind+Patrick+Rothfuss"
            },
            'default': {
                title: "The Midnight Library by Matt Haig",
                description: "A thought-provoking journey through infinite possibilities and life choices.",
                emoji: "🌙📚",
                amazonLink: "https://www.amazon.com/s?k=The+Midnight+Library+Matt+Haig"
            }
        };
        
        // Initialize quiz
        function initQuiz() {
            showQuestion(0);
            updateProgressBar();
            
            // Add click handlers to options
            document.querySelectorAll('.quiz-option').forEach(option => {
                option.addEventListener('click', function() {
                    selectOption(this);
                });
            });
        }
        
        // Show specific question
        function showQuestion(index) {
            questions.forEach((q, i) => {
                q.classList.toggle('active', i === index);
            });
            
            currentQDisplay.textContent = index + 1;
            updateButtons();
        }
        
        // Select an option
        function selectOption(option) {
            const question = option.closest('.quiz-question');
            const questionNum = parseInt(question.dataset.question);
            
            // Remove selected class from siblings
            question.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            // Add selected class
            option.classList.add('selected');
            
            // Store answer
            answers[`q${questionNum}`] = option.dataset.answer;
            
            // Enable next button
            nextBtn.disabled = false;
            
            // Add animation
            option.style.animation = 'pulse 0.5s ease';
            setTimeout(() => {
                option.style.animation = '';
            }, 500);
            
            // Auto-advance after short delay (except on last question)
            if (currentQuestion < questions.length - 1) {
                setTimeout(() => {
                    goToNextQuestion();
                }, 800);
            } else {
                // Show submit button on last question
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            }
        }
        
        // Go to next question
        function goToNextQuestion() {
            if (currentQuestion < questions.length - 1) {
                currentQuestion++;
                showQuestion(currentQuestion);
                updateProgressBar();
            }
        }
        
        // Go to previous question
        function goToPreviousQuestion() {
            if (currentQuestion > 0) {
                currentQuestion--;
                showQuestion(currentQuestion);
                updateProgressBar();
            }
        }
        
        // Update progress bar
        function updateProgressBar() {
            const progress = ((currentQuestion + 1) / questions.length) * 100;
            progressBar.style.width = progress + '%';
        }
        
        // Update navigation buttons
        function updateButtons() {
            prevBtn.disabled = currentQuestion === 0;
            
            // Check if current question has an answer
            const hasAnswer = answers[`q${currentQuestion + 1}`];
            nextBtn.disabled = !hasAnswer;
            
            // Show/hide submit button
            if (currentQuestion === questions.length - 1 && hasAnswer) {
                nextBtn.style.display = 'none';
                submitBtn.style.display = 'inline-block';
            } else {
                nextBtn.style.display = 'inline-block';
                submitBtn.style.display = 'none';
            }
        }
        
        // Submit quiz
        function submitQuiz() {
            // Calculate recommendation
            const mood = answers.q1 || 'default';
            const spot = answers.q2 || 'cozy';
            const key = `${mood}-${spot}`;
            
            const recommendation = bookRecommendations[key] || bookRecommendations['default'];
            
            // Show results
            recommendationDiv.innerHTML = `
                <div style="font-size: 3rem; margin-bottom: 20px;">${recommendation.emoji}</div>
                <h4 style="color: var(--deep-purple-gray); font-size: 1.5rem; margin-bottom: 15px;">
                    ${recommendation.title}
                </h4>
                <p style="color: var(--muted-gray); font-size: 1.1rem; line-height: 1.6; margin-bottom: 20px;">
                    ${recommendation.description}
                </p>
                <a href="${recommendation.amazonLink}" target="_blank" rel="noopener noreferrer" 
                   style="display: inline-block; padding: 10px 20px; background: linear-gradient(135deg, #FF9900, #FFB84D); 
                          color: #000; font-weight: 600; text-decoration: none; border-radius: 25px; 
                          transition: all 0.3s ease; box-shadow: 0 2px 10px rgba(255, 153, 0, 0.3);"
                   onmouseover="this.style.background='linear-gradient(135deg, #E88800, #FF9900)'; this.style.transform='scale(1.05)';"
                   onmouseout="this.style.background='linear-gradient(135deg, #FF9900, #FFB84D)'; this.style.transform='scale(1)';">
                    📦 Get it on Amazon
                </a>
            `;
            
            // Hide quiz, show results
            document.querySelector('.quiz-questions').style.display = 'none';
            document.querySelector('.quiz-navigation').style.display = 'none';
            document.querySelector('.quiz-progress-wrapper').style.display = 'none';
            resultsDiv.style.display = 'block';
            
            // Confetti effect
            createConfetti();
        }
        
        // Restart quiz
        function restartQuiz() {
            currentQuestion = 0;
            Object.keys(answers).forEach(key => delete answers[key]);
            
            // Reset UI
            document.querySelectorAll('.quiz-option').forEach(opt => {
                opt.classList.remove('selected');
            });
            
            document.querySelector('.quiz-questions').style.display = 'block';
            document.querySelector('.quiz-navigation').style.display = 'flex';
            document.querySelector('.quiz-progress-wrapper').style.display = 'block';
            resultsDiv.style.display = 'none';
            
            showQuestion(0);
            updateProgressBar();
        }
        
        // Create confetti effect
        function createConfetti() {
            const colors = ['#87AE73', '#a4d88a', '#D5896F', '#6B7D7D'];
            for (let i = 0; i < 50; i++) {
                setTimeout(() => {
                    const confetti = document.createElement('div');
                    confetti.style.cssText = `
                        position: fixed;
                        top: -10px;
                        left: ${Math.random() * 100}%;
                        width: 10px;
                        height: 10px;
                        background: ${colors[Math.floor(Math.random() * colors.length)]};
                        border-radius: 50%;
                        pointer-events: none;
                        z-index: 9999;
                        animation: confettiFall ${2 + Math.random() * 2}s ease-out;
                    `;
                    document.body.appendChild(confetti);
                    
                    setTimeout(() => confetti.remove(), 4000);
                }, i * 30);
            }
        }
        
        // Add confetti animation
        if (!document.querySelector('#confettiStyle')) {
            const confettiStyle = document.createElement('style');
            confettiStyle.id = 'confettiStyle';
            confettiStyle.textContent = `
                @keyframes confettiFall {
                    to {
                        transform: translateY(100vh) rotate(360deg);
                        opacity: 0;
                    }
                }
                
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                }
            `;
            document.head.appendChild(confettiStyle);
        }
        
        // Event listeners
        prevBtn.addEventListener('click', goToPreviousQuestion);
        nextBtn.addEventListener('click', goToNextQuestion);
        submitBtn.addEventListener('click', submitQuiz);
        restartBtn.addEventListener('click', restartQuiz);
        
        // Initialize
        initQuiz();
    }
});