const socket = io('http://localhost:3030/');
let objectofuser;
const send = document.getElementById('send-btn'); //button to send messages.
const AllMessages = document.getElementById('AllMessages'); //a div where all message display.
let receiptant = null; // the selected user which receives messages.
let title = document.getElementById('nameOfuser');

const username = prompt("Enter your name"); //enter your username

//title of webpage should be the name of user.
title.innerHTML = username;

// send username to server who connect.
socket.emit('register', username);

//object of all users [userid: username].
socket.on('newUserArrived', user => {
objectofuser = user;
//selected ul from html.
    const membersList = document.querySelector('#userlist');
    userlist.innerHTML = "";

    Object.keys(user).forEach(IDofUser => {

//create list of every single user.
        const member = document.createElement('li');
        member.classList.add('newmember');

//list by names of user.
        member.innerHTML = user[IDofUser];
        member.dataset.username = IDofUser;

//Add receiptant who receives messages.
        member.addEventListener('click', () => {
            receiptant = member.dataset.username;
            console.log("Recipient selected:", receiptant);
// receiptant had been selected now show the receiptant
            document.getElementById('selected-recipient').innerHTML = `Sending message to: ${objectofuser[receiptant]}`;
        });

//added member to memberlist.
        membersList.appendChild(member);
    });
});

//event on send btn to display own message on all message 
send.addEventListener('click', (e) => {
    e.preventDefault();
    const newmessage = document.getElementById('message').value.trim();
    document.getElementById('message').value = "";
    const messageElement = document.createElement('p');
    messageElement.innerText = newmessage; 
    //selected green colour for own message.
    messageElement.style.color = 'green';
    AllMessages.appendChild(messageElement);

// ensure message and receiptant are not empty.
    if(!newmessage || !receiptant){
        alert("please select a receiver and enter a message"); 
        return;
    }else{
        socket.emit('messageFromClient', {from:username,to:receiptant,message:newmessage});
    }
});
    socket.on('messageFromServer',({message, from})=>{
        
        AllMessages.innerHTML += `<li style="position: relative;">
            ${message} 
            <span style="float: right; font-size: 0.9em; color: gray;">  from ${from}</span>
        </li>`;
    });
    socket.on('alert',(uff)=>{
        alert(uff);
    })
    
socket.on("disconnectedUser",(socketid)=>{
    document.getElementById('removedUser').innerHTML+= `<li>${objectofuser[socketid]}</li>`;
})