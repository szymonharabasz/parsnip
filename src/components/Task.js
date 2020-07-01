import React, { Component } from 'react';
import StatusSelector from "./StatusSelector";

class Task extends Component {

    onStatusChange = (status) => {
        this.props.onEditTask(
            Object.assign({}, this.props.task, {status: status})
        );
    };

    render() {
        return (
            <div className="task">
                <div className="task-header">
                    <div><b><i>{this.props.task.title}</i></b></div>
                    <StatusSelector status={this.props.task.status} onStatusChange={this.onStatusChange}/>
                </div>
                <hr/>
                <div className="task-body">{this.props.task.description}</div>
            </div>
        );
    }
}

export default Task;
