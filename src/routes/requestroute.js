const express = require("express");

const { authMiddleware } = require("../middlewares/authmiddleware");
const connectionRequest = require("../controllers/RequestController/connectionrequest");
const reviewRequest = require("../controllers/RequestController/reviewrequest");

const router = express.Router();


 router.route("/send/:status/:id").post(authMiddleware, connectionRequest)
 router.route("/review/:status/:requestId").post(authMiddleware, reviewRequest)

module.exports = router;