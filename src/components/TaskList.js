import React from 'react';
import Task from './Task';

const TaskList = props => {
    return (
        <div className="task-list">
            {props.tasks.tasks.map(task => {
                return <Task
                    key={task.id}
                    task={task}
                    onEditTask={props.onEditTask}
                    onDeleteTask={props.onDeleteTask}
                />;
            })}
        </div>
    );
};

export default TaskList;