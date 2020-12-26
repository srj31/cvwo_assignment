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
        setTasks(response);
        setLoading(false);
      })
      .catch(() => console.log("An error occurred while fetching the todos"));
  }, [params]);

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
          Search results for {params.name}
          {tasks.tagged_tasks_incompleted && (
            <Tasks todos={tasks.tagged_tasks_incompleted} status={false} />
          )}
          {tasks.tagged_tasks_completed && (
            <Tasks todos={tasks.tagged_tasks_completed} status={true} />
          )}
        </>
      )}
    </div>
  );
}

export default Search;
