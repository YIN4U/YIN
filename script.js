const users = {
    user1: { username: "user1", password: "password1", icon: "https://via.placeholder.com/24/0000FF/808080?text=U1" },
    user2: { username: "user2", password: "password2", icon: "https://via.placeholder.com/24/FF0000/FFFFFF?text=U2" }
};
let currentUser = null;

const quotes = [
    "“I'm not a hero because I want your approval. I do it because I want to!” – Izuku Midoriya",
    "“The moment you think of giving up, think of the reason why you held on so long.” – Natsu Dragneel",
    "“We don’t have to know what tomorrow holds! That’s why we can live for everything we’re worth today!” – Natsu Dragneel",
    "“The only thing we’re allowed to do is to believe that we won’t regret the choice we made.” – Levi Ackerman",
    "“Power comes in response to a need, not a desire. You have to create that need.” – Goku",
];

function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const user = Object.values(users).find(user => user.username === username && user.password === password);
    if (user) {
        currentUser = user.username;
        document.getElementById("login-container").classList.add("hidden");
        document.getElementById("app-container").classList.remove("hidden");
        loadMessages();
        displayRandomQuote();
    } else {
        document.getElementById("login-error").textContent = "Invalid username or password.";
    }
}

function logout() {
    currentUser = null;
    document.getElementById("login-container").classList.remove("hidden");
    document.getElementById("app-container").classList.add("hidden");
}

function sendMessage() {
    const content = document.getElementById("message-content").value;
    const attachment = document.getElementById("attachment").files[0];

    if (content || attachment) {
        const message = {
            id: Date.now(),
            user: currentUser,
            content: content,
            attachmentUrl: attachment ? URL.createObjectURL(attachment) : null,
            attachmentType: attachment ? attachment.type : null
        };

        saveMessage(message);
        displayMessage(message);

        // Clear the input fields
        document.getElementById("message-content").value = "";
        document.getElementById("attachment").value = "";
    } else {
        alert("Please write a message or attach a file.");
    }
}

function saveMessage(message) {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    messages.push(message);
    localStorage.setItem("messages", JSON.stringify(messages));
}

function loadMessages() {
    let messages = JSON.parse(localStorage.getItem("messages")) || [];
    document.getElementById("message-list").innerHTML = '';
    messages.forEach(displayMessage);
}

function displayMessage(message) {
    const messageList = document.getElementById("message-list");
    const messageItem = document.createElement("div");
    messageItem.classList.add("message-item");
    messageItem.setAttribute("data-id", message.id);

    const messageAuthor = document.createElement("div");
    messageAuthor.classList.add("message-author");
    const userIcon = document.createElement("img");
    userIcon.src = users[message.user].icon;
    messageAuthor.appendChild(userIcon);
    const authorName = document.createElement("span");
    authorName.textContent = message.user;
    messageAuthor.appendChild(authorName);
    messageItem.appendChild(messageAuthor);

    const messageText = document.createElement("p");
    messageText.textContent = message.content;
    messageItem.appendChild(messageText);

    if (message.attachmentUrl) {
        if (message.attachmentType.startsWith("image/")) {
            const image = document.createElement("img");
            image.src = message.attachmentUrl;
            messageItem.appendChild(image);
        } else if (message.attachmentType.startsWith("video/")) {
            const video = document.createElement("video");
            video.src = message.attachmentUrl;
            video.controls = true;
            messageItem.appendChild(video);
        }
    }

    if (message.user === currentUser) {
        const actions = document.createElement("div");
        actions.classList.add("message-actions");

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.onclick = () => editMessage(messageItem, messageText);
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => deleteMessage(messageItem);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);

        messageItem.appendChild(actions);
    }

    messageList.appendChild(messageItem);
}

function editMessage(messageItem, messageText) {
    const newContent = prompt("Edit your message:", messageText.textContent);
    if (newContent !== null) {
        messageText.textContent = newContent;
        const messageId = messageItem.getAttribute("data-id");
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        const message = messages.find(msg => msg.id == messageId);
        if (message) {
            message.content = newContent;
            localStorage.setItem("messages", JSON.stringify(messages));
        }
    }
}

function deleteMessage(messageItem) {
    if (confirm("Are you sure you want to delete this message?")) {
        const messageId = messageItem.getAttribute("data-id");
        let messages = JSON.parse(localStorage.getItem("messages")) || [];
        messages = messages.filter(msg => msg.id != messageId);
        localStorage.setItem("messages", JSON.stringify(messages));
        messageItem.remove();
    }
}

function displayRandomQuote() {
    const quoteContainer = document.getElementById("quote-container");
    const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
    quoteContainer.textContent = randomQuote;
}
