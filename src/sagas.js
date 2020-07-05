import { channel, delay } from "redux-saga";
import { takeLatest, call, put, take } from 'redux-saga/effects';
import * as api from './api';

export default function* rootSaga() {
    yield takeLatest('FETCH_TASKS_STARTED', fetchTasks);
    yield takeLatestById(['TIMER_STARTED', 'TIMER_STOPPED'], handleProgressTimer);
}

function* fetchTasks() {
    try {
        const {data} = yield call(api.fetchTasks);
        yield put({
            type: 'FETCH_TASKS_SUCCEEDED',
            payload: {tasks: data,}
        });
    } catch (e) {
        yield put({
            type: 'FETCH_TASKS_FAILED',
            payload: {error: e.message,}
        });
    }

}

function* handleProgressTimer({ payload, type }) {
    console.log(payload, type)
    if (type === 'TIMER_STARTED') {
        while (true) {
            yield call(delay, 1000);
            yield put({
                type: 'TIMER_INCREMENT',
                payload: {taskId: payload.taskId},
            });
        }
    }
}

function* takeLatestById(actionTypes, saga) {
    const chanelsMap = {};

    while (true) {
        const action = yield take(actionTypes);
        const { taskId } = action.payload;

        console.log("before: ", chanelsMap);
        if (!chanelsMap[taskId]) {
            chanelsMap[taskId] = channel();
            yield takeLatest(chanelsMap[taskId], saga);
        }
        yield put(chanelsMap[taskId], action);

        console.log("after: ", chanelsMap, action);
    }
}