class PortfolioChat {
    constructor() {
        this.messages = [];
        this.initializeChat();
    }

    initializeChat() {
        // Create chat widget HTML
        const chatWidget = document.createElement('div');
        chatWidget.className = 'chat-widget';
        chatWidget.innerHTML = `
            <div class="chat-header">
                <h3>Portfolio Assistant</h3>
                <span class="minimize-chat">▼</span>
            </div>
            <div class="chat-messages"></div>
            <div class="chat-input">
                <input type="text" placeholder="Ask me anything about the portfolio...">
                <button>Send</button>
            </div>
        `;
        document.body.appendChild(chatWidget);

        // Add event listeners
        this.setupEventListeners();
        
        // Add welcome message
        this.addMessage("Hi! I'm your portfolio assistant. Feel free to ask me anything about Jay's skills, projects, or experience!", 'bot');
    }

    setupEventListeners() {
        const chatHeader = document.querySelector('.chat-header');
        const chatInput = document.querySelector('.chat-input input');
        const sendButton = document.querySelector('.chat-input button');
        const minimizeBtn = document.querySelector('.minimize-chat');

        chatHeader.addEventListener('click', () => {
            document.querySelector('.chat-widget').classList.toggle('expanded');
            minimizeBtn.textContent = document.querySelector('.chat-widget').classList.contains('expanded') ? '▼' : '▲';
        });

        sendButton.addEventListener('click', () => this.handleUserMessage());
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.handleUserMessage();
            }
        });
    }

    handleUserMessage() {
        const inputElement = document.querySelector('.chat-input input');
        const message = inputElement.value.trim();
        
        if (message) {
            this.addMessage(message, 'user');
            inputElement.value = '';
            this.generateResponse(message);
        }
    }

    addMessage(text, sender) {
        const messagesContainer = document.querySelector('.chat-messages');
        const messageElement = document.createElement('div');
        messageElement.className = `message ${sender}-message`;
        messageElement.textContent = text;
        messagesContainer.appendChild(messageElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    generateResponse(userMessage) {
        // Simple response logic based on keywords
        const response = this.getResponse(userMessage.toLowerCase());
        setTimeout(() => {
            this.addMessage(response, 'bot');
        }, 500);
    }

    getResponse(message) {
        if (message.includes('project') || message.includes('projects')) {
            return "I've worked on several exciting projects! Some highlights include a Note Taking Application, Express CRUD Application, and more. You can find them in the Projects section of the portfolio. Would you like specific details about any of them?";
        }
        else if (message.includes('skill') || message.includes('skills') || message.includes('technology') || message.includes('technologies')) {
            return "I'm proficient in both frontend and backend development! My skills include HTML, CSS, JavaScript, React, Node.js, Express.js, and SQL. Check out the Experience section for a complete list of my technical skills.";
        }
        else if (message.includes('experience') || message.includes('work')) {
            return "I have experience in full-stack development, with expertise in both frontend and backend technologies. You can find my detailed experience in the Experience section of the portfolio.";
        }
        else if (message.includes('contact') || message.includes('hire') || message.includes('email')) {
            return "You can contact me through the Contact section of the portfolio. Feel free to reach out for any opportunities or collaborations!";
        }
        else if (message.includes('certificate') || message.includes('certification')) {
            return "I have several certifications in web development and programming. You can view them all in the Certificates section of my portfolio.";
        }
        else {
            return "I'd be happy to help! You can ask me about my projects, skills, experience, certifications, or how to get in touch. What would you like to know?";
        }
    }
}

// Initialize chat when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new PortfolioChat();
});
