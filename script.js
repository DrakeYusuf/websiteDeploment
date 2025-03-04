// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Add animation classes to elements
    const animatedElements = document.querySelectorAll('section');
    animatedElements.forEach(element => {
        element.classList.add('animate-fade-in');
    });

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Form validation and submission
    const contactForm = document.getElementById('contactForm');
    const spinner = document.querySelector('.spinner');
    const successMessage = document.querySelector('.success-message');

    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();

            // Check form validity
            if (!this.checkValidity()) {
                e.stopPropagation();
                this.classList.add('was-validated');
                return;
            }

            // Show loading spinner
            spinner.style.display = 'block';
            const submitButton = this.querySelector('button[type="submit"]');
            submitButton.disabled = true;

            // Get form data
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                message: document.getElementById('message').value
            };

            try {
                // Simulate form submission (replace with actual API endpoint)
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Show success message
                successMessage.style.display = 'block';
                successMessage.textContent = 'Message sent successfully!';
                this.reset();
                this.classList.remove('was-validated');

                // Hide success message after 5 seconds
                setTimeout(() => {
                    successMessage.style.display = 'none';
                }, 5000);

            } catch (error) {
                console.error('Error:', error);
                successMessage.style.display = 'block';
                successMessage.style.backgroundColor = '#f8d7da';
                successMessage.style.color = '#721c24';
                successMessage.textContent = 'Error sending message. Please try again.';
            } finally {
                // Hide loading spinner and enable submit button
                spinner.style.display = 'none';
                submitButton.disabled = false;
            }
        });
    }

    // Skill icons hover effect
    const skillIcons = document.querySelectorAll('.skill-icon');
    skillIcons.forEach(icon => {
        icon.addEventListener('mouseover', function() {
            this.style.transform = 'scale(1.2) translateY(-5px)';
        });
        icon.addEventListener('mouseout', function() {
            this.style.transform = 'scale(1) translateY(0)';
        });
    });

    // Portfolio card click handler
    const portfolioCards = document.querySelectorAll('.card');
    portfolioCards.forEach(card => {
        card.addEventListener('click', function() {
            const projectLink = this.querySelector('a').getAttribute('href');
            if (projectLink && projectLink !== '#') {
                window.open(projectLink, '_blank');
            }
        });
    });

    // Add loading attribute to images
    document.querySelectorAll('img').forEach(img => {
        img.setAttribute('loading', 'lazy');
    });

    // Theme toggle functionality (if needed)
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
    }

    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme') || 'light';
    setTheme(savedTheme);
});

// Intersection Observer for scroll animations
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observe all sections
document.querySelectorAll('section').forEach((section) => {
    observer.observe(section);
});