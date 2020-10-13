import React, { Component } from 'react'
import { Image, TouchableOpacity, Dimensions, View, ScrollView, KeyboardAvoidingView } from 'react-native'
import Images from '../util/images'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles'

const {height, width} = Dimensions.get('window')

const image = [
    Images.getstartedimg1,
]

export default class headerLogo extends Component {
    render() {

        const { back} = this.props

        return (
            <KeyboardAvoidingView style={{flexGrow:1,height:height}} behavior={Platform.OS=='ios'?'padding':'height'} enabled keyboardVerticalOffset={Platform.OS=='android'?80:20} >
                <ScrollView bounces={false} ref={refs=> this.scroll = refs} keyboardShouldPersistTaps='handled' contentContainerStyle={{ flexGrow:1, paddingBottom:dp(50)}} >
                    
                    {back?
                    <TouchableOpacity style={styles.backButton} onPress={()=>back.goBack()} >
                        <Image style={{width:dp(20), height:dp(20), resizeMode:'contain'}} source={Images.backArrow} />
                    </TouchableOpacity>
                    : null
                    }

                    <Image source={Images.logo} style={{ width:dp(200), height:dp(150), alignSelf:'center', borderRadius:25, marginVertical:dp(40)}} />
                
                    <View style={[styles.container, commonStyles.shadow]} >
                        {this.props.children}
                    </View>
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = EStyleSheet.create({
    backButton: {
        position:'absolute', 
        left:0, 
        top:'15rem', 
        backgroundColor:'$theme1', 
        borderTopRightRadius:25, 
        borderBottomRightRadius:25, 
        padding:'12rem', 
        zIndex:10
    },
    container: {
        backgroundColor:'#FFF',  
        // borderTopLeftRadius:50, 
        // borderTopRightRadius:50, 
        padding:'20rem', 
        minHeight:'50%', 
        width:'90%',
        alignSelf: 'center',
        borderRadius: 30,
        marginBottom: '50rem'
    },
})
