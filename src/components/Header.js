import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, ScrollView, KeyboardAvoidingView, Platform, RefreshControl, Dimensions } from 'react-native'
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles';
import LinearGradient from 'react-native-linear-gradient';

dp = (size) => EStyleSheet.value(size + 'rem')

class Header extends Component {
    constructor(props) {
        super(props)
        this.state = {
            refreshing: false
        }
    }

    render() {

        const { noScroll, onRefresh, refreshing, back, title, onBack, comp, noMargin, noTab } = this.props

        return (
            <KeyboardAvoidingView style={{ flexGrow: 1, height: '100%', backgroundColor:'#F7F7F7'  }} behavior={Platform.OS == 'ios' ? 'padding' : 'height'} enabled={noScroll ? false : true} keyboardVerticalOffset={Platform.OS == 'android' ? 80 : 20} >

                <LinearGradient 
                    colors={['#35eaba','#4dd6c2', '#5dc6ca']} 
                    // colors={['#feb97e','#f69159', '#fd8e72']} 
                    start={{x: 0, y: 0}} 
                    end={{x: 1, y: 0}} 
                    style={[commonStyles.shadow, styles.titleView ]} 
                >

                    <TouchableOpacity onPress={() => {
                        if (onBack)
                            onBack()
                        else
                            back.goBack()
                    }}
                        style={{ }}
                        hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} >
                        
                            {back? <Image source={Images.backArrow} style={[styles.icons, {tintColor:'#FFF'}]} />: null}
                           
                    </TouchableOpacity>
{/* Search View */}
                    <Text style={styles.title} >{title}</Text>
                    

                    <TouchableOpacity onPress={() => {
                        if (onBack)
                            onBack()
                        else
                            console.log('Notifications')
                    }}
                        style={{  }}
                        hitSlop={{ top: 5, left: 5, bottom: 5, right: 5 }} >
                    
                            {/* <Image source={Images.blackBackArrow} style={styles.icons} /> */}
                   
                    </TouchableOpacity>
                
                </LinearGradient>
                {comp ? comp : null}
                <ScrollView contentContainerStyle={{ flexGrow: 1, width: '100%', paddingBottom: noTab? dp(30) : dp(100), marginTop: noMargin ? null : dp(15)}} bounces={onRefresh ? true : false} ref={refs => this.scroll = refs} scrollEnabled={noScroll ? false : true}
                    refreshControl={
                        onRefresh ?
                            <RefreshControl refreshing={refreshing} onRefresh={() => {
                                onRefresh()
                            }} />
                            : null
                    }
                    keyboardShouldPersistTaps={'handled'}
                >
                    {this.props.children}
                </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = EStyleSheet.create({
    icons: {
        height: '20rem',
        width: '20rem',
        resizeMode: 'contain'
    },
    title: {
        fontSize: '16rem',
        color: '#FFF',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    titleView: {
        minHeight: '50rem',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '$theme1',
        marginBottom: 2,
        paddingHorizontal: '15rem',
        shadowOffset:{width: 0, height: 0.5}
    }
})

export default Header