import express from "express";

import verifyToken from "../middelware/JwtVerify.js";

import Comments from "../model/Comment.js";
import Post from "../model/Post.js";

const postRouter = express.Router();

//  create post
postRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const Posts = await Post(req.body);
    const newpost = await Posts.save();
    res.status(200).json(newpost);
  } catch (err) {
    res.status(200).json(err);
  }
});
//  update post

postRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updatedPost = await Post.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
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
    res.status(200).josn("post and comments deleted");
  } catch {
    res.status(500).json(err);
  }
});
// detail post
postRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json(post);
  } catch (err) {
    res.status(500).json(err);
  }
});
//  get userpost
postRouter.get("/user/userId", async (req, res) => {
  try {
    const getposts = await Post.findById({ userId: req.params.userId });
    res.status(200).json(getposts);
  } catch (err) {
    res.status(500).json(err);
  }
});

postRouter.get("/", async (req, res) => {
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
