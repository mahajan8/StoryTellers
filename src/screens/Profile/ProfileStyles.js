import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    profilePic: {
        height:'110rem', 
        width:'110rem', 
        resizeMode:'cover', 
        borderRadius:'55rem',
    },
    seperator: {
        height:'90%',
        backgroundColor: '#979797',
        width: 1,
        marginHorizontal: '8rem'
    },
    logoutButton: {
        paddingHorizontal: '30rem', 
        paddingVertical:'4rem', 
    },
    countView: {
        flexDirection:'row', 
        justifyContent:'space-between', 
        width:'75%', 
        alignSelf:'center', 
        marginVertical:'20rem'
    },
    countText: {
        color: '$theme2'
    }

})

export default Styles