import React, { Component } from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import Header from '../../components/headerLogo'
import strings from '../../util/strings';
import commonStyles from '../../util/commonStyles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getImages } from '../../actions/info_actions'

dp = (size) => EStyleSheet.value(size+'rem')

const images = [
    Images.getstartedimg1,
]

let unsubscribe = undefined

class Intro extends Component {

    constructor(props) {
        super(props)
        
    }


    render() {

        const {Introductory} = this.props.images

        return (    
        <Header images={Introductory?Introductory:images} stat={Introductory?false: true} >
            <Text style={commonStyles.heading} >{strings.getStarted}</Text>

            <Text style={{fontSize:dp(13), color:'#6D7278', marginBottom:dp(15), textAlign:'center'}} >A typical Crab Louie salad consists of crab meat, hard boiled eggs, tomato, asparagus, cucumber and is served on a bed of Romaine…</Text>

            <Button label={strings.signUp.toUpperCase()} onPress={()=>this.props.navigation.navigate('SignUp')} />

            <Button label={strings.signIn.toUpperCase()} color='#C6C6C6' onPress={()=>this.props.navigation.navigate('Login')} />

        </Header>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        backgroundColor:'#FFF',  
        borderTopLeftRadius:50, 
        top:'-10%', 
        borderTopRightRadius:50, 
        paddingTop:'40rem', 
        alignItems:'center', 
        paddingHorizontal:'35rem',
    }
})

const mapStateToProps = (state) => ({
    images: state.resourcesReducer.images,
  })
  
  const mapDispatchToProps = (dispatch) => ({
        ...bindActionCreators({ getImages }, dispatch)
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Intro)