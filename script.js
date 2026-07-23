/**
 * MosoHabit Tuition - Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Elements ---
    const header = document.querySelector('.header');
    const mobileToggle = document.getElementById('mobile-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // --- Sticky & Auto-Hiding Header Scroll Effect ---
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
        const currentScrollY = window.scrollY;

        // Sticky behavior
        if (currentScrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Keep header visible at all times
        header.classList.remove('header-hidden');

        // Avoid negative values from iOS bounce/elastic scroll
        lastScrollY = Math.max(0, currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check


    // --- Mobile Menu Toggle ---
    if (mobileToggle && navMenu) {
        mobileToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            navMenu.classList.toggle('open');
            const isOpen = navMenu.classList.contains('open');
            mobileToggle.innerHTML = isOpen
                ? '<i class="fa-solid fa-xmark"></i>'
                : '<i class="fa-solid fa-bars"></i>';
        });

        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            });
        });

        // Close menu when clicking anywhere outside
        document.addEventListener('click', (e) => {
            if (!navMenu.contains(e.target) && !mobileToggle.contains(e.target)) {
                navMenu.classList.remove('open');
                mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
            }
        });
    }

    // --- Smooth Centered Scroll for Anchor Links ---
    const scrollToSection = (targetId) => {
        if (!targetId || targetId === '#') return;

        if (targetId === '#home') {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            return;
        }

        const targetEl = document.querySelector(targetId);
        if (!targetEl) return;

        const headerEl = document.querySelector('.header');
        const headerHeight = headerEl ? headerEl.offsetHeight : 70;
        const viewportHeight = window.innerHeight;
        const availableHeight = viewportHeight - headerHeight;

        // Measure top of inner content (section-header or container) to exclude empty top padding
        const contentEl = targetEl.querySelector('.section-header') || targetEl.querySelector('.container') || targetEl;
        const rect = contentEl.getBoundingClientRect();
        const elementTop = rect.top + window.scrollY;
        const elementHeight = targetEl.offsetHeight;

        let targetScrollY;

        if (elementHeight < availableHeight) {
            // Section fits within screen -> center it vertically below header
            const verticalMargin = (availableHeight - elementHeight) / 2;
            targetScrollY = elementTop - headerHeight - verticalMargin;
        } else {
            // Section is taller than screen -> align top content badge 24px below fixed header
            targetScrollY = elementTop - headerHeight - 24;
        }

        // Activate reveal elements in target section immediately
        targetEl.querySelectorAll('.reveal').forEach(el => el.classList.add('active'));

        // Clamp targetScrollY to valid document bounds
        const maxScrollY = document.documentElement.scrollHeight - viewportHeight;
        targetScrollY = Math.max(0, Math.min(targetScrollY, maxScrollY));

        window.scrollTo({
            top: targetScrollY,
            behavior: 'smooth'
        });
    };

    // Attach custom smooth scrolling to all anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', (e) => {
            const targetId = anchor.getAttribute('href');
            if (targetId && targetId.startsWith('#') && targetId.length > 1) {
                e.preventDefault();

                if (navMenu && navMenu.classList.contains('open')) {
                    navMenu.classList.remove('open');
                    if (mobileToggle) {
                        mobileToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
                    }
                }

                scrollToSection(targetId);
                history.pushState(null, '', targetId);
            }
        });
    });

    // Handle initial page load with hash
    if (window.location.hash) {
        setTimeout(() => {
            scrollToSection(window.location.hash);
        }, 150);
    }


    // --- Intersection Observer for Active Nav Link ---
    const sections = document.querySelectorAll('section');

    const observerOptions = {
        root: null,
        rootMargin: '-80px 0px -40% 0px', // offset header height
        threshold: 0
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                navLinks.forEach(link => {
                    if (link.getAttribute('href') === `#${id}`) {
                        link.classList.add('active');
                    } else {
                        link.classList.remove('active');
                    }
                });
            }
        });
    }, observerOptions);

    sections.forEach(section => observer.observe(section));


    // --- FAQ Accordion ---
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const trigger = item.querySelector('.faq-trigger');
        const content = item.querySelector('.faq-content');

        if (trigger && content) {
            trigger.addEventListener('click', () => {
                const isActive = item.classList.contains('active');

                // Close all other items
                faqItems.forEach(otherItem => {
                    if (otherItem !== item && otherItem.classList.contains('active')) {
                        otherItem.classList.remove('active');
                        otherItem.querySelector('.faq-content').style.maxHeight = null;
                    }
                });

                // Toggle current item
                if (isActive) {
                    item.classList.remove('active');
                    content.style.maxHeight = null;
                } else {
                    item.classList.add('active');
                    content.style.maxHeight = content.scrollHeight + 40 + 'px';
                }
            });
        }
    });

    // --- Scroll Reveal Animation Observer ---
    const revealElements = document.querySelectorAll('.reveal');

    if (revealElements.length > 0) {
        const revealObserverOptions = {
            root: null,
            rootMargin: '100px 0px 100px 0px',
            threshold: 0
        };

        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, revealObserverOptions);

        revealElements.forEach(el => revealObserver.observe(el));
    }


    // --- Google Form Link Check ---
    const gFormLink = document.getElementById('gform-link');
    if (gFormLink) {
        gFormLink.addEventListener('click', (e) => {
            const url = gFormLink.getAttribute('href');
            if (url.includes('your-google-form-link')) {
                e.preventDefault();
                alert('Congratulations! Your tutoring website is set up. Next, please edit the index.html file (line 427) and replace "https://forms.gle/your-google-form-link" with your actual Google Form sign-up link.');
            }
        });
    }

    // --- Moso Bamboo Growth Logic ---
    const bambooWidget = document.getElementById('bamboo-widget');
    const bambooMinimize = document.getElementById('bamboo-minimize');
    const bambooRestore = document.getElementById('bamboo-restore');
    const progressFill = document.getElementById('bamboo-progress-fill');
    const stateLabel = document.getElementById('bamboo-state-label');

    // Select all path elements
    const rootPaths = document.querySelectorAll('#bamboo-roots path');
    const stalkPaths = document.querySelectorAll('#bamboo-shoot path');

    // Cache path lengths
    const rootLengthsMap = {};
    const stalkLengths = [];

    rootPaths.forEach((path) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        path.style.strokeDashoffset = len;
        rootLengthsMap[path.id] = len;
    });

    // Define growth intervals for each root path to ensure sequential parent-branching growth
    const rootTimeline = {
        'root-main': { start: 0, end: 0.35 },
        'root-left-1': { start: 0.20, end: 0.55 },
        'root-right-1': { start: 0.25, end: 0.60 },
        'root-left-2': { start: 0.40, end: 0.75 },
        'root-right-2': { start: 0.45, end: 0.80 },
        'root-cap-l1': { start: 0.50, end: 0.80 },
        'root-cap-r1': { start: 0.55, end: 0.85 },
        'root-cap-l2': { start: 0.65, end: 0.95 },
        'root-cap-r2': { start: 0.70, end: 0.98 },
        'root-cap-l3': { start: 0.75, end: 1.0 },
        'root-cap-r3': { start: 0.60, end: 0.90 }
    };

    stalkPaths.forEach((path, i) => {
        const len = path.getTotalLength();
        path.style.strokeDasharray = len;
        if (i === 0) {
            path.style.strokeDashoffset = len * 0.75; // 25% visible sprout at start
        } else {
            path.style.strokeDashoffset = len;
        }
        stalkLengths[i] = len;
    });

    // Nodes and leaves elements
    const nodes = Array.from(document.querySelectorAll('#bamboo-shoot ellipse'));
    const leafGroups = Array.from(document.querySelectorAll('#bamboo-leaves g[id^="leaf-group-"]'));

    const updateBambooGrowth = () => {
        const contactSection = document.getElementById('contact');
        const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (scrollHeight <= 0) return;

        // Target scroll ends exactly when user reaches the Booking section (approx 100px before its offsetTop)
        const targetScroll = contactSection ? Math.min(scrollHeight, contactSection.offsetTop - 500) : scrollHeight;
        const scrollPct = Math.min(1, Math.max(0, window.scrollY / Math.max(1, targetScroll)));

        // 1. Update progress bar
        if (progressFill) {
            progressFill.style.width = (scrollPct * 100) + '%';
        }

        // 2. Roots growth (0% to 93% scroll progress)
        const rootProgress = Math.min(1, scrollPct / 0.93);
        rootPaths.forEach((path) => {
            const id = path.id;
            const len = rootLengthsMap[id];
            const config = rootTimeline[id] || { start: 0, end: 1.0 };

            if (rootProgress <= config.start) {
                path.style.strokeDashoffset = len;
            } else if (rootProgress >= config.end) {
                path.style.strokeDashoffset = 0;
            } else {
                const range = config.end - config.start;
                const pathProgress = (rootProgress - config.start) / range;
                path.style.strokeDashoffset = len * (1 - pathProgress);
            }
        });

        // 3. Stalk/Shoot growth (93% to 100% scroll progress - explosive 1-2 months)
        const shootProgress = Math.max(0, (scrollPct - 0.93) / 0.07);
        const totalSegments = stalkPaths.length;

        // Grow segments dynamically
        stalkPaths.forEach((path, idx) => {
            const len = stalkLengths[idx];
            const step = 1 / totalSegments;

            if (idx === 0) {
                // First segment starts 25% grown, grows to 100% over the first step
                if (shootProgress === 0) {
                    path.style.strokeDashoffset = len * 0.75;
                } else if (shootProgress >= step) {
                    path.style.strokeDashoffset = 0;
                } else {
                    const segmentProgress = shootProgress / step;
                    path.style.strokeDashoffset = len * 0.75 * (1 - segmentProgress);
                }
            } else {
                const start = idx * step;
                const end = start + step;

                if (shootProgress <= start) {
                    path.style.strokeDashoffset = len;
                } else if (shootProgress >= end) {
                    path.style.strokeDashoffset = 0;
                } else {
                    const segmentProgress = (shootProgress - start) / step;
                    path.style.strokeDashoffset = len * (1 - segmentProgress);
                }
            }
        });

        // Toggle nodes and leaves dynamically based on segments completion
        nodes.forEach((node, idx) => {
            const threshold = (idx + 1) / totalSegments;
            node.classList.toggle('visible', shootProgress >= threshold);
        });

        leafGroups.forEach((group, idx) => {
            const threshold = (idx + 1) / totalSegments;
            group.classList.toggle('visible', shootProgress >= threshold);
        });

        // 4. Update state description text to match the real-life Moso cycle
        if (stateLabel) {
            if (scrollPct === 0) {
                stateLabel.textContent = "Sprout visible. Scroll to grow roots!";
            } else if (scrollPct < 0.25) {
                stateLabel.textContent = "Year 1: Roots spreading underground...";
            } else if (scrollPct < 0.50) {
                stateLabel.textContent = "Year 2: Anchoring roots deeper...";
            } else if (scrollPct < 0.75) {
                stateLabel.textContent = "Year 3: Expanding root network...";
            } else if (scrollPct < 0.93) {
                stateLabel.textContent = "Year 4: Mass root network finalized.";
            } else if (scrollPct < 0.97) {
                stateLabel.textContent = "Year 5: Sprout breaks ground! 🌱";
            } else if (scrollPct < 1.0) {
                stateLabel.textContent = "Year 5: Explosive vertical growth (80ft)! 🎋";
            } else {
                stateLabel.textContent = "Year 5: Fully mature Moso Bamboo!";
            }
        }
    };

    // Register scroll and resize listeners
    window.addEventListener('scroll', updateBambooGrowth);
    window.addEventListener('resize', updateBambooGrowth);
    updateBambooGrowth(); // Initial state

    // Minimize / Restore UI logic
    const bambooRestoreWrapper = document.getElementById('bamboo-restore-wrapper');

    if (bambooMinimize && bambooWidget) {
        bambooMinimize.addEventListener('click', () => {
            bambooWidget.classList.add('minimized');
            if (bambooRestoreWrapper) {
                bambooRestoreWrapper.classList.add('visible');
            } else if (bambooRestore) {
                bambooRestore.classList.add('visible');
            }
        });
    }

    if (bambooRestore && bambooWidget) {
        bambooRestore.addEventListener('click', () => {
            bambooWidget.classList.remove('minimized');
            if (bambooRestoreWrapper) {
                bambooRestoreWrapper.classList.remove('visible');
            } else {
                bambooRestore.classList.remove('visible');
            }
        });
    }
});
