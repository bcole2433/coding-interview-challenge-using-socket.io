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
  // This is going to be our fake 'database' for this application
  // Parse all default Todo's from db

  // FIXME: DB is reloading on client refresh. It should be persistent on new client
  // connections from the last time the server was run...
  const DB = firstTasks.map((t) => {
    // Form new Task objects
    return new Task(title=t.title);
  });

  // Sends a message to the client to reload all todos
  const loadTasks = () => {
    io.emit('LOAD', DB);
  }

  // Accepts when a client makes a new todo
  //and sends only the newly submitted task
  client.on("MAKE", data => {
        
    // Make a new task
      const newTask = new Task(data.title);

      // Push this newly created todo to our database
      DB.push(newTask);
      console.log(data)
      console.log(data.title)
      console.log(DB)

  //using broadcast to avoid sending same data back
  client.broadcast.emit("RECEIVE_NEW_TASK", data);
});

  // Send the DB downstream on connect
  loadTasks();

  //listening for when a client disconnects
  client.on("disconnect", () => console.log("Client has disconnected"));
});

console.log('Waiting for clients to connect');
server.listen(port, () => console.log(`Listening on port ${port}`));
