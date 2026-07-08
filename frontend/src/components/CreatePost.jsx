import { useState } from "react";
import API from "../services/api";
import "../styles/createpost.css";

function CreatePost({ onPostCreated }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) return;

    try {
      const res = await API.post("/posts", {
        title,
        content,
      });

      setTitle("");
      setContent("");

      if (onPostCreated) {
        onPostCreated(res.data.post);
      }

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="create-post-card">

      <div className="composer-header">
        <h3>What's on your mind?</h3>
      </div>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          rows="4"
          placeholder="Write something interesting..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit">
          Publish Post
        </button>

      </form>

    </div>
  );
}

export default CreatePost;