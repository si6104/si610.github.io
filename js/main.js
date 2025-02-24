/**
 * Author Names: Sai Trivedi - 100927464
 * Vaidehi Garge- 100930886
 * Date: 01-25-2025
 */

"use strict";

/**
 * define the initMap function to initialize the map
 */
function initMap() {
    const mapOptions = {
        center: { lat: 43.897, lng: -78.865 }, // Coordinates for Oshawa, Ontario
        zoom: 12,
    };
    const map = new google.maps.Map(document.getElementById('map'), mapOptions);

    // Example volunteer opportunities data
    const volunteerOpportunities = [
        { name: 'Community Center A', lat: 43.900, lng: -78.860, description: 'Assisting with local events.' },
        { name: 'Food Bank B', lat: 43.895, lng: -78.870, description: 'Helping distribute food to those in need.' },
        // Add more opportunities here
    ];

    // Add markers for each opportunity
    volunteerOpportunities.forEach(opportunity => {
        const marker = new google.maps.Marker({
            position: { lat: opportunity.lat, lng: opportunity.lng },
            map: map,
            title: opportunity.name,
        });

        const infoWindow = new google.maps.InfoWindow({
            content: `<h3>${opportunity.name}</h3><p>${opportunity.description}</p>`,
        });

        marker.addListener('click', () => {
            infoWindow.open(map, marker);
        });
    });
}


// /**
//  * fetch data from the News API and display it on your site
//  * **/
// document.addEventListener("DOMContentLoaded", function() {
//     const apiKey = '0f94af0a56694e029636a5457189f3d5';
//     const apiUrl = `https://newsapi.org/v2/top-headlines?country=ca&category=general&apiKey=${apiKey}`;
//
//     fetch(apiUrl)
//         .then(response => response.json())
//         .then(data => {
//             const articles = data.articles;
//             let output = '';
//             articles.forEach(article => {
//                 output += `
//                     <div class="article">
//                         <h3>${article.title}</h3>
//                         <p>${article.description || 'No description available.'}</p>
//                         <a href="${article.url}" target="_blank">Read more</a>
//                     </div>
//                 `;
//             });
//             document.getElementById('news-articles').innerHTML = output;
//         })
//         .catch(error => console.error('Error fetching news:', error));
// });

/**
 * Function to highlight the active page link
 * **/
    function highlightActivePage() {
    // Get all links in the navbar
    const navbarLinks = document.querySelectorAll('.navbar-nav a');

    // Get the current page's URL
    const currentPage = window.location.pathname.split("/").pop();

    // Loop through each navbar link
    navbarLinks.forEach(link => {
    // Check if the link's href matches the current page
    if (link.getAttribute('href').endsWith(currentPage)) {
    // Add the 'active' class to the matching link
    link.classList.add('active');

    } else {
    // Remove the 'active' class from other links
    link.classList.remove('active');
    }
    });
    }

    // Call highlightActivePage on page load
    window.onload = function() {
    highlightActivePage();
};


/** Function to update the navbar based on login status **/
function updateNavbar() {
    const username = sessionStorage.getItem("loggedInUser"); // Check if user is logged in

    const loginLink = document.getElementById("navLogin");
    const logoutButton = document.getElementById("navLogout");
    const welcomeMessage = document.getElementById("welcomeMessage");

    if (username) {
        loginLink.style.display = "none"; // Hide login
        logoutButton.style.display = "inline-block"; // Show logout
        welcomeMessage.innerHTML = `Welcome, <strong>${username}</strong>!`;
    } else {
        loginLink.style.display = "inline-block"; // Show login
        logoutButton.style.display = "none"; // Hide logout
        welcomeMessage.innerHTML = ""; // Clear message
    }
}

async function validateLogin(username, password) {
    try {
        const response = await fetch("../data/users.json");
        const users = await response.json();

        const user = users.find(user => user.username === username && user.password === password);
        if (user) {
            sessionStorage.setItem("loggedInUser", username); // Store login session
            alert("Login successful!");
            updateNavbar(); // Update navbar immediately
            window.location.href = "../index.html"; // Redirect to homepage
        } else {
            alert("Invalid username or password!");
        }
    } catch (error) {
        console.error("Error loading user data:", error);
        alert("Error fetching user data. Please try again later.");
    }
}

