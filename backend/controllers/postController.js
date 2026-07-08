const Post = require("../models/Post");

// ❤️ LIKE / UNLIKE POST
const likePost = async (req, res) => {
  try {
    const postId = req.params.id;
    const userId = req.user.id; // coming from login middleware

    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // check if user already liked
    const alreadyLiked = post.likes.includes(userId);

    if (alreadyLiked) {
      // ❌ unlike
      post.likes = post.likes.filter(
        (id) => id.toString() !== userId
      );
    } else {
      // ❤️ like
      post.likes.push(userId);
    }

    await post.save();

    res.json({
      message: alreadyLiked ? "Unliked" : "Liked",
      totalLikes: post.likes.length,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const getHighIntentPosts = async (req, res) => {
  try {
    const posts = await Post.find({
      intentScore: { $gte: 60 }
    })
      .sort({ intentScore: -1 })
      .limit(10);

    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const { generateAIReply } = require("../services/llamaService");

const getAIReply = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

const reply = await generateAIReply(post);

    res.json({
      postId: post._id,
      reply,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateLeadStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      {
        leadStatus: status,
      },
      {
        new: true,
      }
    );

    res.json(post);

  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  likePost,
  getHighIntentPosts,
  getAIReply,
  updateLeadStatus,
};
