import { combineReducers } from 'redux';

import * as loginReducer from './loginReducer'
import * as profileReducer from './profileReducer'
import * as resourcesReducer from './resourcesReducer'
import * as storyReducer from './storyReducer'
import * as testReducer from './testReducer'

export default combineReducers(Object.assign(
    loginReducer,
    profileReducer,
    resourcesReducer,
    storyReducer,
    testReducer
));