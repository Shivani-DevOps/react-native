import {Image, StyleSheet, Text, View} from "react-native";
import COLORS from "../../utils/Colors";
import React from "react";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {FONT_FAMILY} from "../../utils/Font";

const AppIconAndNameViewComponent = (props) => {
    const {title, subTitle} = props;
    return (
        <View
            style={{
                width: wp(100),
                backgroundColor: COLORS.app_theme_color,
                paddingTop: Platform.OS == "android" ? 20 : 0,
            }}>
            <Image
                source={require("../../assets/images/logo2.png")}
                style={styles.image}
            />
            <Text style={styles.streamText}>{title}</Text>
            <Text style={styles.sparkText}>{subTitle}</Text>
        </View>
    );
};

export {
    AppIconAndNameViewComponent,
};

const styles = StyleSheet.create({
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
        marginBottom: wp(8),
    },
});
