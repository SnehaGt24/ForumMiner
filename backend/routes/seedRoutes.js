const express = require("express");
const router = express.Router();
const Post = require("../models/Post");

// Seed Reddit demo posts
router.post("/posts", async (req, res) => {
  try {
    const posts = [

{
title: "Looking for a better alternative to Trello",
content: "Our team has outgrown Trello. Need something with automation and reporting.",
source: "reddit",
subreddit: "productivity",
redditUrl: "https://www.reddit.com/r/productivity/search/?q=Trello%20alternative&restrict_sr=1",
upvotes: 215,
commentsCount: 61,
intentScore: 92,
sentiment: "Negative",
leadStatus: "New",
competitors:["Trello"]
},

{
title:"HubSpot is getting too expensive",
content:"Small business owner here. Is there a cheaper CRM with similar features?",
source:"reddit",
subreddit:"marketing",
redditUrl:"https://www.reddit.com/r/marketing/search/?q=HubSpot%20alternative&restrict_sr=1",
upvotes:188,
commentsCount:54,
intentScore:95,
sentiment:"Negative",
leadStatus:"New",
competitors:["HubSpot"]
},

{
title:"Anyone switched from Salesforce recently?",
content:"We're evaluating Salesforce alternatives for our startup.",
source:"reddit",
subreddit:"sales",
redditUrl:"https://www.reddit.com/r/sales/search/?q=Salesforce%20alternative&restrict_sr=1",
upvotes:142,
commentsCount:41,
intentScore:91,
sentiment:"Neutral",
leadStatus:"New",
competitors:["Salesforce"]
},

{
title:"Mailchimp deliverability has dropped",
content:"Thinking about changing email platforms. Recommendations?",
source:"reddit",
subreddit:"Emailmarketing",
redditUrl:"https://www.reddit.com/r/emailmarketing/search/?q=Mailchimp%20alternative&restrict_sr=1",
upvotes:129,
commentsCount:37,
intentScore:87,
sentiment:"Negative",
leadStatus:"New",
competitors:["Mailchimp"]
},

{
title:"Best AI writing tool in 2026?",
content:"Currently using Jasper but looking for something better.",
source:"reddit",
subreddit:"ArtificialIntelligence",
redditUrl:"https://www.reddit.com/r/ArtificialIntelligence/search/?q=Jasper%20AI&restrict_sr=1",
upvotes:301,
commentsCount:92,
intentScore:82,
sentiment:"Neutral",
leadStatus:"New",
competitors:["Jasper"]
},

{
title:"Can Notion replace ClickUp?",
content:"Trying to simplify our workspace.",
source:"reddit",
subreddit:"Notion",
redditUrl:"https://www.reddit.com/r/Notion/search/?q=ClickUp&restrict_sr=1",
upvotes:104,
commentsCount:25,
intentScore:78,
sentiment:"Positive",
leadStatus:"New",
competitors:["ClickUp"]
},

{
title:"Best Zapier alternative?",
content:"Automation costs are increasing rapidly.",
source:"reddit",
subreddit:"SaaS",
redditUrl:"https://www.reddit.com/r/SaaS/search/?q=Zapier%20alternative&restrict_sr=1",
upvotes:167,
commentsCount:49,
intentScore:94,
sentiment:"Negative",
leadStatus:"New",
competitors:["Zapier"]
},

{
title:"Linear vs Jira for engineering teams",
content:"Looking for opinions before migrating.",
source:"reddit",
subreddit:"programming",
redditUrl:"https://www.reddit.com/r/programming/search/?q=Jira%20Linear&restrict_sr=1",
upvotes:260,
commentsCount:81,
intentScore:76,
sentiment:"Neutral",
leadStatus:"New",
competitors:["Jira"]
},

{
title:"Can Grammarly be replaced by AI?",
content:"Need something more affordable.",
source:"reddit",
subreddit:"writing",
redditUrl:"https://www.reddit.com/r/writing/search/?q=Grammarly&restrict_sr=1",
upvotes:155,
commentsCount:43,
intentScore:83,
sentiment:"Negative",
leadStatus:"New",
competitors:["Grammarly"]
},

{
title:"Best customer support software?",
content:"Zendesk pricing is difficult for startups.",
source:"reddit",
subreddit:"CustomerSuccess",
redditUrl:"https://www.reddit.com/r/customersuccess/search/?q=Zendesk&restrict_sr=1",
upvotes:191,
commentsCount:57,
intentScore:90,
sentiment:"Negative",
leadStatus:"New",
competitors:["Zendesk"]
}

];

    // Remove old Reddit demo posts
    await Post.deleteMany({ source: "reddit" });

    // Insert new posts
    await Post.insertMany(posts);

    res.json({
      success: true,
      message: "10 Reddit demo posts seeded successfully!",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      error: err.message,
    });
  }
});

module.exports = router;