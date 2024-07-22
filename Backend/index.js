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
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
// In your Express server setup
app.use("/images", express.static(path.join(__dirname, "images")));

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
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "images");
//   },
//   filename: (req, file, cb) => {
//     const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
//     cb(null, file.fieldname + "-" + uniqueSuffix + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage: storage });
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images"); // Directory where files are saved
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname); // Save file with its original name
  },
});

const upload = multer({ storage: storage });
// Corrected route path with leading /
app.post("/api/upload", upload.single("file"), (req, res) => {
  console.log("file uploaded :", req.file);
  res.json({
    filename: req.file.filename,
    path: req.file.path,
  });
});
const port = process.env.PORT || 3000; // Default to port 3000 if not set
app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
  connectDb();
});
