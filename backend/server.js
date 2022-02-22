require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const connectionDB = require("./config/dbConnection");
const path = require("path");
const cors = require("cors");
const bodyParser = require("body-parser");
const PORT = require("./config/port");
const rootRoute = require("./routes/root");
const nftsRoute = require("./routes/api/nfts");
const usersRoute = require("./routes/api/users");
const memesRoute = require("./routes/api/memes");
const blogsRoute = require("./routes/api/blogs");

// Connection to MongoDB
connectionDB();

// Middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public", "app")));

// ROUTES
app.use("/", rootRoute);
app.use("/api/users", usersRoute);
app.use("/api/nfts", nftsRoute);
app.use("/api/memes", memesRoute);
app.use("/api/blogs", blogsRoute);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "app", "index.html"));
});

// Check connection to DB and Run Server
mongoose.connection.once("open", () => {
  console.log("Connected to MongoDB");

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
});
