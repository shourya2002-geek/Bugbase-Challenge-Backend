const express = require("express");
const router = express.Router();
const Users = require("../models/userModel");
const { registerUser, filterUsers } = require("../Controllers/userController");

router.post("/register", registerUser);
router.get("/filter/:username", filterUsers);

module.exports = router;
