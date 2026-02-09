/*

toggle.addEventListener("click", () => {
  menu.classList.toggle("active");
}); */

//*************************** Service Dropdown ******************************/
document.addEventListener('DOMContentLoaded', () => {
    // Select the link that has the dropdown
    const servicesLink = document.querySelector('.ix-has-dropdown > a');
    const megaMenu = document.querySelector('.ix-mega-dropdown');

    // This logic applies to TABLETS (768px) AND MOBILE (480px)
    // "innerWidth <= 768" covers everything smaller, including 480px.
    if (window.innerWidth <= 768 && servicesLink) {
        
        servicesLink.addEventListener('click', (e) => {
            
            // CHECK: Did user click the ARROW icon?
            // (We look for the class 'ix-arrow-toggle' we added in HTML)
            if (e.target.closest('.ix-arrow-toggle')) {
                
                // YES -> User clicked arrow. Toggle the menu.
                e.preventDefault();    // Don't go to the URL
                e.stopPropagation();   // Don't bubble up
                
                const isOpen = megaMenu.style.display === 'block';
                megaMenu.style.display = isOpen ? 'none' : 'block';
                
            } else {
                // NO -> User clicked the text "Our Services".
                // Do NOTHING here. Let the browser go to "services.html" naturally.
            }
        });
    }
});

// ******************************Responsive Service Dropdowmn**********************//
const toggle = document.getElementById("ixToggle");
const menu = document.querySelector(".ix-nav-menu");

toggle.addEventListener("click", (e) => {
  e.stopPropagation();
  menu.classList.toggle("active");
  // Prevents background website from scrolling while menu is open
  document.body.classList.toggle("ix-menu-open");
});

// Closes menu if you click outside of it
document.addEventListener("click", (e) => {
  if (menu.classList.contains("active") && !menu.contains(e.target) && e.target !== toggle) {
    menu.classList.remove("active");
    document.body.classList.remove("ix-menu-open");
  }
});

//********************************Floating Trust Anchor Stats JS *************/
/***************** Stats Counter Animation *******************************/
/***************** Stats Counter Animation *******************************/
document.addEventListener('DOMContentLoaded', () => {
    const statsSection = document.querySelector('.ix-stats-wrapper');
    const counters = document.querySelectorAll('.ix-stat-number');
    
    const countOptions = {
        threshold: 0.3 // Starts when 30% of the bar is visible
    };

    const startCounter = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(counter => {
                    const updateCount = () => {
                        const target = +counter.getAttribute('data-target');
                        const count = +counter.innerText.replace(/\D/g, ''); // Get current number only
                        
                        // Professional speed: higher targets count faster
                        const increment = target / 30; 

                        if (count < target) {
                            const currentVal = Math.ceil(count + increment);
                            // Detect if it's a percentage or a plus stat
                            const symbol = counter.innerHTML.includes('%') ? '%' : '+';
                            counter.innerHTML = `${currentVal > target ? target : currentVal}<span>${symbol}</span>`;
                            setTimeout(updateCount, 40);
                        } else {
                            const symbol = counter.innerHTML.includes('%') ? '%' : '+';
                            counter.innerHTML = `${target}<span>${symbol}</span>`;
                        }
                    };
                    updateCount();
                });
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(startCounter, countOptions);
    if(statsSection) observer.observe(statsSection);
});

