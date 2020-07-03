const initialState = {
    tasks: [],
    isLoading: false,
    error: null,
};

export default function tasks(state = initialState, action) {
    switch (action.type) {
        case 'FETCH_TASKS_STARTED': {
            return {
                ...state,
                isLoading: true,
            };
        }
        case 'FETCH_TASKS_SUCCEEDED': {
            const newState = {
                ...state,
                isLoading: false,
                tasks: action.payload
            };
            return newState;
        }
        case 'FETCH_TASKS_FAILED': {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        }
        case 'CREATE_TASK_SUCCEEDED': {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload)
            };
        }
        case 'CREATE_TASK_FAILED': {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        }
        case 'EDIT_TASK_SUCCEEDED': {
            const { payload } = action;
            const nextTasks = state.tasks.map(task => {
                    if (task.id === payload.id) {
                        return payload;
                    } else {
                        return task;
                    }
                });
            return {
                ...state,
                tasks: nextTasks,
            };
        }
        case 'EDIT_TASK_FAILED': {
            return {
                ...state,
                isLoading: false,
                error: action.error,
            }
        }
        default: {
            return state;
        }
    }
}