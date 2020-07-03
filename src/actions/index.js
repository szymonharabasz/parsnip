import * as api from '../api';
import { CALL_API } from '../middleware/api.js';

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
        meta: {
            analytics: {
                event: 'create_task',
                data: {
                    id: task.id,
                }
            }
        }
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

export const FETCH_TASKS_STARTED = 'FETCH_TASKS_STARTED';
export const FETCH_TASKS_SUCCEEDED = 'FETCH_TASKS_SUCCEEDED';
export const FETCH_TASKS_FAILED = 'FETCH_TASKS_FAILED';

export function fetchTasks() {
    return {
        [CALL_API]: {
            types: [FETCH_TASKS_STARTED, FETCH_TASKS_SUCCEEDED, FETCH_TASKS_FAILED],
            endpoint: '/tasks',
        },
    };
}