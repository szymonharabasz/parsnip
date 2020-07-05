import * as api from '../api';

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function createTask({ title, description, status = 'Unstarted', timer = 0 }) {
    return dispatch => {
        api.createTask({ title, description, status, timer }).then(resp => {
            dispatch(createTaskSucceeded(resp.data));
        });
    };
}

export function deleteTaskSucceeded(id) {
    return {
        type: 'DELETE_TASK_SUCCEEDED',
        payload: {
            id,
        },
    };
}

export function deleteTask(id) {
    return dispatch => {
        api.deleteTask(id).then(resp => {
            dispatch(deleteTaskSucceeded(id));
            dispatch(progressTimerStop(id))
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

function getTaskById(tasks, id) {
    tasks.find(task => task.id === id);
}

export function editTask(params) {
    const { id } = params;
    console.log('in actions/editTask: ', id, params);
    return (dispatch, getState) => {
        const task = getTaskById(getState().tasks.tasks, id);
        const updatedTask = {
            ...task,
            ...params
        };
        api.editTask(id, updatedTask).then(resp => {
            dispatch(editTaskSucceeded(resp.data));
            if (resp.data.status === 'In Progress') {
                dispatch(progressTimerStart(resp.data.id));
            } else {
                dispatch(progressTimerStop(resp.data.id));
            }
        });
    };
}

export function fetchTasks() {
    return { type: 'FETCH_TASKS_STARTED' };
}

export function filterTasks(searchTerm) {
    return { type: 'FILTER_TASKS', payload: { searchTerm } };
}

function progressTimerStart(taskId) {
    return { type: 'TIMER_STARTED', payload: { taskId } };
}

function progressTimerStop(taskId) {
    console.log("progressTimerStop, ", taskId);
    return { type: 'TIMER_STOPPED', payload: { taskId } };
}