const mongoose = require("mongoose")
const blogSchema = new mongoose.Schema({
    Title:String,
    Category:{type:String,enum:["Career","Finance","Travel","Sports"]},
    Author:String,
    Content:String,
    Image:String,
    email:String
})

const BlogModel = mongoose.model("blog",blogSchema)
module.exports={BlogModel}