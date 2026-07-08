import { useEffect, useState } from "react";
import API from "../services/api";
import "../styles/postcard.css";
import { toast } from "react-toastify";

function PostCard({ post }) {
  // Logged-in user (safe parse)
  const loggedInUser = JSON.parse(localStorage.getItem("user") || "null");

  const isOwner =
    loggedInUser?._id === post.author?._id;

  // Likes
  const [likes, setLikes] = useState(post.likes?.length || 0);

  const [liked, setLiked] = useState(
    post.likes?.includes(loggedInUser?._id) || false
  );

  // Comments
  const [comments, setComments] = useState([]);
  const [text, setText] = useState("");

  // Edit state
  const [isEditing, setIsEditing] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title || "");
  const [editContent, setEditContent] = useState(post.content || "");

const [aiReply, setAiReply] = useState("");
const [loadingAI, setLoadingAI] = useState(false);

const [leadStatus, setLeadStatus] = useState(
  post.leadStatus || "Open"
);

  // Load comments
  useEffect(() => {
    if (post?._id) fetchComments();
  }, [post._id]);

  const fetchComments = async () => {
    try {
      const res = await API.get(`/comments/${post._id}`);
      setComments(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Like / Unlike
  const handleLike = async () => {
    try {
      const res = await API.post(`/posts/${post._id}/like`);

      setLikes(res.data.totalLikes);
      setLiked(res.data.message === "Liked");
    } catch (err) {
      console.error(err);
    }
  };

  // Add Comment
  const handleComment = async (e) => {
    e.preventDefault();

    if (!text.trim()) {
      alert("Comment cannot be empty");
      return;
    }

    try {
      await API.post("/comments", {
        text,
        postId: post._id,
      });

      setText("");
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("Unable to add comment.");
    }
  };

  // Delete Comment
  const deleteComment = async (commentId) => {
    const confirmDelete = window.confirm("Delete this comment?");
    if (!confirmDelete) return;

    try {
      await API.delete(`/comments/${commentId}`);
      fetchComments();
    } catch (err) {
      console.error(err);
      alert("Unable to delete comment");
    }
  };

  // Delete Post
  const deletePost = async () => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this post?"
    );

    if (!confirmDelete) return;

    try {
      await API.delete(`/posts/${post._id}`);

      alert("Post deleted successfully");

      // ⚠️ better than reload in real apps:
      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Something went wrong.");
    }
  };

  const updateLeadStatus = async (status) => {
  try {
    await API.put(`/posts/${post._id}/status`, {
      status,
    });

    setLeadStatus(status);
  } catch (err) {
    console.log(err);
    alert("Unable to update lead status");
  }
};

  // Update Post
  const updatePost = async () => {
    if (!editTitle.trim() || !editContent.trim()) {
      alert("Title and Content are required");
      return;
    }

    try {
      await API.put(`/posts/${post._id}`, {
        title: editTitle,
        content: editContent,
      });

      alert("Post updated successfully");
      setIsEditing(false);

      window.location.reload();
    } catch (err) {
      console.error(err);
      alert("Unable to update post.");
    }
  };

const generateAIReply = async () => {
  try {
    setLoadingAI(true);

    const res = await API.get(`/posts/${post._id}/ai-reply`);

    console.log("✅ AI Reply Response:", res.data);

    setAiReply(res.data.reply);
   toast.success("AI reply generated!");

  } catch (err) {
    console.error("❌ AI Reply Error:", err);

    if (err.response) {
      console.log("Status:", err.response.status);
      console.log("Response:", err.response.data);
    } else {
      console.log("No response received");
    }

    toast.error("Unable to generate AI reply.");
  } finally {
    setLoadingAI(false);
  }
};

  const getIntentColor = (score) => {
  if (score >= 80) return "#e53935";
  if (score >= 50) return "#fb8c00";
  return "#43a047";
};

console.log(post.redditUrl);

  return (
  <div className="post-card">

    {/* HEADER */}
    <div className="post-header">

      <div className="post-user">
        <div className="post-avatar">
  {post.source === "reddit"
    ? "R"
    : (post.author?.name || post.author?.username || "U")
        .charAt(0)
        .toUpperCase()}
</div>

        <div className="author-info">
            <h3>
  {post.source === "reddit"
    ? `r/${post.subreddit}`
    : post.author?.name || post.author?.username}
</h3>
          <span className="post-time">
            {new Date(post.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* OWNER ACTIONS */}
      {isOwner && !isEditing && (
        <div className="owner-actions">
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
          >
            ✏ Edit
          </button>

          <button
            className="delete-btn"
            onClick={deletePost}
          >
            🗑 Delete
          </button>
          
        </div>
      )}

    </div>

    {/* BODY */}
    <div className="post-body">

      {isEditing ? (
        <div className="edit-section">

          <input
            className="edit-input"
            value={editTitle}
            onChange={(e) => setEditTitle(e.target.value)}
          />

          <textarea
            rows="5"
            className="edit-textarea"
            value={editContent}
            onChange={(e) => setEditContent(e.target.value)}
          />

          <div className="edit-actions">
            <button onClick={updatePost}>Save</button>

            <button
              onClick={() => {
                setEditTitle(post.title);
                setEditContent(post.content);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
          </div>

        </div>
      ) : (
        <>
  {/* Analytics Section */}
  <div className="analytics-badges">

    <span
      className={`source-badge ${
        post.source === "reddit" ? "reddit" : "forum"
      }`}
    >
      {post.source === "reddit" ? "🌐 Reddit" : "📝 Forum"}
    </span>

    {post.subreddit && (
      <span className="subreddit-badge">
        📌 r/{post.subreddit}
      </span>
    )}

    <span
      className="intent-badge"
      style={{
        background: getIntentColor(post.intentScore),
      }}
    >
      🔥 Intent: {post.intentScore}
    </span>

    <span
      className={`sentiment-badge ${post.sentiment?.toLowerCase()}`}
    >
      😊 {post.sentiment}
    </span>
     <span className={`lead-badge ${leadStatus.toLowerCase()}`}>
  {leadStatus === "Open" && "🟡"}
  {leadStatus === "Contacted" && "🟢"}
  {leadStatus === "Ignored" && "⚫"}

  {leadStatus}
</span>
  </div>

  <h2 className="post-title">{post.title}</h2>

  <p className="post-content">{post.content}</p>
      {/* Competitor Mentions */}
{post.competitors?.length > 0 && (
  <div className="competitor-box">
    <strong>Competitors:</strong>

    {post.competitors.map((item) => (
      <span key={item} className="tag competitor">
        {item}
      </span>
    ))}
  </div>
)}

  {post.source === "reddit" && (
  <div className="lead-actions">

 <label className="lead-label">Lead Status</label>

 <select
  className="lead-select"
  value={leadStatus}
  onChange={(e) => updateLeadStatus(e.target.value)}
>
    <option value="Open">🟡 Open</option>
    <option value="Contacted">🟢 Contacted</option>
    <option value="Ignored">⚫ Ignored</option>
  </select>

</div>
)}


{post.redditUrl && (
  <a
    href={post.redditUrl}
    target="_blank"
    rel="noreferrer"
    className="reddit-link"
  >
    🔗 View Original Reddit Post
  </a>
)} 

{/* AI Reply Section */}
<div className="ai-section">

  <button
    className="ai-btn"
    onClick={generateAIReply}
    disabled={loadingAI}
  >
    {loadingAI
      ? "Generating..."
      : "🤖 Generate AI Reply"}
  </button>

  {aiReply && (
    <div className="ai-reply-box">
      <h4>🤖 Suggested AI Reply</h4>
      <p>{aiReply}</p>
    </div>
  )}

</div>
</>
      )}

    </div>

    {/* FOOTER */}
    <div className="post-footer">

      <button
        className={`like-btn ${liked ? "liked" : ""}`}
        onClick={handleLike}
      >
        ❤️ {likes}
      </button>

      <span className="comment-count">
        💬 {comments.length}
      </span>

    </div>

    {/* COMMENTS */}
    {post.source !== "reddit" && (
<div className="comments-section">

      <h4>Comments</h4>

      {comments.length === 0 ? (
        <p className="no-comments">
          Be the first to comment.
        </p>
      ) : (
        comments.map((comment) => (
          <div key={comment._id} className="comment-box">

            <div className="comment-header">
              <strong>
                {comment.user?.name || comment.user?.username}
              </strong>

              {loggedInUser?._id === comment.user?._id && (
                <button
                  className="comment-delete"
                  onClick={() => deleteComment(comment._id)}
                >
                  Delete
                </button>
              )}
            </div>

            <p>{comment.text}</p>

          </div>
        ))
      )}

      {/* COMMENT INPUT */}
            <form className="comment-input" onSubmit={handleComment}>
        <input
          type="text"
          placeholder="Write a comment..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button type="submit">Send</button>
      </form>

    </div>
    )}

  </div>
);
}

export default PostCard;