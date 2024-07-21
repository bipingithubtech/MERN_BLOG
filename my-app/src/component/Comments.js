import React, { useContext } from "react";
import axios from "axios";
import { MdDelete } from "react-icons/md";
import UserContext from "../context/Context";
import "../css/comment.css";

const Comments = ({ comments }) => {
  const { user } = useContext(UserContext);

  const deleteComment = async (id) => {
    try {
      await axios.delete(`http://localhost:8000/api/comment/${id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
        withCredentials: true,
      });
      console.log("Comment deleted successfully");
    } catch (err) {
      console.log(
        "Error deleting comment:",
        err.response ? err.response.data : err.message
      );
    }
  };

  return (
    <div className="comment_container">
      <div className="comments_scrollable">
        {comments?.length ? (
          comments.map((c) => (
            <div key={c._id} className="comment_item">
              <h4>{c.author}</h4>
              {user?._id === c?.userId && (
                <button onClick={() => deleteComment(c._id)}>
                  <MdDelete />
                </button>
              )}
              <div>{c.commentPost}</div>
            </div>
          ))
        ) : (
          <p>No comments yet.</p>
        )}
      </div>
    </div>
  );
};

export default Comments;
