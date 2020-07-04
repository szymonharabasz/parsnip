import React, { Component } from 'react';
import StatusSelector from "./StatusSelector";

class Task extends Component {

    onStatusChange = (status) => {
        this.props.onEditTask(
            Object.assign({}, this.props.task, {status: status})
        );
    };

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
    };

    render() {
        return (
            <div className="task">
                <div className="task-header">
                    <div><b><i>{this.props.task.title}</i></b></div>
                    <div>
                        <button
                            className="button button-default button-tool">
                            &#128393;
                        </button>
                        <button
                            className="button button-default button-tool"
                            onClick={this.onDeleteTask}>
                            &#8856;
                        </button>
                        <StatusSelector status={this.props.task.status} onStatusChange={this.onStatusChange}/>
                    </div>
                </div>
                <hr/>
                <div className="task-body">{this.props.task.description}</div>
            </div>
        );
    }
}

export default Task;
