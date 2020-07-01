export default function tasks(state = { tasks: [] }, action) {

    switch (action.type) {
        case 'CREATE_TASK': {
            return {tasks: state.tasks.concat(action.payload)};
        }
        case 'SET_STATUS': {
            return {
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.id) {
                        return Object.assign({}, task, {status: action.payload.newStatus} );
                    } else {
                        return task;
                    }
                })
            };
        }
        case 'FETCH_TASKS_SUCCEEDED': {
            return {
                tasks: action.payload.tasks
            };
        }
        case 'CREATE_TASK_SUCCEEDED': {
            return {
                tasks: state.tasks.concat(action.payload.task)
            };
        }
        case 'EDIT_TASK_SUCCEEDED': {
            return {
                tasks: state.tasks.map(task => {
                    if (task.id === action.payload.params.id) {
                        return action.payload.params;
                    } else {
                        return task;
                    }
                })
            };
        }
        default: {
            return state;
        }
    }
}