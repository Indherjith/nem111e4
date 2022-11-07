const {Router} = require("express");
let jwt = require('jsonwebtoken');
const {TodoModel} = require("../models/TodoModel")

const todoController = Router();

todoController.get("/",async(req,res)=>{
    res.send( await TodoModel.find())
})

todoController.post("/create", async (req,res)=>{
    const payload = req.body;
    console.log(payload)
    const new_todo = new TodoModel(payload)
    await new_todo.save();
    try{
        res.send("Todo Creation Success")
    }
    catch(e){
        res.send(e)
    }
})

todoController.delete("/delete/:_id", async (req,res)=>{
    const token = req.headers?.authorization
    jwt.verify(token,'secret',async function(err,decoded){
        if(err){
            res.send("please login")
        }
        else{
            const result = req.params;
            const data = await TodoModel.findOne(req.params);
            if(data.email===req.body.email){
                await TodoModel.deleteOne(result)
                try{
                    res.send("Todo Deleted Successfully");
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


todoController.patch("/update/:_id", async (req,res)=>{
    const result = req.params;
    const data = await TodoModel.findOne(req.params);
    if(data.email===req.body.email){
        try{
            const newFeeds = {data,...req.body};
            console.log(newFeeds);
            const updates = await TodoModel.findByIdAndUpdate(req.params, req.body, {new :true})
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



module.exports = {todoController}