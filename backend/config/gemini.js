import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(import.meta.env.API_KEY);

if (!API_KEY) {
    throw new Error("API_KEY no está definida en el entorno");
}

export default genAI;
