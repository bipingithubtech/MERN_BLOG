import express from "express";

import verifyToken from "../middelware/JwtVerify.js";
import Comments from "../model/Comment.js";
const commentRouter = express.Router();

//  cerate post

commentRouter.post("/create", verifyToken, async (req, res) => {
  try {
    console.log("Request body:", req.body); // Log the request body

    // Ensure the necessary fields are provided
    const { commentPost, author, userId, PostId } = req.body;
    if (!commentPost || !author || !userId || !PostId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Create a new comment instance
    const newComment = new Comments({
      commentPost,
      author,
      userId,
      PostId,
    });

    // Save the new comment to the database
    const savedComment = await newComment.save();

    // Return the saved comment in the response
    res.status(200).json(savedComment);
  } catch (err) {
    console.error("Error saving comment:", err); // Log the error
    res.status(500).json({ error: "Internal server error" });
  }
});

// update

commentRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    const updateComment = await Comments.findByIdAndUpdate(
      req.params.id,
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
