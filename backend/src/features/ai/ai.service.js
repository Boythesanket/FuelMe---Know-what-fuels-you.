import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API,
});

const response = await groq.chat.completions.create({
  model: "openai/gpt-oss-20b",
  messages: [
    {
      role: "user",
      content: "i ate 5 rotis, half plate khichdi, sev sabzi. how much calories, protein i got?",
    },
  ],
});

console.log(response.choices[0].message.content);
