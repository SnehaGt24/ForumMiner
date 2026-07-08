const competitors = [
  "Notion",
  "Slack",
  "Jira",
  "ClickUp",
  "Asana",
  "Monday",
  "Linear",
  "Trello",
  "Airtable",
  "HubSpot",
  "Salesforce",
  "Zendesk",
  "Monday.com",
];

const categories = [
  {
    keyword: "crm",
    category: "CRM software",
  },
  {
    keyword: "note",
    category: "note-taking app",
  },
  {
    keyword: "project",
    category: "project management tool",
  },
  {
    keyword: "task",
    category: "task management tool",
  },
  {
    keyword: "chat",
    category: "team communication platform",
  },
  {
    keyword: "support",
    category: "customer support software",
  },
];

const brandName = "ForumMiner";

const detectMentions = (post) => {
  const text = `${post.title} ${post.content}`.toLowerCase();

  const foundCompetitors = competitors.filter((name) =>
    text.includes(name.toLowerCase())
  );

  const matchedCategory =
    categories.find((item) =>
      text.includes(item.keyword)
    )?.category || null;

  return {
    brandMentioned: text.includes(
      brandName.toLowerCase()
    ),
    competitors: foundCompetitors,
    category: matchedCategory,
  };
};

module.exports = {
  detectMentions,
};