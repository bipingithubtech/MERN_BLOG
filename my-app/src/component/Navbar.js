import React from "react";
import "../css/Navbar.css";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_div">
      <h2>MY_Blogs</h2>

      <ul className="list">
        <li>Home</li>
        <li>Menu</li>

        <li>Contact</li>
      </ul>
      <input type="text" placeholder="Search.." />
      <button>signin</button>
    </div>
  );
};

export default Navbar;
