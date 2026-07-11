/**
 * De Anointed Kitchen - Main JavaScript
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- Preloader ---
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('hidden');
                // Trigger reveal for elements already in viewport
                revealElements();
            }, 800); // Small delay to show off the preloader animation
        });
    }

    // --- Navbar Scroll Effect ---
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    // --- Mobile Menu Toggle ---
    const hamburger = document.getElementById('hamburger');
    const navLinks = document.getElementById('nav-links');
    
    if (hamburger && navLinks) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navLinks.classList.toggle('active');
        });

        // Close menu when clicking a link
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navLinks.classList.remove('active');
            });
        });
    }

    // --- Scroll Reveal Animation ---
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
    
    function revealElements() {
        const windowHeight = window.innerHeight;
        const elementVisible = 100;

        reveals.forEach(reveal => {
            const elementTop = reveal.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                reveal.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', revealElements);
    revealElements(); // Initial check

    // --- Testimonial Slider ---
    const testimonials = document.querySelectorAll('.testimonial-card');
    const dots = document.querySelectorAll('.testimonial-dot');
    
    if (testimonials.length > 0 && dots.length > 0) {
        let currentTestimonial = 0;
        let slideInterval;

        function showTestimonial(index) {
            testimonials.forEach(t => t.classList.remove('active'));
            dots.forEach(d => d.classList.remove('active'));
            
            testimonials[index].classList.add('active');
            dots[index].classList.add('active');
        }

        function nextTestimonial() {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            showTestimonial(currentTestimonial);
        }

        // Auto slide
        function startSlide() {
            slideInterval = setInterval(nextTestimonial, 5000);
        }

        function stopSlide() {
            clearInterval(slideInterval);
        }

        // Click on dots
        dots.forEach((dot, index) => {
            dot.addEventListener('click', () => {
                stopSlide();
                currentTestimonial = index;
                showTestimonial(currentTestimonial);
                startSlide();
            });
        });

        // Pause on hover
        const sliderContainer = document.querySelector('.testimonial-slider');
        if (sliderContainer) {
            sliderContainer.addEventListener('mouseenter', stopSlide);
            sliderContainer.addEventListener('mouseleave', startSlide);
        }

        startSlide();
    }

    // --- Menu Filter (Menu Page) ---
    const filterBtns = document.querySelectorAll('.menu-filter-btn');
    const menuItems = document.querySelectorAll('.menu-item-card');
    
    if (filterBtns.length > 0 && menuItems.length > 0) {
        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active class from all buttons
                filterBtns.forEach(b => b.classList.remove('active'));
                // Add active class to clicked button
                btn.classList.add('active');
                
                const filter = btn.getAttribute('data-filter');
                
                menuItems.forEach(item => {
                    if (filter === 'all' || item.getAttribute('data-category') === filter) {
                        item.style.display = 'block';
                        // Small timeout to allow display:block to apply before animating opacity
                        setTimeout(() => {
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 10);
                    } else {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        setTimeout(() => {
                            item.style.display = 'none';
                        }, 300);
                    }
                });
            });
        });
    }

    // --- Gallery Lightbox (Gallery Page) ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxClose = document.getElementById('lightbox-close');
    
    if (galleryItems.length > 0 && lightbox && lightboxImg && lightboxClose) {
        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                const imgSrc = item.querySelector('img').getAttribute('src');
                lightboxImg.setAttribute('src', imgSrc);
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden'; // Prevent background scrolling
            });
        });

        const closeLightbox = () => {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        };

        lightboxClose.addEventListener('click', closeLightbox);
        
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                closeLightbox();
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightbox.classList.contains('active')) {
                closeLightbox();
            }
        });
    }

    // --- Update active nav link based on current page ---
    const currentLocation = location.pathname.split('/').pop();
    const navAnchors = document.querySelectorAll('.nav-links a');
    
    navAnchors.forEach(a => {
        const href = a.getAttribute('href');
        // If we are at root or index.html, home is active
        if ((currentLocation === '' || currentLocation === 'index.html') && href === 'index.html') {
            a.classList.add('active');
        } else if (currentLocation === href) {
            a.classList.add('active');
        }
    });
});

// Cake Gallery Modal
function openCakeGallery(e) {
    if (e) e.preventDefault();
    document.getElementById('cake-gallery-modal').classList.add('show');
    document.body.style.overflow = 'hidden'; // prevent background scrolling
}

function closeCakeGallery() {
    document.getElementById('cake-gallery-modal').classList.remove('show');
    document.body.style.overflow = 'auto'; // enable background scrolling
}

// Close modal if clicking outside the content box
window.addEventListener('click', function(e) {
    let modal = document.getElementById('cake-gallery-modal');
    if (e.target == modal) {
        closeCakeGallery();
    }
});
