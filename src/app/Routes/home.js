//Fixed code
const express = require("express");
const router = express.Router();

const home = require("../Controllers/HomeController");

router.get("/", home.CreatePost);

module.exports = router;
