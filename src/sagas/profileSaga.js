
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import Api from '../APIs/Api'
import Config from '../APIs/ApiConfig'
import types from '../types';
import * as Storage from '../APIs/AsyncStore'

function* getProfile() {

    try {

        const response = yield call(new Api().postJSON, Config.getProfile )
        console.log(response)
        if(response.status) {
            yield put({type: types.PROFILE_SUCCESS, data: response.response})
        } else {
            yield put({type: types.PROFILE_FAILURE})
            alert(response.message)
        }
    } catch (err) {
        yield put({type: types.PROFILE_FAILURE})
        alert('Something went wrong')
    }
}

function* editProfile(action) {

    const {pars, cb} = action
    try {

        const response = yield call(new Api().postJSON, Config.editProfile, pars )
        if(response.status) {
            yield put({type:types.GET_PROFILE})
        } else {
            yield put({type: types.PROFILE_FAILURE})
            cb(response.message)
        }
    } catch (err) {
        yield put({type: types.PROFILE_FAILURE})
        cb('Something went wrong')
    }
}

function* changePassword(action) {

    const {pars, res, rej} = action
    try {

        const response = yield call(new Api().postJSON, Config.changePassword, pars )
        if(response.status) {
            yield put({type: types.CHANGE_PASSWORD_COMPLETE})
            res(response.message)
        } else {
            yield put({type: types.CHANGE_PASSWORD_COMPLETE})
            rej(response.message)
        }
    } catch (err) {
        yield put({type: types.CHANGE_PASSWORD_COMPLETE})
        rej('Something went wrong')
    }
}


export function* watchProfile() {
    yield takeLatest(types.GET_PROFILE, getProfile)
}

export function* watchEditProfile() {
    yield takeLatest(types.EDIT_PROFILE, editProfile)
}

export function* watchChangePassword() {
    yield takeLatest(types.CHANGE_PASSWORD, changePassword)
}
