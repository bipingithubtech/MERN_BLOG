import React, { useContext, useEffect, useState } from "react";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useNavigate, useParams } from "react-router";
import UserContext from "../context/Context";
import "../css/edit.css";

const Edit = () => {
  const PostId = useParams().id;
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const [title, setTitle] = useState("");
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [existingPhoto, setExistingPhoto] = useState(null);

  const FetchPost = async () => {
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
      setTitle(res.data.title);
      setDesc(res.data.desc);
      setCats(res.data.categories);
      setExistingPhoto(res.data.photo); // Set existing photo URL
    } catch (err) {
      console.error(
        "Error fetching post:",
        err.response ? err.response.data : err.message
      );
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
      photo: existingPhoto, // Use existing photo unless a new file is selected
    };

    if (file) {
      const data = new FormData();
      const filename = file.name;
      data.append("name", filename);
      data.append("file", file);
      post.photo = filename; // Update photo to the new file name

      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {
        console.error("Error uploading file:", err);
      }
    }

    try {
      const res = await axios.put(
        `http://localhost:8000/api/post/${PostId}`,
        post,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
          withCredentials: true,
        }
      );
      console.log("uudated value", res.data);
      navigate(`/posts/${PostId}`);
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const addCategory = () => {
    let updatedCats = [...cats];
    updatedCats.push(cat);
    setCats(updatedCats);
    setCat(""); // Clear the input after adding a category
  };

  useEffect(() => {
    FetchPost();
  }, [PostId]);

  return (
    <div className="edit-container">
      <div className="edit-form">
        <h1>Update Your Post</h1>
        <form onSubmit={handleUpdate}>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            placeholder="Enter post title"
          />
          <div>
            <div>
              <input
                type="text"
                value={cat}
                onChange={(e) => setCat(e.target.value)}
                placeholder="Enter post category"
              />
              <button type="button" onClick={addCategory}>
                Add
              </button>
            </div>
            <div className="categories">
              {cats.map((c, i) => (
                <div className="category-item" key={i}>
                  <p>{c}</p>
                  <ImCross
                    className="remove-icon"
                    onClick={() => deleteCategory(i)}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <textarea
              className="description"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              rows={9}
              value={desc}
            />
          </div>
          <div>
            <input type="file" onChange={(e) => setFile(e.target.files[0])} />
            {existingPhoto && <img src={existingPhoto} alt="Current" />}
          </div>
          <button type="submit">Update Post</button>
        </form>
      </div>
    </div>
  );
};

export default Edit;
