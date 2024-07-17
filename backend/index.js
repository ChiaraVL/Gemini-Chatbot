import genAI from './config/gemini.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

let chatHistory = [];

async function main() {

  while (true) {
    const userInput = readlineSync.question(colors.magenta('You: '));

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

      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.cyan('Bot: ') + text);
        chatHistory = [];
        return;
      }

      console.log(colors.cyan('Bot: ') + text);
    } catch (error) { 
      console.error(colors.red(error));
    }
  }
}

main();
