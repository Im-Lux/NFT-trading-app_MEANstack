const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join("..", "public", "images"));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.filename}_${randomstring.generate()}`);
  },
});

const upload = multer({ storage });

module.exports = upload;
