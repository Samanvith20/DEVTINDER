const mongoose = require('mongoose');

 const Userschema = new mongoose.Schema({
        name: {
            type: String,
             required: true,
             minLength: 3,
                maxLength: 20,
                trim: true,
                lowercase: true

        },
        email: {
            type: String,
            required: true,
            unique: true,
            minLength: 5,
            maxLength: 50,
            trim: true,
            lowercase: true
            
        },
        password: {
            type: String,
            required: true,
            minLength: ["5","Password must be atleast 5 characters long"],
             
            trim: true,
        },
        age:{
            type: Number,
           min: 18,
            max: 65,
        },
        gender: {
            type: String,
            validate: (value) => {
                if (["male", "female", "other"].includes(value.toLowerCase())) {
                    return true;
                } else {
                    throw new Error("Gender data is not valid");
                }
            },
        },
        
        profilePicture:{
            type: String,
        },
        skills:{
            type:[String],

        },
        about:{
            type: String,
            default: "Hey there! I am using LinkedIn"
        },
        
    },{
        timestamps:true
    });

    const User = mongoose.model('User', Userschema);
    module.exports = User;