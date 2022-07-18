import React, {useEffect} from 'react';
import {BackHandler, View} from 'react-native';

/**
 * YZBackHandler
 * It is used restrict back event for Android.
 */
const YZBackHandler = props => {
  //Add listner for BackHandler
  useEffect(() => {
    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (props.onPress && !props.isLoading) {
          props.onPress();
          return true;
        } else {
          return true;
        }
      },
    );
    return () => {
      backHandler.remove();
    };
  });

  return <View style={{height: 0, backgroundColor: 'red'}} />;
};

export default YZBackHandler;
