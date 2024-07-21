import express from "express";

import verifyToken from "../middelware/JwtVerify.js";

import Comments from "../model/Comment.js";
import Post from "../model/Post.js";

const postRouter = express.Router();

//  create post
postRouter.post("/create", verifyToken, async (req, res) => {
  try {
    console.log("Create Post Request Body:", req.body); // Log request body
    const newPost = new Post(req.body);
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    console.error("Error creating post:", err); // Log the error
    res
      .status(500)
      .json({ message: "Internal Server Error", error: err.message });
  }
});

postRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    console.log("updated post", updatedPost);
    res.status(200).json(updatedPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete post

postRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    await Comments.deleteMany({ PostId: req.params.id });
    res.status(200).json("post and comments deleted");
  } catch (err) {
    res.status(500).json(err);
  }
});
// get detail post
postRouter.get("/posts/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//  get userpost
postRouter.get("/user/:userId", verifyToken, async (req, res) => {
  try {
    const getposts = await Post.findById({ userId: req.params.userId });
    res.status(200).json(getposts);
  } catch (err) {
    res.status(500).json(err);
  }
});
// get post
postRouter.get("/post/:postId", verifyToken, async (req, res) => {
  try {
    const getposts = await Comments.find({ PostId: req.params.postId });
    res.status(200).json(getposts);
  } catch (err) {
    res.status(500).json(err);
  }
});

postRouter.get("/", verifyToken, async (req, res) => {
  try {
    const serachFilter = {
      title: { $regex: express.query.search, $option: "i" },
    };
    const posts = await Post.find(express.query.search ? serachFilter : null);

    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default postRouter;
