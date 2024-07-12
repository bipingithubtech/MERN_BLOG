import express from "express";

import verifyToken from "../middelware/JwtVerify.js";
import Comments from "../model/Comment.js";
const commentRouter = express.Router();

//  cerate post

commentRouter.post("/create", verifyToken, async (req, res) => {
  try {
    const newComent = await Comment(req.body);
    const savedComment = await newComent.save();

    res.status(200).json(savedComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update

commentRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateComment = await Comments.findByIdAndUpdate(
      req.prams.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updateComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete

commentRouter.delete("/:id", verifyToken, async (req, res) => {
  try {
    await Comments.findByIdAndDelete(req.params.id);
    res.status(200).json("comment deleted");
  } catch (arr) {
    res.status(500).json(err);
  }
});

// get comments

commentRouter.get("/post/:postId", async (req, res) => {
  try {
    const comments = await Comments.find({ PostId: req.params.postId });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json(err);
  }
});

export default commentRouter;
