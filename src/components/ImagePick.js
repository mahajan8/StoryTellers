import React, { Component } from 'react'
import { Text, View, Modal, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import ImagePicker from 'react-native-image-crop-picker';
// import ImagePicker from 'react-native-image-picker';
dp = (size) => EStyleSheet.value(size+'rem')

export default class ImagePick extends Component {

    constructor(props) {
        super(props)
        this.state = {
            showModal:false,
        }
    }

    showPicker() {
        this.setState({showModal: true})
    }

    render() {

        return (
            <Modal
                visible={this.state.showModal}
                onRequestClose={()=>this.setState({showModal:false})}
                transparent={true}
                animated
                animationType='slide'
            >
                <TouchableOpacity activeOpacity={1} onPress={()=>this.setState({showModal:false})} style={Styles.container} >
                    <View style={{ width:'80%', backgroundColor:'#FFF', }} >
                        <TouchableOpacity style={Styles.options} onPress={()=>{
                            ImagePicker.openPicker({
                                width: 300,
                                height: 300,
                                compressImageMaxHeight:300,
                                compressImageMaxWidth:300,
                                cropping: true,
                                includeBase64: true
                            }).then(image => {
                                this.setState({
                                    showModal:false,
                                })
                                // this.props.onSelectImage(`data:${image.mime};base64,${image.data}`)
                                this.props.onSelectImage({
                                  uri: image.path,
                                  type: image.mime
                                })
                            }).catch(err=>{
                                console.log(err)
                                this.setState({showModal:false})
                            })
                            // const options = {
                            //     title: 'Select Avatar',
                            //     storageOptions: {
                            //       skipBackup: true,
                            //       path: 'images',
                            //     },
                            //   };
                            // ImagePicker.launchImageLibrary(options, (response) => {
                            //     if (response.didCancel) {
                            //         console.log('User cancelled image picker');
                            //       } else if (response.error) {
                            //         console.log('ImagePicker Error: ', response.error);
                            //       } else {
                            //         const source = { uri: response.uri };
                                 
                            //         // You can also display the image using data:
                            //         // const source = { uri: 'data:image/jpeg;base64,' + response.data };
                                 
                            //         console.log(response)
                            //       }
                            // });
                        }} >
                            <Text>Select from Gallery</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={Styles.options} onPress={()=>{
                            ImagePicker.openCamera({
                                width: 300,
                                height: 300,
                                cropping: true,
                                compressImageMaxWidth:300,
                                compressImageMaxHeight:300,
                                includeBase64: true
                            }).then(image => {
                                this.setState({
                                    showModal:false,
                                })
                                this.props.onSelectImage(`data:${image.mime};base64,${image.data}`)
                            }).catch(err=>{
                                console.log(err)
                                this.setState({showModal:false})
                            })
                        }} >
                            <Text>Open Camera</Text>
                        </TouchableOpacity>
                    </View>
                </TouchableOpacity>

            </Modal>
        )
    }
}

const Styles = EStyleSheet.create({
    container: {
        height:'100%', 
        width:'100%', 
        alignItems:'center', 
        justifyContent:'center', 
        backgroundColor:'rgba(0, 0, 0, 0.5)' 
    },
    options: { 
        height:'50rem', 
        paddingLeft:'10rem', 
        justifyContent:'center' 
    },
})
