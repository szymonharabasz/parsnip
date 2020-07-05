import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import FlashMessage from './components/FlashMessage';
import {createTask, fetchTasks, editTask, deleteTask, filterTasks} from "./actions";
import { getFilteredTasks} from "./reducers";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTasks());
    }

    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({ title,description }));
    };
    onEditTask = (params) => {
        console.log('in onEditTask: ', params);
        this.props.dispatch(editTask(params));
    };
    onDeleteTask = (id) => {
        this.props.dispatch(deleteTask(id));
    };
    onSearch = searchTerm => {
        this.props.dispatch(filterTasks(searchTerm));
    };

    render() {
        return (
            <div className="container">
                {this.props.error && <FlashMessage message={this.props.error} />}
                <div className="main-content">
                    <TaskPage tasks={this.props.tasks}
                              onCreateTask={this.onCreateTask}
                              onEditTask={this.onEditTask}
                              onDeleteTask={this.onDeleteTask}
                              onSearch={this.onSearch}
                              isLoading={this.props.isLoading}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, error } = state.tasks;
    return { tasks: getFilteredTasks(state), isLoading, error };
}

export default connect(mapStateToProps)(App);
