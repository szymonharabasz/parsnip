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
                error: action.payload.error,
            }
        }
        case 'CREATE_TASK_SUCCEEDED': {
            return {
                ...state,
                tasks: state.tasks.concat(action.payload.task)
            };
        }
        case 'EDIT_TASK_SUCCEEDED': {
            const { payload } = action;
            const nextTasks = state.tasks.map(task => {
                    if (task.id === payload.params.id) {
                        return payload.params;
                    } else {
                        return task;
                    }
                });
            return {
                ...state,
                tasks: nextTasks,
            };
        }
        default: {
            return state;
        }
    }
}