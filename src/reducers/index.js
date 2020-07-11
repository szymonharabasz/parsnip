import {createSelector} from 'reselect';
import {TASK_STATUSES} from "../App";

const initialState = {
    items: [],
    isLoading: false,
    error: null,
};

const initialPageState = {
    currentProjectId: null,
    searchTerm: '',
};

const initialTasksState = {
    items: [],
    isLoading: false,
    error: null,
};

const getSearchTerm = state => state.page.searchTerm;

export const getTasksByProjectId = state => {
    const { currentProjectId } = state.page;

    if (!currentProjectId || !state.projects.items[currentProjectId]) {
        return [];
    }

    const taskIds = state.projects.items[currentProjectId].tasks;

    return taskIds.map(id => state.tasks.items[id]);
};

export const getFilteredTasks = createSelector(
    [getTasksByProjectId, getSearchTerm],
    (tasks, searchTerm) => {
        return tasks.filter(task => task.title.match(new RegExp(searchTerm, 'i')));
    }
);

export const getGroupedByStatus = createSelector(
    [getFilteredTasks],
    tasks => TASK_STATUSES.map(status => {
        return {status: status, tasks: tasks.filter(task => task.status === status)}
    })
);

export const getProjects = createSelector(
    [state => state.projects],
    projects => {
        return Object.keys(projects.items).map(id => {
            return projects.items[id];
        });
    });



export function tasks(state = initialTasksState, action) {

    console.log(action);

    switch (action.type) {
        case 'RECEIVE_ENTITIES': {
            const { entities } = action.payload;
            if (entities && entities.tasks) {
                return {
                    ...state,
                    isLoading: false,
                    items: entities.tasks,
                }
            }

            return state;
        }
        case 'CREATE_TASK_SUCCEEDED': {
            const { task } = action.payload;
            const nextTasks = {
                ...state.items,
                [task.id]: task,
            };
            return {
                ...state,
                items: nextTasks,
            };
        }
        case 'EDIT_TASK_SUCCEEDED': {
            const { task } = action.payload;
            const nextTasks = {
                ...state.items,
                [task.id]: task,
            };
            return {
                ...state,
                items: nextTasks,
            };
        }
        case 'DELETE_TASK_SUCCEEDED': {
            const {taskId} = action.payload;
            const nextTasks = Object.keys(state.items)
                .filter(id => id !== taskId)
                .map(id => {
                    return { [id]: state.items[id] };
                })
                .reduce((accumulator, current) => Object.assign({}, accumulator, current));
            const result = {
                ...state,
                items: { ...nextTasks },
            };
            return result;
        }
        case 'TIMER_INCREMENT': {
            const {taskId} = action.payload;
            const task = state.items[taskId];

            return {
                ...state,
                items: {
                    ...state.items,
                    [taskId]: {
                        ...task,
                        timer: task.timer + 1
                    }
                }
            };
        }
        default: {
            return state;
        }
    }
}

export function projects(state = initialState, action) {
    switch (action.type) {
        case 'RECEIVE_ENTITIES': {
            const { entities } = action.payload;
            if (entities && entities.projects) {
                return {
                    ...state,
                    isLoading: false,
                    items: entities.projects
                };
            }

            return state;
        }
        case 'FETCH_PROJECTS_STARTED': {
            return {
                ...state,
                isLoading: true
            }
        }
        case 'FETCH_PROJECTS_SUCCEEDED': {
            return {
                ...state,
                isLoading: false,
                items: action.payload.projects
            }
        }
        case 'CREATE_TASK_SUCCEEDED': {
            const { task } = action.payload;
            const project = state.items[task.projectId];
            return {
                ...state,
                items: {
                    ...state.items,
                    [task.projectId]: {
                        ...project,
                        tasks: project.tasks.concat(task.id)
                    }
                }
            };
        }
        case 'DELETE_TASK_SUCCEEDED': {
            const {taskId, projectId} = action.payload;
            const project = state.items[projectId];
            const nextTasks = project.tasks.filter(id => taskId !== id);
            const nextState =  {
                ...state,
                items: {
                    ...state.items,
                    [projectId]: {
                        ...project,
                        tasks: nextTasks
                    }
                }
            };
            return nextState;
        }
        default: {
            return state;
        }
    }
}

export function page(state = initialPageState, action) {
    switch (action.type) {
        case 'SET_CURRENT_PROJECT_ID': {
            return {
                ...state,
                currentProjectId: action.payload.id
            }
        }
        case 'FILTER_TASKS': {
            return {
                ...state,
                searchTerm: action.payload.searchTerm
            }
        }
        default: {
            return state;
        }
    }
}