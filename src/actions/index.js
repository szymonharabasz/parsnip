import * as api from '../api';
import { normalize, schema } from 'normalizr';

const taskSchema = new schema.Entity('tasks');
const projectSchema = new schema.Entity('projects', {tasks: [taskSchema]});

function receiveEntities(entities) {
    return {
        type: 'RECEIVE_ENTITIES',
        payload: entities
    };
}

export function createTaskSucceeded(task) {
    return {
        type: 'CREATE_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function createTask({ title, description, projectId, status = 'Unstarted', timer = 0 }) {
    return dispatch => {
        api.createTask({ title, description, status, timer, projectId }).then(resp => {
            dispatch(createTaskSucceeded(resp.data));
        });
    };
}

export function deleteTaskSucceeded(taskId, projectId) {
    return {
        type: 'DELETE_TASK_SUCCEEDED',
        payload: {
            taskId,
            projectId,
        },
    };
}

export function deleteTask(id, projectId) {
    return dispatch => {
        api.deleteTask(id).then(resp => {
            dispatch(deleteTaskSucceeded(id, projectId));
            dispatch(progressTimerStop(id))
        });
    };
}

export function editTaskSucceeded(task) {
    return {
        type: 'EDIT_TASK_SUCCEEDED',
        payload: {
            task,
        },
    };
}

export function editTask(params) {
    const { id } = params;
    return (dispatch, getState) => {
        const task = getState().tasks.items[id];
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

function fetchProjectsStarted(boards) {
    return { type: 'FETCH_PROJECTS_STARTED', payload: { boards } };
}

function fetchProjectsFailed(err) {
    return { type: 'FETCH_PROJECTS_FAILED', payload: { err } };
}

export function fetchProjects() {
    return (dispatch, getState) => {
        dispatch(fetchProjectsStarted());

        return api
            .fetchProjects()
            .then(resp => {
                const projects = resp.data;
                const normalizedData = normalize(projects, [projectSchema]);
                dispatch(receiveEntities(normalizedData));

                if (!getState().page.currentProjectId) {
                    const defautProjectId = projects[0].id;
                    dispatch(setCurrentProjectId(defautProjectId));
                }
            })
            .catch(err => {
                console.error(err);
                dispatch(fetchProjectsFailed(err));
            });
    }
}

export function setCurrentProjectId(id) {
    return { type: 'SET_CURRENT_PROJECT_ID', payload: { id } };
}

function progressTimerStart(taskId) {
    return { type: 'TIMER_STARTED', payload: { taskId } };
}

function progressTimerStop(taskId) {
    return { type: 'TIMER_STOPPED', payload: { taskId } };
}