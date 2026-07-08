import { useEffect, useState } from "react";
import API from "../services/api";
import PostCard from "../components/PostCard";
import "../styles/profile.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { toast } from "react-toastify";

function Profile() {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  const loggedInUser = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();

  const [editing, setEditing] = useState(false);
const [username, setUsername] = useState("");
const [email, setEmail] = useState("");

  useEffect(() => {
    fetchUserData();
  }, []);

const fetchUserData = async () => {
  try {
    // Get user details
    const res = await API.get(`/users/${loggedInUser._id}`);
    setUser(res.data);
    setUsername(res.data.username);
    setEmail(res.data.email);

    // Get user's posts
    const postsRes = await API.get(`/posts/user/${loggedInUser._id}`);
    setPosts(postsRes.data);
  } catch (err) {
    console.log(err);
  }
};

const handleSave = async () => {
  try {

    const res = await API.put(
      `/users/${loggedInUser._id}`,
      {
        username,
        email,
      }
    );

    setUser(res.data);

    localStorage.setItem(
      "user",
      JSON.stringify(res.data)
    );

    setEditing(false);

toast.success("Profile updated successfully!");

  } catch (err) {
  console.log("Full Error:", err);
  console.log("Response:", err.response);
  console.log("Data:", err.response?.data);

toast.error(
    err.response?.data?.message ||
    err.response?.data?.error ||
    "Failed to update profile."
  );
}
};

return (
  <>
  <Navbar />
  <div className="profile-page">

    <button
      className="back-btn"
      onClick={() => navigate("/dashboard")}
    >
      ← Back to Dashboard
    </button>

    <div className="profile-header">
      <h1>My Profile</h1>
      <p>Manage your ForumMiner account and activity.</p>
    </div>

    <div className="profile-card">

      <div className="avatar">
        {user?.username?.charAt(0).toUpperCase()}
      </div>

      <h2>{user?.username}</h2>
      <p>{user?.email}</p>

      <div className="stats">

        <div>
          <strong>{posts.length}</strong>
          <span>Posts</span>
        </div>

        <div>
          <strong>{user?.followers || 0}</strong>
          <span>Followers</span>
        </div>

        <div>
          <strong>{user?.following || 0}</strong>
          <span>Following</span>
        </div>

      </div>
<div className="profile-actions">

  <button
    className="edit-profile-btn"
    onClick={() => setEditing(!editing)}
  >
    {editing ? "Cancel" : "Edit Profile"}
  </button>

</div>
    </div>

    {editing && (
  <div className="edit-profile-card">

    <h3>Edit Profile</h3>

    <input
      type="text"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
      placeholder="Username"
    />

    <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      placeholder="Email"
    />

<button
  className="save-profile-btn"
  onClick={handleSave}
>
  Save Changes
</button>

  </div>
)}

    <h3 className="section-title">My Posts</h3>

    {posts.length === 0 ? (
      <p>No posts yet</p>
    ) : (
      posts.map((post) => (
        <PostCard key={post._id} post={post} />
      ))
    )}

  </div>
  </>
);

}

export default Profile;