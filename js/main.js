/**
 * Author Names: Sai Trivedi - 100927464
 * Vaidehi Garge- 100930886
 * Date: 01-25-2025
 */

"use strict";

/**
 * Utility function to prevent redundant DOMContentLoaded listeners
 * @param callback
 */
function onDOMContentLoaded(callback) {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', callback);
    } else {
        callback();
    }
}

/**
 * Added Donate link to
 */
    document.addEventListener("DOMContentLoaded", () => {
    // Select the navbar menu (ul element)
    const navbarMenu = document.querySelector(".navbar-nav");

    // Add a "Donate" link programmatically before the "More" link
    const donateLink = document.createElement("li");
    donateLink.className = "nav-item"; // Add the same class as other navbar items
    donateLink.innerHTML = `<a class="nav-link" href="/pages/donate.html">Donate</a>`;

    // Find the "More" link in the navbar
    const moreLink = Array.from(navbarMenu.getElementsByTagName("a")).find(
        (link) => link.textContent.trim() === "More"
    );

    // If the "More" link exists, insert the "Donate" link before it
    if (moreLink) {
        navbarMenu.insertBefore(donateLink, moreLink.parentElement); // Insert before the "More" link
    } else {
        // If there's no "More" link, just append the "Donate" link to the navbar
        navbarMenu.appendChild(donateLink);
    }

        /**
         * Change "Opportunities" link text to "Volunteer Now"
         * @type {HTMLAnchorElement}
         */
    const opportunitiesLink = Array.from(navbarMenu.getElementsByTagName("a")).find(
        (link) => link.textContent.trim() === "Opportunities"
    );
    if (opportunitiesLink) {
        opportunitiesLink.textContent = "Volunteer Now";
    }
});

