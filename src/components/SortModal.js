import React, { Component, useState, useEffect } from 'react'
import { Text, View, TextInput, Modal, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import Images from '../util/images'
import commonStyles from '../util/commonStyles';
import { connect } from 'react-redux'
import types from '../types';
import Button from './Button';
import MultiSelect from './MultiSelect';
import strings from '../util/strings';

dp = (size) => EStyleSheet.value(size+'rem')

let arr = [
    {name: 'Date'},
    {name: 'Views'},
    {name: 'Title'}
]


const SortModal = (props) => {

    const [visible, setVisible] = useState(false)

    const [categories, setCategories] = useState([])

    const [selected, setSelected] = useState(0)

    const [desc, setDesc] = useState(false)


    const renderOption =(item, index) => 
    <TouchableOpacity style={Styles.optionContainer} onPress={()=>{
        if(selected==index) {
            setDesc(!desc)
        } else {
            setSelected(index)
            setDesc(false)
        }
    }} > 
        <Text style={Styles.optionText} >{item.name}</Text>

        <View style={{flexDirection:'row', alignItems:'center'}} >
            {(selected==index && desc) && <Image source={Images.downArrow} style={{width:dp(15), height: dp(15), resizeMode:'contain', marginRight:dp(5)}} />}
            {selected==index && <Image source={Images.radioSelected} style={{width:dp(15), height: dp(15), resizeMode:'contain'}} />}
            
        </View>
    </TouchableOpacity>

    return(
        <View>

            <TouchableOpacity style={Styles.labelButton} onPress={()=>setVisible(true)} >
                    
                <Text style={Styles.labelText} >{strings.sortFilter}</Text>
                <Image source={Images.filter} style={Styles.labelIcon} />
            </TouchableOpacity>

            <Modal
                visible={visible}
                animated={true}
                animationType={'slide'}
                transparent={true}
            >
                <TouchableOpacity activeOpacity={1} style={Styles.modalContainer} onPress={()=>setVisible(false)} >

                    <TouchableOpacity activeOpacity={1} style={Styles.container} >

                        <Text style={Styles.heading} >{strings.sortFilter}</Text>

                        <View style={{width:'85%', alignSelf:'center'}} >

                            {arr.map((item, index)=>{
                                return (
                                    <View key={`sortOption${index}`} >
                                        {renderOption(item, index)}
                                        <View style={[commonStyles.seperator]} />
                                    </View>
                                )
                                
                            })}

                            <MultiSelect
                                list={props.categories} 
                                itemKey='name'
                                values={categories}
                                setValues={(categories)=>setCategories(categories)}
                                label={strings.categories}
                                noLabel
                            />

                        </View>


                        <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-around'}} >
                            <Button 
                                bordered
                                label={'Apply'}
                                gradientStyle={{width: '35%'}}
                                onPress={()=>{
                                    let sort = {
                                        sort: selected,
                                    }

                                    if(desc) {
                                        sort = {
                                            ...sort,
                                            desc: desc?1:0
                                        }
                                    }
                                    
                                    if(categories.length)
                                        sort= {
                                            ...sort,
                                            categories: categories
                                        }

                                    props.setSort(sort)
                                    setVisible(false)
                                }}
                            />

                            <Button 
                                color='red'
                                label={'Cancel'}
                                gradientStyle={{width: '35%'}}
                                onPress={()=>{
                                    setVisible(false)

                                    let sort = props.valueSort
                                    
                                    setSelected(sort.sort? sort.sort : 0)
                                    setCategories(sort.categories? sort.categories : [])
                                    setDesc(sort.desc? true : false)
                                    
                                }}
                            />
                        </View>

                    </TouchableOpacity>

                </TouchableOpacity>

            </Modal>
        </View>
    )
}

const Styles = EStyleSheet.create({
    labelButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '40rem',
        alignSelf: 'flex-end'
    },
    labelIcon: {
        width: '18rem',
        height: '18rem',
        resizeMode: 'contain',
        tintColor: '$theme1'
    },
    labelText: {
        fontSize: '17rem', 
        color: '$theme1',
        marginRight: '2rem'
    },
    modalContainer: {
        backgroundColor:'rgba(0,0,0,0.5)', 
        flex:1, 
        justifyContent:'flex-end'
    },
    container: {
        paddingBottom: '50rem', 
        backgroundColor:'#FFF', 
        borderTopLeftRadius:50, 
        borderTopRightRadius:50, 
        overflow:'hidden'
    },
    heading: {
        paddingVertical: '20rem', 
        paddingHorizontal: '30rem', 
        fontSize: '18rem', 
        backgroundColor: '$theme1', 
        color: '#FFF' 
    },
    optionText: {
        fontSize:'16rem'
    },
    optionContainer: {
        flexDirection:'row', 
        alignItems:'center', 
        paddingVertical: '10rem', 
        justifyContent:'space-between'
    }
})


const mapStateToProps = (state) => ({
    categories: state.resourcesReducer.categories,
})

const mapDispatchToProps = (dispatch) => ({

})
  
  
export default connect(mapStateToProps, mapDispatchToProps)(SortModal)