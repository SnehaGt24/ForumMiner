const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const MODELS = [
  "openai/gpt-oss-120b",
  "llama-3.3-70b-versatile",
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const generateAIReply = async (post) => {
  const prompt = `
You are an experienced Reddit user.

Write ONE natural Reddit reply to the post below.

Rules:
- 60 to 100 words
- Friendly and conversational
- Directly address the user's question
- Never mention AI, ChatGPT, Groq, or Llama
- Never invent facts
- Do not aggressively advertise anything
- Do not use headings
- Return ONLY the Reddit reply
- No quotation marks around the reply

Title:
${post.title || ""}

Content:
${post.content || ""}
`;

  let lastError = null;

  // Try each model, with retries
  for (const model of MODELS) {
    for (let attempt = 1; attempt <= 3; attempt++) {
      try {
        console.log(
          `🤖 Groq attempt ${attempt}/3 | model: ${model}`
        );

        const completion = await groq.chat.completions.create({
          model,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
          reasoning_effort: model === "openai/gpt-oss-120b"
            ? "low"
            : undefined,
          max_completion_tokens: 500,
        });

        const reply =
          completion?.choices?.[0]?.message?.content?.trim();

        // Successfully generated reply
        if (reply) {
          console.log(
            `✅ AI reply generated using ${model}`
          );

          return reply;
        }

        console.warn(
          `⚠️ Empty response from ${model}, attempt ${attempt}`
        );

        lastError = new Error(
          `Empty response from ${model}`
        );

      } catch (err) {
        lastError = err;

        console.error(
          `❌ Groq error | ${model} | attempt ${attempt}:`,
          err.message
        );

        // Wait before retrying
        if (attempt < 3) {
          await sleep(1500 * attempt);
        }
      }
    }
  }

  // Do NOT let an external AI failure break the application
  console.error(
    "❌ All Groq attempts failed:",
    lastError?.message
  );

  return `I’d compare a few alternatives based on pricing, integrations, ease of use, and the features you actually need. It’s also worth checking how easy each option is to migrate to and whether it scales well as your workflow grows.`;
};

module.exports = { generateAIReply };