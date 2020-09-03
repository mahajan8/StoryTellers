import React, { Component } from 'react'
import { Text} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Input from '../../components/Input'
import Loader from '../../components/Loader'
import Header from '../../components/headerLogo'
import CustomAlert from '../../components/CustomAlert'
import Otp from '../../components/Otp'
import strings from '../../util/strings';
import * as Validations from '../../util/Validations';
import commonStyles from '../../util/commonStyles';
import Images from '../../util/images';
import * as Storage from '../../APIs/AsyncStore'
import { connect } from 'react-redux'
import Config from '../../APIs/ApiConfig';
import Api from '../../APIs/Api';

dp = (size) => EStyleSheet.value(size+'rem')
  
class ForgotPassword extends Component {

    constructor(props) {
        super(props)
        this.state={
            email: '',
            loading: false,
            show: false,
            user: ''
        }
    }

    componentDidMount() {
        Storage.getData('email').then(email=>{
            if(email) 
                this.setState({email})
        })
    }

    forgot() {
        if(Validations.validateEmail(this.state.email)) {
            this.setState({loading: true})

            let pars = {
                email: this.state.email
            }

            new Api().postJSON(Config.forgotPassword,pars)
            .then(obj=>{
                if(obj.status) {
                    this.setState({
                        loading: false, 
                        show: true,
                        user: obj.response.userid
                    })
                }
            })
            .catch(err=>{
                this.setState({loading: false})
                this.customAlert.showError(err)
            })
        } else {
            alert('Invalid Email')
        }
    }

    verifyOtp(otp) {
        this.setState({loading: true})

        let pars = {
            otp: otp,
            userId: this.state.user
        }

        new Api().postJSON(Config.verifyOtp, pars)
        .then(obj=>{
            if(obj.status) {
                this.setState({show: false})
                this.customAlert.showAlert('OTP Verified.', Images.check)
            } else {
                this.customAlert.showError(obj.message)
            }
            this.setState({loading: false})
        })
        .catch(err=>{
            this.setState({loading: false})
            this.customAlert.showError(err)
        })
        
    }

    render() {

        return (
        <Header back={this.props.navigation}>
            <Text style={commonStyles.heading} >FORGOT PASSWORD</Text>

            <Input label='Email' prefix='' fnc={(email)=>this.setState({email})} value={this.state.email} />

            <Button label={strings.submit} onPress={()=>this.forgot()} />

            <Otp show={this.state.show} 
                onClose={()=>this.setState({show: false})}
                onSubmit={(otp)=>{
                    // this.setState({show: false})
                    this.verifyOtp(otp)
                }} 
                reSend={()=>this.forgot()}
            />

            <CustomAlert 
                onButtonPress={()=> this.props.navigation.navigate('ChangePassword', {user: this.state.user, reset: true})}
                ref={refs=>this.customAlert=refs}
            />

            <Loader show={this.state.loading} />
            
        </Header>
        )
    }
}

const mapStateToProps = (state) => ({
  })
  
  const mapDispatchToProps = (dispatch) => ({
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ForgotPassword)