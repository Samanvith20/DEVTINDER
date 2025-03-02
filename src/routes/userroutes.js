const express = require("express");
const register = require("../controllers/auth/register");
const login = require("../controllers/auth/login");
const logOut = require("../controllers/auth/logout");

const router = express.Router();


router.route("/signup").post(register)
router.route("/login").post(login)
router.route("/logout").get(logOut)


module.exports = router;