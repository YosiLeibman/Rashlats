var mongoose = require('mongoose');

// Schema
var messageSchema = mongoose.Schema({
    title:{
        type: String,
        require: true
    },
    body:{
        type: String,
        require: true
    }
});


var message = module.exports = mongoose.model('message', messageSchema);