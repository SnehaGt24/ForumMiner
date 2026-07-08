const calculateIntentScore = (post) => {
  let score = 0;
  const reasons = [];

  const text = `${post.title} ${post.content}`.toLowerCase();

  // High-intent keywords
  const keywords = [
    "recommend",
    "alternative",
    "looking for",
    "help",
    "best",
    "need",
    "suggest",
    "advice",
    "tool",
    "software",
    "crm",
  ];

  keywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      score += 15;
      reasons.push(`Contains "${keyword}"`);
    }
  });

  // Upvotes
  const upvoteScore = Math.min(post.upvotes / 10, 20);
  score += upvoteScore;

  if (upvoteScore > 10) {
    reasons.push("High Reddit engagement");
  }

  // Comments
  const commentScore = Math.min(post.commentsCount / 5, 20);
  score += commentScore;

  if (commentScore > 10) {
    reasons.push("Active discussion");
  }

  // Question
  if (text.includes("?")) {
    score += 10;
    reasons.push("User is asking a question");
  }

  return {
    score: Math.min(Math.round(score), 100),
    reasons,
  };
};

const getIntentReasons = (post) => {
  const reasons = [];

  const text = `${post.title} ${post.content}`.toLowerCase();

  const keywords = [
    "recommend",
    "alternative",
    "looking for",
    "help",
    "best",
    "need",
    "suggest",
    "advice",
    "tool",
    "software",
    "crm",
  ];

  keywords.forEach((keyword) => {
    if (text.includes(keyword)) {
      reasons.push(`Contains keyword "${keyword}"`);
    }
  });

  if (post.upvotes >= 100) {
    reasons.push("High Reddit engagement");
  }

  if (post.commentsCount >= 20) {
    reasons.push("Active discussion");
  }

  if (text.includes("?")) {
    reasons.push("User is seeking advice");
  }

  if (post.sentiment === "Negative") {
    reasons.push("Negative sentiment");
  }

  if (post.competitors?.length) {
    reasons.push(`Mentions competitor: ${post.competitors[0]}`);
  }

  return reasons;
};

module.exports = {
  calculateIntentScore,
  getIntentReasons,
};