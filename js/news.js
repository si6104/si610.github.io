/**
 * Author Names: Sai Trivedi - 100927464
 * Vaidehi Garge- 100930886
 * Date: 01-25-2025
 */
"use strict";
/**
 * to fetch the news from api
 */
document.addEventListener("DOMContentLoaded", function () {
    const newsList = document.getElementById('newsList');

    // Check if the newsList element exists
    if (!newsList) {
        console.error('News list element not found.');
        return;
    }

    // Fetch news data from the API
    fetch('https://newsdata.io/api/1/news?apikey=pub_71579bdb91d038aba6164ffe362f30a4a34b8&q=community')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            // Check if data is an array
            if (Array.isArray(data.results) && data.results.length > 0) {
                data.results.forEach(newsItem => {
                    const listItem = document.createElement('li');
                    const link = document.createElement('a');
                    link.href = newsItem.link; // Ensure 'link' is a property in your API response
                    link.textContent = newsItem.title; // Ensure 'title' is a property in your API response
                    listItem.appendChild(link);
                    newsList.appendChild(listItem);
                });
            } else {
                newsList.innerHTML = '<li>No news available at the moment.</li>';
            }
        })
        .catch(error => {
            console.error('Error fetching news:', error);
            newsList.innerHTML = '<li>Failed to load news. Please try again later.</li>';
        });
});
