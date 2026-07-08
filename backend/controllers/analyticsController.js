const Post = require("../models/Post");
const {
  extractKeywords,
} = require("../services/keywordService");
const getAnalytics = async (req, res) => {
  try {
    const totalPosts = await Post.countDocuments();

    const redditPosts = await Post.countDocuments({
      source: "reddit",
    });

    const forumPosts = await Post.countDocuments({
      source: "forum",
    });

    const highIntentPosts = await Post.countDocuments({
      intentScore: { $gte: 60 },
    });

    const positivePosts = await Post.countDocuments({
      sentiment: "Positive",
    });

    const neutralPosts = await Post.countDocuments({
      sentiment: "Neutral",
    });

    const negativePosts = await Post.countDocuments({
      sentiment: "Negative",
    });

    const topSubreddits = await Post.aggregate([
      {
        $match: {
          source: "reddit",
        },
      },
      {
        $group: {
          _id: "$subreddit",
          count: {
            $sum: 1,
          },
        },
      },
      {
        $sort: {
          count: -1,
        },
      },
      {
        $limit: 5,
      },
    ]);
    
    const allPosts = await Post.find();

const trendingKeywords =
  extractKeywords(allPosts);

  const competitorStats = await Post.aggregate([
  {
    $unwind: "$competitors",
  },
  {
    $group: {
      _id: "$competitors",
      count: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      count: -1,
    },
  },
  {
    $limit: 10,
  },
]);

const intentTimeline = await Post.aggregate([
  {
    $match: {
      source: "reddit",
    },
  },
  {
    $group: {
      _id: {
        year: {
          $year: "$createdAt",
        },
        month: {
          $month: "$createdAt",
        },
        day: {
          $dayOfMonth: "$createdAt",
        },
      },
      averageIntent: {
        $avg: "$intentScore",
      },
      totalPosts: {
        $sum: 1,
      },
    },
  },
  {
    $sort: {
      "_id.year": 1,
      "_id.month": 1,
      "_id.day": 1,
    },
  },
]);

    res.json({
  totalPosts,
  redditPosts,
  forumPosts,
  highIntentPosts,
  positivePosts,
  neutralPosts,
  negativePosts,
  topSubreddits,
  trendingKeywords,
  competitorStats,
  intentTimeline,
});
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAnalytics,
};