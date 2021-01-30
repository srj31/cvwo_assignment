import { FETCH_TASKS } from "../actionTypes";

export const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { items: action.payload };

    default:
      return state;
  }
};
