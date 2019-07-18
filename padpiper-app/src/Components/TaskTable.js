import React, { Component } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";

class TaskTable extends Component {
  render() {
    if (!this.props.tasks) {
      return null;
    }
    return (
      <Container fluid="true">
      <label>
          <h4>Tasks</h4>
        </label>
        &nbsp;
        <Button
            size="sm"
            variant="outline-primary"
            onClick={() => this.props.markAllComplete()}
          >
            Mark All Complete
          </Button>
          &nbsp;
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => this.props.deleteAllTasks()}
          >
            Delete All
          </Button>
        
        {this.props.tasks.map((task, i) => (
          <TaskComponent
            key={i}
            task={task}
            handleDelete={this.props.handleDelete}
            handleComplete={this.props.handleComplete}
          />
        ))}
      </Container>
    );
  }
}

export default TaskTable;

class TaskComponent extends Component {
  render() {
    return (
      <Container fluid="true">
        <Row>
          <Col>
            <label>{this.props.task}</label>
          </Col>
          <Col>
            <Button
            name="completeButton"
              size="sm"
              variant="outline-primary"
              onClick={() => this.props.handleComplete(this.props.task)}
            >
              Complete
            </Button>
            &nbsp;
            <Button
            name="deleteButton"
            variant="outline-danger"
              size="sm"
              onClick={() => this.props.handleDelete(this.props.task)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
