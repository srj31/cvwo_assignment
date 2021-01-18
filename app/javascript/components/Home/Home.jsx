import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tasks from "../Tasks/Tasks";
import CreateTask from "../CreateTask/CreateTask.tsx";
import "./Home.css";
import IntroPage from "../IntroPage/IntroPage.jsx";
import { CSSTransition } from "react-transition-group";
import { connect, useDispatch, useSelector } from "react-redux";
import { fetchTasks } from "../../actions/taskActions";
import store from "../../store";

const Home = ({ isLoggedIn, user, ...props }) => {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const [toAdd, setToAdd] = useState(false);
  const res = useSelector((state) => state.tasks);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchTasks());
    setLoading(false);
  }, []);


  const addTodo = () => {
    setToAdd(!toAdd);
  };

  return (
    <div className="home container">
      {isLoggedIn ? (
        <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
          <div className="jumbotron jumbotron-fluid bg-transparent">
            <div className="container secondary-color">
              <h1 className="display-4">Todo</h1>
              <p className="lead">
                Things to do{" "}
                <span style={{ color: "#FFE400" }}>{user.username} </span>
              </p>
              <p
                className={`btn ${!toAdd ? "btn-success" : "btn-danger"}`}
                onClick={addTodo}
              >
                {!toAdd ? <span>Add Task</span> : <span>Cancel</span>}
              </p>
              <CSSTransition
                in={toAdd}
                timeout={350}
                classNames="home__createTask__transition"
                unmountOnExit
              >
                <div>
                  <CreateTask />
                </div>
              </CSSTransition>

              <hr className="my-4" />
              <div className="home__todo">
                {loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>
                ) : (
                  <div>
                    {props.tasks && (
                      <>
                        <Tasks tasks={props.tasks.uncompleted} status={false} />
                        <Tasks tasks={props.tasks.completed} status={true} />
                      </>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <IntroPage />
      )}
    </div>
  );
};

const mapStateToProps = (state) => {
  console.log(state);
  return {
    tasks: state.tasks.items,
  };
};

export default connect(mapStateToProps)(Home);
