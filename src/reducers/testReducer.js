import types from "../types";

const initialState = {
    count : 0
}

export const testReducer = (state = initialState, action ) => {
    switch(action.type) {
        case 'INC': 
            return {
                ...state,
                count : state.count + 1
            }
        default:
            return state
    }
}