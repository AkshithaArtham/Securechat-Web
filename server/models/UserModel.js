const mongoose = require('mongoose')

const userSchema =  new mongoose.Schema({
    name : {
        type : String,
        required : [true, "provide name"]
    },
    email : {
        type : String,
        required : [true,"provide email"],
        unique : true
    },
    password : {
        type : String,
        required : [true, "provide password"]
    },
    profile_pic : {
        type : String,
        default : ""
    },
    secretcode : {
        type : String,
        required : [true, "provide secretcode"]
    },
    publicKey:{
        type : String,
        required : [true, "provide publicKey"]
    },
    encryptedPrivateKey:{
        type : String,
        required : [true, "provide encryptedPrivateKey"]
    }
    

},{
    timestamps : true
})

const UserModel = mongoose.model('User',userSchema)

module.exports = UserModel