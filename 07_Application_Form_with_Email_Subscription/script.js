const scriptURL = 'https://script.google.com/macros/s/AKfycbyZsYc_XLVpu7_20zzgsYmBSEiuYFoDlKu3ciW4ypQwrkuSG0sY4pDKCuooZfrc5bXumA/exec';
const form = document.forms['submit-to-google-sheet'];
const msg = document.getElementById("msg");
const popup = document.getElementById("popup")
form.addEventListener('submit', e => {
    e.preventDefault();

    // Show immediate feedback
    msg.innerHTML = "<i class='fas fa-spinner fa-spin'></i> Submitting...";
    msg.style.color = "fff";

    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then(response => {
            msg.innerHTML = "<i class='fas fa-check-circle'></i> Thank You For Subscribing!";
            msg.style.color = "green";
            openPopup();
            setTimeout(() => {
                msg.innerHTML = "";
                form.reset();
            }, 5000);
        })
        .catch(error => {
            msg.innerHTML = "<i class='fas fa-exclamation-circle'></i> Submission failed. Please try again!";
            msg.style.color = "red";
            console.error('Error!', error.message);
        });
});

function openPopup() {
    popup.classList.add("open-popup");
}

function closePopup() {
    popup.classList.remove("open-popup");
}