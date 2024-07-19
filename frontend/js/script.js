import { generateResponse, chatHistory } from '../../backend/index.js';
import '../css/style.css';

const chatInput = document.querySelector('.chat-input textarea');
const sendChatBtn = document.querySelector('.chat-input span');
const chatbox = document.querySelector('.chat');

const createChatLi = (message, className) => {
    const chatLi = document.createElement('li');
    chatLi.classList.add(className);
    let chatContent = className === 'chat-outgoing' ? `<p>${message}</p>` : `<span class="material-symbols-outlined">smart_toy</span><p>${message}</p>`;
    chatLi.innerHTML = chatContent;
    return chatLi;
}

const handleChat = async () => {
    const userMessage = chatInput.value.trim();
    if (!userMessage) return;

    chatbox.appendChild(createChatLi(userMessage, 'chat-outgoing'));
    chatInput.value = '';

    setTimeout(() => {
        const thinkingLi = createChatLi('Pensando...', 'chat-incoming');
        chatbox.appendChild(thinkingLi);

        generateResponse(userMessage).then(response => {
            chatbox.removeChild(thinkingLi);
            chatbox.appendChild(createChatLi(response, 'chat-incoming'));
        });
    }, 600);
}

sendChatBtn.addEventListener('click', handleChat);