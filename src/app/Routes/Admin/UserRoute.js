//Fixed code
const express = require("express");
const router = express.Router();

const userCtr = require("../../Controllers/Admin/User/UserController");

router.get("/Index", userCtr.index);
router.post("/Create", userCtr.create);
router.get("/Detail/:id", userCtr.detail);
router.put("/Update/:id", userCtr.update);
router.delete("/Delete/:id", userCtr.delete);

module.exports = router;
