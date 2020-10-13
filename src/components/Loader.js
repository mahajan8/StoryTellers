import PropTypes from 'prop-types';
import {ActivityIndicator,StyleSheet, View, Image} from 'react-native';
import React from 'react';
import Images from '../util/images';
import EStyleSheet from 'react-native-extended-stylesheet';

const Loader = (props) => {

const loaders = [Images.bookGif, Images.bookGif2, Images.bookGif3]

let index = Math.floor(Math.random() * 3);

const { show } = props;
    if (show) {
      return (
        <View style={[styles.loading]}>
          {/* <ActivityIndicator size="large" color="gray" /> */}
          <Image source={loaders[index]} style={styles.loadingGif} />
        </View>
      );
    } else {
      return null;
    }
};

const styles = EStyleSheet.create({
    loading: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
      justifyContent: 'center',
      alignItems: 'center',
      zIndex:10,
      elevation: 10,
      backgroundColor: 'rgba(0,0,0,0.3)'
    },
    loadingGif: {
      width: '150rem',
      height: '150rem'
    }
})

Loader.propTypes = {
 show: PropTypes.bool,
};

export default Loader;