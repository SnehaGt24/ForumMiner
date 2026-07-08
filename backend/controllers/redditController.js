const {
  calculateIntentScore,
} = require("../services/intentScoreService");
const { fetchSubredditPosts } = require("../services/redditService");
const Post = require("../models/Post");
const {
  analyzeSentiment,
} = require("../services/sentimentService");
const Subreddit = require("../models/Subreddit");
const { detectMentions } = require("../services/competitorService");

// Existing endpoint
const getSubredditPosts = async (req, res) => {
  try {
    const { subreddit } = req.params;
    const posts = await fetchSubredditPosts(subreddit);
    res.status(200).json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};
module.exports = {
  getSubredditPosts,
};