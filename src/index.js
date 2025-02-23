



const express = require("express");
const { authMiddleware, userauth } = require("./middlewares/authmiddleware");
const connectdb = require("./config/database");
const User = require("./models/user.model");

// Create an instance of Express
const app = express();

// dotenv configuration
require("dotenv").config();


// Middleware to parse the request body as JSON
app.use(express.json());

// Define a port
const port = 3000;

// Signup Route
app.post("/signup", async (req, res) => {
 
  console.log("Request body:", req.body);
  try {
    // need to validate the request body
    const allowedFields = ["name", "email", "password", "age", "skills", "about","gender"];
    const receivedFields = Object.keys(req.body);
      
    const isValidOperation = receivedFields.every((field) =>
      allowedFields.includes(field)
    );
    console.log("isValidOperation:", isValidOperation);
    if(!isValidOperation){
        return res.status(400).send("Invalid fields");
    }


   
    // creating an instance of User model
    const newUser = new User(req.body);

    await newUser.save();

    res.status(201).send("User created successfully");
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});

// get-user Route
app.get("/get-user",async(req,res)=>{
    try {
        const UsersData=await User.find({});
        if(UsersData){
            res.status(200).send(UsersData);
        }
        else{
            res.status(404).send("No user found");
        }
       
    } catch (error) {
      console.error("Error getting user:", error);
    }
} )

// only single user
app.get("/get-singleUser", async (req, res) => {
  try {
    // findOne return the first document that matches the query criteria
    const UserData = await User.findOne({ name: "samanvith" });

    if (!UserData) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User found", user: UserData });
  } catch (error) {
    console.error("Error getting user:", error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

// delete-route
app.delete("/delete-user",async(req,res)=>{
    try {
        const deleteData=await User.deleteOne({name:"samanvith123"});
        if(deleteData.deletedCount===0){
            res.status(404).send("No user found");
        }
        
         
          res.status(200).send({
            message:"User deleted successfully",
            deleteData
          });
        
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
      }
})

// deleteById
app.delete("/delete-userById",async(req,res)=>{
    try {
        const deleteData=await User.findByIdAndDelete("67b3f65d9ea4634850f6365d");
        if(!deleteData){
            res.status(404).send("No user found");
        }
        
         
          res.status(200).send( {
            message:"User deleted successfully",
            deleteData
          });
      } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).send("Internal Server Error");
      }
})

// differnce b/w deleteOne and findByIdAndDelete
// deleteOne will delete the first document that matches the query
// findByIdAndDelete will delete the document that matches the id

// update-route
// findByIdAndUpdate(id, ...) is equivalent to findOneAndUpdate({ _id: id }, ...).
app.put("/update-user",async(req,res)=>{
    try {
        const updateData=await User.findOneAndUpdate({name:"akashreddy"},{name:"samanvith123"},{new:true});
        if(!updateData){
            res.status(404).send("No user found");
        }
        
         
          res.status(200).send( {
            message:"User updated successfully",
            updateData
          });
      } catch (error) {
        console.error("Error updating user:", error);
        res.status(500).send("Internal Server Error");
      }
})

// Note:
// Finds a single document by its _id field. findById(id) is almost* equivalent to findOne({ _id: id }). If you want to query by a document's _id, use findById() instead of findOne()
// query.lean()--->mongoose will return the document as a plain JavaScript object rather than a mongoose document. 
// Shortcut for saving one document to the database. MyModel.insertOne(obj, options) is almost equivalent to new MyModel(obj).save(options). The difference is that insertOne() checks if obj is already a document, and checks for discriminators.
// insertMany()--->Insert an array of documents into MongoDB.
// updateOne()--->updateOne() is equivalent to update() with the { multi: false } option set. updateOne() will update the first document that matches the query.






// Connect to database and then start the server
connectdb()
  .then(() => {
    console.log("Database connected");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.log("Error while connecting to database", err);
  });
