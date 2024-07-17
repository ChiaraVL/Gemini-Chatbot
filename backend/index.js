import genAI from './config/gemini.js';
import colors from 'colors';

export let chatHistory = [];

export async function generateResponse(userInput) {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        const chat = model.startChat({
            history: chatHistory,
            generationConfig: {
                maxOutputTokens: 100,
            },
        });

        const result = await chat.sendMessage(userInput);
        const response = await result.response;
        const text = response.text();

        chatHistory.push({ role: 'user', parts: [{ text: userInput }] });
        chatHistory.push({ role: 'model', parts: [{ text: text }] });

        return text;
    } catch (error) { 
        console.error(colors.red(error));
        return "Hubo un error generando la respuesta.";
    }
}
