const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const postSchema = new Schema({
  title: String,
  content: String,
  author: {
    type: ObjectId,
    ref: "User"
  },
  date: { type: Date, default: new Date() },
  relativeDate: String,
  comments: []
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
