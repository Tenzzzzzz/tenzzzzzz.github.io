// ═══════════════════════════════════════════════════════════
// GITBOOK STYLE - JavaScript
// ═══════════════════════════════════════════════════════════

document.addEventListener('DOMContentLoaded', function() {
    initThemeToggle();
    initMobileMenu();
    initCollapsibleSections();
    initTOCHighlight();
    initSearch();
});

// ═══════════════════════════════════════════════════════════
// THEME TOGGLE
// ═══════════════════════════════════════════════════════════

function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        document.body.classList.add('dark-theme');
        if (sunIcon) sunIcon.style.display = 'none';
        if (moonIcon) moonIcon.style.display = 'block';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            if (sunIcon && moonIcon) {
                sunIcon.style.display = isDark ? 'none' : 'block';
                moonIcon.style.display = isDark ? 'block' : 'none';
            }
        });
    }
}

// ═══════════════════════════════════════════════════════════
// MOBILE MENU
// ═══════════════════════════════════════════════════════════

function initMobileMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('sidebarOverlay');

    if (menuToggle && sidebar) {
        menuToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            if (overlay) overlay.classList.toggle('active');
        });

        if (overlay) {
            overlay.addEventListener('click', function() {
                sidebar.classList.remove('open');
                overlay.classList.remove('active');
            });
        }

        // Close sidebar when clicking a link (mobile)
        const sidebarLinks = sidebar.querySelectorAll('.nav-item');
        sidebarLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                if (window.innerWidth <= 768) {
                    sidebar.classList.remove('open');
                    if (overlay) overlay.classList.remove('active');
                }
            });
        });
    }
}

// ═══════════════════════════════════════════════════════════
// COLLAPSIBLE SECTIONS
// ═══════════════════════════════════════════════════════════

function initCollapsibleSections() {
    const toggles = document.querySelectorAll('.nav-section-toggle');

    toggles.forEach(function(toggle) {
        const navList = toggle.closest('.nav-section').querySelector('.nav-list');
        
        // Check if any child is active
        if (navList && navList.querySelector('.nav-item.active')) {
            toggle.classList.remove('collapsed');
            navList.classList.remove('collapsed');
        }

        toggle.addEventListener('click', function() {
            this.classList.toggle('collapsed');
            if (navList) {
                navList.classList.toggle('collapsed');
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════
// TABLE OF CONTENTS HIGHLIGHT
// ═══════════════════════════════════════════════════════════

function initTOCHighlight() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    if (tocLinks.length === 0) return;

    const headings = [];

    tocLinks.forEach(function(link) {
        const href = link.getAttribute('href');
        if (href && href.startsWith('#')) {
            const heading = document.getElementById(href.substring(1));
            if (heading) {
                headings.push({ element: heading, link: link });
            }
        }
    });

    if (headings.length === 0) return;

    function highlightTOC() {
        const scrollPosition = window.scrollY + 100;
        let currentHeading = null;

        headings.forEach(function(item) {
            if (item.element.offsetTop <= scrollPosition) {
                currentHeading = item;
            }
        });

        tocLinks.forEach(function(link) {
            link.classList.remove('active');
        });

        if (currentHeading) {
            currentHeading.link.classList.add('active');
        }
    }

    let ticking = false;
    window.addEventListener('scroll', function() {
        if (!ticking) {
            window.requestAnimationFrame(function() {
                highlightTOC();
                ticking = false;
            });
            ticking = true;
        }
    });

    highlightTOC();

    // Smooth scroll for TOC links
    tocLinks.forEach(function(link) {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);
            
            if (targetElement) {
                const offset = 80;
                const targetPosition = targetElement.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ═══════════════════════════════════════════════════════════
// SEARCH (Basic client-side)
// ═══════════════════════════════════════════════════════════

function initSearch() {
    const searchInput = document.getElementById('searchInput');
    const navItems = document.querySelectorAll('.sidebar-nav .nav-item');

    if (searchInput && navItems.length > 0) {
        searchInput.addEventListener('input', function() {
            const query = this.value.toLowerCase().trim();

            navItems.forEach(function(item) {
                const text = item.textContent.toLowerCase();
                const parent = item.closest('.nav-section') || item.parentElement;
                
                if (query === '') {
                    item.style.display = '';
                    if (parent) parent.style.display = '';
                } else if (text.includes(query)) {
                    item.style.display = '';
                    if (parent) parent.style.display = '';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }
}