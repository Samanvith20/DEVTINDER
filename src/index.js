const express=require("express")
const{authMiddleware,userauth}=require("./middlewares/authmiddleware")
// create a instance of express
const app=express()

// create a port
const port=3000


// calling the middleare for "/admin route" for all the routes of HTTP methods
app.use("/admin",authMiddleware)

app.get("/admin/getUserDetails",(req,res)=>{
    res.send("admin user details")
})

// calling the middleware for "/user route" for only get method
app.post("/admin/addUser",(req,res)=>{
    res.send("admin user added")
})

// without calling the middleware because we are not using it
app.get("/user/getUserDetails",userauth,(req,res)=>{
    res.send("user details")
})

app.post("/user/login",(req,res)=>{
    res.send("user login")
})

app.get("/error",(req,res)=>{
    
    throw new Error("something went wrong")
    // another way of handling the error
    //  catch (error) {
     
    //     res.status(500).send("something went wrong")
        
    // }
    
})

// error handling it is one way of handling the error
app.use((err,req,res,next)=>{
    if(err){
        res.status(500).send("something went wrong")
    }
    
})

// next()---> it is used to pass the control to the next matching routehandler(or middleware)
app.get("/video",(req,res,next)=>{
    console.log("middleware")
    next()
},
[(req,res,next)=>{
    console.log("video page")
    res.send("video page")
   
}],
(req,res)=>{
    console.log("middleware")
})



// we need to listen 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
