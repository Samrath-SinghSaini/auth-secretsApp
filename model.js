const mongoose = require('mongoose')
const encrypt = require('mongoose-encryption')
require('dotenv').config()

const userSchema = new mongoose.Schema({
    userName:{type:String, required:true}, 
    password:{type:String, required:true}
})
//This is encryption using mongoose-encryption package, it works on the mongoose schema itself and scrambles the pass using the key. and automatically decrypts when the passwords are queried using find 
// userSchema.plugin(encrypt, {secret:process.env.SECRET_KEY, encryptedFields:['password']})

const userModel = new mongoose.model("User", userSchema)

module.exports = userModel