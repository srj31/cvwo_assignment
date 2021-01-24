import { FETCH_TASKS, ADD_TASK } from "../actionTypes";

export const tasksReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_TASKS:
      return { ...state, items: action.payload };

    case ADD_TASK:
      return {...state,
          items: [
            ...state.items,
            action.payload
          ]
      }

    default:
      return state;
  }
};
