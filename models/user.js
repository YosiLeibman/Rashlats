var mongoose = require('mongoose');

//user schema
var UserSchema = mongoose.Schema({
    name:{
        type: String,
        require: true
    },
    email:{
        type: String,
        require: true,
        unique: true
    },
    username:{
        type: String,
        require: true,
        unique: true
    },
    password:{
        type: String,
        require: true
    }
});

var User = module.exports = mongoose.model('user',UserSchema);