/** Function to handle logout **/
function logout() {
    sessionStorage.removeItem("loggedInUser"); // Clear session
    alert("You have logged out.");
    updateNavbar(); // Update navbar after logout
    window.location.href = "../index.html"; // Redirect to homepage
}

/** Ensure the navbar updates when the page loads **/
document.addEventListener("DOMContentLoaded", function () {
    updateNavbar();  //  Ensure navbar updates on every page
    highlightActivePage();  //  Highlight the active page
});

/** Attach logout button click event **/
document.getElementById("navLogout").addEventListener("click", logout);


/**
 * dynamic search bar
 */
document.addEventListener("DOMContentLoaded", function () {
    const searchForm = document.getElementById("searchForm");
    const searchInput = document.getElementById("searchInput");

    if (searchForm) {
        searchForm.addEventListener("submit", function (event) {
            event.preventDefault(); // Prevent form submission

            const query = searchInput.value.trim().toLowerCase();
            const pages = {
                "home": "index.html",
                "opportunities": "pages/opportunities.html",
                "events": "pages/events.html",
                "contact us": "pages/contact.html",
                "about": "pages/about.html",
                "donate": "pages/donate.html",
                "gallery": "pages/gallery.html",
                "privacy policy": "pages/privacy.html",
                "terms of service": "pages/terms.html"
            };

            if (pages[query]) {
                // Ensure the correct path is used from different directories
                let basePath = window.location.pathname.includes("/pages/") ? "../" : "";
                window.location.href = basePath + pages[query];
            } else {
                alert("Page not found. Try searching for pages in the navbar.");
            }
        });
    }
});


/**
 * Implement AJAX & Lightbox
 */
document.addEventListener("DOMContentLoaded", function () {
    fetchGalleryImages();
});

function fetchGalleryImages() {
    fetch("../data/gallery.json")
        .then(response => response.json())
        .then(data => {
            displayGallery(data);
        })
        .catch(error => console.error("Error loading gallery images:", error));
}

function displayGallery(images) {
    const galleryContainer = document.getElementById("gallery");
    galleryContainer.innerHTML = ""; // Clear previous content

    images.forEach(image => {
        const imgElement = document.createElement("img");
        imgElement.src = image.image;
        imgElement.alt = image.title;
        imgElement.classList.add("gallery-image");

        // Store title, description, and image source as data attributes
        imgElement.dataset.title = image.title;
        imgElement.dataset.description = image.description;
        imgElement.dataset.fullsize = image.image; // Make sure to use the correct path

        imgElement.addEventListener("click", () => openLightbox(image.image, image.title, image.description));

        const imgWrapper = document.createElement("div");
        imgWrapper.classList.add("gallery-item");
        imgWrapper.appendChild(imgElement);

        galleryContainer.appendChild(imgWrapper);
    });
}

function openLightbox(imageSrc, title, description) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const lightboxTitle = document.getElementById("lightbox-title");
    const lightboxDesc = document.getElementById("lightbox-desc");

    // Debugging: Check if the correct image path is being passed
    console.log("Opening Lightbox with image:", imageSrc);

    // Ensure the correct path (no extra "../")
    lightboxImg.src = imageSrc; // Set image source directly
    lightboxTitle.textContent = title; // Set title
    lightboxDesc.textContent = description; // Set description

    lightbox.style.display = "flex"; // Show lightbox
}

function closeLightbox() {
    document.getElementById("lightbox").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function () {
    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightbox-img");
    const closeBtn = document.querySelector(".close");

    // Close when clicking "X"
    closeBtn.addEventListener("click", closeLightbox);

    // Close when clicking outside the image but not on text
    lightbox.addEventListener("click", function (event) {
        if (!event.target.closest(".lightbox-content") && event.target !== document.getElementById("lightbox-text")) {
            closeLightbox();
        }
    });

    // Escape key to close lightbox
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    // Attach openLightbox function to images
    document.getElementById("gallery").addEventListener("click", function (event) {
        if (event.target.tagName === "IMG") {
            openLightbox(
                event.target.dataset.fullsize,
                event.target.dataset.title,
                event.target.dataset.description
            );
        }
    });
});


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

