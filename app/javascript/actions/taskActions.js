import { FETCH_TASKS } from "../actionTypes";

export const fetchTasks = () => async (dispatch) => {
  const url = "/api/v1/tasks";
  return await fetch(url)
  .then(response => {
    if(response.ok) {
      return response.json()
    }
    
    throw Error("Something wrong in actions")
  })
  .then(response => {
    dispatch({
      type: FETCH_TASKS,
      payload: response
    })
    return response
  })
  .catch(err => {
    console.error(err);
  })
};

