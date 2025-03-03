

const connectdb = require("../../config/database");
const ConnectionRequest = require("../../models/connection.Request");
const User = require("../../models/user.model");

const feed= async(req,res)=>{
    await connectdb()
    try {
       
        const page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        limit = limit > 50 ? 50 : limit;
        const skip = (page - 1) * limit;
        const loggedInuser = req.user;
        console.log("loggedInuser",loggedInuser._id)
        const connectionRequest=await ConnectionRequest.find({
            $or:[
                {
                    senderId:loggedInuser._id},
                {receiverId :loggedInuser._id}
            ]
        })
        .select("receiverId senderId ")
        // console.log("connectionRequest",connectionRequest)
        if(!connectionRequest){
            return res.status(404).json({error:"No connection request found"})
        }
        // hide that requests
        const hideUsersFromFeed = new Set();
        connectionRequest.forEach((req) => {
          hideUsersFromFeed.add(req.receiverId.toString());
          hideUsersFromFeed.add(req.senderId.toString());
        });
        console.log("hideUsersFromFeed",hideUsersFromFeed)
        // get all the users except the hiddenUsers and the loggedInUser
        const users = await User.find({
          _id: { $nin: [...hideUsersFromFeed, loggedInuser._id] },
        }).select("name email")
        .skip(skip)
        .limit(limit);
        console.log("users",users)
        if(!users){
            return res.status(404).json({error:"No users found"})
        }
     res.json({message:"Connection request found successfully", data:users})
        
    } catch (error) {
         return res.status(500).json({error:"Internal server error", message:error.message})
    }

}
module.exports=feed;