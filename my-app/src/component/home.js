import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/Context";
import Navbar from "./Navbar";
import "../css/home.css";
import { useLocation } from "react-router";
import axios from "axios";
import { Link } from "react-router-dom";
import HomePost from "./HomePost";
import Loader from "./Loader";

const Home = () => {
  const { search } = useLocation();
  const { user } = useContext(UserContext);
  const [post, setPost] = useState([]);
  const [noResult, setResult] = useState(false);
  const [loader, setLoader] = useState(false);
  const [cat, setCat] = useState([]);
  const [filter, setFilter] = useState([]);

  const fetchPost = async () => {
    setLoader(true);
    try {
      const res = await axios.get("http://localhost:8000/api/post/" + search);
      setPost(res.data);
      setFilter(res.data);
      const catag = res.data.map((item) => {
        return item.categories;
      });
      let sets = new Set();
      catag.forEach((category) => {
        category?.forEach((cata) => {
          if (catag.length > 0) sets.add(cata);
        });
      });
      setCat(Array.from(sets));
      console.log(res.data);
      if (res.data.length === 0) {
        setResult(true);
      } else {
        setResult(false);
      }
    } catch (err) {
      console.log(err);
      setLoader(true);
    }
  };

  useEffect(() => {
    fetchPost();
  }, [search]);

  const filterData = (filterData) => {
    let newPost = post.filter((pos) => {
      return pos?.categories.include(filter);
    });
    setFilter(newPost);
  };

  return (
    <>
      <Navbar />
      <div className="homepage">
        <div>
          {cat.length &&
            cat?.map((category) => {
              return (
                <button onClick={() => filterData(category)}>{category}</button>
              );
            })}
        </div>
        <div>
          {loader ? (
            <div>
              <Loader />
            </div>
          ) : !noResult ? (
            filter.map((post) => {
              <div>
                <Link to={user ? `posts/post/${post._id}` : "/login"}>
                  <HomePost key={post._id} post={post} />
                </Link>
              </div>;
            })
          ) : (
            <h3>no post found</h3>
          )}
        </div>
      </div>
    </>
  );
};

export default Home;
