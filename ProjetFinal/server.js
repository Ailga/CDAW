//source : https://www.youtube.com/watch?v=MNf0piqRdHg

const express = require('express');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: { origin : "*"}
});


io.on('connection', (socket) => {
    console.log('connection');

    socket.on('sendDataToServer', (message) => {
        console.log(message);

        io.sockets.emit('sendDataToClient', message);
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
})


server.listen(3000, () => {
    console.log("Server is running");
});