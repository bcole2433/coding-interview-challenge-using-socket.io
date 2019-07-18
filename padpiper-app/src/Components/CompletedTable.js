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
          <h1>Completed Tasks</h1>
        </label>
        {this.props.completedList.map(completed => (
          <Container>
            <label key={completed}>{completed}</label>
          </Container>
        ))}
      </Container>
    );
  }
}

export default CompletedTable;
