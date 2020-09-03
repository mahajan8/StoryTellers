import React, { useEffect } from 'react'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MyStories from './MyStories'
import Header from '../../components/Header'
import { connect } from 'react-redux'
import types from '../../types';
import Loader from '../../components/Loader'

const Tab = createMaterialTopTabNavigator()

const TabScreen = (props) => {

    useEffect(() => {
        const unsubscribe = props.navigation.addListener('focus', () => {
            props.getMyStories()
        });
    
        return unsubscribe;
    }, [props.navigation]);

    return (
        <Header title={'My Stories'} noMargin onRefresh={()=>props.getMyStories()} refreshing={props.loading} >
            <Tab.Navigator sceneContainerStyle={{backgroundColor:'transparent'}} >
                <Tab.Screen name='My Stories' component={MyStories} />
                <Tab.Screen name='Favorites' component={MyStories} />
            </Tab.Navigator>
            
            <Loader show={!props.myStories.length && !props.favorites.length? props.loading : false} />
        </Header>
    )
}



const mapStateToProps = (state) => ({
    myStories: state.storyReducer.myStories,
    favorites: state.storyReducer.favorites,
    loading: state.storyReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
    getMyStories: () => dispatch({
        type: types.GET_MY_STORIES
    })
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(TabScreen)