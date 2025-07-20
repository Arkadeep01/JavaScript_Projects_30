document.addEventListener("DOMContentLoaded", () => {
    // 1. Sidebar toggle handler (if expandable sidebar is intended)
    const sidebarToggle = document.querySelector(".sidebar .fa-bars");
    const sidebar = document.querySelector(".sidebar");
    
    if (sidebarToggle && sidebar) {
        sidebarToggle.addEventListener("click", () => {
            sidebar.classList.toggle("expanded");
        });
    }

    // 2. Newsletter Form Submit Handling
    const form = document.querySelector(".subscribe-form");
    if (form) {
        form.addEventListener("submit", (e) => {
            e.preventDefault();
            const emailInput = form.querySelector("input[type='email']");
            const email = emailInput.value.trim();
            const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

            if (!emailPattern.test(email)) {
                alert("Please enter a valid email address.");
                return;
            }

            alert("Subscribed successfully!");
            emailInput.value = "";
        });
    }

    // 3. Smooth Scroll for Internal Navigation Links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop - 80,
                    behavior: "smooth"
                });
            }
        });
    });
});