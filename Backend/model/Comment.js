import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  commentPost: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  PostId: {
    type: String,
    reqired: true,
  },
});

const Comments = mongoose.model("Comments", CommentSchema);
export default Comments;
