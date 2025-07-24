// navbar toggle
const header = document.getElementById("data-header");
const navToggleBtn = document.getElementById("data-nav-toggle-btn");
const navLinks = document.querySelectorAll("#data-navbar-link");

navToggleBtn.addEventListener("click", function () {
    this.classList.toggle("active");
    header.classList.toggle("nav-active");

    navbar.forEach(link => {
        link.classList.toggle("visible");
    });
});


for (let i = 0; i < navLinks.length; i++) {
    navLinks[i].addEventListener("click", function () {
        header.classList.toggle("nav-active");
        navToggleBtn.classList.toggle("active");
    })
}

window.addEventListener("scroll", function() {
    if(this.window.screenY >= 100) {
        header.classList.add("active");
    } else {
        header.classList.remove("remove");
    }
})