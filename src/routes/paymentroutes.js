const express = require("express");

const { authMiddleware } = require("../middlewares/authmiddleware");
const CreateOrder = require("../controllers/payment/createOrder");
const webhook = require("../controllers/payment/webhook");
const verifyPayment = require("../controllers/payment/verifyPayment");



const router = express.Router();


router.route("/create-order").post(authMiddleware,CreateOrder)
router.route("/webhook").post(webhook)
router.route("/verify-payment").get(authMiddleware,verifyPayment)

module.exports = router;