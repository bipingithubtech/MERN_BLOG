import React from "react";
import "../css/footer.css";
import { IoLogoInstagram } from "react-icons/io5";
import { FaFacebook } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";
import { CiLinkedin } from "react-icons/ci";

const Footer = () => {
  return (
    <div className="footer">
      <div className="inner">
        <div className="first">
          <h2>MY_Blogs</h2>
          <p>
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Molestias
          </p>
          <p> voluptatibus quod aspernatur quae porro debitis dolor nobis</p>
          <p>
            © 2024 Your Blog Name. All rights reserved. | Privacy Policy | Terms
            of Service
          </p>
        </div>
        <div className="second">
          <h3>Folow us on:</h3>
          <li>
            {" "}
            <FaFacebook />
            Facebook
          </li>
          <li>
            {" "}
            <BsTwitterX />
            twitter
          </li>
          <li>
            <IoLogoInstagram /> instagram
          </li>
          <li>
            {" "}
            <CiLinkedin />
            Linkdin
          </li>
        </div>
        <div className="third">
          <h2>About Us:</h2>
          <p>
            We believe in building a community of like-minded individuals who
            <p> are passionate about Blogs. Join us on social media,</p>
            <p>
              subscribe to our newsletter, and become a part of the Blogsphere
            </p>
            <p>family. Let's learn, grow, and thrive together!</p>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
