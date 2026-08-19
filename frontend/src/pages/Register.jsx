import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    if (!username.trim()) {
  toast.error("Username is required.");
  return;
}

const usernameRegex = /^[A-Za-z0-9_]{3,20}$/;

if (!usernameRegex.test(username)) {
  toast.error(
    "Username must be 3-20 characters and contain only letters, numbers and underscore."
  );
  return;
}

      const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

if (!emailRegex.test(email)) {
  toast.error("Please enter a valid .com email address.");
  return;
}

const passwordRegex =
/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#]).{8,}$/;

if (!passwordRegex.test(password)) {
  toast.error(
    "Password must be at least 8 characters and contain an uppercase letter, lowercase letter, number and special character."
  );
  return;
}

    try {
      await API.post("/auth/register", {
        username,
        email,
        password,
      });

      toast.success("Registration successful!");
      navigate("/login");

    } catch (err) {
      toast.error(err.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div className="login-page">
      <div className="login-container">

        <div className="login-left">

  <div className="brand">

    <h1>🚀 ForumMiner</h1>

    <h3>AI-Powered Reddit Intelligence</h3>

    <p>
      Create your account and start discovering
      high-intent Reddit discussions using Artificial Intelligence.
    </p>

    <div className="features">

      <div>📊 Analytics Dashboard</div>

      <div>🔥 Intent Monitoring</div>

      <div>🏆 Competitor Tracking</div>

      <div>😊 Sentiment Analysis</div>

      <div>🤖 AI Suggestions</div>

    </div>

  </div>

</div>
        <div className="login-right">

          <h2>Create Account</h2>

          <form onSubmit={handleRegister} className="login-form">

            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
  type="password"
  placeholder="Password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

<small className="password-hint">
  Must be at least 8 characters and include uppercase, lowercase, number and special character.
</small>

            <button type="submit">
              Register
            </button>

          </form>

          <div className="bottom-link">
            Already have an account?{" "}
            <Link to="/login">Login</Link>
          </div>

        </div>

      </div>
    </div>
  );
}

export default Register;