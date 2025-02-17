const mongoose = require("mongoose");

// Database connection function
const connectdb = async () => {
    console.log("Connecting to database");
    console.log("process.env.MONGODB_URI", process.env.MONGODB_URI);

    try {
        await mongoose.connect(process.env.MONGODB_URI, {
           
        });
        console.log("Database connected successfully");
    } catch (error) {
        console.log("Error while connecting to database", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectdb;
