
const logOut=async(req,res)=>{
    try {
        res.clearCookie("token");
        res.send("Logged out successfully");
        
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ error: "Internal Server Error", details: error   .message });
    }
}
module.exports= logOut;