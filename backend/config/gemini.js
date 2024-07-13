import { GoogleGenerativeAI } from "@google/generative-ai";
import { config as dotenvConfig } from 'dotenv';

dotenvConfig();

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

export default genAI;