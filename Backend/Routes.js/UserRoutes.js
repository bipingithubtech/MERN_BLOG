import express from "express";
import User from "../model/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const router = express.Router();

// registration
router.post("/register", async (req, res) => {
  try {
    console.log(req.body);
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ error: "Username, email, and password are required" });
    }
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    res.status(201).json(savedUser);
  } catch (err) {
    console.log(err);
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const result = await bcrypt.compare(password, user.password);
    if (result) {
      const token = jwt.sign(
        { _id: user._id, email: user.email, username: user.username },
        process.env.jwt,
        { expiresIn: "1d" }
      );

      return res
        .status(200)
        .cookie("jwtToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "none",
        })
        .json({
          token,
          user: { _id: user._id, email: user.email, username: user.username },
        });
    } else {
      return res.status(400).json({ message: "Invalid email or password" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

//  logout

router.get("/logout", (req, res) => {
  try {
    res
      .clearCookie("jwtToken", { sameSite: "none", secure: true })
      .status(200)
      .send("sucessfully logout");
  } catch (err) {
    res.status(500).send("unable to logout", err);
  }
});
router.get("/refetch", async (req, res) => {
  const token = req.cookies.jwtToken;
  jwt.verify(token, process.env.secret, {}, async (err, data) => {
    if (err) {
      res.status(500);
    } else {
      res.status(200).json(data);
    }
  });
});

export default router;
