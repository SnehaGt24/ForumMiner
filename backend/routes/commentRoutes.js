const express = require("express");
const Comment = require("../models/Comment");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Create Comment
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { text, postId } = req.body;

    if (!text || !postId) {
      return res.status(400).json({
        message: "Text and Post ID are required"
      });
    }

    const comment = new Comment({
      text,
      user: req.user.id,
      post: postId
    });

    await comment.save();

    res.status(201).json({
      message: "Comment added successfully",
      comment
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Get Comments For A Post
router.get("/:postId", async (req, res) => {
  try {
    const comments = await Comment.find({
      post: req.params.postId
    })
      .populate("user", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(comments);

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
// Delete Comment
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);

    if (!comment) {
      return res.status(404).json({
        message: "Comment not found"
      });
    }

    if (comment.user.toString() !== req.user.id) {
      return res.status(403).json({
        message: "Not authorized to delete this comment"
      });
    }

    await Comment.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Comment deleted successfully"
    });

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
module.exports = router;