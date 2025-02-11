const express=require("express")
// create a instance of express
const app=express()

// create a port
const port=3000


// we need to listen 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
