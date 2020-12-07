import React, { useState } from 'react';
import "./TaskItems.css";
import { Link } from 'react-router-dom';

function TaskItems({ task, status, handleSubmit }) {

    const [editing, setEditing] = useState(false);
    const [newTask, setNewTask] = useState(task);

    const handleChangeCompleted = (event) => {
        handleSubmit({
            ...newTask,
            completed: event.target.checked
        })
    }

    const handleEdit = () => {
        setEditing(true);
    }

    const handleChangeName = (event) => {
        setNewTask({
            ...newTask,
            name: event.target.value
        })
    }

    const handleChangeDescription = (event) => {
        setNewTask({
            ...newTask,
            description: event.target.value
        })
    }


    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setEditing(false);
            handleSubmit(newTask);
        }
    }

    const handleDelete = (event) => {
        const id = task.id;
        const url = `/api/v1/destroy/${id}`
        const token = document.querySelector('meta[name="csrf-token"]').content;

        fetch(url, {
            method: "DELETE",
            headers: {
                "X-CSRF-Token": token,
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error("Network response was not ok.");
            })
            .then(response => {
                console.log(response)
                window.location.reload(false);
            }) 
            .catch(() => "Error occurred while deleting the task")
    }

    return (
        editing ? (
            <div className="taskItems__editing">
                <div className={`taskItems__section ${status ? "taskItems__completed" : "taskItems__uncompleted"}`}>
                    <div className="taskItems__checkbox">
                        <input className="form-check-input" type="checkbox" checked={task.completed} value="" id={`checkbox${task.id}`} onChange={handleChangeCompleted} />
                    </div>
                    <div className="taskItems__header">
                        <input type="text" className="form-control-plaintext" id="staticEmail2" value={newTask.name} onChange={handleChangeName} onKeyDown={handleKeyDown} autoFocus />
                    </div>
                    <div className="taskItems__body">
                        <input type="text" className="form-control-plaintext" id="staticEmail2" value={newTask.description} onChange={handleChangeDescription} onKeyDown={handleKeyDown} autoFocus />
                    </div>
                    <div className="taskItems__links">
                        {/* <h6> Edit </h6> */}
                    </div>
                </div>
            </div>
        ) : (
                <div className="taskItems__normal">
                    <div className={`taskItems__section ${status ? "taskItems__completed" : "taskItems__uncompleted"}`}>
                        <div className="taskItems__checkbox">
                            <input className="form-check-input" type="checkbox" checked={task.completed} value="" id={`checkbox${task.id}`} onChange={handleChangeCompleted} />
                        </div>
                        <div className="taskItems__header">
                            {task.name}
                        </div>
                        <div className="taskItems__body">
                            {task.description}
                        </div>
                        <div className="taskItems__links">
                            <h6 className="btn btn-primary" onClick={handleEdit}> Edit </h6>
                            <h6 className="btn btn-danger" onClick={handleDelete}> Delete </h6>

                        </div>
                    </div>
                </div>
            )

    );
}

export default TaskItems;