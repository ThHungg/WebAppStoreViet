const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName: { type: String, required: true },
    passWord: { type: String, required: true },
    email: { type: String, required: true },
    role: {
        type: String,
        enum: ['khachhang', 'admin'],
        default: 'khachhang'
    }
})

const User = mongoose.model("User", userSchema)
module.exports = User