const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: String,
    outlookId: String,
    isAdmin: { type: Boolean, default: false },
   // email:{ type: String, required: true },
    //accessToken: { type: String, required: true,select: false }
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
