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
          <h1>🚀 Join ForumMiner</h1>

          <p>
            Create your account and start discovering
            high-intent Reddit conversations.
          </p>

          <ul>
            <li>📊 Analytics Dashboard</li>
            <li>🔥 Intent Monitoring</li>
            <li>🏆 Competitor Tracking</li>
            <li>😊 Sentiment Analysis</li>
            <li>🤖 AI Suggestions</li>
          </ul>
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