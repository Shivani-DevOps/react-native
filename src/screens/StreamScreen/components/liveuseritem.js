import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLORS from '../../../utils/Colors';
import {FONT_FAMILY} from '../../../utils/Font';

/**
 * It is used to dislay live user items UIs.
 * @returns Render live user Item UIs.
 */
const LiveUserItem = props => {
  return (
    <View style={Styles.container}>
      <View style={Styles.subContainer} />
      <Image
        source={require('../../../assets/images/dummyUser.png')}
        style={Styles.dummyUserImage}
      />
      <View style={Styles.textContainer}>
        <Text style={Styles.userNameText}>Shania</Text>
        <Image
          source={require('../../../assets/images/checkMark.png')}
          style={Styles.checkMark}
        />
      </View>
    </View>
  );
};
export default LiveUserItem;

import {StyleSheet} from 'react-native';

/**
 * It is used to design live user item UIs.
 */
const Styles = StyleSheet.create({
  container: {
    width: 90,
    height: 119,
    marginHorizontal: 3,
  },
  subContainer: {
    position: 'absolute',
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FF5C36',
    top: 10,
    right: 10,
    zIndex: 1000,
  },
  dummyUserImage: {
    width: 90,
    height: 90,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  checkMark: {
    width: 12,
    height: 12,
    marginLeft: 11,
  },
  userNameText: {
    textAlign: 'center',
    color: '#262729',
    fontSize: 12,
    fontFamily: FONT_FAMILY.MontserratRegular,
  },
});
