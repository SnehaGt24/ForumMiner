const express = require("express");
const Post = require("../models/Post");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");
const router = express.Router();

const {
  likePost,
  getHighIntentPosts,
  getAIReply,
  updateLeadStatus,
} = require("../controllers/postController");

router.post("/:id/like", authMiddleware, likePost);

router.get("/high-intent", getHighIntentPosts);
router.get("/:id/ai-reply", getAIReply);
router.put("/:id/status",updateLeadStatus);

// Create Post
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, content } = req.body;

    // Validation
    if (!title || !content) {
      return res.status(400).json({
        message: "Title and content are required"
      });
    }

    const post = new Post({
      title: title.trim(),
      content: content.trim(),
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

    // Check if search query is provided
    if (!query || query.trim() === "") {
      return res.status(400).json({
        message: "Search query is required"
      });
    }

    const posts = await Post.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i"
          }
        },
        {
          content: {
            $regex: query,
            $options: "i"
          }
        }
      ]
    }).populate("author", "username email");

    res.status(200).json(posts);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
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

// GET POSTS BY USER ID
router.get("/user/:id", async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.id })
      .populate("author", "name email")
      .sort({ createdAt: -1 });

    res.json(posts);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get All Posts
router.get("/", async (req, res) => {
  try {
    // Current page (default = 1)
    const page = parseInt(req.query.page) || 1;

    // Number of posts per page (default = 5)
    const limit = parseInt(req.query.limit) || 5;

    // Skip posts from previous pages
    const skip = (page - 1) * limit;

    // Total number of posts
    const totalPosts = await Post.countDocuments();
    console.log("TOTAL POSTS:", totalPosts);
    
    // Fetch paginated posts
    const posts = await Post.find()
      .populate("author", "username email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    res.status(200).json({
      currentPage: page,
      totalPages: Math.ceil(totalPosts / limit),
      totalPosts,
      posts
    });

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
    // Delete all comments related to this post
await Comment.deleteMany({
  post: req.params.id
});

// Delete the post
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

// Validation
if (!title || !content) {
  return res.status(400).json({
    message: "Title and content are required"
  });
}

// UPDATE
post.title = title.trim();
post.content = content.trim();

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

