import React, {Component} from 'react';
import { connect } from "react-redux";
import StatusSelector from "./StatusSelector";
import {bindActionCreators} from "redux";
import {deleteTask, editTask} from "../actions";

class Task extends Component {
    constructor(props) {
        super(props);

        this.state = {
            editing: false,
            title: this.props.task.title,
            description: this.props.task.description,
        };
    }

    onStatusChange = (status) => {
        this.props.editTask(
            Object.assign({}, this.props.task, {status: status})
        );
    };

    onTitleChange = (e) => {
        this.props.editTask(
            Object.assign({}, this.props.task, {
                title: e.target.value,
            })
        );
    };

    onDescriptionChange = (e) => {
        this.props.editTask(
            Object.assign({}, this.props.task, {
                description: e.target.value,
            })
        );
    };

    onDeleteTask = () => {
        this.props.deleteTask(this.props.task.id, this.props.task.projectId);
    };

    render() {
        console.log("Rendering task: ", this.props.task.id);
        return (
            <div className="task">
                <div className="task-header">
                    <div className="task-toolbar">
                        <StatusSelector status={this.props.task.status} onStatusChange={this.onStatusChange}/>
                        <button
                            className="button button-default button-tool"
                            onClick={this.onDeleteTask}>
                            &#8856;
                        </button>
                    </div>
                    <div>
                    <textarea rows="2"
                              className="in-place-input in-place-input-title"
                              onChange={this.onTitleChange}
                              value={this.props.task.title}
                              type="text"
                              placeholder="title"
                    />
                    </div>
                </div>
                <hr/>
                <div className="task-body">
                <textarea rows="4"
                          className="in-place-input"
                          onChange={this.onDescriptionChange}
                          value={this.props.task.description}
                          type="text"
                          placeholder="description"
                />
                    <div className="task-timer">In Progress for {this.props.task.timer} s</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state, ownProps) {
    return {
        task: state.tasks.items[ownProps.taskId]
    };
}


function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            editTask,
            deleteTask
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(Task);
