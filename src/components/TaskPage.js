import React, {Component} from 'react';
import TaskList from './TaskList';

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

    onCreateTask = () => {
        this.props.onCreateTask({
            title: '',
            description: '',
        });
    };

    onSearch = e => {
        this.props.onSearch(e.target.value);
    };

    renderTaskLists() {
        const {tasks} = this.props;
        return tasks.map(statusTasks => {
            const {status, tasks} = statusTasks;
            return (<TaskList
                key={status}
                status={status}
                tasks={tasks}
                onEditTask={this.props.onEditTask}
                onDeleteTask={this.props.onDeleteTask}
            />);
        });
    }

    render() {
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

export {TASK_STATUSES};
export default TaskPage;