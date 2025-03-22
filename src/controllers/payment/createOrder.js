const Razorpay = require("razorpay");

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
    var instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
        
      });

    const { firstName, lastName, emailId } = req.user;
    const order =  await instance.orders.create({
      amount:
        membershipType === "gold"
          ? 500
          : membershipType === "premium"
          ? 700
          : null,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        firstName,
        lastName,
        emailId,
        membershipType: membershipType,
      },
    });
    console.log("Order created successfully", order);
    res.status(200).json({ order });
  } catch (error) {
    console.log("Error in creating order", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = CreateOrder;
