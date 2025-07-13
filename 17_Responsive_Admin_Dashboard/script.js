const sideMenu = document.querySelector('aside');
const menuBtn = document.querySelector("#menu_bar");
const closeBtn = document.querySelector("#close_Btn");
const themeToggler = document.querySelector('.theme-toggler');

// Open sidebar on small screens
menuBtn.addEventListener("click", () => {
    sideMenu.style.display = "block";
    sideMenu.classList.add('active');
});

// Close sidebar on small screens
closeBtn.addEventListener("click", () => {
    sideMenu.style.display = "none";
    sideMenu.classList.remove('active');
});

// Toggle dark/light theme
themeToggler.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme-variables');
    themeToggler.querySelector('span:nth-child(1)').classList.toggle('active');
    themeToggler.querySelector('span:nth-child(2)').classList.toggle('active');
});

// Hide sidebar on window resize if > 1200px (for safety)
window.addEventListener('resize', () => {
    if (window.innerWidth > 1200) {
        sideMenu.style.display = "block";
    } else {
        sideMenu.style.display = "none";
        sideMenu.classList.remove('active');
    }
});
