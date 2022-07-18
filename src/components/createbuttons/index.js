import React, { Component } from 'react';
import { Image, TouchableOpacity, Text,  } from 'react-native';
import { Spacer } from '../../components/spacer';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import COLORS from '../../utils/Colors';
import { FONT_FAMILY } from "../../utils/Font";

const CreateButtons = ({ image, title,onClick }) => {

    return (
        <TouchableOpacity
        onPress={onClick}
        style={{
            height:hp(7.5), 
            width:wp(90),
            backgroundColor: 'white',
            flexDirection: 'row',
            borderRadius: 4,
            borderBottomEndRadius:wp(5),
            paddingLeft:wp(5),
        }}>
            <Image
                source={image}
                style={{
                    alignSelf: 'center',
                }}
            />
               <Spacer row={2.5}/>
            <Text style={{alignSelf:'center',color:COLORS.light_black,fontFamily:FONT_FAMILY.Montserrat,}}>
                {title}
            </Text>
        </TouchableOpacity>
    )
}

export { CreateButtons }