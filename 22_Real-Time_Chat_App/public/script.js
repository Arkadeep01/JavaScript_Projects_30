const socket = io();

function sendMessage() {
    const input = document.getElementById("messageInput");
    const messageText = input.value.trim();

    if (messageText) {
        appendMessage(messageText, "sent");       // Show message in UI
        socket.emit("chat message", messageText); // Send to server
        input.value = "";
    }
}

socket.on("chat message", (msg) => {
    appendMessage(msg, "received");
});

// Function to add message to chat UI
function appendMessage(msg, type = "received") {
    const messageDiv = document.createElement("div");
    messageDiv.classList.add("message", type);          // 'message sent' or 'message received'
    messageDiv.textContent = msg;

    const messagesContainer = document.getElementById("messages");
    messagesContainer.appendChild(messageDiv);

    messagesContainer.scrollTop = messagesContainer.scrollHeight;
}

// Load demo messages on page load
document.addEventListener("DOMContentLoaded", () => {
    const demoMessages = [
        { text: "Hey Danish 👋", type: "sent" },
        { text: "Hi! How are you?", type: "received" },
        { text: "I'm doing well, working on a cool project 💻", type: "sent" },
        { text: "Sounds exciting! Tell me more.", type: "received" },
    ];

    demoMessages.forEach((msg) => appendMessage(msg.text, msg.type));
});
