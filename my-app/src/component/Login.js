// import React, { useState } from "react";
import { useContext, useState } from "react";
import "../css/Header.css";
import axios from "axios";

import UserContext from "../context/Context";
import { useNavigate } from "react-router";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userData = {
      email,
      password,
    };
    const response = await axios.post(
      "http://localhost:8000/api/user/login",
      userData,
      { withCredentials: true }
    );
    const { token } = response.data;
    if (token) {
      localStorage.setItem("jwtToken", token);
    }
    setUser(response.data.user);
    console.log("User after login:", response.data); // Log the user data
    navigate("/");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="bodys">
      <div className="main">
        <form onSubmit={handleLogin}>
          <div className="register">
            <h1>Login </h1>

            <label style={{ marginRight: "185px" }}>EMAIL</label>
            <input
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label style={{ marginRight: "145px" }}>PASSWORD</label>
            <input
              type="text"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div
              style={{
                marginBottom: "15px",
              }}
            >
              <button
                type="submit"
                style={{
                  width: "80px",
                  borderRadius: "5px",
                  backgroundColor: "#0066cc",
                  height: "40px",
                  color: "white",
                }}
              >
                Login
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
