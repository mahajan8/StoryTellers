import types from "../types";

const initialState = {
    categories: []
}

export const resourcesReducer = (state = initialState, action ) => {
    switch(action.type) {
        case types.GET_CATEGORIES_SUCCESS: 
            return {
                ...state,
                categories: action.data
            }
        default:
            return state
    }
}