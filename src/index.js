



const express = require("express");
const cors = require("cors");

const connectdb = require("./config/database");

var cookieParser = require('cookie-parser')

// Create an instance of Express
const app = express();

// dotenv configuration
require("dotenv").config();

// Middleware to enable CORS
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);


// Middleware to parse the request body as JSON
app.use(express.json());

// Middleware to parse the cookies
app.use(cookieParser())

// Define a port
const port = 3000;



// Import the routes
const userRoute = require("./routes/userroutes.js")
const profileRoute = require("./routes/profileroutes.js")
const requestRoute = require("./routes/requestroute.js")
const connectionsRoute = require("./routes/userprofile.js")
app.use("/api/auth" , userRoute)
app.use("/api/profile", profileRoute)
app.use("/api/request", requestRoute)
app.use("/api/profile", connectionsRoute)




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
