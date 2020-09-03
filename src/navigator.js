import React, {useEffect, useState} from 'react';
import { connect } from 'react-redux'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import AuthLoadingScreen from './screens/AuthLoadingScreen/AuthLoadingScreen'
import Home from './screens/Home/Home'
import StoryRead from './screens/StoryRead/StoryRead'
import Test from './screens/Test'
import Profile from './screens/Profile/Profile'
import ChangePassword from './screens/ChangePassword/ChangePassword'
import MyStories from './screens/MyStories/Tabs'
import Add from './screens/Add/Add'
import Support from './screens/Support/Support'

import Login from './screens/Login/Login'
import SignUp from './screens/SignUp/SignUp'
import ForgotPassword from './screens/ForgotPassword/ForgotPassword'

import Bottom from './components/Bottom';

const Stack = createStackNavigator()

const Tab = createBottomTabNavigator();


const HomeStack = () => 
<Stack.Navigator headerMode='none'>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='StoryRead' component={StoryRead}/>
</Stack.Navigator>

const MyStoriesStack = () => 
<Stack.Navigator headerMode='none'>
    <Stack.Screen name='MyStories' component={MyStories}/>
    <Stack.Screen name='StoryRead' component={StoryRead}/>
</Stack.Navigator>

const ProfileStack = () =>
<Stack.Navigator headerMode='none'>
    <Stack.Screen name='Profile' component={Profile} />
    <Stack.Screen name='ChangePassword' component={ChangePassword} />
</Stack.Navigator>


const Tabs = () =>
<Tab.Navigator tabBar={props => <Bottom {...props} />} >
    <Tab.Screen name='Home' component={HomeStack} />
    <Tab.Screen name='MyStories' component={MyStoriesStack} />
    <Tab.Screen name='Add' component={Add} />
    <Tab.Screen name='Profile' component={ProfileStack} />
    <Tab.Screen name='Support' component={Support} />
</Tab.Navigator>

const AuthStack = () => 
<Stack.Navigator headerMode='none'>
    <Stack.Screen name='Login' component={Login} />
    <Stack.Screen name='SignUp' component={SignUp} />
    <Stack.Screen name='ForgotPassword' component={ForgotPassword} />
    <Stack.Screen name='ChangePassword' component={ChangePassword} />
</Stack.Navigator>



const Nav = (props) => {
    
    return (
        <NavigationContainer>
            <Stack.Navigator headerMode='none'>
            {/* <Stack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen} /> */}
                {props.isChecking ? (
                    <>
                        <Stack.Screen name='AuthLoadingScreen' component={AuthLoadingScreen} />
                    </>
                ) : props.loggedIn? (
                    <>
                        <Stack.Screen name='Tabs' component={Tabs} />
                    </>
                ) : (
                    <>
                        <Stack.Screen name='AuthStack' component={AuthStack} />
                    </>
                )}
                
                
            </Stack.Navigator>
        </NavigationContainer>
    )
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loggedIn,
    isChecking: state.loginReducer.isChecking,
})

export default connect(mapStateToProps)(Nav)