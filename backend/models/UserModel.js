const mongoose = require("mongoose");
const userSchema = mongoose.Schema({
    email:{type:String, requires:true},
    password:{type:String, requires:true},
    mobile:{type:String, requires:true},
})
const UserModel = mongoose.model("user",userSchema)
module.exports = {UserModel}