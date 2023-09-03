//Fixed code
const express = require("express");
const router = express.Router();


const PostController = require("../../Controllers/Admin/Post/PostController")

router.post("/Index/:pageNumber", PostController.index);
router.get("/modes", PostController.listMode);
router.get("/reactions", PostController.listReact);
router.get("/users", PostController.listUser);
router.post("/create", PostController.create);
router.get("/Detail/:id", PostController.detail);
router.put("Update", PostController.update);
router.delete("Delete/:id", PostController.delete);

module.exports = router;
