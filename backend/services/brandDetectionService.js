const competitors = [
  "Notion",
  "Slack",
  "Discord",
  "Linear",
  "Jira",
  "ClickUp",
  "Trello",
  "Monday",
  "Asana",
  "Airtable",
];

const ourBrand = "ForumMiner";

const detectMentions = (post) => {
  const text =
    `${post.title} ${post.content}`.toLowerCase();

  const mentionedCompetitors = competitors.filter((c) =>
    text.includes(c.toLowerCase())
  );

  const brandMentioned =
    text.includes(ourBrand.toLowerCase());

  return {
    brandMentioned,
    competitors: mentionedCompetitors,
  };
};

module.exports = {
  detectMentions,
};