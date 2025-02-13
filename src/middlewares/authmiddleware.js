 
 const authMiddleware = (req, res, next) => {
    console.log("auth middleware is called")
    const token="abc"
   let Authorizedtoken=token==="abc" ? true : false
    if (Authorizedtoken) {
        next()
    } else {
        res.status(401).send("You are not authorized")
    }
   
 }

 const userauth=(req,res,next)=>{
        console.log("user auth")
        const usertoken=23445
        let userAdminaccess=usertoken===234 ? true : false
        if(userAdminaccess){
            next()
        }else{
            res.send("You are not authorized")
        }
 }

 module.exports = { authMiddleware,userauth }

