const express = require("express");
const Post = require("../models/Post");
const authMiddleware = require("../middleware/authMiddleware");
const { likePost } = require("../controllers/postController");
const router = express.Router();

router.post("/:id/like", authMiddleware, likePost);

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = new Post({
      title,
      content,
      author: req.user.id
    });

    await post.save();

    res.status(201).json({
      message: "Post created successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
//search
router.get("/search", async (req, res) => {
  try {
    const query = req.query.q;

    const posts = await Post.find({
      $or: [
        { title: { $regex: query, $options: "i" } },
        { content: { $regex: query, $options: "i" } }
      ]
    }).populate("author", "username email");

    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// Get Single Post
router.get("/:id", async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate("author", "username email");

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    res.status(200).json(post);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Get All Posts
router.get("/", async (req, res) => {
  try {
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Delete Post
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this post"
      });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Post deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Update Post
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        message: "Post not found"
      });
    }

    if (post.author.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to update this post"
      });
    }

    post.title = title || post.title;
    post.content = content || post.content;

    await post.save();

    res.status(200).json({
      message: "Post updated successfully",
      post
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});

module.exports = router;

