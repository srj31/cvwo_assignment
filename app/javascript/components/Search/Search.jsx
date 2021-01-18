import React, { useEffect, useState } from "react";
import Tasks from "../Tasks/Tasks";
import "./Search.css";

function Search(props) {
  const [tasks, setTasks] = useState({});
  const [loading, setLoading] = useState(true);
  const {
    match: { params },
  } = props;

  useEffect(() => {
    const url = `/api/v1/search/${params.name}`;
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        console.log(response);
        setTasks(response);
        setLoading(false);
      })
      .catch(() => console.log("An error occurred while fetching the todos"));
  }, []);

  return (
    <div className="search justify-content-center">
      {loading ? (
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : (
        <>
          {tasks.tagged_tasks_uncompleted && (
            <Tasks tasks={tasks.tagged_tasks_uncompleted} status={false} />
          )}
          {tasks.tagged_tasks_completed && (
            <Tasks tasks={tasks.tagged_tasks_completed} status={true} />
          )}
        </>
      )}
    </div>
  );
}

export default Search;
