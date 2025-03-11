 
 const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
 const authMiddleware = async(req, res, next) => {
    try {
        const{token}=req.cookies;
        if(!token){
            return res.status(401).json({error:"Unauthorized"});
        }
        const verifyToken= await jwt.verify(token,"samanvitj");
        console.log("Verify Token:",verifyToken);
        const{_id}=verifyToken;
        const user = await User.findById(_id);
        if (!user) {
            return res.status(400).json({ error: "Invalid credentials" });
        }
        // console.log("User:",user);
        req.user=user;
        next();

        
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
    
   
 }

 

 module.exports = { authMiddleware,}

