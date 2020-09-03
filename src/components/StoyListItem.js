import React from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import commonStyles from '../util/commonStyles';
import { connect } from 'react-redux'
import types from '../types';

dp = (size) => EStyleSheet.value(size+'rem')


const Item = (props) => {

    const {item, readStory, fav, userDetails, toggleFav} = props

    const { favorites = [] } = userDetails

    const category = props.categories.find(obj=>obj._id==item.category)

    return(
        <TouchableOpacity style={[styles.container]} onPress={readStory} >
            <View style={{flexDirection:'row', alignItems:'center'}} >
                <Image source={Images.dummyProfile} style={styles.profilePic} />
                <View style={{width:'65%'}} >
                    <Text style={{fontWeight:'bold', fontSize:dp(16), color: EStyleSheet.value('$theme1')}}>{item.title}</Text>
                    <Text style={{marginVertical:dp(2), color: '#c3c3c3', fontSize:dp(13), color: '#ff5151'}}>{category == undefined? '' : category.name }</Text>
                    <Text numberOfLines={2} style={{width:'80%'}}  >{item.start}</Text>
                    
                    
                </View>

                <View  style={{width:'15%', alignItems:'center'}}>
                    <View style={{flexDirection:'row', alignItems:'center', marginBottom:dp(10)}} >
                        <Image style={{width:dp(10), height: dp(10), resizeMode:'contain'}} source={Images.view} />
                        <Text style={{marginLeft:dp(5), color: '#c3c3c3', fontSize:dp(13)}} >{item.views}</Text>
                    </View>
                    <TouchableOpacity onPress={()=>toggleFav({storyId: Number(item._id)})} >
                        <Image style={{width:dp(20), height:dp(20), resizeMode:'contain'}} source={favorites.includes(item._id)? Images.favenable : Images.favdisable} />
                    </TouchableOpacity>
                </View>
                
            </View>
        </TouchableOpacity>
    )
}

const styles = EStyleSheet.create({
    container: {
        backgroundColor:'#FFF', 
        // width:'90%', 
        alignSelf:'center', 
        paddingHorizontal:'15rem',
        paddingVertical:'10rem',
        // borderRadius: 10,
    },
    profilePic: {
        width:'15%', 
        height:'40rem', 
        borderRadius:'25rem', 
        resizeMode:'contain', 
        marginRight:'15rem',
    }
})


const mapStateToProps = (state) => ({
    loading: state.storyReducer.loading,
    categories: state.resourcesReducer.categories,
    userDetails: state.profileReducer.userDetails
})

const mapDispatchToProps = (dispatch) => ({
    toggleFav: (pars) => dispatch({
        type: types.TOGGLE_FAV,
        pars: pars
    })
})
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Item)