const express = require("express");
const router = express.Router();

const {
  getSubredditPosts,
} = require("../controllers/redditController");

// NEW route

// Existing route
router.get("/:subreddit", getSubredditPosts);



module.exports = router;