const chatBody = document.getElementById('ai-messages');
const chatWidget = document.getElementById('ai-widget');
const userInput = document.getElementById('ai-input');

// Toggle Chat Window
function toggleChat() {
    chatWidget.classList.toggle('open');
}

// Handle Enter Key
userInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        sendMessage();
    }
});

// AI LOGIC
function sendMessage() {
    const text = userInput.value.trim();
    if(text === "") return;

    // 1. Add User Message
    addMessage(text, 'user-msg');
    userInput.value = "";

    // 2. Simulate AI Thinking (Delay)
    setTimeout(() => {
        const response = getAIResponse(text.toLowerCase());
        addMessage(response, 'bot-msg');
    }, 800);
}

function addMessage(text, className) {
    const div = document.createElement('div');
    div.classList.add('msg', className);
    div.innerText = text;
    chatBody.appendChild(div);
    chatBody.scrollTop = chatBody.scrollHeight; // Auto scroll to bottom
}

// THE "BRAIN" (Keyword Matching)
function getAIResponse(input) {
    if (input.includes("hello") || input.includes("hi") || input.includes("namaste")) {
        return "Namaste! Welcome to Shree Sambaji Raje HS. How can I assist you?";
    }
    else if (input.includes("secretary") || input.includes("chairman") || input.includes("contact")) {
        return "The Secretary's office is open from 6 PM to 8 PM. Emergency Contact: 99XXXXXXX.";
    }
    else if (input.includes("water") || input.includes("tank")) {
        return "Water supply timings are: Morning 6 AM - 9 AM and Evening 5 PM - 8 PM.";
    }
    else if (input.includes("bill") || input.includes("maintenance") || input.includes("pay")) {
        return "You can pay maintenance via the 'Member' section on this website or UPI to society@upi.";
    }
    else if (input.includes("parking")) {
        return "Visitor parking is available at Gate 2. Members must park in allotted slots.";
    }
    else if (input.includes("garbage") || input.includes("waste")) {
        return "Garbage collection truck arrives daily at 7:30 AM.";
    }
    else {
        return "I am not sure about that. Please check the 'Enquiry' section or contact the office.";
    }
}