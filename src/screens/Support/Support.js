import React, { Component } from 'react'
import { Text, View, Image } from 'react-native'
import Images from '../../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';
import Input from '../../components/Input';
import Header from '../../components/Header';
import strings from '../../util/strings';
import Button from '../../components/Button';
import commonStyles from '../../util/commonStyles';
import CustomAlert from '../../components/CustomAlert'
import Loader from '../../components/Loader'
import { connect } from 'react-redux'
import * as Validations from '../../util/Validations';
import Picker from '../../components/Picker'
import types from '../../types';

dp = (size) => EStyleSheet.value(size+'rem')

let requestTypes = [{name: 'Feedback'},{name: 'Query'}, {name: 'Bug'}]

class Support extends Component {

    constructor(props) {
        super(props)

        this.state ={
            type: -1,
            subject: '',
            description: '',
            loading: false
        }
    }

    supportRequest() {
        if(Validations.isAnyFieldEmpty([this.state.subject, this.state.description])) {
            alert(strings.fillFields)
        } else {

            const { subject, description, type } = this.state

            let pars = {
                subject,
                description,
                type: requestTypes[type].name
            }

            this.setState({loading: true})

            new Promise((res, rej)=>this.props.submitSupport(pars, res, rej))
            .then(msg=>{
                this.customAlert.showAlert(msg)
            })
            .catch(err=>{
                this.setState({loading: false})
                this.customAlert.showError(err)

            })
        }
    }

    render() {
        return (
            <Header title={strings.support} >
                <View style={{width:'90%', alignSelf:'center',}}>

                    <View style={[commonStyles.shadow, styles.infoBox ]} >
                        <Text style={styles.message} >{strings.supportMessage1}</Text>
                        <Text selectable={true} style={styles.info} >{strings.supportMail}</Text>
                        <Text style={[styles.message, {marginTop:dp(10)}]} >{strings.supportMessage2}</Text>
                    </View>

                    <Picker 
                        list={requestTypes} 
                        itemKey='name'
                        value={this.state.type}
                        setValue={(type)=>this.setState({type})}
                        label={'Request Type'}
                    />

                    {this.state.type>=0 &&
                        <View>
                            <Input label={strings.subject} value={this.state.subject} fnc={(subject)=>this.setState({subject})} />

                            <Input label={strings.description} value={this.state.description} fnc={(description)=>this.setState({description})} multiline long={200} />

                            <Button label={strings.submit} onPress={()=>this.supportRequest()} />
                        </View>
                    }

                </View>

                <Loader show={this.state.loading} />

                <CustomAlert 
                    onButtonPress={()=>{
                        this.setState({
                            subject: '',
                            description: '',
                            type: -1,
                            loading: false
                        })
                    }}
                    ref={refs=>this.customAlert=refs}
                />

            </Header>
        )
    }
}

const styles = EStyleSheet.create({
    info: {
        fontSize:'14rem', 
        color: '#6D7278', 
        textAlign:'center', 
        marginTop:'10rem'
    }, 
    message: {
        fontSize:'16rem', 
        color:'#000'
    },
    infoBox: { 
        paddingVertical: '25rem', 
        alignItems:'center', 
        backgroundColor:'#FFF', 
        shadowOffset: { width: 0, height: 0 }, 
        marginBottom:'25rem', 
        borderRadius:10 
    }
})

const mapStateToProps = (state) => ({
})
  
const mapDispatchToProps = (dispatch) => ({
    submitSupport: (pars, res, rej) => dispatch({
        type: types.SUBMIT_SUPPORT,
        pars: pars,
        res: res,
        rej: rej
    })
})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(Support)