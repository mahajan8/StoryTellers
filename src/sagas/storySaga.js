
import { takeEvery, takeLatest, put, call } from 'redux-saga/effects';
import Api from '../APIs/Api'
import Config from '../APIs/ApiConfig'
import types from '../types';
import * as Storage from '../APIs/AsyncStore'

function* addStory(action) {

    const {pars, res, rej} = action

    try {

        const response = yield call(new Api().postJSON, Config.addStory, pars )
        
        res(response.message)

        if(response.status) {
            yield put({type: types.GET_STORIES})
        } else {
            yield put({type: types.ADD_STORY_FAILED})
        }
        
    } catch (err) {
        yield put({type: types.ADD_STORY_FAILED})
        rej('Something went wrong')
    }
}

function* addStoryReply(action) {

    const {pars, res, rej} = action

    try {

        const response = yield call(new Api().postJSON, Config.addStoryReply, pars )

        res(response.message)

        if(response.status) {
            yield put({type: types.GET_STORIES})
        } else {
            yield put({type: types.ADD_STORY_FAILED})
        }
        
    } catch (err) {
        yield put({type: types.ADD_STORY_FAILED})
        rej('Something went wrong')
    }
}

function* getStories(action) {

    try {

        let {pars = {}} = action

        let categories = {}

        if(pars.categories) {
            pars.categories.map((item, index)=>{
                Object.assign(categories,{[`categories[${index}]`]:item})      
            })

            delete pars.categories

            pars = {
                ...pars,
                ...categories
            }
        }
        
        const response = yield call(new Api().postJSON, Config.getStories, pars )
        if(response.status) {
            yield put({type: types.GET_STORIES_SUCCESS, data: response.response})
        } else {
            yield put({type: types.GET_STORIES_FAILURE})
            alert(response.message)
        }
    } catch (err) {
        yield put({type: types.GET_STORIES_FAILURE})
        alert('Something went wrong')
    }
}

function* getMyStories() {

    try {
        
        const response = yield call(new Api().postJSON, Config.getMyStories )
        if(response.status) {
            yield put({type: types.GET_MY_STORIES_SUCCESS, data: response.response})
        } else {
            yield put({type: types.GET_STORIES_FAILURE})
            console.log(response.message)
        }
    } catch (err) {
        yield put({type: types.GET_STORIES_FAILURE})
        alert('Something went wrong')
    }
}

function* toggleFav(action) {

    try {

        const  { pars } = action
        
        const response = yield call(new Api().postJSON, Config.toggleFavorite, pars )
        if(response.status) {
            yield put({type: types.GET_PROFILE})
        } else {
            alert(response.message)
        }
    } catch (err) {
        alert('Something went wrong')
    }
}

export function* watchAddStory() {
    yield takeLatest(types.ADD_STORY, addStory)
}

export function* watchAddStoryReply() {
    yield takeLatest(types.ADD_TO_STORY, addStoryReply)
}

export function* watchGetStories() {
    yield takeLatest(types.GET_STORIES, getStories)
}

export function* watchGetMyStories() {
    yield takeLatest(types.GET_MY_STORIES, getMyStories)
}

export function* watchToggleFav() {
    yield takeLatest(types.TOGGLE_FAV, toggleFav)
}

