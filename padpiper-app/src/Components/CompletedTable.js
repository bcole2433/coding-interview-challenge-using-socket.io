import React, { Component } from "react";
import { Container } from "react-bootstrap";

class CompletedTable extends Component {
  render() {
    if (!this.props.completedList || this.props.completedList.length < 1) {
      return <h4> Completed Tasks (0)</h4>;
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
