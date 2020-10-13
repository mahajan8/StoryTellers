import { createStore, applyMiddleware } from 'redux';
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' 
import rootReducer from './reducers'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './sagas/index'
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, rootReducer)
const saga = createSagaMiddleware()
 
export default () => {
  let store = createStore(persistedReducer,applyMiddleware(saga));
  let persistor = persistStore(store)
  saga.run(rootSaga)
  return { store, persistor }
}
  

  
  