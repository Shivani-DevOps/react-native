import styled from "styled-components";
import {widthPercentageToDP as wp} from "react-native-responsive-screen";
import {SafeAreaView} from 'react-native'
import COLORS from "./Colors";

const MainContainer = styled.View`
flex: 1;
backgroundColor: ${COLORS.app_theme_color};
alignItems: center;


`;
const MainContainerInner = styled.View`
flex: 1;
backgroundColor: ${COLORS.app_theme_color};
paddingHorizontal:${wp(7)};

`;

const ScrollContainer = styled.ScrollView`
flex: 1;
backgroundColor:${COLORS.app_theme_color};
`;

const ShadowViewContainer = styled.View`
alignSelf: center;
 shadow-Color: ${COLORS.black_color};
 shadow-Opacity: ${wp(0.09)};
 border-Radius: ${wp(3)};
 shadow-Radius: ${wp(1)};
 shadow-Offset: 0px 3px;
 elevation: ${5};
 margin-Bottom: ${wp('4%')};
 background-color: ${COLORS.white_color}
`;

const BorderViewContainer = styled.View`
 borderColor:${COLORS.failure_Toast};
 borderWidth: 1 ;
 borderRadius:10;
 paddingVertical:4;
`;

const SafeAreaViewContainer = styled(SafeAreaView).attrs(() => ({
    forceInset: {top: 'never'}

}))`
flex:1
`;

export {
    MainContainer,
    ScrollContainer,
    ShadowViewContainer,
    SafeAreaViewContainer,
    BorderViewContainer,
    MainContainerInner
}
