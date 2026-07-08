const cron = require("node-cron");
const Subreddit=require("../models/Subreddit");
const {fetchSubredditPosts}=require("../services/redditService");

cron.schedule("*/5 * * * *", () => {
  console.log("======================================");
  console.log("ForumMiner Scheduler Running...");
  console.log("Waiting for Reddit API integration...");
  console.log("======================================");
});

console.log("ForumMiner Reddit Scheduler Loaded");