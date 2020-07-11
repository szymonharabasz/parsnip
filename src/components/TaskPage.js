import React, {Component} from 'react';
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import TaskList from './TaskList';
import { createTask, editTask, filterTasks, deleteTask } from "../actions";
import { getGroupedByStatus } from "../reducers";


const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];

class TaskPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showNewCardForm: false,
            title: '',
            description: '',
        };
    }

    onTitleChange = (e) => {
        this.setState({title: e.target.value});
    };

    onDescriptionChange = (e) => {
        this.setState({description: e.target.value});
    };

    resetForm() {
        this.setState({
            showNewCardForm: false,
            title: '',
            description: '',
        })
    }

    onCreateTask = e => {
        e.preventDefault();

        this.props.createTask({
            title: this.state.title,
            description: this.state.description,
            projectId: this.props.currentProjectId,
        });

        this.resetForm();
    };

    onStatusChange = (task, status) => {
        this.props.editTask(task, { status });
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
                onStautusChange={this.onStatusChange}
                onEditTask={this.props.editTask}
                onDeleteTask={this.props.deleteTask}
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
            editTask,
            deleteTask
        },
        dispatch
    );
}

export {TASK_STATUSES};
export default connect(mapStateToProps, mapDispatchToProps)(TaskPage);