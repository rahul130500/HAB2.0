const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    outlookId: String,
    username: String,
    email: String,
    isAdmin: { type: Boolean, default: false },
   // email:{ type: String, required: true },
    //accessToken: { type: String, required: true,select: false }
    
});

const User = mongoose.model('user', userSchema);

module.exports = User;
