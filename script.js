// Loader
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loader').classList.add('hidden');
    }, 1000);
});

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Show/hide scroll to top button
    const scrollTop = document.getElementById('scrollTop');
    if (window.scrollY > 300) {
        scrollTop.classList.add('active');
    } else {
        scrollTop.classList.remove('active');
    }
});

// Mobile menu toggle
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            // Close mobile menu if open
            navLinks.classList.remove('active');
        }
    });
});

// Scroll to top
document.getElementById('scrollTop').addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Animated counter
const counters = document.querySelectorAll('.stat-number');
const speed = 200;

const runCounter = () => {
    counters.forEach(counter => {
        const updateCount = () => {
            const target = +counter.getAttribute('data-target');
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    });
};

// Trigger counter animation when in viewport
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            runCounter();
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

const statsSection = document.querySelector('.stats');
if (statsSection) {
    observer.observe(statsSection);
}

// Add this to your existing script.js file, update the form validation section:

// Form validation (Updated version with subject field)
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Clear previous errors
    document.querySelectorAll('.form-group').forEach(group => {
        group.classList.remove('error');
    });
    
    let isValid = true;
    
    // Validate name
    const name = document.getElementById('name');
    if (name.value.trim() === '') {
        name.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Validate email
    const email = document.getElementById('email');
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.value)) {
        email.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Validate subject
    const subject = document.getElementById('subject');
    if (subject.value.trim() === '') {
        subject.parentElement.classList.add('error');
        isValid = false;
    }
    
    // Validate message
    const message = document.getElementById('message');
    if (message.value.trim() === '') {
        message.parentElement.classList.add('error');
        isValid = false;
    }
    
    if (isValid) {
        // Show success message with details
        const successMessage = `
            Thank you ${name.value}! 
            Your message about "${subject.value}" has been sent successfully. 
            We will respond to ${email.value} within 24 hours.
        `;
        alert(successMessage);
        contactForm.reset();
    }
});

// Add smooth reveal animation for team members
const observeTeamMembers = () => {
    const teamMembers = document.querySelectorAll('.team-member');
    
    const observerOptions = {
        threshold: 0.2,
        rootMargin: '0px 0px -100px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    teamMembers.forEach(member => {
        member.style.opacity = '0';
        member.style.transform = 'translateY(30px)';
        member.style.transition = 'all 0.6s ease';
        observer.observe(member);
    });
};

// Call the function when page loads
window.addEventListener('load', () => {
    observeTeamMembers();
});

// Add interactive hover effect for social icons
document.querySelectorAll('.social-icons a').forEach(icon => {
    icon.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.2) rotate(360deg)';
    });
    
    icon.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Add a fun easter egg - clicking on team member photos
document.querySelectorAll('.member-image img').forEach(img => {
    img.addEventListener('click', function() {
        const memberName = this.alt;
        const messages = [
            `${memberName} is amazing at what they do!`,
            `${memberName} loves coffee and code!`,
            `${memberName} is a team player!`,
            `${memberName} brings innovation to the team!`
        ];
        const randomMessage = messages[Math.floor(Math.random() * messages.length)];
        
        // Create a tooltip
        const tooltip = document.createElement('div');
        tooltip.className = 'member-tooltip';
        tooltip.textContent = randomMessage;
        tooltip.style.cssText = `
            position: absolute;
            background: var(--primary-color);
            color: white;
            padding: 10px 15px;
            border-radius: 5px;
            font-size: 14px;
            z-index: 1000;
            animation: fadeInOut 2s ease;
        `;
        
        this.parentElement.appendChild(tooltip);
        
        setTimeout(() => {
            tooltip.remove();
        }, 2000);
    });
});