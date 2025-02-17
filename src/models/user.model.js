const mongoose = require('mongoose');

 const Userschema = new mongoose.Schema({
        name: {
            type: String,
           
        },
        email: {
            type: String,
            
        },
        password: {
            type: String,
           
        },
        age:{
            type: Number,
          
        },
        
    },{
        timestamps:true
    });

    const User = mongoose.model('User', Userschema);
    module.exports = User;