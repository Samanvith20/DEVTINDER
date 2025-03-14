
const connectdb = require("../../config/database");
const ConnectionRequest = require("../../models/connection.Request");

const viewConnections = async(req,res)=>{
    try {
        await connectdb()
        const loggedInUserId=req.user._id;
        //  find the connections where the status is accepted
        const connections= await ConnectionRequest.find({
            $or:[
                {receiverId:loggedInUserId,status:"accepted"},
                {senderId:loggedInUserId,status:"accepted"}
            ]
        }).populate("senderId receiverId", "name email age photoUrl");
        if(!connections){
            return res.status(404).json({error:"No connections found"});
        }
        const data = connections.map((row) => {
            if (row.senderId._id.toString() === loggedInUserId.toString()) {
              return row.receiverId;
            }
            return row.senderId;
          });

        res.json({message:"Connections found successfully", data:data});
        
    } catch (error) {
        
        return res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
}
module.exports=viewConnections;