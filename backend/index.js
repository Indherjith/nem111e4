const express = require("express");
let jwt = require('jsonwebtoken');
let cors = require("cors");
const bcrypt = require('bcrypt');
require("dotenv").config()
const PORT = process.env.PORT || 8080;

const { connection } = require("./config/db");
const { UserModel } = require("./models/UserModel");
const {authentication} = require("./middlewares/authentication");
const { todoController } = require("./Routes/Todo.route");

const app = express();
app.use(express.json());
app.use(cors());

app.get("/",(req,res)=>{
    res.send("welcome")
})

app.post("/signup",async (req,res)=>{
    let {email,password,number}=req.body;
    // console.log(email,password,age)
    bcrypt.hash(password,6).then(async function(hash){
        const user = new UserModel({email,password:hash,number})
        await user.save()
        res.send("Sign up Successfull")
    })
    .catch(()=>{
        res.send("something went wrong")
    })
})

app.post("/login",async (req,res)=>{
    let {email,password} = req.body;
    let user = await UserModel.findOne({email})
    let hash = user.password;
    bcrypt.compare(password,hash,function(err,result){
        if(result){
            var token = jwt.sign({email:email},'secret');
            console.log(token);
            res.send({"user":req.body.email,"token":token})
        }
        else{
            res.send("Login failed, invalid credentials")
        }
    })
})

app.use("/todos",authentication,todoController)


app.listen(PORT,async ()=>{
    try{
        await connection
        console.log("connected to DB successfully")
    }
    catch(err){
        console.log("err connection to db")
        console.log(err)
    }
    console.log(`listing on PORT ${PORT}`)
})