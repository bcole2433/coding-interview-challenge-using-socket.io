import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";

const TaskTable = ({
  tasks,
  handleComplete,
  markAllComplete,
  deleteAllTasks,
  handleDelete
}) => {
  if (!tasks || tasks.length < 1) {
    return (
      <Container fluid="true">
        <h4>Tasks(0)</h4>
        <p>Add more tasks to see them here!</p>
      </Container>
    );
  }
  return (
    <div>
      <label>
        <h4>Tasks</h4>
      </label>
      {tasks.map((task, i) => (
        <TaskComponent
          key={i}
          task={task}
          handleDelete={handleDelete}
          handleComplete={handleComplete}
        />
      ))}
      <br />
      <Container fluid="true">
        <Row className="justify-content-md-center">
          <Button
            size="sm"
            variant="outline-primary"
            onClick={() => markAllComplete()}
          >
            Mark All Complete
          </Button>
          &nbsp;
          <Button
            size="sm"
            variant="outline-danger"
            onClick={() => deleteAllTasks()}
          >
            Delete All
          </Button>
        </Row>
      </Container>
    </div>
  );
};

export default TaskTable;

const TaskComponent = ({ task, handleDelete, handleComplete }) => {
  return (
    <Container fluid="true">
      <Row>
        <Col>
          <label>{task}</label>
        </Col>
        <Col>
          <Button
            name="completeButton"
            size="sm"
            variant="outline-primary"
            onClick={() => handleComplete(task)}
          >
            Complete
          </Button>
          &nbsp;
          <Button
            name="deleteButton"
            variant="outline-danger"
            size="sm"
            onClick={() => handleDelete(task)}
          >
            Delete
          </Button>
        </Col>
      </Row>
    </Container>
  );
};
