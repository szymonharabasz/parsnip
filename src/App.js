import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import FlashMessage from './components/FlashMessage';
import Header from './components/Header';
import {createTask, editTask, deleteTask, filterTasks, fetchProjects, setCurrentProjectId} from "./actions";
import { getGroupedByStatus, getProjects } from "./reducers";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }

    onCreateTask = ({ title, description, projectId }) => {
        this.props.dispatch(createTask({ title,description, projectId }));
    };
    onEditTask = (params) => {
        console.log('in onEditTask: ', params);
        this.props.dispatch(editTask(params));
    };
    onDeleteTask = (id) => {
        this.props.dispatch(deleteTask(id, this.props.currentProjectId));
    };
    onSearch = searchTerm => {
        this.props.dispatch(filterTasks(searchTerm));
    };
    onCurrentProjectChange = e => {
        this.props.dispatch(setCurrentProjectId(Number(e.target.value)));
    };

    render() {
        return (
            <div className="container">
                {this.props.error && <FlashMessage message={this.props.error} />}
                <div className="main-content">
                    <Header
                        projects={this.props.projects}
                        onCurrentProjectChange={this.onCurrentProjectChange}
                    />
                    <TaskPage tasks={this.props.tasks}
                              onCreateTask={this.onCreateTask}
                              onEditTask={this.onEditTask}
                              onDeleteTask={this.onDeleteTask}
                              onSearch={this.onSearch}
                              isLoading={this.props.isLoading}
                              currentProjectId={this.props.currentProjectId}
                    />
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    const { isLoading, error } = state.projects;
    const { currentProjectId } = state.page;
    return {
        tasks: getGroupedByStatus(state),
        projects: getProjects(state),
        isLoading,
        error,
        currentProjectId,
    };
}

export default connect(mapStateToProps)(App);
