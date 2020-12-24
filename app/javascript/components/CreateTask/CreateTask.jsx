import React, { useState, useEffect } from "react";
import ErrorComp from "../ErrorComp/ErrorComp";

const CreateTask = () => {
  const [todo, setTodo] = useState({});
  const [tag, setTag] = useState({});
  const [user, setUser] = useState({ id: "-1" });
  const [hasError, setHasError] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    const url = "/logged_in";

    fetch(url, {
      credentials: "include",
    })
      .then((response) => {
        console.log(response);
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network Response was not ok");
      })
      .then((response) => {
        if (response.logged_in) {
          setUser(response.user);
        }
      })
      .catch((error) => {
        console.log("login/logout api errors:", error);
      });
  }, []);

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
      user_id: user.id
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
        throw response.json();
      })
      .then((task) => {
        const url2 = `/api/v1/tasks/${task.id}/tags`;
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
        window.location.reload(false);
      })
      .catch((error) => {
        error.then((err) => {
          setErrors(JSON.parse(JSON.stringify(err.errors)));
          setHasError(true);
        });
      });
  };

  return (
    <div className="createTask">
      {hasError && <ErrorComp errors = {errors}/>}
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
        <input
          type="hidden"
          className="form-control-plaintext mr-3 my-3 py-3"
          placeholder="User Id"
          value={user && user.id}
        />
        <button type="submit" className="btn btn-primary col mr-2">
          Add
        </button>
      </form>
    </div>
  );
};

export default CreateTask;
