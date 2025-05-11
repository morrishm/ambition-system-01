// Typing Animation for Hero Headline - Start
document.addEventListener('DOMContentLoaded', function() {
    const headlineElement = document.getElementById('empireHeadline');
    // const textToType = "Build Your Hosting Empire. We'll Power It."; // Original
    const textToType = "Build Your Hosting Empire. We'll Power It."; // Keep as is for now, CSS will try to keep it one line
    const typingSpeed = 75; // Milliseconds per character (WAS 100)
    const initialDelay = 500;
    let charIndex = 0;

    function type() {
        if (charIndex < textToType.length) {
            if (charIndex === 0) {
                headlineElement.innerHTML = ''; 
            }
            headlineElement.innerHTML += textToType.charAt(charIndex);
            charIndex++;
            setTimeout(type, typingSpeed);
        } else {
            headlineElement.innerHTML += '<span class="typing-cursor" aria-hidden="true"></span>';
        }
    }

    if (headlineElement) {
        setTimeout(() => {
            headlineElement.innerHTML = '';
            type();
        }, initialDelay);
    }
});
// Typing Animation for Hero Headline - End

// Navbar Mobile Menu Toggle (Copy from previous response if needed) - Start
// ... (Your existing or previously provided navbar JS)
const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");
const navLinks = document.querySelectorAll(".nav-menu .nav-link");

function mobileMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
        if (navMenu.classList.contains("active")) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    }
}

function closeMenu() {
    if (hamburger && navMenu) {
        hamburger.classList.remove("active");
        navMenu.classList.remove("active");
        document.body.style.overflow = 'auto';
    }
}

if (hamburger) {
    hamburger.addEventListener("click", mobileMenu);
}

navLinks.forEach(n => n.addEventListener("click", () => {
    const parentNavItem = n.closest('.nav-item');
    if (parentNavItem && parentNavItem.classList.contains('dropdown')) {
        // Logic for dropdowns, if a link inside a dropdown is clicked, close menu.
        // If a top-level dropdown toggle is clicked, let the dropdown logic handle it.
        if (!n.nextElementSibling || !n.nextElementSibling.classList.contains('dropdown-menu')) {
            if(window.innerWidth <= 768) {
                 const isDropdownToggle = n.classList.contains('nav-link') && n.parentElement.classList.contains('dropdown');
                if (!isDropdownToggle || (isDropdownToggle && n.getAttribute('aria-expanded') === 'false')) {
                    // closeMenu(); // Potentially aggressive closing
                }
            }
        }
    } else {
        if(window.innerWidth <= 768) {
          closeMenu();
        }
    }
}));

const dropdownToggles = document.querySelectorAll('.nav-item.dropdown > .nav-link');
dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', function(event) {
        event.preventDefault();
        const parentItem = this.parentElement;
        const dropdownMenu = this.nextElementSibling;

        if (parentItem.classList.contains('open')) {
            parentItem.classList.remove('open');
            this.setAttribute('aria-expanded', 'false');
            if(dropdownMenu) dropdownMenu.style.display = 'none';
        } else {
            document.querySelectorAll('.nav-item.dropdown.open').forEach(openDropdown => {
                if (openDropdown !== parentItem) {
                    openDropdown.classList.remove('open');
                    openDropdown.querySelector('.nav-link').setAttribute('aria-expanded', 'false');
                    const otherMenu = openDropdown.querySelector('.dropdown-menu');
                    if(otherMenu) otherMenu.style.display = 'none';
                }
            });
            parentItem.classList.add('open');
            this.setAttribute('aria-expanded', 'true');
            if(dropdownMenu) dropdownMenu.style.display = 'block';
        }
    });
});
// Navbar Mobile Menu Toggle - End


