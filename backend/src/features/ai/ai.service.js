import "dotenv/config";
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API,
});

const interactions = await ai.interactions.create({
  model: "gemini-3.6-flash",
  input: "What is node js?",
});

console.log(interactions.output_text);
