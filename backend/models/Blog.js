const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema({
  topic: {
    type: String,
    required: true,
  },
  timestamp: {
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
  comments: [
    {
      comment: {
        type: String,
        required: true,
      },
      timestamp: {
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
    },
  ],
});

module.exports = mongoose.model("Blog", blogSchema);
