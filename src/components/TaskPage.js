import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TaskList from './TaskList';
import { createTask, filterTasks } from "../actions";
import { getGroupedByStatus } from "../reducers";

class TaskPage extends Component {

    onCreateTask = e => {
        e.preventDefault();

        this.props.createTask({
            title: '',
            description: '',
            projectId: this.props.currentProjectId,
        });
    };

    onSearch = e => {
        this.props.onSearch(e.target.value);
    };

    renderTaskLists() {
        const {tasks} = this.props;

        return Object.keys(tasks).map(status => {
            const tasksByStatus = tasks[status];

            return (<TaskList
                key={status}
                status={status}
                tasks={tasksByStatus}
            />);
        });
    }

    render() {
        console.log("Rendering TaskPage");

        if (this.props.isLoading) {
            return (
                <div className="tasks-loading">
                    Loading...
                </div>
            );
        }
        return (
            <div className="tasks">
                <div className="task-list-header">
                    <div>
                        <input
                            onChange={this.onSearch}
                            className="input-search"
                            type="text"
                            placeholder="Search..."
                        />
                    </div>
                    <button className="button button-default"
                            onClick={this.onCreateTask}>
                        + New Task
                    </button>
                </div>
                <div className="tasks-lists">
                    {this.renderTaskLists()}
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading } = state.projects;

    return {
        tasks: getGroupedByStatus(state),
        currentProjectId: state.page.currentProjectId,
        isLoading
    }
}

function mapDispatchToProps(dispatch) {
    return bindActionCreators(
        {
            onSearch: filterTasks,
            createTask,
        },
        dispatch
    );
}

export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);