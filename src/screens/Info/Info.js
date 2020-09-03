import React, { Component } from 'react'
import { View,} from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/Header'
import strings from '../../util/strings';
import Loader from '../../components/Loader'
import HTML from 'react-native-render-html';
import { getInfo } from '../../actions/info_actions'

dp = (size) => EStyleSheet.value(size+'rem')
  
export default class Info extends Component {

    constructor(props) {
        super(props)
        this.state={
            info: '<p></p>',
            loading: false
        }
    }

    componentDidMount() {
        const {type} = this.props.navigation.state.params
        this.setState({loading: true})
        getInfo(type)
        .then(obj=>{
            
            this.setState({
                loading: false,
                info: type==0?obj.terms:obj.privacy
            })

        })
        .catch(err=> {
        this.setState({loading: false})
        alert(err)
        })
    }

    render() {
        const {type} = this.props.navigation.state.params

        return (
            <Header title={type==0?strings.terms:strings.privacy} back={this.props.navigation}>

                <View style={{width:'90%', alignSelf:'center'}} >
                    <HTML 
                        html={this.state.info}
                    />
                </View>
                <Loader show={this.state.loading} />
            </Header>
        )
    }
}
