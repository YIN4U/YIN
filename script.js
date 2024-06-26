// Add a new message to the message list and auto-scroll
function addMessageToList(message, index) {
    const messageList = document.getElementById('message-list');
    const messageItem = document.createElement('div');
    messageItem.className = 'message-item';
    messageItem.setAttribute('data-id', index);

    const senderInfo = document.createElement('div');
    senderInfo.className = 'sender-info';

    const userIcon = document.createElement('img');
    userIcon.src = 'user_icon.png'; // Placeholder for user icon
    userIcon.className = 'user-icon';

    const senderName = document.createElement('span');
    senderName.textContent = message.sender;

    senderInfo.appendChild(userIcon);
    senderInfo.appendChild(senderName);

    const messageContent = document.createElement('div');
    messageContent.className = 'message-content';
    messageContent.textContent = message.content;

    if (message.attachment) {
        const attachment = document.createElement(message.attachment.type === 'video' ? 'video' : 'img');
        attachment.src = message.attachment.url;
        if (message.attachment.type === 'video') {
            attachment.controls = true;
        }
        attachment.className = 'attachment';
        messageItem.appendChild(attachment);
    }

    const actions = document.createElement('div');
    actions.className = 'actions';

    const currentUser = localStorage.getItem('username');
    if (currentUser === message.sender) {
        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.className = 'edit-btn';
        editButton.onclick = () => editMessage(messageItem, messageContent);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.onclick = () => deleteMessage(messageItem);

        actions.appendChild(editButton);
        actions.appendChild(deleteButton);
    }

    messageItem.appendChild(senderInfo);
    messageItem.appendChild(messageContent);
    messageItem.appendChild(actions);
    messageList.appendChild(messageItem);

    // Auto-scroll to the bottom
    messageList.scrollTop = messageList.scrollHeight;
}

// Function to send a message without refreshing the page
function sendMessage() {
    const messageContent = document.getElementById('message-content').value;
    const attachmentInput = document.getElementById('attachment');
    const sender = localStorage.getItem('username');

    if (messageContent.trim() === '' && !attachmentInput.files.length) return;

    let attachment = null;
    if (attachmentInput.files.length) {
        const file = attachmentInput.files[0];
        const url = URL.createObjectURL(file);
        attachment = { type: file.type.startsWith('video') ? 'video' : 'image', url };
    }

    const newMessage = { sender, content: messageContent, timestamp: new Date().toISOString(), attachment };
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    messages.push(newMessage);
    localStorage.setItem('messages', JSON.stringify(messages));

    addMessageToList(newMessage, messages.length - 1);
    document.getElementById('message-content').value = ''; // Clear the input field
    attachmentInput.value = ''; // Clear the attachment field
}

// Function to edit a message
function editMessage(messageItem, messageContent) {
    const newContent = prompt("Edit your message:", messageContent.textContent);
    if (newContent !== null) {
        messageContent.textContent = newContent;
        const messageId = messageItem.getAttribute('data-id');
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        const message = messages[messageId];
        if (message) {
            message.content = newContent;
            localStorage.setItem('messages', JSON.stringify(messages));
        }
    }
}

// Function to delete a message
function deleteMessage(messageItem) {
    if (confirm("Are you sure you want to delete this message?")) {
        const messageId = messageItem.getAttribute('data-id');
        let messages = JSON.parse(localStorage.getItem('messages')) || [];
        messages.splice(messageId, 1);
        localStorage.setItem('messages', JSON.stringify(messages));
        messageItem.remove();
        loadMessages(); // Refresh the message list
    }
}

// Function to load messages from localStorage on page load
function loadMessages() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const messageList = document.getElementById('message-list');
    messageList.innerHTML = ''; // Clear the list
    messages.forEach((message, index) => addMessageToList(message, index));
}

// Load messages when the app container is shown
document.addEventListener('DOMContentLoaded', function() {
    const appContainer = document.getElementById('app-container');
    if (!appContainer.classList.contains('hidden')) {
        loadMessages();
    }
});

// Example function to show the app container after login
function login() {
    const username = document.getElementById('username').value;
    if (username.trim() === '') {
        document.getElementById('login-error').textContent = 'Username is required';
        return;
    }

    localStorage.setItem('username', username);
    document.getElementById('login-container').classList.add('hidden');
    document.getElementById('app-container').classList.remove('hidden');
    loadMessages();
}

function logout() {
    localStorage.removeItem('username');
    document.getElementById('login-container').classList.remove('hidden');
    document.getElementById('app-container').classList.add('hidden');
}
