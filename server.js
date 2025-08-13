const express = require('express');
const app = express();
const http = require("http").createServer(app);
app.use(express.static('client'));

const io = require('socket.io')(http,{
    cors:{
        origin: "*",
        methods:["  GET","POST"]
    }
});

const PORT = process.env.PORT || 3000;
const user = {};


io.on('connect',(socket)=>{
    console.log(`client joined with ${socket.id}`);


    socket.on('register',username=>{
        user[username] = socket.id; //user[key] = value.
        console.log(`${username} has joined with ${socket.id}`);

        io.emit('newUserArrived',user);
        console.log(user,"hello world!");

        socket.on("disconnect", () => {
        console.log("a user disconnected");
    });
    })

    socket.on('messageFromClient',({from,to, message})=>{
       
        if(to){
            const clientid = user[to]; 
            if(clientid){
                if (from == to) {
                    const uff = "abey yrr khud ko he select kr lia";
                    io.to(clientid).emit('alert',uff)
                    
                }else{io.to(clientid).emit('messageFromServer',{message, from});}
        }else{
            console.log('user not found');
            io.emit('messageFromServer',message);
        }}
        
    })
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});