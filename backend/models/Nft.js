const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const nftSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  price: {
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
  isOnSale: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model("Nft", nftSchema);
