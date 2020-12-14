import React, { useEffect, useState } from 'react';
import Tasks from '../Tasks/Tasks';
import './Search.css'


function Search(props) {

    const [tasks, setTasks] = useState({})

    const {match :
        {params}
    } = props;

    useEffect(() => {
        const url = `/api/v1/search/${params.name}`

        fetch(url)
        .then(response => {
            if(response.ok) {
                return response.json()
            }
            throw new Error("Network response was not ok.")
        })
        .then(response => {
            setTasks(response);
        })
        .catch(() => console.log("An error occurred while fetching the todos"));
    },[])

    return (
    <div className="search justify-content-center">
            {tasks.tagged_tasks_incompleted && <Tasks todos = {tasks.tagged_tasks_incompleted} status={false}/>}
            {tasks.tagged_tasks_completed && <Tasks todos = {tasks.tagged_tasks_completed} status={true}/>}
    </div>
    );
}

export default Search;