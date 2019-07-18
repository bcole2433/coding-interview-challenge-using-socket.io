import React, { Component } from 'react';
import "./App.css";
import AddItemForm from "./Components/AddItemForm";
import TaskTable from "./Components/TaskTable";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      tasks: [],
    };
  }

  componentDidMount() {
    //LISTENERS

    //TODO:receive initial DB tasks when connecting for first time
    //TODO:receiving new tasks from socket
    //TODO:receive deleted task from socket using task index
    //TODO:receive completed task from socket
    //TODO:receive all completed tasks from socket when all are completed
    //TODO:delete all tasks from socket when a client deletes all completed task
};

//ACTIONS
  handleChange = e => {
    e.preventDefault();
  };

  //submitting new task and emitting it to clients
  submitTask = e => {
    e.preventDefault();
  };

  handleComplete = taskID => {
    //handle when a user marks task as complete
    //send to server to update on all clients
  };

  markAllComplete = () => {
    //handle when a user marks all tasks as complete
    //send to server to update on all clients
  };

  handleDelete = taskID => {
    //handle when a user deletes a single task
    //send to server to update on all clients
  };

  deleteAllTasks = () => {
    //handle when a user deletes all tasks
    //send to server to delete on all clients
  };

  render() {
    return (
      <React.Fragment>
        <h2>PadPiper Team Tasks</h2>
        <AddItemForm
          title={this.state.title}
          // handleChange={this.handleChange}
          // handleTaskAdd={this.submitTask}
        />
        <br />
        <TaskTable 
        tasks={this.state.tasks}
        // handleComplete={this.handleComplete}
        // markAllComplete={this.markAllComplete}
        // handleDelete={this.handleDelete}
        // deleteAll={this.deleteAllTasks} 
        />
      </React.Fragment>
    );
  }
}

export default App;