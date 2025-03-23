const User = require("../../models/user.model");

const verifyPayment = async (req, res) => {
    try {
        const userId = req.user._id;
        const user = await User.findById(userId);

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        if (user.isPremium) {
            return res.status(200).json({ message: "User is already premium",
                data: user
             });
        } else {
            return res.status(200).json({ message: "User is not premium" ,
                data: user
            });
        }

    } catch (error) {
        console.log("Error in verifying payment", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

module.exports = verifyPayment;
