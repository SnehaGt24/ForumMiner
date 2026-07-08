const express = require("express");
const router = express.Router();

const {
  getSubreddits,
  addSubreddit,
  deleteSubreddit,
} = require("../controllers/subredditController");

router.get("/", getSubreddits);
router.post("/", addSubreddit);
router.delete("/:id", deleteSubreddit);


module.exports = router;