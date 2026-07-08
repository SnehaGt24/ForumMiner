import { useLocation } from "react-router-dom";
import API from "../services/api";
import PostCard from "../components/PostCard";
import Navbar from "../components/Navbar";
import "../styles/dashboard.css";
import { FaSearch } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import Sidebar from "../components/Sidebar";
import AnalyticsPanel from "../components/AnalyticsPanel";
import { useState, useEffect, useRef } from "react";
import Footer from "../components/Footer";
import { toast } from "react-toastify";

function Dashboard() {
    const location = useLocation();
  const [posts, setPosts] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [search, setSearch] = useState("");
  const [highIntentPosts, setHighIntentPosts] = useState([]);
  const [showHighIntent, setShowHighIntent] = useState(false);
  const [filter, setFilter] = useState("all");
  const highIntentRef = useRef(null);
  const [publishing, setPublishing] = useState(false);

  // Pagination
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  
  // Load posts whenever page changes
useEffect(() => {
  const query = location.state?.search;

  if (query) {
    searchPosts(query);
  } else {
    fetchPosts(page);
  }
  console.log("SEARCH QUERY:", location.state?.search);
}, [page, location.state]);

useEffect(() => {
  fetchHighIntentPosts();
}, []);

useEffect(() => {
  if (location.state?.highIntent) {
    setShowHighIntent(true);

    setTimeout(() => {
      feedRef.current?.scrollIntoView({
        behavior: "smooth",
      });
    }, 100);
  }
}, [location.state]);

useEffect(() => {
  if (showHighIntent) {
    highIntentRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
}, [showHighIntent]);

  // Fetch Posts
  const fetchPosts = async (pageNo = 1) => {
    try {
      const res = await API.get(`/posts?page=${pageNo}&limit=5`);

      setPosts(res.data.posts);
      setTotalPages(res.data.totalPages);
    } catch (err) {
      console.log(err);
    }
  };

const searchPosts = async (query) => {
  try {
    const res = await API.get(`/posts/search?q=${query}`);
    setPosts(res.data);
    setTotalPages(1);
  } catch (err) {
    console.log("search error:", err);
  }
};

const fetchHighIntentPosts = async () => {
  try {
    const res = await API.get("/posts/high-intent");
    setHighIntentPosts(res.data);
  } catch (err) {
    console.log("high-intent error:", err);
  }
};
  // Search Posts
  const handleSearch = async () => {
    if (!query) return;
    try {
      setPage(1);
      if (!search.trim()) {
        fetchPosts(page);
        return;
      }

      const res = await API.get(
        `/posts/search?q=${search}`
      );

      setPosts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  // Clear Search
  const clearSearch = () => {
    setSearch("");
    setPage(1);
    fetchPosts(1);
  };

  // Create Post
const handleCreatePost = async (e) => {
  e.preventDefault();

  if (!title.trim() || !content.trim()) {
    toast.error("Title and content are required.");
    return;
  }

  try {
    setPublishing(true);

    const res = await API.post("/posts", {
      title,
      content,
    });

    if (page === 1) {
      setPosts((prevPosts) => [
        res.data.post,
        ...prevPosts.slice(0, 4),
      ]);
    }

    setTitle("");
    setContent("");

    toast.success("Discussion published successfully!");

    fetchPosts(page);
    fetchHighIntentPosts();

  } catch (err) {
    toast.error(
      err.response?.data?.message ||
      "Failed to publish post."
    );
  } finally {
    setPublishing(false);
  }
};

  const filteredPosts = (showHighIntent ? highIntentPosts : posts).filter(
  (post) => {
    switch (filter) {
      case "reddit":
        return post.source === "reddit";

      case "forum":
        return post.source !== "reddit";

      case "high":
        return post.intentScore >= 70;

      case "positive":
        return post.sentiment === "Positive";

      case "negative":
        return post.sentiment === "Negative";

      default:
        return true;
    }
  }
);

  return (
  <>
    <Navbar setShowHighIntent={setShowHighIntent} />

    <div className="dashboard-layout">

      <main className="feed">

 <div className="dashboard-header">
    <h1>🚀 ForumMiner Dashboard</h1>

<p>
Monitor Reddit discussions, discover buying intent,
track competitors, and engage with communities from
one place.
</p>
  </div>

        <div className="create-post-card">

  <h2>Create a New Discussion</h2>

  <form onSubmit={handleCreatePost}>

    <input
      type="text"
      placeholder="Enter post title..."
      value={title}
      onChange={(e) => setTitle(e.target.value)}
    />

    <textarea
      rows="5"
      placeholder="Share your thoughts with the community..."
      value={content}
      onChange={(e) => setContent(e.target.value)}
    />

    <button type="submit" disabled={publishing}>
  <MdPostAdd />
  {publishing ? "Publishing..." : "Publish Post"}
</button>

  </form>

</div>

<div className="filter-bar">

  <button
    className={filter === "all" ? "active-filter" : ""}
    onClick={() => setFilter("all")}
  >
    All
  </button>

  <button
    className={filter === "reddit" ? "active-filter" : ""}
    onClick={() => setFilter("reddit")}
  >
    Reddit
  </button>

  <button
    className={filter === "forum" ? "active-filter" : ""}
    onClick={() => setFilter("forum")}
  >
    Forum
  </button>

  <button
    className={filter === "high" ? "active-filter" : ""}
    onClick={() => setFilter("high")}
  >
    High Intent
  </button>

  <button
    className={filter === "positive" ? "active-filter" : ""}
    onClick={() => setFilter("positive")}
  >
    Positive
  </button>

  <button
    className={filter === "negative" ? "active-filter" : ""}
    onClick={() => setFilter("negative")}
  >
    Negative
  </button>

</div>

<div ref={highIntentRef}>
  <h2 className="feed-title">
    {showHighIntent
      ? "🔥 High Intent Opportunities"
      : "🔥 Latest Discussions"}
  </h2>
</div>

       {/* Posts */}
       {filteredPosts.length === 0 ? (
  <p className="empty-state">
    {showHighIntent
      ? "No high intent opportunities found."
      : "No discussions found."}
  </p>
) : (
filteredPosts.map((post) => (
      <PostCard key={post._id} post={post} />
  ))
)}

       {/* Pagination */}
{!showHighIntent && (
<div className="pagination">

  <button
    disabled={page === 1}
    onClick={() => setPage(page - 1)}
  >
    Prev
  </button>

  <span>
    Page {page} of {totalPages}
  </span>

  <button
    disabled={page === totalPages}
    onClick={() => setPage(page + 1)}
  >
    Next
  </button>

</div>
)}


      </main>

      <div className="right-panel">

    <AnalyticsPanel />

    <div className="trending-card">

        <h3>🔥 Trending Technologies</h3>

        <div className="trend"># React</div>
        <div className="trend"># NodeJS</div>
        <div className="trend"># MongoDB</div>
        <div className="trend"># Express</div>
        <div className="trend"># JavaScript</div>

    </div>

</div>
    </div>
    <Footer />
  </>
);
}

export default Dashboard;