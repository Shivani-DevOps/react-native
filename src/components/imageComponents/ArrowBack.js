// ----------------------------------------
// PACKAGE IMPORTS
// ----------------------------------------

import React from 'react';
import Svg, {Path} from 'react-native-svg';
import COLORS from '../../../src/utils/Colors';

// ----------------------------------------
// LOCAL & CONFIG IMPORTS
// ----------------------------------------

function BackArrow(props) {
    return (
        <Svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <Path
                d="M3.29289 15.2929C2.90237 15.6834 2.90237 16.3166 3.29289 16.7071L9.65685 23.0711C10.0474 23.4616 10.6805 23.4616 11.0711 23.0711C11.4616 22.6805 11.4616 22.0474 11.0711 21.6569L5.41421 16L11.0711 10.3431C11.4616 9.95262 11.4616 9.31946 11.0711 8.92893C10.6805 8.53841 10.0474 8.53841 9.65686 8.92893L3.29289 15.2929ZM29 15L4 15L4 17L29 17L29 15Z"
                fill={props.fillColor}/>
        </Svg>
    );
}

BackArrow.defaultProps = {
    fillColor: COLORS.black_color,
    width: '24',
    height: '24',
};

export default BackArrow;
