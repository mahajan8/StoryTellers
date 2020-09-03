import React, { Component } from 'react'
import { Text, View, ImageBackground, Image } from 'react-native'
import * as Storage from '../../APIs/AsyncStore'
import EStyleSheet from 'react-native-extended-stylesheet';
import Input from '../../components/Input';
import Header from '../../components/Header';
import strings from '../../util/strings';
import Button from '../../components/Button';
import * as Validations from '../../util/Validations';
import Loader from '../../components/Loader'
import CustomAlert from '../../components/CustomAlert'
import { connect } from 'react-redux'
import types from '../../types';

dp = (size) => EStyleSheet.value(size+'rem')

class ChangePassword extends Component {

    constructor(props) {
        super(props)

        this.state ={
            password:'',
            newPassword:'',
            confirmPassword:'',
        }
    }

    changePassword() {

        const { password, newPassword, confirmPassword } = this.state

        const {params} = this.props.route

        let fields = [newPassword, confirmPassword]

        if(!params) {
            fields.push(password)
        }

        if(!Validations.isMinLength(newPassword, 6)) {
            alert(strings.validPassword)
        } else if(Validations.isAnyFieldEmpty(fields)) {
            alert(strings.fillFields)
        } else if(newPassword!=confirmPassword) {
            alert(strings.passwordMatch)
        } else {

            let pars = {
                newPassword: newPassword
            }

            if(!params) {
                pars = {
                    ...pars, 
                    password: password
                }
            } else {
                pars = {
                    ...pars,
                    userId: params.user,
                    reset: true
                }
            }

            new Promise((resolve, reject)=>this.props.changePassword(pars, resolve, reject)) 
            .then(msg=>{
                this.customAlert.showAlert(msg)
            })
            .catch(err=>{
                this.customAlert.showError(err)
            })
        }
    }

    render() {
        const {params} = this.props.route
        return (
            <Header title={strings.changePassword} back={this.props.navigation} >

                <View style={{width:'90%', alignSelf:'center', marginTop:dp(10)}} >
                    {params? null : <Input label={strings.password} value={this.state.password} fnc={(password)=>this.setState({password})} pass />}

                    <Input label={strings.newPassword} value={this.state.newPassword} fnc={(newPassword)=>this.setState({newPassword})} pass />

                    <Input label={strings.confirmPassword} value={this.state.confirmPassword} fnc={(confirmPassword)=>this.setState({confirmPassword})} pass />

                    <Button label={strings.changePassword} onPress={()=>this.changePassword()} />
                </View>

                <CustomAlert 
                    onButtonPress={()=>{
                        if(params) {
                            Storage.saveData('userId', JSON.stringify(params.user))
                            this.props.loginSuccess()
                        } else 
                            this.props.navigation.goBack()
                    }}
                    ref={refs=>this.customAlert=refs}
                />

                <Loader show={this.props.loading} />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    loading: state.profileReducer.changeLoading
})
  
const mapDispatchToProps = (dispatch) => ({
    changePassword: (pars, res, rej) => dispatch({
        type: types.CHANGE_PASSWORD,
        pars: pars,
        res: res,
        rej: rej
    }),
    loginSuccess: () => dispatch({
        type: types.LOGIN_SUCCESS
    })
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(ChangePassword)