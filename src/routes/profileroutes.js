const express = require("express");
const userProfile = require("../controllers/profile/viewProfile");
const { authMiddleware } = require("../middlewares/authmiddleware");
const viewConnections = require("../controllers/user/view-connections");

const router = express.Router();


router.route("/view/profile").get(  authMiddleware, userProfile)


module.exports = router;