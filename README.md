# PingWave

PingWave is a lightweight, real-time chat application built using **Node.js**, **Express**, and **Socket.IO**. It allows users to register with a username, view active users, select a recipient, and send direct messages in real-time through a clean, browser-based interface.

---

## 🔧 Features

- Real-time user connection and registration
- Dynamic user list updates
- Private messaging by selecting a recipient
- Simple and clean HTML/CSS-based frontend
- Built with Socket.IO for instant communication

---

## 📂 Project Structure

PingWave/
│
├── client/
│ ├── index.html # Main frontend page
│ ├── main.js # Frontend logic using Socket.IO
│ └── style.css # for styling
│
├── server.js # Express + Socket.IO server
└── README.md # Project documentation

📌 Notes
Ensure devices are connected to the same network (for LAN testing).

Default server IP in main.js is hardcoded: http://[your laptop IP4]:3030.
🔁 Change it to localhost or your current IP if testing on different setups.

