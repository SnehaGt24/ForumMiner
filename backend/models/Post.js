const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
  {
    // Forum post fields
    title: {
      type: String,
      required: true,
      trim: true,
      minlength: 3,
      maxlength: 100,
    },

    content: {
      type: String,
      required: true,
      trim: true,
      minlength: 5,
    },

    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: false, // Reddit posts won't have a ForumMiner user
    },

    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],

    // ==========================
    // Reddit Integration Fields
    // ==========================

    source: {
  type: String,
  enum: ["reddit", "forum", "marketing"],
  default: "forum",
},

    redditId: {
      type: String,
      unique: true,
      sparse: true,
    },

    subreddit: {
      type: String,
      default: "",
    },

    redditUrl: {
      type: String,
      default: "",
    },

    upvotes: {
      type: Number,
      default: 0,
    },

    commentsCount: {
      type: Number,
      default: 0,
    },

    createdAtReddit: {
      type: Date,
    },

    // AI Analysis Fields
    intentScore: {
      type: Number,
      default: 0,
    },

    sentiment: {
      type: String,
      enum: ["Positive", "Neutral", "Negative"],
      default: "Neutral",
    },

   

    leadStatus: {
  type: String,
  enum: [
    "New",
    "Contacted",
    "Ignored"
  ],
  default: "New",
},

brandMentioned: {
  type: Boolean,
  default: false,
},

competitors: [
  {
    type: String,
  },
],
category: {
  type: String,
  default: null,
},
  },
  { timestamps: true }
);

module.exports = mongoose.model("Post", postSchema);