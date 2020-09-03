import React from 'react';
import {
  ActivityIndicator,
  StatusBar,
  View,
} from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import types from '../../types';
// import {setUser} from '../../actions/auth_action'

class AuthLoadingScreen extends React.Component {
  componentDidMount() {
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    const user = await AsyncStorage.getItem('userId');

    this.props.setUser(user? true : false)
    // this.props.navigation.navigate(user ? 'App' : 'Auth');
    
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = (state) => ({
  loggedIn: state.loginReducer.loggedIn,
})

const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => dispatch({
      type: types.SET_USER,
      data: user
    })
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen)