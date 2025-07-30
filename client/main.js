const socket = io('http://192.168.1.2:3030');

const send = document.getElementById('send-btn'); //button to send messages.
const AllMessages = document.getElementById('AllMessages'); //a div where all message display.
let receiptant = null;; // the selected user which receives messages.
let title = document.getElementById('nameOfuser');

const username = prompt("Enter your name"); //enter your username
title.innerHTML = username;
socket.emit('register', username); // a event named register send username to server.

socket.on('newUserArrived', user => {
    const membersList = document.querySelector('#userlist'); // ul to show li of users.
    userlist.innerHTML = "";

    Object.keys(user).forEach(usernames => {
        const member = document.createElement('li');
        member.classList.add('newmember');        member.innerHTML = usernames;
        member.dataset.username = usernames;
        member.addEventListener('click', () => {
            receiptant = member.dataset.username;
            console.log("Recipient selected:", receiptant);
        });

        membersList.appendChild(member);
    });
});

send.addEventListener('click', (e) => {
    e.preventDefault();
    const newmessage = document.getElementById('message').value.trim();
    document.getElementById('message').value = "";

    if(!newmessage || !receiptant){
        alert("please select a rec and enter a message"); 
        return;
    }
    socket.emit('messageFromClient', {to:receiptant,message: newmessage});
});
    socket.on('messageFromServer',message=>{
        AllMessages.innerHTML += `<li> ${message} </li>`
    });



