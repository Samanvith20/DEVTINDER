const connectdb = require("../../config/database");
const ConnectionRequest = require("../../models/connection.Request");

const viewRequest= async(req,res)=>{

    try {
      await connectdb()
        const loggedInUserId=req.user._id;

        const requests= await ConnectionRequest.find({
            receiverId:loggedInUserId,
            status:"interested"
        }).populate("senderId", "name email age profilePicture");

        if(!requests){
            return res.status(404).json({error:"No requests found"});
        }
        res.json({message:"Requests found successfully", data:requests});

        
    } catch (error) {
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }


}
module.exports=viewRequest;