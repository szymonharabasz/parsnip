let _id = 1;

export function uniqueId() {
    return _id++;
}

export function createTask({ title, description }) {
    return {
        type: 'CREATE_TASK',
        payload: {
            id: uniqueId(),
            title,
            description,
            status: 'Unstarted',
        }
    };
}

export function setStatus({ id, newStatus }) {
    console.log('setStatus: id, newStatus ', id, newStatus)
    return {
        type: 'SET_STATUS',
        payload: {
            id,
            newStatus
        }
    };
}