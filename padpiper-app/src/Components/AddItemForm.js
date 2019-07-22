import React from "react";
import { Form, Container, Col, Button } from "react-bootstrap";

const AddItemForm = ({ title, handleTaskAdd, handleChange}) => {
  return (
    <Container fluid="true">
            <Form onSubmit={handleTaskAdd}>
              <Form.Row>
                <h4>Add a new task</h4>
              </Form.Row>
              <Form.Row>
                <Col lg={true}>
                  <Form.Group controlId="title">
                    <Form.Control
                      as="input"
                      name="title"
                      block="true"
                      value={title || ''}
                      onChange={handleChange}
                      placeholder="ie. Toss Brenden an offer :)"
                    />
                  </Form.Group>
                </Col>
                </Form.Row>
              <Form.Row>
                <Col>
                  <Form.Group className="float-right">
                    <Button
                      variant="outline-primary"
                      size="lg"
                      type="submit"
                      value={title}
                      onClick={handleTaskAdd}
                      disabled={!title}
                    >
                      Add Task
                    </Button>
                  </Form.Group>
                </Col>
              </Form.Row>
            </Form>
          </Container>
        );
 };

 export default AddItemForm;