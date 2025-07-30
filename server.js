const express = require('express');
const app = express();

app.use(express.static('client'));
const expressserver = app.listen(3030,'0.0.0.0',()=>{
    console.log('server is running on port 3030');
});

const io = require('socket.io')(expressserver);

const user = {};


io.on('connect',(socket)=>{
    console.log(`client joined with ${socket.id}`);


    socket.on('register',username=>{
        user[username] = socket.id; //user[key] = value.
        console.log(`${username} has joined with ${socket.id}`);
        io.emit('newUserArrived',user);
        console.log(user,"hello world!");
    })

    socket.on('messageFromClient',({to, message})=>{
       
        if(to){
            const clientid = user[to]; 
            if(clientid){
            io.to(clientid).emit('messageFromServer',message);
        }else{
            console.log('user not found');
            io.emit('messageFromServer',message);
        }}
        
    })
});