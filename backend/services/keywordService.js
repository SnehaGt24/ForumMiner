const STOP_WORDS = [
  "the","a","an","is","are","was","were","to","for",
  "of","and","or","in","on","at","it","this","that",
  "with","be","been","have","has","had","i","you",
  "my","your","our","their","but","from","as"
];

const extractKeywords = (posts) => {
  const counts = {};

  posts.forEach((post) => {
    const text = `${post.title} ${post.content}`.toLowerCase();

    text
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .forEach((word) => {
        if (
          word.length > 3 &&
          !STOP_WORDS.includes(word)
        ) {
          counts[word] = (counts[word] || 0) + 1;
        }
      });
  });

  return Object.entries(counts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([keyword, count]) => ({
      keyword,
      count,
    }));
};

module.exports = {
  extractKeywords,
};