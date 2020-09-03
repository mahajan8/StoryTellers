import types from "../types";

const initialState = {
    loading: false,
    storyList: [],
    myStories: [],
    favorites: []
}

export const storyReducer = (state = initialState, action ) => {
    switch(action.type) {
        case types.ADD_STORY: 
            return {
                ...state,
                loading: true
            }
        case types.ADD_STORY_FAILED:
            return {
                ...state,
                loading: false
            }
        case types.GET_STORIES:
            return {
                ...state,
                loading: true,
            }
        case types.GET_MY_STORIES:
            return {
                ...state,
                loading: true,
            }
        case types.GET_MY_STORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                myStories: action.data.myStories,
                favorites: action.data.favorites,
            }
        case types.GET_STORIES_SUCCESS:
            return {
                ...state,
                loading: false,
                storyList: action.data
            }
        case types.GET_STORIES_FAILURE:
            return {
                ...state,
                loading: false,
            }
        default:
            return state
    }
}