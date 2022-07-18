import React from "react";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { StyleSheet } from "react-native";
import COLORS from "../../utils/Colors";
import { FONT_FAMILY } from "../../utils/Font";

const Styles = StyleSheet.create({
  container: {
    backgroundColor: COLORS.app_theme_color,
    flex: 1,
  },
  image: {
    alignSelf: "center",
    height: wp(12),
    width: wp(9.5),
  },
  streamText: {
    textAlign: "center",
    color: COLORS.white_color,
    fontSize: wp(6),
    fontFamily: FONT_FAMILY.BentonSansBold,
    marginTop: 16,
  },
  sparkText: {
    textAlign: "center",
    color: COLORS.white_color,
    fontSize: wp(3.5),
    fontFamily: FONT_FAMILY.BentonSansMedium,
    marginTop: 8,
    marginBottom: wp(10),
  },
  fellowSeekerText: {
    color: "#262729",
    fontSize: 16,
    fontFamily: FONT_FAMILY.BentonSansMedium,
    marginLeft: 20,
  },
  fellowSeekerContainer: {
    paddingTop: 10,
    backgroundColor: "#FFFFFF",
  },
  loadingIndicator: {
    alignSelf: "center",
    flex: 1,
  },
  listFooterContainer: {
    height: 60,
    justifyContent: 'center',
  },
});
export default Styles;
