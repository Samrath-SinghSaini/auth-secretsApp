const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    userName:{type:String, required:true}, 
    password:{type:String, required:true}
})

userSchema.plugin(encrypt, {secret:process.env.SECRET_KEY, encryptedFields:['password']})
const userModel = new mongoose.model("User", userSchema)

module.exports = userModel