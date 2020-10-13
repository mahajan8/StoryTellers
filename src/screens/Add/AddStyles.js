import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    buttonGradient: {
        borderRadius: '25rem', 
        width: '50rem', 
        height: '50rem'
    },
    buttonIcon: {
        tintColor:'#FFF', 
        marginRight: 0, 
        width: '18rem', 
        height: '18rem'
    },
    button: {
        width:'100%', 
        height:'100%'
    },
    heading: {
        fontSize: '16rem', 
        marginBottom:'10rem'
    },
    inputBox: {
        padding: '10rem', 
        borderWidth:1, 
        borderColor: '$theme1', 
        borderRadius:25, 
        marginTop:'10rem'
    }

})

export default Styles