// Get references to error <small> elements
const nameError = document.querySelector("#name-error");
const emailError = document.querySelector("#email-error");
const addressError = document.querySelector("#address-error");
const cityError = document.querySelector("#city-error");
const regionError = document.querySelector("#region-error");
const postalError = document.querySelector("#postal-error");
const phoneNoError = document.querySelector("#phoneNo-error");
const locationError = document.querySelector("#location-error");
const messageError = document.querySelector("#message-error");
const submitError = document.querySelector("#submit-error");

function validateName() {
    const name = document.getElementById("name").value.trim();
    
    if (name.length === 0) {
        nameError.textContent = "Name is required";
        nameError.classList.remove("success");
        nameError.classList.add("text-danger");
        return false;
    }

    if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        nameError.textContent = "Enter full name (First Last)";
        nameError.classList.remove("success");
        nameError.classList.add("text-danger");
        return false;
    }

    nameError.innerHTML = "<i class='fas fa-check-circle'></i> Name looks good!";
    nameError.classList.remove("text-danger");
    nameError.classList.add("success");
    return true;
}

function showError(element, message) {
    element.textContent = message;
    element.classList.remove("success");
    element.classList.add("text-danger");
}

function showSuccess(element, message = "<i class='fas fa-check-circle'></i>") {
    element.innerHTML = message;
    element.classList.remove("text-danger");
    element.classList.add("success");
}

function validateName() {
    const name = document.getElementById("name").value.trim();
    if (name.length === 0) {
        showError(nameError, "Name is required");
        return false;
    }
    if (!name.match(/^[a-zA-Z]+ [a-zA-Z]+$/)) {
        showError(nameError, "Enter full name (First Last)");
        return false;
    }
    showSuccess(nameError);
    return true;
}

function validateEmail() {
    const email = document.getElementById("email").value.trim();
    if (email.length === 0) {
        showError(emailError, "Email is required");
        return false;
    }
    if (!email.match(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)) {
        showError(emailError, "Invalid email format");
        return false;
    }
    showSuccess(emailError);
    return true;
}

function validateAddress() {
    const address = document.getElementById("street-address").value.trim();
    if (address.length === 0) {
        showError(addressError, "Address is required");
        return false;
    }
    showSuccess(addressError);
    return true;
}

function validateCity() {
    const city = document.getElementById("city").value.trim();
    if (city.length === 0) {
        showError(cityError, "City is required");
        return false;
    }
    if (!city.match(/^[a-zA-Z\s]+$/)) {
        showError(cityError, "City should contain only letters");
        return false;
    }
    showSuccess(cityError);
    return true;
}

function validateRegion() {
    const region = document.getElementById("region").value.trim();
    if (region.length === 0) {
        showError(regionError, "Region is required");
        return false;
    }
    if (!region.match(/^[a-zA-Z\s]+$/)) {
        showError(regionError, "Region should contain only letters");
        return false;
    }
    showSuccess(regionError);
    return true;
}

function validatePostal() {
    const postal = document.getElementById("postal-code").value.trim();
    if (postal.length === 0) {
        showError(postalError, "Postal code is required");
        return false;
    }
    if (!postal.match(/^\d{5,6}$/)) {
        showError(postalError, "Invalid postal code format");
        return false;
    }
    showSuccess(postalError);
    return true;
}

function validatePhone() {
    const phone = document.getElementById("phone-number").value.trim();
    if (phone.length === 0) {
        showError(phoneNoError, "Phone number is required");
        return false;
    }
    if (!phone.match(/^\d{10}$/)) {
        showError(phoneNoError, "Phone number should be 10 digits");
        return false;
    }
    showSuccess(phoneNoError);
    return true;
}

function validateLocation() {
    const location = document.getElementById("locations").value.trim();
    if (location.length === 0) {
        showError(locationError, "Location is required");
        return false;
    }
    if (!location.match(/^[a-zA-Z\s]+$/)) {
        showError(locationError, "Location should contain only letters");
        return false;
    }
    showSuccess(locationError);
    return true;
}

function validateMessage() {
    const message = document.getElementById("experience").value.trim();
    if (message.length === 0) {
        showError(messageError, "Message is required");
        return false;
    }
    if (message.length < 10) {
        showError(messageError, "Message should be at least 10 characters long");
        return false;
    }
    showSuccess(messageError);
    return true;
}


// Form Submission Handling
document.getElementById("volunteerForm").addEventListener("submit", function (e) {
    const isValid =
        validateName() &&
        validateEmail() &&
        validateAddress() &&
        validateCity() &&
        validateRegion() &&
        validatePostal() &&
        validatePhone() &&
        validateLocation() &&
        validateMessage();

    if (!isValid) {
        submitError.textContent = "Please check the errors above before submitting.";
        e.preventDefault();
    } else {
        submitError.textContent = "";
    }
});
