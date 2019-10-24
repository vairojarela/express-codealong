const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    name: {
      type: String
    },
    email: {
      type: String
    },
    age: {
      type: Number
    },
    city: {
      type: String
    },
    phone: {
      type: String
    },
    image: {
      type: String,
      default: "http://s3.amazonaws.com/37assets/svn/765-default-avatar.png"
    }
  },
  {
    timestamps: true
  }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
