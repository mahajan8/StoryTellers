import React, { Component } from 'react'
import { Text, View, Image, TouchableOpacity, Alert, BackHandler} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Button from '../../components/Button'
import Images from '../../util/images';
import Input from '../../components/Input'
import Header from '../../components/Header'
import ImagePick from '../../components/ImagePick'
import * as Storage from '../../APIs/AsyncStore'
import * as Validations from '../../util/Validations'
import commonStyles from '../../util/commonStyles';
import strings from '../../util/strings';
import Loader from '../../components/Loader'
import { connect } from 'react-redux'
import Styles from './ProfileStyles';
import types from '../../types';
import axios from 'axios'
import Config from '../../APIs/ApiConfig';

dp = (size) => EStyleSheet.value(size+'rem')

const callback = (msg) => {
    alert(JSON.stringify(msg))
}
  
  
class Profile extends Component {

    constructor(props) {
        super(props)
        this.state={
            firstName: '',
            lastName: '',
            email: '',
            postcode: '',
            profilePic: '',
            picChange: false,
            edit: false
        }
    }

    componentDidMount() {
        this.backHandle = BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);

        this.props.getProfile()
    }

    handleBackPress = ()=>{
        if(this.state.edit) {
            this.setState({edit: false, picChange: false})
            return true ;
        } 
    }
    
    componentWillUnmount() {
        this.backHandle.remove()
    }

    logout() {
        Alert.alert(
            'Logout',
            'Are you sure you want to Log out?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {text: 'OK', onPress: () => {
                Storage.removeData('userId')
                this.props.logout()
              }},
            ],
            {cancelable: false},
        );
    }

    edit() {
        const { firstName, lastName, email, postcode, profilePic } = this.props.userDetails

        this.setState({
            firstName, 
            lastName, 
            email, 
            postcode,
            profilePic,
            edit: true
        })
    }

    pickImage() {
        this.imagePicker.showPicker()
    }

    editProfile = async () => {
        const { firstName, lastName, email, postcode, profilePic, picChange } = this.state
        
        if(Validations.isFieldEmpty([firstName, lastName, email, postcode])) {
            alert(strings.fillFields)
        } else if (!Validations.validateEmail(email)) {
            alert(strings.validEmail)
        } else if (!Validations.isMinLength(postcode,4)) {
            alert(strings.validPostal)
        } else {

            let pars = {
                firstName,
                lastName,
                email,
                postcode,
            }

            if(picChange) {
                this.upload(profilePic, firstName+'_'+lastName+'.png')
            }

            this.props.editProfile(pars)
            
            this.setState({
                edit: false,
                picChange: false
            })
        }
    }

    upload(image, name) {
        let form = new FormData()

        let imageData = {
            ...image,
            name
        }

        form.append('image', imageData)

        console.log(form)
        console.log(imageData)
        
        const config = {
            method: 'POST',
            headers: {'Content-Type': 'multipart/form-data'},
            body: form,
        };

        fetch(Config.serverURL + 'uploadImage', config)
        .then((res)=>res.json())
        .then(res=>{
            console.log(res)
            let pars = {
                profilePic: res.imageUrl
            }

            this.props.editProfile(pars)

        }).catch((err)=>{
            console.log(err)
        });
          
    }
      

    render() {

        const {edit, picChange} = this.state

        const { firstName, lastName, email, postcode, profilePic } = edit? this.state : this.props.userDetails

        const { myStories, contributions } = this.props.userDetails

        return (
            <Header title={strings.profile} back={edit?this.props.navigation: null } onBack={()=>this.setState({edit: false})} >

                <View style={{ alignSelf:'center', flexDirection:'row'}} >
                    <View style={commonStyles.shadow} >
                        <Image source={profilePic? picChange? {uri: profilePic.uri} : {uri: profilePic }: Images.dummyProfile} style={Styles.profilePic} />
                    </View>
                    <TouchableOpacity style={{alignSelf:'flex-end'}} onPress={()=>{
                        if(!edit)
                            this.edit()
                        else
                            this.pickImage()
                        }} >

                        <Image source={edit?Images.camera: Images.edit} style={{width:dp(15), height:dp(15), resizeMode:'contain', tintColor:EStyleSheet.value('$theme2')}} />

                    </TouchableOpacity>
                    
                </View>

                {edit? null : 
                    <Text onPress={()=>this.props.navigation.navigate('ChangePassword')} style={{color:EStyleSheet.value('$theme2'), alignSelf:'center', marginTop:dp(15)}} >{strings.changePassword}</Text>
                }

                <View style={{width:'90%', alignSelf:'center'}} >

                    <View style={Styles.countView} >
                        <Text style={[{marginRight: dp(20)}, Styles.countText]} >{strings.uploadedStories}: {myStories}</Text>
                        <Text style={Styles.countText}>{strings.contributions}: {contributions}</Text>
                    </View>
                    
                    <Input label={strings.firstName} value={firstName} fnc={(firstName)=>this.setState({firstName})} edit={edit} />

                    <Input label={strings.lastName} value={lastName} fnc={(lastName)=>this.setState({lastName})} edit={edit} />

                    <Input label={strings.email} value={email} fnc={(email)=>this.setState({email})} edit={false} />

                    <Input label={strings.postal} value={postcode} fnc={(postcode)=>this.setState({postcode})} edit={edit} num max={12} />
                </View>
                {edit? 
                
                    <Button label={strings.saveChanges} onPress={()=>this.editProfile()} 
                    />
            
                : 
                    <Button label={'Logout'} bordered color={EStyleSheet.value('$theme2')} onPress={()=>this.logout()} Style={Styles.logoutButton} icon={Images.logout} gradientStyle={{width: null}} />
                }

                {/* <Loader show={this.props.loading} /> */}
                <ImagePick 
                    ref={refs=>this.imagePicker = refs}
                    onSelectImage={(image)=>{
                        this.setState({
                            picChange: true,
                            profilePic: image
                        })
                        console.log(image)

                    }}
                />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    loggedIn: state.loginReducer.loggedIn,
    userId: state.loginReducer.userId,
    loading: state.profileReducer.loading,
    userDetails: state.profileReducer.userDetails
  })
  
  const mapDispatchToProps = (dispatch) => ({
      getProfile: () => dispatch({
          type: types.GET_PROFILE,
      }),
      logout: () => dispatch({
          type: types.LOGOUT
      }),
      editProfile: (pars) => dispatch({
          type: types.EDIT_PROFILE,
          pars: pars,
          cb: callback
      })
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Profile)