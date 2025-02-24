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

    loginForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Clear any previous error message
        errorMessage.textContent = "";

        // Hardcoded users (replace with API/database in production)
        const users = [
            { "username": "admin", "password": "password123" },
            { "username": "volunteer1", "password": "pass123" },
            { "username": "user2", "password": "volunteer2025" }
        ];

        // Check credentials
        const user = users.find(u => u.username === username && u.password === password);

        if (user) {
            sessionStorage.setItem("loggedInUser", username); // Store the username in sessionStorage
            alert("Login successful!");
            window.location.href = "../index.html"; // Redirect to homepage after successful login
        } else {
            errorMessage.textContent = "Invalid username or password.";
        }
    });
});
