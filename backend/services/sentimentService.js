const analyzeSentiment = (post) => {
  const text = `${post.title} ${post.content}`.toLowerCase();

  const positiveWords = [
    "love",
    "great",
    "excellent",
    "awesome",
    "amazing",
    "best",
    "happy",
    "fantastic",
  ];

  const negativeWords = [
    "bad",
    "hate",
    "problem",
    "issue",
    "slow",
    "worst",
    "bug",
    "broken",
    "terrible",
    "frustrated",
  ];

  let positive = 0;
  let negative = 0;

  positiveWords.forEach((word) => {
    if (text.includes(word)) positive++;
  });

  negativeWords.forEach((word) => {
    if (text.includes(word)) negative++;
  });

  if (positive > negative) return "Positive";
  if (negative > positive) return "Negative";

  return "Neutral";
};

module.exports = {
  analyzeSentiment,
};