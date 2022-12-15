//source : https://www.youtube.com/watch?v=MNf0piqRdHg

const express = require('express');

const app = express();

const server = require('http').createServer(app);

const io = require('socket.io')(server, {
    cors: { origin : "*"}
});


io.on('connection', (socket) => {
    console.log('connection et socket ID = ' + socket.id);

    socket.on('sendDataToOpponent', (message) => {
        console.log(message);
        message.sourceSocketID = socket.id;
        if(message.type == "playerFound"){
            console.log("envoi à l'ID spécifique");
            socket.broadcast.to(message.content.opponent.IDsocket).emit('sendDataToPlayer', message);
        }else{
            console.log("envoi à tous");
            socket.broadcast.emit('sendDataToPlayer', message);
        }
    });


    socket.on('disconnect', (socket) => {
        console.log('Disconnect');
    });
})


server.listen(3000, () => {
    console.log("Server is running");
});