import React, { useState } from 'react'
import { Text, View, Modal, FlatList, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles'
import Images from '../util/images'

dp = (size) => EStyleSheet.value(size+'rem')

const seperator= () =>
<View style={styles.seperator} />

const MultiSelect = (props) => {

    const [show, setShow] = useState(false)

    const {itemKey, list, values, setValues, label, disabled} = props

    // list[value][itemKey]

    const getSelected = () => {
        let selectedString = ''

        values.map((item, index)=>{
            selectedString += list[item][itemKey] + (index != values.length-1? ', ':'')
        })
        
        return selectedString
    }

    const toggleSelected = (index) => {

        let newValues = values

        if(values.includes(index)) {
            newValues = values.filter(obj=>obj != index)
        } else {
            newValues = [...newValues, index]
        }
        
        setValues(newValues)
    }

        if(list.length>0) 
        return (
            <View>

                <TouchableOpacity onPress={()=>setShow(!show)}  style={[styles.labelContainer]} disabled={disabled} >
                    <Text style={{fontSize:dp(14)}} >{ label}</Text>
                    <Text style={{fontSize: dp(14), maxWidth:'40%'}} numberOfLines={1} >{values.length? getSelected() : 'All'}</Text>
                </TouchableOpacity>
           
                <Modal
                    visible={show}
                    transparent={true}
                >
                    <TouchableOpacity activeOpacity={1} style={styles.container} onPress={()=>setShow(false)} >
                        <TouchableOpacity activeOpacity={1} style={[styles.innerContainer, commonStyles.shadow]} >
                            <Text style={styles.listLabel} >{label}</Text>
                            <FlatList 
                                data={list}
                                contentContainerStyle={{paddingVertical:5}}
                                renderItem={({item, index})=> 

                                <TouchableOpacity style={styles.item} onPress={()=>{
                                        toggleSelected(index)
                                    }} >
                                    <Text>{item[itemKey]}</Text>
                                    {values.includes(index)? <Image source={Images.tick} style={styles.selectedIcon} /> : null}
                                </TouchableOpacity>
                            }
                            ItemSeparatorComponent={seperator}
                            keyExtractor={(item,index)=>`${label}${index}`}
                            />
                            
                        </TouchableOpacity>
                    </TouchableOpacity>
                </Modal>
            </View>
        )
        else return null
    
}

const styles = EStyleSheet.create({
    container: {
        height:'100%', 
        width:'100%', 
        backgroundColor:'rgba(0,0,0,0.7)', 
        justifyContent:'center', 
        alignItems:'center'
    },
    innerContainer: {
        width:'80%',
        backgroundColor: '#FFF',
        maxHeight: '70%',
        borderRadius: 10,
        overflow:'hidden'
    },
    labelContainer: {
        paddingVertical: '10rem',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        paddingHorizontal: '10rem',
        paddingVertical:'10rem',
        flexDirection:'row',
        alignItems:'center',
        justifyContent:'space-between'
    },
    seperator: {
        height:1,
        width:'95%',
        alignSelf: 'center',
        backgroundColor :'#C3C3C3'
    },
    listLabel: {
        padding:'10rem', 
        backgroundColor:'$theme1',
        fontSize: '16rem',
        color:'#FFF',
        fontWeight:'bold'
    }, 
    label: {
        paddingHorizontal: '0rem',
        marginTop:'15rem',
        marginBottom: '4rem',
        fontSize:'15rem'
    },
    selectedIcon: {
        width: '15rem', 
        height: '15rem', 
        resizeMode:'contain', 
        tintColor:'#c3c3c3'
    }
})


export default MultiSelect