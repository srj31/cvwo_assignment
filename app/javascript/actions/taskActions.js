import { FETCH_TASKS } from "../actionTypes";

export const fetchTasks = () => async (dispatch) => {
  const url = "/api/v1/tasks";
  const res = await fetch(url);
  const data = res.json();
  dispatch({
    type: FETCH_TASKS,
    payload: data,
  });
};
