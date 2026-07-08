const axios = require("axios");

const fetchSubredditPosts = async (subreddit) => {
  try {
    const response = await axios.get(
      `https://www.reddit.com/r/${subreddit}/new.json?limit=20`,
      {
        headers: {
          "User-Agent": "ForumMiner/1.0",
        },
      }
    );

    return response.data.data.children.map((post) => ({
      redditId: post.data.id,
      title: post.data.title,
      content: post.data.selftext,
      subreddit: post.data.subreddit,
      redditUrl: `https://reddit.com${post.data.permalink}`,
      upvotes: post.data.ups,
      commentsCount: post.data.num_comments,
      createdAtReddit: new Date(post.data.created_utc * 1000),
    }));
  } catch (error) {
console.error("Status:", error.response?.status);
console.error("Response:", error.response?.data);
console.error("Error:", error.message);    throw error;
  }
};

module.exports = { fetchSubredditPosts };