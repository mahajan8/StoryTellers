
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import Api from '../APIs/Api'
import Config from '../APIs/ApiConfig'
import types from '../types';
import * as Storage from '../APIs/AsyncStore'

function* login(action) {

    const {pars, cb} = action
    try {
        const response = yield call(new Api().postJSON, Config.login, pars )
        if(response.status) {
            Storage.saveData('userId', JSON.stringify(response.response.userid))
            yield put({type: types.LOGIN_SUCCESS})
        } else {
            cb(response.message)
            yield put({type: types.LOGIN_FAILURE})
        }
        
    } catch (err) {
        cb('Something went wrong')
        yield put({type: types.LOGIN_FAILURE})
    }
}

function* signUp(action) {

    const {pars, res, rej} = action
    try {
        const response = yield call(new Api().postJSON, Config.signup, pars )
        if(response.status) {
            Storage.saveData('userId', JSON.stringify(response.response.userid))
            yield put({type: types.LOGIN_SUCCESS})
        } else {
            rej(response.message)
        }
        
    } catch (err) {
        rej('Something went wrong')
    }
}



export function* watchLogin() {
    yield takeLatest(types.GET_LOGIN, login)
}

export function* watchSignUp() {
    yield takeLatest(types.REGISTER, signUp)
}

