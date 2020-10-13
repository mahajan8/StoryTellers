import EStyleSheet from 'react-native-extended-stylesheet';

const Styles = EStyleSheet.create({
    storyContainer: {
        flexDirection:'row', 
        marginBottom: '15rem'
    },
    profilePic: {
        height:'24rem', 
        width:'24rem', 
        borderRadius: '12rem',
        resizeMode:'contain', 
        alignSelf:'flex-end', 
    },
    storyBox: {
        
    },
    storyBoxView: {
        backgroundColor:'#00bbf0', 
        borderRadius:'25rem', 
        padding:'15rem', 
    }
})

export default Styles