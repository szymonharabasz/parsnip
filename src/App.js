import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import FlashMessage from './components/FlashMessage';
import Header from './components/Header';
import {createTask, editTask, deleteTask, filterTasks, fetchProjects } from "./actions";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }

    onCreateTask = ({ title, description, projectId }) => {
        this.props.dispatch(createTask({ title,description, projectId }));
    };
    onEditTask = (params) => {
        this.props.dispatch(editTask(params));
    };
    onDeleteTask = (id) => {
        this.props.dispatch(deleteTask(id, this.props.currentProjectId));
    };
    onSearch = searchTerm => {
        this.props.dispatch(filterTasks(searchTerm));
    };

    render() {
        return (
            <div className="container">
                {this.props.error && <FlashMessage message={this.props.error} />}
                <div className="main-content">
                    <Header/>
                    <TaskPage/>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { error } = state.projects;
    return { error };
}

export default connect(mapStateToProps)(App);
