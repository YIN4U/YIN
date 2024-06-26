
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