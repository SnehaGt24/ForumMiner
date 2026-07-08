const generateReply = (post) => {
  const competitor =
    post.competitors?.[0] ||
    post.category ||
    "the current tool";

  const title = (post.title || "").toLowerCase();
  const content = (post.content || "").toLowerCase();

  // Alternative seeking posts
  if (
    title.includes("alternative") ||
    title.includes("replace") ||
    title.includes("switch") ||
    title.includes("better") ||
    content.includes("alternative") ||
    content.includes("replace")
  ) {
    return `If you're considering replacing ${competitor}, it really depends on which features matter most to your team.

For many people, ease of use, pricing, integrations, and collaboration are the biggest deciding factors. I'd suggest trying one or two alternatives with a small project before fully migrating.

Would love to hear which option you end up choosing.`;
  }

  // Pricing complaints
  if (
    content.includes("expensive") ||
    content.includes("pricing") ||
    content.includes("cost")
  ) {
    return `Pricing is a common reason people start looking for alternatives to ${competitor}.

Before switching, compare the total cost along with features like automation, integrations, support, and scalability. Sometimes a lower-cost tool can provide everything a growing team actually needs.`;
  }

  // Comparison posts
  if (
    title.includes("vs") ||
    content.includes("compare")
  ) {
    return `Both options have their strengths.

If your priority is simplicity and collaboration, one tool may be a better fit. If you need advanced workflows, reporting, or automation, the other could be the stronger choice.

It usually comes down to your team's workflow rather than which tool is objectively better.`;
  }

  // High intent negative
  if (
    post.intentScore >= 80 &&
    post.sentiment === "Negative"
  ) {
    return `I can understand why you're exploring alternatives to ${competitor}.

Before making a decision, I'd recommend comparing pricing, integrations, customer support, and long-term scalability. Testing a few options with your team is often the easiest way to find the best fit.`;
  }

  // Positive experience
  if (post.sentiment === "Positive") {
    return `Thanks for sharing your experience.

It's always useful to hear how a tool performs in real-world workflows. If you've compared it with similar products, your insights could really help others making the same decision.`;
  }

  // Default
  return `Thanks for sharing your question.

If you're evaluating ${competitor}, I'd recommend comparing usability, pricing, integrations, and support before making a final decision. Hopefully that helps!`;
};

module.exports = {
  generateReply,
};