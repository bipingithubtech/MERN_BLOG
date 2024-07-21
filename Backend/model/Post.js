// import mongoose from "mongoose";

import mongoose from "mongoose";

// const PostShema = new mongoose.Schema(
//   {
//     title: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     desc: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     photo: {
//       type: String,
//       required: true,
//     },
//     username: {
//       type: String,
//       required: true,
//       unique: true,
//     },
//     userId: {
//       type: String,
//       required: true,
//     },
//     categories: {
//       type: Array,
//     },
//   },
//   { timestamps: true }
// );

// const Post = new mongoose.model("Post", PostShema);
// export default Post;

const PostUser = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    desc: {
      type: String,
      required: true,
    },
    photo: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    categories: {
      type: Array,
    },
  },
  { timestamps: true }
);

const Post = mongoose.model("Post", PostUser);

export default Post;
