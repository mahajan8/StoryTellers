import React, { Component } from 'react'
import { Text, Image, View, TouchableOpacity, Keyboard } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import LinearGradient from 'react-native-linear-gradient';


dp = (size) => EStyleSheet.value(size+'rem')

const Button = (props) => {

    const { bordered, Style, label, onPress, color, bold, icon, disabled, gradientStyle, iconStyle, invisible } = props

    if(invisible) {
        return <View style={{width: dp(50)}}/>
    } else {
        return (
            <LinearGradient 
                colors={['#35eaba','#4dd6c2', '#5dc6ca']} 
                // colors={['#feb97e','#f69159', '#fd8e72']} 
                start={{x: 0, y: 0}} 
                end={{x: 1, y: 0}} 
                style={[styles.gradient, gradientStyle && gradientStyle]} 
            >
                <TouchableOpacity style={[styles.button, Style?Style:null ,bordered?{borderWidth:1, borderColor:color?color:EStyleSheet.value('$theme2'), backgroundColor:'#FFF'}:{ backgroundColor:color? color : null}, {flexDirection:icon?'row':'column'}]} 
                disabled={disabled}
                onPress={()=>{
                    Keyboard.dismiss()
                    onPress()
                    }} 
                >
                    {icon?<Image source={icon} style={[styles.icon, iconStyle && iconStyle]} />: null}
                    <Text style={{color:(bordered?color?color:EStyleSheet.value('$theme2'):'#FFF'), fontSize:dp(14), fontWeight:bold?'500':'400' }} >{label}</Text>
                </TouchableOpacity>
            </LinearGradient>
        )
    }
    
}

const styles = EStyleSheet.create({
    button: {
        borderRadius: 5,
        paddingVertical:'10rem', 
        justifyContent:'center', 
        alignItems:'center', 
    },
    icon: {
        height:'16rem', 
        width:'16rem', 
        resizeMode:'contain', 
        marginRight:'8rem',
        tintColor: '$theme2'
    },
    gradient: {
        width:'80%', 
        borderRadius: 5, 
        marginTop:'20rem', 
        alignSelf:'center' 
    }
  })

  export default Button