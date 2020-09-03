import { all, fork} from 'redux-saga/effects';

import { watchLogin, watchSignUp } from './authSaga';
import { watchProfile, watchEditProfile, watchChangePassword } from './profileSaga';
import { watchCategories, watchSupport } from './resourcesSaga';
import { watchAddStory, watchGetStories, watchAddStoryReply, watchGetMyStories, watchToggleFav } from './storySaga';

export function* rootSaga () {
  yield all([
    fork(watchLogin),
    fork(watchSignUp),

    fork(watchProfile),
    fork(watchEditProfile),
    fork(watchChangePassword),
    
    fork(watchAddStory),
    fork(watchAddStoryReply),
    fork(watchGetStories),
    fork(watchGetMyStories),
    fork(watchToggleFav),


    fork(watchCategories),
    fork(watchSupport),
  ]);
};