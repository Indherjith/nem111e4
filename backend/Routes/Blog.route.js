const {Router} = require("express");
let jwt = require('jsonwebtoken');
const {BlogModel} = require("../models/BlogModel")

const blogController = Router();

blogController.get("/",async(req,res)=>{
    res.send( await BlogModel.find())
})

blogController.post("/create", async (req,res)=>{
    const payload = req.body;
    console.log(payload)
    const new_blog = new BlogModel(payload)
    await new_blog.save();
    try{
        res.send("blog Creation Success")
    }
    catch(e){
        res.send(e)
    }
})

blogController.delete("/delete/:_id", async (req,res)=>{
    const token = req.headers?.authorization
    jwt.verify(token,'secret',async function(err,decoded){
        if(err){
            res.send("please login")
        }
        else{
            const result = req.params;
            const data = await BlogModel.findOne(req.params);
            if(data.email===req.body.email){
                await BlogModel.deleteOne(result)
                try{
                    res.send("Item Deleted Successfully");
                }
                catch(e){
                    res.send(e);
                }
            }
            else{
                res.send("This feed is not don by you")
            }
        }
    })
    
    
})


blogController.patch("/update/:_id", async (req,res)=>{
    const result = req.params;
    const data = await BlogModel.findOne(req.params);
    if(data.email===req.body.email){
        try{
            const newFeeds = {data,...req.body};
            console.log(newFeeds);
            const updates = await BlogModel.findByIdAndUpdate(req.params, req.body, {new :true})
            res.send(updates)
        }
        catch(err){
            console.log(err)
        }
    }
    else{
        res.send("This feed is not don by you")
    }
})



module.exports = {blogController}