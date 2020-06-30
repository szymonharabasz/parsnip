import React, { Component } from 'react';
import StatusSelector from "./StatusSelector";

class Task extends Component {

    onStatusChange = (status) => {
        this.props.onSetStatus({
            id: this.props.task.id,
            newStatus: status });
    };

    render() {
        return (
            <div className="task">
                <div className="task-header">
                    <div>{this.props.task.title}</div>
                    <StatusSelector status={this.props.task.status} onStatusChange={this.onStatusChange}/>
                </div>
                <br/>
                <div className="task-body">{this.props.task.description}</div>
            </div>
        );
    }
}

export default Task;
