import React, { Component, useState, useEffect } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/Header'
import ListItem from '../../components/StoyListItem'
import types from '../../types';
import Styles from './MyStoryStyles'
import commonStyles from '../../util/commonStyles';
import strings from '../../util/strings';

dp = (size) => EStyleSheet.value(size+'rem')


const MyStories = (props) => {
        // let index = this.props.navigation.dangerouslyGetState().index
        const [index, setIndex] = useState(0)

        useEffect(() => {
            const unsubscribe = props.navigation.addListener('focus', () => {
                setIndex(props.navigation.dangerouslyGetState().index)
            });
        
            return unsubscribe;
        }, [props.navigation]);

        let list = props[index?'favorites':'myStories']

        return (
            <View style={[commonStyles.shadow, Styles.container, {marginVertical:dp(20)}]} >
                {
                    list.length?
                        list.map((item,index)=> {
                            
                            return (
                                <View key={`${index?'favorites':'myStories'}${index}`} >
                                    <ListItem 
                                        item={item}
                                        readStory={()=>props.navigation.navigate('StoryRead', {story: item})}
                                    />
                                
                                    {index!=list.length-1 && <View style={[commonStyles.seperator, { width: '80%', alignSelf:'center'}]} />}
                                </View>)
                            }
                        )
                    :
                        <Text style={{fontSize:dp(16), alignSelf:'center', marginVertical:dp(15), paddingHorizontal:dp(20)}} >{index? strings.emptyFavs: strings.emptyStories }</Text>
            }
                
            </View>
        )
}

const mapStateToProps = (state) => ({
    myStories: state.storyReducer.myStories,
    favorites: state.storyReducer.favorites,
    loading: state.storyReducer.loading
})
  
const mapDispatchToProps = (dispatch) => ({
    getStories: () => dispatch({
        type: types.GET_STORIES
    })
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(MyStories)