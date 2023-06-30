//jshint esversion:6
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const ejs = require('ejs')
const User = require('./model')
const mongoose = require('mongoose')
const ecrypt = require('mongoose-encryption'); 
const bcrypt = require('bcrypt')
const saltRounds = 5
app.use(bodyParser.urlencoded({extended:true}))
app.set('view engine', 'ejs')
app.use(express.static('public'))

connectDb()
//get routes 
app.get("/",(req,res)=>{
    res.render('home')
})

app.get("/login",(req,res)=>{
    res.render('login')
})
app.get("/register",(req,res)=>{
    res.render('register')
})
//post routes 
app.post("/register", async (req, res)=>{
    let username = req.body.username
    let password = req.body.password
    let hashedPass = await bcrypt.hash(password, saltRounds, (err, hash)=>{
       if(err){
        console.log(err)}
        else{
            console.log("From register:post\n" + username+"\n"+hash)
            addUser(username, hash).then(res.render('secrets'))
        }
    })
   
    
})

app.post("/login",async (req, res)=>{
    let username = req.body.username
    let password = req.body.password
   
    let foundUser = await findUser(username)
    bcrypt.compare(password, foundUser.password, (err, result)=>{
        if(err){
            console.log(err)
        } else{
            if(result){
                console.log("passwords match")
                res.render('secrets')
            } else{
                console.log("Password is incorrect")
            }
        }
    })
    
})



app.listen("3000", ()=>{
    console.log("Server started on port 3000")
})

async function connectDb(){
    await mongoose.connect('mongodb://127.0.0.1:27017/usersDB')
    .then(()=>{
        console.log("Connected to mongoose successfully")
    }).catch((err)=>{
        console.log(err)
    })
}

async function addUser(username, password){
    let newUser = new User ({
        userName: username, 
        password:password
    })
    await newUser.save()
    .then(()=>{
        console.log("User has been saved successfully")
    }).catch((err)=>{
        console.log("Something went horribly wrong")
        console.log(err)
    })
}

async function findUser(username){
    let foundUser = await User.findOne({userName:username})
    return foundUser
}
