const express = require("express");
const router = express.Router();
const Meme = require("../../models/Meme");
const verifyToken = require("../../config/verifyToken");
const multer = require("multer");
const upload = require("../../config/imageController");

// get all Memes
router.get("/", async (req, res) => {
  const memes = await Meme.find();
  if (!memes) {
    return res.json({ status: 400, message: `No Memes found` });
  }
  res.json(memes);
});

// add new Meme
router.post("/", async (req, res) => {
  if (
    !req.body.image ||
    !req.body.caption ||
    !req.body.userId ||
    !req.body.userName
  ) {
    return res.json({
      status: 400,
      message: `Image, caption, userId and userName are all required for posting Meme`,
    });
  }

  const newMeme = new Meme({
    image: req.body.image,
    caption: req.body.caption,
    userId: req.body.userId,
    userName: req.body.userName,
  });
  try {
    const saveMeme = await newMeme.save();
    res.status(201).json(saveMeme);
  } catch (error) {
    console.log(`Error when adding new Meme: ${error}`);
  }
});

// edit Meme
router.put("/", async (req, res) => {
  if (!req.body._id) {
    return res.json({
      status: 400,
      message: `ID is required for updating Meme`,
    });
  }

  const meme = await Meme.findOne({ _id: req.body._id });
  if (!meme) {
    return res.json({
      status: 400,
      message: `No Meme matches given ID ${req.body._id}`,
    });
  }

  if (req.body.likes) meme.likes = req.body.likes;
  if (req.body.dislikes) meme.dislikes = req.body.dislikes;

  const saveMeme = await meme.save();
  res.json(saveMeme);
});

// delete Meme
router.delete("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res.json({
      status: 400,
      message: `Meme ID is required for deleting Meme`,
    });
  }

  const meme = await Meme.findOne({ _id: req.params._id });
  if (!meme) {
    return res.json({
      status: 400,
      message: `No Meme matches given ID ${req.params._id}`,
    });
  }

  const deleteMeme = await meme.deleteOne({ _id: req.params._id });
  res.json(deleteMeme);
});

module.exports = router;
