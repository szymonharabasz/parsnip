import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import {createTask, fetchTasks, editTask} from "./actions";

class App extends Component {

    componentDidMount() {
        this.props.dispatch(fetchTasks());
    }

    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({ title,description }));
    };
    onEditTask = (params) => {
        this.props.dispatch(editTask(params));
    };

    render() {
        return (
            <div className="main-content">
                <TaskPage tasks={this.props.tasks}
                          onCreateTask={this.onCreateTask}
                          onEditTask={this.onEditTask}
                />
            </div>
        );
    }
}

function mapStateToProps(state) {
  return {
    tasks: state.tasks
  }
}

export default connect(mapStateToProps)(App);
