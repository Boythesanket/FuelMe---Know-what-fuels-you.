import "dotenv/config"
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API,
});

async function main() {
  const chatCompletion = await groq.chat.completions.create({
    messages: [
      { role: "user", content: "Explain why low latency LLMs are important." },
    ],
    model: "openai/gpt-oss-20b",
  });

  console.log(chatCompletion.choices[0].message.content);
}

main();
