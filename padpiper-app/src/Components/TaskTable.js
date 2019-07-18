import React, { Component } from "react";
import { Container, Button, Col, Row } from "react-bootstrap";

class TaskTable extends Component {
  render() {
    if (!this.props.tasks) {
      return null;
    }
    return (
      <Container>
      <label>
          <h1>Tasks</h1>
        </label>
        <Button
            size="sm"
            variant="outline-primary"
            onClick={() => this.props.markAllComplete()}
          >
            Mark All Completed
          </Button>
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => this.props.deleteAll()}
          >
            Delete All
          </Button>
        
        {this.props.tasks.map((task, index) => (
          <TaskComponent
            key={index}
            task={task}
            onDelete={this.props.handleDelete}
            onComplete={this.props.handleComplete}
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
      <Container key={this.key}>
        <Row>
          <Col>
            <label>{this.props.task}</label>
          </Col>
          <Col>
            <Button
              size="sm"
              variant="outline-primary"
              onClick={() => this.props.onComplete(this.props.task)}
            >
              Complete
            </Button>
            <Button
              variant="outline-primary"
              size="sm"
              onClick={() => this.props.onDelete(this.props.task)}
            >
              Delete
            </Button>
          </Col>
        </Row>
      </Container>
    );
  }
}
