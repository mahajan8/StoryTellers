import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { connect } from 'react-redux'
import types from '../types'

const callback = (msg) => {
    alert(JSON.stringify(msg))
}

class Test extends Component {

    login() {
        let pars= {
            email: 'mahajan8sm@gmail.com',
            password: '123456'
        }

        this.props.login(pars)
    }

    render() {
        return (
            <View style={{flex:1, justifyContent:'center', alignItems:'center'}} >
                <Text onPress={()=>this.login()} > Count: {this.props.count} </Text>
            </View>
        )
    }
}

const mapStateToProps = (state) => ({
    count: state.testReducer.count
})
  
const mapDispatchToProps = (dispatch) => ({
    login: (pars, cb) => dispatch({
        type: 'INC',
        pars: pars,
        cb: callback
    })
})


export default connect(mapStateToProps, mapDispatchToProps)(Test)
