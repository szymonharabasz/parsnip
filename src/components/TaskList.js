import React from 'react';
import Task from './Task';

const TaskList = props => {
    return (
        <div className="task-list">
            {props.tasks.tasks.map(task => {
                return <Task key={task.id} taskId={task.id} />;
            })}
        </div>
    );
};

export default TaskList;