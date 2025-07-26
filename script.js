// Preloader
window.addEventListener('load', () => {
    const preloader = document.querySelector('.preloader');
    preloader.classList.add('fade-out');
    setTimeout(() => {
        preloader.style.display = 'none';
    }, 500);
});

// Set current year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close mobile menu when clicking a link
navItems.forEach(item => {
    item.addEventListener('click', () => {
        navLinks.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// Sticky navbar on scroll
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide back to top button
    const backToTop = document.getElementById('backToTop');
    if (window.scrollY > 300) {
        backToTop.classList.add('active');
    } else {
        backToTop.classList.remove('active');
    }

    // Animate skill bars when scrolled to
    animateSkillBars();
});

// Typing effect in hero section
const typewriterElement = document.querySelector('.typing');
const professions = ['Engineer', 'Developer', 'Programmer', 'Analyst'];
let professionIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typingSpeed = 100;

function typeWriter() {
    const currentProfession = professions[professionIndex];
    
    if (isDeleting) {
        typewriterElement.textContent = currentProfession.substring(0, charIndex - 1);
        charIndex--;
        typingSpeed = 50;
    } else {
        typewriterElement.textContent = currentProfession.substring(0, charIndex + 1);
        charIndex++;
        typingSpeed = 100;
    }

    if (!isDeleting && charIndex === currentProfession.length) {
        isDeleting = true;
        typingSpeed = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        professionIndex = (professionIndex + 1) % professions.length;
        typingSpeed = 500; // Pause before typing next word
    }

    setTimeout(typeWriter, typingSpeed);
}

// Start typing effect after a short delay
setTimeout(typeWriter, 1000);

// Animate skill bars when scrolled to
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-bar .progress');
    const circularProgresses = document.querySelectorAll('.circular-progress');
    
    skillBars.forEach(bar => {
        const width = bar.style.width;
        if (isElementInViewport(bar.parentElement)) {
            bar.style.width = width;
        }
    });

    circularProgresses.forEach(progress => {
        if (isElementInViewport(progress)) {
            const percent = progress.getAttribute('data-percent');
            const progressFill = progress.querySelector('.progress-fill');
            const progressText = progress.querySelector('.progress-text');
            
            const circumference = 2 * Math.PI * 60;
            const offset = circumference - (percent / 100) * circumference;
            
            progressFill.style.strokeDashoffset = offset;
            progressText.textContent = `${percent}%`;
        }
    });
}

function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Project filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
    
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Update active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filter = button.getAttribute('data-filter');
        
        // Filter projects
        projectCards.forEach(card => {
            if (filter === 'all' || card.getAttribute('data-category') === filter) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Form submission
const contactForm = document.getElementById('contactForm');
const formMessage = document.getElementById('formMessage');
    
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Simulate form submission
    formMessage.textContent = 'Thank you for your message! I will get back to you soon.';
    formMessage.classList.add('success');
    formMessage.style.display = 'block';
    
    // Reset form
    contactForm.reset();
    
    // Hide message after 5 seconds
    setTimeout(() => {
        formMessage.style.display = 'none';
        formMessage.classList.remove('success');
    }, 5000);
});

// Initialize skill bars on page load if already in view
window.addEventListener('load', animateSkillBars);

// Floating animation for tech icons
const techIcons = document.querySelectorAll('.tech-icons .icon');

techIcons.forEach(icon => {
    icon.style.animation = `float 3s ease-in-out infinite`;
    const delay = parseFloat(icon.style.animationDelay) || 0;
    icon.style.animationDelay = `${delay}s`;
});

// Add animation to project cards on scroll
const animateOnScroll = () => {
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        if (isElementInViewport(card)) {
            card.style.animation = `fadeInUp 0.5s ease forwards ${index * 0.1}s`;
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);