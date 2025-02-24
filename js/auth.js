/**
 * Author Names: Sai Trivedi - 100927464
 * Vaidehi Garge- 100930886
 * Date: 01-25-2025
 */

"use strict";
/**
 * authentication for login users
 */
document.addEventListener("DOMContentLoaded", function () {
    const loginForm = document.getElementById("loginForm");
    const errorMessage = document.getElementById("errorMessage");

    // Hardcoded users (Replace with database/API authentication in future)
    const users = {
        "admin": "password123",
        "user1": "volunteer2025",
        "user2": "helpinghands"
    };

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Check credentials
        if (users[username] && users[username] === password) {
            localStorage.setItem("loggedInUser", username); // Store session
            window.location.href = "../index.html"; // Redirect to home
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});
