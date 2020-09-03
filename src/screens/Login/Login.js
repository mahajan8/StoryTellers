import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import Input from '../../components/Input'
import Header from '../../components/headerLogo'
import * as Validations from '../../util/Validations'
import * as Storage from '../../APIs/AsyncStore'
import commonStyles from '../../util/commonStyles';
import strings from '../../util/strings';
import Loader from '../../components/Loader'
import { connect } from 'react-redux'
import types from '../../types';


dp = (size) => EStyleSheet.value(size+'rem')

const callback = (msg) => {
    alert(JSON.stringify(msg))
}
  
class Login extends Component {

    constructor(props) {
        super(props)
        this.state={
            email: 'test1@gmail.com',
            password: '123456',
            rememberCheck: false
        }
    }

    componentDidMount() {
        Storage.getData('email').then(email=>{
            if(email) 
                this.setState({email})
        })
    }

    login() {
        const { email, password, rememberCheck } = this.state

        if(Validations.isAnyFieldEmpty([email, password])) {
            alert(strings.fillFields)
        } else {

            if(rememberCheck) {
                Storage.saveData('email', email)
            }

            let pars = {
                email: this.state.email,
                password: this.state.password
            }
    
            this.props.login(pars)
        }

        
    }

    render() {
        return (
        <Header>
            <Text style={commonStyles.heading} >{strings.signIn.toUpperCase()}</Text>

            <Input label={strings.email} prefix='' fnc={(email)=>this.setState({email})} value={this.state.email} />

            <Input label={strings.password} prefix='' fnc={(password)=>this.setState({password})} value={this.state.password} pass />

            <View style={{flexDirection: 'row', marginTop:dp(10), alignItems:'center', justifyContent:'space-between'}} >
                <View style={{flexDirection:'row', alignItems:'center'}} >
                    <TouchableOpacity onPress={()=>this.setState({rememberCheck: !this.state.rememberCheck})} >
                        <Image style={{width:dp(20), height: dp(20), resizeMode:'contain'}} source={this.state.rememberCheck?Images.checkbox:Images.uncheck} />
                    </TouchableOpacity>

                    <Text style={{marginLeft:dp(10)}} >{strings.remember}</Text>
                </View>

                <Text onPress={()=>this.props.navigation.navigate('ForgotPassword')} style={{color:EStyleSheet.value('$theme2')}} >{strings.forgot}</Text>
                
            </View>

            <Button label='SIGN IN' onPress={()=>this.login()} />

            <Text style={{alignSelf:'center', marginTop:dp(15)}} >{strings.newUser}
                <Text onPress={()=>this.props.navigation.navigate('SignUp')} style={{color:EStyleSheet.value('$theme2')}}>
                    {strings.signUp}
                </Text>
            </Text>

            <Loader show={this.props.loading} />

        </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.loginReducer.loading
})
  
const mapDispatchToProps = (dispatch) => ({
    login: (pars) => dispatch({
        type: types.GET_LOGIN,
        pars: pars,
        cb: callback
    })
})
  
export default connect(mapStateToProps, mapDispatchToProps)(Login)