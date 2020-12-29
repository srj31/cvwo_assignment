import React, { useState, useEffect } from "react";
import "./TaskItems.css";
import Tags from "../Tags/Tags";

function TaskItems({ task, status, handleSubmit }) {
  const [editing, setEditing] = useState(false);
  const [newTask, setNewTask] = useState(task);
  const [tags, setTags] = useState({});
  const [toDelete, setToDelete] = useState(false);

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
    setNewTask({
      ...newTask,
      completed: event.target.checked,
    });

    handleSubmit({ ...newTask, completed: event.target.checked }, tags);
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
      handleSubmit(newTask);
    }
  };

  const handleDelete = (event) => {
    const id = task.id;
    const url = `/api/v1/tasks/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;
    setToDelete(true);
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
        // window.location.reload(false);
      })
      .catch(() => "Error occurred while deleting the task");
  };

  return editing ? (
    <div className="taskItems__editing">
      <div className={`taskItems__section taskItems__inEditing`}>
        <div className="taskItems__checkbox">
          <input
            className="form-check-input"
            type="checkbox"
            checked={newTask.completed}
            id={`checkbox${newTask.id}`}
            onChange={handleChangeCompleted}
          />
        </div>
        <div className="taskItems__header">
          <input
            type="text"
            className="form-control-plaintext"
            id="name"
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
            id="description"
            value={newTask.description}
            onChange={handleChangeDescription}
            onKeyDown={handleKeyDown}
            autoFocus
          />
          <Tags editing={editing} tags={tags} />
        </div>
        <div className="taskItems__links">
          <h6
            className="btn btn-warning"
            onClick={() => {
              setEditing(false);
              handleSubmit(newTask, tags);
            }}
          >
            {" "}
            Update Task{" "}
          </h6>
        </div>
      </div>
    </div>
  ) : (
    <div className="taskItems__normal">
      {toDelete ? (
        <div style={{ display: "flex", justifyContent: "center", padding: 30 }}>
          Deleted
        </div>
      ) : (
        <div
          className={`taskItems__section ${
            newTask.completed
              ? "taskItems__completed"
              : "taskItems__uncompleted"
          }`}
        >
          <div className="taskItems__checkbox">
            <input
              className="form-check-input"
              type="checkbox"
              checked={newTask.completed}
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
      )}
    </div>
  );
}

export default TaskItems;
