const express = require("express");
const router = express.Router();
const Nft = require("../../models/Nft");

// CRUD NFTs
router
  .route("/")
  .get(async (req, res) => {
    const nfts = await Nft.find();
    if (!nfts) {
      return res.status(400).json({ message: "No NFTs found" });
    }
    res.json(nfts);
  })
  .post(async (req, res) => {
    if (
      !req.body.name ||
      !req.body.image ||
      !req.body.price ||
      !req.body.userId ||
      !req.body.userName
    ) {
      return res.json({
        status: 400,
        message:
          "Name, image, price, userId and userName are all required for posting NFT",
      });
    }

    const newNft = new Nft({
      name: req.body.name,
      image: req.body.image,
      price: `${req.body.price} LUX`,
      userId: req.body.userId,
      userName: req.body.userName,
      isOnSale: true,
    });
    try {
      const saveNft = await newNft.save();
      res.status(201).json(saveNft);
    } catch (error) {
      console.log(`Error when adding new NFT: ${error}`);
    }
  })
  .put(async (req, res) => {
    if (!req.body._id) {
      return res
        .status(400)
        .json({ message: "ID is required for updating NFT" });
    }

    const nft = await Nft.findOne({ _id: req.body._id });
    if (!nft) {
      return res
        .status(400)
        .json({ message: `No NFT matches given ID ${req.body._id}` });
    }
    if (req.body.name) nft.name = req.body.name;
    if (req.body.image) nft.image = req.body.image;
    if (req.body.price) nft.price = req.body.price;
    if (req.body.userId) nft.userId = req.body.userId;
    if (req.body.userName) nft.userName = req.body.userName;
    nft.isOnSale = req.body.isOnSale;
    const saveNft = await nft.save();
    res.json(saveNft);
  });

// Delete NFT
router.delete("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res
      .status(400)
      .json({ message: "NFT ID is required for deleting NFT" });
  }

  const nft = await Nft.findOne({ _id: req.params._id });
  if (!nft) {
    return res
      .status(400)
      .json({ message: `No NFT matches given ID ${req.params._id}` });
  }

  const deleteNft = await nft.deleteOne({ _id: req.params._id });
  res.json(deleteNft);
});

// Get Individual NFT
router.get("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res.status(400).json({ status: 400, message: "NFT ID is required" });
  }

  const nft = await Nft.findOne({ _id: req.params._id });
  if (!nft) {
    return res.status(400).json({
      status: 400,
      message: `No NFT matches given ID ${req.params._id}`,
    });
  }

  res.json(nft);
});

module.exports = router;
