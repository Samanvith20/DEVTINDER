const express = require("express");

const { authMiddleware } = require("../middlewares/authmiddleware");
const CreateOrder = require("../controllers/payment/createOrder");



const router = express.Router();


router.route("/create-order").post(authMiddleware,CreateOrder)

module.exports = router;