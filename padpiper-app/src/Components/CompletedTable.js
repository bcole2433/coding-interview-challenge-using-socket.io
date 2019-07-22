import React from "react";
import { Container } from "react-bootstrap";

const CompletedTable = ({completedList}) => {
  if (!completedList || completedList.length < 1) {
    return <Container><h4> Completed Tasks (0)</h4><p>Tasks will show up here when you mark them as "Complete".</p></Container>;
  }
  return (
    <Container>
      <label>
        <h4>Completed Tasks ({completedList.length})</h4>
      </label>
      {completedList.map(completed => (
        <Container key={completed}>
          <label>{completed}</label>
        </Container>
      ))}
    </Container>
  );
}

export default CompletedTable;