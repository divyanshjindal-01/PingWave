const express = require('express');
const app = express();
const http = require("http").createServer(app);

app.use(express.static('client'));

const io = require('socket.io')(http, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"]
    }
});

const PORT = process.env.PORT || 3030;
const user = {}; // { socket.id: username }
const usernameToId = {}; // { username: socket.id }

io.on('connection', (socket) => {
    console.log(`Client joined with ${socket.id}`);

    socket.on('register', username => {
        user[socket.id] = username;
        usernameToId[username] = socket.id;
        console.log(`${username} has joined with ${socket.id}`);

        io.emit('newUserArrived', Object.values(user));
        console.log(user, "hello world!");
    });

    socket.on("disconnect", () => {
        const username = user[socket.id];
        console.log("a user disconnected");
        console.log(username, "disconnected");

        delete usernameToId[username];
        delete user[socket.id];

        io.emit('newUserArrived', Object.values(user));
    });

    socket.on('messageFromClient', ({ from, to, message }) => {
        if (to) {
            const clientid = usernameToId[to]; // look up by username
            if (clientid) {
                if (from === to) {
                    const uff = "abey yrr khud ko he select kr lia";
                    io.to(clientid).emit('alert', uff);
                } else {
                    io.to(clientid).emit('messageFromServer', { message, from });
                }
            } else {
                console.log('user not found');
                io.emit('messageFromServer', message);
            }
        }
    });
});

http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
