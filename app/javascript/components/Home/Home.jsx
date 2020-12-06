import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Tasks from "../Tasks/Tasks";

const Home = () => {

  const [todos, setTodos] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "/api/v1/tasks/index";
    fetch(url)
      .then(response => {
        console.log(response)
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(response => {
        console.log(response)
        setTodos(response)
        setLoading(false)
      })
      .catch(() => console.log('An error occurred while fetching the todos'));
  }, []);



  return (
    <div className="home">
      <div className="vw-100 vh-100 primary-color d-flex justify-content-center">
        <div className="jumbotron jumbotron-fluid bg-transparent">
          <div className="container secondary-color">
            <h1 className="display-4">Todo</h1>
            <p className="lead">
              Things to do
            </p>
            <hr className="my-4" />
            <div className="home_todo">
              {
                loading ? (
                  <div className="d-flex justify-content-center">
                    <div className="spinner-border" role="status">
                      <span className="sr-only">Loading...</span>
                    </div>
                  </div>) : (
                    <div>
                      <Tasks todos ={todos.uncompleted} status = {false}/>
                      <Tasks todos = {todos.completed} status = {true}/>
                    </div>
                  )
              }
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};

export default Home;