/***************** Our Services Js Code Start *******************************/
// Wrap everything in a loader to ensure HTML is ready
document.addEventListener('DOMContentLoaded', function() {

    const servicesDB = {
        lmpc: [
            { title: 'Importer Registration', icon: 'fa-file-signature', desc: 'Complete LMPC registration for importers dealing with packaged commodities and pre-packaged goods.' },
            { title: 'Non-standard Approval', icon: 'fa-ruler-combined', desc: 'Approval services for non-standard weights and measurements in compliance with Legal Metrology Act.' }
        ],
        customs: [
            { title: 'Import & Export Clearance', icon: 'fa-truck-loading', desc: 'Complete customs clearance services for smooth import and export operations.' },
            { title: 'Documentation Support', icon: 'fa-folder-open', desc: 'Comprehensive documentation preparation and submission support for customs procedures.' },
            { title: 'Port Clearance Assistance', icon: 'fa-anchor', desc: 'Expert assistance for port clearance formalities and cargo handling procedures.' }
        ],
        compliance: [
            { title: 'IEC Registration', icon: 'fa-earth-americas', desc: 'IEC registration for businesses engaging in import and export activities.' },
            { title: 'BIS Certification', icon: 'fa-certificate', desc: 'BIS certification for products to meet Indian quality standards and regulations.' },
            { title: 'WPC/ETA Approval', icon: 'fa-signal', desc: 'Wireless Planning and Coordination and Equipment Type Approval for telecom equipment.' }
        ],
        legal: [
            { title: 'Company Incorporation', icon: 'fa-building', desc: 'Complete company registration services for all types of business entities.' },
            { title: 'GST Registration', icon: 'fa-percent', desc: 'GST registration and monthly/quarterly return filing services for businesses.' },
            { title: 'Trademark & IPR', icon: 'fa-registered', desc: 'Comprehensive trademark registration and intellectual property protection services.' }
        ],
        licensing: [
            { title: 'FSSAI License', icon: 'fa-utensils', desc: 'Food Safety and Standards Authority of India licensing for food businesses.' },
            { title: 'APEDA/RCMC', icon: 'fa-wheat-awn', desc: 'Agricultural Products Export Development Authority and Registration cum Membership Certificate.' },
            { title: 'Drug & Pharma Licensing', icon: 'fa-pills', desc: 'Comprehensive licensing solutions for pharmaceutical and drug manufacturing businesses.' }
        ],
        consultancy: [
            { title: 'Business Setup', icon: 'fa-lightbulb', desc: 'End-to-end business setup guidance including legal structure, licenses, and compliance.' },
            { title: 'Regulatory Advisory', icon: 'fa-gavel', desc: 'Expert advisory services for maintaining regulatory compliance across various sectors.' },
            { title: 'Trade Advisory', icon: 'fa-handshake', desc: 'Strategic advisory services for import-export businesses and international trade operations.' }
        ]
    };

    const menuItems = document.querySelectorAll('.ix-cat-item');
    const portal = document.getElementById('services-portal');

    // DEBUG: Check if portal exists
    if (!portal) {
        console.error("Error: Could not find the element with ID 'services-portal'. Check your HTML.");
        return;
    }

    function renderServices(category) {
        const services = servicesDB[category];
        
        // Clear portal
        portal.innerHTML = ''; 

        if (!services) {
            portal.innerHTML = '<p>No services found for this category.</p>';
            return;
        }

        services.forEach((item, index) => {
            const card = document.createElement('div');
            card.className = 'ix-service-card';
            // Add a slight delay for each card for an elite feel
            card.style.animationDelay = (index * 0.1) + 's'; 
            card.innerHTML = `
                <i class="fa-solid ${item.icon}"></i>
                <h3>${item.title}</h3>
                <p>${item.desc}</p>
            `;
            portal.appendChild(card);
        });
    }

    // Add Click Events
    menuItems.forEach(item => {
        item.addEventListener('click', function() {
            // 1. Remove active class from all
            menuItems.forEach(i => i.classList.remove('active'));
            
            // 2. Add active to clicked
            this.classList.add('active');

            // 3. Get category key and render
            const selectedCat = this.getAttribute('data-cat');
            console.log("Category clicked:", selectedCat); // Check console for this
            renderServices(selectedCat);
        });
    });

    // Run first time for LMPC
    renderServices('lmpc');
});

// Blog Page Filtering JS CODE
document.addEventListener('DOMContentLoaded', () => {
    const filterBtns = document.querySelectorAll('.bg-cat-btn');
    const articles = document.querySelectorAll('.bg-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            articles.forEach(article => {
                if (filter === 'all' || article.getAttribute('data-category') === filter) {
                    article.style.display = 'grid';
                    article.style.animation = 'fadeInUp 0.5s ease forwards';
                } else {
                    article.style.display = 'none';
                }
            });
        });
    });
});

