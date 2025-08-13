const express = require('express');
const app = express();

const http = require("http").createServer(app);
app.use(express.static('client'));

const io = require('socket.io')(http,{
    cors:{
        origin: "*",
        methods:["GET","POST"]
    }
});

const PORT = process.env.PORT || 3030;
const user = {};


io.on('connection',(socket)=>{
    console.log(`client joined with ${socket.id}`);

//when a new user register its username 
    socket.on('register',username=>{
        user[socket.id] = username; // user[key] = value.
        console.log(`${username} has joined with ${socket.id}`);

// inform everyone when a new user arrives.
        io.emit('newUserArrived',user);

//>>>>>>>>>>>>>>>>>>>>  i'was here >>>>>>>>>>>>>>>>>>//
        socket.on("disconnect", () => {
        console.log("a user disconnected");
        console.log(user[socket.id], "disconnected");
        io.emit('disconnectedUser',socket.id);
        delete user[socket.id];
        io.emit('newUserArrived',Object.values(user));

    });
    })
//>>>>>>>>>>>>>>>>>>>>  i'was here >>>>>>>>>>>>>>>>>>//


    socket.on('messageFromClient',({from,to, message})=>{

//check the receiptant exists.
        if(to){

// put value of receiptant in clientid ; 
            const clientid = to; 
                if (from == to) {
                    const uff = "abey yrr khud ko he select kr lia";
                    io.to(clientid).emit('alert',uff);
                    return; 

                }else{io.to(clientid).emit('messageFromServer',{message, from});}
        }else{
            console.log('user not found');
            const uff = "kisko bhejna h bhai wo to select kr";
            io.emit('alert',uff);
        }}
        
    )
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});