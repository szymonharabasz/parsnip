import React, { Component } from 'react';
import { connect } from 'react-redux';
import TaskPage from './components/TaskPage';
import {createTask, setStatus} from "./actions";

class App extends Component {

    onCreateTask = ({ title, description }) => {
        this.props.dispatch(createTask({ title,description }));
    };
    onSetStatus = ({ id, newStatus }) => {
        console.log('App::onSetStatus: id, newStatus = ', id, newStatus);
        this.props.dispatch(setStatus({ id, newStatus }));
    };

    render() {
        console.log('props from App: ', this.props)
        return (
            <div className="main-content">
                <TaskPage tasks={this.props.tasks}
                          onCreateTask={this.onCreateTask}
                          onSetStatus={this.onSetStatus}
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