// /**
//  * Added Donate link to
//  */
//     document.addEventListener("DOMContentLoaded", () => {
//     // Select the navbar menu (ul element)
//     const navbarMenu = document.querySelector(".navbar-nav");
//
//     // Add a "Donate" link programmatically before the "More" link
//     const donateLink = document.createElement("li");
//     donateLink.className = "nav-item"; // Add the same class as other navbar items
//     donateLink.innerHTML = `<a class="nav-link" href="/pages/donate.html">Donate</a>`;
//
//     // Find the "More" link in the navbar
//     const moreLink = Array.from(navbarMenu.getElementsByTagName("a")).find(
//         (link) => link.textContent.trim() === "More"
//     );
//
//     // If the "More" link exists, insert the "Donate" link before it
//     if (moreLink) {
//         navbarMenu.insertBefore(donateLink, moreLink.parentElement); // Insert before the "More" link
//     } else {
//         // If there's no "More" link, just append the "Donate" link to the navbar
//         navbarMenu.appendChild(donateLink);
//     }

//         /**
//          * Change "Opportunities" link text to "Volunteer Now"
//          * @type {HTMLAnchorElement}
//          */
//     const opportunitiesLink = Array.from(navbarMenu.getElementsByTagName("a")).find(
//         (link) => link.textContent.trim() === "Opportunities"
//     );
//     if (opportunitiesLink) {
//         opportunitiesLink.textContent = "Volunteer Now";
//     }
// });


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
document.addEventListener("DOMContentLoaded", function () {
    // Feedback Form Submission with AJAX
    document.getElementById("feedbackForm").addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Get form values
        const feedbackName = document.getElementById("feedbackName").value.trim();
        const feedbackEmail = document.getElementById("feedbackEmail").value.trim();
        const feedbackMessage = document.getElementById("feedbackMessage").value.trim();

        // Validate form fields
        if (!feedbackName || !feedbackEmail || !feedbackMessage) {
            alert("Please fill in all fields before submitting.");
            return;
        }

        // Simulate AJAX submission
        setTimeout(function () {
            // Populate modal with submitted feedback
            document.getElementById("modalFeedbackName").textContent = feedbackName;
            document.getElementById("modalFeedbackEmail").textContent = feedbackEmail;
            document.getElementById("modalFeedbackMessage").textContent = feedbackMessage;

            // Show confirmation modal
            new bootstrap.Modal(document.getElementById("feedbackModal")).show();

            // Reset form
            document.getElementById("feedbackForm").reset();
        }, 1000); // Simulate a delay for the AJAX call
    });
});

document.getElementById('feedbackForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const feedback = document.getElementById('feedback').value;

    const formData = {
        name: name,
        email: email,
        feedback: feedback
    };

    // Mock API call or external endpoint (for example, using JSONPlaceholder)
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'https://jsonplaceholder.typicode.com/posts', true); // You can replace this with your actual API endpoint
    xhr.setRequestHeader('Content-Type', 'application/json');

    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 201) {
            // Handle success response (assuming you are using an API like JSONPlaceholder)
            showConfirmationModal(name, email, feedback);
        }
    };

    // Send the form data as a JSON string
    xhr.send(JSON.stringify(formData));
});

function showConfirmationModal(name, email, feedback) {
    const modalContent = `
        <p>Thank you for your feedback, ${name}!</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Feedback:</strong> ${feedback}</p>
    `;
    const modal = document.createElement('div');
    modal.classList.add('modal');
    modal.innerHTML = `
        <div class="modal-content">
            <span class="close-button">&times;</span>
            ${modalContent}
        </div>
    `;
    document.body.appendChild(modal);

    // Close the modal when the close button is clicked
    modal.querySelector('.close-button').addEventListener('click', function() {
        modal.remove();
    });

    modal.style.display = 'block'; // Show modal
}

