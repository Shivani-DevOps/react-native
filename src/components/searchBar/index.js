import React, { useState } from "react";
import { Image, Text, TouchableOpacity } from "react-native";
import { Icon, SearchBar } from "react-native-elements";
import COLORS from "../../utils/Colors";
import { widthPercentageToDP as wp } from "react-native-responsive-screen";
import { ICONS } from "../../utils/ImagePaths";
import { FONT } from "../../utils/FontSize";
import { FONT_FAMILY } from "../../utils/Font";
import { Spacer } from "../spacer";

const CustomSearchBar = (props) => {
  const { onSearch, onClearSearch, width, isDisabled } = props;
  const [searchText, setSearchText] = useState("");
  return (isDisabled ?
      <TouchableOpacity onPress={() => props.onDisabledSearchPress()} style={{
        paddingVertical: 0,
        height: wp("11%"),
        borderRadius: 30,
        borderBottomWidth: 0,
        backgroundColor: COLORS.white_color,
        width: width ? wp(width) : wp(90),
        borderWidth: 0,
        flexDirection: "row",
        alignItems: "center",
      }}>
        <Spacer row={1.5} />
        <Image
          source={ICONS.SEARCH_BLACK_ICON}
          style={{
            height: wp(4),
            width: wp(4),
          }}
        />
        <Spacer row={1.5} />
        <Text style={{
          marginLeft: 0,
          fontFamily: FONT_FAMILY.MontserratRegular,
          color: "rgba(38, 39, 41, 1)",
          fontSize: FONT.TextSmall_2,
        }}>SEARCH</Text>
      </TouchableOpacity>
      :
      <SearchBar
        placeholder="SEARCH"
        placeholderTextColor={"rgba(38, 39, 41, 1)"}
        onChangeText={(text) => {
          setSearchText(text);
          props.onSearch(text);
        }}
        value={searchText}
        containerStyle={{
          backgroundColor: COLORS.transparent,
          borderWidth: 0,
          borderTopWidth: 0,
          padding: wp("2%"),
          borderRadius: 30,
          borderBottomWidth: 0,
        }}
        inputStyle={{
          marginLeft: 0,
          fontFamily: FONT_FAMILY.MontserratRegular,
          color: "rgba(38, 39, 41, 1)",
          fontSize: FONT.TextSmall_2,
        }}
        inputContainerStyle={{
          paddingVertical: 0,
          height: wp("11%"),
          borderRadius: 30,
          borderBottomWidth: 0,
          backgroundColor: COLORS.white_color,
          width: width ? wp(width) : wp(90),
          borderWidth: 0,
          // borderColor: COLORS.grey_color,
        }}
        clearIcon={searchText.length === 0 ? false : <Icon color={COLORS.black_color}
                                                           size={wp(4)} name={"close"}
                                                           onPress={() => {
                                                             setSearchText("");
                                                             props.onClearSearch();
                                                           }}
        />}
        searchIcon={<Image
          source={ICONS.SEARCH_BLACK_ICON}
          style={{
            height: wp(4),
            width: wp(4),
          }}
        />}
      />
  );
};

export {
  CustomSearchBar,
};
