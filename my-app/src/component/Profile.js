import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/Context";
import { useNavigate } from "react-router";
import axios from "axios";
import "../css/profile.css"; // Import the CSS file

const Profile = () => {
  const { user, setUser } = useContext(UserContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [updated, setUpdated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8000/api/profile/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setEmail(res.data.email);
      setPassword(res.data.password);
      setUsername(res.data.username);
    } catch (err) {
      console.log(err, "error while calling fetchProfile");
    }
  };

  const handleUpdateUser = async (e) => {
    e.preventDefault();
    const updatedUser = {
      username,
      email,
      password,
    };
    try {
      const res = await axios.put(
        `http://localhost:8000/api/profile/${user._id}`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setUser(res.data); // Update user context with the new data
      setUpdated(true);
    } catch (err) {
      console.log(err, "error while calling put request from profile page");
    }
  };

  const handleDeleteUser = async (e) => {
    e.preventDefault();
    try {
      await axios.delete(`http://localhost:8000/api/profile/${user._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      setUser(null);
      navigate("/");
    } catch (err) {
      console.log(err, "error while calling delete req");
    }
  };

  return (
    <div className="profile_main">
      <div className="profile-container">
        <h1 className="profile-header">Profile</h1>
        <form className="profile-form" onSubmit={handleUpdateUser}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit">Update Profile</button>
          {updated && (
            <p className="success-message">Profile updated successfully!</p>
          )}
          <button
            type="button"
            className="delete-button"
            onClick={handleDeleteUser}
          >
            Delete Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default Profile;
