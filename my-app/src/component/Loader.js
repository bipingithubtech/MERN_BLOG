import React from "react";

const Loader = () => {
  return (
    <div>
      <div
        class="spinner-border"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
      <div
        class="spinner-grow"
        style={{ width: "3rem", height: " 3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loader;
