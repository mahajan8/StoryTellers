import React, { useState } from 'react'
import { Text, View, Modal, FlatList, Image, TouchableOpacity } from 'react-native'
import EStyleSheet from 'react-native-extended-stylesheet';
import commonStyles from '../util/commonStyles'
import Images from '../util/images'

dp = (size) => EStyleSheet.value(size+'rem')

const seperator= () =>
<View style={styles.seperator} />

const Picker = (props) => {

    const [show, setShow] = useState(false)

    const {itemKey, list, value, setValue, label, disabled, noLabel} = props

        if(list.length>0) 
        return (
            <View>

                {noLabel? null : <Text style={styles.label} >{label}</Text>}

                <TouchableOpacity onPress={()=>setShow(!show)}  style={[styles.labelContainer, noLabel && {marginTop:dp(15)}]} disabled={disabled} >
                    <Text style={{fontSize:dp(14)}} >{ value==-1? 'Select '+ label : list[value][itemKey]}</Text>
                    <Image style={{width:dp(15), height: dp(15), resizeMode:'contain'}} source={Images.downArrow} />
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
                                        setValue(index)
                                        setShow(false)
                                    }} >
                                    <Text>{item[itemKey]}</Text>
                                </TouchableOpacity>
                            }
                            ItemSeparatorComponent={seperator}
                            keyExtractor={(item,index)=>`item${index}`}
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
        paddingVertical: '4rem',
        paddingHorizontal: '10rem',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    item: {
        paddingHorizontal: '10rem',
        paddingVertical:'10rem'
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
    }
})


export default Picker