// Reseller Pricing Toggle and Cut Price - Start
document.addEventListener('DOMContentLoaded', function() {
    const toggleButtons = document.querySelectorAll('.pricing-toggle .toggle-btn');
    const pricingCards = document.querySelectorAll('.pricing-card');

    function updatePrices(period) {
        pricingCards.forEach(card => {
            const priceValueElement = card.querySelector('.plan-price .price-value');
            const periodElement = card.querySelector('.plan-price .period');
            const originalPriceElement = card.querySelector('.plan-price .original-price');

            if (priceValueElement && periodElement) {
                const monthlyPrice = priceValueElement.dataset.monthly;
                const yearlyPrice = priceValueElement.dataset.yearly;

                if (period === 'monthly') {
                    priceValueElement.textContent = monthlyPrice;
                    periodElement.textContent = '/month';
                    if (originalPriceElement) {
                        const originalMonthly = originalPriceElement.dataset.monthly;
                        if (originalMonthly && originalMonthly !== monthlyPrice) {
                            originalPriceElement.textContent = '₹' + originalMonthly;
                        } else {
                            originalPriceElement.textContent = ''; // Clear if no distinct original monthly
                        }
                    }
                } else if (period === 'yearly') {
                    priceValueElement.textContent = yearlyPrice;
                    periodElement.textContent = '/year';
                     if (originalPriceElement) {
                        const originalYearly = originalPriceElement.dataset.yearly;
                         if (originalYearly && originalYearly !== yearlyPrice) {
                            originalPriceElement.textContent = '₹' + originalYearly;
                        } else {
                            originalPriceElement.textContent = ''; // Clear if no distinct original yearly
                        }
                    }
                }
            }
        });
    }

    toggleButtons.forEach(button => {
        button.addEventListener('click', function() {
            toggleButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            const selectedPeriod = this.dataset.period;
            updatePrices(selectedPeriod);
        });
    });

    // Initialize prices to monthly and set original prices
    updatePrices('monthly');
});
// Reseller Pricing Toggle and Cut Price - End

// Scroll Animation for Pricing Cards - Start
document.addEventListener('DOMContentLoaded', function() {
    const cards = document.querySelectorAll('.animate-on-scroll');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Optional: Stop observing once visible
            }
        });
    }, {
        threshold: 0.1 // Trigger when 10% of the element is visible
    });

    cards.forEach(card => {
        observer.observe(card);
    });
});
// Scroll Animation for Pricing Cards - End


// How It Works Section - Scroll Animation - Start
document.addEventListener('DOMContentLoaded', function() {
    const stepsAndConnectors = document.querySelectorAll('.animate-step');

    const stepObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // stepObserver.unobserve(entry.target); // Optional: keep observing if you want re-animation on scroll up/down
            } else {
                // Optional: Remove 'visible' class if you want re-animation when scrolling out of view
                // entry.target.classList.remove('visible'); 
            }
        });
    }, {
        threshold: 0.2 // Trigger when 20% of the element is visible
    });

    stepsAndConnectors.forEach(element => {
        stepObserver.observe(element);
    });
});
// How It Works Section - Scroll Animation - End


// Reseller Profit Calculator Logic - Start (Updated for new class names)
document.addEventListener('DOMContentLoaded', function () {
    const numClientsSlider = document.getElementById('numClients');
    const numClientsValueDisplay = document.getElementById('numClientsValue'); // Class was slider-value
    const avgPriceSlider = document.getElementById('avgPrice');
    const avgPriceValueDisplay = document.getElementById('avgPriceValue'); // Class was slider-value
    const morrishPlanSelector = document.getElementById('morrishPlanCost');
    const morrishPlanCostDisplay = document.getElementById('morrishPlanCostValue'); // New element for plan cost display

    const estimatedRevenueDisplay = document.getElementById('estimatedRevenue');
    const planCostDisplayElement = document.getElementById('planCostDisplay'); // Renamed for clarity
    const estimatedProfitDisplay = document.getElementById('estimatedProfit');

    function formatCurrency(value) {
        return '₹' + parseInt(value).toLocaleString('en-IN');
    }

    function calculateProfit() {
        const clients = parseInt(numClientsSlider.value);
        const pricePerClient = parseInt(avgPriceSlider.value);
        const planCost = parseInt(morrishPlanSelector.value);

        const revenue = clients * pricePerClient;
        const profit = revenue - planCost;

        if (estimatedRevenueDisplay) estimatedRevenueDisplay.textContent = formatCurrency(revenue);
        if (planCostDisplayElement) planCostDisplayElement.textContent = formatCurrency(planCost); // Updated element
        if (estimatedProfitDisplay) estimatedProfitDisplay.textContent = formatCurrency(profit);

        // Update display values for sliders/select
        if (numClientsValueDisplay) {
            numClientsValueDisplay.textContent = clients + ' Clients';
        }
        if (avgPriceValueDisplay) {
            avgPriceValueDisplay.textContent = formatCurrency(pricePerClient);
        }
        if (morrishPlanCostDisplay) { // Update the separate plan cost display
             morrishPlanCostDisplay.textContent = 'Approx. ' + formatCurrency(planCost);
        }
    }

    // Add event listeners
    if (numClientsSlider) numClientsSlider.addEventListener('input', calculateProfit);
    if (avgPriceSlider) avgPriceSlider.addEventListener('input', calculateProfit);
    if (morrishPlanSelector) morrishPlanSelector.addEventListener('change', calculateProfit);

    // Initial calculation on page load
    if (numClientsSlider && avgPriceSlider && morrishPlanSelector) {
      calculateProfit();
    }

    // Animation for the calculator wrapper
    const calculatorWrapper = document.querySelector('.animate-calculator');
    if (calculatorWrapper) {
        const calculatorObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                } else {
                    // entry.target.classList.remove('visible'); // Optional: for re-animation
                }
            });
        }, { threshold: 0.2 });
        calculatorObserver.observe(calculatorWrapper);
    }
});
// Reseller Profit Calculator Logic - End

