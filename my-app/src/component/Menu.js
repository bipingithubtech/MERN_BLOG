import React, { useContext } from "react";
import UserContext from "../context/Context";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import "../css/menu.css";

const Menu = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8000/api/user/logout", {
        withCredentials: true,
      });
      setUser(null);
      navigate("/login");
    } catch (err) {
      console.log("Error during logout:", err);
    }
  };

  return (
    <div className="navbar">
      <div className="menu">
        {!user && (
          <h3>
            <Link to="/login">Login</Link>
          </h3>
        )}
        {!user && (
          <h3>
            <Link to="/register">Register</Link>
          </h3>
        )}
        {user && (
          <h3>
            <Link to={`/profile/${user._id}`}>Profile</Link>
          </h3>
        )}

        {user && (
          <h3>
            <Link to="/post">CreatePost</Link>
          </h3>
        )}
        {user && (
          <h3>
            <Link to={`/myblogs/${user._id}`}>My Blogs</Link>
          </h3>
        )}

        {user && (
          <h3 onClick={handleLogout} className="cursor-pointer">
            Logout
          </h3>
        )}
      </div>
    </div>
  );
};

export default Menu;
