
const logOut=async(req,res)=>{
    try {
        res.cookie("token", null, {
            expires: new Date(Date.now()),
          });
            res.status(200).json({ message: "User logged out successfully" });
        
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Internal Server Error", details: error   .message });
    }
}
module.exports= logOut;