import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { tasksReducer } from "./reducers/tasksReducer";

const initialState = {};
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  combineReducers({
    products: tasksReducer,
  }),
  initialState,
  composeEnhancer(applyMiddleware(thunk))
);

export default store;
