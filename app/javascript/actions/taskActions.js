import { FETCH_TASKS, ADD_TASK } from "../actionTypes";

export const addTask = (todoBody, tag) => async (dispatch) => {
  const url1 = "/api/v1/tasks";
  const metaElement = document.querySelector('meta[name="csrf-token"]');
  const token = metaElement.content;

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
      if (response.ok || response.status == 500) {
        return response.json();
      }
      throw new Error("Network Response was not ok");
    })
    .then((task) => {
      console.log(task);
      if (task.status == 500) {
        setErrors(task.errors);
        throw new Error("Invalid Inputs");
      }

      if (tag.name == "") return;

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
          dispatch({
            type: ADD_TASK,
            payload: response,
          });
          return response;
        });
    })
    .catch((error) => {
      console.log("Error while creating task: ", error);
    });
};

export const fetchTasks = () => async (dispatch) => {
  const url = "/api/v1/tasks";
  return await fetch(url)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }

      throw Error("Something wrong in actions");
    })
    .then((response) => {
      dispatch({
        type: FETCH_TASKS,
        payload: response,
      });
      return response;
    })
    .catch((err) => {
      console.error(err);
    });
};
