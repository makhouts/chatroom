const express = require('express');
const http = require('http');


const app = express();
const clientPath = `${__dirname}/../client`;
app.use(express.static(clientPath));
const server = http.createServer(app);
const guests = [];

server.listen(8080, () =>{
    console.log("server running on "+8080);
 });

 const io = require('socket.io')(server);
 let counter = 0



 io.on('connection', (socket) => {
    counter++;
    console.log(counter+' someone connected');
    socket.on('sendToAll', (messageObj) =>{
        io.emit("displayMessage", (messageObj));
    });
    socket.on('sendUserName', (username) => {
        guests.push(username);
        io.emit('displayUsername', (guests));
        console.log(guests); 
    })
}); 

io.on('connection', (socket) => {
    counter++;
    console.log(counter+' someone connected');
    socket.on('sendToMe', (message) =>{
        socket.emit("displayMessage", (message));
    });
});