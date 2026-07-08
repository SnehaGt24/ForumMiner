import "../styles/sidebar.css";
import { FaHome, FaFire, FaUser } from "react-icons/fa";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

function Sidebar({ setShowHighIntent }) {
  const navigate = useNavigate();
const location = useLocation();

const [active, setActive] = useState(
  location.pathname === "/profile"
    ? "My Posts"
    : "Home"
);

  const handleClick = (item) => {
    setActive(item);

  
    if (item === "Home") {
  setShowHighIntent(false);

  if (window.location.pathname !== "/dashboard") {
    navigate("/dashboard");
  }
}

    if (item === "Popular") {
      setShowHighIntent(true);
    }

    if (item === "My Posts") {
      navigate("/profile");
    }
  };

  return (
    <aside className="sidebar">
      <div className="logo">
ForumMiner
</div>
      <ul>
        <li
          className={active === "Home" ? "active" : ""}
          onClick={() => handleClick("Home")}
        >
          <FaHome />
          <span>Home</span>
        </li>

        <li
          className={active === "Popular" ? "active" : ""}
          onClick={() => handleClick("Popular")}
        >
          <FaFire />
          <span>High Intent</span>
        </li>

        <li
          className={active === "My Posts" ? "active" : ""}
          onClick={() => handleClick("My Posts")}
        >
          <FaUser />
          <span>My Posts</span>
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;