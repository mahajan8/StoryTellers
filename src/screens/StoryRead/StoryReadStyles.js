import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    storyContainer: {
        flexDirection:'row', 
        marginBottom: '15rem'
    },
    profilePic: {
        height:'20rem', 
        width:'20rem', 
        resizeMode:'contain', 
        alignSelf:'flex-end', 
    },
    storyBox: {
        backgroundColor:'#00bbf0', 
        padding:'15rem', 
        borderRadius:'25rem', 
    }
})

export default Styles