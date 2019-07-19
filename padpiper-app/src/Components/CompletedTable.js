import React, { Component } from "react";
import { Container } from "react-bootstrap";

class CompletedTable extends Component {
  render() {
    if (!this.props.completedList) {
      return null;
    }
    return (
      <Container>
        <label>
          <h4>Completed Tasks</h4>
        </label>
        {this.props.completedList.map(completed => (
          <Container key={completed}>
            <label>{completed}</label>
          </Container>
        ))}
      </Container>
    );
  }
}

export default CompletedTable;
