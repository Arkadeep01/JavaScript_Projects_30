const productImg = document.getElementById("productImg");
const btns = document.querySelectorAll(".btn");
const backBtn = document.getElementById("backBtn");
const nextBtn = document.getElementById("nextBtn");

const productName = document.querySelector(".details h1");
const productPrice = document.querySelector(".details h2");
const productDiscount = document.querySelector(".details h3");
const productDesc = document.querySelector(".details p");

const popup = document.getElementById("popup");

const productImages = [
  ["Images/first1.png", "Images/first2.png"],
  ["Images/second1.png", "Images/second2.png"],
  ["Images/third1.png", "Images/third2.png"]
];

const productDetails = [
  {
    name: "Casual T-shirt",
    price: "250.00",
    discount: "30% OFF",
    description: "Wrangler is an American manufacturer of jeans and other clothing items, particularly workwear."
  },
  {
    name: "Striped Polo",
    price: "399.00",
    discount: "25% OFF",
    description: "Made with premium cotton for all-day comfort. Perfect for casual and semi-formal wear."
  },
  {
    name: "Graphic Hoodie",
    price: "599.00",
    discount: "40% OFF",
    description: "A warm hoodie with a bold graphic print. Ideal for winter and streetwear looks."
  }
];

let currentProduct = 0;
let currentView = 0;

updateImage(); 

backBtn.addEventListener("click", () => {
  currentProduct = (currentProduct - 1 + productImages.length) % productImages.length;
  currentView = 0;
  updateImage();
});

nextBtn.addEventListener("click", () => {
  currentProduct = (currentProduct + 1) % productImages.length;
  currentView = 0;
  updateImage();
});

btns.forEach((btn, index) => {
  btn.addEventListener("click", () => {
    currentView = index;
    updateImage();
  });
});

function updateImage() {
  productImg.src = productImages[currentProduct][currentView];
  btns.forEach((btn, i) => {
    btn.classList.toggle("active", i === currentView);
  });

  const details = productDetails[currentProduct];
  productName.textContent = details.name;
  productPrice.innerHTML = `<i class="fa-solid fa-indian-rupee-sign"></i> ${details.price}`;
  productDiscount.textContent = details.discount;
  productDesc.textContent = details.description;
}

function openPopup() {
  popup.classList.add("open-popup");
}

function closePopup() {
  popup.classList.remove("open-popup");
}
