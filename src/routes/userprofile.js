const express = require("express");
const { authMiddleware } = require("../middlewares/authmiddleware");
const viewRequest = require("../controllers/user/view-requests");
const viewConnections = require("../controllers/user/view-connections");


const router = express.Router();

router.route("/user/requests").get(authMiddleware, viewRequest)
router.route("/view/connections").get(  authMiddleware, viewConnections)

 

module.exports = router;