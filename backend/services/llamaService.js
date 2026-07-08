const axios = require("axios");

const generateAIReply = async (post) => {
const prompt = `
You are an experienced Reddit user.

Write ONE natural Reddit reply.

STRICT RULES:

- Never say you are an AI.
- Never mention Llama, ChatGPT or language models.
- Never mention "intent score", "sentiment", "competitor", "analysis", "database", "ForumMiner", or any internal system.
- Never invent facts.
- Never recommend random products unless the Reddit post explicitly asks for alternatives.
- If alternatives are requested, explain what criteria the user should compare instead of inventing product names.
- Sound friendly and conversational.
- Do not sound like marketing.
- Keep the reply between 60 and 100 words.
- Answer ONLY using the information below.

Title:
${post.title}

Content:
${post.content}

Reply:
Bad Reply:
"The intent score seems low."

Bad Reply:
"Try Llama."

Bad Reply:
"ChatGPT is better."

Bad Reply:
"Writing Assistant is the best."

Good Reply:
"It depends on which features matter most to you. I'd compare pricing, integrations and workflow before deciding."

Competitor:
${post.competitors?.join(", ") || "None"}

Intent Score:
${post.intentScore}

Sentiment:
${post.sentiment}

Reply only with the Reddit comment.
`;

    console.log("🔥 USING LLAMA");

  try {
    console.log("Sending request to Ollama...");

const response = await axios.post(
  "http://127.0.0.1:11434/api/generate",
  {
    model: "llama3.2:3b",
    prompt,
    stream: false,

    options: {
      temperature: 0.3,
      top_p: 0.8,
      num_predict: 120
    }
  }
);

console.log("Received response from Ollama");

    console.log("========== OLLAMA RESPONSE ==========");
console.log(response.data.response);
console.log("=====================================");

return response.data.response.trim();

  } catch (err) {
    console.error("OLLAMA ERROR:");
console.error(err.code);
console.error(err.message);

if (err.response) {
  console.error(err.response.data);
}
    return "Unable to generate AI reply.";
  }
};

module.exports = {
  generateAIReply,
};