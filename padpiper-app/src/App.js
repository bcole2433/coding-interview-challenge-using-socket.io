import React, { Component } from 'react';
import "./App.css";
import { Container, Row, Col } from 'react-bootstrap';
import AddItemForm from "./Components/AddItemForm";
import TaskTable from "./Components/TaskTable";
import CompletedTable from "./Components/CompletedTable";
import socketIOClient from "socket.io-client";
const socket = socketIOClient("http://localhost:3003/");

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tasks: [],
      completed: [],
    };
  }

  componentDidMount() {
    //LISTENERS

    //TODO:receive initial DB tasks when connecting for first time
    // socket.on("LOAD", data => this.setState({
    //   tasks: [...this.state.tasks, data]
    // }));


    //receiving new tasks from socket
    socket.on("RECEIVE_NEW_TASK", data => this.setState({
      tasks: [...this.state.tasks, data.title]
    }));

    //TODO:receive deleted task from socket using task index

    //TODO:receive completed task from socket

    //TODO:receive all completed tasks from socket when all are completed

    //TODO:delete all tasks from socket when a client deletes all completed task
};

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
    console.log(title);
    this.setState({ tasks: [...this.state.tasks, title] });

    socket.emit("MAKE", title);

    //resetting the form manually
    this.setState({
      title: ""
    });
  };

  handleComplete = (taskID) => {
    //handle when a user marks task as complete

    const completedTask = this.state.tasks.filter(task => task === taskID);
    const filteredTaskList = this.state.tasks.filter(task => task !== taskID);
      console.log(completedTask)
      this.setState({
        completed: [...this.state.completed, completedTask],
      })
      this.setState({
        tasks: [...filteredTaskList],
      })

    //send to server to update on all clients
  };

  markAllComplete = () => {
    //handle when a user marks all tasks as complete
    const tasks = [ ...this.state.tasks];
    this.setState({completed: [...this.state.completed, ...tasks]})
    console.log(this.state.completed)
    this.setState({tasks: []})
    console.log(this.state.tasks)

    //send to server to update on all clients
  };

  handleDelete = (taskID) => {
    //handle when a user deletes a single task
      const filteredTasks = this.state.tasks.filter(task => task !== taskID);
      console.log("Deleted" + taskID)
      this.setState({
        tasks: filteredTasks,
      })
    //send to server to update on all clients
  };

  deleteAllTasks = () => {
    //handle when a user deletes all tasks
    //send to server to delete on all clients
    this.setState({tasks: []})
    console.log(this.state.tasks)
  };

  render() {
    return (
      <React.Fragment>
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
        deleteAll={this.deleteAllTasks} 
        /> 
          </Col>
          <Col className="taskCard">
          <CompletedTable 
          completedList={this.state.completed}
        />
          </Col>
          </Row>
        </Container>
        
        
      </React.Fragment>
    );
  }
}

export default App;