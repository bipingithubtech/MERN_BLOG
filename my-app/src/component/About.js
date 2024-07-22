import React from "react";
import "../css/about.css";
const About = () => {
  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">About Us</h1>
        <p className="about-description">
          We are a passionate team dedicated to providing the best platform for
          bloggers. Our mission is to empower individuals to share their stories
          and connect with a global audience. Explore our features and join our
          community of writers.
        </p>
        <img
          src="https://img.freepik.com/premium-vector/creative-process-landing-page_23-2148158970.jpg?w=740"
          alt="About Us"
          className="about-image"
        />
      </div>
    </div>
  );
};

export default About;
