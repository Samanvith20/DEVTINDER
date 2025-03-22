const Razorpay = require("razorpay");
const Payment = require("../../models/payment");

const razorpayInstance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

const CreateOrder = async (req, res) => {
  try {
    const { membershipType } = req.body;
    if (!membershipType) {
      return res.status(400).json({ message: "Membership type is required" });
    }

    const membershipTypes = ["gold", "premium"];
    if (!membershipTypes.includes(membershipType)) {
      return res.status(400).json({ message: "Invalid membership type" });
    }

    const { firstName, lastName, emailId } = req.user;
    const amount = membershipType === "gold" ? 500 * 100 : 700 * 100;

    const orderOptions = {
      amount,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType,
      },
    };

    const order = await razorpayInstance.orders.create(orderOptions);
    console.log("Order created successfully", order);

    const payment = new Payment({
      userId: req.user._id,
      orderId: order.id,
      status: order.status,
      
      amount: order.amount/100,
      currency: order.currency,
      receipt: order.receipt,
      notes: order.notes,
    });

    const savedPayment = await payment.save();

    res.status(200).json({
      data: savedPayment,
      message: "Order created successfully",
      keyId: process.env.RAZORPAY_KEY_ID,
    });
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = CreateOrder;
