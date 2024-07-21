import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";

import verifyToken from "../middelware/JwtVerify.js";

import Comment from "../model/Comment.js";
import Post from "../model/Post.js";

const profileRouter = express.Router();

profileRouter.put("/:id", verifyToken, async (req, res) => {
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(12); // Await added here
      req.body.password = bcrypt.hashSync(req.body.password, salt);
    }

    const newUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );

    if (!newUser) {
      return res.status(404).json({ error: "User not found" });
    }

    res.status(200).json(newUser);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// deleteuser
profileRouter.delete("/:id", verifyToken, async (req, res) => {
  const id = req.params.id;
  await User.findByIdAndDelete(id);

  await Post.deleteMany({ userId: id });

  await Comment.deleteMany({ userId: id });
});
// find user

profileRouter.get("/:id", verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

export default profileRouter;
