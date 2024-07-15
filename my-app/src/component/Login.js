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

    setUser(response.data.user);
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

            <label>EMAIL</label>
            <input
              type="text"
              placeholder="Email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <label>PASSWORD</label>
            <input
              type="text"
              placeholder="Password..."
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" class="btn btn-primary">
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
