import React, { useState, useEffect } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "./Components/Nav";
import AddItemForm from "./Components/AddItemForm";
import TaskTable from "./Components/TaskTable";
import CompletedTable from "./Components/CompletedTable";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3003/");

const App = () => {
  let [title, setTitle] = useState('');
  let [tasks, setTasks] = useState([]);
  let [completed, setCompleted] = useState([]);
    //LISTENERS
    socket.on("LOAD", data => {
      //Checking if content is cached or not
      //If yes, empty tasks and/or completed
      //If no, receive initial DB tasks when connecting for first time
      if (tasks.length > 0) {
        console.log("task list was filled");
        setTasks([]);
      }

      if (completed.length > 0) {
        console.log("completed list was filled");
        setCompleted([]);
      }

      //mapping data
      const taskArr = data.map(item => {
        return item.title;
      });
      setTasks([...tasks, ...taskArr]);
    });
    
    //Receive previously completed DB tasks when connecting for first time
    socket.on("LOAD_COMPLETED", data => {
      const completedArr = data.map(item => {
        return item.title;
      });

      setCompleted([...completed, ...completedArr]);
    });

    //using react hook useEffect to (re)render only if state changes
  useEffect(() => {
    //receiving new tasks from socket
    socket.on("RECEIVE_NEW_TASK", data => {
      setTasks([...tasks, data]);
    });

    //receive completed task from socket
    socket.on("RECEIVE_COMPLETED_TASK", data => {
      setCompleted([...completed, data]);
      setTasks([...tasks.filter(task => task !== data)]);
    });

    //Receive all completed tasks from socket when all are completed
    socket.on("RECEIVE_COMPLETE_ALL", data => {
      const nTasks = [...tasks];
      setCompleted([...completed, ...nTasks]);
      setTasks([]);
    });

    //Receive deleted task from socket using task index
    socket.on("RECEIVE_DELETED_TASK", data => {
      console.log("Delete Data: " + data);
      const filteredTasks = tasks.filter(task => task !== data);
      setTasks(filteredTasks);
    });

    //Delete all tasks from socket when a client deletes all completed task
    socket.on("RECEIVE_DELETED_ALL", data => {
      setTasks([]);
      setCompleted([]);
    });
  }, [completed, tasks]);

  //ACTIONS
  const handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const value = target.value;
    setTitle(value);
  };

  //submitting new task and emitting it to clients
  const submitTask = e => {
    e.preventDefault();
    const nTitle = e.target.value;
    setTasks([...tasks, nTitle]);
    console.log(tasks)

    socket.emit("MAKE", nTitle);

    //resetting the form manually
    setTitle('');
  };

  const handleComplete = taskID => {
    //handle when a user marks task as complete
    const completedTask = tasks.filter(task => task === taskID);
    const filteredTaskList = tasks.filter(task => task !== taskID);

    //send to server to update on all clients
    socket.emit("COMPLETE", completedTask[0]);

    setCompleted([...completed, completedTask]);
    setTasks([...filteredTaskList]);
    console.log(tasks);
    console.log(completed);
  };

  const markAllComplete = () => {
    //handle when a user marks all tasks as complete

    const nTasks = [...tasks];
    setCompleted([...completed, ...nTasks]);
    setTasks([]);

    //send to server to update on all clients
    socket.emit("COMPLETE_ALL", []);
  };

  const handleDelete = taskID => {
    //handle when a user deletes a single task
    const filteredTasks = tasks.filter(task => task !== taskID);
    setTasks(filteredTasks);

    //send to server to update on all clients
    socket.emit("DELETE", taskID);
  };

  const deleteAllTasks = () => {
    //handle when a user deletes all tasks
    setCompleted([]);
    setTasks([]);

    //send to server to delete on all clients
    socket.emit("DELETE_ALL", []);
  };

  return (
    <React.Fragment>
      <Nav />
      <Container>
        <br />
        <h2>PadPiper Team Tasks</h2>
        <AddItemForm
          title={title}
          handleChange={handleChange}
          handleTaskAdd={submitTask}
        />
        <Container >
          <Row>
            <Col className="taskCard" lg >
              <TaskTable
                tasks={tasks}
                handleComplete={handleComplete}
                markAllComplete={markAllComplete}
                handleDelete={handleDelete}
                deleteAllTasks={deleteAllTasks}
              />
            </Col>
            <Col className="taskCard" lg>
              <CompletedTable completedList={completed} />
            </Col>
          </Row>
        </Container>
      </Container>
    </React.Fragment>
  );
};

export default App;