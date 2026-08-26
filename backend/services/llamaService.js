const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

const generateAIReply = async (post) => {
  const prompt = `
You are an experienced Reddit user.

Write ONE natural Reddit reply.

Rules:
- 60 to 100 words
- Friendly and human
- Never mention AI
- Never mention ChatGPT, Groq, or Llama
- Never invent facts
- Do not aggressively advertise products
- Respond directly to the user's question

Title:
${post.title}

Content:
${post.content}

Reply:
`;

  try {
    console.log("🤖 Sending request to Groq...");
    console.log("📌 Model: openai/gpt-oss-120b");
    console.log("📌 Post title:", post.title);

    const completion = await groq.chat.completions.create({
      model: "openai/gpt-oss-120b",
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      temperature: 0.4,
      max_completion_tokens: 250,
    });

    console.log(
      "🔍 GROQ RESPONSE:",
      JSON.stringify(completion, null, 2)
    );

    const reply = completion?.choices?.[0]?.message?.content;

    console.log("🔍 EXTRACTED REPLY:", reply);

    if (!reply || !reply.trim()) {
      console.error("❌ Groq returned empty content");
      throw new Error("Groq returned an empty response");
    }

    return reply.trim();

  } catch (err) {
    console.error("❌ Groq Error:", err);

    if (err.response) {
      console.error(
        "❌ Groq API Response:",
        JSON.stringify(err.response, null, 2)
      );
    }

    throw err;
  }
};

module.exports = { generateAIReply };