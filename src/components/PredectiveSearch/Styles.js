// const styles = StyleSheet.create({
//     container: {
//       // justifyContent: 'center',
//       alignItems: 'center',
//       marginTop: '20%',
//       flex: 1
//     },
//     textInput: {
//       backgroundColor: '#BFBFBF',
//       width: '80%',
//       borderRadius: 5,
//       height: 50,
//       fontSize: 20,
//       fontWeight: 'bold',
//       paddingHorizontal: 10,
//     },
//   });

import React from "react";
import { StyleSheet } from 'react-native'



export const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: '6.2%',
        left: 0, right: 0, bottom: 0,

    },
    subContainer: {

        backgroundColor: '#84DCC6',
        paddingTop: 10,
        marginHorizontal: 20,
        borderTopLeftRadius: 4,
        borderTopRightRadius: 4,
        flexWrap: 'wrap',

        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    itemView: {
        // marginHorizontal: '10%',
        backgroundColor: 'white',
        height: 30,
        width: '90%',
        marginBottom: 10,
        justifyContent: 'center',
        borderRadius: 4,
    },
    itemText: {
        color: 'black',
        paddingHorizontal: 10,
    },
    noResultView: {
        alignSelf: 'center',
        // margin: 20,
        height: 100,
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center'
    },
    noResultText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white'
    },

});