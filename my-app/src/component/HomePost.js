import React, { useContext, useEffect, useState } from "react";
import UserContext from "../context/Context";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "./Loader";
import "../css/homepost.css";
import Comments from "./Comments";
import { FaUserEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const HomePost = () => {
  const [post, setPost] = useState(null);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [loader, setLoader] = useState(false);
  const { user } = useContext(UserContext);
  const { id: PostId } = useParams();
  const navigate = useNavigate();

  const getPost = async () => {
    try {
      console.log(`Fetching post with ID: ${PostId}`);
      const res = await axios.get(
        `http://localhost:8000/api/post/posts/${PostId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      console.log("Post data:", res.data);
      setPost(res.data);
    } catch (err) {
      console.error(
        "Error fetching post:",
        err.response ? err.response.data : err.message
      );
    }
  };
  const handleDelete = async () => {
    try {
      const res = await axios.delete(
        `http://localhost:8000/api/post/${PostId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setComments([]);
      console.log("Post deleted successfully:", res.data);
    } catch (error) {
      console.error(
        "Error deleting the post:",
        error.response ? error.response.data : error.message
      );
    }
  };

  const fetchComments = async () => {
    setLoader(true);
    try {
      const res = await axios.get(
        `http://localhost:8000/api/comment/post/${PostId}`,
        {
          headers: {
            Authorization: `Bearer ${user}`,
          },
          withCredentials: true,
        }
      );
      setComments(res.data);
    } catch (err) {
      console.log("Error fetching comments:", err);
    } finally {
      setLoader(false);
    }
  };

  const createComment = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:8000/api/comment/create",
        {
          commentPost: comment,
          author: user.username,
          userId: user._id,
          PostId: PostId,
        },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      setComment(""); // Clear the input field after submission
      fetchComments(); // Refresh comments
    } catch (err) {
      console.log("Error creating comment:", err);
    }
  };

  useEffect(() => {
    getPost();
    fetchComments();
  }, [PostId]);

  return (
    <div className="homepost-outer">
      {loader ? (
        <Loader />
      ) : post ? (
        <div className="homepost-mainsdiv">
          <div className="homepost-innerdiv">
            <div className="head_post">
              <h3 className="homepost-head">{post.title}</h3>
            </div>

            <div>
              <img className="homepost-img" src={post.photo} alt={post.title} />
            </div>
            <h1>
              {user?._id === post?.userId && (
                <div>
                  <p onClick={() => navigate(`/edit/${PostId}`)}>
                    <FaUserEdit />
                  </p>
                  <p onClick={handleDelete}>
                    <MdDelete />
                  </p>
                </div>
              )}
            </h1>
            <ul className="homepost-ul">
              <h3>Category</h3>
              {post.categories.map((cate, i) => (
                <li key={i} className="homepost-li">
                  {cate}
                </li>
              ))}
            </ul>
            <div className="homepost-desc">{post.desc}</div>
            <div>
              {comments && <Comments comments={comments} post={post} />}
            </div>
            <div>
              <input
                className="homepost-comment-input"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment"
              />
              <button
                className="homepost-comment-button"
                onClick={createComment}
              >
                Add Comment
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p>No post data available</p>
      )}
    </div>
  );
};

export default HomePost;
