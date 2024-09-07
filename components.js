function loadComponent(componentId, componentFile, callback = null) {
    fetch(componentFile)
        .then(response => response.text())
        .then(data => {
            const element = document.getElementById(componentId);
            const originalContent = element.innerHTML; // Save existing content
            element.innerHTML = data; // Load component
            if (originalContent) {
                element.querySelector('.banner-text').innerHTML += originalContent; // Insert original content into banner-text
            }

            // Execute callback if provided (for additional customization)
            if (callback) callback(element);
        })
        .catch(error => console.error('Error loading component:', error));
}

// Load components when the DOM is fully loaded
document.addEventListener("DOMContentLoaded", function() {
    loadComponent('navbar-placeholder', 'navbar.html');
    loadComponent('footer-placeholder', 'footer.html');
    loadComponent('banner-placeholder', 'banner.html');
});