document.addEventListener('DOMContentLoaded', function () {
    const sliderWrapper = document.querySelector('.testimonial-slider-wrapper');
    const track = document.querySelector('.testimonial-track');
    
    if (!track || !sliderWrapper) {
        // console.warn("Testimonial slider or track not found. Skipping slider initialization.");
        return;
    }

    let originalCardsHTML = track.innerHTML; // Store original cards
    let animationFrameId = null;
    let cardWidthPlusMargin = 0;
    let totalWidthOfOriginals = 0;
    let currentPosition = 0;
    const SCROLL_SPEED = 0.7; // Adjust for faster/slower scroll

    function setupSlider() {
        // Stop any existing animation
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }

        // Reset track content and position
        track.innerHTML = originalCardsHTML;
        track.style.transform = 'translateX(0px)';
        currentPosition = 0;

        const cards = Array.from(track.children);
        if (cards.length === 0) return;

        // Calculate card width (including margin)
        const firstCard = cards[0];
        const cardStyle = getComputedStyle(firstCard);
        cardWidthPlusMargin = firstCard.offsetWidth + parseInt(cardStyle.marginRight);
        
        totalWidthOfOriginals = cards.length * cardWidthPlusMargin;

        // Duplicate cards for seamless loop
        // Only duplicate if total width of originals is less than viewport * some factor (e.g., 2)
        // to avoid excessive DOM elements if few cards naturally fill the screen
        let wrapperWidth = sliderWrapper.offsetWidth;
        if (totalWidthOfOriginals > 0 && totalWidthOfOriginals < wrapperWidth * 2.5) {
            let currentTotalWidth = totalWidthOfOriginals;
            // Add clones until the track is sufficiently long for smooth scrolling
            while (currentTotalWidth < wrapperWidth * 3) { // Ensure enough clones for smooth loop
                cards.forEach(card => {
                    track.appendChild(card.cloneNode(true));
                });
                currentTotalWidth += totalWidthOfOriginals;
            }
        }
        
        track.style.width = `${Array.from(track.children).length * cardWidthPlusMargin}px`;
        
        startScrolling();
    }

    function scrollAnimation() {
        currentPosition -= SCROLL_SPEED;
        if (totalWidthOfOriginals > 0 && Math.abs(currentPosition) >= totalWidthOfOriginals) {
            currentPosition += totalWidthOfOriginals; // Jump back smoothly
        }
        track.style.transform = `translateX(${currentPosition}px)`;
        animationFrameId = requestAnimationFrame(scrollAnimation);
    }

    function startScrolling() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        animationFrameId = requestAnimationFrame(scrollAnimation);
    }

    function stopScrolling() {
        if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
            animationFrameId = null;
        }
    }
    
    sliderWrapper.addEventListener('mouseenter', stopScrolling);
    sliderWrapper.addEventListener('mouseleave', startScrolling);
    
    // For touch devices, you might want to stop on touchstart and resume on touchend
    sliderWrapper.addEventListener('touchstart', stopScrolling, { passive: true });
    sliderWrapper.addEventListener('touchend', startScrolling);


    // Re-setup on resize (debounced)
    let resizeTimeout;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(setupSlider, 250);
    });

    // Initial setup
    setupSlider();
});




