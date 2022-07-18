import React, {useEffect, useState} from "react";
import {Image, StyleSheet, Text, TouchableOpacity, View} from "react-native";
import {ICONS} from "../../../utils/ImagePaths";
import {FONT} from "../../../utils/FontSize";
import COLORS from "../../../utils/Colors";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import * as _ from "lodash";
import {FONT_FAMILY} from "../../../utils/Font";
import {Spacer} from "../../../components/spacer";

const SeekQuestionComponent = (props) => {
    const {isAnswered, questionText, options, totalVotes} = props;
    const [optionsArray, setOptionsArray] = useState(options);

    useEffect(() => {
        setOptionsArray(options);
    }, [options]);

    const onOptionSelect = (selectedItem, selectedIndex) => {
        setOptionsArray(_.map(optionsArray, (item, index) => {
            item.isSelected = selectedItem._id === item._id ? true : false;
            return item;
        }));
        props.onOptionSelect(selectedItem, selectedIndex);
    };


    return (
        <View style={Styles.QuestionContainerStyle}>
            <View style={Styles.QuestionTextContainerStyle}>
                <View
                    style={[Styles.YellowBarStyle, {backgroundColor: isAnswered ? COLORS.app_theme_color : COLORS.transparent}]}/>
                <Text style={Styles.QuestionTextStyle}>{questionText}</Text>
            </View>
            <Spacer space={2.5}/>
            {isAnswered ?
                <View style={Styles.ResultContainerStyle}>
                    {_.map(optionsArray, (item, index) => {
                        return (<View style={Styles.ResultItemContainerStyle}>
                            <Text style={Styles.ResultTextStyle}>{item.value}</Text>
                            <View style={Styles.BarContainerStyle}>
                                <View style={[Styles.BarStyle, {width: `${(item.votes / totalVotes) * 100}%`}]}/>
                            </View>
                            <Spacer row={1}/>
                            <Text style={Styles.OptionVoteCountTextStyle}>{item.votes}</Text>
                        </View>);
                    })
                    }
                </View>
                :
                <View style={Styles.OptionsContainerStyle}>
                    {_.map(optionsArray, (item, index) => {
                        return (
                            <TouchableOpacity onPress={() => onOptionSelect(item, index)}
                                              style={Styles.OptionsTextContainerStyle}>
                                <Image style={{width: wp(3), height: wp(3)}}
                                       source={item.isSelected ? ICONS.CHECKED_ANSWER_ICON : ICONS.UNCHECKED_ANSWER_ICON}/>
                                <Spacer row={2}/>
                                <Text style={Styles.OptionsTextStyle}>{item.value}</Text>
                            </TouchableOpacity>);
                    })
                    }
                </View>
            }
        </View>
    );
};

export {
    SeekQuestionComponent,
};

const Styles = StyleSheet.create({
    QuestionContainerStyle: {
        width: wp(90),
        borderRadius: wp(5),
        backgroundColor: COLORS.white_color,
        paddingTop: wp(5),
        alignItems: "center",
        justifyContent: "center",
    },
    QuestionTextContainerStyle: {
        width: wp(90),
        flexDirection: "row",
        marginBottom: wp(3),
    },
    QuestionTextStyle: {
        fontFamily: FONT_FAMILY.BentonSansMedium,
        fontSize: FONT.TextSmall,
        color: COLORS.light_black,
        width: wp(80),
        marginLeft: wp(3),
        marginRight: wp(5),
        textAlign: "justify",
        lineHeight: 19,
        paddingVertical: wp(1),
    },
    YellowBarStyle: {
        width: wp(1.5),
        borderTopRightRadius: wp(1.5),
        borderBottomRightRadius: wp(1.5),
    },
    OptionsContainerStyle: {
        width: wp(80),
        // backgroundColor: "pink",
        marginHorizontal: wp(5),
        flexDirection: "row",
        flexWrap: "wrap",
    },
    OptionsTextContainerStyle: {
        flexDirection: "row",
        // backgroundColor: "green",
        width: wp(40),
        marginBottom: wp(5),
    },
    OptionsTextStyle: {
        fontSize: FONT.TextExtraSmall,
        fontWeight: "normal",
        fontFamily: FONT_FAMILY.MontserratRegular,
        color: COLORS.light_black,
        // backgroundColor: "red",
        // lineHeight: 19,
        width: wp(32),
    },
    ResultContainerStyle: {
        width: wp(80),
        marginHorizontal: wp(5),
    },
    ResultItemContainerStyle: {
        width: wp(80),
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: wp(5),
    },
    ResultTextStyle: {
        width: wp(39),
        marginRight: wp(1),
        fontSize: FONT.TextExtraSmall,
        fontWeight: "normal",
        fontFamily: FONT_FAMILY.MontserratRegular,
        color: COLORS.light_black,
    },
    OptionVoteCountTextStyle: {
        fontSize: FONT.TextExtraSmall,
        fontWeight: "normal",
        fontFamily: FONT_FAMILY.MontserratRegular,
        color: COLORS.light_black,
    },
    BarContainerStyle: {
        width: wp(30),
        alignItems: "flex-end",
    },
    BarStyle: {
        backgroundColor: COLORS.app_theme_color,
        borderRadius: wp(5),
        height: wp(3.5),
    },
});
