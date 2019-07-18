import React from "react";
import { Container, Button, Col, Row } from "react-bootstrap";

const TaskTable = ({ tasks }) => {
  if (!tasks) {
    return null;
  }

  return (
    <Container>
    <label>
      <h1>Tasks</h1>
    </label>
    <div>
      {tasks.map((task, index) => (
        <TaskComponent
        task={task}
        key={index}
        />
      ))}
    </div>
  </Container>
  );
};

export default TaskTable;

const TaskComponent = ({ task, index }) => {
  return (
    <Container>
    <Row>
    <Col>
      <label>{ task }</label>
    </Col>
      <Col>
        <Button
        size="sm"
        variant="outline-primary"
        >Complete</Button>
        <Button
        variant="outline-primary"
        size="sm"
        >Delete</Button>
      </Col>
      </Row>
    </Container>
  );
};