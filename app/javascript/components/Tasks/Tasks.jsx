import React from "react";
import TaskItems from "../TaskItems/TaskItems";

function Tasks({ todos, status }) {
  console.log(todos, status);

  const handleSubmit = (body) => {
    // body.prevent.default()
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
        console.log(body);
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => console.log("An error occurred while adding the todo item"));
  };

  return (
    <div className="task">
      {todos.map((task, key) => {
        return (
          <TaskItems
            task={task}
            status={status}
            handleSubmit={handleSubmit}
            key={key}
          />
        );
      })}
    </div>
  );
}

export default Tasks;
