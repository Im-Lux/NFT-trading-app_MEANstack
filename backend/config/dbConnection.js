require("dotenv").config();
const mongoose = require("mongoose");

const connectionDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
  } catch (error) {
    console.log(`Error when connecting to database: ${error.message}`);
  }
};

module.exports = connectionDB;
