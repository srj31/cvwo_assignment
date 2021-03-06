import React from "react";
import TaskItems from "../TaskItems/TaskItems";

function Tasks({ tasks, status }) {

  const handleSubmit = (body) => {
    const url = `/api/v1/tasks/${body.id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "PUT",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response);
      })
      .catch(() => console.log("An error occurred while adding the todo item"));
  };

  return (
    <div className="task">
      {tasks && tasks.map((task) => {
        return (
          <TaskItems
            task={task}
            status={status}
            handleSubmit={handleSubmit}
            key={task.id}
          />
          
        );
      })}
    </div>
  );
}

export default Tasks;
