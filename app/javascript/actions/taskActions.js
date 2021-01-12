import { FETCH_TASKS } from "../actionTypes";

export const fetchTasks = () => async (dispatch) => {
  const url = "/api/v1/tasks";
  await fetch(url)
  .then(response => {
    if(response.ok) {
      dispatch({
        type: FETCH_TASKS,
        payload: response.json(),
      })
    }
  })
  .catch(err => {
    console.error(err);
  })
};

