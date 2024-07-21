import axios from "axios";

import React, { useEffect } from "react";
import Loader from "./Loader";
import { useState, useContext, useLocation } from "react";
import UserContext from "../context/Context";

const Userpost = () => {
  const { search } = useLocation();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [noResult, setNoResult] = useState(false);
  const [loader, setLoader] = useState(false);

  const fethPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/post/user/${user._id}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setPost(res.data);
      if (res.data.legth === 0) {
        setNoResult(true);
      } else {
        setNoResult(false);
      }
      setLoader(false);
    } catch (err) {
      setLoader(true);
      console.log(err);
    }
  };
  useEffect(() => {
    fethPost();
  }, [search]);

  return (
    <>
      <div className="homepage">
        <div>
          {loader ? (
            <div>
              <Loader />
            </div>
          ) : !noResult ? (
            post.map((post) => {
              <div>{post.title}</div>;
            })
          ) : (
            <h3>no post found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Userpost;
