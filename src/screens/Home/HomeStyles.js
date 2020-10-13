import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    container: {
        alignSelf:'center', 
        width:'90%',
        borderRadius:10, 
        backgroundColor:'#FFF',
        // overflow:'hidden',
        marginTop: '5rem',
        paddingVertical: '10rem'
    },
    optionsContainer: {
        flexDirection:'row', 
        alignItems: 'center', 
        justifyContent: 'space-between', 
        width:'80%', 
        alignSelf:'center'
    },
    optionButton: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: '40rem',
        alignSelf: 'flex-end'
    },
    optionIcon: {
        width: '18rem',
        height: '18rem',
        resizeMode: 'contain',
        tintColor: '$theme1'
    },
    optionText: {
        fontSize: '17rem', 
        color: '$theme1',
        marginRight: '2rem'
    }

})

export default Styles