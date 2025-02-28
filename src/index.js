



const express = require("express");

const connectdb = require("./config/database");

var cookieParser = require('cookie-parser')

// Create an instance of Express
const app = express();

// dotenv configuration
require("dotenv").config();


// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to parse the cookies
app.use(cookieParser())

// Define a port
const port = 3000;

// Signup Route
// app.post("/signup", async (req, res) => {
 
//   console.log("Request body:", req.body);
//   const{name,email,password,age}=req.body;
//   try {
//     validateSignUpData(req);
//     // need to validate the request body
//     const allowedFields = ["name", "email", "password", "age", "skills", "about","gender"];
//     const receivedFields = Object.keys(req.body);
      
//     const isValidOperation = receivedFields.every((field) =>
//       allowedFields.includes(field)
//     );
//     console.log("isValidOperation:", isValidOperation);
//     if(!isValidOperation){
//         return res.status(400).send("Invalid fields");
//     }
//     const checkalreadyUserExists=await User.findOne({
//         email:email
//     })
//     if(checkalreadyUserExists){
//         return res.status(400).send("User already exists");
//     }
//     // Hash the password(encrypt the password)
//     // 8 is the number of rounds to generate the salt
//     // The higher the rounds, the more secure the password
//     // But it will take more time to hash the password
//     const hashedPassword = await bcrypt.hash(password, 8);
  


   
//     // creating an instance of User model
//     const newUser = new User({
//       name,
//       email,
//       password: hashedPassword,
//       age,
//       skills: req.body.skills || [],
//       about: req.body.about || "",
//     });

//     await newUser.save();

//     res.status(201).send("User created successfully");
//   } catch (error) {
//     console.error("Error creating user:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// });

// Login Route
// app.post("/login", async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const user = await User.findOne({ email });
//     console.log("User:", user);
//     if (!user) {
//       return res.status(400).send("Invalid credentials");
//     }
//     // compare the password
//     const isMatch = await user.validatePassword(password);
//     if (!isMatch) {
//       return res.status(400).send("Invalid credentials");
//     }
//     // if password match generate the jwt token
//     const token=await user.getJwtToken();
//     console.log("Token:",token);
//     res.cookie("token",token,)

//     res.status(200).send("Logged in successfully");

//   } catch (error) {
//     console.error("Error logging in:", error);
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// })

// profile
// app.get("/profile", authMiddleware, async (req, res) => {
//   try {
//     const userDetail = req.user;
//     console.log("User details:", userDetail);
     
//     res.send("user details are displayed"); 
//   } catch (error) {
//     res.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// });

// Import the routes
const userRoute = require("./routes/userroutes.js")
const profileRoute = require("./routes/profileroutes.js")
app.use("/api/auth" , userRoute)
app.use("/api/profile", profileRoute)





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