/**
 * Redirect to Opportunities page when 'Get Involved' button is clicked
 */
    onDOMContentLoaded(() => {
    const getInvolvedBtn = document.getElementById("getInvolvedBtn");
    if (getInvolvedBtn) {
        getInvolvedBtn.addEventListener("click", (e) => {
            e.preventDefault();
            window.location.href = "pages/opportunities.html";
        });
    }

/**
* Back to Top Button Functionality
* @type {HTMLElement}
*/
    const backToTopBtn = document.getElementById("backToTop");
    if (backToTopBtn) {
        // Show button when scrolling down
        window.addEventListener("scroll", () => {
            if (window.scrollY > 100) {
                backToTopBtn.style.display = "block";
            } else {
                backToTopBtn.style.display = "none";
            }
        });

        // Smooth scroll to top
        backToTopBtn.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        });
    }

        /**
         * Populate Opportunities on the Opportunities page
          * @type {HTMLElement}
         */
    const opportunitiesContainer = document.getElementById("opportunitiesContainer");
    if (opportunitiesContainer) {
        const opportunities = [
            { title: "Garden Cleanup", description: "Help clean and beautify the local community garden.", dateTime: "2025-01-25 10:00 AM" },
            { title: "Community Workshop", description: "Teach and learn skills to empower the community.", dateTime: "2025-02-01 2:00 PM" },
            { title: "Fire Extinguisher Training", description: "Get trained in fire safety and usage of fire extinguishers.", dateTime: "2025-02-10 11:00 AM" }
        ];

        opportunities.forEach((opportunity, index) => {
            const card = document.createElement("div");
            card.className = "col-md-4 mb-4";
            card.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${opportunity.title}</h5>
                        <p class="card-text">${opportunity.description}</p>
                        <p class="text-muted">${moment(opportunity.dateTime).format("MMMM Do YYYY, h:mm A")}</p>
                        <button class="btn btn-primary signupBtn" data-index="${index}" data-bs-toggle="modal" data-bs-target="#signupModal">Sign Up</button>
                    </div>
                </div>
            `;
            opportunitiesContainer.appendChild(card);
        });

        /**
         * Event listener for 'Sign Up' buttons
         * @type {NodeListOf<Element>}
         */
        const signupButtons = document.querySelectorAll(".signupBtn");
        signupButtons.forEach((btn) => {
            btn.addEventListener("click", (e) => {
                const index = e.target.dataset.index;
                const opportunity = opportunities[index];
                // Perform any additional actions based on the opportunity
            });
        });
    }

        /**
         * Handle Modal Form Submission for Sign Up
         * @type {HTMLElement}
         */
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", (e) => {
            e.preventDefault();

            const name = document.getElementById("name").value.trim();
            const email = document.getElementById("email").value.trim();
            const role = document.getElementById("role").value.trim();

            if (name && email && role) {
                alert("Thank you for signing up!");
                signupForm.reset();
                const modal = bootstrap.Modal.getInstance(document.getElementById("signupModal"));
                modal.hide();
            } else {
                alert("Please fill out all fields.");
            }
        });
    }

        /**
         *  Array of Events for the Events Page
         * @type {[{title: string, description: string, date: string, category: string},{title: string, description: string, date: string, category: string},{title: string, description: string, date: string, category: string},{title: string, description: string, date: string, category: string}]}
         */
    const events = [
        { title: "Park Cleanup", description: "Join us for a park cleanup to make our community green again.", date: "2025-01-25", category: "cleanups" },
        { title: "Charity Fundraiser", description: "An evening to raise funds for local shelters.", date: "2025-02-10", category: "fundraisers" },
        { title: "Fire Safety Workshop", description: "Learn essential fire safety techniques and emergency preparedness.", date: "2025-02-15", category: "workshops" },
        { title: "Beach Cleanup", description: "Help clean the beach and protect marine life.", date: "2025-03-05", category: "cleanups" }
    ];

        /**
         * Function to Display Events
         * @param category
         */
    function displayEvents(category = "all") {
        const eventsContainer = document.getElementById("eventsContainer");
        if (!eventsContainer) return;

        eventsContainer.innerHTML = ""; // Clear previous events
        const filteredEvents = events.filter(event => category === "all" || event.category === category);

        if (filteredEvents.length === 0) {
            eventsContainer.innerHTML = `<p class="text-center text-muted">No events found for the selected category.</p>`;
            return;
        }

        filteredEvents.forEach(event => {
            const eventCard = document.createElement("div");
            eventCard.className = "col-md-4 mb-4";
            eventCard.innerHTML = `
                <div class="card h-100">
                    <div class="card-body">
                        <h5 class="card-title">${event.title}</h5>
                        <p class="card-text">${event.description}</p>
                        <p class="text-muted">${moment(event.date).format("MMMM Do YYYY")}</p>
                    </div>
                </div>
            `;
            eventsContainer.appendChild(eventCard);
        });
    }

        /**
         *  Event Listener for Category Filter
         * @type {HTMLElement}
         */
    const categoryFilter = document.getElementById("categoryFilter");
    if (categoryFilter) {
        categoryFilter.addEventListener("change", (e) => {
            const selectedCategory = e.target.value;
            displayEvents(selectedCategory);
        });
    }

        /**
         * Initial Display of All Events
         */
    displayEvents();

        /**
         * Contact Form Submission Handling
         * @type {HTMLElement}
         */
    const contactForm = document.getElementById("contactForm");
    if (contactForm) {
        contactForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Check if the form is valid
            if (!contactForm.checkValidity()) {
                contactForm.classList.add("was-validated");
                return;
            }

            /**
             * Display the "Thank You" message dynamically
             * @type {Element}
             */
            const container = document.querySelector(".container");
            container.innerHTML = `
            <div class="text-center mt-5">
                <h1>Thank You!</h1>
                <p>Your message has been received. You will be redirected to the home page in 5 seconds.</p>
            </div>
        `;

            // After 5 seconds, redirect to the Home page
            setTimeout(function() {
                window.location.href = '../index.html'; // Change to the URL of your home page
            }, 5000);
        });
    }

            /**
             * Create the footer container
             * @type {HTMLElement}
             */
            function createStickyFooter() {
        const footer = document.createElement("footer");
        footer.className = "sticky-footer"; // Add a class for custom styling

            /**
             * Create the footer content
             * @type {HTMLDivElement}
             */
        const footerContent = document.createElement("div");
        footerContent.className = "footer-content";

            /**
             * Create the links for Privacy Policy and Terms of Service
             * @type {HTMLAnchorElement}
             */
        const privacyLink = document.createElement("a");
        privacyLink.href = "/pages/privacy.html";
        privacyLink.textContent = "Privacy Policy";
        privacyLink.className = "footer-link";

        const termsLink = document.createElement("a");
        termsLink.href = "/pages/terms.html";
        termsLink.textContent = "Terms of Service";
        termsLink.className = "footer-link";

        // // Append the links to the footer content
        footerContent.appendChild(privacyLink);
        footerContent.appendChild(termsLink);

        //  Append the footer content to the footer
        footer.appendChild(footerContent)
        //  Append the footer to the body
         document.body.appendChild(footer);
    }

        /**
         * Call the function to create the sticky footer
         */
        createStickyFooter();

});
