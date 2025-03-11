const express = require("express");
const userProfile = require("../controllers/profile/viewProfile");
const { authMiddleware } = require("../middlewares/authmiddleware");

const editProfile = require("../controllers/profile/editProfile");

const router = express.Router();


router.route("/view/profile").get(  authMiddleware, userProfile)
router.route("/view/edit-profile").post(  authMiddleware, editProfile)

module.exports = router;