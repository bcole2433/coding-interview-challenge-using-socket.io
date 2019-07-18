import React from "react";

const TaskTable = ({ tasks }) => {
  if (!tasks) {
    return null;
  }

  return (
      <label>
        <h1>Tasks</h1>
      </label>
  );
};

export default TaskTable;

// const TaskComponent = () => {
//   return (
//     <label> Stuff </label>
//   );
// };