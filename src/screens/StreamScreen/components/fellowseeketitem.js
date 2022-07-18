import React from 'react';
import {View, Text, Image, FlatList} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import COLORS from '../../../utils/Colors';
import {FONT_FAMILY} from '../../../utils/Font';

/**
 * It is used to dislay fellow seeker user items UIs.
 * @returns Render fellow seeker user Item UIs.
 */
const FellowSeekerItem = props => {
  return (
    <View style={Styles.container}>
      <Image
        source={require('../../../assets/images/dummyUser.png')}
        style={Styles.dummyUserImage}
      />
      <Text style={Styles.userNameText}>Martha</Text>
    </View>
  );
};
export default FellowSeekerItem;

import {StyleSheet} from 'react-native';

/**
 * It is used to design fellow seeker user UIs.
 */
const Styles = StyleSheet.create({
  container: {
    width: 48,
    height: 75,
    marginHorizontal: 12,
    backgroundColor: '#FFFFFF',
  },
  userNameText: {
    textAlign: 'center',
    color: '#262729',
    fontSize: 12,
    fontFamily: FONT_FAMILY.MontserratRegular,
    marginTop: 7,
  },
  dummyUserImage: {
    width: 48,
    height: 48,
  },
});
