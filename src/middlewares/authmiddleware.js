 
 const jwt = require("jsonwebtoken");
const User = require("../models/user.model");
 const authMiddleware = async(req, res, next) => {
    try {
        const{token}=req.cookies;
        if(!token){
            return res.status(401).send("Unauthorised");
        }
        const verifyToken= await jwt.verify(token,"samanvitj");
        console.log("Verify Token:",verifyToken);
        const{_id}=verifyToken;
        const user = await User.findById(_id);
        if (!user) {
          throw new Error("User not found");
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

