const connectdb = require("../../config/database");


const editProfile=async(req,res)=>{
    try {
        await connectdb()
        console.log("req.body",req.body)
        const allowedEditFields = [
            "firstName",
            "lastName",
            "emailId",
            "photoUrl",
            "gender",
            "age",
            "about",
            "skills",
          ];
        
          const isEditAllowed = Object.keys(req.body).every((field) =>
            allowedEditFields.includes(field)
          );
              if(!isEditAllowed){
                  return res.status(400).json({error:"Invalid Edit Request"});
              }
        const loggedInUser = req.user;
    
        Object.keys(req.body).forEach((key) => (loggedInUser[key] = req.body[key]));
    
        await loggedInUser.save();
    
        res.json({
          message: `${loggedInUser.firstName}, your profile updated successfuly`,
          data: loggedInUser,
        });
      } catch (err) {
      return res.status(500).json({ error: "Internal Server Error", details: err.message    });
      }
    }
    module.exports=editProfile;