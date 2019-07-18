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
    socket.on("LOAD", data => {
    const dataArr = data.map((item) => {
      return item.title;
    });
    this.setState({
      tasks: [...this.state.tasks, ...dataArr]
    })});


    //receiving new tasks from socket
    socket.on("RECEIVE_NEW_TASK", data => this.setState({
      tasks: [...this.state.tasks, data]
    }));

    
      //TODO:receive completed task from socket
    socket.on("RECEIVE_COMPLETED_TASK", data => {
      this.handleComplete(data);
    }
    // this.setState({
    //   completed: [...this.state.completed, data]
    // })
    );

    //TODO:receive all completed tasks from socket when all are completed
         socket.on("RECEIVE_COMPLETE_ALL", data => this.setState({
          tasks: [...this.state.completed, data]
        }));

    //TODO:receive deleted task from socket using task index
    socket.on("RECEIVE_DELETED_TASK", data => {
      console.log("Delete Data: " + data)
    this.handleDelete(data);
  });

    //TODO:delete all tasks from socket when a client deletes all completed task
    socket.on("RECEIVE_DELETED_ALL", data => 
    this.setState({
      tasks: [],
      completed: [],
    }));
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
      console.log(completedTask);
      this.setState({
        completed: [...this.state.completed, completedTask],
      });
      this.setState({
        tasks: [...filteredTaskList],
      });

    //send to server to update on all clients
    socket.emit("COMPLETE", completedTask);
  };

  markAllComplete = () => {
    //handle when a user marks all tasks as complete
    const tasks = [ ...this.state.tasks];
    this.setState({completed: [...this.state.completed, ...tasks]});
    console.log(this.state.completed);
    this.setState({tasks: []});
    console.log(this.state.tasks);

    //send to server to update on all clients
    socket.emit("MAKE", 'Complete All Tapped');

  };

  handleDelete = (taskID) => {
    //handle when a user deletes a single task
      const filteredTasks = this.state.tasks.filter(task => task !== taskID);
      this.setState({
        tasks: filteredTasks,
      });
    //send to server to update on all clients
    socket.emit("DELETE", taskID);
    console.log("Deleted" + taskID);
  };

  deleteAllTasks = () => {
    //handle when a user deletes all tasks
    //send to server to delete on all clients
    this.setState({tasks: []});
    console.log(this.state.tasks);

    socket.emit("DELETE_ALL", []);
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