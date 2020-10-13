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
import NavigationService from "./src/NavigationService";
import Nav from './src/navigator'
import { PersistGate } from 'redux-persist/integration/react'
import configureStore from './src/configureStore'
import Loader from './src/components/Loader';

const height = Dimensions.get('window').height;

const { store, persistor } = configureStore()

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
          <PersistGate loading={<Loader/>}
            persistor={persistor}>

              <Nav ref={navigatorRef => {
                NavigationService.setTopLevelNavigator(navigatorRef);
              }}  />

          </PersistGate>
        </Provider>
      </SafeAreaView>
  );
};


export default App;
