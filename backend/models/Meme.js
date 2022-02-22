const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const memeSchema = new Schema({
  image: {
    type: String,
    required: true,
  },
  caption: {
    type: String,
    required: true,
  },
  userId: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  likes: [String],
  dislikes: [String],
});

module.exports = mongoose.model("Meme", memeSchema);
