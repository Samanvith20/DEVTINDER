const express = require("express");
const { authMiddleware } = require("../middlewares/authmiddleware");
const viewRequest = require("../controllers/user/view-requests");
const viewConnections = require("../controllers/user/view-connections");
const feed = require("../controllers/user/feed");


const router = express.Router();

router.route("/user/requests").get(authMiddleware, viewRequest)
router.route("/view/connections").get(  authMiddleware, viewConnections)
router.route("/view/feed").get(  authMiddleware, feed)
 

module.exports = router;