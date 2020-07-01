import * as api from '../api';

let _id = 1;

export function uniqueId() {
    return _id++;
}

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function createTask({ title, description, status = 'Unstarted' }) {
    return dispatch => {
        api.createTask({ title, description, status }).then(resp => {
            dispatch(createTaskSucceeded(resp.data));
        });
    };
}

export function editTaskSucceeded(params) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            params,
        },
    };
}

export function editTask(params) {
    return dispatch => {
        api.editTask(params).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
        });
    };

}

export function setStatus({ id, newStatus }) {
    return {
        type: 'SET_STATUS',
        payload: {
            id,
            newStatus
        }
    };
}

export function fetchTasksSucceeded(tasks) {
    return {
        type: 'FETCH_TASKS_SUCCEEDED',
        payload: {
            tasks,
        }
    }
}

export function fetchTasks() {
    return dispatch => {
        api.fetchTasks().then(resp => {
                dispatch(fetchTasksSucceeded(resp.data));
            });
    };
}