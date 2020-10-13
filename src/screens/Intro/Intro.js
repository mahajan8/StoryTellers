import React, { Component } from 'react'
import { Text, View } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import strings from '../../util/strings';
import commonStyles from '../../util/commonStyles';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';
import { getImages } from '../../actions/info_actions'

dp = (size) => EStyleSheet.value(size+'rem')

class Intro extends Component {

    constructor(props) {
        super(props)
        
    }


    render() {

        return (    
            <View></View>
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