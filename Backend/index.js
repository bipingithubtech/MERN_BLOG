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

dotenv.config();

const app = express();
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true })); // Fixed to use bodyParser
app.use(cors());

const corsOptions = {
  origin: "*", // Allow all origins
  methods: "GET,POST", // Allow only these methods
  credentials: true, // Fixed typo
};
app.use(cors(corsOptions));

app.use("/api/user", router);
app.use("/api/profile", profileRouter);
app.use("api/post", postRouter);
app.use("api/comment", commentRouter);

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.url); // Ensure correct env variable name
    console.log("DB connected successfully");
  } catch (error) {
    console.log("Error while connecting to DB", error); // Added error logging
  }
};

const port = process.env.PORT || 3000; // Default to port 3000 if not set
app.listen(port, () => {
  console.log(`Listening to port number ${port}`);
  connectDb();
});
