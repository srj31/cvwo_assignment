import React, { useState, useEffect } from "react";
import "./TaskItems.css";
import Tags from "../Tags/Tags";

function TaskItems({ task, status, handleSubmit }) {
  const [editing, setEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [tags, setTags] = useState({});

  useEffect(() => {
    const url = `/api/v1/tasks/${task.id}/tags`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok");
      })
      .then((response) => {
        setTags(response);
      })
      .catch(() => console.log("An error occurred while fetching the tags"));
  }, []);

  const handleChangeCompleted = (event) => {
    handleSubmit(
      {
        ...newTask,
        completed: event.target.checked,
      },
      tags
    );
  };

  const handleEdit = () => {
    setEditing(true);
  };

  const handleChangeName = (event) => {
    setNewTask({
      ...newTask,
      name: event.target.value,
    });
  };

  const handleChangeDescription = (event) => {
    setNewTask({
      ...newTask,
      description: event.target.value,
    });
  };

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setEditing(false);
      handleSubmit(newTask, tags);
    }
  };

  const handleDelete = (event) => {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch(() => "Error occurred while deleting the task");
  };

  return editing ? (
    <div className="taskItems__editing">
      <div
        className={`taskItems__section taskItems__inEditing`}
      >
        <div className="taskItems__checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            checked={newTask.completed}
            value=""
            id={`checkbox${newTask.id}`}
            onChange={handleChangeCompleted}
          />
        </div>
        <div className="taskItems__header">
          <input
            type="text"
            className="form-control-plaintext"
            id="staticEmail2"
            value={newTask.name}
            onChange={handleChangeName}
            onKeyDown={handleKeyDown}
            autoFocus
          />
        </div>
        <div className="taskItems__body">
          <input
            type="text"
            className="form-control-plaintext"
            id="staticEmail2"
            value={newTask.description}
            onChange={handleChangeDescription}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Tags editing={editing} tags={tags} />
        </div>
        <div className="taskItems__links">{/* <h6> Edit </h6> */}</div>
      </div>
    </div>
  ) : (
    <div className="taskItems__normal">
      <div
        className={`taskItems__section ${
          status ? "taskItems__completed" : "taskItems__uncompleted"
        }`}
      >
        <div className="taskItems__checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            checked={newTask.completed}
            value=""
            id={`checkbox${newTask.id}`}
            onChange={handleChangeCompleted}
          />
        </div>
        <div className="taskItems__header">{newTask.name}</div>
        <div className="taskItems__body">
          {newTask.description}
          <Tags editing={editing} tags={tags} />
        </div>
        <div className="taskItems__links">
          <h6 className="btn btn-primary" onClick={handleEdit}>
            {" "}
            Edit{" "}
          </h6>
          <h6 className="btn btn-danger" onClick={handleDelete}>
            {" "}
            Delete{" "}
          </h6>
        </div>
      </div>
    </div>
  );
}

export default TaskItems;
