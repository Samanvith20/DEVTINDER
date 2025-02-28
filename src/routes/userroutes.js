const express = require("express");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");

const router = express.Router();


router.route("/signup").post(register)
router.route("/login").post(login)


module.exports = router;