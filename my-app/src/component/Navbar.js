import React, { useContext, useState } from "react";
import "../css/Navbar.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { FaBars, FaSearchengin } from "react-icons/fa6";
import Menu from "./Menu";
import UserContext from "../context/Context";

const Navbar = () => {
  const [prompt, setPrompt] = useState("");
  const [menu, setMenu] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const path = useLocation().pathname;

  const showmenu = () => {
    setMenu(!menu);
  };

  console.log("User in Header:", user);

  return (
    <div className="nav_div">
      <h2>
        <Link className="link" to="/">
          BLOGZONE
        </Link>
      </h2>

      <ul className="list">
        <li>
          <Link className="link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="link" to="/about">
            About
          </Link>
        </li>
        <li>
          <Link className="link" to="/userPost">
            Contact
          </Link>
        </li>
      </ul>

      {path === "/" && (
        <div className="search-container">
          <input
            type="text"
            placeholder="Search.."
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
          />
          <p
            className="navbar-search-icon"
            onClick={() => navigate(prompt ? "?search=" + prompt : "/")}
          >
            <FaSearchengin style={{ color: "white", fontSize: "24px" }} />
          </p>
        </div>
      )}

      <div className="nav_user-links">
        {user ? (
          <h3 className="link">
            <Link className="link" to="/write">
              Write
            </Link>
          </h3>
        ) : (
          <h3 className="link">
            <Link className="link" to="/login">
              Login
            </Link>
          </h3>
        )}
        {user ? (
          <div className="menu-btn" onClick={showmenu}>
            <FaBars />
            {menu && <Menu />}
          </div>
        ) : (
          <h3 className="link">
            <Link className="link" to="/register">
              Register
            </Link>
          </h3>
        )}
      </div>
    </div>
  );
};

export default Navbar;
