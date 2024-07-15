import React, { useContext, useState } from "react";
import { useNavigate } from "react-router";
import UserContext from "../context/Context";
import axios from "axios";
import { ImCross } from "react-icons/im";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [desc, setdecs] = useState("");
  const [file, setFile] = useState(null);
  const [cat, setCat] = useState("a");
  const [cats, setCats] = useState([]);
  const { user } = useContext(UserContext);
  const naviagete = useNavigate();

  const createCategory = () => {
    let updatedcats = [...cats];
    updatedcats.push(cat);
    setCat("");
    setCats(updatedcats);
  };
  const deletecategory = () => {
    let updatedcats = [...cats];
    updatedcats.splice(i);
    setCats(updatedcats);
  };
  const handleCreate = async (e) => {
    e.preventDefault();
    const post = {
      title,
      desc,
      username: user.username,
      userId: user.userId,
      categories: cats,
    };
    if (file) {
      const data = new FormData();
      const filename = Date.now() + file.name;
      data.append("img", filename);
      data.append("file", file);
      post.photo = filename;
      try {
        const imageUpload = await axios.post("/api/upload", data);
      } catch (err) {
        console.log(err);
      }
    }
    try {
      const res = await axios.post("/api/post/create", post, {
        withCredentials: true,
      });
      naviagete("/post" + res.data._id);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div>
        <h1>create post</h1>
        <form>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          ></input>
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
          ></input>
          <div>
            <div>
              <select value={cat} onChange={(e) => setCat(e.target.value)}>
                <option value="ai">artifiual intelegence</option>
                <option value="cyber">cyber security</option>
                <option value="web">web developmen</option>
                <option value="mobile">mobile development</option>
                <option value="datbase">data analytics</option>
              </select>
              <div onClick={createCategory}>add</div>
            </div>
            <div>
              {cats?.map((c, i) => {
                <div key={i}>
                  <p>{c}</p>
                  <p onClick={deletecategory(i)}>
                    {" "}
                    <ImCross />
                  </p>
                </div>;
              })}
            </div>
            <textarea
              onChange={(e) => setdecs(e.target.value)}
              rows={9}
              cols={30}
            ></textarea>
            <button onClick={handleCreate}></button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
