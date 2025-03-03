
const connectdb = require("../../config/database");
const User = require("../../models/user.model")
const ConnectionRequest = require("../../models/connection.Request");
const connectionRequest=async(req,res)=>{
    try {
         await connectdb()
       
        const fromUserId=req.user._id;
        const{id,status}=req.params;
        console.log("paramsdata",req.params)
        const statusAllowedFields=["ignored", "interested",]
        if(!statusAllowedFields.includes(status)){
            return res.status(400).json({error:"Invalid status"});
        }
        // check if these reuest already from both the ends 
        const connectionRequest=await ConnectionRequest.findOne({
            $or:[
                {senderId:fromUserId,receiverId:id},
                {senderId:id,receiverId:fromUserId}
            ]

        })
        if(connectionRequest){
            return res.status(400).json({error:"Request already sent"})
        }
        // check if the user exists
        const user=await User.findById(id);
        if(!user){
            return res.status(404).json({error:"User not found in our database"})
        }
        // create the connection request
        const newConnectionRequest=new ConnectionRequest({
            senderId:fromUserId,
            receiverId:id,
            status
        });
        await newConnectionRequest.save();
        res.json({message:"Connection request sent successfully", data:newConnectionRequest});

        
    } catch (error) {
        console.error("Error sending connection request:", error);
        res.status(500).json({ error: "Internal Server Error", details: error.message

        });
        
    }
}
module.exports=connectionRequest;