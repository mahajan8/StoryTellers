import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Image, Keyboard, Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles';
import Images from '../util/images';
import { connect } from 'react-redux'
import types from '../types'

dp = (size) => EStyleSheet.value(size+'rem')

const tabs = [
    {name: 'Home', image: Images.home, route: 'Home'},
    {name: 'My Stories', image: Images.story, route: 'MyStories'},
    {name: 'Add', image: Images.add, route:'Add' },
    {name: 'Profile', image: Images.profile, route: 'Profile'},
    {name: 'Support', image: Images.support, route: 'Support'},
]

class Bottom extends Component {

    constructor(props) {
        super(props)
        this.state ={
            visible: true
        }
    }

    componentDidMount() {

        if(!this.props.profileFetched) {
            
            this.props.getProfile()
            this.props.getCategories()
            this.props.getStories()
            this.props.getMyStories()
        }

        
        if (Platform.OS === 'android') {
            this.keyShow = Keyboard.addListener('keyboardDidShow', ()=>this.setState({visible: false}))
            this.keyHide = Keyboard.addListener('keyboardDidHide', ()=>this.setState({visible: true}))
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'android') {
            this.keyShow.remove()
            this.keyHide.remove()
        }
    }

    renderTab = (index) => {
        let tab = tabs[index]
        let isActive = this.props.state.index==index?true:false
        return(
        <TouchableOpacity 
            key={'tab'+index}
            activeOpacity={1}
            style={[styles.tab, { borderColor:isActive? '#ff5151':'#FFF',}]} 
            onPress={()=>this.props.navigation.navigate(tab.route)} 
        >
            <Image source={tab.image } style={[index==2? styles.addIcon : styles.tabIcon, {tintColor: isActive? EStyleSheet.value('$theme2') : null}]} />
            
            {index==2? null : <Text style={[styles.tabLabel, { color: isActive? '#333333' : '#6D7278', }]} >{tab.name}</Text>}
        </TouchableOpacity>
        )
    }

    render() {
        if(this.state.visible) 
            return (
                <View style={[commonStyles.shadow, styles.container, ]} >

                    {tabs.map((item, index)=>this.renderTab(index))}
                    
                </View>
            )
        else return null
    }
}

const styles = EStyleSheet.create({
    container :{
        width:'100%',
        flex:1,
        backgroundColor: '#FFF',
        height:'50rem',
        position: 'absolute',
        bottom: 0,
        marginTop:'2rem',
        shadowOffset: { width: 0, height: -5 }, 
        flexDirection:'row',
    },
    tab: {
        flex:1, 
        alignItems: 'center', 
        justifyContent:'center', 
        borderTopWidth:2,
        marginHorizontal:'5rem'
    },
    tabIcon: {
        height:'20rem', 
        width:'20rem', 
        resizeMode:'contain'
    },
    addIcon: {
        height:'25rem', 
        width:'25rem', 
        resizeMode:'contain'
    },
    tabLabel : {
        marginTop:'4rem', 
        fontSize:'12rem'
    },
    counterView: {
        backgroundColor:'$theme1', 
        borderRadius:25, 
        position:'absolute', 
        top:-2, 
        right:-10, 
        width:'16rem', 
        height:'16rem', 
        justifyContent:'center', 
        alignItems:'center'
    }
})

const mapStateToProps = (state) => ({
    profileFetched : state.profileReducer.profileFetched
})
  
  const mapDispatchToProps = (dispatch) => ({
        getCategories: () => dispatch({
            type: types.GET_CATEGORIES
        }),
        getProfile: () => dispatch({
            type: types.GET_PROFILE,
        }),
        getStories: () => dispatch({
            type: types.GET_STORIES
        }),
        getMyStories: () => dispatch({
            type: types.GET_MY_STORIES
        })
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Bottom)