// Reseller Journey Map Section - Progressive Path Drawing - Start
document.addEventListener('DOMContentLoaded', function () {
    const journeyWrapper = document.querySelector('.journey-map-section .journey-wrapper');
    const svgPathElement = document.querySelector('.journey-map-section .journey-path-svg');
    const journeyLine = document.querySelector('.journey-map-section .journey-line');
    const milestones = Array.from(document.querySelectorAll('.journey-map-section .milestone'));

    if (!journeyWrapper || !svgPathElement || !journeyLine || milestones.length === 0) {
        console.warn("Journey Map elements not found. Skipping animation.");
        return;
    }

    let milestoneScreenPositions = []; // Stores {y: position, lengthSoFar: pathLengthToThisPoint}
    let totalPathLength = 0;
    let pathPoints = []; // Stores [{x,y}, {x,y}, ...] for drawing the path

    function getElementCenter(el) {
        const rect = el.getBoundingClientRect();
        // Get position relative to the journeyWrapper
        const wrapperRect = journeyWrapper.getBoundingClientRect();
        return {
            x: rect.left + rect.width / 2 - wrapperRect.left,
            y: rect.top + rect.height / 2 - wrapperRect.top
        };
    }
    
    function calculatePathData() {
        pathPoints = []; // Clear previous points
        milestoneScreenPositions = []; // Clear previous screen positions

        const wrapperRect = journeyWrapper.getBoundingClientRect();
        const svgWidth = wrapperRect.width;
        let cumulativeHeight = 0; // Used to estimate total SVG height

        // First, position milestone dots absolutely for path calculation
        milestones.forEach((milestone, index) => {
            const dotElement = milestone.querySelector('.milestone-dot');
            const cardElement = milestone.querySelector('.milestone-card'); // For y-pos reference
            const connectorElement = milestone.querySelector('.milestone-connector');

            // Approximate card top position based on previous milestone heights
            // This is a simplification; actual positions can vary with content
            let approxMilestoneTop = 0;
            if (index > 0) {
                 for(let i=0; i<index; i++) {
                    approxMilestoneTop += milestones[i].offsetHeight + parseInt(getComputedStyle(milestones[i]).marginBottom);
                 }
            }
             approxMilestoneTop += cardElement.offsetHeight / 2; // Aim for roughly center of card or where dot should be

            if (window.innerWidth < 992) { // Mobile: Centered dots
                connectorElement.style.left = `50%`;
                connectorElement.style.transform = `translateX(-50%)`;
                connectorElement.style.top = `${cardElement.offsetTop + cardElement.offsetHeight / 2 - connectorElement.offsetHeight / 2}px`;

                const dotCenter = getElementCenter(dotElement);
                pathPoints.push({ x: svgWidth / 2, y: dotCenter.y });
                cumulativeHeight = Math.max(cumulativeHeight, dotCenter.y);

            } else { // Desktop: Alternating
                const cardRect = cardElement.getBoundingClientRect();
                const dotRect = dotElement.getBoundingClientRect();
                
                let dotX, dotY;
                dotY = cardRect.top + cardRect.height / 2 - wrapperRect.top; // Center of card

                if ((index + 1) % 2 !== 0) { // Odd (left)
                    // Position dot slightly to the right of the card's right edge to connect to center
                    connectorElement.style.right = `-${dotElement.offsetWidth / 2 + 20}px`; // Pull dot out
                    connectorElement.style.left = `auto`;
                    connectorElement.style.top = `50%`; // Center of card vertically
                    connectorElement.style.transform = `translateY(-50%)`;
                    
                    const tempDotCenter = getElementCenter(dotElement); // Get its pos after styling
                    dotX = tempDotCenter.x + 10; // Move towards center slightly more
                } else { // Even (right)
                    connectorElement.style.left = `-${dotElement.offsetWidth / 2 + 20}px`;
                    connectorElement.style.right = `auto`;
                    connectorElement.style.top = `50%`;
                    connectorElement.style.transform = `translateY(-50%)`;

                    const tempDotCenter = getElementCenter(dotElement);
                    dotX = tempDotCenter.x - 10;
                }
                // pathPoints.push({ x: dotX, y: dotY }); // Add actual dot position
                pathPoints.push({ x: svgWidth / 2, y: dotY }); // Main path aims for center, dots connect to it
                cumulativeHeight = Math.max(cumulativeHeight, dotY);
            }
        });


        // Generate SVG path 'd' attribute from pathPoints
        let d = "";
        if (pathPoints.length > 0) {
            d = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
            for (let i = 1; i < pathPoints.length; i++) {
                // For S-curve: C prevX+offsetY, prevY currentX-offsetX,currentY currentX,currentY
                const prevP = pathPoints[i-1];
                const currP = pathPoints[i];
                const offsetY = (currP.y - prevP.y) * 0.3; // Control point for curve
                if (window.innerWidth < 992) {
                    d += ` L ${currP.x} ${currP.y}`; // Straight line for mobile
                } else {
                    // Attempt S-curve between points for desktop
                     const controlX1 = (i % 2 !== 0) ? prevP.x - 50 : prevP.x + 50; // Alternating control point X
                     const controlY1 = prevP.y + offsetY;
                     const controlX2 = (i % 2 !== 0) ? currP.x + 50 : currP.x - 50; // Alternating control point X
                     const controlY2 = currP.y - offsetY;
                     d += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${currP.x} ${currP.y}`;
                }
            }
        }
        
        journeyLine.setAttribute('d', d);
        svgPathElement.setAttribute('viewBox', `0 0 ${svgWidth} ${cumulativeHeight + 50}`); // +50 padding
        svgPathElement.style.height = `${cumulativeHeight + 50}px`; // Set explicit height for the SVG wrapper

        totalPathLength = journeyLine.getTotalLength();
        journeyLine.style.strokeDasharray = totalPathLength;
        journeyLine.style.strokeDashoffset = totalPathLength; // Start with path hidden

        // Calculate path length at each milestone dot for progressive drawing
        milestones.forEach((milestone, index) => {
            if (index === 0) {
                milestoneScreenPositions.push({ y: pathPoints[0].y, lengthSoFar: 0 });
            } else if (pathPoints[index]) {
                // Create a temporary path to measure length to current point
                let tempD = `M ${pathPoints[0].x} ${pathPoints[0].y}`;
                for (let i = 1; i <= index; i++) {
                     const prevP = pathPoints[i-1]; const currP = pathPoints[i];
                     const offsetY = (currP.y - prevP.y) * 0.3;
                     if (window.innerWidth < 992) { tempD += ` L ${currP.x} ${currP.y}`; }
                     else {
                        const controlX1 = (i % 2 !== 0) ? prevP.x - 50 : prevP.x + 50;
                        const controlY1 = prevP.y + offsetY;
                        const controlX2 = (i % 2 !== 0) ? currP.x + 50 : currP.x - 50;
                        const controlY2 = currP.y - offsetY;
                        tempD += ` C ${controlX1} ${controlY1}, ${controlX2} ${controlY2}, ${currP.x} ${currP.y}`;
                     }
                }
                const tempPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
                tempPath.setAttribute("d", tempD);
                milestoneScreenPositions.push({ y: pathPoints[index].y, lengthSoFar: tempPath.getTotalLength() });
            }
        });
    }


    function updatePathOnScroll() {
        const scrollPosition = window.scrollY + window.innerHeight * 0.75; // Trigger point (75% from top of viewport)
        let lengthToDraw = 0;

        for (let i = 0; i < milestones.length; i++) {
            const milestone = milestones[i];
            const milestoneTop = milestone.offsetTop + journeyWrapper.offsetTop; // Position relative to document

            if (scrollPosition >= milestoneTop && milestoneScreenPositions[i]) {
                lengthToDraw = milestoneScreenPositions[i].lengthSoFar;
                if (!milestone.classList.contains('visible')) {
                    const delay = parseInt(milestone.dataset.delay || "0", 10);
                     setTimeout(() => {
                        milestone.classList.add('visible');
                    }, delay);
                }
            } else {
                // If we haven't reached this milestone, stop drawing further for now
                // but ensure previous segments are drawn if they were reached
                if (i > 0 && milestoneScreenPositions[i-1] && lengthToDraw === 0 && scrollPosition >= (milestones[i-1].offsetTop + journeyWrapper.offsetTop)) {
                     lengthToDraw = milestoneScreenPositions[i-1].lengthSoFar;
                }
                // break; // Important: Stop if a milestone isn't reached yet to draw progressively
            }
        }
        
        // Handle case where no milestones are visible yet, but we want to show path to first if it's in view.
        if (lengthToDraw === 0 && milestones[0] && scrollPosition >= (milestones[0].offsetTop + journeyWrapper.offsetTop) && milestoneScreenPositions[0]) {
             // This condition might be too aggressive, might need adjustment.
             // For now, let it draw to first if first is visible.
             // lengthToDraw = milestoneScreenPositions[0].lengthSoFar; // This will just be 0.
        }

        journeyLine.style.strokeDashoffset = totalPathLength - lengthToDraw;
    }
    
    // Initial setup and listeners
    calculatePathData(); // Calculate initial path and dot positions
    window.addEventListener('resize', debounce(() => {
        calculatePathData();
        updatePathOnScroll(); // Recalculate scroll based on new positions
    }, 250));
    
    window.addEventListener('scroll', () => {
        // Request animation frame for smooth scroll updates
        requestAnimationFrame(updatePathOnScroll);
    });

    // Set initial data-delay for milestone appearance animation
    milestones.forEach((milestone, index) => {
        milestone.dataset.delay = index * 200; // Stagger delay
    });

    // Initial call in case some milestones are already in view on load
    // setTimeout to ensure layout is stable after all calcs
    setTimeout(updatePathOnScroll, 100);


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
});
// Reseller Journey Map Section - Progressive Path Drawing - End






