import React, { Component, useState, useEffect } from 'react'
import { Text, View, TextInput, Animated, Image, TouchableOpacity,Platform } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import commonStyles from '../util/commonStyles';
dp = (size) => EStyleSheet.value(size+'rem')

const key = 'AIzaSyA9Eae9mmycq4_u4TcWCctl6jk1MR9yfQE'


const Input = (props) => {

        const [focused, setFocus] = useState(false)
        const [secure, setSecure] = useState(true)

        const [anim] = useState(new Animated.Value(0))

        useEffect(()=>{
            Animated.timing(anim,{
                toValue:focused?1:0,
                duration:300,
                delay:200,
                useNativeDriver:false
            }).start()
        },[focused])


        let underline = anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        });

        let move = anim.interpolate({
            inputRange: [0, 1],
            outputRange: [dp(5), dp(-8)],
        });

        const eye = 
        <TouchableOpacity style={{width:'10%', alignItems:'center', justifyContent:'center', alignSelf:'center' }} onPress={()=>setSecure(!secure)} > 
            <Image source={secure?Images.hide:Images.view} style={{width:dp(20), height:dp(20), resizeMode:'contain'}} />
        </TouchableOpacity>

        const { label, prefix, value, fnc, pass, comp, showLabel, long, edit = true } = props

        return (
            <View style={[Styles.borderBottom,{marginTop:dp(12)}, long? {borderWidth:0.5, borderColor: focused? EStyleSheet.value('$theme1'): null}: null]} >
            
                <View style={{flexDirection:pass||comp?'row':'column', justifyContent:'space-between', alignItems:pass||comp?'center':null }} >
                    <TextInput 
                        placeholder={long && label}
                        value={value} 
                        onChangeText={(text)=>{
                            fnc(text)
                        }} 
                        style={[Styles.textInput,{width:pass||comp?'90%':'100%',fontSize:focused?dp(14):dp(13), fontFamily: 'Futura', color:edit?'#000':'#909090'}, Platform.OS=='android'? {paddingVertical:0, paddingHorizontal:0} : null, long? {height:long, textAlignVertical:'top', paddingHorizontal: dp(4)} : null ]} 
                        
                        onFocus={()=>{setFocus(true);}} placeholderTextColor='#6D7278' 
                        onBlur={()=>{setFocus(false);anim.setValue(0) }} 
                        maxLength={pass?15:props.max} 
                        keyboardType={props.num?'number-pad':'ascii-capable'} 
                        secureTextEntry={pass||props.secure?secure:false}
                        editable={edit}
                        multiline={props.multiline?true:false}
                    />

                    {pass?eye:null}
                    {comp?
                        <TouchableOpacity onPress={()=>props.onCompPress()} >
                            <Image source={comp} style={{width:dp(15), height:dp(15), resizeMode:'contain'}} />
                        </TouchableOpacity>
                    :null}
                </View>

                <Animated.View style={{zIndex:10, position:'absolute', bottom:-1, height:1, width:underline,backgroundColor:EStyleSheet.value('$theme1') }} />

                {!long && <Animated.Text style={{position:'absolute', top:(showLabel || value!='' )?dp(-8): move, zIndex:-5, color:value!=''?EStyleSheet.value('$theme1'): null}} >
                {label}
                </Animated.Text>}
            </View>
        )
    
}

const Styles = EStyleSheet.create({
    textInput: {
        marginTop:'2rem',
        paddingVertical:'4rem',
    },
    inputLabel: {
        color:'$theme1', 
        fontSize:'13rem',
        fontWeight:'500'
    },
    borderBottom: {
        borderBottomColor: '#E1E3E3', 
        borderBottomWidth:1
    }
})

export default Input
