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

module.exports = { likePost };