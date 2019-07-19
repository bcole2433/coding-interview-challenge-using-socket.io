const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const firstTasks = require("./data");
const Task = require("./task");

const port = process.env.PORT || 3003;

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

io.on('connection', (client) => {
  console.log("New Client Connected: " + client.id);
  const DB = firstTasks.map((t) => {
    // Form new Task objects
    return new Task(title=t.title);
  });

  // Sends a message to the client to reload all todos
  const loadTasks = () => {
    client.emit('LOAD', DB);
  }
    // Send the DB downstream on connect
    loadTasks();

  // Accepts when a client makes a new todo
  //and sends only the newly submitted task
  client.on("MAKE", data => {
        
    // Make a new task
      const newTask = new Task(title=data);

      // Push this newly created todo to our database
      DB.push(newTask);
      console.log(DB);

  //using broadcast to avoid sending same data back
  client.broadcast.emit("RECEIVE_NEW_TASK", data);
});

client.on("COMPLETE", data => {

//using broadcast to avoid sending same data back
client.broadcast.emit("RECEIVE_COMPLETED_TASK", data);
});

client.on("COMPLETE_ALL", data => {
//using broadcast to avoid sending same data back
client.broadcast.emit("RECEIVE_COMPLETE_ALL", []);
});

client.on("DELETE", data => {

//using broadcast to avoid sending same data back
client.broadcast.emit("RECEIVE_DELETED_TASK", data);
});

client.on("DELETE_ALL", data => {

//using broadcast to avoid sending same data back
client.broadcast.emit("RECEIVE_DELETED_ALL", []);
});

  //listening for when a client disconnects
  client.on("disconnect", () => console.log("Client has disconnected"));
});

console.log('Waiting for clients to connect');
server.listen(port, () => console.log(`Listening on port ${port}`));
