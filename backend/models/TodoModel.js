const mongoose = require("mongoose")
const TodoSchema = new mongoose.Schema({
    taskname:String,
    status:{type:String,enum:["pending","done"]},
    tag:{type:String,enum:["personal","official","family"]},
    email:String
})

const TodoModel = mongoose.model("todo",TodoSchema)
module.exports={TodoModel}