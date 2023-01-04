require('dotenv').config();
const path=require('path');
const express=require('express');
const publicPath=path.join(__dirname,'/../public');
const port=process.env.PORT || 3000
const http=require('http');
const socket=require('socket.io');
const mongoose=require('mongoose');
let app=express();
const db=require('./mongodb')
const model=require('../schema')

db();
app.set('views', path.join(__dirname, '../views'))
app.set('view engine', 'ejs')
app.use(express.urlencoded({extended:false}))
app.get('/', function(req, res){
  

    res.render('register')
})
app.get('/login', function(req, res){
  

    res.render('login')
})
app.get('/register',function(req,res){
    res.render('register')
}
)

app.post('/register',async(req,res)=>{
    const data={
        login:req.body.login,
        haslo:req.body.haslo
    }
    await model.insertMany([data])
    res.render('login')
})

app.post('/login',async(req,res)=>{
    try{
        const check=await model.findOne({login:req.body.login})
        console.log(check.haslo)
        console.log(req.body)
        if(check.haslo===req.body.password){
            res.render('index')
        }
        else{
            res.send("zle haslo")
        }}
        catch{
            res.send("blond")
        }
    
})


mongoose.connection.once('open',()=>{
    console.log(`baza`);
});
app.listen(port,()=>{
    console.log(`server up port ${port}`);
});
