import React, { Component } from 'react';
import { TASK_STATUSES } from './TaskPage';

class StatusSelector extends Component {

    onStatusChange = (e) => {
        this.props.onStatusChange(e.target.value);
    };

    render() {
        return (
            <div>
                <select value={this.props.status} onChange={this.onStatusChange}>
                    {TASK_STATUSES.map(status =>
                        <option key={status}>{status}</option>
                    )}
                </select>
            </div>
        );
    };

}

export default StatusSelector;