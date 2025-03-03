const connectdb = require("../../config/database");
const ConnectionRequest = require("../../models/connection.Request");

const reviewRequest= async(req,res)=>{
    try {
        await connectdb()
        const loggedInUserId=req.user._id;
        console.log("loggedInUserId",loggedInUserId)
        const {requestId,status}=req.params;
        console.log("paramsdata",req.params)
        const statusAllowedFields=["accepted", "rejected",]
        if(!statusAllowedFields.includes(status)){
            return res.status(400).json({error:"Invalid status"});
        }
        // we need to check if the request exists with that data and change the status
        const updatedReuestData= await ConnectionRequest.findOne({
            _id:requestId,
            receiverId:loggedInUserId,
            status:"interested"
        })
        if(!updatedReuestData){
            return res.status(404).json({error:"Request not found"});
        }
        updatedReuestData.status=status;
        await updatedReuestData.save();
        res.json({message:"Request reviewed successfully", data:updatedReuestData});

       


        
    } catch (error) {
         res.status(500).json({ error: "Internal Server Error", details: error.message  });
    }
}

module.exports=reviewRequest;