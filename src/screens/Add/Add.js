import React, { Component } from 'react'
import { Text, View, Image, Dimensions, TextInput } from 'react-native'
import { connect } from 'react-redux'
import Header from '../../components/Header'
import Input from '../../components/Input'
import Button from '../../components/Button'
import strings from '../../util/strings'
import Images from '../../util/images'
import EStyleSheet from 'react-native-extended-stylesheet';
import Picker from '../../components/Picker'
import types from '../../types'
import Loader from '../../components/Loader'
import CustomAlert from '../../components/CustomAlert'
import * as Validations from '../../util/Validations'
import Carousel from 'react-native-snap-carousel';
import Styles from './AddStyles'

dp = (size) => EStyleSheet.value(size+'rem')

const deviceWidth = Dimensions.get('window').width

class Add extends Component {

    constructor(props) {
        super(props) 
        this.state= {
            story: '',
            category: -1,
            title:'',
            edit: true,
            loading: false,
            slideIndex: 0
        }
    }

    componentDidMount() {

        this.focusListener = this.props.navigation.addListener('focus', () => {
            
            if(this.props.route.params && !this.props.route.params.blur) {

            const {_id, category, title} = this.props.route.params.story
            
                this.setState({
                    category: this.props.categories.findIndex(obj=>obj._id==category),
                    title,
                    edit: false,
                    slideIndex: 2
                })
            } else { 
                this.setState({
                    category: -1,
                    title: '',
                    edit: true,
                    slideIndex: 0
                }, ()=> this._carousel.snapToItem(0))
            }
        });

        this.blurListener = this.props.navigation.addListener('blur', () => {
            this.props.navigation.setParams({blur:true})
        });
        
    }

    componentWillUnmount() {
        this.focusListener()
        this.blurListener()
    }

    submit() {
        const  { firstName, lastName } = this.props.userDetails

        let {story, title, category} = this.state

        if(Validations.isAnyFieldEmpty([story, title])) {
            alert(strings.fillFields)
        } else {

            let pars = {
                story: story,
                title: title,
                name: firstName + ' ' + lastName,
                category: this.props.categories[category]._id,
            }

            let reply = false

            if(this.props.route.params) {
                let {_id} = this.props.route.params.story
                pars = {
                    ...pars,
                    storyId: _id
                }

                reply = true
            }

            this.setState({loading: true})

            new Promise((resolve, reject)=>this.props[reply?'addStoryReply': 'addStory'](pars, resolve, reject)) 
            .then(msg=>{
                this.customAlert.showAlert(msg)
            })
            .catch(err=>{
                this.customAlert.showError(err)
                this.setState({loading: false})
            })
        }
        
    }

    render() {

        const  { firstName, lastName } = this.props.userDetails

        const {edit, slideIndex } = this.state

        const addOptions = ({item, index}) =>
        <View> 
            {index==0?
                <Picker 
                    list={this.props.categories} 
                    itemKey='name'
                    value={this.state.category}
                    setValue={(category)=>this.setState({category})}
                    label={strings.category}
                    disabled={edit?false: true}
                    noLabel
                />
                : 
                <TextInput 
                    style={[Styles.inputBox, index==2 && {height: dp(200), textAlignVertical:'top'}]}
                    multiline={index==2}
                    onChangeText={(input)=>{
                        if(index==1) {
                            this.setState({title: input})
                        } else {
                            this.setState({story: input})
                        }
                    }}
                    value={index==1? this.state.title : this.state.story}
                    placeholder={index==1? strings.title : strings.startStory}
                />
            }
        </View>

        return (
            <Header title={strings.addStory} back={edit? null : this.props.navigation} >
                <View style={{width:'90%', alignSelf:'center'}} >

                    <Text style={Styles.heading} >{edit? strings[`addHeading${slideIndex}`] : strings.addHeading}</Text>

                    {edit? 
                        <Carousel
                            ref={(c) => { this._carousel = c; }}
                            data={[1,2,3]}
                            renderItem={addOptions}
                            sliderWidth={deviceWidth*0.9}
                            itemWidth={deviceWidth*0.9}
                            scrollEnabled={false}
                        />
                    : 
                        addOptions({item: 'sadja', index: 2})
                    }

                    <View style={{flexDirection:'row', width:'100%', justifyContent: 'space-between'}} >

                        <Button 
                            gradientStyle={Styles.buttonGradient} 
                            Style={Styles.button} 
                            icon={Images.rightarrow}
                            iconStyle={[Styles.buttonIcon, {transform: [{rotate: '180deg'}] }]}
                            onPress={()=>{
                                let index = this._carousel.currentIndex
                                if(index>0) {
                                    this._carousel.snapToPrev()
                                    this.setState({slideIndex: index-1})
                                }
                            }}
                            invisible={(slideIndex==0 || !edit)}
                        />

                        <Button label={'Submit'}
                            gradientStyle={{width: '40%'}}
                            invisible={slideIndex!=2}
                            onPress={()=>this.submit()}
                        />

                        <Button 
                            gradientStyle={Styles.buttonGradient} 
                            Style={Styles.button} 
                            icon={Images.rightarrow}
                            iconStyle={Styles.buttonIcon}
                            onPress={()=>{
                                let index = this._carousel.currentIndex
                                if(index<2) {
                                    this._carousel.snapToNext()
                                    this.setState({slideIndex: index+1})
                                }
                            }}
                            invisible={slideIndex==2}
                        />

                    </View>

                </View>

                <CustomAlert 
                    onButtonPress={()=>{
                        this.setState({
                            story: '',
                            category: -1,
                            title:'',
                            edit: true,
                            loading: false,
                            slideIndex: 0
                        })

                        if(this.props.route.params) 
                            this.props.navigation.goBack()
                        else
                            this._carousel.snapToItem(0)
                    }}
                    ref={refs=>this.customAlert=refs}
                />
                <Loader show={this.props.loading || this.state.loading } />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    userDetails: state.profileReducer.userDetails,
    categories: state.resourcesReducer.categories,
    loading: state.storyReducer.loading
})

const mapDispatchToProps = (dispatch) => ({
    addStory: (pars, res, rej) => dispatch({
        type: types.ADD_STORY,
        pars: pars,
        res,
        rej
    }),
    addStoryReply: (pars, res, rej) => dispatch({
        type: types.ADD_TO_STORY,
        pars: pars,
        res,
        rej
    })
})

export default connect(mapStateToProps, mapDispatchToProps)(Add)
