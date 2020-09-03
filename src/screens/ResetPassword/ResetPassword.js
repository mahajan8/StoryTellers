import React, { Component } from 'react'
import { Text,} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import Input from '../../components/Input'
import Header from '../../components/headerLogo'
import Loader from '../../components/Loader'
import CustomAlert from '../../components/CustomAlert'
import commonStyles from '../../util/commonStyles';
import * as Storage from '../../APIs/AsyncStore'
import * as Validations from '../../util/Validations';
import strings from '../../util/strings';
import { resetPassword } from '../../actions/auth_actions'
import NavigationService from '../../NavigationService';
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

dp = (size) => EStyleSheet.value(size+'rem')
  
class ResetPassword extends Component {

    constructor(props) {
        super(props)
        this.state={
            password: '',
            confirmPass: '',
            loading: false
        }
    }

    reset() {
        const {user} = this.props.navigation.state.params

        const { password, confirmPass } = this.state

        if(!Validations.isMinLength(password, 6)) {
            alert(strings.validPassword)
        } else if(Validations.isAnyFieldEmpty([password, confirmPass])) {
            alert(strings.fillFields)
        } else if(password != confirmPass) {
            alert(strings.passwordMatch)
        } else {
            this.setState({loading: true})
            resetPassword(user, password, confirmPass)
            .then(obj=>{
                this.customAlert.showAlert(obj.message, Images.check)
                Storage.saveData('userId', user)
                this.setState({loading: false})
            })
            .catch(err=>{
                this.setState({loading: false})
                this.customAlert.showError(err)
            })
        }
    }

    render() {
        const {reset} = this.props.images

        return (
        <Header back={this.props.navigation} images={[reset]} >
            <Text style={commonStyles.heading} >{strings.resetPassword}</Text>

            <Input label={strings.password} prefix='' fnc={(password)=>this.setState({password})} value={this.state.password} pass />

            <Input label={strings.confirmPassword} prefix='' fnc={(confirmPass)=>this.setState({confirmPass})} value={this.state.confirmPass} pass />

            <Button label={strings.submit} onPress={()=>this.reset()} />

            <CustomAlert 
                onButtonPress={()=>NavigationService.navigate('Authloading')}
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
        ...bindActionCreators({}, dispatch)
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword)