import React, { useState } from "react";
import "../css/Header.css";
import axios from "axios";
import { useNavigate } from "react-router";
// import { url } from "../Url";

const Register = () => {
  const [register, setRegister] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setRegister((prevData) => ({ ...prevData, [name]: value }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        register,
        { withCredentials: true }
      );
      setRegister({
        username: "",
        email: "",
        password: "",
      });
      navigate("/login");

      console.log("user register", response.data);
    } catch (err) {
      console.log("error while sending post request to backend");
    }
  };
  return (
    <div className="bodys">
      <div className="main">
        <form onSubmit={handleSubmit}>
          <div className="register">
            <h1>Registration </h1>
            <label style={{ marginRight: "185px" }}>USERNAME</label>
            <input
              type="text"
              placeholder="Username..."
              name="username"
              value={register.username}
              onChange={handleChange}
            />
            <label style={{ marginRight: "225px" }}>EMAIL</label>
            <input
              type="text"
              placeholder="Email..."
              name="email"
              value={register.email}
              onChange={handleChange}
            />
            <label style={{ marginRight: "185px" }}>PASSWORD</label>
            <input
              type="text"
              placeholder="Password..."
              name="password"
              value={register.password}
              onChange={handleChange}
            />

            <button type="submit" class="btn btn-primary">
              SignUp
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
