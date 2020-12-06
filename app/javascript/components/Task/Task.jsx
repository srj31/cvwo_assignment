import React from 'react';
import "./Task.css"

function Task({todos, status}) {
    
    console.log(todos,status)

    return (
        <div className="task">
            {  
                todos.map(task => {
                    return (
                        <div className={`task__section ${status?"task__completed":"task__uncompleted"}`}>
                            <div className="task__header">
                                {task.name}
                            </div> 
                            <div className="task__body">
                                {task.description}
                            </div>
                        </div>
                    )
                })
            }
        </div>
    );
}

export default Task;