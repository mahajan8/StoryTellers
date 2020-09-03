import types from "../types";

const initialState = {
    loading:false,
    userDetails: {},
    profileFetched: false,
    changeLoading: false
}

export const profileReducer = (state = initialState, action ) => {
    switch(action.type) {
        case(types.GET_PROFILE): 
            return {
                ...state,
                loading:true
            }
        case(types.PROFILE_SUCCESS):
            return {
                ...state,
                loading: false,
                userDetails: action.data,
                profileFetched: true
            }
        case (types.CHANGE_PASSWORD_SUCCESS) :
            return {
                ...state,
                loading: false,
            }
        case(types.PROFILE_FAILURE):
            return {
                ...state,
                loading:false
            }
        case types.CHANGE_PASSWORD: 
            return {
                ...state,
                changeLoading: true
            }
        case types.CHANGE_PASSWORD_COMPLETE:
            return {
                ...state,
                changeLoading: false
            }
        case types.LOGOUT:
            return state=initialState
        default:
            return state
    }
}