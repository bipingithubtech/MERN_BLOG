import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cors from "cors";
import bodyParser from "body-parser";
import router from "./Routes.js/UserRoutes.js";
import profileRouter from "./Routes.js/Profile.js";
import postRouter from "./Routes.js/PostRoute.js";
import commentRouter from "./Routes.js/CommentsRoute.js";
import cookieParser from "cookie-parser";
import multer from "multer";

dotenv.config();

const app = express();
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Configure CORS
const corsOptions = {
  origin: "http://localhost:3000", // specify the origin you want to allow
  credentials: true, // enable set cookie
};
app.use(cors(corsOptions));

// Your routes
app.use("/api/user", router);
app.use("/api/profile", profileRouter);
app.use("/api/post", postRouter);
app.use("/api/comment", commentRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.url); // Ensure correct env variable name
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting to DB", error); // Added error logging
  }
};
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.img);
  },
});
const upload = multer({ storage: storage });
app.post("api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("image uploaded");
});
const port = process.env.PORT || 3000; // Default to port 3000 if not set
app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
  connectDb();
});
