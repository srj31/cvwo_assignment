import React, { useState } from 'react';
import "./TaskItems.css";

function TaskItems({task,status,handleSubmit}) {

    const [editing,setEditing] = useState(false);
    const [newTask,setNewTask] = useState(task);

    const handleChange = (event) => {
        handleSubmit({
            ...newTask,
            completed: event.target.checked
        })
    }

    return (
        <div>
            <div className={`taskItems__section ${status ? "taskItems__completed" : "taskItems__uncompleted"}`}>
                <div className="taskItems__checkbox">
                    <input className="form-check-input" type="checkbox" checked={task.completed} value="" id={`checkbox${task.id}`} onChange={handleChange} />
                </div>

                <div className="taskItems__header">
                    {task.name}
                </div>
                <div className="taskItems__body">
                    {task.description}
                </div>
            </div>
        </div>
    );
}

export default TaskItems;