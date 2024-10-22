const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const mongoURI = 'mongodb://localhost:27017/Newdatabase';

mongoose.connect(mongoURI)
    .then(() => console.log('MongoDB connected successfully'))
    .catch(error => console.log('MongoDB connection error:', error));
// create user Schema definition 
const signupSchema=new 
mongoose.Schema({
    name:{
type:String,
required:true,
    },
    email:{
        type:String,
 required:true,
 unique:true,
    },
    password:{
        type:String,
        required:true,  
    }
});
// create User Model 
const Signup=mongoose.model('Signup',signupSchema);
// Post Api 
app.post('/api/signup',async(req,res)=>{
    try{
    const {name,email,password}=req.body;
    // check for missing feilds 
    if(!name || !email || !password){
        return res.status(400).json({message:'All feilds are required'});
 }
 // create a new user instance 
 const newUser=new Signup({
    name,
    email,
    password
 });
 // save the user to the database 
 await newUser.save();
 res.status(201).json({message:'User created successfully',user:newUser});
    }
     catch (error){
        console.error(error);
        res.status(500).json({message:'Error creating user '});
     }
});






const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

