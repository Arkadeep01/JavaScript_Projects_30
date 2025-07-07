const accesskey = "UPZMLL4YKFu-goA4aVQ5rEXwPHs-snAe5KO-OTlNhtE";

const searchForm = document.getElementById("image-search-engine");
const searchBox = document.getElementById("search-box");
const searchResult = document.getElementById("search-result");
const ShowMoreBtn = document.getElementById("show-more-btn");
const toggleicon = document.getElementById("icon");

let keyword = "";
let page = 1;

function getResponsivePerPage() {
    if (window.innerWidth >= 1400) return 24;
    if (window.innerWidth >= 1024) return 20;
    if (window.innerWidth >= 768) return 12;
    return 8;
}

let perPage = getResponsivePerPage();

window.addEventListener("resize", () => {
    perPage = getResponsivePerPage();
});

async function searchImage() {
    keyword = searchBox.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accesskey}&per_page=${perPage}`;

    const response = await fetch(url);
    const data = await response.json();

    if (page === 1) {
        searchResult.innerHTML = "";
    }

    const results = data.results;

    results.forEach((result) => {
        const image = document.createElement("img");
        image.src = result.urls.small;

        const imageLink = document.createElement("a");
        imageLink.href = result.links.html;
        imageLink.target = "_blank";

        imageLink.appendChild(image);
        searchResult.appendChild(imageLink);
    });

    ShowMoreBtn.style.display = "block";
}

searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    page = 1;
    searchImage();
});

ShowMoreBtn.addEventListener("click", () => {
    page++;
    searchImage();
});

toggleicon.onclick = function () {
    document.documentElement.classList.toggle("dark");

    if (document.documentElement.classList.contains("dark")) {
        toggleicon.src = "Images/sun.png";
    } else {
        toggleicon.src = "Images/moon.png";
    }
};
