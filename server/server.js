const path=require('path');
const express=require('express');
const publicPath=path.join(__dirname,'/../public');
const port=process.env.PORT || 3000
const http=require('http');
const socket=require('socket.io');

let app=express();
let server=http.createServer(app);
app.use(express.static(publicPath));
let io=socket(server);


server.listen(port,()=>{
    console.log(`server up port ${port}`);
});
