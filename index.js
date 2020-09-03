/**
 * @format
 */

import 'react-native-gesture-handler';
import {AppRegistry, Dimensions} from 'react-native';
import App from './App';
import {name as appName} from './app.json';


import EStyleSheet from 'react-native-extended-stylesheet';

let {height, width} = Dimensions.get('window');
const wid = width<height? width:height

EStyleSheet.build({
  $rem: wid/360,
  // $theme1: '#ff5151',
  // $theme2:'#00a8cc'
  $theme1: '#4dd6c2',
  $theme2:'#00bbf0'
});

console.disableYellowBox = true;

AppRegistry.registerComponent(appName, () => App);
