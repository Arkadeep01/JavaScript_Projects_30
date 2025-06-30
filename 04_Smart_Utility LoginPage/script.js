const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

// Sign Up Elements
const signupPassword = document.getElementById('signupPassword');
const toggleSignupPassword = document.getElementById('toggleSignupPassword');
const checkStrengthBtn = document.getElementById('checkStrength');
const generateBtn = document.getElementById('generateBtn');
const strengthMessage = document.getElementById('strengthMessage');
const strengthText = document.getElementById('strength');

// Sign In Elements
const signinPassword = document.getElementById('signinPassword');
const toggleSigninPassword = document.getElementById('toggleSigninPassword');

// Panel Switch
signUpButton?.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton?.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

// Password Visibility Toggles
toggleSignupPassword?.addEventListener('click', () => {
    const type = signupPassword.type === "password" ? "text" : "password";
    signupPassword.type = type;
    toggleSignupPassword.src = type === "password" ? "images/eye-close.png" : "images/eye-open.png";
});

toggleSigninPassword?.addEventListener('click', () => {
    const type = signinPassword.type === "password" ? "text" : "password";
    signinPassword.type = type;
    toggleSigninPassword.src = type === "password" ? "images/eye-close.png" : "images/eye-open.png";
});

// Show strength checker if user types their own password
signupPassword?.addEventListener('input', () => {
    if (signupPassword.value.trim() !== "") {
        checkStrengthBtn.style.display = 'inline-block';
        strengthMessage.style.display = 'block';
    } else {
        checkStrengthBtn.style.display = 'none';
        strengthMessage.style.display = 'none';
    }
});

// Check Strength button
checkStrengthBtn?.addEventListener('click', () => {
    const result = getPasswordStrength(signupPassword.value);
    strengthText.textContent = result.text;
    strengthText.style.color = result.color;
});

// Generate password
generateBtn?.addEventListener('click', () => {
    const generated = generateRandomPassword();
    signupPassword.value = generated;
    checkStrengthBtn.style.display = 'none';
    strengthMessage.style.display = 'none';
});

// Password strength logic
function getPasswordStrength(password) {
    let result = { text: '', color: '' };
    const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

    if (password.length === 0) {
        result.text = '';
    } else if (strongRegex.test(password)) {
        result.text = 'Strong';
        result.color = 'green';
    } else if (password.length >= 6) {
        result.text = 'Moderate';
        result.color = 'orange';
    } else {
        result.text = 'Weak';
        result.color = 'red';
    }
    return result;
}

// Random password generator
function generateRandomPassword() {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
    let password = "";
    for (let i = 0; i < 12; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return password;
}
