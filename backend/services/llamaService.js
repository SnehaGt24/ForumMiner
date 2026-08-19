const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});


const generateAIReply = async (post) => {

  const prompt = `
You are an experienced Reddit user.

Write ONE natural Reddit reply.

STRICT RULES:

- Never say you are an AI.
- Never mention ChatGPT, Groq, Llama or language models.
- Never invent facts.
- Never recommend products unless the user asks.
- If alternatives are requested, explain what the user should compare.
- Friendly.
- Human sounding.
- Between 60 and 100 words.

Title:
${post.title}

Content:
${post.content}

Competitor:
${post.competitors?.join(", ") || "None"}

Reply:
`;

  try {

    const completion =
      await groq.chat.completions.create({

        model: "openai/gpt-oss-120b",

        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],

        temperature: 0.4,

        max_completion_tokens: 300,
      });

    const message = completion.choices?.[0]?.message;

console.log("🤖 GROQ MESSAGE:", message);

const reply =
  message?.content?.trim() ||
  message?.reasoning?.trim() ||
  "";

if (!reply) {
  throw new Error("Groq returned an empty response");
}

return reply;

} catch (err) {
  console.error("❌ GROQ ERROR");
  console.error("Message:", err.message);
  console.error("Status:", err.status);
  console.error("Code:", err.code);
  console.error("Full error:", err);

  throw err;
}

};

module.exports = {
  generateAIReply,
};