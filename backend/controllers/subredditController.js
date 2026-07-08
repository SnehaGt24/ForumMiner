const Subreddit = require("../models/Subreddit");

// Get all tracked subreddits
const getSubreddits = async (req, res) => {
  try {
    const subreddits = await Subreddit.find().sort({ name: 1 });
    res.json(subreddits);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Add subreddit
const addSubreddit = async (req, res) => {
  try {
    const { name } = req.body;

    const exists = await Subreddit.findOne({
      name: name.toLowerCase(),
    });

    if (exists) {
      return res.status(400).json({
        message: "Already exists",
      });
    }

    const subreddit = await Subreddit.create({
      name,
    });

    res.status(201).json(subreddit);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

// Delete subreddit
const deleteSubreddit = async (req, res) => {
  try {
    await Subreddit.findByIdAndDelete(req.params.id);

    res.json({
      message: "Deleted",
    });
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  getSubreddits,
  addSubreddit,
  deleteSubreddit,
};