import React, { Component } from 'react'
import { Text, View, FlatList, TouchableOpacity, Image } from 'react-native'
import { connect } from 'react-redux'
import EStyleSheet from 'react-native-extended-stylesheet';
import Header from '../../components/Header'
import ListItem from '../../components/StoyListItem'
import types from '../../types';
import Loader from '../../components/Loader'
import SortModal from '../../components/SortModal';
import Styles from './HomeStyles';
import commonStyles from '../../util/commonStyles';
import Images from '../../util/images';


dp = (size) => EStyleSheet.value(size+'rem')

class Home extends Component {

    constructor(props) {
        super(props)

        this.state = {
            sort: {}
        }
        
    }

    render() {

        const {storyList, loading,getStories, navigation} = this.props
        
        return (
            <Header title={'Home'} refreshing={loading} onRefresh={()=>getStories(this.state.sort)} >

                <SortModal 
                    setSort={(sort)=>{
                        this.setState({sort})
                        getStories(sort)
                    }}
                    valueSort={this.state.sort}
                />

                <View style={[commonStyles.shadow, Styles.container]} >
                
                {
                    storyList.length? 
                        storyList.map((item,index)=> { 
                            return (
                            <View key={`story${index}`} >
                                <ListItem 
                                    item={item}
                                    readStory={()=>navigation.navigate('StoryRead', {story: item})}
                                />
                            
                                {index!=storyList.length-1 && <View style={[commonStyles.seperator, { width: '80%', alignSelf:'center'}]} />}
                            </View>)
                        })
                    : 
                    <Text style={{fontSize:dp(20), alignSelf:'center', marginVertical:dp(15)}} >No Stories Yet</Text>
                }
                </View>

                {/* <Picker 
                    list={} 
                    itemKey='name'
                    value={this.state.category}
                    setValue={(category)=>this.setState({category})}
                    label={strings.category}
                    disabled={edit?false: true}
                    noLabel
                /> */}
                
                <Loader show={loading} />
            </Header>
        )
    }
}

const mapStateToProps = (state) => ({
    storyList: state.storyReducer.storyList,
    myStories: state.storyReducer.myStories,
    loading: state.storyReducer.loading
})
  
  const mapDispatchToProps = (dispatch) => ({
        getStories: (pars) => dispatch({
            type: types.GET_STORIES,
            pars: pars
        })
  })
  
  
  export default connect(mapStateToProps, mapDispatchToProps)(Home)