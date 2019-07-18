import React, { Component } from "react";
import { Form, Container, Col, Button } from "react-bootstrap";

class AddItemForm extends Component {
    render() {
    return (
<Container fluid="true">
          <Form onSubmit={this.handleTaskAdd}>
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
                    value={this.props.title}
                    onChange={this.props.handleChange}
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
                    size="sm"
                    type="submit"
                    onClick={this.props.handleTaskAdd}
                    disabled={!this.props.title}
                  >
                    Add Task
                  </Button>
                </Form.Group>
              </Col>
            </Form.Row>
          </Form>
        </Container>
      );
    }
}

export default AddItemForm;