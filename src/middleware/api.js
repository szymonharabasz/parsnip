import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001';

export const CALL_API = 'CALL_API';

function makeCall(endpoint, method = "GET", data = {}) {
    const url = `${API_BASE_URL}${endpoint}`;

    return axios({
        method, url, data, responseType: 'application/json'
    });
}

const apiMiddleware = store => next => action => {
    const callApi = action[CALL_API];
    if (typeof callApi === 'undefined') {
        return next(action);
    }

    const [requestStartedType, successType, failureType] = callApi.types;
    next({type: requestStartedType});

    return makeCall(callApi.endpoint, callApi.method, callApi.data)
        .then(
            response => {
                next({
                    type: successType,
                    payload: response.data,
                })
            })
        .catch(
            error => {
                next({
                    type: failureType,
                    error: error.message,
                })
            }
        );
};

export default apiMiddleware;