import React, { Component } from 'react';
import StatusSelector from "./StatusSelector";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            title: this.props.task.title,
            description: this.props.task.description,
        };
    }
    onEditing = () => {
        if (this.state.editing) {
            this.props.onEditTask(
                Object.assign({}, this.props.task, {
                    title: this.state.title,
                    description: this.state.description,
                })
            );
        }
        this.setState({editing: !this.state.editing});
    };

    onStatusChange = (status) => {
        this.props.onEditTask(
            Object.assign({}, this.props.task, {status: status})
        );
    };

    onTitleChange = (e) => {
        this.setState({ title: e.target.value });
    };

    onDescriptionChange = (e) => {
        this.setState({ description: e.target.value });
    };

    onDeleteTask = () => {
        this.props.onDeleteTask(this.props.task.id);
    };

    render() {
        return (
            <div className="task">
                <div className="task-header">
                    {this.state.editing &&
                        <input
                            className="in-place-input"
                            onChange={this.onTitleChange}
                            value={this.state.title}
                            type="text"
                            placeholder="title"
                        />
                    }
                    {!this.state.editing &&
                        <div><b><i>{this.props.task.title}</i></b></div>
                    }
                    <div>
                        <button
                            className="button button-default button-tool"
                            onClick={this.onEditing}>
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
                <div className="task-body">
                {!this.state.editing && this.state.description}
                {this.state.editing &&
                        <textarea rows="4"
                            className="in-place-input"
                            onChange={this.onDescriptionChange}
                            value={this.state.description}
                            type="text"
                            placeholder="description"
                        />
                }
                <div className="task-timer">In Progress for {this.props.task.timer} s</div>
                </div>
            </div>
        );
    }
}

export default Task;
