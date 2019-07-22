import React, { Component } from "react";
import "./App.css";
import { Container, Row, Col } from "react-bootstrap";
import Nav from "./Components/Nav";
import AddItemForm from "./Components/AddItemForm";
import TaskTable from "./Components/TaskTable";
import CompletedTable from "./Components/CompletedTable";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3003/");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      completed: []
    };
  }

  componentDidMount() {
    //LISTENERS

    socket.on("LOAD", data => {
    //Checking if content is cached or not
    //If yes, empty tasks and/or completed
    //If no, receive initial DB tasks when connecting for first time
    if (this.state.tasks.length > 0) {
      //empty tasks and completed and reload data
      console.log('task list was filled');
      this.setState({
        tasks: []
      });
    };

    if (this.state.completed.length > 0) {
      //empty tasks and completed and reload data
      console.log('completed list was filled')
      this.setState({
        completed: []
      });
    };
      //mapping data
      const taskArr = data.map(item => {
        return item.title;
      });

      this.setState({
        tasks: [...this.state.tasks, ...taskArr]
      });
    });

    //Receive previously completed DB tasks when connecting for first time
    socket.on("LOAD_COMPLETED", data => {
      const completedArr = data.map(item => {
        return item.title;
      });

      this.setState({
        completed: [...this.state.completed, ...completedArr]
      });
    });

    //receiving new tasks from socket
    socket.on("RECEIVE_NEW_TASK", data =>
      this.setState({
        tasks: [...this.state.tasks, data]
      })
    );

    //receive completed task from socket
    socket.on("RECEIVE_COMPLETED_TASK", data => {
      this.setState({
        completed: [...this.state.completed, data],
        tasks: this.state.tasks.filter(task => task !== data[0])
      });
    });

    //Receive all completed tasks from socket when all are completed
    socket.on("RECEIVE_COMPLETE_ALL", data => {
      const tasks = [...this.state.tasks];
      this.setState({
        completed: [...this.state.completed, ...tasks],
        tasks: []
      });
    });

    //Receive deleted task from socket using task index
    socket.on("RECEIVE_DELETED_TASK", data => {
      console.log("Delete Data: " + data);
      const filteredTasks = this.state.tasks.filter(task => task !== data);
      this.setState({
        tasks: filteredTasks
      });
    });

    //Delete all tasks from socket when a client deletes all completed task
    socket.on("RECEIVE_DELETED_ALL", data =>
      this.setState({
        tasks: [],
        completed: []
      })
    );
  }

  //ACTIONS
  handleChange = e => {
    e.preventDefault();
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({ [name]: value });
  };

  //submitting new task and emitting it to clients
  submitTask = e => {
    e.preventDefault();
    const title = this.state.title;
    this.setState({ tasks: [...this.state.tasks, title] });

    socket.emit("MAKE", title);

    //resetting the form manually
    this.setState({
      title: ""
    });
  };

  handleComplete = taskID => {
    //handle when a user marks task as complete
    const completedTask = this.state.tasks.filter(task => task === taskID);
    const filteredTaskList = this.state.tasks.filter(task => task !== taskID);
    console.log(completedTask);
    this.setState({
      completed: [...this.state.completed, completedTask],
      tasks: [...filteredTaskList]
    });

    //send to server to update on all clients
    socket.emit("COMPLETE", completedTask);
  };

  markAllComplete = () => {
    //handle when a user marks all tasks as complete
    const tasks = [...this.state.tasks];
    this.setState({
      completed: [...this.state.completed, ...tasks],
      tasks: []
    });

    //send to server to update on all clients
    socket.emit("COMPLETE_ALL", []);
  };

  handleDelete = taskID => {
    //handle when a user deletes a single task
    const filteredTasks = this.state.tasks.filter(task => task !== taskID);
    this.setState({
      tasks: filteredTasks
    });
    //send to server to update on all clients
    socket.emit("DELETE", taskID);
  };

  deleteAllTasks = () => {
    //handle when a user deletes all tasks
    this.setState({
      tasks: [],
      completed: []
    });
    //send to server to delete on all clients
    socket.emit("DELETE_ALL", []);
  };

  render() {
    return (
      <React.Fragment>
        <Nav />
        <Container>
          <br />
          <h2>PadPiper Team Tasks</h2>
          <AddItemForm
            title={this.state.title}
            handleChange={this.handleChange}
            handleTaskAdd={this.submitTask}
          />
          <Container fluid="true">
            <Row>
              <Col className="taskCard">
                <TaskTable
                  tasks={this.state.tasks}
                  handleComplete={this.handleComplete}
                  markAllComplete={this.markAllComplete}
                  handleDelete={this.handleDelete}
                  deleteAllTasks={this.deleteAllTasks}
                />
              </Col>
              <Col className="taskCard">
                <CompletedTable completedList={this.state.completed} />
              </Col>
            </Row>
          </Container>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
