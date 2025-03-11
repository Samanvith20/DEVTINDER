const User = require("../../models/user.model")


const login=async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      console.log("User:", user);
      if (!user) {
        return res.status(400).json({ error: "Invalid credentials" });
      }
      // compare the password
      const isMatch = await user.validatePassword(password);
      if (!isMatch) {
        return res.status(400).send("Invalid credentials");
      }
      // if password match generate the jwt token
      const token=await user.getJwtToken();
      console.log("Token:",token);
      res.cookie("token",token,)
  
      res.status(200).json({ message: "User logged in successfully", user, token });
  
    } catch (error) {
      console.error("Error logging in:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
    module.exports = login;