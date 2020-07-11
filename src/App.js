import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import FlashMessage from './components/FlashMessage';
import Header from './components/Header';
import { filterTasks, fetchProjects } from "./actions";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchProjects());
    }
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

export const TASK_STATUSES = ["Unstarted", "In Progress", "Completed"];
export default connect(mapStateToProps)(App);
