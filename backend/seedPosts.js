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
  }
];

async function seed() {
  try {
    await Post.deleteMany(); // optional (clears old posts)

    await Post.insertMany(posts);

    console.log("✅ Seeded posts successfully!");
    process.exit();
  } catch (err) {
    console.log("❌ Error seeding:", err);
    process.exit(1);
  }
}

seed();