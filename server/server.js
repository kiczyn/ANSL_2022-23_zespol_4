require('dotenv').config();
const path=require('path');
const express=require('express');
const port=process.env.PORT || 3000


const mongoose=require('mongoose');
let app=express();
const db=require('./mongodb')
const model=require('../schema');
const karta=require('../karty');
const { randomInt } = require('crypto');
const model2 = require('../karty');
const http = require('http').Server(app);
const socket=require('socket.io')(http);
db();
app.use(express.static('public')); //  do moich chujów cssów i innych javascriptów
app.set('views', path.join(__dirname, '../views'))
app.use(express.static(__dirname +"/views/assets"));
app.set('view engine', 'ejs')
app.use(express.static(__dirname ));
app.use(express.urlencoded({extended:false}))


app.get('/', function(req, res){
  

    res.render('login')
})
app.get('/login', function(req, res){
  

    res.render('login')
})

app.get('/karta',function(req, res){
  

    res.render('karta')
})
app.get('/register',function(req,res){
    res.render('register')
}

)
var pokoj=[];
var aktywne=[];
var karta1337=[];
socket.on('connection', function(io) {
 
    console.log('A user connected');
    console.log(io.id)
    io.on('room2',function(){
            io.join(aktywne[aktywne.length-1]);
            io.emit('room2',aktywne[aktywne.length-1]);
    })
    io.on('find',function(){
 
        if (pokoj.length!=0){
            io.join(pokoj[0])
            io.emit('room',pokoj[0]);
            socket.to(pokoj[0]).emit('play');
            aktywne.push(pokoj.shift());
            console.log(aktywne)
            
            
        }
        else{
            io.join(io.id+" room")
            
            pokoj.push(io.id+" room")
            io.emit('room',pokoj[0]);
        }
    })
    io.emit('login',zalogowani[zalogowani.length-1])
    io.on('login',function(){
        
        zalogid.push(io.id);
         for(var i=0;i<zalogowani.length-1;i++){
            if(zalogowani[i]==zalogowani[zalogowani.length-1]){
                zalogowani.splice(i,1)
                zalogid.splice(i,1);
            }
         }
        console.log(zalogid)
        console.log(zalogowani)
        
    })

    io.on('dej',function(){
        model2.count().exec(function (err, count) {

    
            var random = Math.floor(Math.random() * count)
          
            
            model2.findOne().skip(random)
            .exec(
              function (err, result) {
                io.emit('wynik',result.koszt,result.atak,result.zycie,result.link)
                
                
                
              })
          })
    })
    
    io.on('dane',(id,atak,koszt,zycie,link,karty,bool)=>{
        
        console.log(id,atak,koszt,zycie,link,karty,bool)
        io.in(id).emit('enm_card', atak,koszt,zycie,link,karty,bool);



    })
    io.on('zycie',(id,zyc,karty_1)=>{
        io.in(id).emit('zycie',zyc,karty_1);
    })
    io.on('battle',(id,atak)=>{
        console.log("zycie"+atak);
        io.in(id).emit('battle2',atak);
    })
    io.on('koniec',(id)=>{
        socket.in(id).emit('koniec');
    })
    io.on('logout',function(){
        for(var i=0;i<=zalogid.length;i++){
            if(zalogid[i]==io.id){
                zalogid.splice(i,1);
                zalogowani.splice(i,1);
                console.log(zalogid)
                console.log(zalogowani)
            }
        }
    })

})


var zalogid=[];

app.post('/register',async(req,res)=>{
    const data={
        login:req.body.login,
        haslo:req.body.haslo
    }
    if(!await model.findOne({login:req.body.login})){
        await model.insertMany([data])
        res.render('login')
    }else
    {
        res.send("uzytkownik juz istnieje!")
    }
   
})

app.post('/dodaj',async(req,res)=>{
 
    const nowa_karta={
        atak:req.body.atak,
        zycie:req.body.zycie,
        link:req.body.link,
        koszt:req.body.koszt
    }

    await model2.insertMany([nowa_karta])
    res.render('karta')
})


app.post('/play',async(req,res)=>{
    res.render('play')
})

app.post('/end',async(req,res)=>{
    res.render('index')
})
var zalogowani=[]
app.post('/login',async(req,res)=>{
    try{
        const check=await model.findOne({login:req.body.login})
        console.log(check.haslo)
        console.log(req.body)
        if(check.haslo===req.body.haslo){
            res.render('index')
            zalogowani.push(check.login)
            
        }
        else{
            res.send("zle haslo")
        }}
        catch{
            res.send("blond")
        }
    
})

app.post('/wyloguj',async(req,res)=>{

    res.render('login')
    
})



mongoose.connection.once('open',()=>{
    console.log(`baza`);
});
http.listen(port,()=>{
    console.log(`server up port ${port}`);
});
