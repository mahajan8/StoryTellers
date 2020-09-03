import types from "../types";

const initialState = {
    isChecking: true,
    loggedIn: false,
    loading:false
}

export const loginReducer = (state = initialState, action ) => {
    switch(action.type) {
        case(types.GET_LOGIN): 
            return {
                ...state,
                loading:true
            }
        case(types.LOGIN_SUCCESS):
            return {
                ...state,
                loggedIn: true,
                loading:false,
            }
        case(types.LOGIN_FAILURE):
            return {
                ...state,
                loading:false
            }
        case types.SET_USER:
            return {
                ...state,
                isChecking: false,
                loggedIn: action.data,
            }
        case types.LOGOUT:
            return initialState
        default:
            return state
    }
}