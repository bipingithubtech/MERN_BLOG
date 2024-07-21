import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import "../css/post.css";
import axios from "axios";
import { ImCross } from "react-icons/im";
import UserContext from "../context/Context";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("");
  const [cats, setCats] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  console.log(user);
  if (!user && !setUser) {
    navigate("/login"); // Redirect to login if not logged in
    return null;
  }

  const createCategory = () => {
    if (cat) {
      setCats([...cats, cat]);
      setCat("");
    }
  };

  const deleteCategory = (index) => {
    setCats(cats.filter((_, i) => i !== index));
  };

  const handleCreate = async (e) => {
    e.preventDefault();

    const post = {
      title,
      desc,
      username: user.username,
      userId: user._id,
      categories: cats,
    };
    console.log(post);
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        await axios.post("http://localhost:8000/api/upload", data);
      } catch (err) {
        console.log(err);
      }

      try {
        const res = await axios.post(
          "http://localhost:8000/api/post/create",
          post,

          {
            withCredentials: true,
          }
        );
        const PostId = res.data._id;
        console.log("create page data", res.data);
        navigate(`/posts/${PostId}`);
        console.log(res.data);
      } catch (err) {
        console.log(err, "error whle calling create");
      }
    }
  };

  return (
    <div className="maindiv">
      <div className="formdiv">
        <h1>Create Post</h1>
        <form onSubmit={handleCreate}>
          <input
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <div>
            <select value={cat} onChange={(e) => setCat(e.target.value)}>
              <option value="">Select Category</option>
              <option value="ai">Artificial Intelligence</option>
              <option value="cyber">Cyber Security</option>
              <option value="web">Web Development</option>
              <option value="mobile">Mobile Development</option>
              <option value="database">Data Analytics</option>
            </select>
            <button type="button" onClick={createCategory}>
              Add
            </button>
          </div>
          <div className="category">
            {cats.map((c, i) => (
              <div className="category-item" key={i}>
                <p>{c}</p>
                <ImCross onClick={() => deleteCategory(i)} />
              </div>
            ))}
          </div>
          <div>
            <textarea
              className="description"
              placeholder="Description"
              onChange={(e) => setDesc(e.target.value)}
              rows={9}
              cols={30}
              value={desc}
            />
          </div>

          <button type="submit">Create Post</button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
