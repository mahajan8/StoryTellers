import React, { Component } from 'react'
import { Text, View, Animated, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import DateTimePicker from "react-native-modal-datetime-picker";
dp = (size) => EStyleSheet.value(size+'rem')

export default class DatePick extends Component {

    constructor(props) {
        super(props)
        this.anim = new Animated.Value(0)
        this.state = {
            focused:false,
            show: false
        }
    }

    underLine() {
        Animated.timing(this.anim,{
            toValue:1,
            duration:300,
            delay:200
        }).start()
    }

    render() {

        underline = this.anim.interpolate({
            inputRange: [0, 1],
            outputRange: ['0%', '100%'],
        });

        const { label, date } = this.props


        return (
            <View style={{marginBottom:dp(15),borderBottomColor: date==''?'#E1E3E3':EStyleSheet.value('$theme1'), borderBottomWidth:1}} >
            {date!=''?<Text style={Styles.inputLabel} >{label}</Text>:null}
                
                <TouchableOpacity activeOpacity={1} style={{width:'100%', flexDirection:'row', justifyContent:'space-between', alignItems:'center'}} onPress={()=> {
                    this.setState({show:true})
                    }} >
                    <Text style={Styles.textInput} >
                    {date==''?label:date}
                    </Text>
                    <Image source={Images.calender} style={{width:dp(15), height:dp(15), resizeMode:'contain', marginRight:dp(5)}} />
                </TouchableOpacity>

                    <DateTimePicker
                        isVisible={this.state.show}
                        onConfirm={(data)=>{
                            console.log(data)
                            let date = String(data)
                            let splits = date.split(data.getFullYear())
                            splits[0]+=data.getFullYear()
                            this.props.onSelect(splits)
                            this.setState({show:false})
                        }}
                        onCancel={()=>this.setState({show:false})}
                        mode='datetime'
                    />
            </View>
        )
    }
}

const Styles = EStyleSheet.create({
    textInput: {
        marginTop:'5rem',
        paddingVertical:'4rem',
        fontSize:'12rem'
    },
    inputLabel: {
        color:'$theme1', 
        fontSize:'13rem'
    },
    borderBottom: {
        borderBottomColor: '#E1E3E3', 
        borderBottomWidth:1
    }
})
