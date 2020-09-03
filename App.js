/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */
import React, {useEffect} from 'react';
import {
  SafeAreaView,
  Text,
  Dimensions
} from 'react-native';
import { useScreens } from 'react-native-screens';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reducer from './src/reducers'
import NavigationService from "./src/NavigationService";
import Nav from './src/navigator'
import createSagaMiddleware from 'redux-saga';
import {rootSaga} from './src/sagas/index'

const saga = createSagaMiddleware()

const store = createStore(reducer,applyMiddleware(saga));

saga.run(rootSaga)

const height = Dimensions.get('window').height;

const App: () => React$Node = () => {

  useEffect(() => {
    let oldRender = Text.render;
    Text.render = function (...args) {
      let origin = oldRender.call(this, ...args);
      let style = origin.props.style
      return React.cloneElement(origin, {
          style: [{fontFamily: style? (style.fontWeight>=500 || style.fontWeight=='bold') ?'Futura-Bold':'Futura':'Futura'}, origin.props.style]
      });
    };
  }, []);


  return (
    <SafeAreaView style={{heigh:height, flex:1, backgroundColor:'#FFF'}}>
        
        <Provider store={store} >
          <Nav ref={navigatorRef => {
            NavigationService.setTopLevelNavigator(navigatorRef);
          }}  />
        </Provider>
      </SafeAreaView>
  );
};


export default App;
