import { StyleSheet, Text, View } from "react-native";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import React, { useState } from "react";
import COLORS from "../../../utils/Colors";
import { FONT } from "../../../utils/FontSize";
import { FONT_FAMILY } from "../../../utils/Font";

const SearchTypeTab = (props) => {
  const [selectedTab, setSelectedTab] = useState("Accounts");

  return (
    <View style={Styles.SearchTypeTabContainerstyle}>
      {["Accounts", "Spark Tag", "Business", "Location"].map((item, index) => {
        return (
          <Text
            onPress={() => {
              props.onSelectTab(item);
              setSelectedTab(item);
            }}
            style={[Styles.SearchTypeTabTextStyle, { color: selectedTab === item ? COLORS.app_theme_color : COLORS.light_black }]}
          >{item}</Text>
        );
      })
      }
    </View>
  );
};

export {
  SearchTypeTab,
};

const Styles = StyleSheet.create({
  SearchTypeTabContainerstyle: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    width: wp(100),
  },
  SearchTypeTabTextStyle: {
    fontSize: FONT.TextSmall,
    color: COLORS.light_black,
    fontFamily: FONT_FAMILY.BentonSansMedium,
  },
});
