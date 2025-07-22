// Element Toggle Function
const eleTogFunc = function (elem) {
    elem.classList.toggle("active");
}

// Navbar Variables
const navbar = document.querySelector("[data-navbar");
const navTogBtn = document.querySelector("[data-nav-toggle-btn]");
const overlay = document.querySelector("[data-overlay]");

const navElemArr = [navTogBtn, overlay];

for (let i = 0; i <navElemArr.length; i++) {
    navElemArr[i].addEventListener("click", function() {
        eleTogFunc(navbar);
        eleTogFunc(overlay);
    });
}


// Sticky Header
const header = document.querySelector("[data-header]");

let lastScrollPosition = 0;

window.addEventListener("scroll", function () {
    let scrollPosition = this.window.pageYOffset;

    if (scrollPosition > lastScrollPosition) {
        header.classList.remove("active");
    } else {
        header.classList.add("active");
    }

    lastScrollPosition = scrollPosition <= 0 ? 0 : scrollPosition;
})


// Form Validation
const input = document.querySelector("[data-input");
const submitBtn = document.querySelector("[data-submit");

input.addEventListener("input", function () {
    if (input.checkValidity()) {
        submitBtn.removeAttribute("disabled");
    } else {
        submitBtn.setAttribute("disabled", "");
    }
})


// Go To Top
const goTopBtn = document.querySelector("[data-go-top]");

window.addEventListener("scroll", function () {
    window.scrollY >= 200 ? goTopBtn.classList.add("active") :
    goTopBtn.classList.remove("active");
});