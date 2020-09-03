import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import Input from '../../components/Input'
import Header from '../../components/headerLogo'
import Loader from '../../components/Loader'
import strings from '../../util/strings';
import * as Validations from '../../util/Validations'
import commonStyles from '../../util/commonStyles';
import CustomAlert from '../../components/CustomAlert'
import { connect } from 'react-redux'
import types from '../../types';

dp = (size) => EStyleSheet.value(size+'rem')
  
class SignUp extends Component {

    constructor(props) {
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            confirmPass: '',
            postcode: '',
            termsCheck: false,
            loading: false
        }
    }

    signUp() {

        const { firstName, lastName, email, password, confirmPass, postcode, termsCheck } = this.state

        if(Validations.isAnyFieldEmpty([firstName, lastName, email, password, confirmPass, postcode])) {
            alert(strings.fillFields)
        } else if(!Validations.validateEmail(email)) {
            alert(strings.validEmail)
        } else if(!Validations.isMinLength(password, 6)) {
            alert(strings.validPassword)
        } else if(password != confirmPass) {
            alert(strings.passwordMatch)
        } else if(!termsCheck) {
            alert(strings.termsCheck)
        } else if(!Validations.isMinLength(postcode, 4)) {
            alert(strings.validPostal)
        } else {
            this.setState({loading: true})

            let pars = {
                firstName,
                lastName,
                email,
                postcode,
                password
            }

            new Promise((resolve, reject)=>this.props.register(pars, resolve, reject)) 
            .then(obj=>{
                this.setState({loading: false})
                this.customAlert.showAlert(obj.message, Images.check)
            })
            .catch(err=> {
                this.setState({loading: false})
                this.customAlert.showError(err)
            })
        }
    }

    render() {

        return (
        <Header back={this.props.navigation}>
            <Text style={commonStyles.heading} >{strings.signUp.toUpperCase()}</Text>

            <Text style={{color:'#6D7278', fontSize:dp(13), alignSelf:'center', marginBottom: dp(10)}} >{strings.signUpIntro}</Text>

            <Input label={strings.firstName} prefix='' fnc={(firstName)=>this.setState({firstName})} value={this.state.firstName} />

            <Input label={strings.lastName} prefix='' fnc={(lastName)=>this.setState({lastName})} value={this.state.lastName} />

            <Input label={strings.email} prefix='' fnc={(email)=>this.setState({email})} value={this.state.email} />

            <Input label={strings.password} prefix='' fnc={(password)=>this.setState({password})} value={this.state.password} pass />

            <Input label={strings.confirmPassword} prefix='' fnc={(confirmPass)=>this.setState({confirmPass})} value={this.state.confirmPass} pass />

            <Input label={strings.postal} prefix='' fnc={(postcode)=>this.setState({postcode})} value={this.state.postcode} num />

            <View style={{flexDirection: 'row', marginTop:dp(10)}} >
                <TouchableOpacity onPress={()=>this.setState({termsCheck: !this.state.termsCheck})} >
                    <Image style={{width:dp(20), height: dp(20), resizeMode:'contain'}} source={this.state.termsCheck?Images.checkbox:Images.uncheck} />
                </TouchableOpacity>

                <Text style={{marginLeft:dp(10)}} >{strings.agreement}<Text style={{color:EStyleSheet.value('$theme2')}} onPress={()=>this.props.navigation.navigate('Info',{type:0})} >
                    {strings.terms}
                    </Text> and <Text style={{color:EStyleSheet.value('$theme2')}} onPress={()=>this.props.navigation.navigate('Info',{type:1})} >
                    {strings.privacy}
                    </Text></Text>
            </View>

            <Button label={strings.signUp} onPress={()=>this.signUp()} />

            <Text style={{alignSelf:'center', marginTop:dp(15)}} >{strings.alreadyUser}
                <Text onPress={()=>this.props.navigation.navigate('Login')} style={{color:EStyleSheet.value('$theme2')}}>
                    {strings.signIn}
                </Text>
            </Text>

            <CustomAlert 
                // onButtonPress={()=> NavigationService.navigate('Authloading')}
                ref={refs=>this.customAlert=refs}
            />

            <Loader show={this.state.loading} />

        </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    images: state.resourcesReducer.images,
  })
  
  const mapDispatchToProps = (dispatch) => ({
        register: (pars, res, rej) => dispatch({
            type: types.REGISTER,
            pars: pars,
            res,
            rej
        })
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(SignUp)