const mongoose = require("mongoose");
const Post = require("./models/Post");

mongoose.connect("mongodb://127.0.0.1:27017/forumminer");

const posts = [
  {
    title: "Is there any alternative to HubSpot for small teams?",
    content: "HubSpot is too expensive. Need cheaper CRM options.",
    source: "reddit",
    subreddit: "marketing",
    intentScore: 92,
    sentiment: "Negative",
    competitors: ["HubSpot"],
    isAlternativeRequest: true
  },
  {
    title: "Trello feels outdated now. What are better tools?",
    content: "Looking for something more powerful than Trello.",
    source: "reddit",
    subreddit: "productivity",
    intentScore: 85,
    sentiment: "Negative",
    competitors: ["Trello"],
    isAlternativeRequest: true
  },
  {
    title: "Best Salesforce alternatives for startups?",
    content: "Salesforce is too complex and expensive.",
    source: "reddit",
    subreddit: "sales",
    intentScore: 95,
    sentiment: "Negative",
    competitors: ["Salesforce"],
    isAlternativeRequest: true
  },
  {
    title: "Looking for cheaper Mailchimp alternatives",
    content: "Mailchimp pricing is too high for us.",
    source: "reddit",
    subreddit: "emailmarketing",
    intentScore: 88,
    sentiment: "Negative",
    competitors: ["Mailchimp"],
    isAlternativeRequest: true
  },
  {
    title: "Notion alternative for student planning?",
    content: "Need something simpler than Notion for notes.",
    source: "reddit",
    subreddit: "students",
    intentScore: 80,
    sentiment: "Neutral",
    competitors: ["Notion"],
    isAlternativeRequest: true
  },
  {
    title: "Slack alternatives for remote teams?",
    content: "Slack is getting too noisy and expensive.",
    source: "reddit",
    subreddit: "remoteWork",
    intentScore: 90,
    sentiment: "Negative",
    competitors: ["Slack"],
    isAlternativeRequest: true
  },
  {
  title: "Freshsales vs HubSpot for a growing startup?",
  content: "Our team has outgrown spreadsheets. Is Freshsales a better value than HubSpot?",
  source: "reddit",
  subreddit: "startups",
  intentScore: 87,
  sentiment: "Neutral",
  competitors: ["HubSpot", "Freshsales"],
  isAlternativeRequest: true
},
{
  title: "Jira is too complicated for our small team",
  content: "We only have 8 developers. Looking for something simpler than Jira.",
  source: "reddit",
  subreddit: "programming",
  intentScore: 91,
  sentiment: "Negative",
  competitors: ["Jira"],
  isAlternativeRequest: true
},
{
  title: "ClickUp or Asana for project management?",
  content: "Need task tracking, reports, and collaboration. Which one would you choose?",
  source: "reddit",
  subreddit: "productivity",
  intentScore: 84,
  sentiment: "Neutral",
  competitors: ["ClickUp", "Asana"],
  isAlternativeRequest: false
},
{
  title: "Discord instead of Slack for work?",
  content: "Has anyone replaced Slack with Discord for a remote development team?",
  source: "reddit",
  subreddit: "remotework",
  intentScore: 83,
  sentiment: "Neutral",
  competitors: ["Slack", "Discord"],
  isAlternativeRequest: true
},
{
  title: "Looking for a cheaper Zoom alternative",
  content: "Zoom licensing is becoming expensive. What do startups usually use?",
  source: "reddit",
  subreddit: "business",
  intentScore: 90,
  sentiment: "Negative",
  competitors: ["Zoom"],
  isAlternativeRequest: true
},
{
  title: "Can Zoho CRM replace Salesforce?",
  content: "Salesforce feels too enterprise-focused for our business.",
  source: "reddit",
  subreddit: "sales",
  intentScore: 93,
  sentiment: "Negative",
  competitors: ["Salesforce", "Zoho CRM"],
  isAlternativeRequest: true
},
{
  title: "Monday.com vs Trello",
  content: "Thinking of moving away from Trello. Is Monday.com worth it?",
  source: "reddit",
  subreddit: "projectmanagement",
  intentScore: 86,
  sentiment: "Neutral",
  competitors: ["Trello", "Monday.com"],
  isAlternativeRequest: true
},
{
  title: "Google Meet or Microsoft Teams?",
  content: "Which platform works better for meetings with clients?",
  source: "reddit",
  subreddit: "technology",
  intentScore: 74,
  sentiment: "Neutral",
  competitors: ["Google Meet", "Microsoft Teams"],
  isAlternativeRequest: false
},
{
  title: "Best CRM under $20 per user?",
  content: "Need affordable CRM software for a five-person sales team.",
  source: "reddit",
  subreddit: "crm",
  intentScore: 94,
  sentiment: "Negative",
  competitors: [],
  isAlternativeRequest: true
},
{
  title: "Mailerlite vs Mailchimp",
  content: "Mailchimp pricing is increasing. Is Mailerlite a good replacement?",
  source: "reddit",
  subreddit: "emailmarketing",
  intentScore: 89,
  sentiment: "Negative",
  competitors: ["Mailchimp", "MailerLite"],
  isAlternativeRequest: true
},
{
  title: "Confluence or Notion for documentation?",
  content: "Need a documentation platform for our engineering team.",
  source: "reddit",
  subreddit: "devops",
  intentScore: 76,
  sentiment: "Neutral",
  competitors: ["Notion", "Confluence"],
  isAlternativeRequest: false
},
{
  title: "Freshdesk review after 6 months",
  content: "We've been happy with Freshdesk. Support automation works really well.",
  source: "reddit",
  subreddit: "customersupport",
  intentScore: 55,
  sentiment: "Positive",
  competitors: ["Freshdesk"],
  isAlternativeRequest: false
},
{
  title: "HubSpot onboarding was surprisingly easy",
  content: "Despite the pricing, the onboarding process was smooth and support was excellent.",
  source: "reddit",
  subreddit: "marketing",
  intentScore: 50,
  sentiment: "Positive",
  competitors: ["HubSpot"],
  isAlternativeRequest: false
},
{
  title: "Anyone using Airtable as a CRM?",
  content: "Trying to avoid paying for a dedicated CRM. Does Airtable work well?",
  source: "reddit",
  subreddit: "nocode",
  intentScore: 82,
  sentiment: "Neutral",
  competitors: ["Airtable"],
  isAlternativeRequest: false
},
{
  title: "Zendesk is becoming too expensive",
  content: "Looking at Freshdesk and Help Scout instead. Any suggestions?",
  source: "reddit",
  subreddit: "customersupport",
  intentScore: 91,
  sentiment: "Negative",
  competitors: ["Zendesk", "Freshdesk"],
  isAlternativeRequest: true
},
{
  title: "Pipedrive vs Zoho CRM",
  content: "Need simple lead management without enterprise complexity.",
  source: "reddit",
  subreddit: "sales",
  intentScore: 86,
  sentiment: "Neutral",
  competitors: ["Pipedrive", "Zoho CRM"],
  isAlternativeRequest: false
},
{
  title: "Thinking of replacing Notion",
  content: "Notion has become slow with large workspaces. Looking for faster alternatives.",
  source: "reddit",
  subreddit: "productivity",
  intentScore: 90,
  sentiment: "Negative",
  competitors: ["Notion"],
  isAlternativeRequest: true
},
{
  title: "Intercom pricing shocked us",
  content: "We're evaluating Crisp and Freshchat because Intercom is beyond our budget.",
  source: "reddit",
  subreddit: "saas",
  intentScore: 88,
  sentiment: "Negative",
  competitors: ["Intercom", "Freshchat"],
  isAlternativeRequest: true
},
{
  title: "Best scheduling tool besides Calendly?",
  content: "Need a meeting scheduler that's cheaper than Calendly.",
  source: "reddit",
  subreddit: "productivity",
  intentScore: 84,
  sentiment: "Negative",
  competitors: ["Calendly"],
  isAlternativeRequest: true
},
{
  title: "Switched from Trello to ClickUp",
  content: "After using ClickUp for three months, our team's productivity has improved a lot.",
  source: "reddit",
  subreddit: "projectmanagement",
  intentScore: 60,
  sentiment: "Positive",
  competitors: ["Trello", "ClickUp"],
  isAlternativeRequest: false
}
];

async function seed() {
  try {
    await Post.deleteMany({ source: "reddit" });

    await Post.insertMany(posts);

    console.log("✅ Seeded posts successfully!");
    process.exit();
  } catch (err) {
    console.log("❌ Error seeding:", err);
    process.exit(1);
  }
}

seed();