import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";
import "../styles/changePassword.css";
import { toast } from "react-toastify";

function ChangePassword() {

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
    const navigate = useNavigate();
const handleSubmit = async (e) => {

  e.preventDefault();

  if (newPassword !== confirmPassword) {
    return toast.error("Passwords do not match.");
  }
 
   if (newPassword.length < 6) {
  return toast.error("Password must be at least 6 characters.");
}
  try {

    await API.put(
      "/users/change-password",
      {
        currentPassword,
        newPassword,
      }
    );

toast.success("Password updated successfully!");

setCurrentPassword("");
setNewPassword("");
setConfirmPassword("");

navigate("/profile");

  } catch (err) {
  console.log(err.response);
toast.error(
  err.response?.data?.message ||
  err.response?.data?.error ||
  "Failed to update password."
);
}

};

  return (

    <div className="password-page">

      <div className="password-card">

        <h2>Change Password</h2>

        <form onSubmit={handleSubmit}>

          <input
            type="password"
            placeholder="Current Password"
            value={currentPassword}
            onChange={(e)=>setCurrentPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            value={newPassword}
            onChange={(e)=>setNewPassword(e.target.value)}
          />

          <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
          />

          <button type="submit">

            Update Password

          </button>

        </form>

      </div>

    </div>

  );

}

export default ChangePassword;