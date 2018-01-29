//the root of the application
const path = require('path');
const http = require('http');
const express = require('express');
const socketIO = require('socket.io');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;
//express server
var app = express();
//http server
var server = http.createServer(app);
//websocket server
var io = socketIO(server);

var visitorsCounter = 0;

//middleware
app.use(express.static(publicPath));

//let you register an event listener, the most popular event is connection
io.on('connection', (socket) => {
    visitorsCounter++;
    console.log(`new user connected, visitors so far: ${ visitorsCounter }`);

    // creating an event
    io.emit('newVisitor', visitorsCounter);

    socket.on('disconnect', (reason) => {
        console.log(reason);
    });

    socket.on('anonymousRequest', () => {
        visitorsCounter--;
        console.log(`new anonymous request, decreasing visitors counter to ${ visitorsCounter }`);

        io.emit('newAnonymous', {
            visitorsCounter: visitorsCounter,
            createdAt: new Date().getTime()
        });
    });


});

server.listen(port, () => {
    console.log(`server is up on port ${port}`);
}); 