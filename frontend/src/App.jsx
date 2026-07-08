import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./components/ProtectedRoute";

import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import { Navigate } from "react-router-dom";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <Routes>
  <Route path="/" element={<Navigate to="/login" />} />
  <Route path="/login" element={<Login />} />
  <Route path="/register" element={<Register />} />
  <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
  <Route path="/dashboard" element={<Dashboard />} />
  <Route
    path="/change-password"
    element={<ChangePassword />}
/>
</Routes>
  );
}

export default App;