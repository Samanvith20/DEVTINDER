const express=require("express")
// create a instance of express
const app=express()

// create a port
const port=3000

// order of execution is important while routing 
// handle the route (this will be applicable to all http methods)
app.use("/hello",(req,res)=>{
    res.send("Hello World")
})

// this will be applicable to only get method
app.get("/contact",(req,res)=>{
    res.send("contact page")
})

// this will be applicable to only post method
app.post("/contact",(req,res)=>{
    res.send("contact page")
})

app.get("/about",(req,res)=>{
    console.log("query in the url",req.query)
    res.send("about page")
})

// here b is optional it may or may not be present 
app.patch("/ab?c",(req,res)=>{
    res.send("anything after /ab and before c will be matched")
})


// this will be (*) write anything after /ac will be matched
app.delete("/ac*d",(req,res)=>{
    res.send("hello world")
})


// we need to listen 
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})