// LMPC JS CODE 
const reveal = document.querySelectorAll('.card,.service-card,.step');

const obs = new IntersectionObserver(entries=>{
  entries.forEach(e=>{
    if(e.isIntersecting){
      e.target.style.opacity=1;
      e.target.style.transform="translateY(0)";
    }
  })
},{threshold:.15});

reveal.forEach(el=>{
  el.style.opacity=0;
  el.style.transform="translateY(30px)";
  obs.observe(el);
});


// OUR SERVICES PAGE JS CODE

// ================= PG-SERVICES INITIALIZATION ================= 
document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true
        });
    }

    // Smooth scroll for internal category links if needed
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 150,
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Privacy Policy and Terms and Conditions Js Code
document.addEventListener('DOMContentLoaded', () => {
    // Smooth scrolling for sidebar links
    const policyLinks = document.querySelectorAll('.pg-legal-widget a');
    policyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if(href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if(target) {
                    window.scrollTo({
                        top: target.offsetTop - 150,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
});

// Business Trade Compliance JS Code 
//  IEC banner 
const bannerReveal = document.querySelector('.pg-biz-comp-process-banner');
if(bannerReveal) {
    bannerReveal.style.opacity = 0;
    bannerReveal.style.transform = "translateY(30px)";
    bannerReveal.style.transition = "0.8s ease-out";
    obs.observe(bannerReveal); // Uses your existing 'obs' intersection observer
}

// BLOG PAGE  JS CODE 
// Understanding Cyber crime laws js //
/* ================= ARTICLE SCROLLING ================= */
document.addEventListener('DOMContentLoaded', () => {
    // Add active state to blog in nav if current page
    if(window.location.href.includes('blog-')) {
        const blogLink = document.querySelector('.nav-link[href="blog.html"]');
        if(blogLink) blogLink.classList.add('active');
    }
});

// BLOG GST UPDATES 2025 JS CODE
/* ================= GST ARTICLE LOGIC ================= */
document.addEventListener('DOMContentLoaded', () => {
    // Scroll handling for smooth navigation
    const blogLinks = document.querySelectorAll('.pg-gst-art-related-item a');
    blogLinks.forEach(link => {
        link.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
});



// ================= BANNER SLIDER ================= 
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.ix-slide');
    const dots = document.querySelectorAll('.ix-dot');
    const prevBtn = document.querySelector('.ix-slider-prev');
    const nextBtn = document.querySelector('.ix-slider-next');
    
    if (!slides.length) return; // Exit if no slider on page
    
    let currentSlide = 0;
    const totalSlides = slides.length;
    const slideInterval = 5000; // 5 seconds per slide
    let autoPlayTimer;

    function showSlide(index) {
        // Remove active class from all
        slides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        // Add active to current
        slides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        showSlide(currentSlide);
    }

    function goToSlide(index) {
        currentSlide = index;
        showSlide(currentSlide);
    }

    function startAutoPlay() {
        autoPlayTimer = setInterval(nextSlide, slideInterval);
    }

    function stopAutoPlay() {
        clearInterval(autoPlayTimer);
    }

    function resetAutoPlay() {
        stopAutoPlay();
        startAutoPlay();
    }

    // Event Listeners
    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            nextSlide();
            resetAutoPlay();
        });
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            prevSlide();
            resetAutoPlay();
        });
    }

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            goToSlide(index);
            resetAutoPlay();
        });
    });

    // Pause on hover
    const sliderWrapper = document.querySelector('.ix-slider-wrapper');
    if (sliderWrapper) {
        sliderWrapper.addEventListener('mouseenter', stopAutoPlay);
        sliderWrapper.addEventListener('mouseleave', startAutoPlay);
    }

    // Start autoplay
    startAutoPlay();
});

