import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import FlashMessage from './components/FlashMessage';
import {createTask, fetchTasks, editTask} from "./actions";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTasks());
    }

    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({ title, description, status: "Unstarted" }));
    };
    onEditTask = (params) => {
        this.props.dispatch(editTask(params));
    };

    render() {
        return (
            <div className="container">
                {this.props.error && <FlashMessage message={this.props.error} />}
                <div className="main-content">
                    <TaskPage tasks={this.props.tasks}
                              onCreateTask={this.onCreateTask}
                              onEditTask={this.onEditTask}
                              isLoading={this.props.isLoading}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { tasks, isLoading, error } = state.tasks;
    return { tasks, isLoading, error };
}

export default connect(mapStateToProps)(App);
