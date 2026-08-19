import { useState } from "react";
import API from "../services/api";
import { Link, useNavigate } from "react-router-dom";
import "../styles/login.css";
import { toast } from "react-toastify";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.com$/;

if (!emailRegex.test(email)) {
  alert("Please enter a valid .com email address.");
  return;
}

    try {
      const res = await API.post("/auth/login", {
        email,
        password,
      });

      console.log("LOGIN RESPONSE:", res.data);

      // IMPORTANT SAFETY CHECK
      if (!res.data?.token) {
        alert("Login failed: No token received from server");
        setLoading(false);
        return;
      }

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (err) {
      console.log("LOGIN ERROR:", err);
      alert(err.response?.data?.message || "Login Failed");
    } finally {
      setLoading(false);
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
          <div className="login-header">
  <h2>Welcome Back 👋</h2>

  <h3>
    Sign in to continue to ForumMiner
  </h3>
</div>
<br></br>
          <form onSubmit={handleLogin} className="login-form">
            <label>Email Address</label>

<input
type="email"
placeholder="Enter your email"

              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label>Password</label>

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" disabled={loading}>
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>

          <div className="bottom-link">
            Don't have an account?{" "}
            <Link to="/register">Register</Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;