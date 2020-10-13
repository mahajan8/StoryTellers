import React, { Component } from 'react'
import { View, Text, FlatList, TextInput, Image } from 'react-native'
import { connect } from 'react-redux'
import Loader from '../../components/Loader'
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/Header'
import Api from '../../APIs/Api';
import Config from '../../APIs/ApiConfig';
import Button from '../../components/Button';
import Images from '../../util/images';
import * as Storage from '../../APIs/AsyncStore'
import Styles from './StoryReadStyles';
import strings from '../../util/strings';

dp = (size) => EStyleSheet.value(size+'rem')

class StoryRead extends Component {

    constructor(props) {
        super(props)

        this.state={
            loading: false,
            story: [],
            userId: undefined
        }
    }

    componentDidMount() {

        Storage.getData('userId').then(user=>this.setState({userId: user}))

        this.getStory(true)

        this.parent = this.props.navigation.dangerouslyGetParent()
        
        this.parent.setOptions({
            tabBarVisible: false
        });

        this.unsubscribe = this.props.navigation.addListener('focus', () => {
            this.getStory()
        });
    }

    componentWillUnmount() {
        this.parent.setOptions({
            tabBarVisible: true
        })
        this.unsubscribe()
    }

    getStory(view = false) {

        let {_id} = this.props.route.params.story

        let pars = {
            storyId: _id,
            view: view? 1 : 0
        }

        new Api().postJSON(Config.getStoryDetails,pars)
        .then(obj=>{
            if(obj.status) {
                this.setState({story: obj.response})
            }
        })
    }

    addToStory() {
        let {story} = this.props.route.params

        this.props.navigation.navigate('Add', {story: story, blur: false, refresh: this.getStory })
    }

    checkUser= (user)=> this.state.userId==user

    renderResponse = (story, user, name, profilePic, index) => 
    <View style={[Styles.storyContainer, { alignSelf:user? 'flex-end' : 'flex-start'}]} key={`storyItem${index}`} >
        {user? null : <Image style={[Styles.profilePic, {marginRight:dp(8), marginBottom:dp(5)}]} source={profilePic? {uri: profilePic} : Images.dummyProfile} /> }
    
        <View style={{maxWidth:'75%'}} >

            <View style={[Styles.storyBoxView, user? {borderBottomRightRadius:0, color: '#FFF'} : {borderBottomLeftRadius:0, backgroundColor:'#EEEEEE', color: '#000'}]} >
        
                <Text >{story}</Text>

            </View>

            <Text style={[{fontSize:dp(12), color: '#AAAAAA'}, {textAlign:user? 'right' : 'left' }]} >{user? 'You' : name}</Text>
        </View>

        {user? <Image style={[Styles.profilePic, {marginLeft:dp(8), marginBottom:dp(5)}]} source={profilePic? {uri: profilePic} : Images.dummyProfile} /> : null}
    </View>

    render() {

        const { loading, story } = this.state
        let {title} = this.props.route.params.story

        return (
            <Header title={title} refreshing={loading} onRefresh={()=>this.getStory()} noTab back={this.props.navigation} >
                <View style={{width:'90%', alignSelf:'center'}} >

                    {story.map((item, index)=>
                        this.renderResponse(item.story, this.checkUser(item.userId), item.userInfo.name, item.userInfo.profilePic, index)
                    )}
                </View>

                <Button label={strings.addToStory} gradientStyle={{marginBottom:dp(20)}} onPress={()=>this.addToStory()} />

                <Loader show={loading} />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    
})

const mapDispatchToProps = (dispatch) => ({
    
})

export default connect(mapStateToProps, mapDispatchToProps)(StoryRead)
