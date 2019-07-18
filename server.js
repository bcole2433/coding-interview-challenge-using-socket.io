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
  const reloadTasks = () => {
    io.emit('LOAD', DB);
  }

  // Accepts when a client makes a new todo
  client.on('MAKE', (t) => {
    // Make a new todo
    const newTask = new Task(title=t.title);

    // Push this newly created todo to our database
    DB.push(newTask);

    // Send the latest todos to the client
    // FIXME: This sends all todos every time, could this be more efficient?
    // reloadTodos();
  });

  // Send the DB downstream on connect
  // reloadTodos();
});

console.log('Waiting for clients to connect');
server.listen(3003);
