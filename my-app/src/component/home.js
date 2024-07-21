import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/Context";

import "../css/home.css";

import axios from "axios";
import { Link } from "react-router-dom";

import Loader from "./Loader";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home-left"></div>
      <div className="home-right">
        <h1 className="title ">Write a Blog with Us</h1>
        <p className="description">
          Share your insights and experiences with the world! Our platform makes
          it easy to publish and manage your blog posts. Whether you're a
          seasoned writer or just starting, you'll find the tools you need to
          create amazing content.
        </p>
        <h2>Login with us</h2>
      </div>
    </div>
  );
};

export default Home;
