const { validateSignUpData } = require("../../utils/validation");
const bcrypt = require('bcrypt');
const User = require("../../models/user.model");

const register=async (req, res) => {
 
    console.log("Request body:", req.body);
    const{name,email,password,age}=req.body;
    try {
      validateSignUpData(req);
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
      const checkalreadyUserExists=await User.findOne({
          email:email
      })
      if(checkalreadyUserExists){
          return res.status(400).send("User already exists");
      }
      // Hash the password(encrypt the password)
      // 8 is the number of rounds to generate the salt
      // The higher the rounds, the more secure the password
      // But it will take more time to hash the password
      const hashedPassword = await bcrypt.hash(password, 8);
    
  
  
     
      // creating an instance of User model
      const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        skills: req.body.skills || [],
        about: req.body.about || "",
      });
  
      await newUser.save();
  
      res.status(201).json({ message: "User created successfully", user: newUser });
    } catch (error) {
      console.error("Error creating user:", error);
      res.status(500).json({ error: "Internal Server Error", details: error.message });
    }
  }
  module.exports = register;