const socket = io();

// DOM elements
const chatIcon = document.getElementById("icon-chat");
const chatBox = document.getElementById("chat");
const chatNow = document.getElementById("chat-now");
const allChatPage = document.querySelector(".all-chat");
const startChatPage = document.querySelector(".start-chat");
const backIcon = document.querySelector(".icon-chatBack");
const allChatMessages = document.querySelectorAll(".allchat-message");
const messageInput = document.querySelector(".input-message");
const messageContainer = document.querySelector(".chat-body");

// State to track current view
let isChatVisible = false;

// Toggle visibility of chat box
chatIcon.addEventListener("click", () => {
  if (!isChatVisible) {
    chatBox.style.display = "flex";
    chatBox.classList.add("show");
    chatBox.classList.remove("hide");
    allChatPage.style.display = "flex"; // Show all-chat by default
    startChatPage.style.display = "none"; // Hide start-chat
    isChatVisible = true;
  } else {
    chatBox.classList.add("hide");
    setTimeout(() => {
      chatBox.style.display = "none";
    }, 300); // Matches CSS transition duration
    isChatVisible = false;
  }
});

// Show start-chat page when a message in all-chat is clicked
allChatMessages.forEach((message) => {
  message.addEventListener("click", () => {
    allChatPage.style.display = "none"; // Hide all-chat
    startChatPage.style.display = "flex"; // Show start-chat
  });
});

// Go back to all-chat page when back icon is clicked
backIcon.addEventListener("click", () => {
  startChatPage.style.display = "none"; // Hide start-chat
  allChatPage.style.display = "flex"; // Show all-chat
});

// Show start-chat page when 'chatNow' is clicked
chatNow.addEventListener("click", (event) => {
  event.preventDefault();
  allChatPage.style.display = "none"; // Hide all-chat
  startChatPage.style.display = "flex"; // Show start-chat
  chatBox.style.display = "flex"; // Tampilkan chat box
});

// Utility function to escape HTML
function escapeHTML(string) {
  const div = document.createElement("div");
  div.innerText = string;
  return div.innerHTML;
}

// Sending message to the server
function sendMessage() {
  const message = messageInput.value.trim(); // Trim whitespace
  if (message) {
    displaySentMessage(message);
    socket.emit("chat message", message);
    messageInput.value = ""; // Clear input field
  } else {
    alert("Pesan tidak boleh kosong!");
  }
}

// Display sent message
function displaySentMessage(message) {
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", "sent");
  newMessage.innerHTML = `<p>${escapeHTML(
    message
  )}</p><img src="../public/img/profile/kucing-jamur.png" alt="Pengirim">`;
  messageContainer.appendChild(newMessage);
  autoScrollToBottom(messageContainer);
}

// Listening for incoming messages from other users
socket.on("chat message", (msg) => {
  const newMessage = document.createElement("div");
  newMessage.classList.add("message", "received");
  newMessage.innerHTML = `<img src="../public/img/profile/petani.jfif" alt="Petani"><p>${escapeHTML(
    msg
  )}</p>`;
  messageContainer.appendChild(newMessage);

  // Highlight icon if chat is hidden
  if (chatBox.style.display === "none" || !chatBox.style.display) {
    chatIcon.classList.add("new-message");
    setTimeout(() => chatIcon.classList.remove("new-message"), 3000);
  }

  autoScrollToBottom(messageContainer);
});

// Auto-scroll to bottom, unless user is viewing older messages
function autoScrollToBottom(container) {
  const shouldScroll =
    container.scrollTop + container.clientHeight === container.scrollHeight;

  if (shouldScroll) {
    container.scrollTop = container.scrollHeight;
  }
}

// Feedback for empty message
document.querySelector(".send-icon").addEventListener("click", sendMessage);
document.querySelector(".input-message").addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendMessage();
  }
});

// Remove highlight when chat is opened
chatIcon.addEventListener("click", () => {
  chatIcon.classList.remove("new-message");
});
