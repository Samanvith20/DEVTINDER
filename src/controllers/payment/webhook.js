const { validateWebhookSignature } = require("razorpay/dist/utils/razorpay-utils");
const Payment = require("../../models/payment");
const User = require("../../models/user.model");

const webhook = async (req, res) => {
  try {
    console.log("Webhook Event Received");

    // Extract webhook signature and secret
    const webhookSignature = req.headers["x-razorpay-signature"];
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    if (!webhookSignature) {
      console.error("Webhook signature missing");
      return res.status(400).json({ message: "Webhook signature missing" });
    }

    // Validate the signature
    const isWebhookValid = validateWebhookSignature(
      JSON.stringify(req.body),
      webhookSignature,
      secret
    );

    if (!isWebhookValid) {
      console.error("Invalid webhook signature");
      return res.status(400).json({ message: "Invalid Signature" });
    }

    console.log("Webhook Event:", req.body);

    // Handle payment captured event
    if (req.body.event === "payment.captured") {
      const paymentDetails = req.body.payload.payment.entity;

      console.log("Payment Details:", paymentDetails);

      // Find the payment based on orderId
      const payment = await Payment.findOne({ orderId: paymentDetails.order_id });

      if (!payment) {
        console.error("Payment not found for order ID:", paymentDetails.order_id);
        return res.status(404).json({ message: "Payment not found" });
      }

      // Update payment status
      payment.status = paymentDetails.status;
      const updatedPayment = await payment.save();

      console.log("Payment Updated:", updatedPayment);

      // Update the user's premium status
      const user = await User.findOne({ _id: payment.userId });

      if (!user) {
        console.error("User not found for payment userId:", payment.userId);
        return res.status(404).json({ message: "User not found" });
      }

      user.isPremium = true;
      user.membershipType = payment.notes.membershipType;
      await user.save();

      console.log("User updated with new premium status");
    } else {
      console.log("Unhandled Webhook Event:", req.body.event);
      return res.status(400).json({ message: "Webhook Event not handled" });
    }

    // Respond with success message
    res.status(200).json({ message: "Webhook received" });

  } catch (error) {
    console.error("Error in webhook:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = webhook;
