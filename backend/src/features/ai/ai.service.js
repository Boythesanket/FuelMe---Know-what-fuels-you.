import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API,
});

const SYSTEM_PROMPT = `
You are FuelMe, a concise nutrition tracking assistant.

STYLE:
- Sound natural and direct.
- Answer only what the user asks.
- Use at most 4 short bullet points for nutrition.
- Never repeat the answer in a second format.
- No tables unless requested.
- No generic introductions, conclusions, or follow-up offers.
- Keep replies under 60 words unless the user asks for detail.

NUTRITION:
- Report calories, protein, carbohydrates, and fat when relevant.
- Never invent exact nutrition values.
- If portion size is unclear, state your assumption briefly.
- Treat AI-generated nutrition values as estimates, not verified facts.
- Never claim to have checked a database unless one was actually queried.

For a simple food question, give the answer immediately.
`;

export async function generateNutritionResponse(message) {
  if (!message?.trim()) {
    throw new Error("Message is required!");
  }

  const chatCompletion = await groq.chat.completions.create({
    model: "openai/gpt-oss-20b",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: message },
    ],
    reasoning_effort: "low",
    max_completion_tokens: 200,
  });

  return chatCompletion.choices[0].message.content;
}

async function main() {
  const response = await generateNutritionResponse(
    "I are two boiled eggs. What nutrition do they provide?",
  );

  console.log(response);
}

if (process.argv[1]?.endsWith("ai.service.js")) {
  main().catch(console.error);
}

main();
