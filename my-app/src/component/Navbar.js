import React from "react";
import "../css/Navbar.css";
import { SlBasket } from "react-icons/sl";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="nav_div">
      <h2>FOODIES</h2>

      <ul className="list">
        <li>Home</li>
        <li>Menu</li>
        <li>Mobile_app </li>
        <li>Contact</li>
      </ul>

      <input type="text" />
      <div className="link">
        <Link>
          <SlBasket />
        </Link>
      </div>
      <button>signin</button>
    </div>
  );
};

export default Navbar;
