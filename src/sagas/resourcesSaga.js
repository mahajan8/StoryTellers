
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import Api from '../APIs/Api'
import Config from '../APIs/ApiConfig'
import types from '../types';

function* getCategories() {

    try {
        // alert('here')
        const response = yield call(new Api().getJSON, Config.getCategories )
        if(response.status) {
            console.log(response)
            yield put({type: types.GET_CATEGORIES_SUCCESS, data: response.response})
        } else {
            alert(response.message)
        }
    } catch (err) {
        alert('Something went wrong')
    }
}

function* submitSupport(action) {

    const {pars, res, rej} = action

    try {
        
        const response = yield call(new Api().postJSON, Config.support, pars )

        res(response.message)
        
    } catch (err) {
        yield put({type: types.ADD_STORY_FAILED})
        rej('Something went wrong')
    }
}

export function* watchCategories() {
    yield takeLatest(types.GET_CATEGORIES, getCategories)
}

export function* watchSupport() {
    yield takeLatest(types.SUBMIT_SUPPORT, submitSupport)
}
