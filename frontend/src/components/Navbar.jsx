import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/navbar.css";
import {
  FaSearch,
  FaUserCircle,
  FaHome,
  FaFire,
  FaUser,
} from "react-icons/fa";

function Navbar({ setShowHighIntent = () => {} }) {
  const user = JSON.parse(localStorage.getItem("user"));

  const [search, setSearch] = useState("");
  const [activeNav, setActiveNav] = useState("home");
  const navigate = useNavigate();
  const location = useLocation();
  const [showMenu, setShowMenu] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();

    if (!search.trim()) return;

    navigate("/dashboard", {
      state: { search },
    });
  };

  return (
    <header className="navbar">

      {/* LEFT */}

      <div className="nav-left">

        <div
          className="logo"
          onClick={() => navigate("/dashboard")}
        >
          ForumMiner
        </div>

        <div
          className={`nav-link ${activeNav === "home" ? "active" : ""}`}
          onClick={() => {
  setActiveNav("home");
  setShowHighIntent(false);
  navigate("/dashboard");
}}
        >
          <FaHome />
          <span>Home</span>
        </div>

        <div
        className={`nav-link ${activeNav === "highIntent" ? "active" : ""}`}

          onClick={() => {
  setActiveNav("highIntent");
  setShowHighIntent(true);
  navigate("/dashboard", {
    state: { highIntent: true },
  });
}}
        >
          <FaFire />
<span>High Intent</span>
        </div>

<div
  className={`nav-link ${
    location.pathname === "/profile" ? "active" : ""
  }`}
  onClick={() => navigate("/profile")}
>
  <FaUser />
  <span>My Posts</span>
</div>

      </div>

      {/* CENTER */}

      <form
        className="nav-search"
        onSubmit={handleSearch}
      >
        <FaSearch />

        <input
          type="text"
          placeholder="Search discussions..."
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
        />
      </form>

      {/* RIGHT */}

      <div className="nav-right">

<div className="profile-dropdown">

  <div
    className="user-info"
    onClick={() => setShowMenu(!showMenu)}
  >
    <FaUserCircle size={20} />
    <span>{user?.username}</span>
  </div>

  {showMenu && (

    <div className="dropdown-menu">

      <div className="dropdown-header">

        <h4>{user?.username}</h4>

        <p>{user?.email}</p>

      </div>

      <button
        onClick={() => {
          setShowMenu(false);
          navigate("/profile");
        }}
      >
        ✏️ Edit Profile
      </button>

      <button
        onClick={() => {
          setShowMenu(false);
          navigate("/change-password");
        }}
      >
        🔒 Change Password
      </button>

      <button
        className="logout-item"
        onClick={handleLogout}
      >
        🚪 Logout
      </button>

    </div>

  )}

</div>

      </div>

    </header>
  );
}

export default Navbar;