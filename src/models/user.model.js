const mongoose = require('mongoose');
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
 const userSchema = new mongoose.Schema({
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
        isPremium:{
            type: Boolean,
            default: false
        },
        membershipType:{
            type: String,
            
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
        
        photoUrl:{
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
    userSchema.methods.getJwtToken =  async function () {
        const user = this;

        const token = await jwt.sign({ _id: user._id }, "samanvitj", {
          expiresIn: "7d",
        });
        return token;
    }

    userSchema.methods.validatePassword = async function (password) {
        const user = this;
        const isMatch = await bcrypt.compare(password, user.password);
        return isMatch;
    }

    const User = mongoose.model('User', userSchema);
    module.exports = User;