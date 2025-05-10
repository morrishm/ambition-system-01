document.addEventListener('DOMContentLoaded', function() {
    const NAV_BREAKPOINT = 768;

    // Hamburger Menu Toggle Start
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            const isActive = hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            hamburger.setAttribute('aria-expanded', isActive);

            if (isActive) {
                document.body.style.overflow = "hidden";
            } else {
                document.body.style.overflow = "auto";
                document.querySelectorAll('.nav-item.dropdown.open').forEach(openItem => {
                    openItem.classList.remove('open');
                    const toggle = openItem.querySelector('.nav-link');
                    if (toggle) toggle.setAttribute('aria-expanded', 'false');
                });
            }
        });
    } else {
        console.warn("Hamburger or NavMenu element not found.");
    }
    // Hamburger Menu Toggle End

    // Close menu on link click Start
    document.querySelectorAll(".nav-menu .nav-link:not(.dropdown > .nav-link)").forEach(n => n.addEventListener("click", () => {
        if (navMenu && navMenu.classList.contains("active")) {
            if (hamburger) hamburger.classList.remove("active");
            if (hamburger) hamburger.setAttribute('aria-expanded', 'false');
            navMenu.classList.remove("active");
            document.body.style.overflow = "auto";
        }
    }));
    // Close menu on link click End

    // Mobile Dropdown Toggle Logic Start
    const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(event) {
            if (window.matchMedia(`(max-width: ${NAV_BREAKPOINT}px)`).matches) {
                event.preventDefault();
                const parentItem = this.parentElement;
                if (!parentItem) return;
                const currentlyOpen = parentItem.classList.contains('open');
                document.querySelectorAll('.nav-item.dropdown.open').forEach(openItem => {
                    if (openItem !== parentItem) {
                        openItem.classList.remove('open');
                        const otherToggle = openItem.querySelector('.nav-link');
                        if (otherToggle) otherToggle.setAttribute('aria-expanded', 'false');
                    }
                });
                parentItem.classList.toggle('open', !currentlyOpen);
                this.setAttribute('aria-expanded', String(!currentlyOpen));
            }
        });
    });
    // Mobile Dropdown Toggle Logic End

    // Hero Slider Logic Start
    const slides = document.querySelectorAll(".hero-slide");
    const prevButton = document.querySelector(".prev-slide");
    const nextButton = document.querySelector(".next-slide");
    const dotsContainer = document.querySelector(".slider-dots");

    let currentSlide = 0;
    const SLIDE_DURATION = 4500;
    let sliderIntervalId = null;

    // function updateDots() { /* DOTS_REMOVED */ }

    function showSlide(index, manualNavigation = false) {
        if (slides.length === 0) return;
        const newIndex = (index % slides.length + slides.length) % slides.length;
        slides.forEach((slide, i) => {
            slide.classList.toggle("active-slide", i === newIndex);
        });
        currentSlide = newIndex;
        // updateDots(); // DOTS_REMOVED
        if (manualNavigation) {
            stopSliderAutoplay();
            startSliderAutoplay();
        }
    }

    function nextSlideFunc() { showSlide(currentSlide + 1); }
    function prevSlideFunc() { showSlide(currentSlide - 1); }
    // function goToSlide(index) { showSlide(index, true); } // DOTS_REMOVED (as it was mainly for dot clicks)

    // function createDots() { /* DOTS_REMOVED: This entire function block related to creating dots is removed/commented out. */ }

    function startSliderAutoplay() {
        stopSliderAutoplay();
        if (document.visibilityState === "visible" && slides.length > 1) {
            sliderIntervalId = setInterval(nextSlideFunc, SLIDE_DURATION);
        }
    }

    function stopSliderAutoplay() {
        clearInterval(sliderIntervalId);
        sliderIntervalId = null;
    }

    if (slides.length > 0) {
        // createDots(); // DOTS_REMOVED
        if (dotsContainer) {
            dotsContainer.style.display = 'none'; // DOTS_REMOVED: Hide the container if it exists
        }

        let initialSlideIndex = 0;
        slides.forEach((slide, index) => {
            if (slide.classList.contains('active-slide')) {
                initialSlideIndex = index;
            } else {
                slide.classList.remove('active-slide');
            }
        });
        if (!slides[initialSlideIndex] || !slides[initialSlideIndex].classList.contains('active-slide')) {
            slides.forEach(s => s.classList.remove('active-slide'));
            initialSlideIndex = 0;
            if (slides[0]) slides[0].classList.add('active-slide');
        }
        showSlide(initialSlideIndex);

        if (slides.length > 1) {
            startSliderAutoplay();
            if (prevButton) { prevButton.addEventListener("click", prevSlideFunc); }
            else { console.warn("Prev slide button not found."); }
            if (nextButton) { nextButton.addEventListener("click", nextSlideFunc); }
            else { console.warn("Next slide button not found."); }

            const pauseElementsQuery = ['.hero-buttons .btn', '#domainNameInput', '#domainSearchButton', '.tld-item'];
            let pauseElements = [];
            pauseElementsQuery.forEach(selector => {
                document.querySelectorAll(selector).forEach(el => pauseElements.push(el));
            });
            if(prevButton) pauseElements.push(prevButton);
            if(nextButton) pauseElements.push(nextButton);
            // if(dotsContainer) pauseElements.push(dotsContainer); // DOTS_REMOVED

            pauseElements.forEach(element => {
                if (element) {
                    element.addEventListener('mouseenter', stopSliderAutoplay);
                    element.addEventListener('focus', stopSliderAutoplay);
                    element.addEventListener('mouseleave', startSliderAutoplay);
                    element.addEventListener('blur', startSliderAutoplay);
                }
            });
        } else {
            if (prevButton) prevButton.style.display = 'none';
            if (nextButton) nextButton.style.display = 'none';
            // if (dotsContainer) dotsContainer.style.display = 'none'; // Already handled above
        }
    } else {
        console.warn("No hero slides found.");
        if (prevButton) prevButton.style.display = 'none';
        if (nextButton) nextButton.style.display = 'none';
        if (dotsContainer) dotsContainer.style.display = 'none';
    }

    document.addEventListener("visibilitychange", () => {
        if (slides.length > 1) {
            if (document.visibilityState === "hidden") { stopSliderAutoplay(); }
            else { startSliderAutoplay(); }
        }
    });
    // Hero Slider Logic End

    // Simulated Domain Search Logic Start
    const domainInput = document.getElementById('domainNameInput');
    const domainSearchButton = document.getElementById('domainSearchButton');
    const domainResultDiv = document.getElementById('domainSearchResult');

    if (domainSearchButton && domainInput && domainResultDiv) {
        domainSearchButton.addEventListener('click', function() {
            const domainName = domainInput.value.trim().toLowerCase();
            domainResultDiv.textContent = '';
            domainResultDiv.className = 'domain-result-message';
            domainResultDiv.style.display = 'block';
            if (!domainName) {
                domainResultDiv.textContent = 'Please enter a domain name to search.';
                domainResultDiv.classList.add('error'); return;
            }
            if (domainName.length < 3 && !domainName.includes('.')) {
                domainResultDiv.textContent = 'Please enter a valid name (at least 3 chars). Add TLD for specific check.';
                domainResultDiv.classList.add('tip'); return;
            }
            domainResultDiv.textContent = `Checking availability for "${domainName}"...`;
            domainResultDiv.classList.add('checking');
            setTimeout(() => {
                if (domainName.startsWith('taken') || domainName.startsWith('unavailable') || domainName === "example.com") {
                    domainResultDiv.textContent = `Sorry, "${domainName}" is already taken.`;
                    domainResultDiv.classList.remove('checking'); domainResultDiv.classList.add('taken');
                } else if (domainName.includes('.') && domainName.length > 4) {
                    domainResultDiv.textContent = `Congratulations! "${domainName}" is available!`;
                    domainResultDiv.classList.remove('checking'); domainResultDiv.classList.add('available');
                } else {
                    let message = 'Tip: Try adding .com, .in, etc. to your search for specific results.';
                    if (domainName.length < 3) { message = 'Please enter a valid name (at least 3 chars). Add TLD for specific check.'; }
                    domainResultDiv.textContent = message;
                    domainResultDiv.classList.remove('checking'); domainResultDiv.classList.add('tip');
                }
            }, 1500);
        });
    } else {
        console.warn("Domain search elements not found.");
    }
    // Simulated Domain Search Logic End

    // FAQ Accordion Logic Start
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const questionButton = item.querySelector('.faq-question');
        const answerPanel = item.querySelector('.faq-answer');
        if (questionButton && answerPanel) {
            questionButton.addEventListener('click', () => {
                const isExpanded = questionButton.getAttribute('aria-expanded') === 'true';
                questionButton.setAttribute('aria-expanded', String(!isExpanded));
                if (!isExpanded) {
                    answerPanel.style.maxHeight = answerPanel.scrollHeight + "px";
                    answerPanel.style.paddingTop = '0px';
                    answerPanel.style.paddingBottom = '25px';
                } else {
                    answerPanel.style.maxHeight = null;
                    answerPanel.style.paddingTop = '0px';
                    answerPanel.style.paddingBottom = '0px';
                }
            });
        } else {
            if (!questionButton) console.warn("FAQ question button not found in an item:", item);
            if (!answerPanel) console.warn("FAQ answer panel not found in an item:", item);
        }
    });
    // FAQ Accordion Logic End
});