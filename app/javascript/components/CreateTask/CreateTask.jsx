import React, { useState } from "react";

const CreateTask = () => {
  const [todo, setTodo] = useState({});
  const [tag, setTag] = useState({});

  const handleChangeName = (event) => {
    setTodo({
      ...todo,
      name: event.target.value,
    });
  };

  const handleChangeDescription = (event) => {
    setTodo({
      ...todo,
      description: event.target.value,
    });
  };

  const handleChangeTag = (event) => {
    setTag({
      ...tag,
      name: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (todo == "") return;

    const todoBody = {
      ...todo,
      completed: false,
      // tag: tag
    };

    const url1 = "/api/v1/tasks";
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url1, {
      method: "POST",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todoBody),
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Response was not ok");
      })
      .then((task) => {
        console.log(task);
        const url2 = `/api/v1/tasks/${task.id}/tags`;
        console.log(url2);
        fetch(url2, {
          method: "POST",
          headers: {
            "X-CSRF-Token": token,
            "Content-Type": "application/json",
          },
          body: JSON.stringify(tag),
        })
          .then((response) => {
            if (response.ok) {
              return response.json();
            }
            throw new Error("Network Response was not ok");
          })
          .then((response) => {
            task.tag = response;
          });
      })
      .then((response) => {
        console.log(response);
        window.location.reload(false);
      })
      .catch((err) => {
        console.log("error while creating a new task");
        console.log(err);
      });
  };

  return (
    <div className="createTask">
      Create a new Task
      <form className="createTask__body" onSubmit={handleSubmit}>
        <input
          type="text"
          className="form-control-plaintext mr-3 my-3 py-3"
          autoFocus
          placeholder="Todo Name"
          onChange={handleChangeName}
        />
        <input
          type="text"
          className="form-control-plaintext mr-3 my-3 py-3"
          placeholder="Todo Description"
          onChange={handleChangeDescription}
        />
        <input
          type="text"
          className="form-control-plaintext mr-3 my-3 py-3"
          placeholder="Todo Tag"
          onChange={handleChangeTag}
        />
        <button type="submit" className="btn btn-primary col mr-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
