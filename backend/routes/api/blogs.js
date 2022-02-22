const express = require("express");
const router = express.Router();
const Blog = require("../../models/Blog");

// get all Blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find();
  if (!blogs) {
    return res.json({ status: 400, message: `No Blogs found` });
  }
  res.json(blogs);
});

// add new Blog
router.post("/", async (req, res) => {
  if (
    !req.body.topic ||
    !req.body.timestamp ||
    !req.body.userId ||
    !req.body.userName
  ) {
    return res.json({
      status: 400,
      message: `Topic, timestamp, userId and userName are all required for posting new Blog`,
    });
  }

  const newBlog = new Blog({
    topic: req.body.topic,
    timestamp: req.body.timestamp,
    userId: req.body.userId,
    userName: req.body.userName,
  });
  try {
    const saveBlog = await newBlog.save();
    res.status(201).json(saveBlog);
  } catch (error) {
    console.log(`Error when adding new Blog: ${error}`);
  }
});

// edit Blog
router.put("/", async (req, res) => {
  if (!req.body._id) {
    return res.json({
      status: 400,
      message: `ID is required for updating Blog`,
    });
  }

  const blog = await Blog.findOne({ _id: req.body._id });
  if (!blog) {
    return res.json({
      status: 400,
      message: `No Blog matches given ID ${req.body._id}`,
    });
  }

  if (req.body.comments) blog.comments = req.body.comments;

  const saveBlog = await blog.save();
  res.json(saveBlog);
});

// delete Blog
router.delete("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res.json({
      status: 400,
      message: `Blog ID is required for deleting Blog`,
    });
  }

  const blog = await Blog.findOne({ _id: req.params._id });
  if (!blog) {
    return res.json({
      status: 400,
      message: `No Blog matches given ID ${req.params._id}`,
    });
  }

  const deleteBlog = await blog.deleteOne({ _id: req.params._id });
  res.json(deleteBlog);
});

// get individual Blog
router.get("/:_id", async (req, res) => {
  if (!req.params._id) {
    return res.json({ status: 400, message: `Blog ID is required` });
  }

  const blog = await Blog.findOne({ _id: req.params._id });
  if (!blog) {
    return res.json({
      status: 400,
      message: `No Blog matches given ID ${req.params._id}`,
    });
  }

  res.json(blog);
});

module.exports = router;
