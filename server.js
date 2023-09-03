// const express = require('express');

// const multer = require('multer');
// const app = express();

// const storage = multer.diskStorage({
//   destination: function (req, file, callback) {
//     callback(null, __dirname + '/uploads');
//   },
//   filename: function (req, file, callback) {
//     callback(null, file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// const home = require("./src/app/Routes/home");

// app.post("/api", upload.array("files"), home);

const express = require("express");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const app = express();

app.use("/uploads", express.static("uploads"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// Route for image upload
app.post("/upload", upload.single("image"), (req, res) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded.");
  }

  const imageUrl = `/uploads/${req.file.filename}`;
  return res.status(200).send({ imageUrl });
});

/// route
/// Admin
// User
const userRoute = require("./src/app/Routes/Admin/UserRoute");
const PostRoutes = require("./src/app/Routes/Admin/PostRoutes");

app.use("/Admin/User", userRoute);
app.use("/Admin/Post", PostRoutes);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
