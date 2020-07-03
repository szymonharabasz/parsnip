import * as api from '../api';

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

function fetchTasksStarted() {
    return {
        type: 'FETCH_TASKS_STARTED',
    }

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
        dispatch(fetchTasksStarted());
        api.fetchTasks()
            .then(resp => {
                setTimeout(() => {
                    dispatch(fetchTasksSucceeded(resp.data));
                }, 2000);
            })
            .catch(err => {
                dispatch(fetchTasksFailed(err.message));
            });
    };
}

function fetchTasksFailed(error) {
    return {
        type: 'FETCH_TASKS_FAILED',
        payload: {
            error,
        },
    };
}