// Stack storage
let stack = [];

// DOM elements
const inputField = document.querySelector('input[type="number"]');
const pushBtn = document.querySelector('.push');
const popBtn = document.querySelector('.pop');
const resetBtn = document.querySelector('.reset');

const stackArea = document.getElementById('stack-area');
const topElementBox = document.getElementById('top-element');
const lastPushedBox = document.getElementById('last-pushed');
const lastPoppedBox = document.getElementById('last-popped');
const sizeBox = document.getElementById('stack-size');
const messageBox = document.getElementById('message-box');

// Disable buttons
function disableButtons() {
    [pushBtn, popBtn, resetBtn, inputField].forEach(btn => {
        btn.disabled = true;
        btn.classList.add("disable-button");
    });
}

// Enable buttons
function enableButtons() {
    [pushBtn, popBtn, resetBtn, inputField].forEach(btn => {
        btn.disabled = false;
        btn.classList.remove("disable-button");
    });
}

// Update UI
function updateUI() {
    stackArea.innerHTML = '';

    // Display stack from top (last pushed item first)
    [...stack].reverse().forEach(value => {
        const el = document.createElement('div');
        el.classList.add('stack-element');
        el.textContent = value;
        stackArea.appendChild(el);
    });

    topElementBox.textContent = stack.length ? stack[stack.length - 1] : '';
    sizeBox.textContent = stack.length;
}

// Push
pushBtn.addEventListener('click', () => {
    const value = inputField.value.trim();

    if (value === '') {
        messageBox.value = 'Please enter a value.';
        messageBox.classList.add('error');
        setTimeout(() => messageBox.classList.remove('error'), 1200);
        return;
    }

    if (stack.length >= 5) {
        inputField.value = '';
        messageBox.value = 'Stack Overflow';
        messageBox.classList.add('error');
        setTimeout(() => messageBox.classList.remove('error'), 1200);
        return;
    }

    const pushedItem = value;
    stack.push(pushedItem);

    messageBox.value = `Item ${pushedItem} is Pushed.`;
    inputField.value = '';
    lastPushedBox.textContent = pushedItem;
    lastPoppedBox.textContent = '';

    disableButtons();
    updateUI();

    setTimeout(() => {
        enableButtons();
    }, 1200);
});

// Pop
popBtn.addEventListener('click', () => {
    if (!stack.length) {
        messageBox.value = 'Stack Underflow';
        messageBox.classList.add('error');
        setTimeout(() => messageBox.classList.remove('error'), 1200);
        return;
    }

    const poppedItem = stack.pop();
    messageBox.value = `Item ${poppedItem} is Popped.`;
    lastPoppedBox.textContent = poppedItem;
    lastPushedBox.textContent = '';
    topElementBox.textContent = stack.length ? stack[stack.length - 1] : '';

    disableButtons();
    updateUI();

    setTimeout(() => {
        enableButtons();
    }, 1200);
});

// Reset
resetBtn.addEventListener('click', () => {
    stack = [];
    topElementBox.textContent = '';
    lastPushedBox.textContent = '';
    lastPoppedBox.textContent = '';
    sizeBox.textContent = '0';
    messageBox.value = 'Stack has been reset.';
    updateUI();
});
