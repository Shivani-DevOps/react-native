// RootNavigation.js

import * as React from 'react';
import {CommonActions} from '@react-navigation/native';

export const navigationRef = React.createRef();


export function navigate(name, params) {
    navigationRef.current?.navigate(name, params);
}

export function reset(routeArray, index) {
    navigationRef.current?.dispatch(
        CommonActions.reset({
            index: index,
            routes: routeArray,
        }),
    );
}
